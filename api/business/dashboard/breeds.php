<?php
// Se incluye la clase para la transferencia y acceso a datos.
require_once('../../entities/dto/breeds.php');

// Se comprueba si existe una acción a realizar, de lo contrario se finaliza el script con un mensaje de error.
if (isset($_GET['action'])) {
    // Se crea una sesión o se reanuda la actual para poder utilizar variables de sesión en el script.
    session_start();
    // Se instancia la clase correspondiente.
    $raza = new Razas;
    // Se declara e inicializa un arreglo para guardar el resultado que retorna la API.
    $result = array('status' => 0, 'message' => null, 'exception' => null, 'dataset' => null);
    switch ($_GET['action']) {
        case 'readAll':
            if ($result['dataset'] = $raza->readAll()) {
                $result['status'] = 1;
            } elseif (Database::getException()) {
                $result['exception'] = Database::getException();
            } else {
                $result['exception'] = 'No hay datos registrados';
            }
            break;
        case 'search':
            $_POST = Validator::validateForm($_POST);
            if ($_POST['buscador'] == '') {
                $result['dataset'] = $raza->readAll();
                $result['status'] = 1;
            } elseif ($result['dataset'] = $raza->searchRows($_POST['buscador'])) {
                $result['status'] = 1;
                $result['message'] = 'Existen ' . count($result['dataset']) . ' coincidencias';
            } elseif (Database::getException()) {
                $result['exception'] = Database::getException();
            } else {
                $result['exception'] = 'No hay coincidencias';
            }
            break;
            // case 'create':
            //     $_POST = Validator::validateForm($_POST);
            //     if (!$raza->setNombre($_POST['nombre'])) {
            //         $result['exception'] = 'Nombre incorrecto';
            //     } elseif (!$raza->setDescripcion($_POST['descripcion'])) {
            //         $result['exception'] = 'Descripción incorrecta';
            //     } elseif (!is_uploaded_file($_FILES['archivo']['tmp_name'])) {
            //         $result['exception'] = 'Seleccione una imagen';
            //     } elseif (!$raza->setImagen($_FILES['archivo'])) {
            //         $result['exception'] = Validator::getFileError();
            //     } elseif ($raza->createRow()) {
            //         $result['status'] = 1;
            //         if (Validator::saveFile($_FILES['archivo'], $raza->getRuta(), $raza->getImagen())) {
            //             $result['message'] = 'Categoría creada correctamente';
            //         } else {
            //             $result['message'] = 'Categoría creada pero no se guardó la imagen';
            //         }
            //     } else {
            //         $result['exception'] = Database::getException();
            //     }
            //     break;
            // case 'readOne':
            //     if (!$raza->setId($_POST['id_categoria'])) {
            //         $result['exception'] = 'Categoría incorrecta';
            //     } elseif ($result['dataset'] = $raza->readOne()) {
            //         $result['status'] = 1;
            //     } elseif (Database::getException()) {
            //         $result['exception'] = Database::getException();
            //     } else {
            //         $result['exception'] = 'Categoría inexistente';
            //     }
            //     break;
            // case 'update':
            //     $_POST = Validator::validateForm($_POST);
            //     if (!$raza->setId($_POST['id'])) {
            //         $result['exception'] = 'Categoría incorrecta';
            //     } elseif (!$data = $raza->readOne()) {
            //         $result['exception'] = 'Categoría inexistente';
            //     } elseif (!$raza->setNombre($_POST['nombre'])) {
            //         $result['exception'] = 'Nombre incorrecto';
            //     } elseif (!$raza->setDescripcion($_POST['descripcion'])) {
            //         $result['exception'] = 'Descripción incorrecta';
            //     } elseif (!is_uploaded_file($_FILES['archivo']['tmp_name'])) {
            //         if ($raza->updateRow($data['imagen_categoria'])) {
            //             $result['status'] = 1;
            //             $result['message'] = 'Categoría modificada correctamente';
            //         } else {
            //             $result['exception'] = Database::getException();
            //         }
            //     } elseif (!$raza->setImagen($_FILES['archivo'])) {
            //         $result['exception'] = Validator::getFileError();
            //     } elseif ($raza->updateRow($data['imagen_categoria'])) {
            //         $result['status'] = 1;
            //         if (Validator::saveFile($_FILES['archivo'], $raza->getRuta(), $raza->getImagen())) {
            //             $result['message'] = 'Categoría modificada correctamente';
            //         } else {
            //             $result['message'] = 'Categoría modificada pero no se guardó la imagen';
            //         }
            //     } else {
            //         $result['exception'] = Database::getException();
            //     }
            //     break;
            // case 'delete':
            //     if (!$raza->setId($_POST['id_categoria'])) {
            //         $result['exception'] = 'Categoría incorrecta';
            //     } elseif (!$data = $raza->readOne()) {
            //         $result['exception'] = 'Categoría inexistente';
            //     } elseif ($raza->deleteRow()) {
            //         $result['status'] = 1;
            //         if (Validator::deleteFile($raza->getRuta(), $data['imagen_categoria'])) {
            //             $result['message'] = 'Categoría eliminada correctamente';
            //         } else {
            //             $result['message'] = 'Categoría eliminada pero no se borró la imagen';
            //         }
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
