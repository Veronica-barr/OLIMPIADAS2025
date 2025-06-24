<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);
session_start();

// Configuración de la base de datos SQLite
$db_path = __DIR__ . '/databases.db';
$db = new SQLite3($db_path);

// Crear tabla de usuarios si no existe
$db->exec("
    CREATE TABLE IF NOT EXISTS usuarios (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        nombre TEXT NOT NULL,
        apellido TEXT NOT NULL,
        email TEXT UNIQUE NOT NULL,
        password TEXT NOT NULL,
        telefono TEXT,
        direccion TEXT,
        sexo TEXT,
        fecha_registro TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )
");

$error = '';
$success = '';

function e($string) {
    return htmlspecialchars($string ?? '', ENT_QUOTES, 'UTF-8');
}

// Procesar el formulario
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $nombre = trim($_POST['nombre']);
    $apellido = trim($_POST['apellido']);
    $email = filter_var(trim($_POST['email']), FILTER_VALIDATE_EMAIL);
    $password = $_POST['password'];
    $confirm_password = $_POST['confirm_password'];
    $telefono = trim($_POST['telefono'] ?? '');
    $direccion = trim($_POST['direccion'] ?? '');
    $sexo = $_POST['sexo'] ?? '';

    if (empty($nombre) || empty($apellido) || !$email || empty($password)) {
        $error = 'Todos los campos obligatorios deben ser completados.';
    } elseif ($password !== $confirm_password) {
        $error = 'Las contraseñas no coinciden.';
    } elseif (strlen($password) < 8) {
        $error = 'La contraseña debe tener al menos 8 caracteres.';
    } else {
        $stmt = $db->prepare("SELECT email FROM usuarios WHERE email = :email");
        $stmt->bindValue(':email', $email, SQLITE3_TEXT);
        $result = $stmt->execute();

        if ($result->fetchArray()) {
            $error = 'Este email ya está registrado.';
        } else {
            $password_hash = password_hash($password, PASSWORD_DEFAULT);

            $stmt = $db->prepare("
                INSERT INTO usuarios (nombre, apellido, email, password, telefono, direccion, sexo)
                VALUES (:nombre, :apellido, :email, :password, :telefono, :direccion, :sexo)
            ");

            $stmt->bindValue(':nombre', $nombre, SQLITE3_TEXT);
            $stmt->bindValue(':apellido', $apellido, SQLITE3_TEXT);
            $stmt->bindValue(':email', $email, SQLITE3_TEXT);
            $stmt->bindValue(':password', $password_hash, SQLITE3_TEXT);
            $stmt->bindValue(':telefono', $telefono, SQLITE3_TEXT);
            $stmt->bindValue(':direccion', $direccion, SQLITE3_TEXT);
            $stmt->bindValue(':sexo', $sexo, SQLITE3_TEXT);

            if ($stmt->execute()) {
                $_SESSION['user_email'] = $email;
                header('Location: usuario.html');
                exit;
            } else {
                $error = 'Error al registrar. Intenta nuevamente.';
            }
        }
    }
}
?>

<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <title>Registro - VolARG</title>
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css">
    <link rel="stylesheet" href="../css/cssPrincipal/normalize.css">
    <link rel="stylesheet" href="login.css">
    <link rel="stylesheet" href="../css/cssPrincipal/principal.css">
    <link rel="stylesheet" href="../css/cssPrincipal/skeleton.css">
    <link rel="stylesheet" href="../css/cssPrincipal/carrito.css">
   
</head>
<body>
    <div class="auth-container">
        <div class="auth-header">
            <i class="fa-solid fa-user-plus"></i>
            <h2>Registrarse</h2>
        </div>

        <?php if ($error): ?>
            <div class="error-message"><?= e($error); ?></div>
        <?php endif; ?>

        <form id="registerForm" method="POST" action="register.php">
            <div class="form-group">
                <label for="nombre">Nombre</label>
                <input type="text" id="nombre" name="nombre" required value="<?= e($_POST['nombre'] ?? '') ?>">
            </div>

            <div class="form-group">
                <label for="apellido">Apellido</label>
                <input type="text" id="apellido" name="apellido" required value="<?= e($_POST['apellido'] ?? '') ?>">
            </div>

            <div class="form-group">
                <label for="email">Email</label>
                <input type="email" id="email" name="email" required value="<?= e($_POST['email'] ?? '') ?>">
            </div>

            <div class="form-group">
                <label for="password">Contraseña (mínimo 8 caracteres)</label>
                <input type="password" id="password" name="password" required minlength="8">
            </div>

            <div class="form-group">
                <label for="confirm_password">Confirmar Contraseña</label>
                <input type="password" id="confirm_password" name="confirm_password" required>
            </div>

            <div class="form-group">
                <label for="telefono">Teléfono</label>
                <input type="text" id="telefono" name="telefono" value="<?= e($_POST['telefono'] ?? '') ?>">
            </div>

            <div class="form-group">
                <label for="direccion">Dirección</label>
                <input type="text" id="direccion" name="direccion" value="<?= e($_POST['direccion'] ?? '') ?>">
            </div>

            <div class="form-group">
                <label for="sexo">Sexo</label>
                <select id="sexo" name="sexo">
                    <option value="">Seleccionar</option>
                    <option value="M" <?= (($_POST['sexo'] ?? '') === 'M') ? 'selected' : '' ?>>Masculino</option>
                    <option value="F" <?= (($_POST['sexo'] ?? '') === 'F') ? 'selected' : '' ?>>Femenino</option>
                    <option value="O" <?= (($_POST['sexo'] ?? '') === 'O') ? 'selected' : '' ?>>Otro</option>
                </select>
            </div>

            <button type="submit" class="button button-primary u-full-width">Registrarse</button>

            <div class="auth-footer">
                <p>¿Ya tienes cuenta? <a href="login.html">Inicia sesión aquí</a></p>
            </div>
        </form>
    </div>

    <script>
        // Validación del lado del cliente
        document.getElementById('registerForm').addEventListener('submit', function(e) {
            const password = document.getElementById('password').value;
            const confirmPassword = document.getElementById('confirm_password').value;

            if (password !== confirmPassword) {
                alert('Las contraseñas no coinciden.');
                e.preventDefault();
            } else if (password.length < 8) {
                alert('La contraseña debe tener al menos 8 caracteres.');
                e.preventDefault();
            }
        });
    </script>
</body>
</html>
