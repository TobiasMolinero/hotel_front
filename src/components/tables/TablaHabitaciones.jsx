/* eslint-disable react/prop-types */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import { useState, useEffect } from 'react';
import estilos from '../../css/modules/table.module.css';
import { logout } from '../../constants/functions';
import { useNavigate } from 'react-router-dom';
import { warning } from '../../constants/alerts';


const TablaHabitaciones = ({
    abrirModalEdit,
    modalAdd,
    modalEdit
}) => {

    const navigate = useNavigate();
    const token = localStorage.getItem('token');

    const [data, setData] = useState([]);

    const getData = async() => {
        try {
            const response = await fetch('http://localhost:3000/habitaciones', {
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
                setData(data);
            }
            
        } catch (error) {
            alert(error);
        }
    }

    useEffect(() => {
        getData();
    }, [])

    useEffect(() => {
        getData();
    }, [modalAdd, modalEdit])

    return (
        <table className={estilos.table}>
            <thead>
                <tr>
                    <th>Nro. Habitación</th>
                    <th>Categoría</th>
                    <th>Piso</th>
                    <th>Precio</th>
                    <th>Acciones</th>
                </tr>
            </thead>
            <tbody>
                {data.length === 0 ? 
                    <tr>
                        <td colSpan={5}>
                            <h2>No hay habitaciones registradas</h2>
                        </td>
                    </tr>
                    :
                    data.map(i => 
                        <tr key={i.id_habitacion}>
                            <td>{i.nro_habitacion}</td>
                            <td>{i.categoria}</td>
                            <td>{i.piso}</td>
                            <td>{i.precio}</td>
                            <td className={estilos.column_action}>
                                <button onClick={() => abrirModalEdit(i.id_habitacion, true)} className={estilos.button_edit}>
                                    <i className='bi bi-pencil-square'></i>
                                </button>
                                <button className={estilos.button_delete}>
                                    <i className='bi bi-trash-fill'></i>
                                </button>
                            </td>
                        </tr>    
                    )
                }
            </tbody>
        </table>
    )
}

export default TablaHabitaciones
