/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import {useState, useEffect} from 'react';
import { logout } from '../../constants/functions';
import { useNavigate } from 'react-router-dom';
import estilos from '../../css/modules/modal.module.css';


const ModalDetalleReserva = ({
    cerrarModal,
    nroReserva
}) => {

    const navigate = useNavigate();
    const token = localStorage.getItem('token');

    const [reserva, setReserva] = useState([]);

    const getReserva = async() => {
        try {
            const response = await fetch(`http://localhost:3000/reservas/one/${nroReserva}`, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            });
            var data = await response.json();
            console.log(data)
        } catch (error) {
            alert(error)
        }

        if(data.alert){
            alert(data.alert);
            logout();
            navigate('/login');
        } else {
            setReserva(data);
        }
    }

    useEffect(() => {
        getReserva();
    }, [])


  return (
    <div className={estilos.modal}>
      <div className={estilos.contenedor}>
        <div className={estilos.header_modal}>
            <h2>Detalle Reserva</h2>
            <i onClick={() => cerrarModal(false)} className='bi bi-x-circle'></i>
        </div>
        <div className={estilos.body_modal}>
            <div className={estilos.datos}>
                <div className={estilos.datos_cliente}>
                    <h2>Datos del cliente</h2>
                    <h4>Nombre completo</h4>
                </div>
                <div className={estilos.datos_habitacion}>
                    <h2>Datos de la habitación</h2>

                </div>
            </div>
            <div className={estilos.buttons}>
            <button className={estilos.button_cancel} 
                            onClick={() => cerrarModal(false)} 
                            type='button'>Cancelar</button>
            <button className={estilos.button_add} type='button'>Modificar</button>
            </div>
        </div>
      </div>
    </div>
  )
}

export default ModalDetalleReserva
