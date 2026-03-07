import sys
import os
from sqlmodel import Session, select

# Add the parent directory to the path so we can import the app
sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

from app.database import engine
from app.models import Product

def test_fetch():
    print("Testing SQLModel fetch of products...")
    with Session(engine) as session:
        try:
            products = session.exec(select(Product)).all()
            print(f"Successfully fetched {len(products)} products.")
            for p in products:
                print(f"- {p.title} (ID: {p.id})")
        except Exception as e:
            print(f"Error during fetch: {e}")
            import traceback
            traceback.print_exc()

if __name__ == "__main__":
    test_fetch()
