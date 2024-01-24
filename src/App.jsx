/* eslint-disable react/jsx-no-undef */
/* eslint-disable no-unused-vars */
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import { ProtectedRoute } from './utils/ProtectedRoute';
import Login from './pages/Login';
import Inicio from './pages/Inicio';
import Reservas from './pages/Reservas';
import Recepcion from './pages/Recepcion';
import Navbar from './components/Navbar';

function App() {

  return (
      <Router>
        <Routes>
          <Route path='/' element={<Login />}/>
          <Route path="/login" element={<Login />}/>

          <Route path='/app' element={<ProtectedRoute />}>
            <Route path='/app/inicio' element={<Inicio />}/>
            <Route path='/app/reservas' element={<Reservas />}/>
            <Route path='/app/recepcion' element={<Recepcion />}/>
          </Route>

        </Routes>
        
      </Router>
  )
}

export default App
