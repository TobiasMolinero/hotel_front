/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
import estilos from '../css/modules/login.module.css';
import logo from '../assets/logo_hotel.png';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { login } from '../constants/functions';

const Login = () => {

    const navigate = useNavigate()

    const [usuario, setUsuario] = useState('');
    const [clave, setClave] = useState('');

    const handleSubmit = async(e) => {
        e.preventDefault()
        try {
            var response = await fetch('http://localhost:3000/usuarios/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                  },
                body: JSON.stringify({
                    usuario: usuario,
                    clave: clave
                })
            });
            
            var data = await response.json();

            if(data.auth){
                login(data.token, data.userData);
                alert(data.message);
                navigate('/app/inicio');
                e.target.reset;
            } else {
                alert(data.message);
            }
            
        } catch (error) {
            alert(data.error);
        }

    };

  return (
    <div className={estilos.container}>
      <div className={estilos.container_login}>
        <div className={estilos.login_intro}>
            <img src={logo} alt="logo" />
            <h2>Control de Gestión Hotelera</h2>
        </div>
        <div className={estilos.container_form}>
            <h2>Ingresar al sistema</h2>
            <form onSubmit={handleSubmit}>
                <div className={estilos.group_input}>
                    <label htmlFor="txtUsuario">Usuario</label>
                    <input type="text" id="txtUsuario" onChange={(e) => {
                        setUsuario(e.target.value)
                    }} required autoComplete='off'/>
                </div>
                <div className={estilos.group_input}>
                    <label htmlFor="txtContraseña">Contraseña</label>
                    <input type="password" id="txtContraseña" onChange={(e) => {
                        setClave(e.target.value)
                    }} required autoComplete='off'/>
                </div>
                <button type='submit'>Ingresar</button>
            </form>
        </div>
      </div>
    </div>
  )
}

export default Login
