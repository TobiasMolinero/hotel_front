/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import { useState, useEffect } from "react";
import '../App.css';
import '../css/recepcion.css';
import {logout} from '../constants/functions';
import Navbar from "../components/Navbar";
import Header from '../components/Header';
import CardRoom from "../components/cards/CardRoom";
import { useNavigate } from "react-router-dom";


const Recepcion = () => {

  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  const [data, setData] = useState([]);

  const getHabitaciones = async() => {
    try {
      const response = await fetch('http://localhost:3000/habitaciones', {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      });
      var data = await response.json();
    } catch (error) {
      alert(error);
    }

    if(data.message){
      alert(data.message);
      logout();
      navigate('/login');
    } else {
      setData(data);
    }  
  }

  useEffect(() => {
    getHabitaciones();
  }, [])

  return (
    <div className="app">
      <Navbar />
      <div className="content recepcion">
        <Header nombreIcono={'bi bi-box-arrow-in-right'} title={'Recepción'}/>
        <div className="display_recepcion">
          <div className="menu_recepcion">
            <ul>
              <li>Ver todo</li>
              <li>Nivel 1</li>
              <li>Nivel 2</li>
              <li>Nivel 3</li>
            </ul>
          </div>
          <div className="container_cards">
            {data ? data.map(h => 
              <CardRoom key={h.id_habitacion}
                        nroHabitacion={h.nro_habitacion}
                        categoria={h.categoria}
                        estado={h.estado_habitacion}
              />                        
            ) 
            
            : <h2>Ocurrio un error al cargar las habitaciones.</h2>}

          </div>
        </div>
      </div>
    </div>
  )
}

export default Recepcion
