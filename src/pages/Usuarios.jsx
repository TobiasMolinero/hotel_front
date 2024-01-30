/* eslint-disable no-unused-vars */
import {useState, useEffect} from 'react'
import '../App.css'
import Navbar from '../components/Navbar'
import Header from '../components/Header'

const Usuarios = () => {
  return (
    <div className="app">
      <Navbar />
      <div className="content usuarios">
        <Header nombreIcono={'bi bi-person-fill-gear'} title={'Usuarios'}/>
        <div className="display_usuarios">

        </div>
      </div>
    </div>
  )
}

export default Usuarios
