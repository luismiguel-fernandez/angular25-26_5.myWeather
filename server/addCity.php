<?php
// ... (Configuración de conexión PDO igual a los anteriores)

try {
    if ($_SERVER['REQUEST_METHOD'] === 'POST') {
        
        $usuario_id    = $_POST['usuario_id'] ?? null;
        $id_ciudad_api = $_POST['id_ciudad_api'] ?? null;
        $nombre_ciudad = $_POST['nombre_ciudad'] ?? '';
        $codigo_pais   = $_POST['codigo_pais'] ?? '';
        // Capturamos el valor booleano (si no se envía, por defecto es 0)
        $es_especial   = isset($_POST['es_especial']) ? 1 : 0;

        $sql = "INSERT INTO usuario_ciudades (usuario_id, id_ciudad_api, nombre_ciudad, codigo_pais, es_especial) 
                VALUES (:u_id, :c_api, :n_ciudad, :c_pais, :esp)";
        
        $stmt = $pdo->prepare($sql);
        $stmt->execute([
            ':u_id'     => $usuario_id,
            ':c_api'    => $id_ciudad_api,
            ':n_ciudad' => $nombre_ciudad,
            ':c_pais'   => $codigo_pais,
            ':esp'      => $es_especial
        ]);

        echo "Ciudad guardada correctamente.";
    }
} catch (PDOException $e) {
    echo "Error: " . $e->getMessage();
}
?>