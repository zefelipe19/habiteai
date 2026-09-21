from typing import List, Optional
from fastapi import FastAPI, Depends, HTTPException, status, Query
from fastapi.middleware.cors import CORSMiddleware
from fastapi.security import OAuth2PasswordRequestForm
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select
from contextlib import asynccontextmanager

from database import get_db, engine, Base
from models import User, Property
from schemas import UserCreatePhysical, UserCreateJuridical, UserResponse, Token, PropertyCreate, PropertyResponse, RentalType, PropertyType
from security import hash_password, verify_password, create_access_token, get_current_user


@asynccontextmanager
async def lifespan(app: FastAPI):
    async with engine.begin() as conn:
        await conn.run_sync(Base.metadata.create_all)
    yield

app = FastAPI(title="Fast & Secure API", lifespan=lifespan)

# Segurança: CORS restrito (Altere para as origens reais em produção)
origins = [
    "http://localhost:4200",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.post("/register/physical", response_model=UserResponse, status_code=status.HTTP_201_CREATED)
async def register_physical(user_data: UserCreatePhysical, db: AsyncSession = Depends(get_db)):
    # consultando para ver se a informação passada já não existe no banco de dados
    result = await db.execute(select(User).where((User.email == user_data.email) | (User.cpf == user_data.cpf)))
    if result.scalar_one_or_none():
        raise HTTPException(
            status_code=400, detail="E-mail ou CPF já cadastrado")

    user_dict = user_data.model_dump(exclude={"password"})
    user_dict["hashed_password"] = hash_password(user_data.password)

    new_user = User(**user_dict)
    db.add(new_user)
    await db.commit()
    await db.refresh(new_user)
    return new_user


@app.post("/register/juridical", response_model=UserResponse, status_code=status.HTTP_201_CREATED)
async def register_juridical(user_data: UserCreateJuridical, db: AsyncSession = Depends(get_db)):
    # consultando para ver se essa informação já não existe no banco
    result = await db.execute(select(User).where((User.email == user_data.email) | (User.cnpj == user_data.cnpj)))
    if result.scalar_one_or_none():
        raise HTTPException(
            status_code=400, detail="Email ou CNPJ já cadastrado")

    user_dict = user_data.model_dump(exclude={"password"})
    user_dict["hashed_password"] = hash_password(user_data.password)

    new_user = User(**user_dict)
    db.add(new_user)
    await db.commit()
    await db.refresh(new_user)
    return new_user


@app.post("/token", response_model=Token)
async def login(form_data: OAuth2PasswordRequestForm = Depends(), db: AsyncSession = Depends(get_db)):
    result = await db.execute(select(User).where(User.email == form_data.username))
    user = result.scalar_one_or_none()

    if not user or not verify_password(form_data.password, user.hashed_password):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="E-mail ou senha incorretos."
        )

    access_token = create_access_token(data={"sub": user.email})
    return {"access_token": access_token, "token_type": "bearer"}


@app.get("/me", response_model=UserResponse)
async def read_protected_route(current_user: User = Depends(get_current_user)):
    return current_user


@app.post("/properties", response_model=PropertyResponse, status_code=status.HTTP_201_CREATED)
async def create_property(property_data: PropertyCreate, db: AsyncSession = Depends(get_db), current_user: User = Depends(get_current_user)):
    """Cadastro de nova propriedade vinculada ao usuario autenticado (pressoa fisica ou juridica)"""
    new_property = Property(**property_data.model_dump(), owner_id=current_user.id)
    db.add(new_property)
    await db.commit()
    await db.refresh(new_property)
    return new_property

@app.get("/properties", response_model=List[PropertyResponse])
async def list_properties(
    city: Optional[str] = Query(None, description="Filtrar por cidade"),
    state: Optional[str] = Query(None, description="Filtrar por estado (UF)"),
    rental_type: Optional[RentalType] = Query(None, description="Filtrar por tipo de aluguel (RESIDENTIAL, SEASONAL, EVENT)"),
    property_type: Optional[PropertyType] = Query(None, description="Filtrar por tipo de imóvel (HOUSE, APARTMENT, etc.)"),
    # Filtros de Geolocalização para Bounding Box do Mapa Frontend
    min_lat: Optional[float] = Query(None, ge=-90, le=90),
    max_lat: Optional[float] = Query(None, ge=-90, le=90),
    min_lng: Optional[float] = Query(None, ge=-180, le=180),
    max_lng: Optional[float] = Query(None, ge=-180, le=180),
    db: AsyncSession = Depends(get_db)
):
    """lista as propriedades com suporte a filtros geograficos"""
    query = select(Property).where(Property.is_active == True)
    if city:
        query = query.where(Property.city.ilike(f"%{city}%"))
    if state:
        query = query.where(Property.state.ilike(state))
    if rental_type:
        query = query.where((Property.rental_type == rental_type) | (Property.rental_type == RentalType.ALL))
    if property_type:
        query = query.where(Property.property_type == property_type)

    # Filtro de Bounding Box (Área visível do mapa no Frontend)
    if min_lat is not None and max_lat is not None:
        query = query.where(Property.latitude.between(min_lat, max_lat))
    if min_lng is not None and max_lng is not None:
        query = query.where(Property.longitude.between(min_lng, max_lng))

    result = await db.execute(query)
    properties = result.scalars().all()
    return properties

@app.get("/properties/{property_id}", response_model=PropertyResponse)
async def get_property_by_id(property_id: int, db: AsyncSession = Depends(get_db)):
    """retorna os detalhes de uma propriedade em especifico"""
    result = await db.execute(select(Property).where(Property.id == property_id))
    property_item = result.scalar_one_or_none()

    if not property_item:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Imovel não encontrado"
        )
    return property_item