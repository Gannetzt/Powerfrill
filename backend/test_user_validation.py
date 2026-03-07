import sys
import os
from sqlmodel import Session, select

# Add the parent directory to the path so we can import the app
sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

from app.database import engine
from app.models import User, UserRole

def test_user_fetch():
    print("Testing SQLModel fetch of admin user...")
    print(f"UserRole.ADMIN value: {UserRole.ADMIN.value}")
    print(f"UserRole.ADMIN name: {UserRole.ADMIN.name}")
    
    with Session(engine) as session:
        try:
            user = session.exec(select(User).where(User.email == "admin@powerfrill.com")).first()
            if user:
                print(f"Successfully fetched user: {user.email}")
                print(f"User role: {user.role}")
            else:
                print("User not found.")
        except Exception as e:
            print(f"Error during fetch: {e}")
            import traceback
            traceback.print_exc()

if __name__ == "__main__":
    test_user_fetch()
