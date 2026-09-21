from fastapi import FastAPI, Depends, HTTPException, status
from fastapi.middleware.cors import CORSMiddleware
from fastapi.security import OAuth2PasswordRequestForm
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select
from contextlib import asynccontextmanager

from database import get_db, engine, Base
from models import User
from schemas import UserCreatePhysical, UserCreateJuridical, UserResponse, Token
from security import hash_password, verify_password, create_access_token, get_current_user_email


@asynccontextmanager
async def lifespan(app: FastAPI):
    async with engine.begin() as conn:
        await conn.run_sync(Base.metadata.create_all)
    yield

app = FastAPI(title="Fast & Secure API", lifespan=lifespan)

# Segurança: CORS restrito (Altere para as origens reais em produção)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:4200"],
    allow_credentials=True,
    allow_methods=["GET", "POST", "PUT", "DELETE"],
    allow_headers=["Authorization", "Content-Type"],
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


@app.get("/me", response_model=str)
async def read_protected_route(current_user: str = Depends(get_current_user_email)):
    return f"Usuário autenticado: {current_user}"
