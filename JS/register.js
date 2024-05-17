$("#registerForm").submit(function(event) {
    event.preventDefault();
    $.ajax({
        url: 'http://10.25.0.15/~s_rnztms05m06z130l/back2boutique_3/PHP/register.php',
        type: 'POST',
        dataType: 'json',
        success: function(response) {
            alert(response);
            if (response === "Registrazione avvenuta con successo.") {
                window.location.href = "login.html";
            }
        },
        error: function(xhr, status, error) {
            console.error('Errore AJAX:', error);
            alert('Errore nella chiamata AJAX: ' + error);
        }
    });
});