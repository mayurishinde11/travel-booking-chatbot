import bcrypt
import jwt
import datetime

SECRET_KEY = "your_secret_key"

# ---------------- PASSWORD HASH ----------------
def hash_password(password):
    return bcrypt.hashpw(password.encode('utf-8'), bcrypt.gensalt())

# ---------------- VERIFY PASSWORD ----------------
def verify_password(password, hashed):
    return bcrypt.checkpw(password.encode('utf-8'), hashed)

# ---------------- CREATE TOKEN ----------------
def create_token(user_id):
    payload = {
        "user_id": user_id,
        "exp": datetime.datetime.utcnow() + datetime.timedelta(hours=2)
    }
    return jwt.encode(payload, SECRET_KEY, algorithm="HS256")