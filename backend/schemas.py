from enum import Enum
from typing import Optional
from pydantic import BaseModel, EmailStr, ConfigDict, Field, model_validator


class UserType(str, Enum):
    PHYSICAL = "PHYSICAL"
    JURIDICAL = "JURIDICAL"


class UserCreateBase(BaseModel):
    email: EmailStr
    password: str = Field(min_length=6)
    # padrão para numero de telefone
    phone: str = Field(pattern=r"^\+?[1-9]\d{1, 14}$")


class UserCreatePhysical(UserCreateBase):
    user_type: UserType = UserType.PHYSICAL
    full_name: str = Field(min_length=2, max_length=150)
    cpf: str = Field(min_length=11, max_length=14)


class UserCreateJuridical(UserCreateBase):
    user_type: UserType = UserType.JURIDICAL
    company_name: str = Field(min_length=2, max_length=150)
    trade_name: str = Field(min_length=2, max_length=150)
    cnpj: str = Field(min_length=14, max_length=18)
    creci: Optional[str] = None


class UserUpdate(BaseModel):
    phone: Optional[str] = None

    # atualização de pf
    full_name: Optional[str] = None

    # atualização de pj
    company_name: Optional[str] = None
    trade_name: Optional[str] = None
    creci: Optional[str] = None


class UserResponse(BaseModel):
    id: int
    email: EmailStr
    user_type: UserType
    phone: str
    is_active: bool

    # dados de pessoa fisica
    full_name: Optional[str] = None
    cpf: Optional[str] = None

    # dados de pessoa juridica
    company_name: Optional[str] = None
    trade_name: Optional[str] = None
    cnpj: Optional[str] = None
    creci: Optional[str] = None

    model_config = ConfigDict(from_attributes=True)


class Token(BaseModel):
    access_token: str
    token_type: str


class PropertyType(str, Enum):
    HOUSE = "HOUSE"
    APARTAMENT = "APARTAMENT"
    FARM = "FARM"
    COMMERCIAL = "COMMERCIAL"


class RentalType(str, Enum):
    RESIDENTIAL = "RESIDENTIAL"
    SEASONAL = "SEASONAL"
    EVENT = "EVENT"
    ALL = "ALL"


class PropertyCreate(BaseModel):
    title: str = Field(min_length=5, max_length=150)
    description: str = Field(min_length=10)
    property_type: PropertyType
    rental_type: RentalType

    price_per_night: Optional[float] = Field(default=None, ge=0)
    price_per_month: Optional[float] = Field(default=None, ge=0)
    price_selling: Optional[float] = Field(default=None, ge=0)

    bedrooms: int = Field(default=0, ge=0)
    bathrooms: int = Field(default=0, ge=0)
    max_guests: int = Field(default=1, ge=1)
    area_sqm: Optional[float] = Field(default=None, ge=0)

    # Endereço (sem campos de número de casa para manter a privacidade)
    state: str = Field(min_length=2, max_length=2)
    city: str = Field(min_length=2, max_length=100)
    neighborhood: str = Field(min_length=2, max_length=100)
    street: str = Field(min_length=2, max_length=150)
    zip_code: Optional[str] = None

    # Coordenadas
    latitude: float = Field(ge=-90, le=90)
    longitude: float = Field(ge=-180, le=180)

# Schema de Atualização (PATCH/PUT)


class PropertyUpdate(BaseModel):
    title: Optional[str] = None
    description: Optional[str] = None
    price_per_night: Optional[float] = None
    price_per_month: Optional[float] = None
    is_active: Optional[bool] = None


# Schema de Resposta para a API
class PropertyResponse(BaseModel):
    id: int
    title: str
    description: str
    property_type: PropertyType
    rental_type: RentalType
    is_active: bool

    price_per_night: Optional[float] = None
    price_per_month: Optional[float] = None

    bedrooms: int
    bathrooms: int
    max_guests: int
    area_sqm: Optional[float] = None

    state: str
    city: str
    neighborhood: str
    street: str
    zip_code: Optional[str] = None

    latitude: float
    longitude: float

    owner_id: int

    model_config = ConfigDict(from_attributes=True)
