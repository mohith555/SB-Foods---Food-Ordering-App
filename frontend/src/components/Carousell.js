import React, { useState } from 'react';

function Carousel() {
  const images = [
    { src: 'images/dosa.avif', caption: 'DOSA' },
    { src: 'images/idly.avif', caption: 'IDLY' },
    { src: 'images/poori.avif', caption: 'POORI' },
    { src: 'images/pongal.avif', caption: 'PONGAL' },
    { src: 'images/salad.avif', caption: 'SALAD' },
    { src: 'images/samosa.avif', caption: 'SAMOSA' },
    { src: 'images/omelette.avif', caption: 'OMELETTE' },
    { src: 'images/paratha.avif', caption: 'PARATHA' },
    { src: 'images/tea.avif', caption: 'TEA' },
    { src: 'images/juice.avif', caption: 'JUICE' },
    { src: 'images/vada.avif', caption: 'VADA' },
    { src: 'images/bonda.avif', caption: 'BONDA' },
    { src: 'images/cakes.avif', caption: 'CAKES' },
    { src: 'images/lassi.avif', caption: 'LASSI' },
    { src: 'images/shake.avif', caption: 'SHAKES' }
  ];

  const [scrollPosition, setScrollPosition] = useState(0);

  const handleScroll = (direction) => {
    const container = document.getElementById('carousel-container');
    const scrollStep = 300; // Adjust as needed for your design
    const containerWidth = container.offsetWidth;
    const maxScroll = container.scrollWidth - containerWidth;

    if (direction === 'prev') {
      setScrollPosition((prevPosition) => Math.max(prevPosition - scrollStep, 0));
    } else if (direction === 'next') {
      setScrollPosition((prevPosition) => Math.min(prevPosition + scrollStep, maxScroll));
    }
  };

  return (
    <div className="carousel">
      <div className="carousel-controls">
        <button className="carousel-control prev" onClick={() => handleScroll('prev')}>
          &#10094;
        </button>
        <button className="carousel-control next" onClick={() => handleScroll('next')}>
          &#10095;
        </button>
      </div>
      <div className="carousel-container" id="carousel-container" style={{ overflowX: 'hidden' }}>
        <div className="carousel-inner" style={{ transform: `translateX(-${scrollPosition}px)` }}>
          {images.map((image, index) => (
            <div className="carousel-item" key={index}>
              <img src={image.src} alt={image.caption} />
              <div className="caption">{image.caption}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Carousel;
