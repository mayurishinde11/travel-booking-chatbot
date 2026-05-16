from flask import Flask, request, jsonify
from flask_cors import CORS
from db import get_db, init_db
from auth import hash_password, verify_password, create_token
from config import RAZORPAY_KEY_ID, RAZORPAY_KEY_SECRET
from db import get_booking
import jwt
from functools import wraps
import razorpay

app = Flask(__name__)
CORS(app)

SECRET_KEY = "supersecretkey123"

# ✅ Initialize DB
init_db()

# ✅ Razorpay client
client = razorpay.Client(auth=(RAZORPAY_KEY_ID, RAZORPAY_KEY_SECRET))


# ---------------- TOKEN PROTECT ----------------
def token_required(f):
    @wraps(f)
    def decorated(*args, **kwargs):
        token = request.headers.get("Authorization")

        if not token:
            return jsonify({"message": "Token missing"}), 401

        try:
            token = token.split(" ")[1]
            data = jwt.decode(token, SECRET_KEY, algorithms=["HS256"])
            current_user = data["user_id"]
        except:
            return jsonify({"message": "Invalid token"}), 401

        return f(current_user, *args, **kwargs)
    return decorated


# ---------------- REGISTER ----------------
@app.route('/register', methods=['POST'])
def register():
    data = request.json

    if not data.get('name') or not data.get('email') or not data.get('password'):
        return jsonify({"message": "All fields required"}), 400

    conn = get_db()
    cur = conn.cursor()

    cur.execute("SELECT * FROM users WHERE email=?", (data['email'],))
    if cur.fetchone():
        return jsonify({"message": "User already exists"}), 400

    cur.execute(
        "INSERT INTO users (name, email, password) VALUES (?, ?, ?)",
        (data['name'], data['email'], hash_password(data['password']))
    )
    conn.commit()

    return jsonify({"message": "Registered successfully"})


# ---------------- LOGIN ----------------
@app.route('/login', methods=['POST'])
def login():
    data = request.json

    conn = get_db()
    cur = conn.cursor()

    cur.execute("SELECT * FROM users WHERE email=?", (data['email'],))
    user = cur.fetchone()

    if not user:
        return jsonify({"message": "User not found"}), 404

    if not verify_password(data['password'], user['password']):
        return jsonify({"message": "Invalid password"}), 401

    token = create_token(user['email'])

    return jsonify({
        "message": "Login successful",
        "token": token
    })


# ---------------- BOOK TRIP ----------------
@app.route('/book', methods=['POST'])
@token_required
def book_trip(current_user):
    data = request.json

    conn = get_db()
    cur = conn.cursor()

    cur.execute("""
        INSERT INTO bookings (email, destination, type, budget, status, payment_status)
        VALUES (?, ?, ?, ?, ?, ?)
    """, (current_user, data['destination'], data['type'], data['budget'], "Booked", "Pending"))

    conn.commit()

    return jsonify({"message": "Booking created"})


# ---------------- CREATE ORDER (NO AUTH) ----------------
@app.route("/create-order", methods=["POST"])
def create_order_api():
    print("CREATE ORDER HIT")

    import razorpay
    client = razorpay.Client(auth=(RAZORPAY_KEY_ID, RAZORPAY_KEY_SECRET))

    data = request.get_json()
    amount = int(data["amount"]) * 100

    order = client.order.create({
        "amount": amount,
        "currency": "INR"
    })

    return jsonify(order)

# ---------------- DASHBOARD ----------------
@app.route('/my-bookings', methods=['GET'])
@token_required
def my_bookings(current_user):
    conn = get_db()
    cur = conn.cursor()

    cur.execute("SELECT * FROM bookings WHERE email=?", (current_user,))
    rows = cur.fetchall()

    return jsonify([dict(row) for row in rows])

# @app.route("/get-booking/<booking_id>")
# def get_booking_api(booking_id):
#     row = get_booking(booking_id)

#     return {
#         "booking_id": row[1],
#         "user": row[2],
#         "city": row[3],
#         "amount": row[4],
#         "payment_id": row[5],
#         "status": row[7]
#     }


# ---------------- RUN APP ----------------
if __name__ == '__main__':
    app.run(debug=True)