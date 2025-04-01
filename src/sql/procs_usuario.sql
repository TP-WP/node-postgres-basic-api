DROP PROCEDURE IF EXISTS ingresa_usuario;
DROP PROCEDURE IF EXISTS check_pass;

CREATE OR REPLACE PROCEDURE ingresa_usuario( _email TEXT, _contrasena TEXT)
AS $$
  INSERT INTO usuario (email, contrasena) 
  VALUES(_email, crypt(_contrasena, gen_salt('md5')));
$$LANGUAGE SQL;

CREATE OR REPLACE FUNCTION check_pass ( _email TEXT, _contrasena TEXT) 
RETURNS BOOLEAN AS $$
DECLARE passed BOOLEAN;
BEGIN
  SELECT (contrasena = crypt(_contrasena, contrasena)) INTO passed 
  FROM usuario 
  WHERE email = _email;
  RETURN passed;
END;
$$ LANGUAGE plpgsql;