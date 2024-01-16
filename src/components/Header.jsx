/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import estilos from '../css/modules/header.module.css'

const Header = ({
    nombreIcono,
    title
}) => {
  return (
    <header className={estilos.header}>
        <h2><i className={`bi ${nombreIcono}`}></i>{title}</h2>
    </header>
  )
}

export default Header
