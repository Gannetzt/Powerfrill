import os
import time

db_file = "powerfill.db"
if os.path.exists(db_file):
    print(f"Attempting to delete {db_file}...")
    try:
        os.remove(db_file)
        print("Successfully deleted database.")
    except Exception as e:
        print(f"Error deleting database: {e}")
        # If it's locked, we might need more aggressive measures or just wait
else:
    print("Database file does not exist.")
