$("#loginForm").submit(function(event) {
    event.preventDefault();

    // Ottieni i dati dal modulo di login
    var formData = {
        username: $("#username").val(),
        password: $("#password").val()
    };
    
    // Effettua una richiesta AJAX per il login
    $.ajax({
        //url: 'http://10.25.0.15/~s_rnztms05m06z130l/back2boutique_3/PHP/login.php', //scuola
        url: 'http://localhost:3000/login.php', //casa
        type: 'POST',
        contentType: 'application/json', // Specifica che i dati inviati sono JSON
        data: JSON.stringify(formData), // Converte i dati in una stringa JSON
        dataType: 'json', // Specifica che ci si aspetta una risposta JSON
        success: function(response) {
            // Verifica se il login è avvenuto con successo
            if (response && response.messaggio === "Accesso consentito") {
                alert(response.messaggio);
                window.location.href = "single-product.html"; // Reindirizza alla dashboard dopo il login
            } else {
                alert("Credenziali non valide.");
            }
        },
        error: function(xhr, status, error) {
            console.error('Errore AJAX:', error);
            alert('Errore nella chiamata AJAX: ' + error);
        }
    });
});
