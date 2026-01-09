<?php
require_once 'connection.php';

try {
    $pdo = new PDO($dsn, $user, $password, $options);

    // Comprobamos si la solicitud se realizó mediante POST
    if ($_SERVER['REQUEST_METHOD'] === 'POST') {
        
        // Obtenemos los datos del array $_POST
        $user_login = $_POST['usuario'] ?? '';
        $user_pass  = $_POST['password'] ?? '';

        if (empty($user_login) || empty($user_pass)) {
            echo "Por favor, completa todos los campos.";
        } else {
            // Buscamos al usuario por su nombre de usuario
            $stmt = $pdo->prepare("SELECT id, password_hash FROM usuarios WHERE username = ?");
            $stmt->execute([$user_login]);
            $usuario = $stmt->fetch();

            // Verificamos el hash de la contraseña
            if ($usuario && password_verify($user_pass, $usuario['password_hash'])) {
                echo "Login exitoso. Bienvenido.";
                // Aquí podrías redirigir o iniciar sesión
            } else {
                echo "Usuario o contraseña incorrectos.";
            }
        }
    }
} catch (\PDOException $e) {
    die("Error de conexión: " . $e->getMessage());
}
?>