/* eslint-disable no-unused-vars */
import Header from "../components/Header";
import Navbar from "../components/Navbar";
import '../App.css';
import { Link } from "react-router-dom";
import ButtonAdd from "../components/buttons/ButtonAdd";
import TablaHabitaciones from "../components/tables/TablaHabitaciones";
import { useState } from "react";
import ModalAddRoom from "../components/modals/ModalAddRoom";

const ConfigRoom = () => {

    const [modalAdd, setModalAdd] = useState(false);
    const [modalEdit, setModalEdit] = useState(false);
    const [idHabitacion, setIdHabitacion] = useState();

    const abrirModalAdd = (value) => {
        setModalAdd(value)
    }

    const cerrarModalAdd = (value) => {
        setModalAdd(value)
    }

    const abrirModalEdit = (id, value) => {
        setIdHabitacion(id)
    }

    const cerrarModalEdit = (value) => {

    }

  return (
    <div className="app">
        <Navbar />
        {modalAdd ? <ModalAddRoom cerrarModal={cerrarModalAdd}/> : ''}
        <div className="content">
            <Header nombreIcono={'bi bi-gear-fill'} title={'Configuración/Habitaciones'} />
            <div className="display_configuracion_habitaciones">
                <Link to={'/app/configuracion'} style={{fontSize: '1.4rem'}}>
                    <i className="bi bi-arrow-left"></i> Volver atras
                </Link>
                <div className="container_button">
                    <ButtonAdd abrirModal={abrirModalAdd} text={'Agregar Habitación'}/>
                </div>
                <div className="container_table">
                    <TablaHabitaciones />
                </div>
            </div>
        </div>
    </div>
  )
}

export default ConfigRoom
