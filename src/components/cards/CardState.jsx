/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import estilos from '../../css/modules/card.module.css';
import cama from '../../assets/iconos/cama.svg';
import reloj from '../../assets/iconos/reloj.png';
import basura from '../../assets/iconos/basura.png';
import calendario from '../../assets/iconos/calendario.png'
import { useEffect, useState } from 'react';

const CardState = ({
  backgroundColor,
  title,
  cantidad,
  color,
  estado
}) => {

  const [icono, setIcono] = useState();

  const setIconoCard = () => {
    if(estado === 'disponible'){
      setIcono(cama);
    } else if(estado === 'ocupado'){
      setIcono(reloj);
    } else if(estado === 'limpieza'){
      setIcono(basura);
    } else if(estado === 'reservado'){
      setIcono(calendario);
    }
  }

  useEffect(() => {
    setIconoCard();
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
