import { Link } from "react-router-dom";
import "./admin_notfound.scss"

function AdminNotFound() {

    return (
        <div className="admin_not_found">
            <div className="admin_not_found_content">
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
                            <Link to='../..'>Повернутись</Link>
                        </div>
                    </div>
                </nav>
                <div className="admin_work_content">
                    <h1>404</h1>
                    <div className="page_not_found_text">Page Not Found</div>
                </div>
            </div>
            <footer>©2023, Zahrai Denys</footer>
        </div>
    )
}

export default AdminNotFound;