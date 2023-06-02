import './admin_login.scss';
import { Link } from 'react-router-dom';
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from 'yup';

function AdminLogin() {

    const validationSchema = Yup.object().shape({
        username: Yup.string()
            .required('*Введіть ім\'я користувача'),
        password: Yup.string()
            .required('*Введіть пароль'),
    });

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
                                username: "",
                                password: ""
                            }}
                            onSubmit={async (values) => {
                                await new Promise((resolve) => setTimeout(resolve, 500));
                                alert(JSON.stringify(values, null, 2));
                            }}
                            validationSchema={validationSchema}
                        >
                            <Form>
                                <label htmlFor="username">ІМ'Я КОРИСТУВАЧА</label>
                                <div className="data_input_field">
                                    <Field type="username" id="username" name="username" />
                                    <ErrorMessage name="username" component="div" className="error_message" />
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
            <footer>©2023, Zahrai Denys</footer>
        </div>
    );
}
export default AdminLogin;