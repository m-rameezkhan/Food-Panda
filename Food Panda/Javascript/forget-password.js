function forgetPassword() {
    const emailInput = document.getElementById("admin-email");
    const wrongEmailMsg = document.getElementById("wrong-email");

    const enteredEmail = emailInput.value.trim();
    const restaurantUsers = JSON.parse(localStorage.getItem("restaurantUsers")) || [];
    const regularUsers = JSON.parse(localStorage.getItem("users")) || [];

    // find user by email in admins
    let user = restaurantUsers.find(u => u.email === enteredEmail);
    let userList = "restaurantUsers";

    if (!user) {
        // check in regular users
        user = regularUsers.find(u => u.email === enteredEmail);
        userList = "users";
    }

    if (!user) {
        wrongEmailMsg.classList.remove("hide");
        return;
    }

    wrongEmailMsg.classList.add("hide");

    // generate OTP
    const otp = Math.floor(100000 + Math.random() * 900000);
    alert(`Your OTP is: ${otp}`); // simulate sending email
    console.log(`OTP for ${enteredEmail}: ${otp}`);

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

    // update password in the correct list
    user.password = newPassword;

    if (userList === "restaurantUsers") {
        localStorage.setItem("restaurantUsers", JSON.stringify(restaurantUsers));
    } else {
        localStorage.setItem("users", JSON.stringify(regularUsers));
    }

    alert("Password has been reset successfully! Please login with your new password.");
    window.location.href = "./signupPage.html"; // or login page
}
