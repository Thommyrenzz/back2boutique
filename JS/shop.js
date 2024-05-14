$(document).ready(function() {
    $.ajax({
        url: 'http://10.25.0.15/~s_rnztms05m06z130l/back2boutique_3/wb/methods.php',
        method: 'GET',
        dataType: 'json',
        success: function(data, status, xhr) {
            if (status === "success") {
                var productList = $("#product-list");
                productList.empty(); // Pulisci i dati precedenti

                data.forEach(function(product) {
                    productList.append(`
                    <div class="col-md-4">
                        <div class="card mb-4 shadow-sm" style="border-radius: 8px; overflow: hidden;">
                            <img src="${product.immagine}" class="card-img-top" alt="${product.nome}" style="object-fit: cover; height: 250px;">
                            <div class="card-body" style="background-color: #ffffff;">
                                <h5 class="card-title" style="color: #000000; font-weight: bold;">${product.nome}</h5>
                                <p class="card-text" style="color: #757575;">${product.descrizione}</p>
                                <div class="d-flex justify-content-between align-items-center">
                                    <div class="btn-group">
                                        <a href="single-product.html?id=${product.id}" class="btn btn-sm btn-outline-dark" style="color: #000000; border-color: #000000;">Dettagli</a>
                                        <button type="button" class="btn btn-sm btn-outline-dark" style="color: #000000; border-color: #000000;">Aggiungi al Carrello</button>
                                    </div>
                                    <small class="text-muted" style="color: #757575;">€${product.prezzo}</small>
                                </div>
                            </div>
                        </div>
                    </div>
                    `);
                });
            } else {
                console.error("Errore nel caricamento dei prodotti");
            }
        },
        error: function(xhr, status, error) {
            console.error('Errore AJAX:', error);
            $('#product-list').html('Errore nella chiamata AJAX: ' + error);
        }
    });
});
