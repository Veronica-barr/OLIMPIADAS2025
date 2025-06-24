// document.getElementById('registerForm').addEventListener('submit', function(e) {
//     e.preventDefault();

//     const nombre = document.getElementById('nombre').value;
//     const apellido = document.getElementById('apellido').value;
//     const email = document.getElementById('email').value;
//     const password = document.getElementById('password').value;
//     const confirmPassword = document.getElementById('confirm_password').value;
//     const telefono = document.getElementById('telefono').value;
//     const direccion = document.getElementById('direccion').value;
//     const sexo = document.getElementById('sexo').value;

//     if (password !== confirmPassword) {
//         alert('Las contraseñas no coinciden');
//         return;
//     }

//     if (password.length < 8) {
//         alert('La contraseña debe tener al menos 8 caracteres');
//         return;
//     }

//     fetch('../php/register.php', {
//         method: 'POST',
//         headers: {
//             'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({
//             nombre,
//             apellido,
//             email,
//             password,
//             telefono,
//             direccion,
//             sexo
//         })
//     })
//     .then(response => response.json())
//     .then(data => {
//         if (data.success) {
//             alert('Registro exitoso. Redirigiendo...');
//             window.location.href = "login.html";
//         } else {
//             alert(data.message || 'Error en el registro');
//         }
//     })
//     .catch(error => {
//         console.error('Error:', error);
//         alert('Error al conectar con el servidor');
//     });
// });
document.getElementById('registerForm').addEventListener('submit', function(e) {
    e.preventDefault();

    const nombre = document.getElementById('nombre').value;
    const apellido = document.getElementById('apellido').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirm_password').value;

    if(password !== confirmPassword) {
        alert('Las contraseñas no coinciden');
        return;
    }

    if(password.length < 8) {
        alert('La contraseña debe tener al menos 8 caracteres');
        return;
    }

    fetch('../php/register.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ nombre, apellido, email, password })
    })
    .then(response => response.json())
    .then(data => {
        if(data.success) {
            alert('Registro exitoso. Redirigiendo...');
            window.location.href = "login.html";
        } else {
            alert(data.message || 'Error en el registro');
        }
    })
    .catch(error => {
        console.error('Error:', error);
        alert('Error al conectar con el servidor');
    });
});
