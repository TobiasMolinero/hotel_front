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
            if(data.alert){
                alert(data.alert);
                logout();
                navigate('/login');
            } else {
                setReserva(data);
            }
        } catch (error) {
            alert(error)
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
                    {reserva.map(i => 
                        <div key={i.nro_reserva}>
                            <h2>Datos del cliente</h2>
                            <div className={estilos.group_data}>
                                <h4>Nombre completo: </h4>
                                <p>{i.nombre + ' ' + i.apellido}</p>
                            </div>
                            <div className={estilos.group_data}>
                                <h4>Nro. Documento: </h4>
                                <p>{i.nro_documento}</p>
                            </div>
                            <div className={estilos.group_data}>
                                <h4>Nro. Telefono: </h4>
                                <p>{i.nro_telefono}</p>
                            </div>
                            <div className={estilos.group_data}>
                                <h4>Correo Electronico: </h4>
                                <p>{i.correo_electronico}</p>
                            </div>
                        </div>
                    )}
                </div>
                <div className={estilos.datos_habitacion}>
                    {reserva.map(i => 
                        <div key={i.nro_reserva}>
                            <h2>Datos de la reserva</h2>
                            <div className={estilos.group_data}>
                                <h4>Nro. Habitación: </h4>
                                <p>{i.nro_habitacion}</p>
                            </div>
                            <div className={estilos.group_data}>
                                <h4>Categoría: </h4>
                                <p>{i.categoria}</p>
                            </div>
                            <div className={estilos.group_data}>
                                <h4>Piso: </h4>
                                <p>{i.piso}</p>
                            </div>
                            <div className={estilos.group_data}>
                                <h4>Precio Habitación: </h4>
                                <p>$ {i.precio}</p>
                            </div>
                            <div className={estilos.group_data}>
                                <h4>Días de estadía: </h4>
                                <p>{i.dias_reserva} días.</p>
                            </div>
                            <div className={estilos.group_data}>
                                <h4>Importe Total: </h4>
                                <p>$ {i.precio * i.dias_reserva}</p>
                            </div>
                            <div className={estilos.group_data}>
                                <h4>Fecha entrada: </h4>
                                <p>{i.fecha_entrada.substring(0, 10)}</p>
                            </div>
                            <div className={estilos.group_data}>
                                <h4>Fecha salida: </h4>
                                <p>{i.fecha_salida.substring(0, 10)}</p>
                            </div>
                            <div className={estilos.group_data}>
                                <h4>Observaciones: </h4>
                                <p>{i.observaciones}</p>
                            </div>
                        </div>    
                    )}

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
