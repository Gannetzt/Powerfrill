from app.database import create_db_and_tables

if __name__ == "__main__":
    print("Initializing database schema...")
    create_db_and_tables()
    print("Schema initialization complete.")
