import "./services_form.scss";
import { useEffect, useState } from "react";
import axios from 'axios';

const coefs = {
  Silver: 1,
  Gold: 1.2,
  Platinum: 1.4
}

function ServicesForm({ setFieldValue, values, handleNextStep, handlePreviusStep }) {

  const getCoef = (price) => {
    const barberRank = values.barber.rank;
    return price * coefs[barberRank];
  }

  const [servicesData, setServicesData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://localhost:5001/api/v1/services');

        if (Array.isArray(response.data.data)) {
          const transformedData = response.data.data.map(service => ({
            id: service.id.toString(),
            name: service.title,
            price: service.price,
            icon: service.logoUrl,
          }));
          setServicesData(transformedData);
        } else {
          console.error('Invalid data format received:', response.data);
        }
      } catch (error) {
        console.error('Error fetching services:', error);
      }
    };

    fetchData();
  }, []);

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
