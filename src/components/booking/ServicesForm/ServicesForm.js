import "./services_form.scss";
import { useEffect, useState } from "react";
import axios from "axios";

function ServicesForm({ setFieldValue, values, handleNextStep, handlePreviusStep }) {

  const [coefsData, setCoefsData] = useState([])

  useEffect(() => {
    const fetchCoefsData = async () => {
      try {
        const response = await axios.get('https://localhost:5001/api/v1/ranks');
        setCoefsData(response.data.data)
      } catch (error) {
        console.error(error);
      }
    };

    fetchCoefsData();
  }, []);

  const [servicesData, setServicesData] = useState([])


  useEffect(() => {
    const fetchServiceData = async () => {
      try {
        const response = await axios.get('https://localhost:5001/api/v1/services');
        setServicesData(response.data.data)
      } catch (error) {
        console.error(error);
      }
    };

    fetchServiceData()
  }, []);

  const getCoef = (price) => {
    const barberRank = values.barber.rank;
  
    const rankObject = coefsData.find(rank => rank.status === barberRank);
  
    if (!rankObject) {
      return 0;
    }
  
    const coefficient = rankObject.coefficient;
    return price * coefficient;
  };
  

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
    if (values.barber && values.service) {
      setFieldValue("total", getCoef(values.service.price))
    }
  }, [coefsData, values.barber, values.service])

  return (
    <div className="services_form">
      <h1>Виберіть послугу</h1>
      <div className="services_cards_container">
        {servicesData.map((service) => (
          <div key={service.id} className={getSelectedServiceClass(service.id)} onClick={() => handleSelectService(service)}>
            <img src={service.logoUrl} alt="Service" draggable="false" className="service_icon" />
            <div>
              <h3>{service.title}</h3>
              <h4>Ціна: {getCoef(service.price)} UAH</h4>
            </div>
          </div>
        ))}
      </div>
      {values?.service?.id && (
        <div className="selected_service_container">
          <h3>Вибрана послуга:</h3>
          <p>Назва послуги: {values.service.title}. Ціна: {values.total} UAH</p>
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
