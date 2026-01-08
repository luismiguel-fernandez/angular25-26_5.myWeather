<?php
require_once 'connection.php';

try {
    $pdo = new PDO($dsn, $user, $password, $options);
} catch (\PDOException $e) {
    echo json_encode(["error" => "Error de conexión: " . $e->getMessage()]);
    exit;
}

// 2. Obtener y validar el ID de usuario (vía GET o POST)
$usuario_id = isset($_GET['usuario_id']) ? intval($_GET['usuario_id']) : null;

if (!$usuario_id) {
    echo json_encode(["error" => "ID de usuario no proporcionado"]);
    exit;
}

// 3. Consulta a la base de datos
try {
    $stmt = $pdo->prepare("SELECT id_ciudad_api FROM usuario_ciudades WHERE usuario_id = ?");
    $stmt->execute([$usuario_id]);
    
    // Extraemos solo los valores numéricos en un array simple
    $ciudades = $stmt->fetchAll(PDO::FETCH_COLUMN);

    // 4. Devolver el JSON
    echo json_encode([
        "usuario_id" => $usuario_id,
        "ciudades_favoritas" => $ciudades
    ]);

} catch (\PDOException $e) {
    echo json_encode(["error" => "Error en la consulta: " . $e->getMessage()]);
}
