import { useState } from 'react';
import pesoPluma from "/PesoPluma.webp";
import concierto from '/Concierto.png';
import { useAuth } from '../../contexts/AuthContext';

function UserContent() {
  const [hovered1, setHovered1] = useState(false);
  const [hovered2, setHovered2] = useState(false);
  const { user } = useAuth();

  return (
    <>
      {user.role === 'user' ? (
        <>
          <div className='w-4/5 mx-auto mt-5 text-center lg:text-left md:text-left'>
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8 items-center'>
              <img src={pesoPluma} className="rounded-xl w-400 transition hover:scale-105 duration-200" />

              <div
                onMouseEnter={() => setHovered1(true)}
                onMouseLeave={() => setHovered1(false)}
                className={`grid lg:text-5xl md:text-4xl sm:text-4xl font-extrabold transition-opacity duration-1000 ease-in-out cursor-pointer ${hovered1 ? 'opacity-100' : 'opacity-25'}`}>
                <span>Todos tus </span>
                <span><span className='text-primary-350'> eventos </span>en </span>
                <span>mismo lugar</span>
              </div>
            </div>
          </div>

          <div className='w-4/5 mx-auto mt-5 text-center lg:text-right md:text-right'>
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8 items-center'>
              <div className='order-2 md:order-2 lg:order-2 sm:order-1 xs:order-1'>
                <img src={concierto} className="rounded-xl w-400 transition hover:scale-105 duration-200" />
              </div>

              <div
                onMouseEnter={() => setHovered2(true)}
                onMouseLeave={() => setHovered2(false)}
                className={`order-1 md:order-1 lg:order-1 sm:order-2 xs:order-1 grid lg:text-5xl md:text-4xl sm:text-4xl font-extrabold transition-opacity duration-1000 ease-in-out cursor-pointer ${hovered2 ? 'opacity-100' : 'opacity-25'}`}>
                <span className='text-primary-500'> Musica: </span>
                <span>Descubre,</span>
                <span>vive, disfruta</span>
                <span>repite.</span>
              </div>
            </div>
          </div>
        </>
      ) : (
        <>
          <div className='w-4/5 mx-auto mt-5 text-center lg:text-left md:text-left'>
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8 items-center'>
              <img src={pesoPluma} className="rounded-xl w-400 transition hover:scale-105 duration-200" />

              <div
                onMouseEnter={() => setHovered1(true)}
                onMouseLeave={() => setHovered1(false)}
                className={`grid lg:text-5xl md:text-4xl sm:text-4xl font-extrabold transition-opacity duration-1000 ease-in-out cursor-pointer ${hovered1 ? 'opacity-100' : 'opacity-25'}`}>
                <span>Promociona </span>
                <span>tu evento con </span>
                <span className='text-primary-350'>nosotros</span>
              </div>
            </div>
          </div>

          <div className='w-4/5 mx-auto mt-5 text-center lg:text-right md:text-right'>
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8 items-center'>
              <div className='order-2 md:order-2 lg:order-2 sm:order-1 xs:order-1'>
                <img src={concierto} className="rounded-xl w-400 transition hover:scale-105 duration-200" />
              </div>

              <div
                onMouseEnter={() => setHovered2(true)}
                onMouseLeave={() => setHovered2(false)}
                className={`order-1 md:order-1 lg:order-1 sm:order-2 xs:order-1 grid lg:text-5xl md:text-4xl sm:text-4xl font-extrabold transition-opacity duration-1000 ease-in-out cursor-pointer ${hovered2 ? 'opacity-100' : 'opacity-25'}`}>
                <span> Haz una </span>
                <span>Solicitud de </span>
                <span><span className='text-primary-500'>evento</span> hoy</span>
                <span>mismo!</span>
              </div>
            </div>
          </div>
        </>
      )}

    </>
  );
}

export default UserContent;
