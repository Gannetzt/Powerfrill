import sqlite3
import os
from app.config import settings

# Determine DB path (for SQLite)
db_url = settings.DATABASE_URL
if db_url.startswith("sqlite:///"):
    db_path = db_url.replace("sqlite:///", "")
else:
    print("This script is designed for SQLite only for now. If using Postgres, use ALTER TABLE directly, or alembic.")
    db_path = "powerfill.db" # Default fallback

print(f"Adding phone_number to database at: {db_path}")

try:
    conn = sqlite3.connect(db_path)
    cursor = conn.cursor()
    
    # Check if column already exists
    cursor.execute("PRAGMA table_info(user)")
    columns = [info[1] for info in cursor.fetchall()]
    
    if "phone_number" not in columns:
        print("Column 'phone_number' not found. Adding it...")
        cursor.execute("ALTER TABLE user ADD COLUMN phone_number VARCHAR")
        conn.commit()
        print("Successfully added phone_number column to user table.")
    else:
        print("Column 'phone_number' already exists.")
        
    conn.close()
except Exception as e:
    print(f"An error occurred: {e}")
