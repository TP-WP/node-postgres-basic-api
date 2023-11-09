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

CREATE OR REPLACE FUNCTION get_user_pass(IN Email VARCHAR(50), OUT _result VARCHAR(255))
RETURNS VARCHAR(255) AS $$
    SELECT contrasena FROM usuario WHERE email=Email    
$$ LANGUAGE sql;