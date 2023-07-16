npm start para iniciar servidor de api  
por defecto, acceder a localhost:3050 para acceder a api

MySQL: para crear y configurar base de datos  
mysql -u username -p userpass CREATE DATABASE testDB  
mysql -u username -p userpass testDB < ./mysql/testDB.sql

configurar .env con credenciales para su base de datos  
DB_USER = 'username' //cambiar por usuario de mysql  
DB_HOST = 'localhost'  
DB_PASSWORD = 'userpass' //cambiar por clave de usuario de mysql  
DB_NAME = 'testDB'

Uso de la API:  
/ - ruta por defecto - mensaje de bienvenida  
/usuarios - unica ruta ademas de la por defecto  
&ensp;-GET: sin parametros. Devuelve lista completa de usuarios sin ordenar sin paginacion  
&ensp;-POST: crea un nuevo usuario. la id se actualiza automaticamente. Parametros:  
&ensp;&ensp;-@nombre  
&ensp;&ensp;-@edad  
&ensp;&ensp;-@rut  
&ensp;&ensp;-@telefono  
&ensp;&ensp;-@direccion  
&ensp;-PUT: actualiza un usuario determinado por su id. Parametros:  
&ensp;&ensp;-@idUsuario  
&ensp;&ensp;-@nombre  
&ensp;&ensp;-@edad  
&ensp;&ensp;-@rut  
&ensp;&ensp;-@telefono  
&ensp;&ensp;-@direccion  
&ensp;-DELETE: elimina un usuario determinado por su id. Parametros:  
&ensp;&ensp;-@idUsuario
