// Variables
// const carrito = document.querySelector('#carrito');
// const contenedorCarrito = document.querySelector('#lista-carrito tbody');
// const vaciarCarritoBtn = document.querySelector('#vaciar-carrito');
// const listaCursos = document.querySelector('#lista-cursos');
// let articulosCarrito = [];

// // Cargar Event Listeners
// cargarEventListeners();
// function cargarEventListeners() {
//     // Agregar curso al carrito cuando se presiona "Agregar al carrito"
//     listaCursos.addEventListener('click', agregarCurso);

//     // Cargar carrito desde LocalStorage al cargar el documento
//     document.addEventListener('DOMContentLoaded', () => {
//         articulosCarrito = JSON.parse(localStorage.getItem('carrito')) || [];
//         carritoHTML();
//     });

//     // Vaciar carrito
//     vaciarCarritoBtn.addEventListener('click', () => {
//         articulosCarrito = [];
//         limpiarHTML();
//         sincronizarStorage();
//     });


// // Eliminar un curso del carrito
// carrito.addEventListener('click', eliminarCurso);


// }




// function eliminarCurso(e) {
//     if (e.target.classList.contains('borrar-curso')) {
//         const cursoId = e.target.getAttribute('data-id');

//         // Eliminar del array por ID
//         articulosCarrito = articulosCarrito.filter(curso => curso.id !== cursoId);

//         carritoHTML(); // Volver a renderizar el HTML
//     }
// }





// // Función para agregar un curso al carrito
// function agregarCurso(e) {
//     e.preventDefault();
//     if (e.target.classList.contains('agregar-carrito')) {
//         const cursoSeleccionado = e.target.parentElement.parentElement;
//         leerDatosCurso(cursoSeleccionado);
//     }
// }

// // Leer datos del curso seleccionado
// function leerDatosCurso(curso) {
//     const infoCurso = {
//         imagen: curso.querySelector('img').src,
//         titulo: curso.querySelector('h4').textContent,
//         precio: curso.querySelector('.precio span').textContent,
//         id: curso.querySelector('a').getAttribute('data-id'),
//         cantidad: 1
//     };

//     // Verificar si el curso ya existe en el carrito
//     const existe = articulosCarrito.some(curso => curso.id === infoCurso.id);
//     if (existe) {
//         // Actualizar la cantidad
//         const cursos = articulosCarrito.map(curso => {
//             if (curso.id === infoCurso.id) {
//                 curso.cantidad++;
//                 return curso;
//             } else {
//                 return curso;
//             }
//         });
//         articulosCarrito = [...cursos];
//     } else {
//         // Agregar el curso al carrito
//         articulosCarrito = [...articulosCarrito, infoCurso];
//     }

//     carritoHTML();
// }

// // Mostrar carrito en HTML
// function carritoHTML() {
//     // Limpiar el HTML previo
//     limpiarHTML();

//     // Recorrer el carrito y generar el HTML
//     articulosCarrito.forEach(curso => {
//         const row = document.createElement('tr');
//         row.innerHTML = `
//             <td><img src="${curso.imagen}" width="100"></td>
//             <td>${curso.titulo}</td>
//             <td>${curso.precio}</td>
//             <td>${curso.cantidad}</td>
//             <td>
//                 <a href="#" class="borrar-curso" data-id="${curso.id}">X</a>
//             </td>
//         `;
//         contenedorCarrito.appendChild(row);
//     });

//     // Sincronizar el carrito con LocalStorage
//     sincronizarStorage();
// }

// // Sincronizar carrito con LocalStorage
// function sincronizarStorage() {
//     localStorage.setItem('carrito', JSON.stringify(articulosCarrito));
// }

// // Limpiar el contenido del tbody
// function limpiarHTML() {
//     while (contenedorCarrito.firstChild) {
//         contenedorCarrito.removeChild(contenedorCarrito.firstChild);
//     }
// }

// carrito.js

// carrito.js

