/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import {useState, useEffect} from 'react';
import estilos from '../../css/modules/modal.module.css';

const ModalEditCliente = ({
    cerrarModalEdit,
    id
}) => {
  return (
    <div className={estilos.modal}>
      <div className={estilos.contenedor}>
        <div className={estilos.header_modal}>
            <h2>Modificar cliente</h2>
            <i onClick={() => cerrarModalEdit(false)} className='bi bi-x-circle'></i>
        </div>
        <div className={estilos.body_modal}>
            <form action="" className={estilos.form}>
                <div className={estilos.group_input}>
                    <label htmlFor="inputNombre">Nombre</label>
                    <input type="text" id='inputNombre' required/>
                </div>
                <div className={estilos.group_input}>
                    <label htmlFor="inputApellido">Apellido</label>
                    <input type="text" id='inputApellido' required/>
                </div>
                <div className={estilos.group_input}>
                    <label htmlFor='selectTipoDocumento'>Tipo documento</label>
                    <select id="selectTipoDocumento" defaultValue='selected'>
                        <option value="selected" >-- SELECCIONE UNA OPCION --</option>
                    </select>
                </div>
                <div className={estilos.group_input}>
                    <label htmlFor="inputDocumento">N° Documento</label>
                    <input type="text" pattern="[0-9]+" id='inputDocumento' required/>
                </div>
                <div className={estilos.group_input}>
                    <label htmlFor="inputTelefono">Telefono</label>
                    <input type="text" pattern="[0-9]+" id='inputTelefono' required/>
                </div>
                <div className={estilos.group_input}>
                    <label htmlFor="inputMail">Mail</label>
                    <input type="email" id="inputMail" required/>
                </div>
                <div className={estilos.buttons}>
                    <button className={estilos.button_cancel} onClick={() => cerrarModalEdit(false)} type='button'>Cancelar</button>
                    <button className={estilos.button_add} type='submit'>Modificar</button>
                </div>
            </form>
        </div>
      </div>
    </div>
  )
}

export default ModalEditCliente
