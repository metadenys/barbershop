import "./services_form.scss";
import { useEffect } from "react";

const coefs = {
  silver: 1,
  gold: 1.2,
  platinum: 1.4
}

function ServicesForm({ setFieldValue, values, handleNextStep, handlePreviusStep }) {

  const getCoef = (price) => {
    const barberRank = values.barber.rank;
    return price * coefs[barberRank];
  }

  const servicesData = [
    { id: '1', name: 'Чоловіча стрижка', price: 200, icon: "./assets/icons/struzhka_icon.png" },
    { id: '2', name: 'Стрижка машинкою', price: 150, icon: "./assets/icons/machine_icon.png" },
    { id: '3', name: 'Гоління', price: 150, icon: "./assets/icons/golinya_icon.png" },
    { id: '4', name: 'Професійна укладка', price: 100, icon: "./assets/icons/ukladka_icon.png" },
  ];

  const handleSelectService = (service) => {
    setFieldValue("service", service)
    setFieldValue("total", getCoef(service.price))
  };

  const getSelectedServiceClass = (serviceId) => {
    if (!values.service) {
      return "service_card"
    } else if (values?.service?.id === serviceId) {
      return "service_card_selected"
    }
    return "service_card";
  };

  useEffect(() => { 
    if(values.barber && values.service) {
     setFieldValue("total", getCoef(values.service.price))
}
}, [values.barber, values.service])

  return (
    <div className="services_form">
      <h1>Виберіть послугу</h1>
      <div className="services_cards_container">
        {servicesData.map((service) => (
          <div key={service.id} className={getSelectedServiceClass(service.id)} onClick={() => handleSelectService(service)}>
            <img src={service.icon} alt="Service" draggable="false" className="service_icon" />
            <div>
              <h3>{service.name}</h3>
              <h4>Ціна: {getCoef(service.price)} UAH</h4>
            </div>
          </div>
        ))}
      </div>
      {values?.service?.id && (
        <div className="selected_service_container">
          <h3>Вибрана послуга:</h3>
          <p>Назва послуги: {values.service.name}. Ціна: {values.total} UAH</p>
        </div>
      )}
      <div className="booking_buttons_container">
        <div className="booking_button_container"><button className="booking_button_previous" onClick={handlePreviusStep}>Назад</button></div>
        <div className="booking_button_container"><button className="booking_button_next" onClick={handleNextStep} disabled={!values.service}>Продовжити</button></div>
      </div>
    </div>
  );
};

export default ServicesForm;
