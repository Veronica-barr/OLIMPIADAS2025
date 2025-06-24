document.addEventListener('DOMContentLoaded', function() {
    // Variables
    const carrito = document.getElementById('carrito');
    const listaCarrito = document.querySelector('#lista-carrito tbody');
    const vaciarCarritoBtn = document.getElementById('vaciar-carrito');
    const cartIcon = document.querySelector('.cart-icon');
    let articulosCarrito = [];
    let carritoTimeout;

    // Event Listeners
    cargarEventListeners();

    function cargarEventListeners() {
        // Mostrar/ocultar carrito
        cartIcon.addEventListener('mouseenter', mostrarCarrito);
        cartIcon.addEventListener('mouseleave', iniciarTimeoutOcultar);
        carrito.addEventListener('mouseleave', iniciarTimeoutOcultar);
        carrito.addEventListener('mouseenter', cancelarTimeoutOcultar);
        
        // Agregar producto al carrito
        document.addEventListener('click', function(e) {
            if (e.target.classList.contains('agregar-carrito')) {
                e.preventDefault();
                const producto = e.target.closest('.card-product');
                leerDatosProducto(producto);
            }
        });

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
        }, 300);
    }

    function cancelarTimeoutOcultar() {
        clearTimeout(carritoTimeout);
    }

    // Funciones del carrito
    function cargarCarrito() {
        articulosCarrito = JSON.parse(localStorage.getItem('carrito')) || [];
        carritoHTML();
    }

    function leerDatosProducto(producto) {
        const infoProducto = {
            imagen: producto.querySelector('img').src,
            titulo: producto.querySelector('h4').textContent,
            precio: producto.querySelector('.precio').lastChild.textContent.trim(),
            precioNumerico: parseFloat(producto.querySelector('.precio').lastChild.textContent.replace(/[^0-9.-]+/g,"")),
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
        mostrarNotificacion('Producto agregado al carrito');
    }

    function mostrarNotificacion(mensaje) {
        const notificacion = document.createElement('div');
        notificacion.classList.add('notificacion');
        notificacion.textContent = mensaje;
        document.body.appendChild(notificacion);
        
        setTimeout(() => {
            notificacion.classList.add('mostrar');
        }, 10);
        
        setTimeout(() => {
            notificacion.classList.remove('mostrar');
            setTimeout(() => {
                document.body.removeChild(notificacion);
            }, 300);
        }, 2000);
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
                <td><strong>$${total.toLocaleString('es-AR')}</strong></td>
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