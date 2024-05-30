<?php
// Definisci le intestazioni per rispondere con JSON e abilitare CORS se necessario
header("Content-Type: application/json");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");

// Gestione delle richieste preflight
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200); // Risposta OK per il preflight
    exit(); // Interrompe l'ulteriore elaborazione
}

// Variabili per la connessione al database
$hostname = 'localhost';
$username = 'root';
$password = 'Thommyrenz40';
$dbname = '5crenzini_back2boutique';

// Connessione al database
$conn = new mysqli($hostname, $username, $password, $dbname);
if ($conn->connect_error) {
    http_response_code(500); // Errore sul server
    echo json_encode(['errore' => 'Connessione al database non riuscita']);
    exit();
}

// Estrai il metodo HTTP
$method = $_SERVER['REQUEST_METHOD'];

switch ($method) {
    case 'GET':
        $query = "SELECT * FROM PRODOTTI WHERE tipologia='Scarpe'";
        $result = $conn->query($query);

        if ($result) {
            $lista = [];
            while ($row = $result->fetch_assoc()) {
                $lista[] = $row;
            }

            echo json_encode($lista); // Restituisci i dati come JSON
            http_response_code(200); // Successo
        } else {
            http_response_code(500); // Errore sul server
            echo json_encode(['errore' => 'Errore nell\'esecuzione della query']);
        }
        break;

    default:
        http_response_code(405); // Metodo non consentito
        echo json_encode(['errore' => 'Metodo non consentito']);
        break;
}

// Chiudi la connessione al database
$conn->close();
?>
