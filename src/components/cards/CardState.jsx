/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import cama from '../../assets/iconos/cama.png'
import estilos from '../../css/modules/card.module.css'


const CardState = ({
  backgroundColor,
  title,
  cantidad,
  color
  
}) => {
  return (
    <div className={estilos.card} style={{backgroundColor: backgroundColor, color: color}}>
        <div className={estilos.info}>
            <h3>{title}</h3>
            <p>{cantidad}</p>
        </div>
        <div className={estilos.img}>
          <img src={cama} alt="icono" />
        </div>
    </div>
  )
}

export default CardState;
