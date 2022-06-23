# Assetsment backend - Daniel Quispe
------------
Este proyecto cumple con las caracteristicas de una API RestFull, cuenta con una base de datos de tipo MongoDB.
Dentro de sus funciones se encuentran:
1. Crear una nueva cuenta de usuario
2. Iniciar sesion de un usuario
3. El usuario puede crear listas
5. El usuario puede mostrar sus listas
6. El usuario puede eliminar sus listas
7. El usuario puede agregar un nuevo favorito dentro de una lista
8. El usuario puede eliminar un favorito dentro de una lista
9. El usuario puede mostrar sus favoritos

## Instalacion
Para instalar las dependencias del proyecto se debe ejecutar el siguiente comando:
    
    npm install
y

    npm start

Para detener los procesos se presionara:
    
    ctrl + C

### End Points

| Route                              | HTTP verb | Route Middleware | Description                                   |
| -----------------------------      | --------- | ---------------- | --------------------------------------------- |
| /auth/local/register               | POST      |                  | Crear una cuenta con email y password         |
| /auth/local/login                  | POST      |                  | Logearse con email y password                 |
| /api/listFav                       | POST      | validateJWT()    | Crea una lista de favoritos                   |
| /api/listFav                       | GET       | validateJWT()    | Muestra todas las listas del usuario          |
| /api/listFav/:id                   | GET       | validateJWT()    | Muestra una lista del usuario                 |
| /api/listFav/:id                   | PUT       | validateJWT()    | Actualiza una lista del usuario               |
| /api/listFav/:id                   | DELETE    | validateJWT()    | Elimina una lista del usuario                 |
| /api/listFav/favorite              | POST      | validateJWT()    | Crea un favorito en una lista ya creada       |
| .../listFav/favorite/:listFavorite | GET       | validateJWT()    | Muestra todos los favoritos de una lista      |
| .../listFav/favorite/search/:idFav | GET       | validateJWT()    | Muestra un favorito específico                |
| .../listFav/favorite/update/:idFav | PUT       | validateJWT()    | Actualiza un favorito de una lista            |
| .../listFav/favorite/delete/:idFav | DELETE    | validateJWT()    | Elimina un favorito de una lista de favoritos |

### Pruebas

Usaremos Postman para probar la aplicación:

#### Registro de Usuario

Utilizaremos el siguiente endpoint para realizar la petición:

    http://localhost:8080/auth/local/register

Se deberá marcar las pestañas de `body`, seleccionar `raw` y cambiar al formato `JSON`

[![register.png](https://i.postimg.cc/DZ7Q838P/register.png)](https://postimg.cc/1gYVjT08)

El email y password son requeridos para registrarse.

[![registersucces.png](https://i.postimg.cc/bYLXY1mK/registersucces.png)](https://postimg.cc/9z4gJw5p)

Nos mandara un mensaje exitosos si digitamos un email valido y un password valido.

#### Login usuario

Utilizaremos el siguiente endpoint para realizar la petición:

    http://localhost:8080/auth/local/register

Digitamos el correo y la contraseña:

[![login.png](https://i.postimg.cc/NF1TkgLn/login.png)](https://postimg.cc/Zv5CTz8P)

Si digitamos los campos correctamente nos dejara logearnos y generara un token de autentificación, de esa forma tener los permisos para la creacion de listas y favoritos.

[![loginsucces.png](https://i.postimg.cc/W4VWKLtL/loginsucces.png)](https://postimg.cc/cvDBgzQX)

##### Creacion de Listas

`POST` Utilizaremos el siguiente endpoint para crear nuestras listas:
    
    http://localhost:8080/api/listFav

Antes de ingresar una lista, debemos rellenar los campos de `key` y `value` que se encuentras en la pestaña de `Headers` con los siguientes campos:

    key : x-access-token
    value: <token generado en el login>

[![token-list.png](https://i.postimg.cc/4xy2RbQw/token-list.png)](https://postimg.cc/bZX9QnM2)

E ingresaremos los siguientes datos requeridos:

[![list-creat.png](https://i.postimg.cc/qRc9QPng/list-creat.png)](https://postimg.cc/phTGL1st)

Una vez enviado la petición nos debera mostrar con exito la creación de la lista

[![list-creat.png](https://i.postimg.cc/qRc9QPng/list-creat.png)](https://postimg.cc/phTGL1st)

##### Mostrar todas las listas

`GET` Para mostrar todas las listas creadas se usara el siguiente endpoint

    http://localhost:8080/api/listFav

[![list-list.png](https://i.postimg.cc/KjRdPJPH/list-list.png)](https://postimg.cc/QKZ4sgnQ)

#### Mostrar una lista por ID

`GET` Tambien se puede mostrar solo una lista especifica con este endpoint:

    http://localhost:8080/api/listFav/:id

[![listid.png](https://i.postimg.cc/BQcV8j1F/listid.png)](https://postimg.cc/kBGczXsM)

#### Actualizar Lista

`PUT` Con el suiguiente endpoint se podra actualizar algun campo de la lista:

    http://localhost:8080/api/listFav/:id

[![list-update.png](https://i.postimg.cc/MKKS5TFJ/list-update.png)](https://postimg.cc/bdMWNzPm)

#### Eliminar Lista

`DELETE` Y si se desea aliminar alguna lista, se podra con el siguiente endpoint:

    http://localhost:8080/api/listFav/:id

[![delete-list.png](https://i.postimg.cc/wjJKwmgM/delete-list.png)](https://postimg.cc/PCtFxNLn)

#### Creacion de favoritos

`POST`

[![favorite-cret.png](https://i.postimg.cc/WzGjYWB9/favorite-cret.png)](https://postimg.cc/MfphvDKR)

#### Listar Favoritos

`GET`

[![favorite-list.png](https://i.postimg.cc/kGzY0KSB/favorite-list.png)](https://postimg.cc/q6cGntjT)

#### Listar Favoritos por ID

`GET` 

[![favorite-id.png](https://i.postimg.cc/ZqPR0LKz/favorite-id.png)](https://postimg.cc/v1BMNfV0)

#### Actualizar un Favorito por ID

`PUT`

[![update-favorite.png](https://i.postimg.cc/mgHqYXHJ/update-favorite.png)](https://postimg.cc/TKTCGcQJ)

#### Eliminar Favorito

`DELETE`

[![edlete-favor.png](https://i.postimg.cc/mZ0MJ8qT/edlete-favor.png)](https://postimg.cc/8smjrBNY)

### END

