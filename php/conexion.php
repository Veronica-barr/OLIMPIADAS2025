<?php
$host = 'localhost';
$db = 'Olimpiadas2025';  // CAMBIA esto por el nombre real de tu base de datos
$user = 'root';
$pass = 'Mysql$2025!'; // en XAMPP suele estar en blanco

try {
    $conexion = new PDO("mysql:host=$host;dbname=$db;charset=utf8", $user, $pass);
    $conexion->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch (PDOException $e) {
    die(json_encode([
        'success' => false,
        'message' => 'Error de conexión: ' . $e->getMessage()
    ]));
}
?>