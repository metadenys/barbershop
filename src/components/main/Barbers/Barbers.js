import './barbers.scss';

function Barbers() {
  return (
    <section className='barbers' id='barbers'>
      <div className='hr'></div>
      <div className='vr'></div>
      <h2>Наші барбери</h2>
      <div className='barbers_images'>
        <div className='item_container'>
          <div className='image1'/>
          <div className='overlay'>
            <div className='barber_name'>Максим</div>
          </div>
        </div>
        <div className='item_container'>
          <div className='image2'/>
          <div className='overlay'>
            <div className='barber_name'>Денис</div>
          </div>
        </div>
        <div className='item_container'>
          <div className='image3'/>
          <div className='overlay'>
            <div className='barber_name'>Артур</div>
          </div>
        </div>
      </div>
      <div className='barbers_text'>
        Якийсь опис професійних барберів.
      </div>
    </section>
  );
}

export default Barbers;