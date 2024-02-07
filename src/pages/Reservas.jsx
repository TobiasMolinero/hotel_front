/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import Header from "../components/Header";
import Navbar from "../components/Navbar";
import { Calendar, dayjsLocalizer } from "react-big-calendar";
import 'react-big-calendar/lib/css/react-big-calendar.css';
import dayjs from "dayjs";
import 'dayjs/locale/es'
import '../App.css';
import '../css/reservas.css';
import { useState, useEffect } from "react";
import { logout } from "../constants/functions";
import { useNavigate } from "react-router-dom";
import ButtonAdd from "../components/buttons/ButtonAdd";
import ModalAddReserva from "../components/modals/ModalAddReserva";
import ModalDetalleReserva from "../components/modals/ModalDetalleReserva";
import { warning } from "../constants/alerts";

dayjs.locale('es');

const Reservas = () => {

  const localizer = dayjsLocalizer(dayjs);
  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  const [data, setData] = useState([]);
  const [reservas, setReservas] = useState();
  const [nroReserva, setNroReserva] = useState();

  const [modalAdd, setModalAdd] = useState(false);
  const [modalDetalle, setModalDetalle] = useState(false);


  const abrirModal = (value) => {
    setModalAdd(value);
  }

  const cerrarModal = (value) => {
    setModalAdd(value);
  }

  const abrirModalDetalle = () => {
    setModalDetalle(true)
  }

  const cerrarModalDetalle = (value) => {
    setModalDetalle(value)
  }

  const getReservas = async() => {
    try {
      const response = await fetch('http://localhost:3000/reservas', {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      });
      var data = await response.json();
      if(data.alert){
        await warning.fire({
          text: data.alert
        });
        logout();
        navigate('/login');
      } else {
        setData(data.results);
      }  
    } catch (error) {
      alert(error);
    }
  };

  const dibujarCalendario = () => {
      let listaReservas = []
      data.forEach(element => {
        listaReservas.push({
          start: dayjs(element.fecha_entrada).toDate(),
          end: dayjs(element.fecha_salida).toDate(),
          title: `Hab. ${element.nro_habitacion} - ${element.categoria}, ${element.nombre + ' ' + 
                  element.apellido}, DNI: ${element.nro_documento}`,
          nro_reserva: element.nro_reserva
        })
      });
      setReservas(listaReservas);
  };

  const eventStyleGetter = (event) => {
    let style = {
      backgroundColor: '#12020', // color por defecto para eventos
    };
    
    if (event.start < new Date() && event.end > new Date()) {
      style.backgroundColor = 'green'; // Cambia el color para eventos pasados
    }

    if (event.start < new Date() && event.end < new Date()) {
      style.backgroundColor = 'gray'; // Cambia el color para eventos pasados
    }

    return {
      style: style
    };
  }

  const onDoubleClickEvent = (evento) => {
    setNroReserva(evento.nro_reserva);
    abrirModalDetalle();
  }

  useEffect(() => {
    getReservas();
  }, []);

  useEffect(() => {
    getReservas();
  }, [modalAdd])

  useEffect(() => {
    dibujarCalendario();
  }, [data])

  return (
    <div className="app">
      <Navbar />
      {modalAdd ? <ModalAddReserva cerrarModal={cerrarModal}/> : ''}
      {modalDetalle ? <ModalDetalleReserva cerrarModal={cerrarModalDetalle} nroReserva={nroReserva}/> : ''}
      <div className="content reservas">
        <Header nombreIcono={'bi-calendar3'} title={'Reservas'}/>
        <div className="display_reservas">
          <div className="container_button">
            <ButtonAdd abrirModal={abrirModal} text={'Agregar Reserva'}/>
          </div>
          <div className="container_calendar">
            <Calendar 
              localizer={localizer} 
              events={reservas}
              views={["month", "week"]}
              style={{
                fontSize: "1.4rem",
              }}
              eventPropGetter={eventStyleGetter}
              popup={true}
              onDoubleClickEvent={onDoubleClickEvent}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Reservas