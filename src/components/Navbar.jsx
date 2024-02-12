/* eslint-disable no-unused-vars */
import estilos from '../css/modules/navbar.module.css';
import logo from '../assets/logo_hotel_blanco-sin_bg.png';
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';

const Navbar = () => {


  const [userType, setUserType] = useState();

  const getUserData = () => {
    const data = JSON.parse(localStorage.getItem('userData'));
    setUserType(data.descripcion);
  }

  useEffect(() => {
    getUserData();
  }, [])

  return (
    <nav className={estilos.navbar}>
      <div className={estilos.container_logo}>
        <img src={logo} alt="logo hotel" />
      </div>
      <hr />
      <div className="container_menu">
        <ul className="menu">
          <li>
            <Link to={'/app/inicio'} className={estilos.link}>
              <i className='bi bi-house-door-fill'></i>Inicio
            </Link>
          </li>
          <li>
            <Link to={'/app/reservas'} className={estilos.link}>
              <i className='bi bi-calendar3'></i>Reservas
            </Link>
          </li>
          <li>
            <Link to={'/app/recepcion'} className={estilos.link}>
              <i className="bi bi-box-arrow-in-right"></i>Recepción
            </Link>
          </li>
          <li>
            <Link className={estilos.link}>
              <i className="bi bi-basket3-fill"></i>Punto de venta
            </Link>
          </li>
          <li>
            <Link className={estilos.link}>
              <i className="bi bi-box-arrow-right"></i>Verificación de salidas
            </Link>
          </li>
          <li>
            <Link to={'/app/clientes'} className={estilos.link}>
              <i className='bi bi-people-fill'></i>Clientes
            </Link>
          </li>
          {/* <li hidden={userType === 'empleado' ? true : false}>
            <Link className={estilos.link}>
              <i className="bi bi-file-earmark-spreadsheet"></i>Reportes
            </Link>
          </li> */}
          <li hidden={userType === 'empleado' ? true : false}>
            <Link to={'/app/usuarios'} className={estilos.link}>
              <i className='bi bi-person-fill-gear'></i>Usuarios
            </Link>
          </li>
          <li hidden={userType === 'empleado' ? true : false}>
            <Link to={'/app/configuracion'} className={estilos.link}>
              <i className='bi bi-gear-fill'></i>Configuración
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  )
}

export default Navbar
