import Header from "../components/Header";
import Navbar from "../components/Navbar";
import '../App.css';

const CheckInRoom = () => {
  return (
    <div className="app">
        <Navbar />
        <div className="content checkin">
            <Header nombreIcono={'bi bi-box-arrow-in-right'} title={'Recepción / Check-in'}/>
            <div className="display_checkin">

            </div>
        </div>
    </div>
  )
}

export default CheckInRoom
