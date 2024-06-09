<?php
// Constantes para establecer las credenciales de conexión con el servidor de bases de datos.
define('SERVER', 'localhost');
define('DATABASE', 'gaticos');
define('USERNAME', 'root');
define('PASSWORD', '');

try {
    $connection = new PDO('mysql:host=' . SERVER . ';dbname=' . DATABASE, USERNAME, PASSWORD);
    echo "Conexión exitosa";
  } catch (PDOException $e) {
    echo "Error de conexión: " . $e->getMessage();
  }
?>