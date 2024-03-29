/* eslint-disable react/jsx-no-undef */
/* eslint-disable no-unused-vars */
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import { ProtectedRoute } from './utils/ProtectedRoute';
import Login from './pages/Login';
import Inicio from './pages/Inicio';

function App() {

  return (
      <Router>
        <Routes>
          <Route path='/' element={<Login />}/>
          <Route path="/login" element={<Login />}/>
          <Route path='/app' element={<ProtectedRoute />}>
            <Route path='/app/inicio' element={<Inicio />} />
          </Route>
        </Routes>
      </Router>
  )
}

export default App
