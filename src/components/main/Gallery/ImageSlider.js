import { useState } from "react";
import './image_slider.scss'

const ImageSlider = ({ slides, parentWidth }) => {
    const [currentIndex, setCurrentIndex] = useState(0)

    const slideImage = (slideIndex) => ({
        ...slideStyles,
        backgroundImage: `url(${slides[slideIndex].url})`,
        width: `${parentWidth}px`
    });

    const getSlidesContainerStylesWithWidth = () => ({
        ...slideContainerStyles,
        width: parentWidth * slides.length,
        transform: `translateX(${-(currentIndex * parentWidth)}px) `
    });

    const goToPrevious = () => {
        const isFirstSlide = currentIndex === 0;
        const newIndex = isFirstSlide ? slides.length - 1 : currentIndex - 1;
        setCurrentIndex(newIndex);
    };
    const goToNext = () => {
        const isLastSlide = currentIndex === slides.length - 1;
        const newIndex = isLastSlide ? 0 : currentIndex + 1;
        setCurrentIndex(newIndex);
    };
    const goToSlide = slideIndex => {
        const newIndex = slideIndex;
        setCurrentIndex(newIndex);
    };

    const slideStyles = {
        width: '100%',
        height: '100%',
        borderRadius: '10px',
        backgroundPosition: 'center',
        backgroundSize: 'cover'
    };

    const slideContainerStyles = {
        display: 'flex',
        height: '100%',
        transition: 'transform ease-out 0.5s'
    };



    return (
        <div className="slider">
            <div className="left_arrow" onClick={goToPrevious}>←</div>
            <div className="right_arrow" onClick={goToNext}>→</div>
            <div className="container_overflow">
                <div className="photo_container" style={getSlidesContainerStylesWithWidth()}>
                    {slides.map((_, slideIndex) => (
                        <div key={slideIndex} style={slideImage(slideIndex)}></div>
                    ))}
                </div>
            </div>
            <div className="dot_container">
                {slides.map((_, slideIndex) => (
                    <div key={slideIndex} className="dot" onClick={() => goToSlide(slideIndex)}>○</div>
                ))}
            </div>
        </div>
    );
};
export default ImageSlider;