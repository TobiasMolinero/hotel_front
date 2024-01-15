/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
import estilos from '../css/login.module.css';
import logo from '../assets/logo_hotel.png';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = () => {

    const navigate = useNavigate()

    const [usuario, setUsuario] = useState('');
    const [clave, setClave] = useState('');

    const login = async(e) => {
        e.preventDefault()
        try {
            var response = await fetch('http://localhost:3000/login', {
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
            
            var data = await response.json()
            
        } catch (error) {
            alert(data.error);
        }
        
        if(data.auth === true){
            localStorage.setItem('auth', JSON.stringify(data.auth))
            localStorage.setItem('token', JSON.stringify(data.token));
            alert(data.message);
            navigate('/app/inicio');
        } else {
            alert(data.message);
        }
    };

  return (
    <div className={estilos.container}>
      <div className={estilos.container_login}>
        <div className={estilos.login_intro}>
            <img src={logo} alt="logo" />
            <h2>Sistema de Gestión</h2>
        </div>
        <div className={estilos.container_form}>
            <h2>Ingresar al sistema</h2>
            <form onSubmit={login}>
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
