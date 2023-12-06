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

CREATE OR REPLACE PROCEDURE store_image_path(
    _param_email VARCHAR(50),
    Image_path VARCHAR(255)
)
LANGUAGE plpgsql
AS $$
BEGIN
    UPDATE usuario SET image_path = Image_path WHERE email=_param_email;
END;
$$;

CREATE OR REPLACE FUNCTION get_user_pass(_param_email VARCHAR(50))
  RETURNS VARCHAR(255)
  LANGUAGE plpgsql AS
$func$
BEGIN
   RETURN (SELECT contrasena FROM usuario WHERE email=_param_email);
END
$func$;

CREATE OR REPLACE FUNCTION get_all_users() RETURNS setof usuario AS '
    SELECT * FROM usuario;
' LANGUAGE SQL;