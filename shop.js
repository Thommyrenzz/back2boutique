$(document).ready(function() {
    $.get("get_products.php", function(data, status) {
        if (status === "success") {
            var productList = $("#product-list");
            data.forEach(function(product) {
                productList.append(`
                    <div class="col-md-4">
                        <div class="card mb-4 shadow-sm">
                            <img src="${product.image}" class="card-img-top" alt="${product.name}">
                            <div class="card-body">
                                <h5 class="card-title">${product.name}</h5>
                                <p class="card-text">${product.description}</p>
                                <div class="d-flex justify-content-between align-items-center">
                                    <div class="btn-group">
                                        <a href="product.php?id=${product.id}" class="btn btn-sm btn-outline-secondary">Dettagli</a>
                                        <button type="button" class="btn btn-sm btn-outline-primary">Aggiungi al Carrello</button>
                                    </div>
                                    <small class="text-muted">€${product.price}</small>
                                </div>
                            </div>
                        </div>
                    </div>
                `);
            });
        } else {
            console.error("Errore nel caricamento dei prodotti");
        }
    });
});
