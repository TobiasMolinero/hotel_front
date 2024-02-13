/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { useState, useEffect } from 'react'
import estilos from '../../css/modules/modal.module.css';
import { useNavigate } from 'react-router-dom';
import { success, warning } from '../../constants/alerts';
import { logout } from '../../constants/functions';

const ModalEditPiso = ({
    idPiso,
    cerrarModal
}) => {

    const navigate = useNavigate();
    const token = localStorage.getItem('token');

    const [descripcion, setDescripcion] = useState('');

    const getPiso = async(id) => {
        try {
            const response = await fetch(`http://localhost:3000/pisos/one/${id}`, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            })
            const data = await response.json();
            if(data.alert){
                await warning.fire({
                    text: data.alert
                })
                logout();
                navigate('/login');
            } else {
                setDescripcion(data[0].descripcion);
            }
        } catch (error) {
            alert(error);
        }
    }

    const editPiso = async(e) => {
        e.preventDefault();
        try {
            const response = await fetch(`http://localhost:3000/pisos/edit/${idPiso}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({
                    descripcion: descripcion,
                })
            });
            const data = await response.json();
            if(data.alert){
                await warning.fire({
                    text: data.alert
                })
                logout();
                navigate('/login');
            } else {
                await success.fire({
                    text: data.message
                })
                cerrarModal(false);
            }
        } catch (error) {
            alert(error);
        }
    }

    useEffect(() => {
        getPiso(idPiso);
    }, [])

    return (
        <div className={estilos.modal}>
            <div className={estilos.contenedor}>
                <div className={estilos.header_modal}>
                    <h2>Editar Nivel</h2>
                    <i onClick={() => cerrarModal(false)} className='bi bi-x-circle'></i>
                </div>
                <div className={estilos.body_modal}>
                    <form onSubmit={editPiso} className={estilos.form}>
                        <div className={estilos.group_input}>
                            <label htmlFor="inputDescripcion">Descripción categoría*</label>
                            <input type="text"
                                id='inputDescripcion'
                                value={descripcion}
                                onChange={(e) => { setDescripcion(e.target.value) }}
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

export default ModalEditPiso