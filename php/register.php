<?php
header('Content-Type: application/json');
require 'conexion.php';

$data = json_decode(file_get_contents('php://input'), true);

$nombre = trim($data['nombre']);
$apellido = trim($data['apellido']);
$email = trim($data['email']);
$password = $data['password'];

try {
    $stmt = $conexion->prepare("SELECT id FROM Usuario WHERE Email = ?");
    $stmt->execute([$email]);

    if($stmt->rowCount() > 0) {
        echo json_encode([
            'success' => false,
            'message' => 'El email ya está registrado'
        ]);
        exit;
    }

    $passwordHash = password_hash($password, PASSWORD_DEFAULT);

    $stmt = $conexion->prepare("INSERT INTO Usuario (Nombre, Apellido, Email, Contraseña, Fecha_registro) VALUES (?, ?, ?, ?, NOW())");
    if($stmt->execute([$nombre, $apellido, $email, $passwordHash])) {
        echo json_encode([
            'success' => true,
            'message' => 'Usuario registrado correctamente'
        ]);
    } else {
        echo json_encode([
            'success' => false,
            'message' => 'Error al registrar el usuario'
        ]);
    }
} catch(PDOException $e) {
    echo json_encode([
        'success' => false,
        'message' => 'Error en la base de datos: ' . $e->getMessage()
    ]);
}
?>
