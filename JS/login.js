$("#loginForm").submit(function(event) {
    event.preventDefault();
    $.ajax({
        url: 'http://10.25.0.15/~s_rnztms05m06z130l/back2boutique_3/PHP/login.php',
        type: 'POST',
        data: $(this).serialize(),
        success: function(response) {
            alert(response);
            if (response === "Login avvenuto con successo.") {
                window.location.href = "index.html";
            }
        },
        error: function(xhr, status, error) {
            console.error('Errore AJAX:', error);
            alert('Errore nella chiamata AJAX: ' + error);
        }
    });
});