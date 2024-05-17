<?php
// Abilita il reporting degli errori
error_reporting(E_ALL);
ini_set('display_errors', 1);

// Definisci le intestazioni per rispondere con JSON e abilitare CORS se necessario
header("Content-Type: application/json");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");

// Gestione delle richieste preflight
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(204);
    exit();
}

//Variabili per la connessione al database
/*$servername = '10.25.0.14';
$username = '5crenzini';
$password = '5crenzini';
$dbname = '5crenzini_back2boutique'; //scuola*/

$hostname = 'localhost';
$username = 'root';
$password = 'Thommyrenz40';
$dbname = '5crenzini_back2boutique'; //casa
// Connessione al database
$conn = new mysqli($hostname, $dbusername, $dbpassword, $dbname);
if ($conn->connect_error) {
    http_response_code(500); // Errore sul server
    echo json_encode(['errore' => 'Connessione al database non riuscita']);
    exit();
}

// Estrai i dati inviati dal client
$data = json_decode(file_get_contents("php://input"), true);

if (json_last_error() !== JSON_ERROR_NONE) {
    http_response_code(400); // Richiesta errata
    echo json_encode(['errore' => 'Dati JSON non validi']);
    exit();
}

$username = htmlspecialchars($data['username'] ?? '');
$password = htmlspecialchars($data['password'] ?? '');
$nome = htmlspecialchars($data['nome'] ?? '');
$cognome = htmlspecialchars($data['cognome'] ?? '');

// Verifica che i dati necessari siano presenti
if (!empty($username) && !empty($password) && !empty($nome) && !empty($cognome)) {
    // Controlla se l'username esiste già
    $checkQuery = "SELECT * FROM CLIENTE WHERE username = ?";
    $checkStmt = $conn->prepare($checkQuery);
    $checkStmt->bind_param("s", $username);
    $checkStmt->execute();
    $result = $checkStmt->get_result();
    
    if ($result->num_rows > 0) {
        http_response_code(409); // Conflitto
        echo json_encode(['errore' => 'Username già esistente']);
    } else {
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
    }
} else {
    http_response_code(400); // Richiesta errata
    echo json_encode(['errore' => 'Dati mancanti o errati']);
}

// Chiudi la connessione al database
$conn->close();
?>
