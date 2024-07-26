import React, { useState, useEffect } from 'react';
import { Transition } from '@headlessui/react';
import { ChevronUpIcon } from '@heroicons/react/outline';

const ScrollToTopButton = () => {
  const [isVisible, setIsVisible] = useState(false);

  const toggleVisibility = () => {
    if (window.pageYOffset > 300) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  useEffect(() => {
    window.addEventListener('scroll', toggleVisibility);
    return () => {
      window.removeEventListener('scroll', toggleVisibility);
    };
  }, []);

  return (
    <Transition
      show={isVisible}
      as="button"
      onClick={scrollToTop}
      className="fixed bottom-5 right-5 z-50 transition-opacity duration-300 opacity-25 hover:opacity-100"
    >
      <div className="bg-primary-600 p-3 rounded-full shadow-lg text-white">
        <ChevronUpIcon className="h-6 w-6" />
      </div>
    </Transition>
  );
};

export default ScrollToTopButton;
