import sys
import os
import json
from datetime import datetime
from sqlalchemy import create_engine, text
from app.auth import get_password_hash

# Add the parent directory to the path so we can import the app
sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

# Local SQLITE engine or DATABASE_URL
DATABASE_URL = "sqlite:///./powerfill.db" # Standard default
engine = create_engine(DATABASE_URL)

def seed_database():
    print("Starting direct SQL database seeding...")
    
    with engine.connect() as conn:
        # 1. Admin User
        admin_exists = conn.execute(text("SELECT 1 FROM user WHERE email = :email"), {"email": "admin@powerfill.com"}).fetchone()
        if not admin_exists:
            hashed_pw = get_password_hash("admin123")
            conn.execute(text("""
                INSERT INTO user (email, username, full_name, hashed_password, role, is_active, permissions)
                VALUES (:email, :username, :full_name, :hashed_password, :role, :is_active, :permissions)
            """), {
                "email": "admin@powerfill.com",
                "username": "admin",
                "full_name": "Powerfrill Admin",
                "hashed_password": hashed_pw,
                "role": "admin",
                "is_active": True,
                "permissions": "{}"
            })
            conn.commit()
            print("Admin user created.")

        # 2. Products
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
                "category": "E-Rickshaw",
                "categoryPath": '[]',
                "features": '[]',
                "advantages": '[]',
                "gallery": '[]',
                "industryTags": '[]',
                "technologyTags": '[]',
                "applicationTags": '[]',
                "specifications": '{}'
            }
        ]

        for p in products:
            p_exists = conn.execute(text("SELECT 1 FROM product WHERE id = :id"), {"id": p["id"]}).fetchone()
            if not p_exists:
                conn.execute(text("""
                    INSERT INTO product (id, menuId, groupId, categoryId, slug, title, subtitle, image, productType, brief, description, solutionId, category, categoryPath, features, advantages, gallery, industryTags, technologyTags, applicationTags, specifications)
                    VALUES (:id, :menuId, :groupId, :categoryId, :slug, :title, :subtitle, :image, :productType, :brief, :description, :solutionId, :category, :categoryPath, :features, :advantages, :gallery, :industryTags, :technologyTags, :applicationTags, :specifications)
                """), p)
                conn.commit()
                print(f"Product {p['id']} created.")

    print("Direct SQL seeding complete.")

if __name__ == "__main__":
    seed_database()
