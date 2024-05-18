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
$servername = '10.25.0.14';
$dbusername = '5crenzini';
$dbpassword = '5crenzini';
$dbname = '5crenzini_back2boutique'; //scuola

/*$hostname = 'localhost';
$username = 'root';
$password = 'Thommyrenz40';
$dbname = '5crenzini_back2boutique'; //casa*/

// Connessione al database
$conn = new mysqli($servername, $dbusername, $dbpassword, $dbname);
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

// Verifica che i dati necessari siano presenti
if (!empty($username) && !empty($password)) {
    // Controlla se l'username e la password sono corretti
    $query = "SELECT * FROM CLIENTE WHERE username = ? AND psw = ?";
    $stmt = $conn->prepare($query);
    $stmt->bind_param("ss", $username, $password);
    $stmt->execute();
    $result = $stmt->get_result();
    
    if ($result->num_rows > 0) {
        $user = $result->fetch_assoc();
        if ($user['username'] === 'admin') {
            http_response_code(200);
            echo json_encode(['messaggio' => 'Login effettuato con successo', 'admin' => true]);
        } else {
            http_response_code(200);
            echo json_encode(['messaggio' => 'Login effettuato con successo', 'admin' => false]);
        }
    } else {
        http_response_code(401); // Non autorizzato
        echo json_encode(['errore' => 'Username o password errati']);
    }
} else {
    http_response_code(400); // Richiesta errata
    echo json_encode(['errore' => 'Dati mancanti o errati']);
}

// Chiudi la connessione al database
$conn->close();
?>
