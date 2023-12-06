npm start para iniciar servidor de api  
por defecto, acceder a localhost:3050 para acceder a api

get /usuarios
@email
get single user:
{email}

post /usuarios
@email
@password
creates user

post /usuarios/upload-image
@email
@file
uploads image to cloudinary

post /usuarios/login
@email
@password
@platform
validates user login and returns token in a cookie when platform is web or in response data when mobile

get /usuarios/logout
deletes cookie when web or TODO insta expire token when mobile

get /usuarios/all
returns all users
[
    {
        email,
        password
    }
]

get /usuarios/validate
@token
simple fetch to validate a token