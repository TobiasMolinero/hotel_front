/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { useState, useEffect } from 'react';
import estilos from '../../css/modules/modal.module.css';
import { useNavigate } from 'react-router-dom';
import { warning } from '../../constants/alerts';
import { logout } from '../../constants/functions';

const ModalAddRoom = ({
    cerrarModal
}) => {

    const navigate = useNavigate();
    const token = localStorage.getItem('token');

    const [nroHabitacion, setNroHabitacion] = useState();
    const [categoria, setCategoria] = useState();
    const [piso, setPiso] = useState();

    const [categorias, setCategorias] = useState([]);
    const [pisos, setPisos] = useState([]);

    const getCategorias = async() => {
        try {
            const response = await fetch('http://localhost:3000/categorias', {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            })
            const data = await response.json();
            console.log(data)
            if(data.alert){
                await warning.fire({
                    text: data.alert
                })
                logout();
                navigate('/login');
            } else {
                setCategorias(data);
            }
        } catch (error) {
            alert(error)
        }
    }

    const getPisos = async() => {
        try {
            const response = await fetch('http://localhost:3000/pisos', {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            })
            const data = await response.json();
            console.log(data)
            if(data.alert){
                await warning.fire({
                    text: data.alert
                })
                logout();
                navigate('/login');
            } else {
                setPisos(data);
            }
        } catch (error) {
            alert(error)
        }
    }

    useEffect(() => {
        getCategorias();
        getPisos();
    }, [])

    return (
        <div className={estilos.modal}>
            <div className={estilos.contenedor}>
                <div className={estilos.header_modal}>
                    <h2>Agregar Habitación</h2>
                    <i onClick={() => cerrarModal(false)} className='bi bi-x-circle'></i>
                </div>
                <div className={estilos.body_modal}>
                    <form className={estilos.form}>
                        <div className={estilos.group_input}>
                            <label htmlFor="inputNroHabitacion">Nro. Habitación*</label>
                            <input type="text"
                                id='inputNroHabitacion'
                                onChange={(e) => {setNroHabitacion(e.target.value)}}
                                required
                            />
                        </div>

                        <div className={estilos.group_input}>
                            <label htmlFor='selectCategoría'>Categoría*</label>
                            <select id="selectCategoría" defaultValue={'selected'} 
                                    onChange={(e) => {setCategoria(e.target.value)}}>
                                <option value="selected">-- SELECCIONE CATEGORÍA --</option>
                                {categorias.map(c =>
                                    <option key={c.id_categoria} value={c.id_categoria}>{c.descripcion}</option>
                                )}
                            </select>
                        </div>

                        <div className={estilos.group_input}>
                            <label htmlFor='selectPiso'>Piso*</label>
                            <select id="selectPiso" defaultValue={'selected'} 
                                    onChange={(e) => {setPiso(e.target.value)}}>
                                <option value="selected">-- SELECCIONE UN PISO --</option>
                                {pisos.map(p =>
                                    <option key={p.id_piso} value={p.id_piso}>{p.descripcion}</option>
                                )}
                            </select>
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

export default ModalAddRoom
