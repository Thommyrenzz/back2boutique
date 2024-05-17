<?php
// Definisci le intestazioni per rispondere con JSON e abilitare CORS se necessario
header("Content-Type: application/json");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type, Authorization");

// Variabili per la connessione al database
$servername = '10.25.0.14';
$username = '5crenzini';
$password = '5crenzini';
$dbname = '5crenzini_back2boutique';

// Connessione al database
$conn = new mysqli($servername, $username, $password, $dbname);
if ($conn->connect_error) {
    http_response_code(500); // Errore sul server
    echo json_encode(['errore' => 'Connessione al database non riuscita']);
    exit();
}

// Estrai i dati inviati dal client
$data = json_decode(file_get_contents("php://input"), true);

// Verifica che i dati necessari siano presenti
if (isset($data['username']) && isset($data['password'])) {
    // Esegui la query per verificare le credenziali dell'utente
    $query = sprintf(
        "SELECT * FROM CLIENTE WHERE username = '%s' AND psw = '%s'",
        $conn->real_escape_string($data['username']),
        $conn->real_escape_string($data['password'])
    );

    $result = $conn->query($query);

    if ($result && $result->num_rows > 0) {
        http_response_code(200); // Successo
        echo json_encode(['messaggio' => 'Login avvenuto con successo.']);
    } else {
        http_response_code(401); // Non autorizzato
        echo json_encode(['errore' => 'Credenziali non valide.']);
    }
} else {
    http_response_code(400); // Richiesta errata
    echo json_encode(['errore' => 'Dati mancanti o errati.']);
}

// Chiudi la connessione al database
$conn->close();
?>
