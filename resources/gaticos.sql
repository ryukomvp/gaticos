CREATE DATABASE IF NOT EXISTS gaticos;
USE gaticos;

CREATE TABLE IF NOT EXISTS razas (
	id_raza INT AUTO_INCREMENT PRIMARY KEY NOT NULL,
    raza VARCHAR(40) NOT NULL UNIQUE,
    info VARCHAR(200) NOT NULL
);

CREATE TABLE IF NOT EXISTS solicitudes_registro (
    id_solicitud INT AUTO_INCREMENT PRIMARY KEY NOT NULL,
    nombre VARCHAR(40) NOT NULL,
    edad INT NOT NULL,
    id_raza INT NOT NULL,
    color VARCHAR(40) NOT NULL,
    correo_responsable VARCHAR(120) NOT NULL,
    estado_solicitud enum('Aceptada','Rechazada') NOT NULL,

    CONSTRAINT fk_raza_solicitud
    FOREIGN KEY (id_raza)
    REFERENCES razas(id_raza) ON UPDATE CASCADE ON DELETE CASCADE
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

-- CREATE TABLE IF NOT EXISTS usuarios (
--     id_usuario INT AUTO_INCREMENT PRIMARY KEY NOT NULL,
--     usuario VARCHAR(40) NOT NULL UNIQUE,
--     clave VARCHAR(200) NOT NULL,
--     correo VARCHAR(120) NOT NULL
-- );

-- CREATE TABLE IF NOT EXISTS bitacoras (
--     id_bitacora INT AUTO_INCREMENT PRIMARY KEY NOT NULL,
--     id_usuario INT NOT NULL,
--     id_solicitud INT NOT NULL,

--     CONSTRAINT fk_usuario_bitacora
--     FOREIGN KEY (id_usuario)
--     REFERENCES usuarios(id_usuario) ON UPDATE CASCADE ON DELETE CASCADE,

--     CONSTRAINT fk_solicitud_bitacora
--     FOREIGN KEY (id_solicitud)
--     REFERENCES solicitudes_registro(id_solicitud) ON UPDATE CASCADE ON DELETE CASCADE
-- );

INSERT INTO razas(raza, info) VALUES
    ('Abisinio', 'Los Abisinios son gatos activos y curiosos, con un pelaje corto y denso que generalmente es de color marrón rojizo. Son   conocidos por su apariencia elegante y musculosa, y sus grandes ojos almendrados.'),
    ('American Shorthair', 'Esta raza tiene un cuerpo robusto y musculoso, con un pelaje corto y denso que puede venir en una variedad de colores y patrones. Son conocidos por ser gatos tranquilos y amigables, adaptándose bien a la vida familiar.'),
    ('Bengalí', 'Los gatos Bengalíes tienen un pelaje que se asemeja al de los gatos salvajes, con manchas y rosetas distintivas. Son muy activos, juguetones y tienen un cuerpo atlético.'),
    ('Birmano', 'Los Birmanos tienen un pelaje semilargo, suave y sedoso, con colores que contrastan en las puntas de las orejas, la cara, las patas y la cola. Son gatos cariñosos y sociales.'),
    ('British Shorthair', 'Conocidos por su cara redonda y ojos grandes y expresivos, los British Shorthairs tienen un cuerpo robusto y un pelaje denso. Son gatos tranquilos, leales y fáciles de cuidar.'),
    ('Maine Coon', 'Esta es una de las razas más grandes de gatos domésticos, con un pelaje largo y esponjoso y una cola tupida. Son conocidos por su personalidad amigable y juguetona, así como por su inteligencia.'),
    ('Persa', 'Los Persas tienen un pelaje largo y grueso, y una cara distintivamente plana. Son gatos tranquilos y cariñosos, pero requieren un cuidado constante de su pelaje.'),
    ('Ragdoll', 'Los Ragdolls tienen un pelaje semilargo y sedoso y son conocidos por su temperamento dócil y cariñoso. A menudo se relajan completamente cuando se los recoge, de ahí su nombre.'),
    ('Siamés', 'Los Siameses tienen un cuerpo esbelto y elegante, con un pelaje corto y fino. Son muy vocales y sociales, y tienen ojos azules llamativos y un patrón de color en las puntas.'),
    ('Sphynx', 'Esta raza es conocida por su falta de pelaje, lo que le da una apariencia única. Los Sphynx son gatos muy cariñosos y enérgicos, y requieren un cuidado especial para su piel.');