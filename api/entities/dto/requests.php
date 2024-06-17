<?php
// Se incluye la clase para validar los datos de entrada.
require_once('../../helpers/validator.php');
// Se incluye la clase para heredar los métodos de acceso a datos.
require_once('../../entities/dao/requests_queries.php');
/*
*	Clase para manejar la transferencia (encapsulamiento) de datos de la entidad RAZAS.
*/
class Solicitudes extends SolicitudesQueries
{
    // Declaración de atributos (propiedades).
    protected $id_solicitud = null;
    protected $nombre = null;
    protected $edad = null;
    protected $id_raza = null;
    protected $correo_responsable = null;

    /*
    *   Métodos para validar y asignar valores de los atributos.
    */
    public function setId($value)
    {
        if (Validator::validateNaturalNumber($value)) {
            $this->id_solicitud = $value;
            return true;
        } else {
            return false;
        }
    }

    public function setNombre($value)
    {
        if (Validator::validateAlphanumeric($value, 1, 40)) {
            $this->nombre = $value;
            return true;
        } else {
            return false;
        }
    }

    public function setEdad($value)
    {
        if (Validator::validateNaturalNumber($value)) {
            $this->edad = $value;
            return true;
        } else {
            return false;
        }
    }

    public function setId_Raza($value)
    {
        if (Validator::validateNaturalNumber($value)) {
            $this->id_raza = $value;
            return true;
        } else {
            return false;
        }
    }

    public function setCorreo_Responsable($value)
    {
        if (Validator::validateEmail($value)) {
            $this->correo_responsable = $value;
            return true;
        } else {
            return false;
        }
    }

    /*
    *   Métodos para obtener valores de los atributos.
    */
    public function getId()
    {
        return $this->id_solicitud;
    }

    public function getNombre()
    {
        return $this->nombre;
    }

    public function getEdad()
    {
        return $this->edad;
    }

    public function getId_Raza()
    {
        return $this->id_raza;
    }

    public function getCorreo_Responsable()
    {
        return $this->correo_responsable;
    }
}
