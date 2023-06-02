import './services.scss';

function Services() {
  return (
    <section className='services' id='services'>
      <div className='hr'></div>
      <div className='vr'></div>
      <h2>Послуги</h2>
      <div className='services_container'>
        <div className='services_subcontainer'>
          <div className='service'>
            <img className='service_image' src='./assets/icons/struzhka_icon.png' alt=''/>
            <div>
              <div className='service_name'>Чоловіча стрижка</div>
              <div className='service_price'>Від 200 грн</div>
            </div>
          </div>
          <div className='service'>
            <img className='service_image' src='./assets/icons/machine_icon.png' alt=''/>
            <div>
              <div className='service_name'>Стрижка машинкою</div>
              <div className='service_price'>Від 100 грн</div>
            </div>
          </div>
        </div>
        <div className='services_subcontainer'>
          <div className='service'>
            <img className='service_image' src='./assets/icons/golinya_icon.png' alt=''/>
            <div>
              <div className='service_name'>Гоління</div>
              <div className='service_price'>Від 150 грн</div>
            </div>
          </div>
          <div className='service'>
            <img className='service_image' src='./assets/icons/ukladka_icon.png' alt=''/>
            <div>
              <div className='service_name'>Професійна укладка</div>
              <div className='service_price'>Від 100 грн</div>
            </div>
          </div>
        </div>
      </div>
      <p className='services_text'>*Детальніше на сторінці запису</p>
    </section>
  );
}

export default Services;