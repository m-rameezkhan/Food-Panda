function forgetPassword() {
    const emailInput = document.getElementById("admin-email");
    const wrongEmailMsg = document.getElementById("wrong-email");

    const enteredEmail = emailInput.value.trim();
    const restaurantUsers = JSON.parse(localStorage.getItem("restaurantUsers")) || [];
    const regularUsers = JSON.parse(localStorage.getItem("users")) || [];

    let user = restaurantUsers.find(u => u.email === enteredEmail);
    let userList = "restaurantUsers";

    if (!user) {
        user = regularUsers.find(u => u.email === enteredEmail);
        userList = "users";
    }

    if (!user) {
        wrongEmailMsg.classList.remove("hide");
        return;
    }

    wrongEmailMsg.classList.add("hide");

    // ✅ Step 1: Ask backend to send OTP
    fetch("https://food-panda-server-cbwr.onrender.com/send-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: enteredEmail })
    })
    .then(res => res.json())
    .then(data => {
        if (!data.success) {
            alert("Failed to send OTP: " + data.message);
            return;
        }
        console.log("OTP sent successfully!");

        // ✅ Step 2: Ask user to enter OTP
        const enteredOtp = prompt("Enter the OTP sent to your email:");

        if (!enteredOtp) {
            alert("You must enter an OTP.");
            return;
        }

        // ✅ Step 3: Verify OTP with backend
        return fetch("https://food-panda-server-cbwr.onrender.com/verify-otp", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email: enteredEmail, otp: enteredOtp })
        });
    })
    .then(res => res ? res.json() : null)
    .then(data => {
        if (!data) return; // no response to handle

        if (!data.success) {
            alert("OTP verification failed: " + data.message);
            return;
        }

        // ✅ Step 4: Let user set new password
        const newPassword = prompt("Enter your new password:");

        if (!newPassword || newPassword.length < 4) {
            alert("Password must be at least 4 characters.");
            return;
        }

        // ✅ Step 5: Update password in local storage
        user.password = newPassword;

        if (userList === "restaurantUsers") {
            localStorage.setItem("restaurantUsers", JSON.stringify(restaurantUsers));
        } else {
            localStorage.setItem("users", JSON.stringify(regularUsers));
        }

        alert("Password reset successfully! Please login with your new password.");
        window.location.href = "./signupPage.html"; // or login page
    })
    .catch(err => {
        console.error("Error:", err);
        alert("An error occurred during the process.");
    });
}
