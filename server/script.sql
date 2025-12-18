-- 1. Crear la base de datos (opcional si ya existe)
CREATE DATABASE IF NOT EXISTS gestion_usuarios;
USE gestion_usuarios;

-- 2. Tabla de Usuarios
-- El campo 'password_hash' tiene longitud de 255 para soportar algoritmos como bcrypt o argon2
CREATE TABLE usuarios (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) NOT NULL UNIQUE,
    password_hash VARCHAR(255) NOT NULL,
    fecha_registro TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 3. Tabla de Relación Usuario-Ciudad
-- Nota: 'id_ciudad' no es llave foránea de otra tabla aquí porque los datos vienen de una API externa,
-- pero se mantiene la integridad referencial con el usuario.
CREATE TABLE usuario_ciudades (
    id INT AUTO_INCREMENT PRIMARY KEY,
    usuario_id INT NOT NULL,
    id_ciudad_api INT NOT NULL,
    nombre_ciudad VARCHAR(100),
    codigo_pais VARCHAR(5),
    es_especial BOOLEAN DEFAULT 0, -- Campo booleano (0 = no, 1 = sí)
    FOREIGN KEY (usuario_id) REFERENCES usuarios(id) ON DELETE CASCADE,
    UNIQUE(usuario_id, id_ciudad_api)
);