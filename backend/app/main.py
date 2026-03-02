from fastapi import FastAPI, Depends, HTTPException, status, Request
from fastapi.security import OAuth2PasswordRequestForm
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from sqlmodel import Session, select
from typing import List
import traceback
from typing import Optional
from datetime import datetime

from .database import engine, get_session, create_db_and_tables
from .models import User, UserRole, Product, Resource, Promotion, Inquiry
from .auth import create_access_token, get_password_hash, get_current_user, check_role, verify_password
from .schemas import (
    Token, UserCreate, UserOut, UserUpdate, 
    ProductCreate, ProductUpdate, InquiryCreate, InquiryWithUser,
    ResourceCreate, ResourceOut, PromotionCreate, PromotionOut
)
from .config import settings

app = FastAPI(title="Powerfill API")

@app.exception_handler(Exception)
async def global_exception_handler(request: Request, exc: Exception):
    error_detail = traceback.format_exc()
    with open("global_errors.log", "a") as f:
        f.write(error_detail + "\n" + "="*50 + "\n")
    return JSONResponse(
        status_code=500,
        content={"detail": str(exc), "traceback": error_detail},
    )

# Enable CORS for the frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.on_event("startup")
def on_startup():
    create_db_and_tables()

# Auth Endpoints
@app.post("/auth/signup", response_model=UserOut)
async def signup(user_in: UserCreate, session: Session = Depends(get_session)):
    # Check if user exists
    existing_user = session.exec(select(User).where(User.email == user_in.email)).first()
    if existing_user:
        raise HTTPException(status_code=400, detail="User with this email already exists")
    
    db_user = User(
        email=user_in.email,
        phone_number=user_in.phone_number,
        username=user_in.username,
        full_name=user_in.full_name,
        hashed_password=get_password_hash(user_in.password),
        role=user_in.role
    )
    session.add(db_user)
    session.commit()
    session.refresh(db_user)
    return db_user

@app.post("/auth/login", response_model=Token)
async def login_for_access_token(form_data: OAuth2PasswordRequestForm = Depends(), session: Session = Depends(get_session)):
    try:
        # Try login by email or username
        user = session.exec(select(User).where((User.username == form_data.username) | (User.email == form_data.username))).first()
        
        if not user or not user.hashed_password or not verify_password(form_data.password, user.hashed_password):
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="Incorrect email/username or password",
                headers={"WWW-Authenticate": "Bearer"},
            )
        access_token = create_access_token(data={"sub": user.email}) # Use email as sub
        return {"access_token": access_token, "token_type": "bearer"}
    except Exception as e:
        import traceback
        print(traceback.format_exc())
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/auth/me", response_model=UserOut)
async def read_users_me(current_user: User = Depends(get_current_user)):
    return current_user

# Inquiry Endpoints
@app.post("/inquiries", response_model=Inquiry)
async def create_inquiry(inquiry_in: InquiryCreate, current_user: User = Depends(get_current_user), session: Session = Depends(get_session)):
    db_inquiry = Inquiry(
        user_id=current_user.id,
        message=inquiry_in.message,
        product_list=inquiry_in.product_list
    )
    session.add(db_inquiry)
    session.commit()
    session.refresh(db_inquiry)
    return db_inquiry

@app.get("/inquiries", response_model=List[InquiryWithUser], dependencies=[Depends(check_role([UserRole.ADMIN, UserRole.EDITOR]))])
async def get_all_inquiries(session: Session = Depends(get_session)):
    inquiries = session.exec(select(Inquiry)).all()
    result = []
    for inquiry in inquiries:
        user = session.get(User, inquiry.user_id)
        result.append(InquiryWithUser(
            id=inquiry.id,
            message=inquiry.message,
            product_list=inquiry.product_list,
            status=inquiry.status,
            created_at=inquiry.created_at,
            user_id=inquiry.user_id,
            user_email=user.email if user else "Unknown",
            user_name=user.full_name if user else None,
            user_phone=user.phone_number if user else None
        ))
    return result

# User Management Endpoints (Admin Only)
@app.get("/users", response_model=List[UserOut], dependencies=[Depends(check_role([UserRole.ADMIN]))])
async def get_users(session: Session = Depends(get_session)):
    return session.exec(select(User)).all()

@app.put("/users/{user_id}", response_model=UserOut, dependencies=[Depends(check_role([UserRole.ADMIN]))])
async def update_user(user_id: int, user_update: UserUpdate, session: Session = Depends(get_session)):
    db_user = session.get(User, user_id)
    if not db_user:
        raise HTTPException(status_code=404, detail="User not found")
    
    user_data = user_update.dict(exclude_unset=True)
    if "password" in user_data:
        user_data["hashed_password"] = get_password_hash(user_data.pop("password"))
    
    for key, value in user_data.items():
        setattr(db_user, key, value)
    
    session.add(db_user)
    session.commit()
    session.refresh(db_user)
    return db_user

@app.delete("/users/{user_id}", status_code=status.HTTP_204_NO_CONTENT, dependencies=[Depends(check_role([UserRole.ADMIN]))])
async def delete_user(user_id: int, session: Session = Depends(get_session)):
    db_user = session.get(User, user_id)
    if not db_user:
        raise HTTPException(status_code=404, detail="User not found")
    session.delete(db_user)
    session.commit()
    return None

# Product Endpoints
@app.get("/products", response_model=List[Product])
async def get_products(session: Session = Depends(get_session)):
    return session.exec(select(Product)).all()

