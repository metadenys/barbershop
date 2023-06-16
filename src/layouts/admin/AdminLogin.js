import './admin_login.scss';
import { Link, useNavigate } from 'react-router-dom';
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from 'yup';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';
import { mainInterceptor } from '../../services/axiosInterceptor/axiosInterceptor';
import { useState } from 'react';
import { Loader } from '../../App';

function AdminLogin() {

    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()

    const validationSchema = Yup.object().shape({
        email: Yup.string()
            .required('*Введіть ім\'я користувача'),
        password: Yup.string()
            .required('*Введіть пароль'),
    });

    const notifyError = () => toast.error("Невірно введені дані!")

    const handleSubmit = async (values) => {
        setLoading(true)
        await mainInterceptor.post("auth/sign-in", values)
            .then((response) => {
                let token = response.data.data.accessToken
                localStorage.setItem('token', token)
                navigate('/admin/main')
            })
            .finally(() => {
                setLoading(false)
            })
            .catch(() => {
                notifyError();
            })
    }

    if(loading) return <Loader />

    return (
        <div className='admin_login'>
            <div className='admin_content'>
                <nav className="navbar_admin">
                    <div className='navbar_admin_container'>
                        <div className='logo_admin_container'>
                            <div>
                                <img src='./assets/icons/barbershop_logo.png' alt="" />
                            </div>
                        </div>
                        <div className='nav_admin_title_container'>
                            <h1 className='nav_admin_title'>Сторінка адміністратора</h1>
                        </div>
                        <div className='nav_admin_items'>
                            <Link to='..'>Повернутись</Link>
                        </div>
                    </div>
                </nav>
                <div className='admin_authentication'>
                    <h1>Введіть логін та пароль</h1>
                    <div className='admin_form_container'>
                        <Formik
                            initialValues={{
                                email: "",
                                password: ""
                            }}
                            onSubmit={handleSubmit}
                            validationSchema={validationSchema}
                        >
                            <Form>
                                <label htmlFor="email">ІМ'Я КОРИСТУВАЧА</label>
                                <div className="data_input_field">
                                    <Field type="email" id="email" name="email" />
                                    <ErrorMessage name="email" component="div" className="error_message" />
                                </div>

                                <label htmlFor="password">ПАРОЛЬ</label>
                                <div className="data_input_field">
                                    <Field type="password" id="password" name="password" />
                                    <ErrorMessage name="password" component="div" className="error_message" />
                                </div>

                                <button type="submit" className='login_button'>вхід</button>
                            </Form>
                        </Formik>
                    </div>
                </div>
            </div>
            <ToastContainer
                position="bottom-right"
                autoClose={3000}
                hideProgressBar={false}
                newestOnTop={false}
                draggable={false}
                closeOnClick
                pauseOnHover={false}
                pauseOnFocusLoss={false}
                rtl={false}
                theme="light"
            />
            <footer>©2023, Zahrai Denys</footer>
        </div>
    );
}
export default AdminLogin;