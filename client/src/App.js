import './App.css';
import { useState } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css'

function App() {

  const [nombre,setNombre] = useState("");
  const [edad,setEdad] = useState(0);
  const [pais,setPais] = useState("");
  const [cargo,setCargo] = useState("");
  const [antiguedad,setAntiguedad] = useState(0);

  const [empleadosList, setEmpleados] = useState([]);

  const add = () => {
    axios.post('http://localhost:3001/create', {
      nombre: nombre,
      edad: edad,
      pais: pais,
      cargo: cargo,
      antiguedad: antiguedad
    }).then(() => {
      console.log("Success");
      getEmpleados();
    });
  }

  const getEmpleados = () => {
    axios.get('http://localhost:3001/empleados').then((response) => {
      console.log(setEmpleados(response.data));
      console.log(empleadosList);
    });
  }



  return (
    <div className="App">

      <div className="datos">
        <label>Nombre <input 
        onChange = {(event) => {
          setNombre(event.target.value);
        }}
        type="text"></input></label>

        <label>Edad <input 
        onChange = {(event) => {
          setEdad(event.target.value);
        }}
        type="text"></input></label>

        <label>Pais <input 
        onChange = {(event) => {
          setPais(event.target.value);
        }}
        type="text"></input></label>
          
        <label>Cargo <input 
        onChange = {(event) => {
          setCargo(event.target.value);
        }}
        type="text"></input></label>

        <label>Antiguedad <input 
        onChange = {(event) => {
          setAntiguedad(event.target.value);
        }}
        type="number"></input></label>

        <button className="btn-registrar" onClick={add}>Registrar</button>  
      </div>

      <div className="lista">
        <button className="btn btn-success" onClick={getEmpleados}>Consultar</button>

        {
          empleadosList.map((empleado) => {
            return <div key={empleado.ID} className=""> {empleado.NAME}</div>
          })
        }
      </div>
    </div>
  );
}

export default App;
