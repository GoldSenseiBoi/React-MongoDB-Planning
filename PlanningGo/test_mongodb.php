<?php
require 'vendor/autoload.php'; // Charge automatiquement les dépendances de Composer

$client = new MongoDB\Client("mongodb://127.0.0.1:27017");

echo "Connexion MongoDB réussie !";
?>
