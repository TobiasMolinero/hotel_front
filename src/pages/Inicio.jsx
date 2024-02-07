/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import Navbar from '../components/Navbar'
import Header from '../components/Header';
import CardState from '../components/cards/cardState';
import TablaInicio from '../components/tables/TablaInicio';
import '../App.css';
import '../css/inicio.css'

const Inicio = () => {
  
  return (
    <div className='app'>
      <Navbar />
      <div className="content inicio">
        <Header nombreIcono={'bi-house-door-fill'} title={'Inicio'}/>
        <section className='cards_room'>
          <CardState backgroundColor={'#006e00'} title={'Habitaciones disponibles'} color={'#ebebeb'} estado={'disponible'}/>
          <CardState backgroundColor={'#001e86'} title={'Habitaciones reservadas'} color={'#ebebeb'} estado={'reservado'}/>
          <CardState backgroundColor={'#006b9c'} title={'Habitaciones en limpieza'} color={'#ebebeb'} estado={'limpieza'}/>
          <CardState backgroundColor={'#ee0410'} title={'Habitaciones ocupadas'} color={'#ebebeb'} estado={'ocupado'}/>
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
