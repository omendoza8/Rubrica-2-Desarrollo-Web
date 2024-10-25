const apiURL = "https://fakestoreapi.com/products";
let allProducts = [];

async function fetchProducts() {
    try {
        const response = await fetch(apiURL);
        const products = await response.json();

        console.log(products);
        allProducts =products.slice(0, 15)
        displayProducts(allProducts);
        displayFilterProduct(allProducts);
    } catch (error) {
        console.error("Error fetching products:", error);
    }
}

function displayProducts(products) {
    const container = document.getElementById('products-container');
    container.innerHTML = '';

    products.forEach(product => {
        const productDiv = document.createElement('div');
        productDiv.className = "card col-xs-12  col-sm-5 col-md-5 col-lg-5 col-xl-3 col-xxl-3 m-2";
        productDiv.classList.add('product');

        productDiv.innerHTML = `
                                <div class="d-flex justify-content-between p-3">
                                    <p class="lead mb-0">${product.title}</p>
                                </div>
                                <img src="${product.image}"
                                    class="card-img-top" height="300" width="200" alt="Gaming Laptop" />
                                <div class="card-body">
                                    <div class="d-flex justify-content-between">
                                        <p class="small"><a href="#!" class="text-muted">Laptops</a></p>
                                        <p class="small text-danger"><s>$1399</s></p>
                                    </div>

                                    <div class="d-flex justify-content-between mb-3">
                                        <h5 class="mb-0">Toshiba B77</h5>
                                        <h5 class="text-dark mb-0">${product.price}</h5>
                                    </div>

                                    <div class="d-flex justify-content-between mb-2">
                                        <p class="text-muted mb-0">Available: <span class="fw-bold">5</span></p>
                                        <div class="ms-auto text-warning">
                                            <i class="fa fa-star"></i>
                                            <i class="fas fa-star"></i>
                                            <i class="fas fa-star"></i>
                                            <i class="fas fa-star"></i>
                                            <i class="fas fa-star-half-alt"></i>
                                        </div>
                                    </div>
                                </div>
        `;

        container.appendChild(productDiv);
    });
}

function displayFilterProduct(products) {
    const filterSelect = document.getElementById('filter-data');

    const titles = [...new Set(products.map(product => product.title))];

    titles.forEach(title => {
        const option = document.createElement('option');
        option.value = title;
        option.textContent = title;
        filterSelect.appendChild(option);
    });

    filterSelect.addEventListener('change', filterProducts);
}

function filterProducts() {
    const selectedProduct = document.getElementById('filter-data').value;

    const filteredProducts = selectedProduct
        ? allProducts.filter(product => product.title === selectedProduct)
        : allProducts;

    displayProducts(filteredProducts);
}

fetchProducts();
