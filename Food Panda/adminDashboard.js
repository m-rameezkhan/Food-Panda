let posts = document.getElementById("posts");
adminName = localStorage.getItem("loggedInAdmin");
// let items = JSON.parse(localStorage.getItem(adminName)) || [];
const restaurantUsers = JSON.parse(localStorage.getItem("restaurantUsers")) || [];
const currentAdmin = restaurantUsers.find(admin => admin.name === adminName);
let items = currentAdmin?.items || [];


// Render only current admin's items (similar to user dashboard but scoped to logged-in admin)
function renderItems() {
    const posts = document.getElementById("posts");
    posts.innerHTML = "";

    if (items.length === 0) {
        posts.innerHTML = "<p>No items found for this admin.</p>";
        return;
    }

    items.forEach((item, index) => {
        posts.innerHTML += `
            <div class="post" id="post-${index}">
                <div class="image">
                    <img src="${item.image}" alt="">
                    <h3 class="item-price">Rs. ${item.price}</h3>
                </div>
                <h2 class="item-heading">${item.name}</h2>
                <p class="item-description">${item.description}</p>
                <div class="edit-btns">
                    <button class="btn signup-btn" onclick="editItem(${index})">Edit</button>
                    <button class="btn signup-btn" onclick="openDeleteModal(${index})">Delete</button>
                </div>
            </div>`;
    });
}
renderItems()

// Open Edit Modal with specific item data
function editItem(index) {
    window.currentEditIndex = index;
    const item = items[index];
    document.getElementById("itemName").value = item.name;
    document.getElementById("itemPrice").value = item.price;
    document.getElementById("itemDescription").value = item.description;
    document.getElementById("editModal").style.display = "block";
}

// Close Edit Modal
function closeModal() {
    document.getElementById("editModal").style.display = "none";
}

function saveChanges() {
    const newItemName = document.getElementById("itemName").value;
    const newItemPrice = document.getElementById("itemPrice").value;
    const newItemDescription = document.getElementById("itemDescription").value;

    if (newItemName && newItemPrice && newItemDescription) {
        items[window.currentEditIndex] = {
            ...items[window.currentEditIndex],
            name: newItemName,
            price: newItemPrice,
            description: newItemDescription,
        };

        // Save back to restaurantUsers
        const restaurantUsers = JSON.parse(localStorage.getItem("restaurantUsers")) || [];
        const adminIndex = restaurantUsers.findIndex(admin => admin.name === localStorage.getItem("loggedInAdmin"));
        if (adminIndex !== -1) {
            restaurantUsers[adminIndex].items = items;
            localStorage.setItem("restaurantUsers", JSON.stringify(restaurantUsers));
        }

        renderItems();
        alert("Item updated successfully!");
        closeModal();
    } else {
        alert("Please fill out all fields.");
    }
}

// Open Delete Confirmation Modal
function openDeleteModal(index) {
    window.currentDeleteIndex = index;
    document.getElementById("deleteModal").style.display = "block";
}

// Close Delete Confirmation Modal
function closeDeleteModal() {
    document.getElementById("deleteModal").style.display = "none";
}

function confirmDelete() {
    items.splice(window.currentDeleteIndex, 1);

    // Save back to restaurantUsers
    const restaurantUsers = JSON.parse(localStorage.getItem("restaurantUsers")) || [];
    const adminIndex = restaurantUsers.findIndex(admin => admin.name === localStorage.getItem("loggedInAdmin"));
    if (adminIndex !== -1) {
        restaurantUsers[adminIndex].items = items;
        localStorage.setItem("restaurantUsers", JSON.stringify(restaurantUsers));
    }

    renderItems();
    closeDeleteModal();
}


// Close any modal on clicking outside
window.onclick = function (event) {
    if (event.target === document.getElementById("editModal")) {
        closeModal();
    }
    if (event.target === document.getElementById("deleteModal")) {
        closeDeleteModal();
    }
};

// Initial load of items
window.onload = renderItems;
