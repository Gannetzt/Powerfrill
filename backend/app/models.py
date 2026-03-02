from typing import List, Optional, Dict
from datetime import datetime
from sqlmodel import SQLModel, Field, Column, JSON
from enum import Enum

class UserRole(str, Enum):
    ADMIN = "admin"
    EDITOR = "editor"
    VIEWER = "viewer"

class UserBase(SQLModel):
    username: Optional[str] = Field(default=None, unique=True, index=True)
    email: str = Field(unique=True, index=True)
    phone_number: Optional[str] = None
    full_name: Optional[str] = None
    role: UserRole = Field(default=UserRole.VIEWER)
    is_active: bool = Field(default=True)
    permissions: Dict[str, List[str]] = Field(default={}, sa_column=Column(JSON))

class User(UserBase, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    hashed_password: Optional[str] = None
    google_id: Optional[str] = Field(default=None, unique=True, index=True)

class Inquiry(SQLModel, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    user_id: int = Field(foreign_key="user.id")
    message: str
    product_list: List[str] = Field(default=[], sa_column=Column(JSON))
    status: str = Field(default="pending")
    created_at: str = Field(default_factory=lambda: datetime.utcnow().isoformat())

class ProductBase(SQLModel):
    id: str = Field(primary_key=True)
    menuId: str
    groupId: str
    categoryId: str
    slug: str = Field(index=True)
    title: str
    subtitle: str
    image: str
    productType: str
    brief: str
    description: str
    features: List[Dict[str, str]] = Field(default=[], sa_column=Column(JSON))
    advantages: List[str] = Field(default=[], sa_column=Column(JSON))
    applications: Optional[str] = None
    proTip: Optional[str] = None
    gallery: List[str] = Field(default=[], sa_column=Column(JSON))
    priceLabel: Optional[str] = None
    availability: Optional[str] = None
    rating: Optional[float] = None
    hideQuotation: bool = Field(default=False)
    industryTags: List[str] = Field(default=[], sa_column=Column(JSON))
    technologyTags: List[str] = Field(default=[], sa_column=Column(JSON))
    applicationTags: List[str] = Field(default=[], sa_column=Column(JSON))
    specifications: Dict[str, str] = Field(default={}, sa_column=Column(JSON))
    solutionId: str
    category: str
    categoryPath: List[str] = Field(default=[], sa_column=Column(JSON))

class Product(ProductBase, table=True):
    pass

class Resource(SQLModel, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    title: str
    type: str  # brochure, pamphlet, tech-doc
    url: str
    target_screens: List[str] = Field(default=[], sa_column=Column(JSON))
    is_active: bool = Field(default=True)
    created_at: datetime = Field(default_factory=datetime.utcnow)

class Promotion(SQLModel, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    title: str
    image_url: str
    cta_link: Optional[str] = None
    target_screens: List[str] = Field(default=[], sa_column=Column(JSON))
    is_active: bool = Field(default=True)
    start_date: Optional[datetime] = None
    end_date: Optional[datetime] = None
    created_at: datetime = Field(default_factory=datetime.utcnow)
