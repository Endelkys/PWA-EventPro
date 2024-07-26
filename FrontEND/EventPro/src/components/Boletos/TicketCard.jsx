import { useState, useEffect } from "react";
import { IoIosArrowBack, IoIosArrowDown } from 'react-icons/io';
import QRCode from 'qrcode.react'; // Importar la biblioteca QRCode

export default function TicketCard({ payment }) {
  const [mostrar, setMostrar] = useState(false);
  const [qrData, setQrData] = useState(""); // Estado para almacenar el contenido del QR

  useEffect(() => {
    // Lógica para generar el contenido del código QR (puedes ajustarlo según tu API)
    const qrContent = `Orden: ${payment.orderNumber}`;
    setQrData(qrContent);
  }, [payment.orderNumber]);

  const mostrarDetalles = () => {
    setMostrar(!mostrar);
  };

  return (
    <div className={`poppins ${mostrar ? 'lg:mb-0 md:mb-0 sm:mb-0' : 'lg:mb-32 md:mb-52 sm:mb-80'}`}>
      <div className={`dark:bg-secondary-50 dark:text-primary-900 bg-primary-650 text-white p-4 xl:p-6 flex flex-col rounded-2xl`}>
        <div className="flex justify-between">
          <p className="font-bold">Orden: #{payment.orderNumber}</p>
          <div className="flex gap-4">
            <p>Fecha: <span className='font-bold'>{new Date(payment.payment.date).toLocaleDateString()}</span></p>
            <button onClick={mostrarDetalles}>
              {mostrar ?
                <IoIosArrowBack />
                :
                <IoIosArrowDown />
              }
            </button>
          </div>
        </div>
        <div className={`${mostrar ? 'block' : 'hidden'} flex flex-col`}>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-3 lg:text-left md:text-left sm:text-center pb-1">
            <div className="order-1 md:order-1 lg:order-1 sm:order-2 flex flex-col flex-1 pr-3 gap-3">
              <h3 className="text-2xl font-bold my-6 sm:text-3xl">{payment.event.name}</h3>
              <p className={`font-semibold text-green-500 text-2xl`}><span className="dark:text-primary-900 text-white">Estatus:</span> {payment.payment.status}</p>
              
              <div className="flex flex-wrap text-2xl">
                <div className="xs:text-sm overflow-hidden">
                  <p className="text-2xl">Localización: <span className={`lg:ml-2 font-semibold text-xl `}>{payment.event.place}</span></p>
                </div>
              
              </div>
              <p className="font-bold text-2xl">Total: {payment.payment.rate}</p>
              <div className="flex lg:justify-start md:justify-start sm:justify-center">
                <QRCode value={qrData} size={150}/>
              </div>
            </div>
            <div className="flex-1 flex flex-col justify-center items-center order-2 md:order-2 lg:order-2 sm:order-1">
              <img className="max-h-72 rounded-lg sm:mt-5" src={payment.event.image} alt="" />
            </div>
          </div>
        </div>
      </div>
      <div className={`${mostrar ? 'block' : 'hidden'} dark:bg-primary-400 bg-primary-600 w-full p-3 text-center rounded-b-2xl -mt-3 `}>
        <p className="font-bold text-secondary-50 w-full text-xl">Orden de los boletos: #{payment.orderNumber}</p>
        <p className="font-semibold text-secondary-50 w-full text-md">No compartas este codigo con nadie</p>
      </div>
    </div>
  );
}
