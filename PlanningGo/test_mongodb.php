<?php
require 'vendor/autoload.php';

try {
    $client = new MongoDB\Client("mongodb://127.0.0.1:27017");
    $database = $client->Planning; // Accéder à la base 'Planning'
    $collection = $database->tasks; // Accéder à la collection 'tasks'

    $documents = $collection->find();
    foreach ($documents as $document) {
        print_r($document);
    }
} catch (Exception $e) {
    echo "Erreur de connexion à MongoDB : " . $e->getMessage();
}
?>
