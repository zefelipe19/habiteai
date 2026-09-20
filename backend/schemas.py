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
