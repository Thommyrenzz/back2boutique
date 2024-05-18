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

//Variabili per la connessione al database
$servername = '10.25.0.14';
$username = '5crenzini';
$password = '5crenzini';
$dbname = '5crenzini_back2boutique'; //scuola

/*$hostname = 'localhost';
$username = 'root';
$password = 'Thommyrenz40';
$dbname = '5crenzini_back2boutique'; //casa*/

// Connessione al database
$conn = new mysqli($servername, $username, $password, $dbname);
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
            // Se non c'è un ID risorsa, restituisci tutti i clienti
            $query = "SELECT * FROM PRODOTTI";
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
        } else {
            // Se c'è un ID risorsa, cerca un cliente specifico
            $query = sprintf("SELECT * FROM PRODOTTI WHERE id = '%s'", $conn->real_escape_string($productId));
            $result = $conn->query($query);

            if ($result) {
                $dati = $result->fetch_assoc();
                echo json_encode($dati); // Restituisci il singolo cliente come JSON
                http_response_code(200); // Successo
            } else {
                http_response_code(500); // Errore sul server
                echo json_encode(['errore' => 'Cliente non trovato']);
            }
        }
        break;
        case 'POST':
            // Estrarre i dati inviati dal client
            $data = json_decode(file_get_contents("php://input"), true);
        
            // Verifica che i dati necessari siano presenti
            if (isset($data['id']) && isset($data['nome']) && isset($data['cognome'])) {
                $query = sprintf(
                    "INSERT INTO CLIENTE (id, nome, cognome) VALUES ('%s', '%s', '%s')",
                    $conn->real_escape_string($data['id']),
                    $conn->real_escape_string($data['nome']),
                    $conn->real_escape_string($data['cognome'])
                );
        
                $result = $conn->query($query);
        
                if ($result) {
                    http_response_code(201); // Successo
                    echo json_encode(['messaggio' => 'Cliente creato con successo']);
                } else {
                    http_response_code(500); // Errore sul server
                    echo json_encode(['errore' => 'Errore nell\'esecuzione della query']);
                }
            } else {
                http_response_code(400); // Richiesta errata
                echo json_encode(['errore' => 'Dati mancanti o errati']);
            }
            break;
        

            case 'PUT':
                // Estrarre i dati inviati dal client
                $data = json_decode(file_get_contents("php://input"), true);
            
                if ($resourceId) {
                    // Verifica che i dati necessari siano presenti
                    if (isset($data['nome']) && isset($data['cognome'])) {
                        // Query per aggiornare il record con l'ID specificato
                        $query = sprintf(
                            "UPDATE CLIENTE SET nome = '%s', cognome = '%s' WHERE id = '%s'",
                            $conn->real_escape_string($data['nome']),
                            $conn->real_escape_string($data['cognome']),
                            $conn->real_escape_string($resourceId)
                        );
            
                        $result = $conn->query($query);
            
                        if ($result && $conn->affected_rows > 0) {
                            http_response_code(200); // Successo
                            echo json_encode(['messaggio' => 'Cliente aggiornato con successo']);
                        } else {
                            http_response_code(404); // Cliente non trovato
                            echo json_encode(['errore' => 'Cliente non trovato']);
                        }
                    } else {
                        http_response_code(400); // Dati mancanti
                        echo json_encode(['errore' => 'Dati mancanti o errati']);
                    }
                } else {
                    http_response_code(400); // ID risorsa mancante
                    echo json_encode(['errore' => 'ID risorsa mancante']);
                }
                break;
            
                
                case 'DELETE':
                    if ($resourceId) {
                        // Cancellazione del record con l'ID specificato
                        $query = sprintf("DELETE FROM CLIENTE WHERE id = '%s'", $conn->real_escape_string($resourceId));
            
                        $result = $conn->query($query);
            
                        if ($result && $conn->affected_rows > 0) {
                            http_response_code(200); // Successo
                            echo json_encode(['messaggio' => 'Cliente eliminato con successo']);
                        } else {
                            http_response_code(404); // Record non trovato
                            echo json_encode(['errore' => 'Cliente non trovato']);
                        }
                    } else {
                        http_response_code(400); // ID risorsa mancante
                        echo json_encode(['errore' => 'ID risorsa mancante']);
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




