import "./barbers_form.scss";

function BarbersForm({ setFieldValue, values, handleNextStep }) {

  const barbersData = [
    { id: '1', name: 'Максим', bio: '"Працюю барбером вже 3 роки"', rank: "silver", photo: "./assets/img/first_barber.jpg" },
    { id: '2', name: 'Денис', bio: '"Зі мною можна поговорити"', rank: "gold", photo: "./assets/img/second_barber.jpg" },
    { id: '3', name: 'Артур', bio: '"Доповню ваш образ гарною зачіскою"', rank: "platinum", photo: "./assets/img/third_barber.jpg" },
  ];

  const handleSelectBarber = (barber) => {
    setFieldValue("barber", barber);
    if (values?.date || values?.time) {
      setFieldValue("date", undefined);
      setFieldValue("time", undefined);
    }
  };

  const getCustomRankText = (param) => {
    if (param === "silver") {
      return {
        color: '#C0C0C0'
      }
    } else if (param === "gold") {
      return {
        color: '#FFD700'
      }
    } else if (param === "platinum") {
      return {
        color: '#E5E4E2'
      }
    }
    return {
      color: 'white'
    };
  };

  const getSelectedBarberClass = (barberId) => {
    if (!values.barber) {
      return "barber_card"
    } else if (values?.barber?.id === barberId) {
      return "barber_card_selected"
    }
    return "barber_card";
  };

  return (
    <div className="barbers_form">
      <h1>Виберіть барбера</h1>
      <div className="barbers_cards_container">
        {barbersData.map((barber) => (
          <div key={barber.id} className={getSelectedBarberClass(barber.id)} onClick={() => handleSelectBarber(barber)}>
            <div>
              <div className="portrait_photo"><img src={barber.photo} alt="Barber" draggable="false" className="barber_mini_photo" /></div>
              <h3>{barber.name}</h3>
              <h4 style={getCustomRankText(barber.rank)}>{barber.rank}</h4>
              <p>{barber.bio}</p>
            </div>
          </div>
        ))}
      </div>
      {values?.barber?.id && (
        <div className="selected_barber_container">
          <h3>Вибраний барбер:</h3>
          <div>{values.barber.name}</div>
        </div>
      )}
      <div className="booking_buttons_container">
        <button className="booking_button_next" onClick={handleNextStep} disabled={!values.barber}>Продовжити</button>
      </div>
    </div>
  );
};

export default BarbersForm;
