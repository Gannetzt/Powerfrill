from passlib.context import CryptContext

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

def get_password_hash(password):
    return pwd_context.hash(password)

if __name__ == "__main__":
    try:
        p = "admin123"
        print(f"Hashing '{p}'...")
        h = get_password_hash(p)
        print(f"Hash: {h}")
    except Exception as e:
        print(f"Error: {e}")
        import traceback
        traceback.print_exc()
