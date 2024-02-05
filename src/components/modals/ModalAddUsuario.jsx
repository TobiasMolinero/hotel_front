/* eslint-disable react/prop-types */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import {useState, useEffect} from 'react';
import { logout } from '../../constants/functions';
import { useNavigate } from 'react-router-dom';
import estilos from '../../css/modules/modal.module.css';


const ModalAddUsuario = ({
    cerrarModal, 
}) => {

    const navigate = useNavigate();
    const token = localStorage.getItem('token');

    const [usuario, setUsuario] = useState();
    const [clave, setClave] = useState();
    const [empleado, setEmpleado] = useState();
    const [tipoUsuario, setTipoUsuario] = useState();

    const [listaTipoUsuario, setListaTipoUsuario] = useState([]);
    const [listaEmpleado, setListaEmpleado] = useState([]);


    const addUsuario = async() => {
        try {
            const response = await fetch('http://localhost:3000/usuarios/create-user', {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({
                    usuario: usuario,
                    clave: clave,
                    cod_empleado: empleado,
                    id_tipo_usuario: tipoUsuario
                })
            }); 
            let data = await response.json();
            if(data.alert){
                alert(data.alert);
                logout();
                navigate('/login');
            } else {
                alert(data.message);
            }
        } catch (error) {
            alert();
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
                alert(data.alert);
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
            console.log(data)
            if(data.alert){
                alert(data.alert);
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
        getTipoUsuario();
        getEmpleados();
    }, [])


  return (
    <div className={estilos.modal}>
      <div className={estilos.contenedor}>
        <div className={estilos.header_modal}>
            <h2>Agregar cliente</h2>
            <i onClick={() => cerrarModal(false)} className='bi bi-x-circle'></i>
        </div>
        <div className={estilos.body_modal}>
            <form onSubmit={addUsuario} className={estilos.form}>

                <div className={estilos.group_input}>
                    <label htmlFor="inputUsuario">Nombre Usuario*</label>
                    <input type="text"
                           id='inputUsuario'
                           onChange={(e)=> 
                           setUsuario(e.target.value)} 
                           required
                     />
                </div>

                <div className={estilos.group_input}>
                    <label htmlFor="inputClave">Clave*</label>
                    <input type="text"
                           id='inputClave'
                           onChange={(e)=> 
                           setClave(e.target.value)} 
                           required
                     />
                </div>

                <div className={estilos.group_input}>
                    <label htmlFor='selectEmpleado'>Empleado*</label>
                    <select id="selectEmpleado" 
                            defaultValue={1}
                            onChange={(e) => setEmpleado(e.target.value)}>
                        {listaEmpleado.map(i => 
                            <option key={i.cod_empleado} value={i.cod_empleado}>{i.nombre + ' ' + i.apellido}</option>    
                        )}
                    </select>
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
                    <button className={estilos.button_add} type='submit'>Agregar</button>
                </div>
            </form>
        </div>
      </div>
    </div>
  )
}

export default ModalAddUsuario
