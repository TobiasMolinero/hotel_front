import Navbar from "../components/Navbar";
import Header from "../components/Header";
import '../App.css';
import '../css/clientes.css';
import TablaClientes from "../components/tables/TablaClientes";
import ButtonAdd from "../components/buttons/ButtonAdd";

const Clientes = () => {
  return (
    <div className="app">
      <Navbar />
      <div className="content clientes">
        <Header nombreIcono={'bi bi-people-fill'} title={'Clientes'}/>
        <div className="display_clientes">
            <div className="container_button">
                <ButtonAdd text={'Agregar cliente'}/> 
            </div>
            <div className="container_table">
                <TablaClientes />
            </div>
        </div>
      </div>
    </div>
  )
}

export default Clientes
