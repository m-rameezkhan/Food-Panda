let posts = document.getElementById("posts");
adminName = localStorage.getItem("loggedInAdmin");
let items = JSON.parse(localStorage.getItem(adminName)) || [];

// Render items on the page
function renderItems() {
    posts.innerHTML = "";
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

// Save Changes to the Specific Item
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
        localStorage.setItem(adminName, JSON.stringify(items));
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

// Confirm Delete
function confirmDelete() {
    items.splice(window.currentDeleteIndex, 1);
    localStorage.setItem(adminName, JSON.stringify(items));
    renderItems();
    closeDeleteModal();
    // alert("Item deleted successfully!");
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
