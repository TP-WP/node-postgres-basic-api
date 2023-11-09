\c testdb;

CALL ingresa_usuario ('asd@asd.cl', '123');
SELECT get_user_pass ('asd@asd.cl');