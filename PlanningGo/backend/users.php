<?php
require_once 'database.php';

class Users {
    private $collection;

    public function __construct() {
        global $database;
        $this->collection = $database->selectCollection("users");
    }

    public function registerUser($username, $password) {
        $hashedPassword = password_hash($password, PASSWORD_BCRYPT);
        $result = $this->collection->insertOne([
            'username' => $username,
            'password' => $hashedPassword
        ]);
        return $result->getInsertedId();
    }

    public function loginUser($username, $password) {
        $user = $this->collection->findOne(['username' => $username]);
        if ($user && password_verify($password, $user['password'])) {
            return ["message" => "Login successful"];
        }
        return ["error" => "Invalid username or password"];
    }
}
?>
