<?php
// Se incluye la clase para la transferencia y acceso a datos.
require_once('../../entities/dto/requests.php');

// Se comprueba si existe una acción a realizar, de lo contrario se finaliza el script con un mensaje de error.
if (isset($_GET['action'])) {
    // Se crea una sesión o se reanuda la actual para poder utilizar variables de sesión en el script.
    session_start();
    // Se instancia la clase correspondiente.
    $solicitudes = new Solicitudes;
    // Se declara e inicializa un arreglo para guardar el resultado que retorna la API.
    $result = array('status' => 0, 'message' => null, 'exception' => null, 'dataset' => null);
    switch ($_GET['action']) {
        case 'leerRegistros':
            if ($result['dataset'] = $solicitudes->leerRegistros()) {
                $result['status'] = 1;
            } elseif (Database::getException()) {
                $result['exception'] = Database::getException();
            } else {
                $result['exception'] = 'No hay datos registrados';
            }
            break;
            // case 'buscar':
            //     $_POST = Validator::validateForm($_POST);
            //     if ($_POST['buscador'] == '') {
            //         $result['dataset'] = $solicitudes->leerRegistros();
            //         $result['status'] = 1;
            //     } elseif ($result['dataset'] = $solicitudes->buscar($_POST['buscador'])) {
            //         $result['status'] = 1;
            //     } elseif (Database::getException()) {
            //         $result['exception'] = Database::getException();
            //     } else {
            //         $result['exception'] = 'No hay coincidencias';
            //     }
            //     break;
        case 'crear':
            $_POST = Validator::validateForm($_POST);
            if (!$solicitudes->setNombre($_POST['nombre'])) {
                $result['exception'] = 'Nombre incorrecto';
            } elseif (!$solicitudes->setEdad($_POST['edad'])) {
                $result['exception'] = 'Edad incorrecta';
            } elseif (!$solicitudes->setId_Raza($_POST['raza'])) {
                $result['exception'] = 'Raza incorrecta';
            } elseif (!$solicitudes->setCorreo_Responsable($_POST['correo'])) {
                $result['exception'] = 'Correo incorrecto';
            } elseif ($solicitudes->crear()) {
                $result['status'] = 1;
                $result['message'] = 'Raza creada exitosamente';
            } else {
                $result['exception'] = Database::getException();
            }
            break;
            // case 'leerUnRegistro':
            //     if (!$solicitudes->setId($_POST['id_raza'])) {
            //         $result['exception'] = 'Raza incorrecta';
            //     } elseif ($result['dataset'] = $solicitudes->leerUnRegistro()) {
            //         $result['status'] = 1;
            //     } elseif (Database::getException()) {
            //         $result['exception'] = Database::getException();
            //     } else {
            //         $result['exception'] = 'Raza inexistente';
            //     }
            //     break;
            // case 'actualizar':
            //     $_POST = Validator::validateForm($_POST);
            //     if (!$solicitudes->setId($_POST['id'])) {
            //         $result['exception'] = 'Raza incorrecta';
            //     } elseif (!$solicitudes->leerUnRegistro()) {
            //         $result['exception'] = 'Raza inexistente';
            //     } elseif (!$solicitudes->setRaza($_POST['raza'])) {
            //         $result['exception'] = 'Nombre incorrecto';
            //     } elseif (!$solicitudes->setInfo($_POST['info'])) {
            //         $result['exception'] = 'Descripción incorrecta';
            //     } elseif ($solicitudes->actualizar()) {
            //         $result['status'] = 1;
            //         $result['message'] = 'Raza modificada correctamente';
            //     } else {
            //         $result['exception'] = Database::getException();
            //     }
            //     break;
            // case 'eliminar':
            //     if (!$solicitudes->setId($_POST['id_raza'])) {
            //         $result['exception'] = 'Raza incorrecta';
            //     } elseif (!$solicitudes->leerUnRegistro()) {
            //         $result['exception'] = 'Raza inexistente';
            //     } elseif ($solicitudes->eliminar()) {
            //         $result['status'] = 1;
            //         $result['message'] = 'Raza eliminada correctamente';
            //     } else {
            //         $result['exception'] = Database::getException();
            //     }
            //     break;
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
