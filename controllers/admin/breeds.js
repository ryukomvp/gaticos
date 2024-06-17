// Constante para completar la ruta de la API.
const RAZAS_API = 'business/dashboard/breeds.php';
// Constante para establecer el formulario de buscar.
const F_BUSCADOR = document.getElementById('fbuscador');
// Constante para establecer el formulario de guardar.
const FORMULARIO = document.getElementById('formulario');
// Constante para establecer el título de la modal.
const TITULO_MODAL = document.getElementById('titulo');
// Constantes para establecer el contenido de la tabla.
const REGISTROS = document.getElementById('registros');
// Constante para capturar el modal.
const MODAL = new Modal(document.getElementById('modal'));
// Constante para el texto del boton
const BTN_ACCION = document.getElementById('accion');

// Método manejador de eventos para cuando el documento ha cargado.
document.addEventListener('DOMContentLoaded', () => {
    // Llamada a la función para llenar la tabla con los registros disponibles.
    cargarRegistros();
});

// Método manejador de eventos para cuando se envía el formulario de buscar.
F_BUSCADOR.addEventListener('submit', (event) => {
    // Se evita recargar la página web después de enviar el formulario.
    event.preventDefault();
    // Constante tipo objeto con los datos del formulario.
    const FORM = new FormData(F_BUSCADOR);
    // Llamada a la función para llenar la tabla con los resultados de la búsqueda.
    cargarRegistros(FORM);
});

// Método manejador de eventos para cuando se envía el formulario de guardar.
FORMULARIO.addEventListener('submit', async (event) => {
    // Se evita recargar la página web después de enviar el formulario.
    event.preventDefault();
    // Se verifica la acción a realizar.
    (document.getElementById('id').value) ? action = 'actualizar' : action = 'crear';
    // Constante tipo objeto con los datos del formulario.
    const FORM = new FormData(FORMULARIO);
    // Petición para guardar los datos del formulario.
    const DATA = await fetchData(RAZAS_API, action, FORM);
    // Se comprueba si la respuesta es satisfactoria, de lo contrario se muestra un mensaje con la excepción.
    if (DATA.status) {
        // Se carga nuevamente la tabla para visualizar los cambios.
        cargarRegistros();
        // Se cierra la caja de diálogo.
        MODAL.hide();
        // Se muestra un mensaje de éxito.
        sweetAlert(1, DATA.message, true);
    } else {
        sweetAlert(2, DATA.exception, false);
    }
});

/*
*   Función asíncrona para llenar la tabla con los registros disponibles.
*   Parámetros: form (objeto opcional con los datos de búsqueda).
*   Retorno: ninguno.
*/
async function cargarRegistros(form = null) {
        // Se inicializa el contenido de la tabla.
        REGISTROS.innerHTML = '';
        // Se verifica la acción a realizar.
        (form) ? action = 'buscar' : action = 'leerRegistros';
        // Petición para obtener los registros disponibles.
        const DATA = await dataFetch(RAZAS_API, action, form);
        // Se comprueba si la respuesta es satisfactoria, de lo contrario se muestra un mensaje con la excepción.
        if (DATA.status) {
            // Se recorre el conjunto de registros fila por fila.
            DATA.dataset.forEach(row => {
                // Se crean y concatenan las filas de la tabla con los datos de cada registro.
                REGISTROS.innerHTML += `
                    <tr class="hover:bg-[#313131]">
                        <!-- <td>${row.id_raza}</td> -->
                        <td class="p-4">${row.raza}</td>
                        <td class="p-4">${row.info}</td>
                        <td class="flex items-center">
                            <button onclick="actualizar(${row.id_raza})" class="text-[#333399] border border-[#333399] hover:text-[#EDEDED] hover:bg-[#333399] font-medium rounded-lg text-sm px-2.5 py-2.5 text-center m-2" type="button">
                                <svg class="w-[30px] h-[30px]" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 20">
                                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="M16 1v5h-5M2 19v-5h5m10-4a8 8 0 0 1-14.947 3.97M1 10a8 8 0 0 1 14.947-3.97"/>
                                </svg>
                            </button>
                            <button onclick="eliminar(${row.id_raza})" class="text-[#CA3E47] border border-[#CA3E47] hover:text-[#EDEDED] hover:bg-[#CA3E47] font-medium rounded-lg text-sm px-2.5 py-2.5 text-center m-2" type="button">
                                <svg class="w-[30px] h-[30px]" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 20">
                                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="M1 5h16M7 8v8m4-8v8M7 1h4a1 1 0 0 1 1 1v3H6V2a1 1 0 0 1 1-1ZM3 5h12v13a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V5Z"/>
                                </svg>
                            </button>
                        </td>
                    </tr>
                `;
            });
        } else {
            sweetAlert(4, DATA.exception, true);
        }
}

