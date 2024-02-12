import Header from '../components/Header';
import Navbar from '../components/Navbar';
import '../App.css';
import '../css/configuracion.css';
import { Link } from 'react-router-dom';
// import { useNavigate } from 'react-router-dom';

const Configuracion = () => {

    return (
        <div className="app">
            <Navbar />
            <div className="content configuracion">
                <Header nombreIcono={'bi bi-gear-fill'} title={'Configuración'} />
                <div className="display_configuracion">
                    <div className="config_options">
                        <div className="opcion">
                            <Link className='opcion_link'>
                                <div className="opcion_header">
                                    <h4>Gestionar Habitaciones</h4>
                                    <span><i className='bi bi-pencil'></i> Editar</span>
                                </div>
                                <p>Registra nuevas habitaciones, modifica algun dato de estas o dar de baja una habitación.</p>
                            </Link>
                        </div>
                        <div className="opcion">
                            <Link className='opcion_link'>
                                <div className="opcion_header">
                                    <h4>Gestionar Categorías</h4>
                                    <span><i className='bi bi-pencil'></i> Editar</span>
                                </div>
                                <p>Añadir, modificar o dar de baja las distintas categorías de habitaciones.</p>
                            </Link>
                        </div>
                        <div className="opcion">
                            <Link className='opcion_link'>
                                <div className="opcion_header">
                                    <h4>Gestionar niveles</h4>
                                    <span><i className='bi bi-pencil'></i> Editar</span>
                                </div>
                                <p>Añadir nuevos pisos al hotel en caso de ser necesario, editar datos.</p>
                            </Link>
                        </div>
                        <div className="opcion">
                            <Link className='opcion_link'>
                                <div className="opcion_header">
                                    <h4>Gestionar Empleados</h4>
                                    <span><i className='bi bi-pencil'></i> Editar</span>
                                </div>
                                <p>Registra nuevos empleados, modifica sus datos o dar de baja un empleado.</p>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Configuracion
