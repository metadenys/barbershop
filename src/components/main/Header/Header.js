import AnchorLink from 'react-anchor-link-smooth-scroll';
import './header.scss';

function Header() {
  return (
    <header>
      <img src='./assets/icons/barbershop_logo.png' alt=""/>
      <div className='headerMenu'>
        <AnchorLink href='#about_us'>Про нас</AnchorLink>
        <AnchorLink href='#barbers'>Барбери</AnchorLink>
        <AnchorLink href='#services'>Послуги</AnchorLink>
        <AnchorLink href='#gallery'>Галерея</AnchorLink>
        <AnchorLink href='#contacts'>Контакти</AnchorLink>
      </div>
    </header>
  );
}

export default Header;