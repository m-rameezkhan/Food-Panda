function userSignup() {
    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim().toLowerCase();
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confrim-password').value;

    if (!name || !email || !password || !confirmPassword) {
        alert("Please fill in all fields.");
        return;
    }

    if (password !== confirmPassword) {
        alert("Passwords do not match.");
        return;
    }

    // Get users from localStorage
    let users = JSON.parse(localStorage.getItem('users')) || [];

    // Check if user already exists
    const userExists = users.some(user => user.email === email);
    if (userExists) {
        alert("User already exists with this email.");
        return;
    }

    // Create new user and store
    const newUser = { name, email, password };
    users.push(newUser);
    localStorage.setItem('users', JSON.stringify(users));

    alert("Signup successful. You can now login.");
    // Optionally redirect or switch to login form
    loginBtn(); // Assuming you already have this function to toggle views
}

function userLogin() {
    const email = document.getElementById('email').value.trim().toLowerCase();
    const password = document.getElementById('password').value;

    if (!email || !password) {
        alert("Please enter email and password.");
        return;
    }

    const users = JSON.parse(localStorage.getItem('users')) || [];

    const foundUser = users.find(user => user.email === email && user.password === password);
    if (!foundUser) {
        alert("Invalid email or password.");
        return;
    }

    // Save current user in localStorage
    localStorage.setItem('currentUser', JSON.stringify(foundUser));
    alert("Login successful!");
    // Redirect to homepage or user dashboard
    window.location.href = "./userDashboard.html"; // or your desired page
}

