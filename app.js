document.addEventListener("DOMContentLoaded", async function () {
    try {
        // Fetch and render products when the page is loaded
        const products = await fetchProducts();
        renderProducts(products);
    } catch (error) {
        console.error("Error fetching products:", error);
        displayErrorMessage("Sorry, we couldn't load the products. Please try again later.");
    }
});

/**
 * Fetches product data from the JSON file.
 * @returns {Array} List of products.
 */
async function fetchProducts() {
    const response = await fetch('products.json');
    if (!response.ok) {
        throw new Error("Network response was not ok");
    }
    return await response.json();
}

/**
 * Renders the list of products on the page.
 * @param {Array} products - The list of products to render.
 */
function renderProducts(products) {
    const productList = document.getElementById("product-list");

    products.forEach(product => {
        const productDiv = document.createElement("div");
        productDiv.classList.add("product-item");
        productDiv.setAttribute("role", "listitem");
hhhh
        productDiv.innerHTML = `
            <img src="${product.images[0]}" alt="${product.name} Image" class="product-image">
            <div class="product-info">
                <h2>${product.name}</h2>
                <p>${product.description}</p>
                <p class="price">Now $${product.price} <span class="original-price">Was $${product.originalPrice} (${product.discount})</span></p>
                <a href="product-detail.html?id=${product.id}" aria-label="View details for ${product.name}" class="product-detail-link">View Details</a>
            </div>
        `;

        productList.appendChild(productDiv);
    });
}

/**
 * Displays an error message to the user in case of data fetch failure.
 * @param {String} message - The error message to display.
 */
function displayErrorMessage(message) {
    const productList = document.getElementById("product-list");
    productList.innerHTML = `<p class="error-message">${message}</p>`;
}
