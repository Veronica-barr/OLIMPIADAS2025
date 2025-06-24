<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);
session_start();

$db_path = __DIR__ . '/databases.db';
try {
    $db = new SQLite3($db_path);
    $db->enableExceptions(true);
} catch (Exception $e) {
    die("Error al conectar con la base de datos: " . $e->getMessage());
}

$error = '';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $email = filter_input(INPUT_POST, 'email', FILTER_SANITIZE_EMAIL);
    $password = $_POST['password'];

    if (!$email || empty($password)) {
        $error = 'Por favor ingresa un email y contraseña válidos.';
    } else {
        try {
            $stmt = $db->prepare("SELECT id, nombre, email, password, rol FROM usuarios WHERE email = :email");
            $stmt->bindValue(':email', $email, SQLITE3_TEXT);
            $result = $stmt->execute();
            $user = $result->fetchArray(SQLITE3_ASSOC);

            if ($user && password_verify($password, $user['password'])) {
                // Autenticación exitosa
                $_SESSION['user_id'] = $user['id'];
                $_SESSION['user_email'] = $user['email'];
                $_SESSION['user_name'] = $user['nombre'];
                $_SESSION['user_role'] = $user['rol'];
                
                // Redirección según rol
                if ($user['rol'] === 'admin') {
                    header('Location: ../admin/panel.php');
                } else {
                    header('Location: ../usuario/dashboard.php');
                }
                exit;
            } else {
                $error = 'Credenciales incorrectas. Intenta nuevamente.';
            }
        } catch (Exception $e) {
            $error = 'Error en el sistema. Por favor intenta más tarde.';
        }
    }
}
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>volARG</title>
    <link rel="stylesheet" href="login.css">
    <link rel="stylesheet" href="../css/cssPrincipal/principal.css">
    <link rel="stylesheet" href="../css/cssPrincipal/skeleton.css">
    <link rel="stylesheet" href="../css/cssPrincipal/normalize.css">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css" crossorigin="anonymous" referrerpolicy="no-referrer" />
    <link rel="stylesheet" href="../css/cssPrincipal/carrito.css">

</head>
</head>
<body>
    <header class="header">
        <div class="container">
            <div class="row">
                <div class="container-logo">
                    <i class="fa-solid fa-plane-departure"></i>
                    <h1 class="logo"><a href="../indexPrincipal.html">Volarg</a></h1>
                </div>
                
                <div class="user-menu-container">
                    <div class="user-menu">
                        <i class="fa-solid fa-user user-icon"></i>
                        <div class="user-dropdown">
                            <a href="login.html">Iniciar sesión</a>
                            <a href="register.php">Registrarme</a>
                        </div>
                    </div>
                    
                    <div class="cart-container">
                        <i class="fa-solid fa-cart-shopping cart-icon"></i>
                        <div id="carrito">
                            <table id="lista-carrito" class="u-full-width">
                                <thead>
                                    <tr>
                                        <th>Imagen</th>
                                        <th>Nombre</th>
                                        <th>Precio</th>
                                        <th>Cantidad</th>
                                        <th></th>
                                    </tr>
                                </thead>
                                <tbody></tbody>
                            </table>
                            <a href="#" id="vaciar-carrito" class="button u-full-width">Vaciar Carrito</a>
                            <a href="">Compra</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </header>

    <div class="auth-container">
        <div class="auth-header">
            <i class="fa-solid fa-user-lock"></i>
            <h2>Iniciar Sesión</h2>
        </div>
        
<form id="loginForm" action="login.php" method="POST">

            <div class="form-group">
                <label for="email">Email</label>
                <input type="email" id="email" name="email" required>
            </div>
            
            <div class="form-group">
                <label for="password">Contraseña</label>
                <input type="password" id="password" name="password" required>
            </div>
            
            <button type="submit" class="button button-primary u-full-width">Ingresar</button>
            
            <div class="auth-footer">
                <p>¿No tienes cuenta? <a href="./register.html">Regístrate aquí</a></p>
                <a href="forgot-password.html">¿Olvidaste tu contraseña?</a>
            </div>
        </form>
    </div>

    <footer class="footer">
        <div class="container container-footer">
            <div class="menu-footer">
                <div class="contact-info">
                    <p class="title-footer">Información de Contacto</p>
                    <ul>
                        <li>Dirección: Juan XXIII 125, B1620 Maquinista Savio, Provincia de Buenos Aires</li>
                        <li>Teléfono: 123-456-7890</li>
                        <li>Email: eestn3@gmail.com</li>
                    </ul>
                    <div class="social-icons">
                        <a href="#"><i class="fa-brands fa-facebook-f"></i></a>
                        <a href="#"><i class="fa-brands fa-twitter"></i></a>
                        <a href="#"><i class="fa-brands fa-youtube"></i></a>
                        <a href="#"><i class="fa-brands fa-instagram"></i></a>
                    </div>
                </div>

                <div class="information">
                    <p class="title-footer">Información</p>
                    <ul>
                        <li><a href="#">Acerca de Nosotros</a></li>
                        <li><a href="#">Información Delivery</a></li>
                        <li><a href="#">Términos y condiciones</a></li>
                        <li><a href="#">Políticas de Privacidad</a></li>
                    </ul>
                </div>

                <div class="my-account">
                    <p class="title-footer">Mi cuenta</p>
                    <ul>
                        <li><a href="#">Mi cuenta</a></li>
                        <li><a href="#">Historial de ordenes</a></li>
                        <li><a href="#">Lista de deseos</a></li>
                        <li><a href="#">Boletín</a></li>
                        <li><a href="#">Reembolsos</a></li>
                    </ul>
                </div>

                <div class="newsletter">
                    <p class="title-footer">Boletín informativo</p>
                    <div class="content">
                        <p>Suscríbete a nuestros boletines ahora y mantente al día con nuevas colecciones y ofertas exclusivas.</p>
                        <input type="email" placeholder="Ingresa el correo aquí...">
                        <button>Suscríbete</button>
                    </div>
                </div>
            </div>

            <div class="copyright">
                <p>Desarrollado por Programación 7'5, Coronel y Cabrera &copy; 2023</p>
                <img src="img2/payment.png" alt="Métodos de pago">
            </div>
        </div>
    </footer>
    <script src="../js/login.js"></script>
</body>
</html>