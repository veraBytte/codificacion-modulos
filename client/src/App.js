import './App.css';
import { useState } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

const noti = withReactContent(Swal)

function App() {

  const [nombre, setNombre] = useState("");
  const [edad, setEdad] = useState(0);
  const [pais, setPais] = useState("");
  const [cargo, setCargo] = useState("");
  const [antiguedad, setAntiguedad] = useState(0);
  const [id, setId] = useState(0);
  const [editar, setEditar] = useState(false);

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
      limpiarCampos();

      noti.fire({
        tittle: <strong>Registro exitoso</strong>,
        html: <p>El empleado <b>{nombre}</b> ha sido registrado correctamente</p>,
        icon: "success",
        timer:3000
      });
    }).catch((err) => {
      noti.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Sucedio un error al eliminar el empleado',
        footer: JSON.parse(JSON.stringify(err)).message === 'Network Error'?"Error de conexion":"Error desconocido"
      })
    })
  }

  const update = () => {
    axios.put('http://localhost:3001/update', {
      id: id,
      nombre: nombre,
      edad: edad,
      pais: pais,
      cargo: cargo,
      antiguedad: antiguedad
    }).then(() => {
      getEmpleados();
      limpiarCampos();
      noti.fire({
        tittle: <strong>Actualizacion Exitosa</strong>,
        html: <p>El empleado <b>{nombre}</b> fue actualizado correctamente</p>,
        icon: "success",
        timer:3000
      });
    })
  }

  const deleteEmpleado = (val) => {

    noti.fire({
      title: 'Estas seguro de realizar esta accion?',
      // text: "No podras revertir esta accion",
      html: <p>Deseas eliminar el empleado <b>{val.NAME}</b></p>,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si deseo eliminarlo'
    }).then((result) => {
      if (result.isConfirmed) {
        axios.delete(`http://localhost:3001/delete/${val.ID}`).then(() => {
          getEmpleados();
          limpiarCampos();
          noti.fire({
            title:'Eliminado!',
            text:`El empleado ${val.NAME}`,
            icon:'success',
            timer:3000
          });
        }).catch((err) => {
          noti.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Sucedio un error al eliminar el empleado',
            footer: JSON.parse(JSON.stringify(err)).message === 'Network Error'?"Error de conexion":"Error desconocido"
          })
        });
      }
    })
  }

  const editarEmpleado = (empleado) => {
    setEditar(true);
    setNombre(empleado.NAME);
    setEdad(empleado.EDAD);
    setCargo(empleado.CARGO);
    setPais(empleado.PAIS);
    setAntiguedad(empleado.ANTIGUEDAD);
    setId(empleado.ID);
  }

  function limpiarCampos() {
    setNombre("");
    setEdad(0);
    setPais("");
    setCargo("");
    setAntiguedad(0);
    setId(0);

    setEditar(false);
  }

  const getEmpleados = () => {
    axios.get('http://localhost:3001/empleados').then((response) => {
      console.log(setEmpleados(response.data));
      console.log(empleadosList);
    });
  }

  return (
    <div className="container">

      <div className="card text-center">
        <div className="card-header">
          Gestion Empleados
        </div>

        <div className="card-body">

          <div className="input-group mb-3">
            <span className="input-group-text" id="basic-addon1">Nombre</span>
            <input type="text" value={nombre}
              onChange={(event) => {
                setNombre(event.target.value);
              }}
              className="form-control" placeholder="Nombre" aria-label="Username" aria-describedby="basic-addon1" />
          </div>

          <div className="input-group mb-3">
            <span className="input-group-text" id="basic-addon1">Edad</span>
            <input type="number" value={edad}
              onChange={(event) => {
                setEdad(event.target.value);
              }}
              className="form-control" placeholder="Edad" aria-label="Username" aria-describedby="basic-addon1" />
          </div>

          <div className="input-group mb-3">
            <span className="input-group-text" id="basic-addon1">Pais</span>
            <input type="text" value={pais}
              onChange={(event) => {
                setPais(event.target.value);
              }}
              className="form-control" placeholder="Pais" aria-label="Username" aria-describedby="basic-addon1" />
          </div>

          <div className="input-group mb-3">
            <span className="input-group-text" id="basic-addon1">Cargo</span>
            <input type="text" value={cargo}
              onChange={(event) => {
                setCargo(event.target.value);
              }}
              className="form-control" placeholder="Cargo ocupacional" aria-label="Username" aria-describedby="basic-addon1" />
          </div>

          <div className="input-group mb-3">
            <span className="input-group-text" id="basic-addon1">Antiguedad</span>
            <input type="number" value={antiguedad}
              onChange={(event) => {
                setAntiguedad(event.target.value);
              }}
              className="form-control" placeholder="Antiguedad" aria-label="Username" aria-describedby="basic-addon1" />
          </div>

        </div>

        <div className="card-footer text-body-secondary">
          {
            editar ?
              <div class="btn-group" role="group" aria-label="Basic mixed styles example">
                <button className="btn btn-warning m-2" onClick={update}>Actualizar</button>
                <button type="button" className="btn btn-danger m-2" onClick={limpiarCampos}>Cancelar</button>
              </div>
              : <button className="btn btn-success" onClick={add}>Registrar</button>
          }
        </div>
      </div>


      <table className="table table-striped table-hover">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Nombre</th>
            <th scope="col">Edad</th>
            <th scope="col">Pais</th>
            <th scope="col">Cargo</th>
            <th scope="col">Antiguedad</th>
            <th scope="col">Acciones</th>
          </tr>
        </thead>

        <tbody>

          {
            empleadosList.map((empleado) => {
              return <tr key={empleado.ID}>
                <th scope="row">{empleado.ID}</th>
                <td>{empleado.NAME}</td>
                <td>{empleado.EDAD}</td>
                <td>{empleado.PAIS}</td>
                <td>{empleado.CARGO}</td>
                <td>{empleado.ANTIGUEDAD}</td>
                <td>
                  <div className="btn-group" role="group" aria-label="Basic mixed styles example">
                    <button type="button"
                      onClick={() => {
                        editarEmpleado(empleado);
                      }}
                      className="btn btn-warning">Editar</button>

                    <button type="button"
                      onClick={() => {
                        deleteEmpleado(empleado);
                      }}
                    className="btn btn-danger">Eliminar</button>
                  </div>
                </td>
              </tr>


              // <div key={empleado.ID} className=""> </div>
            })
          }

        </tbody>
      </table>

      <button className="btn btn-success" onClick={getEmpleados}>Consultar</button>


    </div>
  );
}

export default App;
