/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import {useState, useEffect} from 'react';
import estilos from '../../css/modules/modal.module.css';
import { logout } from '../../constants/functions';
import { useNavigate } from 'react-router-dom';
import { success, warning } from '../../constants/alerts';

const ModalAddCliente = ({
    cerrarModal
}) => {

    const navigate = useNavigate();
    const token = localStorage.getItem('token');


    const [nombre, setNombre] = useState('');
    const [apellido, setApellido] = useState('');
    const [tipoDocumento, setTipoDocumento] = useState(1);
    const [nroDocumento, setNroDocumento] = useState('');
    const [telefono, setTelefono] = useState('');
    const [mail, setMail] = useState('');

    const [listaTipoDocumento, setListaTipoDocumento] = useState([])



    const addCliente = async(e) => {
        e.preventDefault();
        try {
            const response = await fetch('http://localhost:3000/clientes/add', {
                method: "POST",
                headers: {
                    "Content-Type": 'application/json',
                    'Accept': 'application/json',
                    "Authorization": `Bearer ${token}`
                },
                body : JSON.stringify({
                    nombre: nombre,
                    apellido: apellido,
                    tipoDocumento: tipoDocumento,
                    nroDocumento: nroDocumento,
                    telefono: telefono,
                    mail: mail
                })
            })
            var data = await response.json();
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


    const getTipoDocumento = async() => {
        try {
            const response = await fetch('http://localhost:3000/clientes/tiposDocumento',{
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            })
            var data = await response.json();
            if(data.alert){
                await warning.fire({
                    text: data.alert
                });
                logout();
                navigate('/login');
            } else {
                setListaTipoDocumento(data);
                setTipoDocumento(data[0].id_tipo_documento)
            }
        } catch (error) {
            alert(error);
        }
    }



    useEffect(() => {
        getTipoDocumento();
    }, [])


  return (
    <div className={estilos.modal}>
      <div className={estilos.contenedor}>
        <div className={estilos.header_modal}>
            <h2>Agregar cliente</h2>
            <i onClick={() => cerrarModal(false)} className='bi bi-x-circle'></i>
        </div>
        <div className={estilos.body_modal}>
            <form onSubmit={addCliente} className={estilos.form}>

                <div className={estilos.group_input}>
                    <label htmlFor="inputNombre">Nombre*</label>
                    <input type="text"
                           id='inputNombre' 
                           onChange={(e)=> 
                           setNombre(e.target.value)} 
                           required
                     />
                </div>

                <div className={estilos.group_input}>
                    <label htmlFor="inputApellido">Apellido*</label>
                    <input type="text" 
                           id='inputApellido' 
                           onChange={(e)=> setApellido(e.target.value)} 
                           required
                    />
                </div>

                <div className={estilos.group_input}>
                    <label htmlFor='selectTipoDocumento'>Tipo documento*</label>
                    <select id="selectTipoDocumento" 
                            defaultValue={1}
                            onChange={(e) => setTipoDocumento(e.target.value)}>
                        {listaTipoDocumento.map(i => 
                            <option key={i.id_tipo_documento} value={i.id_tipo_documento}>{i.descripcion}</option>    
                        )}
                    </select>
                </div>

                <div className={estilos.group_input}>
                    <label htmlFor="inputDocumento">N° Documento*</label>
                    <input type="text" 
                           pattern="[0-9]+" 
                           id='inputDocumento' 
                           onChange={(e)=> setNroDocumento(e.target.value)} 
                           required
                    />
                </div>

                <div className={estilos.group_input}>
                    <label htmlFor="inputTelefono">Telefono*</label>
                    <input type="text"
                           pattern="[0-9]+" 
                           id='inputTelefono'
                           onChange={(e)=> setTelefono(e.target.value)} 
                           required
                    />
                </div>

                <div className={estilos.group_input}>
                    <label htmlFor="inputMail">Mail*</label>
                    <input type="email" 
                           id="inputMail" 
                           onChange={(e)=> 
                           setMail(e.target.value)} 
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

export default ModalAddCliente
