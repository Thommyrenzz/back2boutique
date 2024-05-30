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

// Variabili per la connessione al database
/*$servername = '10.25.0.14';
$dbusername = '5crenzini';
$dbpassword = '5crenzini';
$dbname = '5crenzini_back2boutique'; // scuola*/

$hostname = 'localhost';
$dbusername = 'root';
$dbpassword = 'Thommyrenz40';
$dbname = '5crenzini_back2boutique'; //casa

$conn = new mysqli($hostname, $dbusername, $dbpassword, $dbname);

if ($conn->connect_error) {
    die("Connessione fallita: " . $conn->connect_error);
}

// Controlla che i parametri siano stati passati
if (isset($_POST['product_id']) && isset($_POST['size']) && isset($_POST['client_id'])) {
    $product_id = $_POST['product_id'];
    $size = $_POST['size'];
    $client_id = $_POST['client_id'];

    // Controlla se esiste già un carrello per il cliente
    $sql = "SELECT id FROM CARRELLO WHERE id_cli = ?";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("i", $client_id);
    $stmt->execute();
    $result = $stmt->get_result();
    
    if ($result->num_rows > 0) {
        $row = $result->fetch_assoc();
        $cart_id = $row['id'];
    } else {
        // Crea un nuovo carrello per il cliente
        $sql = "INSERT INTO CARRELLO (id_cli) VALUES (?)";
        $stmt = $conn->prepare($sql);
        $stmt->bind_param("i", $client_id);
        
        if ($stmt->execute()) {
            $cart_id = $stmt->insert_id;
        } else {
            echo json_encode(array("error" => "Errore durante la creazione del carrello: " . $conn->error));
            $stmt->close();
            $conn->close();
            exit();
        }
    }

    // Assicurati che il carrello esista prima di procedere
    if (isset($cart_id)) {
        // Aggiungi il prodotto al carrello con la taglia
        $sql = "INSERT INTO FATTO_DI (id_carrello, id_prodotto, data_ora, taglia) VALUES (?, ?, NOW(), ?)";
        $stmt = $conn->prepare($sql);
        $stmt->bind_param("iis", $cart_id, $product_id, $size);

        if ($stmt->execute()) {
            // Recupera i dettagli del prodotto aggiunto
            $sql = "SELECT p.nome, p.prezzo, f.taglia 
                    FROM PRODOTTI p 
                    JOIN FATTO_DI f ON p.id = f.id_prodotto 
                    WHERE f.id_carrello = ? AND f.id_prodotto = ? AND f.taglia = ?";
            $stmt = $conn->prepare($sql);
            $stmt->bind_param("iis", $cart_id, $product_id, $size);
            $stmt->execute();
            $result = $stmt->get_result();
            $product = $result->fetch_assoc();

            echo json_encode($product);
        } else {
            echo json_encode(array("error" => "Errore durante l'aggiunta del prodotto al carrello: " . $conn->error));
        }

        $stmt->close();
    } else {
        echo json_encode(array("error" => "ID del carrello non valido"));
    }
} else {
    echo json_encode(array("error" => "Parametri mancanti"));
}

$conn->close();
?>
