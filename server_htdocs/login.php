<?php
require_once 'connection.php';

try {
    $pdo = new PDO($dsn, $user, $password, $options);

    // Comprobamos si la solicitud se realizó mediante POST
    if ($_SERVER['REQUEST_METHOD'] === 'POST') {
        $input = json_decode(file_get_contents('php://input'), true);
        
        // Obtenemos los datos del array $_POST
        $user_login = $input['usuario'] ?? ($_POST['usuario'] ?? '');
        $user_pass  = $input['password'] ?? ($_POST['password'] ?? '');

        if (empty($user_login)) {
            echo json_encode(["success" => false, "message" => "Por favor, introduce tu nombre de usuario."]);
        } else if (empty($user_pass)) {
            echo json_encode(["success" => false, "message" => "Por favor, introduce tu contraseña."]);
        } else {
            // Buscamos al usuario por su nombre de usuario
            $stmt = $pdo->prepare("SELECT id, password_hash FROM usuarios WHERE username = ?");
            $stmt->execute([$user_login]);
            $usuario = $stmt->fetch();

            // Verificamos el hash de la contraseña
            if ($usuario && password_verify($user_pass, $usuario['password_hash'])) {
                echo json_encode(["success" => true, "message" => "Inicio de sesión exitoso.", "usuario_id" => $usuario['id']]);
                // Aquí podrías redirigir o iniciar sesión
            } else {
                echo json_encode(["success" => false, "message" => "Usuario o contraseña incorrectos."]);
            }
        }
    }
} catch (\PDOException $e) {
    die("Error de conexión: " . $e->getMessage());
}
?>