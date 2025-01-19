<?php

class Tasks {
    private $collection;

    public function __construct($database) {
        $this->collection = $database->selectCollection("task"); // Correspond à la collection dans Compass
    }

    // Récupérer les tâches pour une année donnée
    public function getTasksByYear($year) {
        $task = $this->collection->findOne(['year' => intval($year)]);

        // Générer un planning vide si aucune tâche n'existe pour cette année
        if (!$task) {
            $task = $this->generateEmptyYear($year);
        }

        // Calculer les statistiques
        $statistics = $this->calculateStatistics($task['weeks']);

        return [
            'year' => $year,
            'weeks' => $task['weeks'],
            'statistics' => $statistics,
        ];
    }

    // Générer un planning vide pour une année
    private function generateEmptyYear($year) {
        $weeks = [];
        for ($i = 1; $i <= 52; $i++) {
            $weeks[] = [
                'week' => $i,
                'person' => "personne",
            ];
        }

        // Insérer dans la collection
        $this->collection->insertOne([
            'year' => intval($year),
            'weeks' => $weeks,
        ]);

        return ['year' => $year, 'weeks' => $weeks];
    }

    // Calculer les statistiques des participants
    private function calculateStatistics($weeks) {
        $stats = [];
        foreach ($weeks as $week) {
            $person = $week['person'] ?? "personne";
            if (!isset($stats[$person])) {
                $stats[$person] = 0;
            }
            $stats[$person]++;
        }
        asort($stats); // Trier par ordre croissant
        return $stats;
    }

    // Mettre à jour les tâches pour une année
    public function updateTasks($year, $tasks) {
        $this->collection->updateOne(
            ['year' => intval($year)],
            ['$set' => ['weeks' => $tasks]]
        );

        return ['message' => "Mise à jour réussie"];
    }
}

?>
