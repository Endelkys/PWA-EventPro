import React, { useState } from 'react';
import { useTrail, animated } from '@react-spring/web';

const Trail = ({ open, children }) => {
  const items = React.Children.toArray(children);
  const trail = useTrail(items.length, {
    config: { mass: 5, tension: 2000, friction: 200 },
    opacity: open ? 1 : 0,
    y: open ? 0 : 10, // Ajusta el valor de y para reducir el espacio entre los elementos
    from: { opacity: 0, y: 10 },
  });
  return (
    <div>
      {trail.map(({ y, ...style }, index) => (
        <animated.div key={index} className="relative w-full leading-none text-white lg:text-6xl md:text-5xl sm:text-4xl xs:text-3xl font-extrabold tracking-wide transform-gpu transition-opacity overflow-hidden font-sans" style={{ ...style, marginBottom: y }}>
          <animated.div>{items[index]}</animated.div>
        </animated.div>
      ))}
    </div>
  );
};

export default function App() {
  const [open, setOpen] = useState(true);
  return (
    <>
      <div onClick={() => setOpen((prev) => !prev)}>
        <Trail open={open}>
          <span className='dark:text-secondary-50 text-secondary-500'>Conectar,</span>
          <span className='dark:text-primary-250  text-primary-650'>Explorar,</span>
          <span className='dark:text-primary-350 text-primary-500'>Disfrutar,</span>
          <span className='dark:text-primary-650  text-primary-400'>Experimentar</span>
        </Trail>
      </div>
    </>
  );
}
