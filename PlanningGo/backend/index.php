<?php
header("Access-Control-Allow-Origin: *"); // Autoriser toutes les origines
header("Content-Type: application/json"); // Définir le type de contenu
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS"); // Méthodes HTTP autorisées
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With"); // En-têtes autorisées

require 'tasks.php';
require 'users.php';

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

$method = $_SERVER['REQUEST_METHOD'];
$request = explode('/', trim($_SERVER['PATH_INFO'] ?? '', '/'));
$resource = $request[0] ?? '';

if ($resource === 'tasks') {
    $tasks = new Tasks();

    if ($method === 'GET') {
        // Récupérer les tâches par année
        $year = $_GET['year'] ?? date('Y'); // Si aucun paramètre, l'année en cours
        echo json_encode($tasks->getTasksByYear($year));
    } elseif ($method === 'PUT') {
        // Mettre à jour une tâche
        $data = json_decode(file_get_contents("php://input"), true);
        if (isset($data['week'], $data['person'])) {
            echo json_encode(['message' => $tasks->updateTask($data['week'], $data['person'])]);
        } else {
            http_response_code(400); // Mauvaise requête
            echo json_encode(['error' => 'Données invalides']);
        }
    }
} elseif ($resource === 'users') {
    $users = new Users();
    $data = json_decode(file_get_contents("php://input"), true);

    if ($method === 'POST') {
        if ($request[1] === 'register') {
            echo json_encode(['id' => $users->registerUser($data['username'], $data['password'])]);
        } elseif ($request[1] === 'login') {
            echo json_encode($users->loginUser($data['username'], $data['password']));
        }
    }
} else {
    http_response_code(404); // Ressource non trouvée
    echo json_encode(['message' => 'Ressource non trouvée']);
}
?>
