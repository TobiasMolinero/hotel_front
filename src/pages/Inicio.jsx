/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import Navbar from '../components/Navbar'
import Header from '../components/header';
import CardState from '../components/cards/cardState';
import '../App.css';
import '../css/inicio.css'
import { useState, useEffect } from 'react';

const Inicio = () => {

  const [disponibles, setDisponibles] = useState(0);
  const [reservadas, setReservadas] = useState(0);

  const getCantidades = async() => {
    try {
      const response = await fetch('http://localhost:3000/habitaciones/totales');

      var data = await response.json()

    } catch (error) {
      alert(data.message)
    }

    setDisponibles(data[0].cant);
    setReservadas(data[1].cant);
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
          <CardState backgroundColor={'#006b9c'} title={'Total de habitaciones'} color={'#ddd'} cantidad={disponibles + reservadas}/>
          <CardState backgroundColor={'#005000'} title={'Habitaciones disponibles'} color={'#ddd'} cantidad={disponibles}/>
          <CardState backgroundColor={'#e0000b'} title={'Habitaciones reservadas'} color={'#ddd'} cantidad={reservadas}/>
        </section>
        <div className='grid_inicio'>
          {/* <section className='chart'>
            <h1>hola</h1>
          </section> */}
          <section className='table'>
            <h1>hola</h1>
          </section>
        </div>
      </div>
    </div>
  )
}

export default Inicio
