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

    if ($_SERVER['REQUEST_METHOD'] === 'POST') {
        
        $usuario_id    = $_POST['usuario_id'] ?? null;
        $id_ciudad_api = $_POST['id_ciudad_api'] ?? null;
        
        // Recibimos el nuevo estado: 1 para especial, 0 para normal
        // Si no se envía 'estado', por defecto lo ponemos en 0
        $nuevo_estado  = isset($_POST['estado']) ? (int)$_POST['estado'] : 0;

        if (!$usuario_id || !$id_ciudad_api) {
            die("Error: Faltan identificadores para actualizar.");
        }

        // 2. Preparar la actualización
        $sql = "UPDATE usuario_ciudades 
                SET es_especial = :estado 
                WHERE usuario_id = :u_id AND id_ciudad_api = :c_api";
        
        //ALTERNATIVA para que funcione como TOGGLE
        //UPDATE usuario_ciudades SET es_especial = NOT es_especial WHERE ...
        
        $stmt = $pdo->prepare($sql);
        $stmt->execute([
            ':estado' => $nuevo_estado,
            ':u_id'   => $usuario_id,
            ':c_api'  => $id_ciudad_api
        ]);

        // 3. Respuesta al usuario
        if ($stmt->rowCount() > 0) {
            $mensaje = ($nuevo_estado === 1) ? "Ciudad marcada como especial." : "Ciudad marcada como normal.";
            echo $mensaje;
        } else {
            echo "No se realizaron cambios (es posible que la ciudad ya tuviera ese estado o no exista).";
        }
    }
} catch (PDOException $e) {
    echo "Error de base de datos: " . $e->getMessage();
}
?>