// document.addEventListener('DOMContentLoaded', function() {
//     // Variables
//     const carrito = document.getElementById('carrito');
//     const listaCarrito = document.querySelector('#lista-carrito tbody');
//     const vaciarCarritoBtn = document.getElementById('vaciar-carrito');
//     const listaProductos = document.querySelector('.container-products');
//     const cartIcon = document.querySelector('.cart-icon');
//     let articulosCarrito = [];
//     let carritoTimeout;

//     // Event Listeners
//     cargarEventListeners();

//     function cargarEventListeners() {
//         // Mostrar carrito al pasar el mouse sobre el icono
//         cartIcon.addEventListener('mouseenter', mostrarCarrito);
        
//         // Ocultar carrito al salir del icono o del carrito
//         cartIcon.addEventListener('mouseleave', iniciarTimeoutOcultar);
//         carrito.addEventListener('mouseleave', iniciarTimeoutOcultar);
        
//         // Cancelar ocultar si el mouse vuelve al icono o carrito
//         carrito.addEventListener('mouseenter', cancelarTimeoutOcultar);
//         cartIcon.addEventListener('mouseenter', cancelarTimeoutOcultar);

//         // Agregar producto al carrito
//         listaProductos.addEventListener('click', agregarProducto);

//         // Eliminar producto del carrito
//         carrito.addEventListener('click', eliminarProducto);

//         // Vaciar el carrito
//         vaciarCarritoBtn.addEventListener('click', vaciarCarrito);

//         // Cargar carrito del localStorage al iniciar
//         cargarCarrito();
//     }

//     // Funciones para mostrar/ocultar carrito
//     function mostrarCarrito() {
//         clearTimeout(carritoTimeout);
//         carrito.style.display = 'block';
//     }

//     function iniciarTimeoutOcultar() {
//         carritoTimeout = setTimeout(() => {
//             carrito.style.display = 'none';
//         }, 300); // 300ms de delay antes de ocultar
//     }

//     function cancelarTimeoutOcultar() {
//         clearTimeout(carritoTimeout);
//     }

//     // Funciones del carrito
//     function cargarCarrito() {
//         articulosCarrito = JSON.parse(localStorage.getItem('carrito')) || [];
//         carritoHTML();
//     }

//     function agregarProducto(e) {
//         e.preventDefault();
//         if (e.target.classList.contains('agregar-carrito')) {
//             const productoSeleccionado = e.target.parentElement.parentElement;
//             leerDatosProducto(productoSeleccionado);
            

//         }
//     }


//     function leerDatosProducto(producto) {
//         const precioTexto = producto.querySelector('.precio').firstChild.textContent;
//         const precioNumerico = parseFloat(precioTexto.replace(/[^0-9.-]+/g,""));
        
//         const infoProducto = {
//             imagen: producto.querySelector('img').src,
//             titulo: producto.querySelector('h4').textContent,
//             precio: precioTexto.trim(),
//             precioNumerico: precioNumerico,
//             id: producto.querySelector('button').getAttribute('data-id') || Date.now(),
//             cantidad: 1
//         };

//         // Revisar si el producto ya existe en el carrito
//         const existe = articulosCarrito.some(producto => producto.id === infoProducto.id);
//         if (existe) {
//             // Actualizamos la cantidad
//             articulosCarrito = articulosCarrito.map(producto => {
//                 if (producto.id === infoProducto.id) {
//                     producto.cantidad++;
//                     return producto;
//                 }
//                 return producto;
//             });
//         } else {
//             // Agregamos el producto al carrito
//             articulosCarrito = [...articulosCarrito, infoProducto];
//         }

//         carritoHTML();
//     }

//     function carritoHTML() {
//         // Limpiar el HTML
//         limpiarHTML();

