<?php
// 1. Configuración de la base de datos
$host     = 'localhost';
$db       = 'gestion_usuarios';
$user     = 'tu_usuario';
$password = 'tu_password';
$charset  = 'utf8mb4';

$dsn = "mysql:host=$host;dbname=$db;charset=$charset";
$options = [
    PDO::ATTR_ERRMODE            => PDO::ERRMODE_EXCEPTION,
    PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
    PDO::ATTR_EMULATE_PREPARES   => false,
];

try {
    $pdo = new PDO($dsn, $user, $password, $options);

    // 2. Procesar la eliminación mediante POST
    if ($_SERVER['REQUEST_METHOD'] === 'POST') {
        
        $usuario_id    = $_POST['usuario_id'] ?? null;
        $id_ciudad_api = $_POST['id_ciudad_api'] ?? null;

        if (!$usuario_id || !$id_ciudad_api) {
            die("Error: Faltan datos para procesar la eliminación.");
        }

        // 3. Preparar la consulta de eliminación
        // Usamos ambos IDs para garantizar que el usuario borra su propio registro
        $sql = "DELETE FROM usuario_ciudades 
                WHERE usuario_id = :u_id AND id_ciudad_api = :c_api";
        
        $stmt = $pdo->prepare($sql);
        $stmt->execute([
            ':u_id'  => $usuario_id,
            ':c_api' => $id_ciudad_api
        ]);

        // 4. Verificar si se eliminó algún registro
        if ($stmt->rowCount() > 0) {
            echo "La ciudad ha sido eliminada correctamente.";
        } else {
            echo "No se encontró el registro o no tienes permiso para eliminarlo.";
        }
    }
} catch (PDOException $e) {
    echo "Error en la base de datos: " . $e->getMessage();
}
?>