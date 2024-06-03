CREATE DATABASE IF NOT EXISTS gaticos;
USE gaticos;

CREATE TABLE IF NOT EXISTS razas (
	id_raza INT AUTO_INCREMENT PRIMARY KEY NOT NULL,
    raza VARCHAR(25) NOT NULL UNIQUE,
    info VARCHAR(100) NOT NULL
);

CREATE TABLE IF NOT EXISTS estados_solicitudes (
    id_estado INT AUTO_INCREMENT PRIMARY KEY NOT NULL,
    estado VARCHAR(25) NOT NULL UNIQUE
);

CREATE TABLE IF NOT EXISTS solicitudes_registro (
    id_solicitud INT AUTO_INCREMENT PRIMARY KEY NOT NULL,
    nombre VARCHAR(40) NOT NULL,
    edad INT NOT NULL,
    id_raza INT NOT NULL,
    color VARCHAR(25) NOT NULL,
    id_estado INT NOT NULL,
    correo_responsable VARCHAR(120) NOT NULL,

    CONSTRAINT fk_raza_solicitud
    FOREIGN KEY (id_raza)
    REFERENCES razas(id_raza) ON UPDATE CASCADE ON DELETE CASCADE,

    CONSTRAINT fk_estado_solicitud
    FOREIGN KEY (id_estado)
    REFERENCES estados_solicitudes(id_estado) ON UPDATE CASCADE ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS gaticos (
    id_gatico INT AUTO_INCREMENT PRIMARY KEY NOT NULL,
    nombre VARCHAR(40) NOT NULL,
    edad INT NOT NULL,
    id_raza INT NOT NULL,
    color VARCHAR(25),

    CONSTRAINT fk_raza_gatico
    FOREIGN KEY (id_raza)
    REFERENCES razas(id_raza) ON UPDATE CASCADE ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS usuarios (
    id_usuario INT AUTO_INCREMENT PRIMARY KEY NOT NULL,
    usuario VARCHAR(40) NOT NULL UNIQUE,
    clave VARCHAR(200) NOT NULL,
    correo VARCHAR(120) NOT NULL,
);

CREATE TABLE IF NOT EXISTS bitacoras (
    id_bitacora INT AUTO_INCREMENT PRIMARY KEY NOT NULL,
    id_usuario INT NOT NULL,
    id_solicitud INT NOT NULL,

    CONSTRAINT fk_usuario_bitacora
    FOREIGN KEY (id_usuario)
    REFERENCES usuarios(id_usuario) ON UPDATE CASCADE ON DELETE CASCADE,

    CONSTRAINT fk_solicitud_bitacora
    FOREIGN KEY (id_solicitud)
    REFERENCES solicitudes_registro(id_solicitud) ON UPDATE CASCADE ON DELETE CASCADE
);

INSERT INTO solicitudes_registro
VALUES  ('aceptada'),
        ('rechazada');