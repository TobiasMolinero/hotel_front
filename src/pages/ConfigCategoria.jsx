/* eslint-disable no-unused-vars */
import Header from "../components/Header";
import Navbar from "../components/Navbar";
import '../App.css';
import { Link } from "react-router-dom";
import ButtonAdd from "../components/buttons/ButtonAdd";
import { useState } from "react";
import TablaCategorias from "../components/tables/TablaCategorias";
import ModalAddCategoria from "../components/modals/ModalAddCategoria";
import ModalEditCategoria from "../components/modals/ModalEditCategoria";

const ConfigCategoria = () => {

    const [modalAdd, setModalAdd] = useState(false);
    const [modalEdit, setModalEdit] = useState(false);
    const [idCategoria, setIdCategoria] = useState();

    const abrirModalAdd = (value) => {
        setModalAdd(value)
    }

    const cerrarModalAdd = (value) => {
        setModalAdd(value)
    }

    const abrirModalEdit = (id, value) => {
        setIdCategoria(id);
        setModalEdit(value);
    }

    const cerrarModalEdit = (value) => {
        setModalEdit(value);
    }
    
  return (
    <div className="app">
    <Navbar />
    {modalAdd ? <ModalAddCategoria cerrarModal={cerrarModalAdd}/> : ''}
    {modalEdit ? <ModalEditCategoria idCategoria={idCategoria} cerrarModal={cerrarModalEdit}/> : ''}
    <div className="content">
        <Header nombreIcono={'bi bi-gear-fill'} title={'Configuración/Categorias'} />
        <div className="display_configuracion_habitaciones">
            <Link to={'/app/configuracion'} style={{fontSize: '1.4rem'}}>
                <i className="bi bi-arrow-left"></i> Volver atras
            </Link>
            <div className="container_button">
                <ButtonAdd abrirModal={abrirModalAdd} text={'Agregar Categoria'}/>
            </div>
            <div className="container_table">
                <TablaCategorias abrirModalEdit={abrirModalEdit} modalAdd={modalAdd} modalEdit={modalEdit}/>
            </div>
        </div>
    </div>
</div>
  )
}

export default ConfigCategoria