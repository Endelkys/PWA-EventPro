import React, { useState, useEffect } from 'react';

const ProgressBar = () => {
  const [scrollPercentage, setScrollPercentage] = useState(0);

  useEffect(() => {
    const scrollListener = () => {
      const scrollPosition = window.scrollY;
      const windowHeight = window.innerHeight;
      const documentHeight = document.body.clientHeight;

      const totalScroll = documentHeight - windowHeight;
      const percentage = (scrollPosition / totalScroll) * 100;

      setScrollPercentage(percentage);
    };

    window.addEventListener('scroll', scrollListener);

    return () => {
      window.removeEventListener('scroll', scrollListener);
    };
  }, []);

  return (
    <div className="fixed top-0 left-0 w-full lg:h-2 md:h-3 sm:h-3 z-50">
      <div
        className="h-full bg-gradient-to-r from-complement-800 to-primary-600 animate-wiggle "
        style={{
          width: `${scrollPercentage}%`,
          transition: 'width 0.3s ease-in-out',
        }}
      />
    </div>
  );
};

export default ProgressBar;
