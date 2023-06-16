import "./admin_bookings.scss"
import ClientsTable from "../../components/admin/AdminClients/ClientsTable";
import { Link } from "react-router-dom";
import { useState } from "react";
import BarbersTable from "../../components/admin/AdminBarbers/BarbersTable";
import BookingsTable from "../../components/admin/AdminBookings/BookingsTable";

const Links = {
    clients: 'Клієнти',
    bookings: 'Записи',
    barbers: "Барбери",
}

function AdminMain() {

    const [content, setContent] = useState(Links.bookings)

    function onClickEvent(text) {
        setContent(text)
    }

    function renderContent() {
        switch (content) {
            case Links.barbers:
                return <BarbersTable />
            case Links.clients:
                return <ClientsTable />
            case Links.bookings:
                return <BookingsTable />

            default:
                break;
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
                            <Link to='..' onClick={() => {
                                localStorage.removeItem('token')
                            }}>Вийти</Link>
                        </div>
                    </div>
                </nav>
                <div className="admin_work_content">
                    <div className="admin_data_nav">
                        {Object.entries(Links).map(([_,value]) =>{
                            return value===content
                                ?   <h1>{value}</h1>
                                :   <div onClick={() => onClickEvent(value)}>{value}</div>
                        })}
                    </div>
                    {renderContent()}
                    {/* <ClientsTable /> */}
                </div>
            </div>
            <footer>©2023, Zahrai Denys</footer>
        </div>
    )
}

export default AdminMain;