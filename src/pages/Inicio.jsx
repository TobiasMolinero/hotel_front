/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import Navbar from '../components/Navbar'
import Header from '../components/header';
import CardState from '../components/cards/cardState';
import TablaInicio from '../components/tables/TablaInicio';
import '../App.css';
import '../css/inicio.css'
import { useState, useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import { logout } from '../constants/functions';

const Inicio = () => {

  const navigate = useNavigate();

  const token = localStorage.getItem('token');

  const [disponibles, setDisponibles] = useState(0);
  const [reservadas, setReservadas] = useState(0);

  const getCantidades = async() => {
    try {
      const response = await fetch('http://localhost:3000/habitaciones/totales', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      });

      var data = await response.json();

      if(data.message){
        alert(data.message);
        logout();
        navigate('/login');
      } else {
        setDisponibles(data[0].cant);
        setReservadas(data[1].cant);
      }

    } catch (error) {
      alert(error.message);
    
    }

  }

  useEffect(()=> {
    getCantidades()
  }, [])
  
  return (
    <div className='app'>
      <Navbar />
      <div className="content inicio">
        <Header nombreIcono={'bi-house-door-fill'} title={'Inicio'}/>
        <section className='cards_room'>
          <CardState backgroundColor={'#006b9c'} title={'Total de habitaciones'} color={'#ebebeb'} cantidad={disponibles + reservadas}/>
          <CardState backgroundColor={'#006e00'} title={'Habitaciones disponibles'} color={'#ebebeb'} cantidad={disponibles}/>
          <CardState backgroundColor={'#ee0410'} title={'Habitaciones reservadas'} color={'#ebebeb'} cantidad={reservadas}/>
        </section>
        <h2 className='title_table'>Reservas</h2>
        <div className='grid_inicio'>
          <section className='table'>
            <TablaInicio />
          </section>
        </div>
      </div>
    </div>
  )
}

export default Inicio
