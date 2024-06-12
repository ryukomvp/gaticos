// Constante para completar la ruta de la API.
const RAZAS_API = 'business/dashboard/breeds.php';

// Método manejador de eventos para cuando el documento ha cargado.
document.addEventListener('DOMContentLoaded', () => {
    // Llamada a la función para llenar la tabla con los registros disponibles.
    fillSelect(RAZAS_API, 'leerRegistros', 'raza');
});