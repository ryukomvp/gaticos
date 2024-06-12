<?php
// Se incluye la clase para validar los datos de entrada.
require_once('../../helpers/validator.php');
// Se incluye la clase para heredar los métodos de acceso a datos.
require_once('../../entities/dao/breeds_queries.php');
/*
*	Clase para manejar la transferencia (encapsulamiento) de datos de la entidad RAZAS.
*/
class Razas extends RazasQueries
{
    // Declaración de atributos (propiedades).
    protected $id = null;
    protected $raza = null;
    protected $info = null;

    /*
    *   Métodos para validar y asignar valores de los atributos.
    */
    public function setId($value)
    {
        if (Validator::validateNaturalNumber($value)) {
            $this->id = $value;
            return true;
        } else {
            return false;
        }
    }

    public function setRaza($value)
    {
        if (Validator::validateAlphanumeric($value, 1, 40)) {
            $this->raza = $value;
            return true;
        } else {
            return false;
        }
    }

    public function setInfo($value)
    {
        if (Validator::validateAlphanumeric($value, 1, 200)) {
            $this->info = $value;
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
        return $this->id;
    }

    public function getRaza()
    {
        return $this->raza;
    }

    public function getInfo()
    {
        return $this->info;
    }
}