@app.get("/products/{product_id}", response_model=Product)
async def get_product(product_id: str, session: Session = Depends(get_session)):
    product = session.get(Product, product_id)
    if not product:
        raise HTTPException(status_code=404, detail="Product not found")
    return product

def check_menu_permission(user: User, menu_id: str):
    # Admins have all rights
    if user.role == UserRole.ADMIN:
        return True
    
    # Editors check permissions
    allowed_menus = user.permissions.get("menu_access", [])
    if menu_id in allowed_menus:
        return True
    
    raise HTTPException(status_code=403, detail=f"You do not have permission to manage the '{menu_id}' module.")

@app.post("/products", response_model=Product)
async def create_product(product: ProductCreate, current_user: User = Depends(get_current_user), session: Session = Depends(get_session)):
    # Verify general role
    if current_user.role not in [UserRole.ADMIN, UserRole.EDITOR]:
        raise HTTPException(status_code=403, detail="Insufficient role")
    
    # Verify menu-specific permission
    check_menu_permission(current_user, product.menuId)
    
    db_product = Product.model_validate(product)
    session.add(db_product)
    session.commit()
    session.refresh(db_product)
    return db_product

@app.put("/products/{product_id}", response_model=Product)
async def update_product(product_id: str, product_update: ProductUpdate, current_user: User = Depends(get_current_user), session: Session = Depends(get_session)):
    # Verify general role
    if current_user.role not in [UserRole.ADMIN, UserRole.EDITOR]:
        raise HTTPException(status_code=403, detail="Insufficient role")
    
    db_product = session.get(Product, product_id)
    if not db_product:
        raise HTTPException(status_code=404, detail="Product not found")
    
    # Verify menu-specific permission
    check_menu_permission(current_user, db_product.menuId)
    
    product_data = product_update.dict(exclude_unset=True)
    for key, value in product_data.items():
        setattr(db_product, key, value)
    
    session.add(db_product)
    session.commit()
    session.refresh(db_product)
    return db_product

@app.delete("/products/{product_id}", status_code=status.HTTP_204_NO_CONTENT)
async def delete_product(product_id: str, current_user: User = Depends(get_current_user), session: Session = Depends(get_session)):
    # Verify general role
    if current_user.role not in [UserRole.ADMIN, UserRole.EDITOR]:
        raise HTTPException(status_code=403, detail="Insufficient role")
    
    db_product = session.get(Product, product_id)
    if not db_product:
        raise HTTPException(status_code=404, detail="Product not found")
    
    # Verify menu-specific permission
    check_menu_permission(current_user, db_product.menuId)
    
    session.delete(db_product)
    session.commit()
    return None

# --- PUBLISHING CENTER & PROMOTIONS ---

@app.get("/resources", response_model=List[ResourceOut])
async def get_resources(screen: Optional[str] = None, session: Session = Depends(get_session)):
    query = select(Resource).where(Resource.is_active == True)
    resources = session.exec(query).all()
    
    if screen:
        # Filter in Python due to JSON list complexity in different DBs
        filtered = [r for r in resources if "global" in r.target_screens or screen in r.target_screens]
        return filtered
    return resources

@app.post("/admin/resources", response_model=ResourceOut)
async def create_resource(resource: ResourceCreate, current_user: User = Depends(get_current_user), session: Session = Depends(get_session)):
    if current_user.role not in [UserRole.ADMIN, UserRole.EDITOR]:
        raise HTTPException(status_code=403, detail="Insufficient role")
    
    db_resource = Resource.model_validate(resource)
    session.add(db_resource)
    session.commit()
    session.refresh(db_resource)
    return db_resource

@app.get("/admin/resources", response_model=List[ResourceOut])
async def get_all_resources(current_user: User = Depends(get_current_user), session: Session = Depends(get_session)):
    if current_user.role not in [UserRole.ADMIN, UserRole.EDITOR]:
        raise HTTPException(status_code=403, detail="Insufficient role")
    return session.exec(select(Resource)).all()

@app.delete("/admin/resources/{resource_id}", status_code=status.HTTP_204_NO_CONTENT)
async def delete_resource(resource_id: int, current_user: User = Depends(get_current_user), session: Session = Depends(get_session)):
    if current_user.role not in [UserRole.ADMIN, UserRole.EDITOR]:
        raise HTTPException(status_code=403, detail="Insufficient role")
    db_resource = session.get(Resource, resource_id)
    if not db_resource:
        raise HTTPException(status_code=404, detail="Resource not found")
    session.delete(db_resource)
    session.commit()
    return None

@app.get("/promotions", response_model=List[PromotionOut])
async def get_promotions(screen: Optional[str] = None, session: Session = Depends(get_session)):
    now = datetime.utcnow()
    query = select(Promotion).where(Promotion.is_active == True)
    promotions = session.exec(query).all()
    
    # Filter by date and screen
    filtered = []
    for p in promotions:
        if p.start_date and p.start_date > now: continue
        if p.end_date and p.end_date < now: continue
        
        if not screen or "global" in p.target_screens or screen in p.target_screens:
            filtered.append(p)
            
    return filtered

@app.post("/admin/promotions", response_model=PromotionOut)
async def create_promotion(promotion: PromotionCreate, current_user: User = Depends(get_current_user), session: Session = Depends(get_session)):
    if current_user.role not in [UserRole.ADMIN, UserRole.EDITOR]:
        raise HTTPException(status_code=403, detail="Insufficient role")
    
    db_promotion = Promotion.model_validate(promotion)
    session.add(db_promotion)
    session.commit()
    session.refresh(db_promotion)
    return db_promotion
