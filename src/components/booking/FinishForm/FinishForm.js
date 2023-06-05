import "./finish_form.scss";
import { Field, ErrorMessage } from 'formik';
import dayjs from "dayjs";

function FinishForm({ values, handlePreviusStep }) {

  const getDateFormatted = (date) => {
    const formattedDate = dayjs(date).format('DD/MM/YYYY');
    return formattedDate
  }

  return (
    <div className="finish_form">
      <h1>Введіть дані і сформуйте візит</h1>
      <div className="finish_data_inputs">
        <label htmlFor="name">ІМ'Я</label>
        <div className="data_input_field">
          <Field type="text" id="name" name="name" />
          <ErrorMessage name="name" component="div" className="error_message" />
        </div>

        <label htmlFor="phone">ТЕЛЕФОН</label>
        <div className="data_input_field">
          <Field type="tel" id="phone" name="phone" />
          <ErrorMessage name="phone" component="div" className="error_message" />
        </div>

        <label htmlFor="email">EMAIL</label>
        <div className="data_input_field">
          <Field type="email" id="email" name="email" />
          <ErrorMessage name="email" component="div" className="error_message" />
        </div>
      </div>
      {values?.barber && values?.service && values?.time && values?.date && (
        <div className="selected_options_container">
          <div className="selected_options_subcontainer">
            <h3>Вибраний барбер:</h3>
            <div><span className="barber_rank_span">{values.barber.rank}</span> {values.barber.name}</div>
            <h3>Вибрана послуга:</h3>
            <div>{values.service.title}</div>
          </div>
          <div className="selected_options_subcontainer">
            <h3>Ціна:</h3>
            <div>{values.total}</div>
            <h3>Вибрані дата й час:</h3>
            <div>{getDateFormatted(values.date)} {values.time}</div>
          </div>
        </div>
      )}
      <div className="additional_info_text">*наш адміністратор зателефонує Вам за годину до візиту для підтвердження</div>
      <div className="booking_buttons_container">
        <div className="booking_button_container"><button className="booking_button_previous" type="button" onClick={handlePreviusStep}>Назад</button></div>
        <div className="booking_button_container"><button className="booking_button_next" type="submit">Сформувати</button></div>
      </div>
    </div>
  );
};

export default FinishForm;
