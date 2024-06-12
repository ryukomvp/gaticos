// Constante para completar la ruta de la API.
const RAZAS_API = 'business/dashboard/breeds.php';
// Constante para establecer el formulario de buscar.
const SEARCH_FORM = document.getElementById('fbuscador');
// Constante para establecer el formulario de guardar.
// const SAVE_FORM = document.getElementById('save-form');

// Constante para establecer el título de la modal.
// const MODAL_TITLE = document.getElementById('modal-title');

// Constantes para establecer el contenido de la tabla.
const TBODY_ROWS = document.getElementById('registros');

// Método manejador de eventos para cuando el documento ha cargado.
document.addEventListener('DOMContentLoaded', () => {
    // Llamada a la función para llenar la tabla con los registros disponibles.
    fillTable();
});

// Método manejador de eventos para cuando se envía el formulario de buscar.
SEARCH_FORM.addEventListener('submit', (event) => {
    // Se evita recargar la página web después de enviar el formulario.
    event.preventDefault();
    // Constante tipo objeto con los datos del formulario.
    const FORM = new FormData(SEARCH_FORM);
    // Llamada a la función para llenar la tabla con los resultados de la búsqueda.
    fillTable(FORM);
});

// Método manejador de eventos para cuando se envía el formulario de guardar.
// SAVE_FORM.addEventListener('submit', async (event) => {
//     // Se evita recargar la página web después de enviar el formulario.
//     event.preventDefault();
//     // Se verifica la acción a realizar.
//     (document.getElementById('id').value) ? action = 'update' : action = 'create';
//     // Constante tipo objeto con los datos del formulario.
//     const FORM = new FormData(SAVE_FORM);
//     // Petición para guardar los datos del formulario.
//     const DATA = await fetchData(CATEGORIA_API, action, FORM);
//     // Se comprueba si la respuesta es satisfactoria, de lo contrario se muestra un mensaje con la excepción.
//     if (DATA.status) {
//         // Se carga nuevamente la tabla para visualizar los cambios.
//         fillTable();
//         // Se cierra la caja de diálogo.
//         SAVE_MODAL.close();
//         // Se muestra un mensaje de éxito.
//         sweetAlert(1, DATA.message, true);
//     } else {
//         sweetAlert(2, DATA.exception, false);
//     }
// });

/*
*   Función asíncrona para llenar la tabla con los registros disponibles.
*   Parámetros: form (objeto opcional con los datos de búsqueda).
*   Retorno: ninguno.
*/
async function fillTable(form = null) {
        // Se inicializa el contenido de la tabla.
        TBODY_ROWS.innerHTML = '';
        // Se verifica la acción a realizar.
        (form) ? action = 'search' : action = 'readAll';
        // Petición para obtener los registros disponibles.
        const JSON = await dataFetch(RAZAS_API, action, form);
        // Se comprueba si la respuesta es satisfactoria, de lo contrario se muestra un mensaje con la excepción.
        if (JSON.status) {
            // Se recorre el conjunto de registros fila por fila.
            JSON.dataset.forEach(row => {
                // Se crean y concatenan las filas de la tabla con los datos de cada registro.
                TBODY_ROWS.innerHTML += `
                    <tr class="hover:bg-[#313131]">
                        <td>${row.id_raza}</td>
                        <td>${row.raza}</td>
                        <td>${row.info}</td>
                        <td>
                            <button class="text-[#333399] border border-[#333399] hover:text-[#EDEDED] hover:bg-[#333399] font-medium rounded-lg text-sm px-5 py-2.5 text-center m-2" type="button">
                                <svg class="w-[30px] h-[30px]" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 20">
                                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="M16 1v5h-5M2 19v-5h5m10-4a8 8 0 0 1-14.947 3.97M1 10a8 8 0 0 1 14.947-3.97"/>
                                </svg>
                            </button>
                        </td>
                    </tr>
                `;
            });
        } else {
            sweetAlert(4, JSON.exception, true);
        }
}

/*
*   Función para preparar el formulario al momento de insertar un registro.
*   Parámetros: ninguno.
*   Retorno: ninguno.
*/
// function openCreate() {
//     // Se abre la caja de diálogo que contiene el formulario.
//     SAVE_MODAL.open();
//     // Se restauran los elementos del formulario.
//     SAVE_FORM.reset();
//     // Se asigna título a la caja de diálogo.
//     MODAL_TITLE.textContent = 'Crear categoría';
//     // Se establece el campo de archivo como obligatorio.
//     document.getElementById('archivo').required = true;
// }

/*
*   Función asíncrona para preparar el formulario al momento de actualizar un registro.
*   Parámetros: id (identificador del registro seleccionado).
*   Retorno: ninguno.
*/
// async function openUpdate(id) {
//     // Se define una constante tipo objeto con los datos del registro seleccionado.
//     const FORM = new FormData();
//     FORM.append('id_categoria', id);
//     // Petición para obtener los datos del registro solicitado.
//     const DATA = await fetchData(CATEGORIA_API, 'readOne', FORM);
//     // Se comprueba si la respuesta es satisfactoria, de lo contrario se muestra un mensaje con la excepción.
//     if (DATA.status) {
//         // Se abre la caja de diálogo que contiene el formulario.
//         SAVE_MODAL.open();
//         // Se restauran los elementos del formulario.
//         SAVE_FORM.reset();
//         // Se asigna título para la caja de diálogo.
//         MODAL_TITLE.textContent = 'Actualizar categoría';
//         // Se establece el campo de archivo como opcional.
//         document.getElementById('archivo').required = false;
//         // Se inicializan los campos del formulario.
//         document.getElementById('id').value = DATA.dataset.id_categoria;
//         document.getElementById('nombre').value = DATA.dataset.nombre_categoria;
//         document.getElementById('descripcion').value = DATA.dataset.descripcion_categoria;
//         // Se actualizan los campos para que las etiquetas (labels) no queden sobre los datos.
//         M.updateTextFields();
//     } else {
//         sweetAlert(2, DATA.exception, false);
//     }
// }

/*
*   Función asíncrona para eliminar un registro.
*   Parámetros: id (identificador del registro seleccionado).
*   Retorno: ninguno.
*/
// async function openDelete(id) {
//     // Llamada a la función para mostrar un mensaje de confirmación, capturando la respuesta en una constante.
//     const RESPONSE = await confirmAction('¿Desea eliminar la categoría de forma permanente?');
//     // Se verifica la respuesta del mensaje.
//     if (RESPONSE) {
//         // Se define una constante tipo objeto con los datos del registro seleccionado.
//         const FORM = new FormData();
//         FORM.append('id_categoria', id);
//         // Petición para eliminar el registro seleccionado.
//         const DATA = await fetchData(CATEGORIA_API, 'delete', FORM);
//         // Se comprueba si la respuesta es satisfactoria, de lo contrario se muestra un mensaje con la excepción.
//         if (DATA.status) {
//             // Se carga nuevamente la tabla para visualizar los cambios.
//             fillTable();
//             // Se muestra un mensaje de éxito.
//             sweetAlert(1, DATA.message, true);
//         } else {
//             sweetAlert(2, DATA.exception, false);
//         }
//     }
// }