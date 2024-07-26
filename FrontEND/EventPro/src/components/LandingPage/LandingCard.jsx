import { Link } from 'react-router-dom';

function LandingCard() {
  return (

    <div className="flex justify-center items-center">
      <div className="max-w-md w-full md:w-4/5 bg-gradient-to-r from-blue-800 to-primary-600 rounded-xl shadow-2xl overflow-hidden p-8" style={{ animation: 'slideInFromLeft 1s ease-out', margin: 0 }}>
        <div className='mb-3'>
          <h2 className="text-center lg:text-5xl md:text-4xl sm:text-3xl xs:text-3xl font-extrabold text-secondary-50" style={{ animation: 'appear 2s ease-out', margin: 0 }}>
            ¡Bienvenido a EventPro!</h2>
        </div>
        <p className='text-secondary-50'>Sumérgete en el emocionante mundo de los eventos y boletos. Con EventPro, tendrás acceso a una amplia gama de eventos emocionantes, desde conciertos y festivales hasta conferencias y obras de teatro. Descubre experiencias inolvidables y asegura tus boletos con facilidad. ¡Prepárate para vivir momentos inolvidables con EventPro!</p>

        <div className="flex justify-center gap-5 mt-4">
          <Link 
            className="bg-blue-500 hover:bg-blue-600 text-secondary-50 font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline animate-bounce" 
            to={"/login"}
          >
            Login
          </Link>
          <Link 
            className="bg-primary-500 hover:bg-primary-600 text-secondary-50 font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline animate-bounce" 
            to={"/register"}
          >
            Registro
          </Link>
        </div>
      </div>

    </div>

  )
}

export default LandingCard
