/* eslint-disable no-unused-vars */
import {useState, useEffect} from 'react';
import estilos from '../../css/modules/table.module.css';
import { logout } from '../../constants/functions';
import { useNavigate } from 'react-router-dom';

const TablaUsuarios = () => {

    const navigate = useNavigate();
    const token = localStorage.getItem('token');

    const [usuarios, setUsuarios] = useState([]);
    
    const getUsuarios = async() => {
        try {
            const response = await fetch('http://localhost:3000/usuarios');
        } catch (error) {
            alert(error);
        }
    }

    useEffect(() => {

    }, [])


  return (
    <table className={estilos.table}>
      <thead>
        <tr>
          <th>Id Usuario</th>
          <th>Usuario</th>
          <th>Nombre</th>
          <th>Tipo Usuario</th>
          <th>Acciones</th>
        </tr>
      </thead>
      <tbody>
        
      </tbody>
    </table>
  )
}

export default TablaUsuarios
