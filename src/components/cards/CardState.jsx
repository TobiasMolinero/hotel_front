/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import estilos from '../../css/modules/card.module.css';
import cama from '../../assets/iconos/cama.svg';
import reloj from '../../assets/iconos/reloj.png';
import basura from '../../assets/iconos/basura.png';
import calendario from '../../assets/iconos/calendario.png'
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { logout } from '../../constants/functions';
import { warning } from '../../constants/alerts';

const CardState = ({
  backgroundColor,
  title,
  color,
  estado
}) => {

  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  const [icono, setIcono] = useState();

  const [cantidad, setCantidad] = useState();

  const setIconoCard = () => {
    if(estado === 'disponible'){
      setIcono(cama);
    } else if(estado === 'limpieza'){
      setIcono(basura);
    } else if(estado === 'ocupado'){
      setIcono(reloj);
    } else if(estado === 'reservado'){
      setIcono(calendario);
    }
  }

  const getCantidad = async() => {
    let idEstado;
    if(estado === 'disponible'){
      setIcono(cama);
      idEstado = 1;
    } else if(estado === 'limpieza'){
      setIcono(basura);
      idEstado = 2;
    } else if(estado === 'ocupado'){
      setIcono(reloj);
      idEstado = 3;
    } else if(estado === 'reservado'){
      setIcono(calendario);
      idEstado = 4;
    }

    try {
      const response = await fetch(`http://localhost:3000/habitaciones/total/${idEstado}`, {
        headers: {
          'Content-type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      });
      const data = await response.json();
      if(data.alert){
        await warning.fire({
          text: data.alert
        });
        logout();
        navigate('/login');
      } else {
        setCantidad(data.cant);
      }
    } catch (error) {
      alert(error);
    }
  }

  useEffect(() => {
    setIconoCard();
  }, [])

  useEffect(() => {
    getCantidad();
  }, [])


  return (
    <div className={estilos.card} style={{backgroundColor: backgroundColor, color: color}}>
        <div className={estilos.info}>
            <h3>{title}</h3>
            <p>{cantidad}</p>
        </div>
        <div className={estilos.img}>
          <img src={icono} alt="icono" />
        </div>
    </div>
  )
}

export default CardState;
