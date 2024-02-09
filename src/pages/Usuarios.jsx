/* eslint-disable no-unused-vars */
import { useState } from 'react';
import '../App.css';
import '../css/usuarios.css';
import Navbar from '../components/Navbar';
import Header from '../components/Header';
import ButtonAdd from '../components/buttons/ButtonAdd';
import TablaUsuarios from '../components/tables/TablaUsuarios';
import ModalAddUsuario from '../components/modals/ModalAddUsuario';
import ModalEditUsuario from '../components/modals/ModalEditUsuario';
import ModalChangePassword from '../components/modals/ModalChangePassword';

const Usuarios = () => {

  const[modalAdd, setModalAdd] = useState();
  const [modalEdit, setModalEdit] = useState();
  const [modalPassword, setModalPassword] = useState();
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

  const abrirModalPassword = (id, value) => {{
    setIdUsuario(id);
    setModalPassword(value);
  }}

  const cerrarModalPassword = (value) => {
    setModalPassword(value);
  }

  return (
    <div className="app">
      <Navbar />
      {modalAdd ? <ModalAddUsuario cerrarModal={cerrarModal}/> : ''}
      {modalEdit ? <ModalEditUsuario cerrarModal={cerrarModalEdit} idUsuario={idUsuario}/> : ''}
      {modalPassword ? <ModalChangePassword cerrarModal={cerrarModalPassword} idUsuario={idUsuario}/> : ''}
      <div className="content usuarios">
        <Header nombreIcono={'bi bi-person-fill-gear'} title={'Usuarios del sistema'}/>
        <div className="display_usuarios">
          <div className="container_button">
            <ButtonAdd abrirModal={abrirModal} text={'Registrar Usuario'}/>
          </div>
          <div className="container_tabla">
            <TablaUsuarios abrirModalEdit={abrirModalEdit} 
                           abrirModalPassword={abrirModalPassword} 
                           modalAdd={modalAdd} 
                           modalEdit={modalEdit}
                           modalPassword={modalPassword}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Usuarios
