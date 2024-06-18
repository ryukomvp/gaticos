<?php
// Se incluye la clase para trabajar con la base de datos.
require_once('../../helpers/database.php');
/*
*	Clase para manejar el acceso a datos de la entidad CATEGORIA.
*/
class SolicitudesQueries
{
    /*
    *   Métodos para realizar las operaciones SCRUD (search, create, read, update, delete).
    */
    // public function buscar($value)
    // {
    //     $sql = 'SELECT id_solicitud, nombre, edad, id_raza, correo_responsable, estado_solicitud
    //             FROM solicitudes
    //             WHERE nombre LIKE ?
    //             ORDER BY raza';
    //     $params = array("%$value%");
    //     return Database::getRows($sql, $params);
    // }

    public function crear()
    {
        $sql = 'INSERT INTO solicitudes(nombre, edad, id_raza, correo_responsable)
                VALUES(?, ?, ?, ?)';
        $params = array($this->nombre, $this->edad, $this->id_raza, $this->correo_responsable);
        return Database::executeRow($sql, $params);
    }

    public function leerRegistros()
    {
        $sql = 'SELECT id_solicitud, nombre, edad, raza, correo_responsable, estado_solicitud, fecha
                FROM solicitudes
                INNER JOIN razas USING(id_raza)
                ORDER BY id_solicitud';
        return Database::getRows($sql);
    }

    public function leerUnRegistro()
    {
        $sql = 'SELECT id_solicitud, nombre, edad, raza, correo_responsable, estado_solicitud, fecha
                FROM solicitudes
                INNER JOIN razas USING(id_raza)
                WHERE id_solicitud = ?';
        $params = array($this->id_solicitud);
        return Database::getRow($sql, $params);
    }

    public function aprobar()
    {
        $sql = "UPDATE solicitudes
                SET estado_solicitud = 'Aprobada'
                WHERE id_solicitud = ?";
        $params = array($this->id_solicitud);
        return Database::executeRow($sql, $params);
    }

    public function rechazar()
    {
        $sql = "UPDATE solicitudes
                SET estado_solicitud = 'Rechazada'
                WHERE id_solicitud = ?";
        $params = array($this->id_solicitud);
        return Database::executeRow($sql, $params);
    }
}
