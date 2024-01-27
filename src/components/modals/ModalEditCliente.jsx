/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import {useState, useEffect, useRef} from 'react';
import estilos from '../../css/modules/modal.module.css';
import { logout } from '../../constants/functions';
import { useNavigate } from 'react-router-dom';

const ModalEditCliente = ({
    cerrarModalEdit,
    idCliente
}) => {

    const navigate = useNavigate();
    const token = localStorage.getItem('token');

    const [nombre, setNombre] = useState('');
    const [apellido, setApellido] = useState('');
    const [tipoDocumento, setTipoDocumento] = useState(1);
    const [nroDocumento, setNroDocumento] = useState('');
    const [telefono, setTelefono] = useState('');
    const [mail, setMail] = useState('');

    const [listaTipoDocumento, setListaTipoDocumento] = useState([]);

    const getCliente = async() => {
        try {
            const response = await fetch(`http://localhost:3000/clientes/one/${idCliente}`, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            });
            const data = await response.json();
            if(data.alert){
                alert(data.alert);
                logout();
                navigate('/login');
            } else {
                setNombre(data[0].nombre);
                setApellido(data[0].apellido);
                setTipoDocumento(data[0].id_tipo_documento);
                setNroDocumento(data[0].nro_documento);
                setTelefono(data[0].nro_telefono);
                setMail(data[0].correo_electronico);
            }
        } catch (error) {
            alert(error);
        }
    }

    const getTipoDocumento = async() => {
        try {
            const response = await fetch('http://localhost:3000/clientes/tiposDocumento',{
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            })
    
            var data = await response.json();
        } catch (error) {
            alert(error);
        }

        if(data.alert){
            alert(data.alert);
            logout();
            navigate('/login');
        } else {
            setListaTipoDocumento(data);
            setTipoDocumento(data[0].id_tipo_documento)
        }
    }

    const editCliente = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(`http://localhost:3000/clientes/edit/${idCliente}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({
                    nombre: nombre,
                    apellido: apellido,
                    tipoDocumento: tipoDocumento,
                    nroDocumento: nroDocumento,
                    telefono: telefono,
                    mail: mail
                })
            });
            var data = await response.json();
            console.log(data)
        } catch (error) {
            alert(error);
        }
        if(data.alert){
            alert(data.alert);
            logout();
            navigate('/login');
        } else {
            alert(data.message);
            cerrarModalEdit(false);
        }
    }

    useEffect(() => {
        getTipoDocumento();
    }, [])

    useEffect(() => {
        getCliente();
    }, [])

  return (
    <div className={estilos.modal}>
      <div className={estilos.contenedor}>
        <div className={estilos.header_modal}>
            <h2>Modificar cliente</h2>
            <i onClick={() => cerrarModalEdit(false)} className='bi bi-x-circle'></i>
        </div>
        <div className={estilos.body_modal}>
            <form onSubmit={editCliente} className={estilos.form}>
                <div className={estilos.group_input}>
                    <label htmlFor="inputNombre">Nombre*</label>
                    <input 
                        defaultValue={nombre} 
                        type="text" 
                        id='inputNombre'
                        onChange={(e) => {setNombre(e.target.value)}}
                        required
                    />
                </div>
                <div className={estilos.group_input}>
                    <label htmlFor="inputApellido">Apellido*</label>
                    <input 
                        defaultValue={apellido} 
                        type="text" 
                        id='inputApellido' 
                        onChange={(e) => {setApellido(e.target.value)}}
                        required
                    />
                </div>
                <div className={estilos.group_input}>
                    <label htmlFor='selectTipoDocumento'>Tipo documento*</label>
                    <select value={tipoDocumento} id="selectTipoDocumento" onChange={(e) => {setTipoDocumento(e.target.value)}}>
                    {listaTipoDocumento.map(i => 
                            <option key={i.id_tipo_documento} value={i.id_tipo_documento}>{i.descripcion}</option>    
                        )}
                    </select>
                </div>
                <div className={estilos.group_input}>
                    <label htmlFor="inputDocumento">N° Documento*</label>
                    <input 
                        defaultValue={nroDocumento} 
                        type="text" 
                        pattern="[0-9]+" 
                        id='inputDocumento' 
                        onChange={(e) => {setNroDocumento(e.target.value)}}
                        required
                    />
                </div>
                <div className={estilos.group_input}>
                    <label htmlFor="inputTelefono">Telefono*</label>
                    <input 
                        defaultValue={telefono} 
                        type="text" 
                        pattern="[0-9]+" 
                        id='inputTelefono' 
                        onChange={(e) => {setTelefono(e.target.value)}}
                        required
                    />
                </div>
                <div className={estilos.group_input}>
                    <label htmlFor="inputMail">Mail*</label>
                    <input 
                        defaultValue={mail} 
                        type="email" 
                        id="inputMail" 
                        onChange={(e) => {setMail(e.target.value)}}
                        required
                    />
                </div>
                <p>* Campos obligatorios.</p>
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
