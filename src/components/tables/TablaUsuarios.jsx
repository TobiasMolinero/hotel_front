/* eslint-disable react/prop-types */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import {useState, useEffect} from 'react';
import estilos from '../../css/modules/table.module.css';
import { logout } from '../../constants/functions';
import { useNavigate } from 'react-router-dom';

const TablaUsuarios = ({
  abrirModalEdit,
  modalAdd,
  modalEdit
}) => {

    const navigate = useNavigate();
    const token = localStorage.getItem('token');

    const [usuarios, setUsuarios] = useState([]);
    
    const getUsuarios = async() => {
        try {
            const response = await fetch('http://localhost:3000/usuarios', {
              headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
              }
            });

            let data = await response.json();
            if(data.alert){
              alert(data.alert);
              logout();
              navigate('/login');
            } else {
              setUsuarios(data);
            }
        } catch (error) {
            alert(error);
        }
    }

    const deleteUsuario = async(id) => {
      try {
        const response = await fetch(`http://localhost:3000/usuarios/delete/${id}`, {
          method: 'DELETE',
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
          alert(data.message);
          getUsuarios();
        }
      } catch (error) {
        alert(error);
      }
    }


    useEffect(() => {
      getUsuarios();
    }, [modalAdd, modalEdit])


  return (
    <table className={estilos.table}>
      <thead>
        <tr>
          <th style={{width: '100px'}}>Id Usuario</th>
          <th>Usuario</th>
          <th>Nombre</th>
          <th>Tipo Usuario</th>
          <th>Acciones</th>
        </tr>
      </thead>
      <tbody>
        {usuarios.length === 0 ? <tr><td colSpan={5}><h2>No hay usuarios registrados</h2></td></tr>
        : usuarios.map(u => 
          <tr key={u.id_usuario}>
            <td>{u.id_usuario}</td>
            <td>{u.usuario}</td>
            <td>{u.nombre + ' ' + u.apellido}</td>
            <td>{u.descripcion}</td>
            <td className={estilos.column_action}>
            <button onClick={() => abrirModalEdit(u.id_usuario, true)} className={estilos.button_edit}>
                <i className='bi bi-pencil-square'></i>
            </button>
            <button onClick={() => deleteUsuario(u.id_usuario)} className={estilos.button_delete}>
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

export default TablaUsuarios
