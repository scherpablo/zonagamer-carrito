// VARIABLES
const carrito = document.querySelector('#carrito');
const contenedorCarrito = document.querySelector('#lista-carrito tbody');
const vaciarCarritoBtn = document.querySelector('#vaciar-carrito');
const listaCursos = document.querySelector('#lista-cursos');
let articulosCarrito = []; //Se va llenando a medida que vamos agregando elemetos al carrito


cargarEventListeners();
function cargarEventListeners() {
    //Cuando Agregas un Curso presionando "Agregar al Carrito"
    listaCursos.addEventListener('click', agregarCurso);

    //Elimana datos del Carrito
    carrito.addEventListener('click', eliminarCurso);
    
    //Vaciar Carrito
    vaciarCarritoBtn.addEventListener('click', () => {
        articulosCarrito = []; //Reseteamos el arreglo

        limpiarHTML(); //Eliminamos todo el HTML
    });
}


// FUNCIONES
function agregarCurso(e) { 
    e.preventDefault(); //Prevenimos el comportamiento por defecto del boton agregar carrito
    if (e.target.classList.contains('agregar-carrito')) { //Si el lemento contiene la clase agregar-carrito se agrega el curso
        const cursoSeleccionado = e.target.parentElement.parentElement; //Accedemos a todo el DIV que tiene el contenido del curso
        leerDatosCurso(cursoSeleccionado);
    }    
}

// Elimina un elemento del carrito
function eliminarCurso(e) {
    if (e.target.classList.contains('borar-curso'));
    const cursoId = e.target.getAttribute('data-id'); 
    // Eliinar del arreglo de articulosCarrito por el data-id
    // articulosCarrito = articulosCarrito.filter(curso => curso.id !== cursoId)
    articulosCarrito = articulosCarrito.filter(curso => { 
        if (curso.id === cursoId) {
            if (curso.cantidad > 1) {
                curso.cantidad--;
                return curso; //Retorna el objeto actualizado
            } else {
                delete curso; //Elimina un objeto de la cantidad total
            }
        } else { 
            return curso;//Retorna el objeto original
        }
    })

    carritoHTML(); //Volvemos a iterar sobre el carrito y mostramos su HTML 
}



// LEE EL CONTENIDO DEL HTML QUE LE DIMOS CLICK Y EXTRAE LA INFO DEL CURSO
function leerDatosCurso(curso) {
    
    // Crear un objeto con el contenido del curso actual
    const infoCurso = {
        imagen: curso.querySelector('img').src,
        titulo: curso.querySelector('h4').textContent,
        autor: curso.querySelector('p').textContent,
        precio: curso.querySelector('.precio span').textContent,
        id: curso.querySelector('a').getAttribute('data-id'),
        cantidad: 1
    }

    // Revisa si un elemento ya existe en el carrito
    const existe = articulosCarrito.some(curso => curso.id === infoCurso.id);
    if (existe) {
        //Actualizamos la Cantidad
        const cursos = articulosCarrito.map(curso => {
            if (curso.id === infoCurso.id) {
                curso.cantidad++;
                return curso; //Retorna el objeto actualizado
            } else {
                return curso; //Retorna los objetos que no son los duplicados
            }
        });
        articulosCarrito = [...cursos];
    } else { 
        //Agrega Elementos al Array del Carrito de Compras (utilizamos Spred Operator)
    articulosCarrito = [...articulosCarrito, infoCurso];
    }
    
    carritoHTML();
}

// Muestra la Info del Curso en el HTML del Carrito de Compras
function carritoHTML() {

    // Limpiar el HTML del Carrito de Compras
    limpiarHTML();

    // Recorre del Carrito y genera el HTML 
    articulosCarrito.forEach(curso => {
        const { imagen, titulo, precio, cantidad, id } = curso;
        const row = document.createElement('tr');//Creamos un Table Row que es lo que se requiere dentro de un Table Body
        row.innerHTML = `
            <td> <img src= '${imagen}' width='100'> </td>               
            <td> ${titulo} </td>
            <td> ${precio} </td>
            <td> ${cantidad} </td>
            <td> <a href="#" class="borrar-curso" data-id="${id}"> X </a> </td>
        `; //Utilizamos Template String

        // Agrega el HTML del Carrito en el Table Body
        contenedorCarrito.appendChild(row);        
    })
}

// Elimina los Cursos del Table Body
function limpiarHTML() {
    // Forma lenta de limpiar el HTML
    // tableBody.innerHTML = '';

    // Forma más rápida de limpiar el HTML
    while (contenedorCarrito.firstChild) { 
        contenedorCarrito.removeChild(contenedorCarrito.firstChild);
    }    
}


