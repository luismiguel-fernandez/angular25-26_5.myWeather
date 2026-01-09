<?php
require_once 'connection.php';

try {
    $pdo = new PDO($dsn, $user, $password, $options);

    if (isset($_POST['username']) && isset($_POST['password'])) {
        
        $username = trim($_POST['username'] ?? '');
        $password_plain = $_POST['password'] ?? '';

        // Validación básica
        if (empty($username) || empty($password_plain)) {
            die("Error: El usuario y la contraseña son obligatorios.");
        }

        // 2. Encriptar la contraseña
        // PASSWORD_DEFAULT utiliza actualmente bcrypt, el estándar de la industria.
        $password_hashed = password_hash($password_plain, PASSWORD_DEFAULT);

        // 3. Insertar en la base de datos
        $sql = "INSERT INTO usuarios (username, password_hash) VALUES (:user, :pass)";
        $stmt = $pdo->prepare($sql);

        try {
            $stmt->execute([
                ':user' => $username,
                ':pass' => $password_hashed
            ]);
            echo "Usuario registrado exitosamente.";
        } catch (PDOException $e) {
            // Manejar error de nombre de usuario duplicado (UNIQUE constraint)
            if ($e->getCode() == 23000) {
                echo "Error: El nombre de usuario ya existe.";
            } else {
                throw $e;
            }
        }
    }
} catch (PDOException $e) {
    die("Error de conexión: " . $e->getMessage());
}
?>