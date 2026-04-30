
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
        famous: "Beaches, nightlife, water sports, Portuguese heritage",
        experience: "Relaxed beach lifestyle, party culture, sunset cruises, vibrant nightlife",
        food: "Seafood, Goan curry, fish thali, bebinca dessert",
        activities: "Parasailing, scuba diving, jet ski, yacht cruise, casino",
        bestTime: "November to February",
        budget: "₹8,000 - ₹25,000 (3–5 days)",
        placesToVisit: "Baga Beach, Calangute Beach, Anjuna Beach, Fort Aguada, Basilica of Bom Jesus",
        travelTips: "Rent a scooter for local travel, avoid peak holiday rush, try beach shacks",
        hiddenGems: "Butterfly Beach, Divar Island, Arambol Beach",
        nightlife: "Tito’s Lane, casino cruises, beach parties",
        weather: "Tropical, humid, best in winter"
    },

    Manali: {
        famous: "Snow mountains, Solang Valley, adventure sports",
        experience: "Snowfall (seasonal), peaceful hills, adventure tourism",
        food: "Maggi at hill stalls, momos, siddu, Himachali dham",
        activities: "Skiing, paragliding, trekking, river rafting, snow scooter",
        bestTime: "October to June (snow in Dec–Feb)",
        budget: "₹7,000 - ₹20,000",
        placesToVisit: "Solang Valley, Rohtang Pass, Mall Road, Hidimba Temple, Jogini Waterfalls",
        travelTips: "Carry warm clothes, check road conditions for Rohtang Pass",
        hiddenGems: "Old Manali cafes, Sethan Valley, Hampta Pass",
        nightlife: "Cafe hopping in Old Manali",
        weather: "Cold, snowy in winter"
    },

    Shimla: {
        famous: "Mall Road, colonial architecture, toy train",
        experience: "Calm hill station, colonial charm, scenic views",
        food: "Chole bhature, bun samosa, bakery items, street snacks",
        activities: "Shopping, toy train ride, sightseeing",
        bestTime: "March to June, December for snow",
        budget: "₹6,000 - ₹15,000",
        placesToVisit: "Mall Road, Kufri, Jakhoo Temple, Ridge, Christ Church",
        travelTips: "Book hotels early in peak season",
        hiddenGems: "Chail, Mashobra, Naldehra",
        weather: "Cold winters, pleasant summers"
    },

    Kerala: {
        famous: "Backwaters, greenery, houseboats, Ayurveda",
        experience: "Peaceful nature, slow travel, wellness tourism",
        food: "Appam, dosa, seafood, coconut curry, banana chips",
        activities: "Houseboat cruise, Ayurveda spa, tea plantation visit",
        bestTime: "September to March",
        budget: "₹10,000 - ₹30,000",
        placesToVisit: "Alleppey, Munnar, Kochi, Thekkady, Wayanad",
        travelTips: "Book houseboats early, explore local villages",
        hiddenGems: "Varkala Cliff, Marari Beach, Poovar Island",
        weather: "Tropical, heavy monsoon"
    },

    Jaipur: {
        famous: "Forts, palaces, royal heritage, architecture",
        experience: "Royal lifestyle, rich culture, historical vibe",
        food: "Dal bati churma, ghewar, kachori, Rajasthani thali",
        activities: "Fort visits, shopping, camel rides",
        bestTime: "October to March",
        budget: "₹5,000 - ₹18,000",
        placesToVisit: "Hawa Mahal, Amber Fort, City Palace, Jantar Mantar, Nahargarh Fort",
        travelTips: "Start sightseeing early to avoid heat",
        hiddenGems: "Panna Meena Ka Kund, Chand Baori (nearby), Patrika Gate",
        weather: "Hot summers, pleasant winters"
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

    <p><b>Bot:</b> 🌍 <b>${destination}</b> is a perfect travel choice!</p>

    <p>✨ <b>Famous for:</b> ${place.famous}</p>
    <p>😍 <b>Experience:</b> ${place.experience}</p>
    <p>🍴 <b>Food:</b> ${place.food}</p>
    <p>🎯 <b>Activities:</b> ${place.activities}</p>

    <hr>

    <p>📅 <b>Best Time to Visit:</b> ${place.bestTime}</p>
    <p>💰 <b>Estimated Budget:</b> ${place.budget}</p>
    <p>📍 <b>Places to Visit:</b> ${place.placesToVisit}</p>
    <p>🧭 <b>Travel Tips:</b> ${place.travelTips}</p>
    <p>💎 <b>Hidden Gems:</b> ${place.hiddenGems}</p>
    <p>🌙 <b>Nightlife:</b> ${place.nightlife}</p>
    <p>🌦 <b>Weather:</b> ${place.weather}</p>

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

function goHome() {
    window.location.href = "index.html";
}