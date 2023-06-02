import "./datetime_form.scss";
import moment from 'moment';
import MyDatePicker from "./Datepicker";
import MyTimePicker from "./Timepicker";

function DateTimeForm({ setFieldValue, values, handleNextStep, handlePreviusStep }) {

  const handleSelectDate = (date) => {
    setFieldValue("date", moment(date).format("DD/MM/YYYY"));
    setFieldValue("time", undefined);
  };

  const handleSelectTime = (time) => {
    setFieldValue("time", time)
  };



  return (
    <div className="datetime_form">
      <h1>Виберіть дату</h1>
      <div className="datepicker_container">
        <MyDatePicker handleSelectDate={handleSelectDate} values={values}/>
      </div>
      <h2>Виберіть час</h2>
      <div className="timepicker_container">
        <MyTimePicker handleSelectTime={handleSelectTime} values={values} />
      </div>
      {values?.time && values?.date && (
        <div className="selected_datetime_container">
          <h3>Вибрана дата і час:</h3>
          <div>{values.date} {values.time}</div>
        </div>
      )}
      <div className="booking_buttons_container">
        <div className="booking_button_container"><button className="booking_button_previous" onClick={handlePreviusStep}>Назад</button></div>
        <div className="booking_button_container"><button className="booking_button_next" onClick={handleNextStep} disabled={!values.date || !values.time}>Продовжити</button></div>
      </div>
    </div>
  );
};

export default DateTimeForm;
