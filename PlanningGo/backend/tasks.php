<?php
require_once 'database.php';

class Tasks {
    private $collection;

    public function __construct() {
        global $database;
        $this->collection = $database->selectCollection("tasks");
    }

    // Récupère les tâches pour une année donnée
    public function getTasksByYear($year) {
        try {
            $start = new DateTime("$year-01-01");
            $end = new DateTime("$year-12-31");

            $tasks = $this->collection->find([
                'week' => [
                    '$gte' => $start->format('Y-m-d'),
                    '$lte' => $end->format('Y-m-d')
                ]
            ]);

            return iterator_to_array($tasks);
        } catch (Exception $e) {
            return ["error" => $e->getMessage()];
        }
    }

    // Met à jour une tâche pour une semaine donnée
    public function updateTask($week, $person) {
        try {
            $result = $this->collection->updateOne(
                ['week' => $week],
                ['$set' => ['person' => $person]],
                ['upsert' => true]
            );

            return $result->getModifiedCount() > 0 ? "Tâche mise à jour" : "Aucune modification";
        } catch (Exception $e) {
            return ["error" => $e->getMessage()];
        }
    }
}

?>
