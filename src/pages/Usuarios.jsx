/* eslint-disable no-unused-vars */
import { useState } from 'react';
import '../App.css';
import '../css/usuarios.css';
import Navbar from '../components/Navbar';
import Header from '../components/Header';
import ButtonAdd from '../components/buttons/ButtonAdd';
import TablaUsuarios from '../components/tables/TablaUsuarios';
import ModalAddUsuario from '../components/modals/ModalAddUsuario';

const Usuarios = () => {

  const[modalAdd, setModalAdd] = useState();
  const [modalEdit, setModalEdit] = useState();
  const [idUsuario, setIdUsuario] = useState();

  const abrirModal = (value) => {
    setModalAdd(value);
  }

  const cerrarModal = (value) => {
    setModalAdd(value);
  }

  const abrirModalEdit = (id, value) => {
    setIdUsuario(id);
    setModalEdit(value);
  } 

  const cerrarModalEdit = (value) => {
    setModalEdit(value);
  }

  return (
    <div className="app">
      <Navbar />
      {modalAdd ? <ModalAddUsuario cerrarModal={cerrarModal}/> : ''}
      <div className="content usuarios">
        <Header nombreIcono={'bi bi-person-fill-gear'} title={'Usuarios del sistema'}/>
        <div className="display_usuarios">
          <div className="container_button">
            <ButtonAdd abrirModal={abrirModal} text={'Registrar Usuario'}/>
          </div>
          <div className="container_tabla">
            <TablaUsuarios abrirModalEdit={abrirModalEdit} modalAdd={modalAdd} modalEdit={modalEdit}/>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Usuarios
