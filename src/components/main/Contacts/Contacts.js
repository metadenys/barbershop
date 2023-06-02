import './contacts.scss';
import Map from '../Map';

function Contacts() {
  return (
    <section className='contacts' id='contacts'>
      <div className='hr'></div>
      <div className='vr'></div>
      <h2>Контакти</h2>
      <div className='main_container'>
        <div className='contacts_container'>
          <div className='contact_item'>
            <h3>Адреса</h3>
            <div>Львів, вул. Видумана, 7</div>
            <div>Щодня з 9:00 до 20:00</div>
          </div>
          <div className='contact_item'>
            <h3>Телефон</h3>
            <div><a href='tel:+380930000001'>+380930000001</a></div>
            <div><a href='tel:+380670000001'>+380670000001</a></div>
          </div>
          <div className='contact_item'>
            <h3>Соціальні мережі</h3>
            <div><a href='https://www.instagram.com/' target='_blank' rel='noreferrer'>Instagram</a> <img src='.\assets\icons\icon_instagram.svg' alt='' /></div>
            <div><a href='https://uk-ua.facebook.com/'target='_blank' rel='noreferrer'>Facebook</a> <img src='.\assets\icons\icon_facebook.svg' alt='' /></div>
          </div>
        </div>
        <Map/>
      </div>
    </section>
  );
}

export default Contacts;