const posts = document.getElementById("posts");
const restaurantUsers = JSON.parse(localStorage.getItem("restaurantUsers")) || [];

// Render all items from all admins
function renderAllItems() {
    posts.innerHTML = "";

    restaurantUsers.forEach((admin) => {
        if (Array.isArray(admin.items)) {
            admin.items.forEach((item, itemIndex) => {
                const uniqueId = `${admin.name}-${itemIndex}`; // Unique ID for item
                posts.innerHTML += `
                    <div class="post" id="post-${uniqueId}">
                        <div class="image">
                            <img src="${item.image}" alt="">
                            <h3 class="item-price">Rs. ${item.price}</h3>
                        </div>
                        <h2 class="item-heading">${item.name}</h2>
                        <p class="item-description">${item.description}</p>
                        
                        <div class="quantity-controls">
                            <button onclick="decreaseQty('${uniqueId}')">-</button>
                            <span id="qty-${uniqueId}">1</span>
                            <button onclick="increaseQty('${uniqueId}')">+</button>
                        </div>

                        <button class="btn signup-btn" onclick="addToCart('${admin.name}', ${itemIndex}, '${uniqueId}')">
                            Add to Cart
                        </button>
                    </div>`;
            });
        }
    });
}

// Initial render
window.onload = renderAllItems;

// Cart handling
function addToCart(adminName, itemIndex, uniqueId) {
    const qty = parseInt(document.getElementById(`qty-${uniqueId}`).textContent);
    const allAdmins = JSON.parse(localStorage.getItem("restaurantUsers")) || [];
    const cart = JSON.parse(localStorage.getItem("userCart")) || [];

    const admin = allAdmins.find(admin => admin.name === adminName);
    if (admin && admin.items && admin.items[itemIndex]) {
        const item = admin.items[itemIndex];
        const cartItem = {
            name: item.name,
            price: item.price,
            description: item.description,
            image: item.image,
            quantity: qty,
            admin: adminName
        };
        cart.push(cartItem);
        localStorage.setItem("userCart", JSON.stringify(cart));
        // alert(`${item.name} added to cart (x${qty})`);
        showCartModal()
    }
}

function userLogout() {
    window.location.href = "./signupPage.html"
}

function goToCart() {
    window.location.href = "./userCart.html"
}

function showCartModal() {
    const modal = document.getElementById("cartModal");
    modal.style.display = "flex";

    // Auto close after 2 seconds
    // setTimeout(() => {
    //     modal.style.display = "none";
    // }, 2000);
}

function closeCartModal() {
    document.getElementById("cartModal").style.display = "none";
}
