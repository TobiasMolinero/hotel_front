/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { useState, useEffect } from 'react'
import estilos from '../../css/modules/modal.module.css';
import { useNavigate } from 'react-router-dom';
import { success, warning } from '../../constants/alerts';
import { logout } from '../../constants/functions';

const ModalAddPiso = ({
    cerrarModal
}) => {

    const navigate = useNavigate();
    const token = localStorage.getItem('token');

    const [descripcion, setDescripcion] = useState();

    const addPiso = async(e) => {
        e.preventDefault();
        try {
            const response = await fetch('http://localhost:3000/pisos/add', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({
                    descripcion: descripcion,
                })
            });
            let data = await response.json();
            if(data.alert){
                await warning.fire({
                    title: data.alert
                });
                logout();
                navigate('/login');
            } else {
                await success.fire({
                    text: data.message
                });
                cerrarModal(false);
            }
        } catch (error) {
            alert(error);
        }
    }

    return (
        <div className={estilos.modal}>
        <div className={estilos.contenedor}>
            <div className={estilos.header_modal}>
                <h2>Agregar Nivel</h2>
                <i onClick={() => cerrarModal(false)} className='bi bi-x-circle'></i>
            </div>
            <div className={estilos.body_modal}>
                <form onSubmit={addPiso} className={estilos.form}>
                    <div className={estilos.group_input}>
                        <label htmlFor="inputNivel">Descripcion nivel*</label>
                        <input type="text"
                            id='inputNivel'
                            onChange={(e) => {setDescripcion(e.target.value)}}
                            required
                        />
                    </div>
    
                    <p>* Campos obligatorios.</p>
    
                    <div className={estilos.buttons}>
                        <button className={estilos.button_cancel}
                            onClick={() => cerrarModal(false)}
                            type='button'>Cancelar</button>
                        <button className={estilos.button_add} type='submit'>Agregar</button>
                    </div>
                </form>
            </div>
        </div>
    </div>
    )
}

export default ModalAddPiso