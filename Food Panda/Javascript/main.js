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
    if (window.location.pathname.includes("signupPage.html")) {
        // Already on signup page: just toggle widgets
        showSignupWidgets();
        // Optionally update URL param without reload if you want
        history.replaceState(null, '', './signupPage.html?signup=true');
    } else {
        // Not on signup page: redirect with loader
        navigateWithLoader("./signupPage.html?signup=true");
    }
}

function loginBtn() {
    if (window.location.pathname.includes("signupPage.html")) {
        // Already on signup page: just toggle widgets
        showLoginWidgets();
        history.replaceState(null, '', './signupPage.html?login=true');
    } else {
        navigateWithLoader("./signupPage.html?login=true");
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

function closeUpperNav(e) {
    let upperNav = document.getElementById("navbar-upper")
    if(document.getElementById('main-signup')){
        let mainContent = document.getElementById('main-signup')
        mainContent.style.marginTop = '60px'
        mainContent.style.height = "calc(100vh - 60px)"
    }
    upperNav.style.height = '0px'
    e.classList.add("hide")
}

function adminLoginBtn() {
    window.location.href = "./adminLogin.html"

}

function highlightIfEmpty(inputFields) {
    let flag = true;
    inputFields.forEach(inputField => {
        if (inputField.value === "" || inputField.value === "Select City" || inputField.value === "Select Cuisine Type") {
            inputField.style.border = "2px solid red"
            flag = false
        }
        else {
            inputField.style.border = "2px solid green"
        }
    });
    return flag
}