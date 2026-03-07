import sqlite3
import os
import sys
from datetime import datetime

# Add the parent directory to the path so we can import the app.auth
sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
from app.auth import get_password_hash

DB_PATH = "./powerfill.db"

def manual_seed():
    print(f"Connecting to {DB_PATH} for manual seed...")
    if not os.path.exists(DB_PATH):
        print("Database file not found. Please ensure the app has run at least once.")
        return

    conn = sqlite3.connect(DB_PATH)
    cursor = conn.cursor()

    try:
        # 1. Admin User
        hashed_pw = get_password_hash("admin123")
        cursor.execute("SELECT id FROM user WHERE email = 'admin@powerfrill.com'")
        if not cursor.fetchone():
            cursor.execute("""
                INSERT INTO user (email, username, full_name, hashed_password, role, is_active, permissions)
                VALUES (?, ?, ?, ?, ?, ?, ?)
            """, ("admin@powerfrill.com", "admin", "Powerfrill Admin", hashed_pw, "admin", 1, "{}"))
            print("Admin user created.")
        else:
            print("Admin user exists.")

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
                "categoryPath": "[]",
                "features": "[]",
                "advantages": "[]",
                "gallery": "[]",
                "industryTags": "[]",
                "technologyTags": "[]",
                "applicationTags": "[]",
                "specifications": "{}"
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
                "category": "Solar Storage",
                "categoryPath": "[]",
                "features": "[]",
                "advantages": "[]",
                "gallery": "[]",
                "industryTags": "[]",
                "technologyTags": "[]",
                "applicationTags": "[]",
                "specifications": "{}"
            }
        ]

        for p in products:
            cursor.execute("SELECT id FROM product WHERE id = ?", (p["id"],))
            if not cursor.fetchone():
                cursor.execute("""
                    INSERT INTO product (id, menuId, groupId, categoryId, slug, title, subtitle, image, productType, brief, description, solutionId, category, categoryPath, features, advantages, gallery, industryTags, technologyTags, applicationTags, specifications)
                    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
                """, (p["id"], p["menuId"], p["groupId"], p["categoryId"], p["slug"], p["title"], p["subtitle"], p["image"], p["productType"], p["brief"], p["description"], p["solutionId"], p["category"], p["categoryPath"], p["features"], p["advantages"], p["gallery"], p["industryTags"], p["technologyTags"], p["applicationTags"], p["specifications"]))
                print(f"Product {p['id']} created.")
            else:
                print(f"Product {p['id']} exists.")

        conn.commit()
        print("Manual seeding complete.")

    except Exception as e:
        print(f"Error during manual seed: {e}")
        conn.rollback()
    finally:
        conn.close()

if __name__ == "__main__":
    manual_seed()
