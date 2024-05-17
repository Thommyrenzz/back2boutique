<?php
// Definisci le intestazioni per rispondere con JSON e abilitare CORS se necessario
header("Content-Type: application/json");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");

// Variabili per la connessione al database
$servername = '10.25.0.14';
$dbusername = '5crenzini';
$dbpassword = '5crenzini';
$dbname = '5crenzini_back2boutique';

// Connessione al database
$conn = new mysqli($servername, $dbusername, $dbpassword, $dbname);
if ($conn->connect_error) {
    http_response_code(500); // Errore sul server
    echo json_encode(['errore' => 'Connessione al database non riuscita']);
    exit();
}

// Estrai i dati inviati dal client
$data = json_decode(file_get_contents("php://input"), true);

// Pulisci i dati
/*
$username = htmlspecialchars($data['username'] ?? '');
$password = htmlspecialchars($data['password'] ?? '');
$nome = htmlspecialchars($data['nome'] ?? '');
$cognome = htmlspecialchars($data['cognome'] ?? '');
*/
$username = $data['username'];
$password = $data['password'];
$nome = $data['nome'];
$cognome = $data['cognome'];

// Verifica che i dati necessari siano presenti
if (!empty($username) && !empty($password) && !empty($nome) && !empty($cognome)) {
    // Esegui la query per inserire un nuovo cliente
    $query = "INSERT INTO CLIENTE (username, psw, nome, cognome) VALUES (?, ?, ?, ?)";
    $stmt = $conn->prepare($query);
    $stmt->bind_param("ssss", $username, $password, $nome, $cognome);

    if ($stmt->execute()) {
        http_response_code(201); // Creato
        echo json_encode(['messaggio' => 'Registrazione avvenuta con successo.']);
    } else {
        http_response_code(500); // Errore sul server
        echo json_encode(['errore' => 'Errore nell\'esecuzione della query: ' . $conn->error]);
    }
} else {
    http_response_code(400); // Richiesta errata
    echo json_encode(['errore' => 'Dati mancanti o errati']);
}

// Chiudi la connessione al database
$conn->close();
?>
