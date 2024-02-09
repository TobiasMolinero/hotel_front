/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
import { useState, useEffect } from 'react';
import estilos from '../../css/modules/modal.module.css';
import { useNavigate } from 'react-router-dom';
import { logout } from '../../constants/functions.js'
import { error, warning, success } from '../../constants/alerts.js';

const ModalChangePassword = ({
    cerrarModal,
    idUsuario
}) => {

    const navigate = useNavigate();
    const token = localStorage.getItem('token'); 

    const [clave, setClave] = useState();
    const [nuevaClave, setNuevaClave] = useState();

    const editPassword = async(e) => {
        e.preventDefault();
        try {
            const response = await fetch(`http://localhost:3000/usuarios/edit-password/${idUsuario}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({
                    clave: clave,
                    nuevaClave: nuevaClave
                })
            })
            const data = await response.json();
            if(data.alert){
                await warning.fire({
                    text: data.alert
                })
                logout();
                navigate('/login');
            } else if(data.error){
                await error.fire({
                    text: data.error
                })
            } else {
                await success.fire({
                    text: data.message
                })
                cerrarModal(true);
            }
        } catch (error) {
            alert(error);
        }
    }

  return (
    <div className={estilos.modal}>
      <div className={estilos.contenedor}>
        <div className={estilos.header_modal}>
            <h2>Cambiar clave</h2>
            <i onClick={() => cerrarModal(false)} className='bi bi-x-circle'></i>
        </div>
        <div className={estilos.body_modal}>
            <form onSubmit={editPassword} className={estilos.form}>

                <div className={estilos.group_input}>
                    <label htmlFor="inputClaveAnterior">Ingrese contraseña anterior*</label>
                    <input type="text"
                           id='inputClaveAnterior'
                           onChange={(e) => {setClave(e.target.value)}}
                           required
                     />
                </div>

                <div className={estilos.group_input}>
                    <label htmlFor="inputNuevaClave">Nueva contraseña*</label>
                    <input type="text" 
                           id='inputNuevaClave' 
                           onChange={(e) => {setNuevaClave(e.target.value)}} 
                           required
                    />
                </div>
                
                <p>* Campos obligatorios.</p>

                <div className={estilos.buttons}>
                    <button className={estilos.button_cancel} 
                            onClick={() => cerrarModal(false)} 
                            type='button'>Cancelar</button>
                    <button className={estilos.button_add} type='submit'>Modificar</button>
                </div>
            </form>
        </div>
      </div>
    </div>
  )
}

export default ModalChangePassword
