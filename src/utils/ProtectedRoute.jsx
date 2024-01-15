/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { Navigate, Outlet } from "react-router-dom"
import { useState } from "react"
import Inicio from "../pages/Inicio"

export const ProtectedRoute = () => {

    const [auth, setAuth] = useState(JSON.parse(localStorage.getItem('auth')));
    
    if(auth !== true){
        return <Navigate to='/login' />
    }

    if(window.location.pathname === '/app'){
        window.location.pathname = '/app/inicio'
        return <Inicio />
    }

    return <Outlet />;
}