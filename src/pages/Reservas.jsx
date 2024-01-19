import Header from "../components/Header";
import Navbar from "../components/Navbar";
import { Calendar, dayjsLocalizer } from "react-big-calendar";
import 'react-big-calendar/lib/css/react-big-calendar.css';
import dayjs from "dayjs";
import '../App.css';
import '../css/reservas.css';
import { useState, useEffect } from "react";

const Reservas = () => {

  const localizer = dayjsLocalizer(dayjs);

  const token = localStorage.getItem('token');

  const [reservas, setReservas] = useState([]);

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

    if(data.message){
      alert(data.message);
      logout();
      navigate('/login');
    } else {
      setReservas(data.results);
    }  
  };

  const events = [{
    start: dayjs('2024-01-18T23:00:00').toDate(),
    end: dayjs('2024-01-20T14:00:00').toDate(),
    title: 'Caconaaaa'
  }]

  useEffect(() => {
    getReservas();
  }, []);

  return (
    <div className="app">
      <Navbar />
      <div className="content reservas">
        <Header nombreIcono={'bi-calendar3'} title={'Reservas'}/>
        <div className="display">
          <div className="container_calendar">
            <Calendar 
              localizer={localizer} 
              events={events}
              views={["month"]}
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