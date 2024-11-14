document.addEventListener('DOMContentLoaded', async () => {
    const response = await fetch('products.json');
    const products = await response.json();
    const productsContainer = document.getElementById('products-container');

    products.forEach(product => {
        const productCard = document.createElement('div');
        productCard.classList.add('product-card');

        productCard.innerHTML = `
            <img src="${product.images[0]}" alt="${product.name}" onerror="this.src='placeholder.jpg'">
            <h2>${product.name}</h2>
            <p>${product.description}</p>
            <p>Price: $${product.price}</p>
            <a href="/products/${product.id}" class="details-link">View Details</a>
        `;

        productsContainer.appendChild(productCard);
    });
});
