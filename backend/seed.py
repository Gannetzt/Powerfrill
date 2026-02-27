import sys
import os
from sqlmodel import Session, select
from app.database import create_db_and_tables, engine
from app.models import User, UserRole
from app.auth import get_password_hash

def seed_users():
    with Session(engine) as session:
        # Check if admin already exists
        admin = session.exec(select(User).where(User.username == "admin")).first()
        if not admin:
            print("Creating admin user...")
            admin = User(
                username="admin",
                email="admin@powerfill.com",
                hashed_password=get_password_hash("admin123"), # Default password
                role=UserRole.ADMIN
            )
            session.add(admin)
            session.commit()
            print("Admin user created successfully.")
        else:
            print("Admin user already exists.")

if __name__ == "__main__":
    create_db_and_tables()
    seed_users()
    print("Seeding complete.")
