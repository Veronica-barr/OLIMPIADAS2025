// document.addEventListener('DOMContentLoaded', function() {
//     // Funcionalidad para las pestañas
//     const tabBtns = document.querySelectorAll('.tab-btn');
    
//     tabBtns.forEach(btn => {
//         btn.addEventListener('click', function() {
//             document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
//             document.querySelectorAll('.tab-content').forEach(c => c.classList.remove('active'));
            
//             this.classList.add('active');
//             const tabId = this.getAttribute('data-tab');
//             document.getElementById(tabId).classList.add('active');
//         });
//     });
    
//     // Funcionalidad del carrito
//     const addToCartBtn = document.querySelector('.btn-add-to-cart');
    
//     if(addToCartBtn) {
//         addToCartBtn.addEventListener('click', agregarAlCarrito);
//     }
    
//     function agregarAlCarrito() {
//         const boton = this;
//         const id = boton.getAttribute('data-id');
//         const nombre = boton.getAttribute('data-nombre');
//         const precio = parseFloat(boton.getAttribute('data-precio'));
//         const imagen = boton.getAttribute('data-imagen');
        
//         // Crear objeto del producto
//         const producto = {
//             id,
//             nombre,
//             precio,
//             imagen,
//             cantidad: 1
//         };
        
//         // Obtener carrito de localStorage o crear uno nuevo
//         let carrito = JSON.parse(localStorage.getItem('carrito')) || [];
        
//         // Verificar si el producto ya está en el carrito
//         const index = carrito.findIndex(item => item.id === id);
        
//         if(index !== -1) {
//             // Si el producto existe, aumentar la cantidad
//             carrito[index].cantidad += 1;
//         } else {
//             // Si no existe, agregarlo al carrito
//             carrito.push(producto);
//         }
        
//         // Guardar en localStorage
//         localStorage.setItem('carrito', JSON.stringify(carrito));
        
//         // Mostrar notificación
//         mostrarNotificacion('Producto agregado al carrito');
        
//         // Actualizar contador del carrito
//         actualizarContadorCarrito();
        
//         // Animación del botón
//         boton.textContent = '✓ Agregado';
//         boton.style.backgroundColor = '#2ecc71';
        
//         setTimeout(() => {
//             boton.textContent = 'Agregar al carrito';
//             boton.style.backgroundColor = '#3498db';
//         }, 2000);
//     }
    
//     function mostrarNotificacion(mensaje) {
//         // Crear notificación si no existe
//         let notificacion = document.querySelector('.notification');
        
//         if(!notificacion) {
//             notificacion = document.createElement('div');
//             notificacion.className = 'notification';
//             document.body.appendChild(notificacion);
//         }
        
//         notificacion.textContent = mensaje;
//         notificacion.style.display = 'block';
        
//         setTimeout(() => {
//             notificacion.style.animation = 'slideOut 0.3s ease-out';
//             setTimeout(() => {
//                 notificacion.style.display = 'none';
//                 notificacion.style.animation = '';
//             }, 300);
//         }, 3000);
//     }
    
//     function actualizarContadorCarrito() {
//         const contador = document.querySelector('.cart-count');
//         if(contador) {
//             const carrito = JSON.parse(localStorage.getItem('carrito')) || [];
//             const totalItems = carrito.reduce((total, item) => total + item.cantidad, 0);
//             contador.textContent = totalItems;
//             contador.style.display = totalItems > 0 ? 'block' : 'none';
//         }
//     }
    
//     // Inicializar contador al cargar la página
//     actualizarContadorCarrito();
// });




