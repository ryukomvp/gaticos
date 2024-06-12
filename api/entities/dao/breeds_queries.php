<?php
// Se incluye la clase para trabajar con la base de datos.
require_once('../../helpers/database.php');
/*
*	Clase para manejar el acceso a datos de la entidad CATEGORIA.
*/
class RazasQueries
{
    /*
    *   Métodos para realizar las operaciones SCRUD (search, create, read, update, delete).
    */
    public function buscarRegistros($value)
    {
        $sql = 'SELECT id_raza, raza, info
                FROM razas
                WHERE raza LIKE ?
                ORDER BY raza';
        $params = array("%$value%");
        return Database::getRows($sql, $params);
    }

    public function crearRegistro()
    {
        $sql = 'INSERT INTO razas(raza, info)
                VALUES(?, ?)';
        $params = array($this->raza, $this->info);
        return Database::executeRow($sql, $params);
    }

    public function leerRegistros()
    {
        $sql = 'SELECT id_raza, raza, info
                FROM razas
                ORDER BY raza';
        return Database::getRows($sql);
    }

    public function leerUnRegistro()
    {
        $sql = 'SELECT id_raza, raza, info
                FROM razas
                WHERE id_raza = ?';
        $params = array($this->id);
        return Database::getRow($sql, $params);
    }

    // public function updateRow($current_image)
    // {
    //     // Se verifica si existe una nueva imagen para borrar la actual, de lo contrario se mantiene la actual.
    //     ($this->imagen) ? Validator::deleteFile($this->getRuta(), $current_image) : $this->imagen = $current_image;

    //     $sql = 'UPDATE categoria
    //             SET imagen_categoria = ?, nombre_categoria = ?, descripcion_categoria = ?
    //             WHERE id_categoria = ?';
    //     $params = array($this->imagen, $this->nombre, $this->descripcion, $this->id);
    //     return Database::executeRow($sql, $params);
    // }

    // public function deleteRow()
    // {
    //     $sql = 'DELETE FROM razas
    //             WHERE id_raza = ?';
    //     $params = array($this->id);
    //     return Database::executeRow($sql, $params);
    // }
}
