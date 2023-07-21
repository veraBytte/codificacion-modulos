## Todo el backend referente a node js

Este código muestra un servidor de Node.js con Express que se comunica con una base de datos MySQL para realizar operaciones CRUD (Create, Read, Update, Delete) sobre una tabla llamada "empleados" en la base de datos "personas". El servidor acepta solicitudes HTTP POST, GET, PUT y DELETE para interactuar con la base de datos. A continuación, se muestra la documentacion de cada parte del codigo:

## Importación de módulos y configuración básica del servidor:
```js
    const express = require('express');
    const app = express();
    const mysql = require('mysql');
    const cors = require('cors');

    app.use(cors());
    app.use(express.json());
```

En este bloque, se importan los módulos necesarios para el servidor, que son Express, MySQL y Cors. Luego, se configura el servidor de Express para usar el middleware Cors, que permite que las solicitudes desde diferentes orígenes se comuniquen con el servidor. También se configura el middleware para analizar el cuerpo de las solicitudes en formato JSON.

## Configuración de la base de datos MySQL:
```js
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    port: 33061,
    database: 'personas'
});
```
Aquí se configuran los detalles de conexión a la base de datos MySQL. El servidor se conectará a una base de datos llamada "personas" que se encuentra en el host "localhost" en el puerto 33061. Se utiliza el usuario "root" y la contraseña "root" para la conexión. Asegúrate de tener una base de datos llamada "personas" con una tabla "empleados" en tu base de datos MySQL.

## Función de inserción de datos a la base de datos (POST):
```js
    app.post('/create', (req, res) => {
        // Obtiene los datos del cuerpo de la solicitud
        const nombre = req.body.nombre;
        const edad = req.body.edad;
        const pais = req.body.pais;
        const cargo = req.body.cargo;
        const antiguedad = req.body.antiguedad;
        
        // Realiza la inserción en la base de datos
        db.query('INSERT INTO empleados (name, edad, pais, cargo, antiguedad) VALUES (?,?,?,?,?)', [nombre, edad, pais, cargo, antiguedad],
            (err, result) => {
                if (err) {
                    console.log(err);
                } else {
                    res.send(result);
                }
            }
        );
    });
```
Esta función escucha las solicitudes POST en la ruta "/create". Extrae los datos enviados en el cuerpo de la solicitud y realiza una inserción en la tabla "empleados" de la base de datos.

## Función de lectura de datos de la base de datos (GET):
```js
app.get('/empleados', (req, res) => {
    // Realiza una consulta para obtener todos los registros de la tabla "empleados"
    db.query('SELECT * FROM empleados', (err, result) => {
        if (err) {
            console.log(err);
        } else {
            res.send(result);
        }
    });
});
```
Esta función maneja las solicitudes GET en la ruta "/empleados". Realiza una consulta para obtener todos los registros de la tabla "empleados" en la base de datos y los envía como respuesta.

## Función de actualización de datos en la base de datos (PUT):
```js
app.put('/update', (req, res) => {
    // Obtiene los datos del cuerpo de la solicitud
    const id = req.body.id;
    const nombre = req.body.nombre;
    const edad = req.body.edad;
    const pais = req.body.pais;
    const cargo = req.body.cargo;
    const antiguedad = req.body.antiguedad;
    
    // Realiza la actualización en la base de datos
    db.query('UPDATE empleados SET name=?, edad=?, pais=?, cargo=?, antiguedad=? WHERE id=?', [nombre, edad, pais, cargo, antiguedad, id],
        (err, result) => {
            if (err) {
                console.log(err);
            } else {
                res.send(result);
            }
        }
    );
});
```
Esta función atiende las solicitudes PUT en la ruta "/update". Extrae los datos enviados en el cuerpo de la solicitud y realiza una actualización en la tabla "empleados" de la base de datos, utilizando el "id" proporcionado para identificar el registro que se debe actualizar.

## Función de eliminación de datos en la base de datos (DELETE):
```js
app.delete('/delete/:id', (req, res) => {
    // Obtiene el id del empleado desde los parámetros de la URL
    const id = req.params.id;
    
    // Realiza la eliminación en la base de datos
    db.query('DELETE FROM empleados WHERE id=?', id, (err, result) => {
        if (err) {
            console.log(err);
        } else {
            res.send(result);
        }
    });
});
```
Esta función responde a las solicitudes DELETE en la ruta "/delete/:id". Obtiene el ID del empleado desde los parámetros de la URL y luego ejecuta una consulta para eliminar el registro correspondiente de la tabla "empleados" en la base de datos.

## Iniciar el servidor y escuchar en el puerto 3001:
```js
    app.listen(3001, () => console.log('Server running on port 3001'));
```
Finalmente, el servidor se inicia y escucha en el puerto 3001. Puedes acceder a las rutas definidas para realizar operaciones CRUD en la tabla "empleados" de la base de datos "personas". Por ejemplo:

* Para insertar un nuevo empleado, realiza una solicitud POST a http://localhost:3001/create
* Para obtener todos los empleados, realiza una solicitud GET a http://localhost:3001/empleados.
* Para actualizar un empleado, realiza una solicitud PUT a http://localhost:3001/update.
* Para eliminar un empleado, realiza una solicitud DELETE a http://localhost:3001/delete/:id donde ":id" es el ID del empleado que deseas eliminar.