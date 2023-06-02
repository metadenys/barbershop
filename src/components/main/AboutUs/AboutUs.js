import './about_us.scss';

function AboutUs() {
  return (
    <section className='about_us' id='about_us'>
      <div className='vr'></div>
      <h2>Про нас</h2>
      <img className="about_us_img" src='./assets/img/about_us.jpg'alt=''/>
      <div className='about_us_text'>
        Наша команда професійно виконує свою роботу і залишає людей задоволених з 2017 року. У нас працюють лише кваліфіковані спеціалісти, які по-справжньому люблять свою справу. Ви не залишитесь без позитивних емоцій після візиту у наш прекрасний салон.
      </div>
    </section>
  );
}

export default AboutUs;