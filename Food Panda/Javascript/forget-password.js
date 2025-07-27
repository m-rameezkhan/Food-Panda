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

    // ✅ Generate OTP
    const otp = Math.floor(100000 + Math.random() * 900000);

    // ✅ Send OTP to backend
    fetch("https://food-panda-server-cbwr.onrender.com/send-otp", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            email: enteredEmail,
            otp: otp
        })
    })
    .then(res => res.json())
    .then(data => {
        if (!data.success) {
            alert("Failed to send OTP: " + data.message);
            return;
        }

        // ✅ Ask user to enter the OTP
        const enteredOtp = prompt("Enter the OTP sent to your email:");

        if (enteredOtp != otp) {
            alert("Incorrect OTP. Please try again.");
            return;
        }

        const newPassword = prompt("Enter your new password:");

        if (!newPassword || newPassword.length < 4) {
            alert("Password must be at least 4 characters.");
            return;
        }

        // ✅ Update local user password
        user.password = newPassword;

        if (userList === "restaurantUsers") {
            localStorage.setItem("restaurantUsers", JSON.stringify(restaurantUsers));
        } else {
            localStorage.setItem("users", JSON.stringify(regularUsers));
        }

        alert("Password has been reset successfully! Please login with your new password.");
        window.location.href = "./signupPage.html"; // or login page
    })
    .catch(err => {
        console.error("Error:", err);
        alert("An error occurred while sending the OTP.");
    });
}
