document.addEventListener("DOMContentLoaded", function() {
    const urlParams = new URLSearchParams(window.location.search);
    const productId = urlParams.get("id");

    fetch('products.json')
        .then(response => response.json())
        .then(products => {
            const product = products.find(p => p.id === productId);

            if (product) {
                const productDetail = document.getElementById("product-detail");
                let imageIndex = 0;

                productDetail.innerHTML = `
                    <h1>${product.name}</h1>
                    <div id="image-slider">
                        <button id="prev">&lt;</button>
                        <img id="current-image" src="${product.images[imageIndex]}" alt="${product.name}">
                        <button id="next">&gt;</button>
                    </div>
                    <p>${product.description}</p>
                    <p class="price">Now $${product.price} <span class="original-price">Was $${product.originalPrice} (${product.discount})</span></p>
                    <p><strong>Color:</strong> ${product.additionalInfo.color}</p>
                    <p><strong>Stock:</strong> ${product.additionalInfo.stock}</p>
                    <p><strong>Likes:</strong> <span id="likes">${product.additionalInfo.likes}</span> ❤️</p>
                `;

                // Image slider functionality
                document.getElementById("next").onclick = () => {
                    imageIndex = (imageIndex + 1) % product.images.length;
                    document.getElementById("current-image").src = product.images[imageIndex];
                };
                
                document.getElementById("prev").onclick = () => {
                    imageIndex = (imageIndex - 1 + product.images.length) % product.images.length;
                    document.getElementById("current-image").src = product.images[imageIndex];
                };
            } else {
                document.getElementById("product-detail").innerHTML = "<p>Product not found.</p>";
            }
        });
});
