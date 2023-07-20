import './App.css';
import { useState } from 'react';
import axios from 'axios';

function App() {

  const [nombre,setNombre] = useState("");
  const [edad,setEdad] = useState(0);
  const [pais,setPais] = useState("");
  const [cargo,setCargo] = useState("");
  const [antiguedad,setAntiguedad] = useState(0);

  const add = () => {
    axios.post('http://localhost:3001/create', {
      nombre: nombre,
      edad: edad,
      pais: pais,
      cargo: cargo,
      antiguedad: antiguedad
    }).then(() => {
      alert.log("Success");
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
    </div>
  );
}

export default App;
