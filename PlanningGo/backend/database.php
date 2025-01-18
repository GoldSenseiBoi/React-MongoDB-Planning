<?php
require __DIR__ . '/../vendor/autoload.php';

try {
    $client = new MongoDB\Client("mongodb+srv://admin:root@cluster0.97id5.mongodb.net/?retryWrites=true&w=majority");
    $database = $client->selectDatabase("Planning");
    $collection = $database->selectCollection("task");

    $tasks = iterator_to_array($collection->find());
    echo json_encode($tasks); // Affiche toutes les tâches
} catch (Exception $e) {
    echo json_encode(["error" => $e->getMessage()]);
    exit();
}
?>
