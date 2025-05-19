// Display current user's name
const currentUser = JSON.parse(localStorage.getItem("currentUser"));
if (currentUser) {
    document.getElementById("userName").textContent = `Hi ${currentUser.name}`;
}

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
        alert(`${item.name} added to cart (x${qty})`);
    }
}




function userLogout() {
    window.location.href = "./signupPage.html"
}