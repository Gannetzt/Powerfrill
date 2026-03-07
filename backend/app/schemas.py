from datetime import datetime
from pydantic import BaseModel, EmailStr
from typing import Optional, Dict, List
from .models import UserRole, ProductBase, Inquiry

class Token(BaseModel):
    access_token: str
    token_type: str

class TokenData(BaseModel):
    username: Optional[str] = None

class UserCreate(BaseModel):
    email: EmailStr
    password: str
    phone_number: str
    username: Optional[str] = None
    full_name: Optional[str] = None
    role: UserRole = UserRole.VIEWER
    permissions: Optional[Dict[str, List[str]]] = {}

class UserOut(BaseModel):
    id: int
    email: EmailStr
    phone_number: Optional[str] = None
    username: Optional[str] = None
    full_name: Optional[str] = None
    role: UserRole
    is_active: bool
    permissions: Dict[str, List[str]]

    class Config:
        from_attributes = True

class UserUpdate(BaseModel):
    email: Optional[EmailStr] = None
    phone_number: Optional[str] = None
    full_name: Optional[str] = None
    role: Optional[UserRole] = None
    is_active: Optional[bool] = None
    permissions: Optional[Dict[str, List[str]]] = None
    password: Optional[str] = None

class InquiryCreate(BaseModel):
    message: str
    product_list: List[str] = []
    project_type: Optional[str] = None
    voltage_required: Optional[str] = None
    capacity_required: Optional[str] = None
    industry_segment: Optional[str] = None

class InquiryWithUser(BaseModel):
    id: int
    message: str
    product_list: List[str]
    status: str
    created_at: str
    user_id: int
    user_email: str
    project_type: Optional[str] = None
    voltage_required: Optional[str] = None
    capacity_required: Optional[str] = None
    industry_segment: Optional[str] = None
    user_name: Optional[str] = None
    user_phone: Optional[str] = None

class ProductCreate(ProductBase):
    pass

class ProductUpdate(BaseModel):
    title: Optional[str] = None
    subtitle: Optional[str] = None
    image: Optional[str] = None
    brief: Optional[str] = None
    description: Optional[str] = None
    priceLabel: Optional[str] = None
    availability: Optional[str] = None
    rating: Optional[float] = None
    chemistry: Optional[str] = None
    certification: Optional[str] = None
    cycle_life: Optional[str] = None
    warranty_years: Optional[int] = None
    charging_time: Optional[str] = None
    voltage_nominal: Optional[str] = None
    capacity_ah: Optional[str] = None

class ResourceBase(BaseModel):
    title: str
    type: str
    url: str
    target_screens: List[str]
    is_active: bool = True

class ResourceCreate(ResourceBase):
    pass

class ResourceOut(ResourceBase):
    id: int
    created_at: datetime

class PromotionBase(BaseModel):
    title: str
    image_url: str
    cta_link: Optional[str] = None
    target_screens: List[str]
    is_active: bool = True
    start_date: Optional[datetime] = None
    end_date: Optional[datetime] = None

class PromotionCreate(PromotionBase):
    pass

class PromotionOut(PromotionBase):
    id: int
    created_at: datetime
