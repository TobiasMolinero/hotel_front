/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import {useState, useEffect} from 'react';
import estilos from '../../css/modules/modal.module.css';
import { logout } from '../../constants/functions';
import { useNavigate } from 'react-router-dom';
import { success, warning } from '../../constants/alerts.js';

const ModalEditUsuario = ({
    cerrarModal,
    idUsuario
}) => {

    const navigate = useNavigate();
    const token = localStorage.getItem('token');

    const [usuario, setUsuario] = useState('');
    const [empleado, setEmpleado] = useState(0);
    const [tipoUsuario, setTipoUsuario] = useState(0);

    const [listaTipoUsuario, setListaTipoUsuario] = useState([]);
    const [listaEmpleado, setListaEmpleado] = useState([]);

    const getUsuario = async() => {
        try {
           const response = await fetch(`http://localhost:3000/usuarios/one/${idUsuario}`, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
           });
           const data = await response.json();
           if(data.alert){
            await warning.fire({
                text: data.alert
            });
            logout();
            navigate('/login');
           } else {
            setUsuario(data[0].usuario);
            setEmpleado(data[0].cod_empleado);
            setTipoUsuario(data[0].id_tipo_usuario);
           }
        } catch (error) {
            alert(error)
        }
    } 

    const editUsuario = async(e) => {
        e.preventDefault();
        try {
            const response = await fetch(`http://localhost:3000/usuarios/edit/${idUsuario}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({
                    usuario: usuario,
                    empleado: empleado,
                    tipo_usuario: tipoUsuario
                })
            })
            const data = await response.json();
            if(data.alert){
                await warning.fire({
                    text: data.alert
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

    const getTipoUsuario = async() => {
        try {
            const response = await fetch('http://localhost:3000/usuarios/tipo-usuario', {
                headers:{
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            })

            let data = await response.json();
            if(data.alert){
                await warning.fire({
                    text: data.alert
                });
                logout();
                navigate('/login');
            } else {
                setListaTipoUsuario(data);
            }
        } catch (error) {
            alert(error);
        }
    }

    const getEmpleados = async() => {
        try {
            const response = await fetch('http://localhost:3000/empleados', {
                headers:{
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            });

            let data = await response.json();
            if(data.alert){
                await warning.fire({
                    text: data.alert
                });
                logout();
                navigate('/login')
            } else {
                setListaEmpleado(data);
            }
        } catch (error) {
            alert(error);
        }
    }

    useEffect(() => {
        getUsuario();
        getTipoUsuario();
        getEmpleados();
    }, [])


  return (
    <div className={estilos.modal}>
      <div className={estilos.contenedor}>
        <div className={estilos.header_modal}>
            <h2>Modificar cliente</h2>
            <i onClick={() => cerrarModal(false)} className='bi bi-x-circle'></i>
        </div>
        <div className={estilos.body_modal}>
            <form onSubmit={editUsuario} className={estilos.form}>

                <div className={estilos.group_input}>
                    <label htmlFor="inputUsuario">Nombre Usuario*</label>
                    <input type="text"
                           id='inputUsuario'
                           value={usuario}
                           onChange={(e)=>
                           setUsuario(e.target.value)}
                           required
                     />
                </div>

                <div className={estilos.group_input}>
                    <label htmlFor='selectEmpleado'>Empleado*</label>
                    <div className={estilos.select_and_plus}>
                        <select id="selectEmpleado" value={empleado} onChange={(e) => setEmpleado(e.target.value)}>
                            <option value='selected'>-- Seleccione empleado --</option>
                            {listaEmpleado.map(i =>
                                <option key={i.cod_empleado} value={i.cod_empleado}>{i.nombre + ' ' + i.apellido}</option>
                            )}
                        </select>
                        <i className='bi bi-plus' title='Añadir nuevo empleado'></i>
                    </div>
                </div>

                <div className={estilos.group_input}>
                    <label htmlFor='selectTipoUsuario'>Tipo Usuario*</label>
                    <select id="selectTipoUsuario"
                            defaultValue={1}
                            onChange={(e) => setTipoUsuario(e.target.value)}>
                        {listaTipoUsuario.map(i =>
                            <option key={i.id_tipo_usuario} value={i.id_tipo_usuario}>{i.descripcion}</option>
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

export default ModalEditUsuario
