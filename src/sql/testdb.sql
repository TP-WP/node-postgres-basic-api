\c testdb;
CREATE EXTENSION IF NOT EXISTS pgcrypto;

DROP TABLE IF EXISTS usuario;

CREATE TABLE usuario(
  email TEXT PRIMARY KEY,
  contrasena TEXT NOT NULL
)
