import './gallery.scss';
import ImageSlider from "./ImageSlider";

const slides = [
  {url: "http://localhost:3000/assets/img/bs_photo1.jpg",title: "Photo"},
  {url: "http://localhost:3000/assets/img/bs_photo2.jpg",title: "Photo2"},
  {url: "http://localhost:3000/assets/img/bs_photo3.jpg",title: "Photo3"},
];

function Gallery() {
  return (
    <section className='gallery' id='gallery'>
      <div className='hr'></div>
      <div className='vr'></div>
      <h2>Галерея</h2>
      <div className='photo_container'>
        <ImageSlider slides={slides} parentWidth={1008.58}/>
      </div>
    </section>
  );
}
export default Gallery;