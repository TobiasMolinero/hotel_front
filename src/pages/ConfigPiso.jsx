/* eslint-disable no-unused-vars */
import Header from "../components/Header";
import Navbar from "../components/Navbar";
import '../App.css';
import { Link } from "react-router-dom";
import ButtonAdd from "../components/buttons/ButtonAdd";
import { useState } from "react";
import ModalAddPiso from "../components/modals/ModalAddPiso";
import ModalEditPiso from "../components/modals/ModalEditPiso";
import TablaPisos from "../components/tables/TablaPisos";

const ConfigPiso = () => {

    const [modalAdd, setModalAdd] = useState(false);
    const [modalEdit, setModalEdit] = useState(false);
    const [idPiso, setIdPiso] = useState();

    const abrirModalAdd = (value) => {
        setModalAdd(value)
    }

    const cerrarModalAdd = (value) => {
        setModalAdd(value)
    }

    const abrirModalEdit = (id, value) => {
        setIdPiso(id);
        setModalEdit(value);
    }

    const cerrarModalEdit = (value) => {
        setModalEdit(value);
    }


  return (
    <div className="app">
    <Navbar />
    {modalAdd ? <ModalAddPiso cerrarModal={cerrarModalAdd}/> : ''}
    {modalEdit ? <ModalEditPiso idPiso={idPiso} cerrarModal={cerrarModalEdit}/> : ''}
    <div className="content">
        <Header nombreIcono={'bi bi-gear-fill'} title={'Configuración/Pisos'} />
        <div className="display_configuracion_habitaciones">
            <Link to={'/app/configuracion'} style={{fontSize: '1.4rem'}}>
                <i className="bi bi-arrow-left"></i> Volver atras
            </Link>
            <div className="container_button">
                <ButtonAdd abrirModal={abrirModalAdd} text={'Agregar Nivel'}/>
            </div>
            <div className="container_table">
                <TablaPisos abrirModalEdit={abrirModalEdit} modalAdd={modalAdd} modalEdit={modalEdit}/>
            </div>
        </div>
    </div>
</div>
  )
}

export default ConfigPiso