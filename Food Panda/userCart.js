document.addEventListener("DOMContentLoaded", renderCart);

function renderCart() {
    const cartItems = JSON.parse(localStorage.getItem("userCart")) || [];
    const cartMain = document.querySelector(".cart-main");
    const cartEnd = document.querySelector(".cart-end");

    // Clear existing items
    document.querySelectorAll(".cart-content").forEach(item => item.remove());

    let total = 0;

    cartItems.forEach((item, index) => {
        const itemTotal = item.quantity * parseFloat(item.price);
        total += itemTotal;

        const cartHTML = document.createElement("div");
        cartHTML.className = "cart-content";
        cartHTML.innerHTML = `
            <div class="cart-image center">
                <img src="${item.image}" alt="${item.name}">
            </div>
            <div class="cart-item-name center">
                <h2>${item.name}</h2>
                <h3>${item.admin}</h3>
            </div>
            <div class="cart-item-price center">
                <p>Rs. ${item.price}</p>
            </div>
            <div class="quantity-controls center">
                <button onclick="decreaseQty(${index})">-</button>
                <span>${item.quantity}</span>
                <button onclick="increaseQty(${index})">+</button>
            </div>
            <div class="cart-item-total center">
                <p>${itemTotal.toFixed(2)}</p>
            </div>
        `;

        cartMain.insertBefore(cartHTML, cartEnd);
    });

    // Update totals
    const salesTax = 0;
    const grandTotal = total + salesTax;

    document.querySelector(".subtotal span:last-child").textContent = `Rs. ${total.toFixed(2)}`;
    document.querySelector(".sale-tax span:last-child").textContent = `Rs. ${salesTax.toFixed(2)}`;
    document.querySelector(".grand-total span:last-child").textContent = `Rs. ${grandTotal.toFixed(2)}`;
}

function increaseQty(index) {
    const cart = JSON.parse(localStorage.getItem("userCart")) || [];
    cart[index].quantity += 1;
    localStorage.setItem("userCart", JSON.stringify(cart));

    renderCart();
}

function decreaseQty(index) {
    const cart = JSON.parse(localStorage.getItem("userCart")) || [];

    if (cart[index].quantity > 1) {
        cart[index].quantity -= 1;
    } else {
        cart.splice(index, 1);
    }

    localStorage.setItem("userCart", JSON.stringify(cart));

    renderCart();
}

function userLogout() {
    window.location.href = "./signupPage.html";
}
