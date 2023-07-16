
CREATE TABLE usuario
(
    id
        SERIAL,
    nombre VARCHAR
    (20),
    edad VARCHAR
    (20),
    rut VARCHAR
    (10),
    telefono INT,
    direccion VARCHAR
    (50),
    PRIMARY KEY
    (id)
)