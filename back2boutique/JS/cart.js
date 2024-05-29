$(document).ready(function() {
    // Funzione per aggiornare il contenuto del popup del carrello
    function updateCartPopup() {
        var cartItemsContainer = $('#cartItems');
        cartItemsContainer.empty(); // Pulisci il contenuto precedente

        var storedCart = JSON.parse(localStorage.getItem('cart')) || [];

        if (storedCart.length == 0) {
            cartItemsContainer.append('<p>Il tuo carrello è vuoto.</p>');
        } else {
            storedCart.forEach(function(item) {
                var cartItem = `
                    <div class="cart-item">
                        <p>${item.name} - Taglia: ${item.size}</p>
                        <p>Prezzo: €${item.price}</p>
                    </div>`;
                cartItemsContainer.append(cartItem);
            });
        }
    }

    // Aggiorna il carrello al caricamento della pagina
    updateCartPopup();

    // Funzione per caricare i prodotti nel carrello quando il popup viene aperto
    $('#cart-popup').on('click', function() {
        $('#cartPopup').modal('show');
        updateCartPopup();
    });

    // Aggiunge un prodotto al carrello
    $(document).on('click', '.add-to-cart-button', function() {
        var productId = $(this).data('id');
        var productName = $(this).data('name');
        var productPrice = $(this).data('price');
        var productSize = $("#sizeSelect").val(); // Recupera la taglia selezionata
        var clientId = 1; // ID del cliente; questo dovrebbe essere gestito dinamicamente

        if (productSize === "Seleziona Taglia") {
            alert("Per favore seleziona una taglia.");
            return;
        }

        // Esegui una chiamata AJAX per aggiungere il prodotto al carrello nel database
        $.ajax({
            //url: 'http://10.25.0.15/~s_rnztms05m06z130l/back2boutique_5/PHP/add-cart.php',
            url: 'http://localhost:2000/add-cart.php', //casa
            method: 'POST',
            data: {
                product_id: productId,
                size: productSize,
                client_id: clientId
            },
            success: function(response) {
                console.log('Risposta del server:', response); // Stampa la risposta in console
                if (response.error) {
                    console.error('Errore dal server:', response.error);
                    return;
                }

                // Recupera il carrello dal localStorage
                var cart = JSON.parse(localStorage.getItem('cart')) || [];

                // Aggiungi il prodotto all'array del carrello
                cart.push({
                    name: response.nome,
                    price: response.prezzo,
                    size: response.taglia
                });

                // Salva il carrello nell'localStorage
                localStorage.setItem('cart', JSON.stringify(cart));

                // Aggiorna il popup del carrello
                updateCartPopup();
            },
            error: function(error) {
                console.error('Errore durante l\'aggiunta del prodotto al carrello:', error);
            }
        });
    });

    // Funzione per svuotare il carrello
    $('#clear-cart').on('click', function() {
        localStorage.removeItem('cart');
        updateCartPopup();
    });
});
$(document).ready(function() {
    // Funzione per aggiornare il contenuto del popup del carrello
    function updateCartPopup() {
        var cartItemsContainer = $('#cartItems');
        cartItemsContainer.empty(); // Pulisci il contenuto precedente

        var storedCart = JSON.parse(localStorage.getItem('cart')) || [];

        if (storedCart.length == 0) {
            cartItemsContainer.append('<p>Il tuo carrello è vuoto.</p>');
        } else {
            storedCart.forEach(function(item) {
                var cartItem = `
                    <div class="cart-item">
                        <p>${item.name} - Taglia: ${item.size}</p>
                        <p>Prezzo: €${item.price}</p>
                    </div>`;
                cartItemsContainer.append(cartItem);
            });
        }
    }

    // Aggiorna il carrello al caricamento della pagina
    updateCartPopup();

    // Funzione per caricare i prodotti nel carrello quando il popup viene aperto
    $('#cart-popup').on('click', function() {
        $('#cartPopup').modal('show');
        updateCartPopup();
    });

    // Rimuovi l'associazione degli eventi per evitare l'esecuzione multipla
    $(document).off('click', '.add-to-cart-button').on('click', '.add-to-cart-button', function() {
        var productId = $(this).data('id');
        var productName = $(this).data('name');
        var productPrice = $(this).data('price');
        var productSize = $("#sizeSelect").val(); // Recupera la taglia selezionata
        var clientId = 1; // ID del cliente; questo dovrebbe essere gestito dinamicamente

        if (productSize === "Seleziona Taglia") {
            alert("Per favore seleziona una taglia.");
            return;
        }

        // Esegui una chiamata AJAX per aggiungere il prodotto al carrello nel database
        $.ajax({
            //url: 'http://10.25.0.15/~s_rnztms05m06z130l/back2boutique_5/PHP/add-cart.php',
            url: 'http://localhost:2000/add-cart.php', //casa
            method: 'POST',
            data: {
                product_id: productId,
                size: productSize,
                client_id: clientId
            },
            success: function(response) {
                console.log('Risposta del server:', response); // Stampa la risposta in console
                if (response.error) {
                    console.error('Errore dal server:', response.error);
                    return;
                }

                // Recupera il carrello dal localStorage
                var cart = JSON.parse(localStorage.getItem('cart')) || [];

                // Aggiungi il prodotto all'array del carrello
                cart.push({
                    name: response.nome,
                    price: response.prezzo,
                    size: response.taglia
                });

                // Salva il carrello nell'localStorage
                localStorage.setItem('cart', JSON.stringify(cart));

                // Aggiorna il popup del carrello
                updateCartPopup();
            },
            error: function(error) {
                console.error('Errore durante l\'aggiunta del prodotto al carrello:', error);
            }
        });
    });

    // Funzione per svuotare il carrello
    $('#clear-cart').on('click', function() {
        localStorage.removeItem('cart');
        updateCartPopup();
    });
});
