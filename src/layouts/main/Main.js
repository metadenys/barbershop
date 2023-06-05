import Promo from "../../components/main/Promo/Promo";
import AboutUs from "../../components/main/AboutUs/AboutUs";
import Barbers from "../../components/main/Barbers/Barbers";
import Services from "../../components/main/Services/Services";
import Gallery from "../../components/main/Gallery/Gallery";
import Contacts from "../../components/main/Contacts/Contacts";
import Navbar from "../../components/main/Navbar/Navbar";
import MainButton from "../../components/main/MainButton/MainButton";
import "./main.scss";
import { useNavigate } from "react-router-dom";

function Main() {
  const navigate = useNavigate()
  return (
    <div className="main">
      <Navbar />
      <MainButton value="Записатись" onClick={() => navigate('/booking')} />
      <Promo />
      <AboutUs />
      <Barbers />
      <Services />
      <Gallery />
      <Contacts />
      <footer>©2023, Zahrai Denys</footer>
    </div>
  );
}

export default Main;
