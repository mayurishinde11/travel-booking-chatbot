
const API = "http://127.0.0.1:5000";

function getToken() {
    return localStorage.getItem("token");
}

function startChat() {
    let destination = document.getElementById("destination").value;
    let type = document.getElementById("type").value;
    let budget = document.getElementById("budget").value;
    let mode = document.getElementById("mode").value;
    let food = document.getElementById("food").value;

    // ❗ Validation
    if (!destination || !type || !budget || !mode || !food) {
        alert("Please select all fields");
        return;
    }

    let trip = { destination, type, budget, mode, food };
    localStorage.setItem("trip", JSON.stringify(trip));

    document.getElementById("chatbox").innerHTML += `
        <p><b>You:</b> ${destination}, ${type}, ₹${budget}, ${mode}, ${food}</p>
        <p><b>Bot:</b> Great choice! We found a perfect plan for you 🎉</p>
        <button onclick="bookTrip()">Book Now</button>
    `;
}

async function bookTrip() {
    let trip = JSON.parse(localStorage.getItem("trip"));

    await fetch(API + "/book", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + getToken()
        },
        body: JSON.stringify(trip)
    });

    window.location.href = "booking.html";
}

const travelData = {
    Goa: {
        famous: "Beaches, nightlife, water sports",
        experience: "Relaxing beach vibes, parties, sunset views",
        food: "Seafood, Goan curry, fish thali",
        activities: "Parasailing, scuba diving, cruise",
    },

    Manali: {
        famous: "Snow mountains, Solang Valley",
        experience: "Cold weather, adventure, scenic beauty",
        food: "Maggi, momos, Himachali dishes",
        activities: "Skiing, paragliding, trekking",
    },

    Shimla: {
        famous: "Mall Road, hills, toy train",
        experience: "Peaceful hill station vibes",
        food: "Chole bhature, bakery items",
        activities: "Shopping, sightseeing",
    },

    Kerala: {
        famous: "Backwaters, houseboats",
        experience: "Calm nature, greenery",
        food: "South Indian meals, coconut dishes",
        activities: "Boat ride, Ayurveda spa",
    },

    Jaipur: {
        famous: "Forts, palaces, culture",
        experience: "Royal heritage feel",
        food: "Dal bati churma, Rajasthani thali",
        activities: "Fort visit, shopping",
    }
};


function startChat() {

    let destination = document.getElementById("destination").value;
    let type = document.getElementById("type").value;
    let budget = document.getElementById("budget").value;
    let mode = document.getElementById("mode").value;
    let food = document.getElementById("food").value;

    if (!destination || !type || !budget || !mode || !food) {
        alert("Please select all fields");
        return;
    }

    let trip = { destination, type, budget, mode, food };
    localStorage.setItem("trip", JSON.stringify(trip));

    let place = travelData[destination];

    document.getElementById("chatbox").innerHTML += `
        <p><b>You:</b> ${destination}, ${type}, ₹${budget}, ${mode}, ${food}</p>

        <p><b>Bot:</b> 🌍 <b>${destination}</b> is a great choice!</p>

        <p>✨ <b>Famous for:</b> ${place.famous}</p>
        <p>😍 <b>Experience:</b> ${place.experience}</p>
        <p>🍴 <b>Food:</b> ${place.food}</p>
        <p>🎯 <b>Activities:</b> ${place.activities}</p>

        <p>💰 <b>Budget Plan:</b> You can enjoy a full trip within ₹${budget}</p>

        <button onclick="bookTrip()">Book Now</button>
    `;
}

// existing code above...

async function payNow() {

    let trip = JSON.parse(localStorage.getItem("trip"));

    let res = await fetch("http://127.0.0.1:5000/create-order", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ amount: trip.budget })
    });

    let order = await res.json();

    console.log("ORDER:", order);

    if (!order.id) {
        alert("Order failed!");
        return;
    }

    let options = {
        key: "rzp_test_SjOHnMshaOQG0S",   // ✅ same as backend
        amount: order.amount,
        currency: "INR",
        order_id: order.id,

        handler: function () {
            alert("Payment Successful!");
        }
    };

    new Razorpay(options).open();
}

function showToast(message) {
    let toast = document.getElementById("toast");
    toast.innerText = message;
    toast.classList.add("show");

    setTimeout(() => {
        toast.classList.remove("show");
    }, 3000);
}

function logout() {
    // Optional: clear session / login data
    localStorage.clear();
    sessionStorage.clear();

    // Show success message
    showToast("You are logged out successfully");

    // Redirect to login page after short delay
    setTimeout(() => {
        window.location.href = "login.html"; 
        // 👉 change this if your login file name is different
    }, 1200);
}