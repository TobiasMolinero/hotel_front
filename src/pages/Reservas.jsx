/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import Header from "../components/Header";
import Navbar from "../components/Navbar";
import { Calendar, dayjsLocalizer } from "react-big-calendar";
import 'react-big-calendar/lib/css/react-big-calendar.css';
import dayjs from "dayjs";
import '../App.css';
import '../css/reservas.css';
import { useState, useEffect } from "react";
import { logout } from "../constants/functions";
import { useNavigate } from "react-router-dom";

const Reservas = () => {

  const localizer = dayjsLocalizer(dayjs);
  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  const [data, setData] = useState([]);
  const [reservas, setReservas] = useState();

  const getReservas = async() => {
    try {
      const response = await fetch('http://localhost:3000/reservas', {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      });
      var data = await response.json();
    } catch (error) {
      alert(error);
    }

    if(data.alert){
      alert(data.alert);
      logout();
      navigate('/login');
    } else {
      setData(data.results);
    }  
  };

  const dibujarCalendario = () => {
      let listaReservas = []
      data.forEach(element => {
        listaReservas.push({
          start: dayjs(element.fecha_entrada).toDate(),
          end: dayjs(element.fecha_salida).toDate(),
          title: `Hab. ${element.nro_habitacion} - ${element.categoria}, ${element.nombre + ' ' + 
                  element.apellido}, DNI: ${element.nro_documento}`
        })
      });
      setReservas(listaReservas);
  };

  useEffect(() => {
    getReservas([]);
  }, []);

  useEffect(() => {
    dibujarCalendario();
  }, [data])

  return (
    <div className="app">
      <Navbar />
      <div className="content reservas">
        <Header nombreIcono={'bi-calendar3'} title={'Reservas'}/>
        <div className="display_reservas">
          <div className="container_calendar">
            <Calendar 
              localizer={localizer} 
              events={reservas}
              views={["month", "week"]}
              style={{
                fontSize: "1.4rem",
              }}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Reservas