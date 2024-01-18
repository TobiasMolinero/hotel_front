/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import estilos from '../css/modules/header.module.css'
import { useState, useEffect, useCallback } from 'react';
import { logout } from '../constants/functions';
import { useNavigate } from 'react-router-dom';

const Header = ({
    nombreIcono,
    title
}) => {

  const navigate = useNavigate();

  const [userData, setUserData] = useState();
  const [dropDown, setDropDown] = useState(false);

  const getUserData = () => {
    setUserData(JSON.parse(localStorage.getItem('userData')));
  }
  
  const showHiddenDropDown = useCallback(() => {
    dropDown ? setDropDown(false) : setDropDown(true);
  })

  const cerrarSesion = () => {
    logout();
    navigate('/login');
    alert('Sesión cerrada');
  }

  useEffect(() => {
    getUserData()
  }, [])


  return (
    <header className={estilos.header}>
      <div >
        <p onClick={showHiddenDropDown}>
          {userData ? userData.nombre + ' ' + userData.apellido : ''}
          <i className='bi bi-person-circle'></i>
        </p>
        <ul hidden={dropDown ? false : true}>
          <li onClick={cerrarSesion} title='Cerrar sesión'>
            <i className='bi bi-box-arrow-right'></i>Cerrar sesión
          </li>
        </ul>
      </div>
      <h2><i className={`bi ${nombreIcono}`}></i>{title}</h2>
    </header>
  )
}

export default Header
