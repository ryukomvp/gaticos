// Constante para completar la ruta de la API.
const SOLICITUDES_API = 'business/public/request.php';
const RAZAS_API = 'business/dashboard/breeds.php';
// Constante para establecer el formulario de guardar.
const FORMULARIO = document.getElementById('formulario');

// Método manejador de eventos para cuando el documento ha cargado.
document.addEventListener('DOMContentLoaded', () => {
    // Llamada a la función para llenar la tabla con los registros disponibles.
    fillSelect(RAZAS_API, 'leerRegistros', 'raza');
});

// Método manejador de eventos para cuando se envía el formulario de guardar.
FORMULARIO.addEventListener('submit', async (event) => {
    // Se evita recargar la página web después de enviar el formulario.
    event.preventDefault();
    // Constante tipo objeto con los datos del formulario.
    const FORM = new FormData(FORMULARIO);
    // Petición para guardar los datos del formulario.
    const DATA = await fetchData(SOLICITUDES_API, 'crear', FORM);
    // Se comprueba si la respuesta es satisfactoria, de lo contrario se muestra un mensaje con la excepción.
    if (DATA.status) {
        // Se muestra un mensaje de éxito.
        sweetAlert(1, DATA.message, true, 'index.html');
    } else {
        sweetAlert(2, DATA.exception, false);
    }
});