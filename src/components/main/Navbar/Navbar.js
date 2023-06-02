import AnchorLink from 'react-anchor-link-smooth-scroll';
import { useEffect, useState } from 'react';
import './navbar.scss';

function Navbar() {
  //Appearance of navbar
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const nav = document.querySelector('.navbar');

      if (scrollPosition >= document.querySelector('.about_us').offsetTop) {
        nav.classList.add('navbar--visible');
      } else {
        nav.classList.remove('navbar--visible');
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
  //Navbar dynamic anchor change
  const [currentSection, setCurrentSection] = useState('');
  const getCurrentSection = () => {
    const sections = document.querySelectorAll('section');
    const scrollPosition = window.scrollY + 80;

    for (let i = 0; i < sections.length; i++) {
      const sectionTop = sections[i].getBoundingClientRect().top + window.scrollY;
      const sectionBottom = sectionTop + sections[i].clientHeight;

      if (scrollPosition >= sectionTop && scrollPosition <= sectionBottom) {
        return sections[i].getAttribute('id');
      }
    }

    return '';
  };
  useEffect(() => {
    const handleScroll = () => {
      setCurrentSection(getCurrentSection());
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const [navText, setNavText] = useState("");
  const [navUrl, setNavUrl] = useState("#");
  const [navText2, setNavText2] = useState("");
  const [navUrl2, setNavUrl2] = useState("#");
  useEffect(() => {
    switch (currentSection) {
      case "promo":
        setNavText("На головну");
        setNavUrl("#promo");
        setNavText2("Про нас");
        setNavUrl2("#about_us");
        break;
      case "about_us":
        setNavText("На головну");
        setNavUrl("#promo");
        setNavText2("Барбери");
        setNavUrl2("#barbers");
        break;
      case "barbers":
        setNavText("Про нас");
        setNavUrl("#about_us");
        setNavText2("Сервіси");
        setNavUrl2("#services");
        break;
      case "services":
        setNavText("Барбери");
        setNavUrl("#barbers");
        setNavText2("Галерея");
        setNavUrl2("#gallery");
        break;
      case "gallery":
        setNavText("Послуги");
        setNavUrl("#services");
        setNavText2("Контакти");
        setNavUrl2("#contacts");
        break;
      case "contacts":
        setNavText("Галерея");
        setNavUrl("#gallery");
        setNavText2("На головну");
        setNavUrl2("#promo");
        break;
      default:
        setNavText("");
        setNavUrl("#");
        break;
    }
  }, [currentSection]);



  return (
    <nav className='navbar' id='navbar'>
      <div className='navbar_container'>
        <div className='nav_item'>
          <img src='.\assets\icons\arrow.png' alt='' className='arrow_image_right'/>
          <AnchorLink className='nav_link' href={navUrl}>{navText}</AnchorLink>
        </div>
        <div className='logo_container'>
          <img src='./assets/icons/barbershop_logo.png' alt="" />
        </div>
        <div className='nav_item'>
          <AnchorLink className='nav_link' href={navUrl2}>{navText2}</AnchorLink>
          <img src='.\assets\icons\arrow.png' alt='' className='arrow_image_left'/>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;