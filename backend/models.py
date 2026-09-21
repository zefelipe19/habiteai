import enum
from typing import Optional, List
from sqlalchemy import String, Boolean, Enum, Text, Float, Integer, ForeignKey
from sqlalchemy.orm import Mapped, mapped_column, relationship
from database import Base


class UserType(str, enum.Enum):
    PHYSICAL = "PHYSICAL"
    JURIDICAL = "JURIDICAL"


class User(Base):
    __tablename__ = "users"

    id: Mapped[int] = mapped_column(primary_key=True, index=True)
    email: Mapped[str] = mapped_column(
        String(255), unique=True, index=True, nullable=False)
    hashed_password: Mapped[str] = mapped_column(String(255), nullable=False)
    user_type: Mapped[UserType] = mapped_column(
        Enum(UserType, native_enum=False, length=20), default=UserType.PHYSICAL)
    phone: Mapped[str] = mapped_column(String(20))
    is_active: Mapped[bool] = mapped_column(Boolean, default=True)

    # dados para pessoa fisica
    full_name: Mapped[Optional[str]] = mapped_column(String(150))
    cpf: Mapped[Optional[str]] = mapped_column(
        String(14), unique=True, index=True)

    # dados pessoa jurídica
    company_name: Mapped[Optional[str]] = mapped_column(String(150))
    trade_name: Mapped[Optional[str]] = mapped_column(String(150))
    cnpj: Mapped[Optional[str]] = mapped_column(
        String(18), unique=True, index=True)
    creci: Mapped[Optional[str]] = mapped_column(String(20))

    properties: Mapped[List["Property"]] = relationship(
        "Property", back_populates="owner")


class PropertyType(str, enum.Enum):
    HOUSE = "HOUSE"
    APARTAMENT = "APARTAMENT"
    FARM = "FARM"
    COMMERCIAL = "COMMERCIAL"


class RentalType(str, enum.Enum):
    RESIDENTIAL = "RESIDENTIAL"
    SEASONAL = "SEASONAL"
    EVENT = "EVENT"
    SELL = "SELL"
    ALL = "ALL"


class Property(Base):
    __tablename__ = "properties"

    id: Mapped[int] = mapped_column(primary_key=True)
    title: Mapped[str] = mapped_column(String(150))
    description: Mapped[str] = mapped_column(Text)

    # classification
    property_type: Mapped[PropertyType] = mapped_column(
        Enum(PropertyType, native_enum=False, length=20)
    )
    rental_type: Mapped[RentalType] = mapped_column(
        Enum(RentalType, native_enum=False, length=20)
    )
    is_active: Mapped[bool] = mapped_column(default=True)

    # valores opcionais (Float() instanciado + float em minúsculo no Mapped)
    price_per_night: Mapped[Optional[float]] = mapped_column(Float(), nullable=True)
    price_per_month: Mapped[Optional[float]] = mapped_column(Float(), nullable=True)
    price_selling: Mapped[Optional[float]] = mapped_column(Float(), nullable=True)

    # caracteristicas
    bedrooms: Mapped[int] = mapped_column(Integer, default=0)
    bathrooms: Mapped[int] = mapped_column(Integer, default=0)
    max_guests: Mapped[int] = mapped_column(Integer, default=1)
    area_sqm: Mapped[Optional[float]] = mapped_column(Float(), nullable=True)

    state: Mapped[str] = mapped_column(String(2))
    city: Mapped[str] = mapped_column(String(100), index=True)
    neighborhood: Mapped[str] = mapped_column(String(100))
    street: Mapped[str] = mapped_column(String(100))
    zip_code: Mapped[Optional[str]] = mapped_column(String(10), nullable=True)

    # geolocalização (Float() instanciado)
    latitude: Mapped[float] = mapped_column(Float(), index=True)
    longitude: Mapped[float] = mapped_column(Float(), index=True)

    # relacionamento com anunciante
    owner_id: Mapped[int] = mapped_column(
        ForeignKey("users.id", ondelete="CASCADE")
    )
    owner: Mapped["User"] = relationship("User", back_populates="properties")