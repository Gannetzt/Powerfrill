import sys
from sqlmodel import create_engine, Session, text

DATABASE_URL = "postgresql://neondb_owner:npg_Qi0nTy6LeoaN@ep-twilight-cloud-aizn5cti-pooler.c-4.us-east-1.aws.neon.tech/powerfrill_website?sslmode=require&channel_binding=require"

def test_connection():
    try:
        engine = create_engine(DATABASE_URL)
        with Session(engine) as session:
            result = session.exec(text("SELECT 1;")).first()
            print(f"Connection successful: {result}")
    except Exception as e:
        print(f"Connection failed: {e}")
        sys.exit(1)

if __name__ == "__main__":
    test_connection()
