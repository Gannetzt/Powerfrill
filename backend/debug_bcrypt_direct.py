import bcrypt

def get_password_hash(password):
    return bcrypt.hashpw(password.encode('utf-8'), bcrypt.gensalt()).decode('utf-8')

def verify_password(plain_password, hashed_password):
    return bcrypt.checkpw(plain_password.encode('utf-8'), hashed_password.encode('utf-8'))

if __name__ == "__main__":
    p = "admin123"
    print(f"Hashing '{p}'...")
    h = get_password_hash(p)
    print(f"Hash: {h}")
    v = verify_password(p, h)
    print(f"Verified: {v}")
