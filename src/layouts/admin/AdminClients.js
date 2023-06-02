import "./admin_clients.scss"
import ClientsTable from "../../components/admin/AdminClients/ClientsTable";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

function AdminClients() {

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
        <div className="admin_clients">
            <div className="admin_clients_content">
                <nav className="navbar_admin">
                    <div className='navbar_admin_container'>
                        <div className='logo_admin_container'>
                            <div>
                                <img src='../assets/icons/barbershop_logo.png' alt="" />
                            </div>
                        </div>
                        <div className='nav_admin_title_container'>
                            <h1 className='nav_admin_title'>Сторінка адміністратора</h1>
                        </div>
                        <div className='nav_admin_items'>
                            <Link to='..'>Вийти</Link>
                        </div>
                    </div>
                </nav>
                <div className="admin_work_content">
                    <div className="admin_data_nav">
                        <div onClick={onClickEvent}>Записи</div>
                        <h1>Клієнти</h1>
                        <div onClick={onClickEvent}>Барбери</div>
                    </div>
                    <ClientsTable />
                </div>
            </div>
            <footer>©2023, Zahrai Denys</footer>
        </div>
    )
}

export default AdminClients;