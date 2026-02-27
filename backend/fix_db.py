from sqlmodel import SQLModel, create_engine, Session, select
import os

# Import all models to ensure they are registered
from app.models import User, Product, Inquiry, UserRole, Resource, Promotion
from app.auth import get_password_hash

from app.config import settings

engine = create_engine(settings.DATABASE_URL)

def fix():
    if "sqlite" in settings.DATABASE_URL and os.path.exists("powerfill.db"):
        os.remove("powerfill.db")
    
    print("Dropping existing tables (Force Refresh)...")
    SQLModel.metadata.drop_all(engine)
    
    print("Creating tables...")
    SQLModel.metadata.create_all(engine)
    
    with Session(engine) as session:
        print("Checking tables...")
        from sqlalchemy import inspect
        inspector = inspect(engine)
        print("Tables created:", inspector.get_table_names())
        
        if "user" in inspector.get_table_names():
            print("Creating admin...")
            admin = User(
                username="admin",
                email="admin@powerfill.com",
                hashed_password=get_password_hash("admin123"),
                role=UserRole.ADMIN
            )
            session.add(admin)
            session.commit()
            print("Admin created.")
        else:
            print("ERROR: 'user' table still not found!")

if __name__ == "__main__":
    fix()
