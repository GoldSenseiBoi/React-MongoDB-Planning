<?php

require __DIR__ . '/../vendor/autoload.php';

class Database {
    private $client;
    private $database;

    public function __construct() {
        try {
            $this->client = new MongoDB\Client(
                "mongodb+srv://admin:root@cluster0.97id5.mongodb.net/?retryWrites=true&w=majority"
            );
            $this->database = $this->client->selectDatabase('Planning');
        } catch (Exception $e) {
            die(json_encode(['error' => $e->getMessage()]));
        }
    }

    public function getDatabase() {
        return $this->database;
    }
}

?>
