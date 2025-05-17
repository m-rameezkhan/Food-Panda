function showSignupWidgets() {
    let loginWidgets = document.querySelectorAll(".loginWdgt");
    let signupWidgets = document.querySelectorAll(".signupWdgt");

    loginWidgets.forEach(widget => widget.classList.add("hide"));
    signupWidgets.forEach(widget => widget.classList.remove("hide"));
}

function showLoginWidgets() {
    let loginWidgets = document.querySelectorAll(".loginWdgt");
    let signupWidgets = document.querySelectorAll(".signupWdgt");

    signupWidgets.forEach(widget => widget.classList.add("hide"));
    loginWidgets.forEach(widget => widget.classList.remove("hide"));
}

function navigateWithLoader(url) {
    const loader = document.getElementById("loader");
    loader.classList.remove("hide");

    setTimeout(() => {
        window.location.href = url;
    }, 100); // Delay to show loader before redirect
}

function signupBtn() {
    if (window.location.pathname.includes("signup-page.html")) {
        // Already on signup page: just toggle widgets
        showSignupWidgets();
        // Optionally update URL param without reload if you want
        history.replaceState(null, '', './signup-page.html?signup=true');
    } else {
        // Not on signup page: redirect with loader
        navigateWithLoader("./signup-page.html?signup=true");
    }
}

function loginBtn() {
    if (window.location.pathname.includes("signup-page.html")) {
        // Already on signup page: just toggle widgets
        showLoginWidgets();
        history.replaceState(null, '', './signup-page.html?login=true');
    } else {
        navigateWithLoader("./signup-page.html?login=true");
    }
}

// On page load: show correct widgets based on URL param
window.onload = function() {
    const urlParams = new URLSearchParams(window.location.search);
    const isSignup = urlParams.get("signup") === "true";
    const isLogin = urlParams.get("login") === "true";

    if (isSignup) {
        showSignupWidgets();
    } else if (isLogin) {
        showLoginWidgets();
    }
};