/*
*   Función para preparar el formulario al momento de insertar un registro.
*   Parámetros: ninguno.
*   Retorno: ninguno.
*/
function crear() {
    // Se abre la caja de diálogo que contiene el formulario.
    MODAL.show();
    // Se restauran los elementos del formulario.
    FORMULARIO.reset();
    // Se asigna título a la caja de diálogo.
    TITULO_MODAL.textContent = 'Registrar una raza';
    // Se asigna texto al botón de acción.
    BTN_ACCION.textContent = 'Añadir';
}

/*
*   Función asíncrona para preparar el formulario al momento de actualizar un registro.
*   Parámetros: id (identificador del registro seleccionado).
*   Retorno: ninguno.
*/
async function actualizar(id) {
    // Se define una constante tipo objeto con los datos del registro seleccionado.
    const FORM = new FormData();
    FORM.append('id', id);
    // Petición para obtener los datos del registro solicitado.
    const DATA = await fetchData(RAZAS_API, 'leerUnRegistro', FORM);
    // Se comprueba si la respuesta es satisfactoria, de lo contrario se muestra un mensaje con la excepción.
    if (DATA.status) {
        // Se abre la caja de diálogo que contiene el formulario.
        MODAL.show();
        // Se restauran los elementos del formulario.
        FORMULARIO.reset();
        // Se asigna título para la caja de diálogo.
        TITULO_MODAL.textContent = 'Actualizar raza';
        // Se asigna texto al botón de acción.
        BTN_ACCION.textContent = 'Actualizar';
        // Se inicializan los campos del formulario.
        document.getElementById('id').value = DATA.dataset.id_raza;
        document.getElementById('raza').value = DATA.dataset.raza;
        document.getElementById('info').value = DATA.dataset.info;
    } else {
        sweetAlert(2, DATA.exception, false);
    }
}

/*
*   Función asíncrona para eliminar un registro.
*   Parámetros: id (identificador del registro seleccionado).
*   Retorno: ninguno.
*/
async function eliminar(id) {
    // Llamada a la función para mostrar un mensaje de confirmación, capturando la respuesta en una constante.
    const RESPONSE = await confirmAction('¿Desea eliminar la raza de forma permanente?');
    // Se verifica la respuesta del mensaje.
    if (RESPONSE) {
        // Se define una constante tipo objeto con los datos del registro seleccionado.
        const FORM = new FormData();
        FORM.append('id_raza', id);
        // Petición para eliminar el registro seleccionado.
        const DATA = await fetchData(RAZAS_API, 'eliminar', FORM);
        // Se comprueba si la respuesta es satisfactoria, de lo contrario se muestra un mensaje con la excepción.
        if (DATA.status) {
            // Se carga nuevamente la tabla para visualizar los cambios.
            cargarRegistros();
            // Se muestra un mensaje de éxito.
            sweetAlert(1, DATA.message, true);
        } else {
            sweetAlert(2, DATA.exception, false);
        }
    }
}