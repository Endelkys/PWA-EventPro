import { useState } from 'react';
import ModalConfirm from "../ModalConfirm";
import { approvePayment, deletePaymentRecord } from '../../utils/paymentRequest';

function PaymentCard({ payment, id, setIsChanges, setErrorMessage, setSuccessMessage }) {
  const [isOpenModal, setIsOpenModal] = useState({});

  const handleOpenModal = (paymentId) => {
    setIsOpenModal(prevState => ({
      ...prevState,
      [paymentId]: true
    }));
  };

  const handleCloseModal = (paymentId) => {
    setIsOpenModal(prevState => ({
      ...prevState,
      [paymentId]: false
    }));
  };


  const acceptPayment = async (id) => {
    try {
      const res = await approvePayment(id)
      setSuccessMessage(res.data.message);
      setIsChanges(true);
    } catch (error) {
      console.log(error)
      setErrorMessage(error.response.data.message);
    }
  }
  
  const deletePayment = async (id) => {
    try {
      const res = await deletePaymentRecord(id);
      setSuccessMessage(res.data.message);
      setIsChanges(true);
    } catch (error) {
      console.log
      setErrorMessage(error.response.data.message);
    }
  }

  const ticketFound = payment.event.tickets.find(ticket => ticket._id === payment.ticket)
  return (
    <div className=''>
      <div className="bg-primary-350 poppins font-bold p-4 rounded-t-2xl shadow-md text-xl text-center">
        <div className="bg-gradient-to-r from-complement-800 to-primary-600 font-semibold flex flex-col justify-center items-center mx-auto w-fit p-3 rounded-xl mb-2">
          <p className="sm:text-lg md:text-md xl:text-lg">{payment.user.name}</p>
          <p className="sm:text-lg md:text-md xl:text-lg">{payment.user.email}</p>
        </div>
        <p className="font-bold text-primary-900 text-3xl mt-2 mb-3">{payment.payment.type}</p>
        <p>Monto: {payment.payment.rate}$</p>
        <p>Referencia: {payment.payment.reference}</p>
        <p>Fecha: {new Date(payment.payment.date).toLocaleDateString()}</p>
        <p>Evento: {payment.event.name}</p>
        <p>Boleto: {ticketFound.type}</p>
        <p>Cantidad: {payment.amount}</p>
      </div>
      <div className="bg-primary-500 poppins flex justify-center gap-3 font-bold p-4 rounded-b-2xl shadow-md text-center">
        <button
          className='bg-blue-500 w-36 rounded-xl text-center p-2 sm:text-md md:text-lg lg:text-lg hover:bg-complement-800'
          onClick={() => acceptPayment(id)}
        >
          Aceptar
        </button>
        <button
          className="bg-red-500 w-36 rounded-xl p-2 sm:text-md md:text-lg lg:text-lg hover:bg-red-800"
          onClick={() => handleOpenModal(id)}
        >
          Rechazar
        </button>
      </div>
      <ModalConfirm
        isOpen={isOpenModal[id]}
        onCancel={() => handleCloseModal(id)}
        onConfirm={() => deletePayment(id)}
        id={id}
      />
    </div>
  );
}

export default PaymentCard;
