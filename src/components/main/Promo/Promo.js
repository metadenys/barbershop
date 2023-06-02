import Header from '../Header/Header';
import './promo.scss';

function Promo() {
  return (
    <section className='promo' id='promo'>
      <Header/>
      <div className='promoText'>
        <h1>Ми зможемо<br/> зробити з тебе "людину"!</h1>
      </div>
    </section>
  );
}

export default Promo;