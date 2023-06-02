import { Link } from "react-router-dom";
import { useState } from 'react';
import { Formik, Form } from 'formik';
import { ToastContainer, toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import axios from "axios";
import * as Yup from 'yup';
import BarbersForm from "../../components/booking/BarbersForm/BarbersForm";
import ServicesForm from "../../components/booking/ServicesForm/ServicesForm";
import DateTimeForm from "../../components/booking/DateTimeForm/DateTimeForm";
import "./booking.scss";
import FinishForm from "../../components/booking/FinishForm/FinishForm";

function Booking() {

  const [formStep, setFormStep] = useState(0);

  const handleNextStep = () => {
    setFormStep(formStep + 1);
  };

  const handlePreviusStep = () => {
    setFormStep(formStep - 1);
  };


  const serverUrl = "http://localhost:3004/bookings"

  const navigate = useNavigate();

  const handleSubmit = async (values) => {
    const BookingData = {
      barberId: values.barber.id,
      serviceId: values.service.id,
      date: values.date,
      time: values.time,
      totalPrice: values.total,
      client: {
        name: values.name,
        phone: values.phone,
        email: values.email
      },
      status: "unconfirmed"
    }

    const notifyError = () => toast.error("Упс!Щось пішло не так...");
    const notifySuccess = () => {
      setTimeout(() => {
        navigate('/');
      }, 3800);
      toast.success("Візит сформовано!");
    }

    await axios.post(serverUrl, BookingData)
      .then(() => notifySuccess())
      .catch(() => notifyError())
  };

  const FormStep = (props) => {
    switch (formStep) {
      case 0:

        return <BarbersForm  {...props} />;
      case 1:

        return <ServicesForm {...props} />;
      case 2:

        return <DateTimeForm {...props} />;
      case 3:

        return <FinishForm {...props} />;

      default: return <></>
    }
  }

  const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/

  const validationSchema = Yup.object().shape({
    name: Yup.string()
      .min(2, 'Ім\'я занадто коротке!')
      .max(50, 'Ім\'я занадто довге!')
      .required('*Обов\'язкове поле'),
    phone: Yup.string().matches(phoneRegExp, 'Введіть коректний номер телефону (без +38)')
      .min(10, 'Введіть коректний номер телефону (без +38)')
      .max(10, 'Введіть коректний номер телефону (без +38)')
      .required('*Обов\'язкове поле'),
    email: Yup.string().email('Введіть коректний email').required('*Обов\'язкове поле'),
  });

  return (
    <div className="booking">
      <div className="booking_content">
        <nav className="navbar_book">
          <div className='navbar_book_container'>
            <div className='logo_book_container'>
              <div>
                <img src='./assets/icons/barbershop_logo.png' alt="" />
              </div>
            </div>
            <div className='nav_book_title_container'>
              <h1 className='nav_book_title'>Формування візиту</h1>
            </div>
            <div className='nav_book_items'>
              <Link to='..'>Повернутись</Link>
            </div>
          </div>
        </nav>
        <div className="form_container">
          <Formik
            initialValues={{
              name: '',
              phone: '',
              email: '',
            }}
            onSubmit={handleSubmit}
            validationSchema={validationSchema}
          >
            {props => (
              <Form>
                <FormStep {...props} handleNextStep={handleNextStep} handlePreviusStep={handlePreviusStep} />
              </Form>)}
          </Formik>
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
      </div>
      <footer>©2023, Zahrai Denys</footer>
    </div>
  );
}

export default Booking;
