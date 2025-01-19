<?php

class Users {
    private $collection;

    public function __construct($database) {
        $this->collection = $database->selectCollection("users");
    }

    // Inscription d'un utilisateur
    public function registerUser($username, $password) {
        // Vérifier si l'utilisateur existe déjà
        $existingUser = $this->collection->findOne(['username' => $username]);
        if ($existingUser) {
            return ['error' => "L'utilisateur existe déjà"];
        }

        // Hachage du mot de passe
        $hashedPassword = password_hash($password, PASSWORD_BCRYPT);

        // Insérer dans la base de données
        $result = $this->collection->insertOne([
            'username' => $username,
            'password' => $hashedPassword
        ]);

        return ['message' => "Inscription réussie", 'id' => (string)$result->getInsertedId()];
    }

    // Connexion d'un utilisateur
    public function loginUser($username, $password) {
        // Récupérer l'utilisateur depuis la base de données
        $user = $this->collection->findOne(['username' => $username]);
        if (!$user) {
            return ['error' => "Nom d'utilisateur ou mot de passe incorrect"];
        }

        // Vérifier le mot de passe
        if (password_verify($password, $user['password'])) {
            return ['message' => "Connexion réussie", 'username' => $username];
        } else {
            return ['error' => "Nom d'utilisateur ou mot de passe incorrect"];
        }
    }
}

?>
