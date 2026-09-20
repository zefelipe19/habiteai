import enum
from typing import Optional
from sqlalchemy import String, Boolean, Enum
from sqlalchemy.orm import Mapped, mapped_column
from .database import Base


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
