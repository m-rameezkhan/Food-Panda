// const { use } = require("react");

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
    window.location.href = './signupPage.html'
}

function signupAdmin() {

    // Get form values
    let adminName = document.querySelector("#r-name");
    let adminEmail = document.querySelector("#r-email");
    let rCity = document.querySelector("#cities");
    let foodType = document.querySelector("#Food-Type");
    let adminPassword = document.querySelector("#r-password");

    console.log(adminName, adminEmail, rCity, adminPassword, foodType);
    let inputFields = [adminName, adminEmail, rCity, foodType, adminPassword]


    if (highlightIfEmpty(inputFields)) {

        // Retrieve existing users from localStorage
        let restaurantUsers = JSON.parse(localStorage.getItem("restaurantUsers")) || [];

        const isEmailTaken = restaurantUsers.some(user => user.email === adminEmail.value);

        if (isEmailTaken) {
            alert("This email is already registered");
            return; // Exit the function to prevent saving a duplicate
        }

        // Create a new user object
        let newUser = {
            name: adminName.value,
            email: adminEmail.value,
            city: rCity.value,
            type: foodType.value,
            password: adminPassword.value
        };

        // Save the new user to localStorage
        restaurantUsers.push(newUser);
        localStorage.setItem("restaurantUsers", JSON.stringify(restaurantUsers));

        alert("Signup successful! User saved in localStorage.");
        window.location.href = './adminLogin.html';
    }
}

function loginAdmin() {
    let adminEmail = document.getElementById("admin-email").value;
    let adminPassword = document.getElementById("admin-password").value;
    let restaurantUsers = JSON.parse(localStorage.getItem("restaurantUsers")) || [];

    // Find the user object that matches the login info
    const loggedInUser = restaurantUsers.find(user => user.email == adminEmail && user.password == adminPassword);
    
    console.log(adminEmail, adminPassword, loggedInUser);

    if (loggedInUser) {
        // alert("Login Success");
        
        // Store the admin name in local storage
        // localStorage.setItem("adminName", loggedInUser.name);
        // localStorage.setItem("Login", true);
        localStorage.setItem("loggedInAdmin", loggedInUser.name);

        window.location.href = "./adminDashboard.html";
    } else {
        let wrongEmail = document.getElementById("wrong-email")
        wrongEmail.classList.remove("hide")
    }
}

function logout() {
    localStorage.setItem("Login", false);
    localStorage.removeItem("loggedInAdmin")
    window.location.href = "./adminLogin.html"
}

