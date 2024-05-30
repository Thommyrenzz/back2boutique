<?php
// Definisci le intestazioni per rispondere con JSON e abilitare CORS se necessario
/*header("Content-Type: application/json");
header("Access-Control-Allow-Origin: ");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");*/

// Gestione delle richieste preflight
/*if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200); // Risposta OK per il preflight
    exit(); // Interrompe l'ulteriore elaborazione
}*/

//Variabili per la connessione al database
$hostname = 'localhost';
$username = 'root';
$password = 'Thommyrenz40';
$dbname = '5crenzini_back2boutique'; //casa

// Connessione al database
$conn = new mysqli($hostname, $username, $password, $dbname);
if ($conn->connect_error) {
    // Se c'è un errore nella connessione, restituisci un errore JSON
    http_response_code(500); // Errore sul server
    echo json_encode(['errore' => 'Connessione al database non riuscita']);
    exit();
}

// Estrai il metodo HTTP
$method = $_SERVER['REQUEST_METHOD'];

// Estrai l'ID risorsa dal percorso dell'URL
$productId = isset($_SERVER['PATH_INFO']) ? trim($_SERVER['PATH_INFO'], '/') : null;

switch ($method) {
    case 'GET':
        if (empty($productId)) {
            // Se non c'è un ID risorsa, restituisci un errore 400
            http_response_code(400);
            echo json_encode(['errore' => 'ID prodotto mancante']);
            exit();
        } else {
            // Se c'è un ID risorsa, cerca il prodotto specificato
            $query = sprintf("SELECT * FROM PRODOTTI WHERE id = '%s'", $conn->real_escape_string($productId));
            $result = $conn->query($query);

            if ($result && $result->num_rows > 0) {
                $dati = $result->fetch_assoc();
                echo json_encode($dati); // Restituisci il singolo prodotto come JSON
                http_response_code(200); // Successo
            } else {
                http_response_code(404); // Prodotto non trovato
                echo json_encode(['errore' => 'Prodotto non trovato']);
            }
        }
        break;

    default:
        // Se il metodo HTTP non è supportato, restituisci un errore
        http_response_code(405); // Metodo non consentito
        echo json_encode(['errore' => 'Metodo non consentito']);
        break;
}

// Chiudi la connessione al database
$conn->close();
?>
