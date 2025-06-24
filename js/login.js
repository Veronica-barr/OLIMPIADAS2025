document.getElementById('loginForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    
    const adminEmail = "admin@todoairelibre.com";
    const adminPassword = "12aiilen";
    
    if(email === adminEmail && password === adminPassword) {
        // Redirigir al panel de administración
        window.location.href = "../usuario/usuario.html";
    } else if(email && password) {
        // Credenciales de usuario normal
        alert('Inicio de sesión exitoso. Redirigiendo...');
        window.location.href = "../usuario/usuario.html";
    } else {
        alert('Por favor complete todos los campos');
    }
});
// document.getElementById('loginForm').addEventListener('submit', function(e) {
//     e.preventDefault();

//     const email = document.getElementById('email').value;
//     const password = document.getElementById('password').value;

//     fetch('../php/login.php', {
//         method: 'POST',
//         headers: {
//             'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({ email, password })
//     })
//     .then(response => response.json())
//     .then(data => {
//         if(data.success) {
//             localStorage.setItem('usuario_id', data.usuario.id);
//             localStorage.setItem('usuario_nombre', data.usuario.nombre);
//             localStorage.setItem('usuario_email', data.usuario.email);
//             window.location.href = "../usuario/usuario.html";
//         } else {
//             alert(data.message || 'Error en el login');
//         }
//     })
//     .catch(error => {
//         console.error('Error:', error);
//         alert('Error al conectar con el servidor');
//     });
// });
