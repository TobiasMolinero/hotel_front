/* eslint-disable no-unused-vars */
import { useState, useEffect } from "react";
import '../App.css';
import '../css/recepcion.css';
import {logout} from '../constants/functions';
import Navbar from "../components/Navbar";
import Header from '../components/Header';
import CardRoom from "../components/cards/CardRoom";
import { useNavigate } from "react-router-dom";


const Recepcion = () => {

  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  return (
    <div className="app">
      <Navbar />
      <div className="content recepcion">
        <Header nombreIcono={'bi bi-box-arrow-in-right'} title={'Recepción'}/>
        <div className="display_recepcion">
          <div className="menu_recepcion">
            <ul>
              <li>Ver todo</li>
              <li>Nivel 1</li>
              <li>Nivel 2</li>
              <li>Nivel 3</li>
            </ul>
          </div>
          <div className="container_cards">
              <CardRoom />
              <CardRoom />
              <CardRoom />
              <CardRoom />
              <CardRoom />
              <CardRoom />
              <CardRoom />
              <CardRoom />
              <CardRoom />
              <CardRoom />
              <CardRoom />
              <CardRoom />
              <CardRoom />
              <CardRoom />
              <CardRoom />
              <CardRoom />
              <CardRoom />
              <CardRoom />
              <CardRoom />
              <CardRoom />

          </div>
        </div>
      </div>
    </div>
  )
}

export default Recepcion
