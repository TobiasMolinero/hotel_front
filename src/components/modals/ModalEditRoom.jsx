/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import {useState, useEffect} from 'react'
import estilos from '../../css/modules/modal.module.css';
import { useNavigate } from 'react-router-dom';
import { success, warning } from '../../constants/alerts';
import { logout } from '../../constants/functions';

const ModalEditRoom = ({
    idHabitacion, 
    cerrarModal
}) => {

    
    const navigate = useNavigate();
    const token = localStorage.getItem('token');

    const [nroHabitacion, setNroHabitacion] = useState('');
    const [categoria, setCategoria] = useState(0);
    const [piso, setPiso] = useState(0);

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

    const getRoom = async(id) => {
        try {
            const response = await fetch(`http://localhost:3000/habitaciones/select-one/${id}`, {
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
                setNroHabitacion(data[0].nro_habitacion);
                setCategoria(data[0].id_categoria);
                setPiso(data[0].id_piso);
            }
        } catch (error) {
            alert(error);
        }
    }

    const editRoom = async(e) => {
        e.preventDefault();
        try {
            const response = await fetch(`http://localhost:3000/habitaciones/edit/${idHabitacion}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({
                    nro_habitacion: nroHabitacion,
                    categoria: categoria,
                    piso: piso
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
        getCategorias();
        getPisos();
        getRoom(idHabitacion);
    }, [])

  return (
    <div className={estilos.modal}>
    <div className={estilos.contenedor}>
        <div className={estilos.header_modal}>
            <h2>Editar Habitación</h2>
            <i onClick={() => cerrarModal(false)} className='bi bi-x-circle'></i>
        </div>
        <div className={estilos.body_modal}>
            <form onSubmit={editRoom} className={estilos.form}>
                <div className={estilos.group_input}>
                    <label htmlFor="inputNroHabitacion">Nro. Habitación*</label>
                    <input type="text"
                        id='inputNroHabitacion'
                        value={nroHabitacion}
                        onChange={(e) => {setNroHabitacion(e.target.value)}}
                        required
                    />
                </div>

                <div className={estilos.group_input}>
                    <label htmlFor='selectCategoría'>Categoría*</label>
                    <select id="selectCategoría" defaultValue={categoria} 
                            onChange={(e) => {setCategoria(e.target.value)}}>
                        {categorias.map(c =>
                            <option key={c.id_categoria} value={c.id_categoria}>{c.descripcion}</option>
                        )}
                    </select>
                </div>

                <div className={estilos.group_input}>
                    <label htmlFor='selectPiso'>Piso*</label>
                    <select id="selectPiso" defaultValue={piso} 
                            onChange={(e) => {setPiso(e.target.value)}}>
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
                    <button className={estilos.button_add} type='submit'>Modificar</button>
                </div>
            </form>
        </div>
    </div>
</div>
  )
}

export default ModalEditRoom