<?php

// Permitir cualquier origen (en producción es mejor poner tu dominio específico)
header("Access-Control-Allow-Origin: *");

// Indicar qué métodos HTTP están permitidos
header("Access-Control-Allow-Methods: GET, POST, OPTIONS, PUT, DELETE");

// Permitir cabeceras específicas (muy importante para Content-Type: application/json de Angular)
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

// 1. Configuración de la base de datos
$host     = 'localhost';
$db       = 'weather_backend';
$user     = 'root';
$password = '';
$charset  = 'utf8mb4';

$dsn = "mysql:host=$host;dbname=$db;charset=$charset";
$options = [
    PDO::ATTR_ERRMODE            => PDO::ERRMODE_EXCEPTION,
    PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
    PDO::ATTR_EMULATE_PREPARES   => false,
];

?>