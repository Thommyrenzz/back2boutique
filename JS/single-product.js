$(document).ready(function() {
    var selectedSize = "N/A"; // Variabile per memorizzare la taglia selezionata, default "N/A"

    // Carica i dettagli del prodotto tramite AJAX
    $.ajax({
        url: 'http://10.25.0.15/~s_rnztms05m06z130l/back2boutique_5/wb/methods.php',
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

    // Gestione dell'aggiunta al carrello
    $(document).on('click', '.add-to-cart-button', function() {
        var productId = $(this).data('id');
        var productName = $(this).data('name');
        var productPrice = $(this).data('price');

        // Aggiungi il prodotto al carrello (localStorage)
        var cart = JSON.parse(localStorage.getItem('cart')) || [];
        cart.push({ id: productId, name: productName, price: productPrice, size: selectedSize });
        localStorage.setItem('cart', JSON.stringify(cart));

        // Aggiorna il popup del carrello
        updateCartPopup();
    });

    // Funzione per aggiornare il contenuto del popup del carrello
    function updateCartPopup() {
        var cartItemsContainer = $('#cartItems');
        cartItemsContainer.empty(); // Pulisci il contenuto precedente

        var cart = JSON.parse(localStorage.getItem('cart')) || [];

        if (cart.length == 0) {
            cartItemsContainer.append('<p>Il tuo carrello è vuoto.</p>');
        } else {
            cart.forEach(function(item) {
                var cartItem = `
                    <div class="cart-item">
                        <p>${item.name} - Taglia: ${item.size}</p>
                        <p>Prezzo: €${item.price}</p>
                    </div>`;
                cartItemsContainer.append(cartItem);
            });
        }
    }

    // Carica il carrello all'inizializzazione della pagina
    updateCartPopup();
});
