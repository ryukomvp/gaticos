<?php
// Se incluye la clase para la transferencia y acceso a datos.
require_once('../../entities/dto/breeds.php');

// Se comprueba si existe una acción a realizar, de lo contrario se finaliza el script con un mensaje de error.
if (isset($_GET['action'])) {
    // Se crea una sesión o se reanuda la actual para poder utilizar variables de sesión en el script.
    session_start();
    // Se instancia la clase correspondiente.
    $razas = new Razas;
    // Se declara e inicializa un arreglo para guardar el resultado que retorna la API.
    $result = array('status' => 0, 'message' => null, 'exception' => null, 'dataset' => null);
    switch ($_GET['action']) {
        case 'leerRegistros':
            if ($result['dataset'] = $razas->leerRegistros()) {
                $result['status'] = 1;
            } elseif (Database::getException()) {
                $result['exception'] = Database::getException();
            } else {
                $result['exception'] = 'No hay datos registrados';
            }
            break;
        case 'buscar':
            $_POST = Validator::validateForm($_POST);
            if ($_POST['buscador'] == '') {
                $result['dataset'] = $razas->leerRegistros();
                $result['status'] = 1;
            } elseif ($result['dataset'] = $razas->buscar($_POST['buscador'])) {
                $result['status'] = 1;
            } elseif (Database::getException()) {
                $result['exception'] = Database::getException();
            } else {
                $result['exception'] = 'No hay coincidencias';
            }
            break;
        case 'crear':
            $_POST = Validator::validateForm($_POST);
            if (!$razas->setRaza($_POST['raza'])) {
                $result['exception'] = 'Nombre incorrecto';
            } elseif (!$razas->setInfo($_POST['info'])) {
                $result['exception'] = 'Descripción incorrecta';
            } elseif ($razas->crear()) {
                $result['status'] = 1;
                $result['message'] = 'Raza ingresada correctamente';
            } else {
                $result['exception'] = Database::getException();
            }
            break;
        case 'leerUnRegistro':
            if (!$razas->setId($_POST['id_raza'])) {
                $result['exception'] = 'Raza incorrecta';
            } elseif ($result['dataset'] = $razas->leerUnRegistro()) {
                $result['status'] = 1;
            } elseif (Database::getException()) {
                $result['exception'] = Database::getException();
            } else {
                $result['exception'] = 'Raza inexistente';
            }
            break;
        case 'actualizar':
            $_POST = Validator::validateForm($_POST);
            if (!$razas->setId($_POST['id'])) {
                $result['exception'] = 'Raza incorrecta';
            } elseif (!$data = $razas->leerUnRegistro()) {
                $result['exception'] = 'Raza inexistente';
            } elseif (!$razas->setRaza($_POST['raza'])) {
                $result['exception'] = 'Nombre incorrecto';
            } elseif (!$razas->setInfo($_POST['info'])) {
                $result['exception'] = 'Descripción incorrecta';
            } elseif ($razas->actualizar()) {
                $result['status'] = 1;
                $result['message'] = 'Raza modificada correctamente';
            } else {
                $result['exception'] = Database::getException();
            }
            break;
        case 'eliminar':
            if (!$razas->setId($_POST['id_raza'])) {
                $result['exception'] = 'Raza incorrecta';
            } elseif (!$data = $razas->leerUnRegistro()) {
                $result['exception'] = 'Raza inexistente';
            } elseif ($razas->eliminar()) {
                $result['status'] = 1;
                $result['message'] = 'Raza eliminada correctamente';
            } else {
                $result['exception'] = Database::getException();
            }
            break;
        default:
            $result['exception'] = 'Acción no disponible dentro de la sesión';
    }
    // Se indica el tipo de contenido a mostrar y su respectivo conjunto de caracteres.
    header('content-type: application/json; charset=utf-8');
    // Se imprime el resultado en formato JSON y se retorna al controlador.
    print(json_encode($result));
} else {
    print(json_encode('Recurso no disponible'));
}
