/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { useState, useEffect } from "react";
import estilos from '../../css/modules/buttonAdd.module.css';

const ButtonAdd = ({
    text
}) => {
  return (
    <>
        <button className={estilos.button}>{text}</button>
    </>
  )
}

export default ButtonAdd
