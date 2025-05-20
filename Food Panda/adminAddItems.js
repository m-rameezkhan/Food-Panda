function addItem() {
    // Get the logged-in admin's name
    const adminName = localStorage.getItem("loggedInAdmin");

    const restaurantUsers = JSON.parse(localStorage.getItem("restaurantUsers")) || [];
    const loggedInAdmin = localStorage.getItem("loggedInAdmin");

    // Get product details from input fields
    const productName = document.getElementById("product-name").value;
    const productPrice = document.getElementById("product-price").value;
    const productDescription = document.getElementById("product-description").value;
    const productImage = document.getElementById("fileInput").files[0]; // Get the file

    // Check if image is selected
    if (!productImage) {
        alert("Please select an image!");
        return;
    }

    // Read the image as a Base64 string
    const reader = new FileReader();
    reader.onload = function (e) {
        const base64Image = e.target.result;

        // Create a new item object
        const newItem = {
            name: productName,
            price: productPrice,
            description: productDescription,
            image: base64Image
        };

        const adminIndex = restaurantUsers.findIndex(admin => admin.name === loggedInAdmin);
        if (adminIndex !== -1) {
            if (!Array.isArray(restaurantUsers[adminIndex].items)) {
                restaurantUsers[adminIndex].items = [];
            }
            restaurantUsers[adminIndex].items.push(newItem);
            localStorage.setItem("restaurantUsers", JSON.stringify(restaurantUsers));
            alert("Item added successfully!");
        } else {
            alert("Admin not found!");
        }
    };

    // Convert file to Base64
    reader.readAsDataURL(productImage);

}

// const restaurantUsers = JSON.parse(localStorage.getItem("restaurantUsers")) || [];
// const loggedInAdmin = localStorage.getItem("loggedInAdmin");

// const newItem = {
//     name: productName,
//     price: productPrice,
//     description: productDescription,
//     image: base64Image
// };

// const adminIndex = restaurantUsers.findIndex(admin => admin.name === loggedInAdmin);
// if (adminIndex !== -1) {
//     if (!Array.isArray(restaurantUsers[adminIndex].items)) {
//         restaurantUsers[adminIndex].items = [];
//     }
//     restaurantUsers[adminIndex].items.push(newItem);
//     localStorage.setItem("restaurantUsers", JSON.stringify(restaurantUsers));
//     alert("Item added successfully!");
// } else {
//     alert("Admin not found!");
// }