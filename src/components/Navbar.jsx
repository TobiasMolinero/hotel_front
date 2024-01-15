/* eslint-disable no-unused-vars */
import estilos from '../css/navbar.module.css';
import logo from '../assets/logo_hotel_blanco-sin_bg.png'

const Navbar = () => {
  return (
    <nav className={estilos.navbar}>
      <div className={estilos.container_logo}>
        <img src={logo} alt="logo hotel" />
        {/* <h3>HOTEL</h3> */}
      </div>
      <hr />
      <div className={estilos.container_user}>
        <i className='bi bi-person-circle'></i>Usuario
      </div>
      <hr />
      <div className="container_menu">
        <ul className="menu">
          <li>
            <i className='bi bi-house-door-fill'></i>Inicio
          </li>
          <li>
            <i className='bi bi-calendar3'></i>Reservas
          </li>
          <li>
            <i className="bi bi-box-arrow-in-right"></i>Recepción
          </li>
          <li>
            <i className="bi bi-basket3-fill"></i>Punto de venta
          </li>
          <li>
            <i className="bi bi-box-arrow-right"></i>Verificación de salidas
          </li>
          <li>
            <i className='bi bi-people-fill'></i>Clientes
          </li>
          <li>
            <i className="bi bi-file-earmark-spreadsheet"></i>Reportes
          </li>
          <li>
            <i className='bi bi-person-fill-gear'></i>Usuarios
          </li>
          <li>
            <i className='bi bi-gear-fill'></i>Configuración
          </li>
        </ul>
      </div>
    </nav>
  )
}

export default Navbar
