/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
import { useState } from "react";
import Navbar from "../components/Navbar";
import Header from "../components/Header";
import '../App.css';
import '../css/clientes.css';
import TablaClientes from "../components/tables/TablaClientes";
import ButtonAdd from "../components/buttons/ButtonAdd";
import ModalAddCliente from "../components/modals/ModalAddCliente";
import ModalEditCliente from "../components/modals/ModalEditCliente";

const Clientes = () => {

  const[modalAdd, setModalAdd] = useState();
  const[modalEdit, setModalEdit] = useState();
  const[idCliente, setIdCliente] = useState();

  const abrirModal = (value) => {
    setModalAdd(value);
  }

  const cerrarModal = (value) => {
    setModalAdd(value);
  }

  const abrirModalEdit = (id, value) => {
    setIdCliente(id);
    setModalEdit(value);
  } 

  const cerrarModalEdit = (value) => {
    setModalEdit(value);
  }

  return (
    <div className="app">
      <Navbar />
      {modalAdd ? <ModalAddCliente cerrarModal={cerrarModal}/> : ''}
      {modalEdit ? <ModalEditCliente cerrarModalEdit={cerrarModalEdit} id={idCliente}/> : ''}
      <div className="content clientes">
        <Header nombreIcono={'bi bi-people-fill'} title={'Clientes'}/>
        <div className="display_clientes">
            <div className="container_button">
                <ButtonAdd text={'Agregar cliente'} abrirModal={abrirModal}/> 
            </div>
            <div className="container_table">
                <TablaClientes abrirModalEdit={abrirModalEdit} modalAdd={modalAdd} modalEdit={modalEdit}/>
            </div>
        </div>
      </div>
    </div>
  )
}

export default Clientes
