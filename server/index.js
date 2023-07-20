const express = require('express');
const app = express();
const mysql = require('mysql');
const cors  = require('cors');

app.use(cors());
app.use(express.json());

//  INFO Configuracion de la base de datos
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    port: 33061,
    database: 'personas'
})

//  INFO Función de insercción a la base de datos con el metodo post
app.post('/create', (req, res) => {
    const nombre = req.body.nombre;
    const edad = req.body.edad;
    const pais = req.body.pais;
    const cargo = req.body.cargo;
    const antiguedad = req.body.antiguedad;
    
    db.query('INSERT INTO empleados (name, edad, pais, cargo, antiguedad) VALUES (?,?,?,?,?)',[nombre,edad,pais,cargo,antiguedad],
    (err,result)=>{
        if(err){
            console.log(err)
        }else{
            res.send("Empleado registrado")
        }
    }) //Promesa de esos valores
});

//  INFO Función de lectura de la base de datos con el metodo get
app.get('/empleados', (req, res) => {
    
    db.query('SELECT * FROM empleados',
    (err,result)=>{
        if(err){
            console.log(err)
        }else{
            res.send(result)
        }
    }) //Promesa de esos valores
});

//  INFO Función de actualización de la base de datos con el metodo put

app.listen(3001, () => console.log('Server running on port 3001'));