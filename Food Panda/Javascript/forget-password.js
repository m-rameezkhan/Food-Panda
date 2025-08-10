async function forgetPassword() {
    const emailInput = document.getElementById("admin-email");
    const email = emailInput.value.trim();
    const otpInput = document.getElementById("opt");
    const newPassword = document.getElementById("new-password");
    const confirmNewPassword = document.getElementById("confrim-new-password");
    const wrongEmailMsg = document.getElementById("wrong-email");
    const textElement = document.getElementById("text");
    const headingElement = document.getElementById("heading");
    const button = document.querySelector(".signup-btn-admin");

    const API_BASE_URL = "https://food-panda-server-cbwr.onrender.com";

    // Helper to disable button with style
    const disableButton = (text = "Please wait...") => {
        button.disabled = true;
        button.style.opacity = "0.6";
        button.style.cursor = "not-allowed";
        button.textContent = text;
    };

    // Helper to enable button back
    const enableButton = (text) => {
        button.disabled = false;
        button.style.opacity = "1";
        button.style.cursor = "pointer";
        if (text) button.textContent = text;
    };

    if (!otpInput.classList.contains("hide")) {
        // OTP step
        const otp = otpInput.value.trim();
        if (!otp) return alert("Please enter OTP");

        disableButton("Verifying OTP...");
        try {
            const res = await fetch(`${API_BASE_URL}/verify-otp`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, otp })
            });

            const data = await res.json();
            if (data.success) {
                otpInput.classList.add("hide");
                newPassword.classList.remove("hide");
                confirmNewPassword.classList.remove("hide");
                button.textContent = "Reset Password";
                textElement.textContent = "Enter your new password below";
            } else {
                alert(data.message);
            }
        } catch (err) {
            console.error("Error verifying OTP:", err);
        }
        enableButton();
    } else if (!newPassword.classList.contains("hide")) {
        // Reset password step
        if (newPassword.value !== confirmNewPassword.value) {
            return alert("Passwords do not match");
        }

        disableButton("Updating...");
        updatePasswordInLocalStorage(email, newPassword.value);

        alert("Password reset successful!");
        window.location.href = 'signupPage.html';
    } else {
        // Send OTP step
        if (!email) return alert("Please enter your email");

        // Check email in both arrays before sending OTP
        const users = JSON.parse(localStorage.getItem("users")) || [];
        const restaurantUsers = JSON.parse(localStorage.getItem("restaurantUsers")) || [];

        const emailExists =
            users.some(u => u.email === email) ||
            restaurantUsers.some(u => u.email === email);

        if (!emailExists) {
            wrongEmailMsg.classList.remove("hide");
            return;
        }

        disableButton("Sending OTP...");
        try {
            const res = await fetch(`${API_BASE_URL}/send-otp`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email })
            });

            const data = await res.json();
            if (data.success) {
                otpInput.classList.remove("hide");
                wrongEmailMsg.classList.add("hide");
                button.textContent = "Verify OTP";

                // Hide email input
                emailInput.classList.add("hide");

                // Mask email for display
                const maskedEmail = maskEmail(email);
                textElement.textContent = `OTP sent to ${maskedEmail}`;
            } else {
                wrongEmailMsg.classList.remove("hide");
                console.error("Server error:", data.message);
            }
        } catch (err) {
            console.error("Error sending OTP:", err);
        }
        enableButton();
    }
}

function maskEmail(email) {
    const [user, domain] = email.split("@");
    const maskedUser =
        user.length <= 2
            ? user[0] + "*".repeat(user.length - 1)
            : user[0] + "*".repeat(user.length - 2) + user.slice(-1);
    return `${maskedUser}@${domain}`;
}

function updatePasswordInLocalStorage(email, newPass) {
    let users = JSON.parse(localStorage.getItem("users")) || [];
    let restaurantUsers = JSON.parse(localStorage.getItem("restaurantUsers")) || [];

    let userIndex = users.findIndex(u => u.email === email);
    if (userIndex !== -1) {
        users[userIndex].password = newPass;
        localStorage.setItem("users", JSON.stringify(users));
        return;
    }

    let restIndex = restaurantUsers.findIndex(u => u.email === email);
    if (restIndex !== -1) {
        restaurantUsers[restIndex].password = newPass;
        localStorage.setItem("restaurantUsers", JSON.stringify(restaurantUsers));
    }
}

function goBack() {
    window.history.back();
}
