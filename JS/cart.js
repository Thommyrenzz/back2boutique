$(document).ready(function() {
    var cart = []; // Array per memorizzare i prodotti nel carrello

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
            url: 'http://10.25.0.15/~s_rnztms05m06z130l/back2boutique_4/PHP/add-cart.php',
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

                // Aggiungi il prodotto all'array del carrello
                cart.push({
                    name: response.nome,
                    price: response.prezzo,
                    size: response.taglia
                });

                // Aggiorna il carrello nel pop-up
                updateCartPopup();
            },
            error: function(error) {
                console.error('Errore durante l\'aggiunta del prodotto al carrello:', error);
            }
        });
    });

    // Funzione per aggiornare il contenuto del popup del carrello
    function updateCartPopup() {
        var cartItemsContainer = $('#cartItems');
        cartItemsContainer.empty(); // Pulisci il contenuto precedente  

        if (cart.length == 0) {
            cartItemsContainer.append('<p>Il tuo carrello è vuoto.</p>');
        } else {
            cart.forEach(function(item) {
                var cartItem = `
                    <div class="cart-item">
                        <p>${item.name} - Taglia: ${item.size} | Prezzo: €${item.price}</p>
                    </div>`;
                cartItemsContainer.append(cartItem);
            });
        }
    }

    // Funzione per caricare i prodotti nel carrello quando il popup viene aperto
    $('#cart-popup').on('click', function() {
        $('#cartPopup').modal('show');
        updateCartPopup();
    });
});
