import razorpay
from config import RAZORPAY_KEY_ID, RAZORPAY_KEY_SECRET

# Create Razorpay client (TEST MODE)
client = razorpay.Client(auth=(RAZORPAY_KEY_ID, RAZORPAY_KEY_SECRET))
def create_order(amount):
    order = client.order.create({
        "amount": amount * 100,  # convert rupees to paise
        "currency": "INR",
        "payment_capture": 1
    })
    return order