//         // Recorre el carrito y genera el HTML
//         articulosCarrito.forEach(producto => {
//             const { imagen, titulo, precio, cantidad, id } = producto;
//             const row = document.createElement('tr');
//             row.innerHTML = `
//                 <td><img src="${imagen}" width="50" alt="${titulo}"></td>
//                 <td>${titulo}</td>
//                 <td>${precio}</td>
//                 <td>${cantidad}</td>
//                 <td><a href="#" class="borrar-producto" data-id="${id}" aria-label="Eliminar producto">X</a></td>
//             `;
//             listaCarrito.appendChild(row);
//         });

//         // Mostrar total si hay productos
//         if (articulosCarrito.length > 0) {
//             const total = calcularTotal();
//             const totalRow = document.createElement('tr');
//             totalRow.innerHTML = `
//                 <td colspan="2"><strong>Total</strong></td>
//                 <td><strong>$${total.toFixed(2)}</strong></td>
//                 <td></td>
//                 <td></td>
//             `;
//             listaCarrito.appendChild(totalRow);
//         }

//         // Agregar al localStorage
//         sincronizarStorage();
//     }

//     function calcularTotal() {
//         return articulosCarrito.reduce((total, producto) => {
//             return total + (producto.precioNumerico * producto.cantidad);
//         }, 0);
//     }

//     function sincronizarStorage() {
//         localStorage.setItem('carrito', JSON.stringify(articulosCarrito));
//     }

//     function limpiarHTML() {
//         while (listaCarrito.firstChild) {
//             listaCarrito.removeChild(listaCarrito.firstChild);
//         }
//     }

//     function eliminarProducto(e) {
//         e.preventDefault();
//         if (e.target.classList.contains('borrar-producto')) {
//             const productoId = e.target.getAttribute('data-id');
            
//             // Eliminar del arreglo
//             articulosCarrito = articulosCarrito.filter(producto => producto.id != productoId);
            
//             // Actualizar HTML
//             carritoHTML();
            
//             // Mantener el carrito abierto
//             cancelarTimeoutOcultar();
//         }
//     }

//     function vaciarCarrito() {
//         articulosCarrito = [];
//         limpiarHTML();
//         localStorage.removeItem('carrito');
//         // Mantener el carrito abierto después de vaciar
//         cancelarTimeoutOcultar();
//     }
// });document.addEventListener('DOMContentLoaded', function() {


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
        // Mostrar carrito al pasar el mouse sobre el icono
        cartIcon.addEventListener('mouseenter', mostrarCarrito);
        
        // Ocultar carrito al salir del icono o del carrito
        cartIcon.addEventListener('mouseleave', iniciarTimeoutOcultar);
        carrito.addEventListener('mouseleave', iniciarTimeoutOcultar);
        
        // Cancelar ocultar si el mouse vuelve al icono o carrito
        carrito.addEventListener('mouseenter', cancelarTimeoutOcultar);
        cartIcon.addEventListener('mouseenter', cancelarTimeoutOcultar);

        // Agregar producto al carrito
        document.addEventListener('click', function(e) {
            if (e.target.classList.contains('agregar-carrito')) {
                e.preventDefault();
                agregarProductoAlCarrito();
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

    function agregarProductoAlCarrito() {
        const productoInfo = {
            imagen: document.querySelector('.product-image img').src,
            titulo: document.querySelector('.product-title').textContent,
            precio: document.querySelector('.product-price').textContent.trim(),
            precioNumerico: parseFloat(document.querySelector('.product-price').textContent.replace(/[^0-9.-]+/g,"")),
            id: Date.now(), // Usamos timestamp como ID único
            cantidad: 1
        };

        // Revisar si el producto ya existe en el carrito
        const existe = articulosCarrito.some(producto => producto.titulo === productoInfo.titulo);
        if (existe) {
            // Actualizamos la cantidad
            articulosCarrito = articulosCarrito.map(producto => {
                if (producto.titulo === productoInfo.titulo) {
                    producto.cantidad++;
                    return producto;
                }
                return producto;
            });
        } else {
            // Agregamos el producto al carrito
            articulosCarrito = [...articulosCarrito, productoInfo];
        }

        carritoHTML();
        
        // Mostrar notificación
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