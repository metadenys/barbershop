import { useEffect } from 'react';
import './main_button.scss';

function MainButton({value, onClick}) {

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const nav = document.querySelector('.button');

      if (scrollPosition > document.querySelector('.promo').offsetTop) {
        nav.classList.add('button--transform');
      } else {
        nav.classList.remove('button--transform');
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
  return (
    <button className="button" onClick={onClick}>{value}</button>
  );
}

export default MainButton;