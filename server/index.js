const express = require('express');
const app = express();
const mysql = require('mysql');

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Chavoanimado123+',
    database: 'personas'
})

app.post('/create', (req, res) => {
    const nombre = req.body.nombre;
    const edad = req.body.edad;
    const pais = req.body.pais;
    const cargo = req.body.cargo;
    const antiguedad = req.body.antiguedad;
    
    db.query('INSERT INTO empleados (nombre, edad, pais, cargo, antiguedad) VALUES (?,?,?,?,?)',[nombre,edad,pais,cargo,antiguedad],
    (err,result)=>{
        if(err){
            console.log(err)
        }else{
            res.send("Empleado registrado")
        }
    }) //Promesa de esos valores
});

app.listen(3001, () => console.log('Server running on port 3001'));