$(document).ready(function() {
    var selectedSize = ""; // Variabile per memorizzare la taglia selezionata

    // Gestisce il click sull'opzione nel menu a tendina delle taglie
    $(".dropdown-item").click(function() {
        selectedSize = $(this).data("size"); // Salva la taglia selezionata nella variabile
        $("#sizeDropdown").text(selectedSize); // Aggiorna il testo del pulsante del menu a tendina
    });
    $.ajax({
        url: 'http://10.25.0.15/~s_rnztms05m06z130l/back2boutique_3/wb/methods.php',
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
                                <button class="btn btn-secondary dropdown-toggle" type="button" id="sizeDropdown" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                    Seleziona Taglia
                                </button>
                                <div class="dropdown-menu" aria-labelledby="sizeDropdown">
                                    <a class="dropdown-item" href="#" onclick="setSize('S')">S</a>
                                    <a class="dropdown-item" href="#" onclick="setSize('M')">M</a>
                                    <a class="dropdown-item" href="#" onclick="setSize('L')">L</a>
                                </div>
                            </div>
                            <button class="btn btn-dark mt-3">Aggiungi al Carrello</button>
                        </div>
                    </div>
                </div>

                <script>
                // Funzione per impostare la taglia selezionata
                function setSize(size) {
                    document.getElementById('sizeDropdown').innerText = size; // Imposta il testo del pulsante
                }
                </script>
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
