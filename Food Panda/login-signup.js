let cities = document.getElementById("cities");
if (cities) {
    const pakistaniCities = [
        "Karachi", "Lahore", "Islamabad", "Rawalpindi", "Faisalabad",
        "Peshawar", "Quetta", "Multan", "Sialkot", "Gujranwala",
        "Sargodha", "Bahawalpur", "Hyderabad", "Sukkur", "Larkana",
        "Sheikhupura", "Sahiwal", "Mardan", "Abbottabad", "Dera Ghazi Khan",
        "Muzaffarabad", "Mirpur", "Chitral", "Gilgit", "Skardu",
        "Jhelum", "Khuzdar", "Gwadar", "Nawabshah", "Mandi Bahauddin"
    ];

    pakistaniCities.forEach(city => {
        cities.innerHTML += `<option value="${city}">${city}</option>`;
    });
}

function goBack() {
    window.location.href = './adminLogin.html'
}


function signup(event) {
    // Prevent page reload on form submission
    event.preventDefault();

    // Check if the form is valid
    const form = document.getElementById("restaurantForm");
    if (!form.checkValidity()) {
        alert("Please fill out all required fields correctly.");
        return;
    }

    // Get form values
    let rName = document.querySelector("#r-name").value;
    let rEmail = document.querySelector("#r-email").value;
    let rCity = document.querySelector("#cities").value;
    let foodType = document.querySelector("#Food-Type").value;
    let rPassword = document.querySelector("#r-password").value;

    console.log(rName, rEmail, rCity, rPassword, foodType);

    // Retrieve existing users from localStorage
    let restaurantUsers = JSON.parse(localStorage.getItem("restaurantUsers")) || [];

    // Create a new user object
    let newUser = {
        name: rName,
        email: rEmail,
        city: rCity,
        type: foodType,
        password: rPassword
    };

    // Save the new user to localStorage
    restaurantUsers.push(newUser);
    localStorage.setItem("restaurantUsers", JSON.stringify(restaurantUsers));

    alert("Signup successful! User saved in localStorage.");
    window.location.href = './adminLogin.html';
}
