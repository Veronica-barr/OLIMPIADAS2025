<!-- 
header('Content-Type: application/json');
require 'conexion.php';

$data = json_decode(file_get_contents('php://input'), true);

$email = $data['email'];
$password = $data['password'];

try {
    $stmt = $conexion->prepare("SELECT * FROM Usuario WHERE Email = ?");
    $stmt->execute([$email]);
    
    if($stmt->rowCount() === 1) {
        $usuario = $stmt->fetch(PDO::FETCH_ASSOC);
        
        if(password_verify($password, $usuario['Contraseña'])) {
            session_start();
            $_SESSION['usuario_id'] = $usuario['id'];
            $_SESSION['usuario_nombre'] = $usuario['Nombre'];
            $_SESSION['usuario_email'] = $usuario['Email'];
            
            echo json_encode([
                'success' => true,
                'message' => 'Login exitoso',
                'usuario' => [
                    'id' => $usuario['id'],
                    'nombre' => $usuario['Nombre'],
                    'email' => $usuario['Email']
                ]
            ]);
        } else {
            echo json_encode([
                'success' => false,
                'message' => 'Credenciales incorrectas'
            ]);
        }
    } else {
        echo json_encode([
            'success' => false,
            'message' => 'Usuario no encontrado'
        ]);
    }
} catch(PDOException $e) {
    echo json_encode([
        'success' => false,
        'message' => 'Error en la base de datos: ' . $e->getMessage()
    ]);
} -->
<!-- 
header('Content-Type: application/json');
require_once 'conexion.php';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $data = json_decode(file_get_contents("php://input"), true);
    $email = $data['email'] ?? '';
    $password = $data['password'] ?? '';

    $stmt = $conexion->prepare("SELECT * FROM Usuario WHERE Email = ?");
    $stmt->execute([$email]);
    $user = $stmt->fetch(PDO::FETCH_ASSOC);

    if ($user && password_verify($password, $user['Contraseña'])) {
        session_start();
        $_SESSION['user_id'] = $user['id'];
        echo json_encode([
            'success' => true,
            'usuario' => [
                'id' => $user['id'],
                'nombre' => $user['Nombre'],
                'email' => $user['Email']
            ]
        ]);
    } else {
        echo json_encode([
            'success' => false,
            'message' => 'Credenciales incorrectas'
        ]);
    }
}
 -->
<?php
header('Content-Type: application/json');
require_once 'conexion.php';

$data = json_decode(file_get_contents('php://input'), true);
$email = trim($data['email'] ?? '');
$password = $data['password'] ?? '';

try {
    $stmt = $conexion->prepare("SELECT * FROM Usuario WHERE Email = ?");
    $stmt->execute([$email]);
    $user = $stmt->fetch(PDO::FETCH_ASSOC);

    if ($user && password_verify($password, $user['Contraseña'])) {
        echo json_encode([
            'success' => true,
            'usuario' => [
                'id' => $user['id'],
                'nombre' => $user['Nombre'],
                'email' => $user['Email']
            ]
        ]);
    } else {
        echo json_encode([
            'success' => false,
            'message' => 'Credenciales incorrectas'
        ]);
    }
} catch (PDOException $e) {
    echo json_encode([
        'success' => false,
        'message' => 'Error en la base de datos: ' . $e->getMessage()
    ]);
}
?>