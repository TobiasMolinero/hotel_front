/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { useState, useEffect } from "react";
import estilos from '../../css/modules/buttonAdd.module.css';

const ButtonAdd = ({
    text,
    abrirModal
}) => {

  

  return (
    <>
        <button onClick={() => abrirModal(true)} className={estilos.button}>{text}</button>
    </>
  )
}

export default ButtonAdd
