<?php
header("Access-Control-Allow-Origin: http://localhost:5173"); // Autoriser uniquement le frontend
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

// Gérer les requêtes OPTIONS (preflight)
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

// Inclusion des fichiers nécessaires
require_once 'database.php';
require_once 'tasks.php';
require_once 'users.php';


// Instanciation des classes nécessaires
$database = new Database();
$db = $database->getDatabase();
$tasks = new Tasks($db);
$users = new Users($db);

// Récupération de la méthode HTTP et de l'URI
$method = $_SERVER['REQUEST_METHOD'];
$request = explode('/', trim($_SERVER['PATH_INFO'], '/'));

// Gestion des routes
$resource = $request[0] ?? null;
$id = $request[1] ?? null;

if ($resource === 'tasks') {
    if ($method === 'GET') {
        $year = isset($_GET['year']) ? intval($_GET['year']) : date("Y");
        echo json_encode($tasks->getTasksByYear($year));
    } elseif ($method === 'POST') {
        $input = json_decode(file_get_contents('php://input'), true);
        echo json_encode($tasks->updateTasks($input['year'], $input['tasks']));
    } else {
        http_response_code(405);
        echo json_encode(["message" => "Méthode non autorisée"]);
    }
} elseif ($resource === 'users') {
    if ($method === 'POST') {
        $input = json_decode(file_get_contents('php://input'), true);
        echo json_encode($users->registerUser($input['username'], $input['password']));
    } elseif ($method === 'GET') {
        $username = $_GET['username'] ?? null;
        $password = $_GET['password'] ?? null;
        echo json_encode($users->loginUser($username, $password));
    } else {
        http_response_code(405);
        echo json_encode(["message" => "Méthode non autorisée"]);
    }
} else {
    http_response_code(404);
    echo json_encode(["message" => "Ressource non trouvée"]);
}

?>