document.addEventListener('DOMContentLoaded', function() {
    // Variables
    const carrito = document.getElementById('carrito');
    const listaCarrito = document.querySelector('#lista-carrito tbody');
    const vaciarCarritoBtn = document.getElementById('vaciar-carrito');
    const listaProductos = document.querySelector('.container-products');
    const cartIcon = document.querySelector('.cart-icon');
    let articulosCarrito = [];
    let carritoTimeout;

    // Event Listeners
    cargarEventListeners();

    function cargarEventListeners() {
        // Mostrar carrito al pasar el mouse sobre el icono
        cartIcon.addEventListener('mouseenter', mostrarCarrito);
        
        // Ocultar carrito al salir del icono o del carrito
        cartIcon.addEventListener('mouseleave', iniciarTimeoutOcultar);
        carrito.addEventListener('mouseleave', iniciarTimeoutOcultar);
        
        // Cancelar ocultar si el mouse vuelve al icono o carrito
        carrito.addEventListener('mouseenter', cancelarTimeoutOcultar);
        cartIcon.addEventListener('mouseenter', cancelarTimeoutOcultar);

        // Agregar producto al carrito
        listaProductos.addEventListener('click', agregarProducto);

        // Eliminar producto del carrito
        carrito.addEventListener('click', eliminarProducto);

        // Vaciar el carrito
        vaciarCarritoBtn.addEventListener('click', vaciarCarrito);

        // Cargar carrito del localStorage al iniciar
        cargarCarrito();
    }

    // Funciones para mostrar/ocultar carrito
    function mostrarCarrito() {
        clearTimeout(carritoTimeout);
        carrito.style.display = 'block';
    }

    function iniciarTimeoutOcultar() {
        carritoTimeout = setTimeout(() => {
            carrito.style.display = 'none';
        }, 300); // 300ms de delay antes de ocultar
    }

    function cancelarTimeoutOcultar() {
        clearTimeout(carritoTimeout);
    }

    // Funciones del carrito
    function cargarCarrito() {
        articulosCarrito = JSON.parse(localStorage.getItem('carrito')) || [];
        carritoHTML();
    }

    function agregarProducto(e) {
        e.preventDefault();
        if (e.target.classList.contains('agregar-carrito')) {
            const productoSeleccionado = e.target.parentElement.parentElement;
            leerDatosProducto(productoSeleccionado);
            

        }
    }


    function leerDatosProducto(producto) {
        const precioTexto = producto.querySelector('.precio').firstChild.textContent;
        const precioNumerico = parseFloat(precioTexto.replace(/[^0-9.-]+/g,""));
        
        const infoProducto = {
            imagen: producto.querySelector('img').src,
            titulo: producto.querySelector('h4').textContent,
            precio: precioTexto.trim(),
            precioNumerico: precioNumerico,
            id: producto.querySelector('button').getAttribute('data-id') || Date.now(),
            cantidad: 1
        };

        // Revisar si el producto ya existe en el carrito
        const existe = articulosCarrito.some(producto => producto.id === infoProducto.id);
        if (existe) {
            // Actualizamos la cantidad
            articulosCarrito = articulosCarrito.map(producto => {
                if (producto.id === infoProducto.id) {
                    producto.cantidad++;
                    return producto;
                }
                return producto;
            });
        } else {
            // Agregamos el producto al carrito
            articulosCarrito = [...articulosCarrito, infoProducto];
        }

        carritoHTML();
    }

    function carritoHTML() {
        // Limpiar el HTML
        limpiarHTML();

        // Recorre el carrito y genera el HTML
        articulosCarrito.forEach(producto => {
            const { imagen, titulo, precio, cantidad, id } = producto;
            const row = document.createElement('tr');
            row.innerHTML = `
                <td><img src="${imagen}" width="50" alt="${titulo}"></td>
                <td>${titulo}</td>
                <td>${precio}</td>
                <td>${cantidad}</td>
                <td><a href="#" class="borrar-producto" data-id="${id}" aria-label="Eliminar producto">X</a></td>
            `;
            listaCarrito.appendChild(row);
        });

        // Mostrar total si hay productos
        if (articulosCarrito.length > 0) {
            const total = calcularTotal();
            const totalRow = document.createElement('tr');
            totalRow.innerHTML = `
                <td colspan="2"><strong>Total</strong></td>
                <td><strong>$${total.toFixed(2)}</strong></td>
                <td></td>
                <td></td>
            `;
            listaCarrito.appendChild(totalRow);
        }

        // Agregar al localStorage
        sincronizarStorage();
    }

    function calcularTotal() {
        return articulosCarrito.reduce((total, producto) => {
            return total + (producto.precioNumerico * producto.cantidad);
        }, 0);
    }

    function sincronizarStorage() {
        localStorage.setItem('carrito', JSON.stringify(articulosCarrito));
    }

    function limpiarHTML() {
        while (listaCarrito.firstChild) {
            listaCarrito.removeChild(listaCarrito.firstChild);
        }
    }

    function eliminarProducto(e) {
        e.preventDefault();
        if (e.target.classList.contains('borrar-producto')) {
            const productoId = e.target.getAttribute('data-id');
            
            // Eliminar del arreglo
            articulosCarrito = articulosCarrito.filter(producto => producto.id != productoId);
            
            // Actualizar HTML
            carritoHTML();
            
            // Mantener el carrito abierto
            cancelarTimeoutOcultar();
        }
    }

    function vaciarCarrito() {
        articulosCarrito = [];
        limpiarHTML();
        localStorage.removeItem('carrito');
        // Mantener el carrito abierto después de vaciar
        cancelarTimeoutOcultar();
    }
});