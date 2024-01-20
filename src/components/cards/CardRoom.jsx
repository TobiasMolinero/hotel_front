/* eslint-disable no-unused-vars */
import { useState } from "react";
import { Link } from "react-router-dom";
import estilos from '../../css/modules/cardRoom.module.css';
import cama from '../../assets/iconos/cama.png';

const CardRoom = () => {
  return (
    <div className={estilos.card}>
        <div className={estilos.info}>
            <h3>102</h3>
            <p>Categoria</p>
        </div>
        <div className={estilos.img}>
          <img src={cama} alt="icono" />
        </div>
        <div className={estilos.footer}>
            <p>
                <Link className={estilos.link}>Estado</Link>
            </p>
        </div>
    </div>
  )
}

export default CardRoom
