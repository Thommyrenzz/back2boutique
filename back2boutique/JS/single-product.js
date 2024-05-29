$(document).ready(function() {
    var urlParams = new URLSearchParams(window.location.search);
    var productId = urlParams.get('id');

    $.ajax({
        url: 'http://localhost:7000/single-product.php?id=' + productId, // Endpoint per recuperare un singolo prodotto
        method: 'GET',
        dataType: 'json',
        success: function(data, status, xhr) {
            if (status === "success") {
                var singleProduct = $("#single-product");
                singleProduct.empty(); // Pulisci i dati precedenti

                singleProduct.append(`
                    <div class="container">
                        <div class="row">
                            <div class="col-md-6">
                                <img src="${data.immagine}" alt="Nome del Prodotto" class="img-fluid" style="width: 100%">
                            </div>
                            <div class="col-md-6" style="color: #ffffff;">
                                <h1>${data.nome}</h1>
                                <p class="lead">${data.descrizione}</p>
                                <h3>€${data.prezzo}</h3>
                                <div class="dropdown">
                                    <select aria-labelledby="sizeDropdown" id="sizeSelect">
                                        <option class="dropdown-item" value="S">S</option>
                                        <option class="dropdown-item" value="M">M</option>
                                        <option class="dropdown-item" value="L">L</option>
                                    </select>
                                </div>
                                <button class="btn btn-dark mt-3 add-to-cart-button" data-id="${data.id}" data-name="${data.nome}" data-price="${data.prezzo}">Aggiungi al Carrello</button>
                            </div>
                        </div>
                    </div>
                `);

                // Gestisce il cambiamento dell'opzione selezionata
                $("#sizeSelect").change(function() {
                    selectedSize = $(this).val(); // Salva la taglia selezionata nella variabile
                });
            } else {
                console.error("Errore nel caricamento dei dettagli del prodotto");
            }
        },
        error: function(xhr, status, error) {
            console.error('Errore AJAX:', error);
            $('#single-product').html('Errore nella chiamata AJAX: ' + error);
        }
    });
});
