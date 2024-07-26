import { useAuth } from '../../contexts/AuthContext';
import Carousel from './carrusel';
import { Link } from 'react-router-dom';

function DashboardCards() {
  const { user } = useAuth();
  const firstName = user.name.split(' ')[0];

  return (
    <div className='dark:bg-primary-750 bg-primary-600 h-full -mt-8 p-8'>
      <h1 className='text-center text-3xl font-bold mb-6 relative'>
        Hola!{' '}
        <Link to="/profile" className='dark:text-primary-400 text-primary-300 relative group'>
          <span className="cursor-pointer hover:underline">{firstName}</span>
          <span className="absolute z-10 bg-gray-700 text-white text-xs rounded-lg py-1 px-2 -top-14 left-1/2 transform -translate-x-1/2 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
            ¿Quieres ver tu perfil?
            <svg className="absolute text-gray-700 h-2 top-full left-1/2 transform -translate-x-1/2" x="0px" y="0px" viewBox="0 0 255 255" fill="currentColor">
              <polygon className="fill-current" points="0,0 127.5,127.5 255,0"/>
            </svg>
          </span>
        </Link>{' '}
        Bienvenido a EventPro!
      </h1>

      {user.role === 'promotor' && (
        <h1 className='text-center text-3xl font-bold mb-6'>
          Gracias por ser parte de nosotros siendo <br /> uno de nuestros{' '}
          <span className='dark:text-primary-600 text-primary-100'>Promotores</span>!
        </h1>
      )}

      <Carousel />
    </div>
  );
}

export default DashboardCards;
