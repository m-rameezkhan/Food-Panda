let adminNameField = document.getElementById("adminName")
let adminName = localStorage.getItem("loggedInAdmin")
adminNameField.innerHTML = `${adminName} Restaurant`

function goToAddItemPage() {
    window.location.href = "./adminAddItems.html"
}

function goToAdminDashboard() {
    window.location.href = "./adminDashboard.html"
}

