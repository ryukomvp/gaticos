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
    public function buscar($value)
    {
        $sql = 'SELECT id_raza, raza, info
                FROM razas
                WHERE raza LIKE ?
                ORDER BY raza';
        $params = array("%$value%");
        return Database::getRows($sql, $params);
    }

    public function crear()
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
        $params = array($this->id_raza);
        return Database::getRow($sql, $params);
    }

    public function actualizar()
    {
        $sql = 'UPDATE razas
                SET raza = ?, info = ?
                WHERE id_raza = ?';
        $params = array($this->raza, $this->info, $this->id_raza);
        return Database::executeRow($sql, $params);
    }

    public function eliminar()
    {
        $sql = 'DELETE FROM razas
                WHERE id_raza = ?';
        $params = array($this->id_raza);
        return Database::executeRow($sql, $params);
    }
}
