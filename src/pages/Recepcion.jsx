/* eslint-disable no-unused-vars */
import { useState, useEffect } from "react";
import '../App.css';
import '../css/recepcion.css';
import {logout} from '../constants/functions';
import Navbar from "../components/Navbar";
import Header from '../components/Header';


const Recepcion = () => {
  return (
    <div className="app">
      <Navbar />
      <div className="content recepcion">
        <Header nombreIcono={'bi bi-box-arrow-in-right'} title={'Recepción'}/>
        <div className="display">
            <div className="container_cards">
                <h2>hola</h2>  

            </div>
        </div>
      </div>
    </div>
  )
}

export default Recepcion
