/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import estilos from '../../css/modules/cardRoom.module.css';
import cama from '../../assets/iconos/cama.png';
import reloj from '../../assets/iconos/reloj.png';
import basura from '../../assets/iconos/basura.png';
import calendario from '../../assets/iconos/calendario.png'

const CardRoom = ({
  nroHabitacion,
  categoria,
  estado,
}) => {


  const [background, setBackground] = useState();
  const [footerCard, setFooterCard] = useState();
  const [icono, setIcono] = useState();


  const setColorCard = () => {

    const colores = {
      background: {
        azul: '#006b9c',
        verde: '#006e00',
        rojo: '#ee0410',
        azul2: '#001e86'
      },
      footer: {
        azul: '#004a6d',
        verde: '#004d00',
        rojo: '#af030c',
        azul2: '#030056'
      }
    }
  
    if(estado === 'Disponible'){
      setBackground(colores.background.verde);
      setFooterCard(colores.footer.verde);
    } else if(estado === 'Ocupado'){
      setBackground(colores.background.rojo);
      setFooterCard(colores.footer.rojo);
    } else if(estado === 'Limpieza'){
      setBackground(colores.background.azul);
      setFooterCard(colores.footer.azul);
    } else if(estado === 'Reservado'){
      setBackground(colores.background.azul2);
      setFooterCard(colores.footer.azul2);
    }
  }

  const setIconoCard = () => {
    if(estado === 'Disponible'){
      setIcono(cama);
    } else if(estado === 'Ocupado'){
      setIcono(reloj);
    } else if(estado === 'Limpieza'){
      setIcono(basura);
    } else if(estado === 'Reservado'){
      setIcono(calendario);
    }
  }

  useEffect(() => {
    setColorCard();
    setIconoCard();
  }, [])

  return (
    <div className={estilos.card} style={{backgroundColor: background}}>
        <div className={estilos.info}>
            <h3>{nroHabitacion}</h3>
            <p>{categoria}</p>
        </div>
        <div className={estilos.img}>
          <img src={icono} alt="icono" />
        </div>
        <div className={estilos.footer} style={{backgroundColor: footerCard}}>
            <p>
                <Link className={estilos.link}>{estado}<i className="bi bi-arrow-right-circle-fill" style={{marginLeft: '5px'}}></i></Link>
            </p>
        </div>
    </div>
  )
}

export default CardRoom
