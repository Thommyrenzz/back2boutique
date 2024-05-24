$(document).ready(function() {
    var selectedSize = ""; // Variabile per memorizzare la taglia selezionata

    // Carica i dettagli del prodotto tramite AJAX
    $.ajax({
        url: 'http://10.25.0.15/~s_rnztms05m06z130l/back2boutique_4/wb/methods.php',
        method: 'GET',
        dataType: 'json',
        success: function(data, status, xhr) {
            if (status === "success") {
                var singleProduct = $("#single-product");
                singleProduct.empty(); // Pulisci i dati precedenti

                data.forEach(function(product) {
                    singleProduct.append(`
                        <div class="container">
                            <div class="row">
                                <div class="col-md-6">
                                    <img src="${product.immagine}" alt="Nome del Prodotto" class="img-fluid" style="width: 100%">
                                </div>
                                <div class="col-md-6" style="color: #ffffff;">
                                    <h1>${product.nome}</h1>
                                    <p class="lead">${product.descrizione}</p>
                                    <h3>€${product.prezzo}</h3>
                                    <div class="dropdown">
                                        <select aria-labelledby="sizeDropdown" id="sizeSelect">
                                            <option class="dropdown-item" value="S">S</option>
                                            <option class="dropdown-item" value="M">M</option>
                                            <option class="dropdown-item" value="L">L</option>
                                        </select>
                                    </div>
                                    <button class="btn btn-dark mt-3 add-to-cart-button" data-id="${product.id}" data-name="${product.nome}" data-price="${product.prezzo}">Aggiungi al Carrello</button>
                                </div>
                            </div>
                        </div>
                    `);
                });

                // Gestisce il cambiamento dell'opzione selezionata
                $("#sizeSelect").change(function() {
                    selectedSize = $(this).val(); // Salva la taglia selezionata nella variabile
                    $("#sizeDropdown").text(selectedSize); // Aggiorna il testo del pulsante del menu a tendina
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
