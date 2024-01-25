/* eslint-disable react/prop-types */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import { useState, useEffect } from 'react'
import estilos from '../../css/modules/table.module.css';
import { useNavigate } from 'react-router-dom';
import { logout } from '../../constants/functions';


const TablaClientes = ({
    abrirModalEdit,
    modalAdd,
    modalEdit
}) => {

    const navigate = useNavigate();
    const token = localStorage.getItem('token');

    const [data, setData] = useState([]);

    const getData = async() => {
        try {
            const response = await fetch('http://localhost:3000/clientes', {
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
            setData(data);
        }
    }

    const deleteCliente = async(id) => {
        try {
            const response = await fetch(`http://localhost:3000/clientes/delete/${id}`, {
                method: 'PUT',
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
            alert(data.message);
            getData();
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
                    <th>N° Cliente</th>
                    <th>Tipo documento</th>
                    <th>N° documento</th>
                    <th>Apellido</th>
                    <th>Nombre</th>
                    <th>Telefono</th>
                    <th>Correo Electronico</th>
                    <th>Acciones</th>
                </tr>
            </thead>
            <tbody>
                {data.length === 0 ?  
                    <tr >
                        <td colSpan={8}>
                            <h2>No hay clientes registrados</h2>
                        </td>
                    </tr>
                    
                    : data.map(c => 
                        <tr key={c.id_cliente}>
                            <td>{c.id_cliente}</td>
                            <td>{c.tipo_documento}</td>
                            <td>{c.nro_documento}</td>
                            <td>{c.apellido}</td>
                            <td>{c.nombre}</td>
                            <td>{c.nro_telefono}</td>
                            <td>{c.correo_electronico}</td>
                            <td className={estilos.column_action}>
                                <button onClick={() => abrirModalEdit(c.id_cliente, true)} className={estilos.button_edit}>
                                    <i className='bi bi-pencil-square'></i>
                                </button>
                                <button onClick={() => deleteCliente(c.id_cliente)} className={estilos.button_delete}>
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

export default TablaClientes
