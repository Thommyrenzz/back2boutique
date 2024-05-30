$("#loginForm").submit(function(event) {
    event.preventDefault();

    // Ottieni i dati dal modulo di login
    var formData = {
        username: $("#username").val(),
        password: $("#password").val()
    };
    
    // Effettua una richiesta AJAX per il login
    $.ajax({
        //url: 'http://10.25.0.15/~s_rnztms05m06z130l/back2boutique_5/PHP/login.php', //scuola
        url: 'http://localhost:3000/login.php', //casa
        type: 'POST',
        contentType: 'application/json',
        data: JSON.stringify(formData),
        dataType: 'json',
        success: function(response) {
            // Verifica se il login è avvenuto con successo
            if (response && response.messaggio) {
                alert(response.messaggio);
                if (response.admin) {
                    window.location.href = "admin.html"; // Reindirizza alla pagina admin
                } else {
                    window.location.href = "dashboardcliente.html"; // Reindirizza alla pagina utente
                }
            } else {
                alert("Errore durante il login.");
            }
        },
        error: function(xhr, status, error) {
            try {
                var errorResponse = JSON.parse(xhr.responseText);
                alert('Errore: ' + errorResponse.errore);
            } catch (e) {
                console.error('Errore AJAX:', error);
                alert('Errore nella chiamata AJAX: ' + error);
            }
        }
    });
});
    