// Display current user's name
const currentUser = JSON.parse(localStorage.getItem("currentUser"));
if (currentUser) {
    document.getElementById("userName").textContent = `Hi ${currentUser.name}`;
}

// Quantity Control Functions
function increaseQty(id) {
    const qtyEl = document.getElementById(`qty-${id}`);
    let current = parseInt(qtyEl.textContent);
    qtyEl.textContent = current + 1;
}

function decreaseQty(id) {
    const qtyEl = document.getElementById(`qty-${id}`);
    let current = parseInt(qtyEl.textContent);
    if (current > 1) qtyEl.textContent = current - 1;
}

function goBackToUserDashboard() {
    window.location.href = "./userDashboard.html"
}