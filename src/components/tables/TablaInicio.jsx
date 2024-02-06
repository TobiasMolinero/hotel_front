/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import { useState, useEffect } from "react";
import { logout } from "../../constants/functions";
import { useNavigate } from "react-router-dom";
import estilos from '../../css/modules/table.module.css';

const TablaInicio = () => {

  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  const [tabla, setTabla] = useState([]);

  const getData = async() => {

    try {
      const response = await fetch('http://localhost:3000/reservas/proximas', {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      });
      var data = await response.json();
      console.log(data)
    } catch (error) {
      alert(error);
    }

    
    if(data.alert){
      alert(data.alert);
      logout();
      navigate('/login');
    } else {
      setTabla(data.results);
    }
  };


  useEffect(() => {
    getData();
  }, []);


  return (
    <table className={estilos.table}>
      <thead>
        <tr>
          <th>N° Reserva</th>
          <th>Cliente</th>
          <th>N° Habitación</th>
          <th>Categoría</th>
          <th>Piso</th>
          <th>Fecha Ingreso</th>
          <th>Fecha Salida</th>
        </tr>
      </thead>
      <tbody>
        {tabla.length === 0 ? 
          <tr>
            <td colSpan={7}>
              <h2>No hay habitaciones reservadas</h2>
            </td>
          </tr>
          : tabla.map(t => 
            <tr key={t.nro_reserva}>
              <td>{t.nro_reserva}</td>
              <td>{t.nombre}{' '}{t.apellido}</td>
              <td>{t.nro_habitacion}</td>
              <td>{t.categoria}</td>
              <td>{t.piso}</td>
              <td>{t.fecha_entrada.substring(0, 10)}</td>
              <td>{t.fecha_salida.substring(0, 10)}</td>
            </tr>
            )
          }
      </tbody>
    </table>
  )
}

export default TablaInicio
