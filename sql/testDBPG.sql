DROP DATABASE IF EXISTS testdb;

CREATE DATABASE testdb;

\c testdb;

DROP TABLE IF EXISTS usuario;

CREATE TABLE usuario
(
    id SERIAL,
    email VARCHAR(50) UNIQUE,
    contrasena VARCHAR(255),
    image_path VARCHAR(255),
    PRIMARY KEY(id)
)