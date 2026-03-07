import sys
import os
from datetime import datetime
from sqlmodel import Session, select, SQLModel
from app.models import Product, User, UserRole
from app.auth import get_password_hash

# Add the parent directory to the path so we can import the app
sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

# Import from app after setting path
from app.database import engine, create_db_and_tables

def seed_database():
    print("Starting simplified database seeding...")
    create_db_and_tables()

    with Session(engine) as session:
        # 1. Admin User
        admin = session.exec(select(User).where(User.email == "admin@powerfill.com")).first()
        if not admin:
            admin = User(
                email="admin@powerfill.com",
                username="admin",
                full_name="Powerfrill Admin",
                hashed_password=get_password_hash("admin123"),
                role=UserRole.ADMIN,
                is_active=True,
                permissions={} # Simplified
            )
            session.add(admin)
            session.commit()
            print("Admin user created.")

        # 2. Basic Products (Avoiding complex JSON for initial success)
        products = [
            {
                "id": "erickshaw-pro-60",
                "menuId": "e-mobility",
                "groupId": "traction",
                "categoryId": "e-rickshaw",
                "slug": "erickshaw-lfp-60ah",
                "title": "Powerfrill E-Rickshaw Pro",
                "subtitle": "High-Efficiency LFP Traction Core",
                "image": "/assets/products/erickshaw_pro.png",
                "productType": "LFP Battery",
                "brief": "Engineered for maximum uptime.",
                "description": "Standard LFP chemistry.",
                "solutionId": "traction-system",
                "category": "E-Rickshaw"
            },
            {
                "id": "solar-storage-5kw",
                "menuId": "solar",
                "groupId": "stationary",
                "categoryId": "solar-storage",
                "slug": "solar-lfp-5kw",
                "title": "Powerfrill SolarHome Core",
                "subtitle": "Residential Storage",
                "image": "/assets/products/solar_storage.png",
                "productType": "Storage System",
                "brief": "Modular energy storage.",
                "description": "Wall-mountable LFP storage.",
                "solutionId": "solar-system",
                "category": "Solar Storage"
            }
        ]

        for p_data in products:
            p = session.get(Product, p_data["id"])
            if not p:
                session.add(Product(**p_data))
                session.commit()
                print(f"Product {p_data['id']} created.")
            else:
                print(f"Product {p_data['id']} exists.")

    print("Simplified seeding complete.")

if __name__ == "__main__":
    seed_database()
