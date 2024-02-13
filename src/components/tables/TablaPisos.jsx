/* eslint-disable react/prop-types */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import { useState, useEffect } from 'react';
import estilos from '../../css/modules/table.module.css';
import { logout } from '../../constants/functions';
import { useNavigate } from 'react-router-dom';
import { warning, confirmar, success } from '../../constants/alerts';

const TablaPisos = ({
    abrirModalEdit,
    modalAdd,
    modalEdit
}) => {

    const navigate = useNavigate();
    const token = localStorage.getItem('token');

    const [data, setData] = useState([]);

    const getData = async() => {
        try {
            const response = await fetch('http://localhost:3000/pisos', {
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

    const deletePiso = async(id) => {
        try {
            await confirmar.fire({
                icon: 'warning',
                title: 'Eliminar piso',
                text: '¿Está seguro que desea borrar este registro?'
            }).then(async (result) => {
                if(result.isConfirmed){
                    const response = await fetch(`http://localhost:3000/pisos/delete/${id}`, {
                        method: 'DELETE',
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': `Bearer ${token}`
                        }
                    });
                    const data = await response.json();
                    if (data.alert) {
                      await warning.fire({
                        text: data.alert
                      });
                      logout();
                      navigate('/login');
                    } else {
                      await success.fire({
                        text: data.message
                      });
                      getData();
                    }
                }
            })
        } catch (error) {
            alert(error);
        }
    }

    useEffect(() => {
        getData();
    }, [modalAdd, modalEdit])


  return (
    <table className={estilos.table}>
    <thead>
        <tr>
            <th>ID Piso</th>
            <th style={{width: '70%'}}>Descripción</th>
            <th>Acciones</th>
        </tr>
    </thead>
    <tbody>
        {data.length === 0 ?
            <tr>
                <td colSpan={3}>
                    <h2>No hay habitaciones registradas</h2>
                </td>
            </tr>
            :
            data.map(i =>
                <tr key={i.id_piso}>
                    <td>{i.id_piso}</td>
                    <td>{i.descripcion}</td>
                    <td className={estilos.column_action}>
                        <button onClick={() => abrirModalEdit(i.id_piso, true)} className={estilos.button_edit}>
                            <i className='bi bi-pencil-square'></i>
                        </button>
                        <button onClick={() => deletePiso(i.id_piso)} className={estilos.button_delete}>
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

export default TablaPisos