import React, { useState, useEffect } from 'react';
import rawa from '/rawa.jpg';
import mesoneros from '/mesoneros.jpg';
import ctan from '/ctan.jpg';
import relsb from '/relsb.jpg';

const images = [rawa, mesoneros, ctan, relsb];

const carouselText = [
  'Rawayana',
  'Los Mesoneros',
  'C Tangana',
  'Rels B',
];

const Carousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      if (!isTransitioning) {
        setCurrentIndex((prevIndex) =>
          prevIndex === images.length - 1 ? 0 : prevIndex + 1
        );
        setIsTransitioning(true);
        setTimeout(() => {
          setIsTransitioning(false);
        }, 300);
      }
    }, 3000);
    return () => clearInterval(interval);
  }, [isTransitioning]);

  return (
    <div className="relative w-full mx-auto" style={{ maxHeight: '450px', marginBottom: '20px' }}>
      <div className="relative overflow-hidden" style={{ maxHeight: '450px' }}>
        <img
          src={images[currentIndex]}
          alt={`Slide ${currentIndex}`}
          className={`w-full rounded-xl h-auto object-cover transition-opacity duration-300 ${
            isTransitioning ? 'opacity-0' : 'opacity-100'
          }`}
          style={{ maxHeight: '450px', width: '90%', margin: 'auto' }}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        />
        {isHovered && (
         <div className="absolute max-w-fit bottom-0 left-0 right-0 bg-purple-700 text-white text-xl font-bold rounded-xl text-center p-2 mb-5 opacity-80 inline-block mx-auto">
         {carouselText[currentIndex]}
       </div>
       
        )}
      </div>
    </div>
  );
};

export default Carousel;
