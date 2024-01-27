/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import {useState, useEffect} from 'react';
import estilos from  '../../css/modules/modal.module.css';
import ModalAddCliente from './ModalAddCliente';
import { logout } from '../../constants/functions';
import { useNavigate } from 'react-router-dom';

const ModalAddReserva = ({
    cerrarModal
}) => {

  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  const [modalCliente, setModalCliente] = useState();

  const [listaClientes, setListaClientes] = useState([]);
  const [listaHabitaciones, setListaHabitaciones] = useState([]);

  const [cliente, setCliente] = useState('selected');
  const [habitacion, setHabitacion] = useState('selected');
  const [fechaEntrada, setFechaEntrada] = useState();
  const [fechaSalida, setFechaSalida] = useState();
  const [observaciones, setObservaciones] = useState();

  const abrirModalCliente = () => {
    setModalCliente(true);
  }

  const cerrarModalCliente = (value) => {
    setModalCliente(value);
  }

  const getClientes = async() => {
    try {
      const response = await fetch('http://localhost:3000/clientes', {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      });

      var data = await response.json();
    } catch (error){
      alert(error);
    }

    if(data.alert){
      alert(data.alert);
      logout();
      navigate('/login');
    } else {
      setListaClientes(data);
    }
  }

  const getHabitaciones = async() => {
    try {
      const response = await fetch('http://localhost:3000/habitaciones', {
        headers: {
          'Content-Type': 'application/json',
          'Authorization':`Bearer ${token}` 
        }
      });

      var data = await response.json();
    } catch (error) {
      alert(error)
    }

    if(data.alert){
      alert(data.alert);
      logout();
      navigate('/login');
    } else {
      setListaHabitaciones(data);
    }
  }

  const addReserva = async(e) => {
    e.preventDefault();
    if(cliente === 'selected' && habitacion === 'selected'){
      alert('Debe seleccionar una habitacion y un cliente.')
    } else {
      try {
        const response = await fetch('http://localhost:3000/reservas/add', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
          body: JSON.stringify({
            cliente: cliente,
            habitacion: habitacion,
            fecha_entrada: fechaEntrada,
            fecha_salida: fechaSalida,
            observaciones: observaciones
          })
        });
  
        var data = await response.json();
  
      } catch (error) {
        alert(error)
      }
  
      if(data.alert){
        alert(data.alert);
        logout();
        navigate('/login');
      } else {
        alert(data.message);
        cerrarModal(false);
      }
    }

  }


  useEffect(() => {
    getClientes();
    getHabitaciones();
  }, [])

  useEffect(() => {
    getClientes();
  }, [modalCliente])


  return (
    <div className={estilos.modal}>
      {modalCliente ? <ModalAddCliente cerrarModal={cerrarModalCliente}/> : ''}
      <div className={estilos.contenedor}>
        <div className={estilos.header_modal}>
            <h2>Agregar Reserva</h2>
            <i onClick={() => cerrarModal(false)} className='bi bi-x-circle'></i>
        </div>
        <div className={estilos.body_modal}>
            <form onSubmit={addReserva} className={estilos.form}>

                <div className={estilos.group_input}>
                  <label htmlFor="selectCliente">Huesped*</label>
                  <div className={estilos.select_cliente}>
                    <select id="selectCliente" onChange={(e) => setCliente(e.target.value)}>
                      <option value='selected'>-- Seleccione el huesped --</option>
                      {listaClientes.map(c => 
                        <option key={c.id_cliente} value={c.id_cliente}>{c.nombre + ' ' + c.apellido}</option>  
                      )}
                    </select>
                    <i className='bi bi-plus' onClick={abrirModalCliente} title='Añadir un nuevo cliente'></i>
                  </div>
                </div>
                <div className={estilos.group_input}>
                  <label htmlFor="selectHabitacion">Habitación*</label>
                  <select id="selectHabitacion" onChange={(e) => setHabitacion(e.target.value)}>
                    <option value="selected">-- Seleccione la habitación --</option>
                    {listaHabitaciones.map(h => 
                      <option key={h.id_habitacion} value={h.id_habitacion}>{h.nro_habitacion} - {h.categoria}</option>  
                    )}
                  </select>
                </div>
                <div className={estilos.group_input}>
                  <label htmlFor="inputFechaEntrada">Fecha de entrada*</label>
                  <input type="date" id="inputFechaEntrada" onChange={(e) => setFechaEntrada(e.target.value)} required />
                </div>
                <div className={estilos.group_input}>
                  <label htmlFor="inputFechaSalida">Fecha de salida*</label>
                  <input type="date" id="inputFechaSalida" onChange={(e) => setFechaSalida(e.target.value)} required />
                </div>

                <div className={estilos.group_input}>
                  <label htmlFor="inputObs">Observaciones</label>
                  <textarea id="inputObs" onChange={(e) => setObservaciones(e.target.value)} rows={5}/>
                </div>
                <p>* Campos obligatorios.</p>
                <div className={estilos.buttons}>
                    <button className={estilos.button_cancel} 
                            onClick={() => cerrarModal(false)} 
                            type='button'>Cancelar</button>
                    <button className={estilos.button_add} type='submit'>Agregar</button>
                </div>
            </form>
        </div>
      </div>
    </div>
  )
}

export default ModalAddReserva
