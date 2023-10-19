\c testdb;

CREATE OR REPLACE PROCEDURE ingresa_usuario(
    Email VARCHAR(50),
    Contrasena VARCHAR(255)
)
LANGUAGE plpgsql
AS $$
BEGIN
    INSERT INTO usuario (
        email, contrasena
    ) VALUES(
        Email, Contrasena
    );
END;
$$;