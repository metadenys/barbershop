import "./admin_bookings.scss";
import BookingsTable from "../../components/admin/AdminBookings/BookingsTable";
import { useNavigate } from "react-router-dom";

function AdminBookings() {

    const navigate = useNavigate();

    function onClickEvent(event) {
        var text = event.target.textContent;
        
        if (text === "Барбери") {
            let path = "/admin/barbers"
            navigate(path)
        } else if (text === "Клієнти") {
            let path = "/admin/clients"
            navigate(path)
        } else if (text === "Записи"){
            let path = "/admin/bookings"
            navigate(path)
        } else {
            console.log("Помилка переходу!")
        }
    }

    return (
        <div className="admin_bookings">
            <div className="admin_bookings_content">
                <nav className="navbar_admin">
                    <div className='navbar_admin_container'>
                        <div className='logo_admin_container'>
                            <div>
                                <img src='../assets/icons/barbershop_logo.png' alt="Logo" />
                            </div>
                        </div>
                        <div className='nav_admin_title_container'>
                            <h1 className='nav_admin_title'>Сторінка адміністратора</h1>
                        </div>
                        <div className='nav_admin_items'>
                            <a href="http://localhost:3000/admin">Вийти</a>
                        </div>
                    </div>
                </nav>
                <div className="admin_work_content">
                    <div className="admin_data_nav">
                        <div onClick={onClickEvent}>Барбери</div>
                        <h1>Записи</h1>
                        <div onClick={onClickEvent}>Клієнти</div>
                    </div>
                    <BookingsTable />
                </div>
            </div>
            <footer>©2023, Zahrai Denys</footer>
        </div>
    );
}

export default AdminBookings;