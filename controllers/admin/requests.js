// Constante para completar la ruta de la API.
const SOLICITUDES_API = 'business/dashboard/requests.php';
// Constante para establecer el formulario de buscar.
const F_BUSCADOR = document.getElementById('fbuscador');
// Constantes para establecer el contenido de la tabla.
const REGISTROS = document.getElementById('registros');

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
        const DATA = await dataFetch(SOLICITUDES_API, action, form);
        // Se comprueba si la respuesta es satisfactoria, de lo contrario se muestra un mensaje con la excepción.
        if (DATA.status) {
            // Se recorre el conjunto de registros fila por fila.
            DATA.dataset.forEach(row => {
                // Se crean y concatenan las filas de la tabla con los datos de cada registro.
                REGISTROS.innerHTML += `
                    <tr class="hover:bg-[#313131]">
                        <!-- <td>${row.id_solicitud}</td> -->
                        <td class="px-6">${row.nombre}</td>
                        <td class="px-6">${row.edad}</td>
                        <td class="px-6">${row.raza}</td>
                        <td class="px-6">${row.correo_responsable}</td>
                        <td class="px-6">${row.estado_solicitud}</td>
                        <td class="flex items-center px-6">
                            <button onclick="aprobar(${row.id_solicitud})" class="text-[#333399] border border-[#333399] hover:text-[#EDEDED] hover:bg-[#333399] font-medium rounded-lg text-sm px-2.5 py-2.5 text-center m-2" type="button">
                                <svg class="w-[30px] h-[30px]" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="M8.5 11.5 11 14l4-4m6 2a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"/>
                                  </svg>                                  
                            </button>
                            <button onclick="rechazar(${row.id_solicitud})" class="text-[#CA3E47] border border-[#CA3E47] hover:text-[#EDEDED] hover:bg-[#CA3E47] font-medium rounded-lg text-sm px-2.5 py-2.5 text-center m-2" type="button">
                                <svg class="w-[30px] h-[30px]" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                                    <path stroke="currentColor" stroke-linecap="round" stroke-width="1" d="m6 6 12 12m3-6a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"/>
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
*   Función asíncrona para aprobar una solicitud.
*   Parámetros: id (identificador del registro seleccionado).
*   Retorno: ninguno.
*/
async function aprobar(id) {
    // Llamada a la función para mostrar un mensaje de confirmación, capturando la respuesta en una constante.
    const RESPONSE = await confirmAction('¿Desea aprobar la solicitud seleccionada?');
    // Se verifica la respuesta del mensaje.
    if (RESPONSE) {
        // Se define una constante tipo objeto con los datos del registro seleccionado.
        const FORM = new FormData();
        FORM.append('id_solicitud', id);
        // Petición para eliminar el registro seleccionado.
        const DATA = await dataFetch(SOLICITUDES_API, 'aprobar', FORM);
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

/*
*   Función asíncrona para rechazar una solicitud.
*   Parámetros: id (identificador del registro seleccionado).
*   Retorno: ninguno.
*/
async function rechazar(id) {
    // Llamada a la función para mostrar un mensaje de confirmación, capturando la respuesta en una constante.
    const RESPONSE = await confirmAction('¿Desea rechazar la solicitud seleccionada?');
    // Se verifica la respuesta del mensaje.
    if (RESPONSE) {
        // Se define una constante tipo objeto con los datos del registro seleccionado.
        const FORM = new FormData();
        FORM.append('id_solicitud', id);
        // Petición para eliminar el registro seleccionado.
        const DATA = await dataFetch(SOLICITUDES_API, 'rechazar', FORM);
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