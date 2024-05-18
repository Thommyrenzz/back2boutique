$("#registerForm").submit(function(event) {
    event.preventDefault();

    // Ottieni i dati dal modulo di registrazione
    var formData = {
        username: $("#username").val(),
        password: $("#password").val(),
        nome: $("#nome").val(),
        cognome: $("#cognome").val()
    };

    // Effettua una richiesta AJAX per registrare l'utente
    $.ajax({
        url: 'http://10.25.0.15/~s_rnztms05m06z130l/back2boutique_4/PHP/register.php', //scuola
        //url: 'http://localhost:8000/register.php',
        type: 'POST',
        contentType: 'application/json', // Specifica che i dati inviati sono JSON
        data: JSON.stringify(formData), // Converte i dati in una stringa JSON
        dataType: 'json', // Specifica che ci si aspetta una risposta JSON
        success: function(response) {
            // Verifica se la registrazione è avvenuta con successo
            if (response && response.messaggio === "Registrazione avvenuta con successo.") {
                alert(response.messaggio);
                window.location.href = "login.html"; // Reindirizza alla pagina di login
            } else {
                alert("Errore durante la registrazione: " + (response.errore || "Errore sconosciuto"));
            }
        },
        error: function(xhr, status, error) {
            console.error('Errore AJAX:', error);
            console.log('Stato:', status);
            console.log('Risposta:', xhr.responseText);
            alert('Errore nella chiamata AJAX: ' + xhr.responseText);
        }
    });
});
