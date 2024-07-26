import { useEffect, useState } from 'react';
import { createPaymentRecord } from '../../utils/paymentRequest';
import { toast, ToastContainer } from 'react-toastify'
import Loading from '../Animation/Loading';

function Pagos({ event }) {
  const [selectedPayment, setSelectedPayment] = useState('PagoMovil');
  const [price, setPrice] = useState(0);
  const [ticketRate, setTicketRate] = useState(0);
  const [calculate, setCalculate] = useState(false);
  const [ticketData, setTicketData] = useState({
    type: 'seleccione un tipo de entrada',
    amount: '',
    ratePayment: 0,
  })
  const [formData, setFormData] = useState({
    type: selectedPayment,
    rate: '',
    reference: '',
    date: new Date(Date.now()).toISOString().split('T')[0],
    status: 'Pendiente',
  })

  /*
  useEffect(() => {

  }, [event])
  */

  const handlePaymentChange = (e) => {
    setSelectedPayment(e.target.value);
  };

  const selectTicket = (event, type) => {
    const selectedTicket = event.tickets.find(ticket => ticket.type === type);
    return selectedTicket;
  }

  const handleTicketChange = (e) => {
    const { name, value } = e.target;
    if (name === "type") {
      const selectedTicket = selectTicket(event, value);
      setTicketData({ ...ticketData, [name]: value });
      setTicketRate(selectedTicket.rate);
    } else {
      setTicketData({ ...ticketData, [name]: value });
    }
    setCalculate(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const selectedTicket = selectTicket(event, ticketData.type);
      const paymentRecord = {
        payment: formData,
        event: event._id,
        ticket: selectedTicket._id,
        amount: ticketData.amount,
      }
      const res = await createPaymentRecord(paymentRecord)
      toast.success(res.data.message);
      setTicketData({
        type: 'seleccione un tipo de entrada',
        amount: '',
        ratePayment: 0,
      })
      setFormData({
        type: selectedPayment,
        rate: '',
        reference: '',
        date: new Date(Date.now()).toISOString().split('T')[0],
        status: 'Pendiente',
      })
      console.log(res);
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    if (calculate) {
      const totalPrice = ticketData.amount * ticketRate;
      setPrice(totalPrice);
    }
  }, [ticketData.amount, ticketRate, calculate]);


  const handleFormChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  return (
    <>
      <ToastContainer />
      <h1 className='text-3xl text-center poppins font-bold mb-4 bg-gradient-to-r w-fit p-3 mx-auto from-complement-800 to-primary-600 rounded-xl shadow-2xl overflow-hidden'>Métodos de Pago</h1>

      <div className="flex justify-center mb-4">
        <select value={selectedPayment} onChange={handlePaymentChange} className="animate-pulse p-2 border rounded-lg text-white">
          <option value="PagoMovil">Pago Móvil</option>
          <option value="Transferencia">Transferencia</option>
        </select>
      </div>

      <div className='mx-auto w-4/5 text-center mt-5 montserrat'>
        <div className='bg-primary-800 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8 items-center p-8 rounded-2xl'>
          <div className='font-extrabold lg:text-2xl md:text-xl sm:text-xl'>
            <h1 className='text-primary-250 text-3xl mb-5'>{selectedPayment === 'PagoMovil' ? 'Pago Móvil' : 'Transferencia'}</h1>
            <h2>Inversiones EventPro C.A</h2>
            <h2>J-501782500</h2>
            <h2>{selectedPayment === 'PagoMovil' ? '04129164371' : '1234-5678-1234-5678'}</h2>
            <h2>Banco de Venezuela</h2>
          </div>
          <div className='flex flex-col gap-3'>
            <div className='bg-gradient-to-r lg:w-4/5 md:w-full sm:w-full p-3 mx-auto from-complement-800 to-primary-600 rounded-2xl shadow-2xl overflow-hidden'>
              <div className='p-2'>
                <select
                  name="type"
                  id="type"
                  className="appearance-none border rounded-2xl w-full py-4 px-3 text-black placeholder-gray-500 leading-tight focus:outline-none focus:shadow-outline bg-white mb-4"
                  value={ticketData.type}
                  onChange={handleTicketChange}
                >
                  <option value="seleccione un tipo de entrada">seleccion un tipo de entrada</option>
                  {event && (
                    <>
                      {event.tickets.map((ticket, index) => (
                        <option
                          key={index}
                          value={ticket.type}
                        >
                          {ticket.type}
                        </option>
                      ))}
                    </>
                  )}
                </select>
                <input
                  type="number"
                  id="amount"
                  name="amount"
                  placeholder="Ingrese la cantidad de entradas"
                  className="appearance-none border rounded-2xl w-full py-4 px-3 text-black placeholder-gray-500 leading-tight focus:outline-none focus:shadow-outline bg-white mb-4"
                  value={ticketData.amount}
                  onChange={handleTicketChange}
                />
                <p className='font-bold'>Total: ${price}</p>
              </div>
            </div>
            <div className='bg-gradient-to-r lg:w-4/5 md:w-full sm:w-full p-3 mx-auto from-complement-800 to-primary-600 rounded-2xl shadow-2xl overflow-hidden'>
              <form className='p-2' onSubmit={handleSubmit}>
                <input
                  type="text"
                  id="rate"
                  name="rate"
                  placeholder="Ingrese el monto"
                  className="appearance-none border rounded-2xl w-full py-4 px-3 text-black placeholder-gray-500 leading-tight focus:outline-none focus:shadow-outline bg-white mb-4"
                  onChange={handleFormChange}
                  value={formData.rate}
                />
                <input
                  type="text"
                  id="reference"
                  name="reference"
                  placeholder="Ingrese la referencia"
                  className="appearance-none border rounded-2xl w-full py-4 px-3 text-black placeholder-gray-500 leading-tight focus:outline-none focus:shadow-outline bg-white mb-4"
                  onChange={handleFormChange}
                  value={formData.reference}
                />

                <input
                  type="date"
                  id="date"
                  name="date"
                  className="appearance-none border rounded-2xl w-full py-4 px-3 text-black placeholder-gray-500 leading-tight focus:outline-none focus:shadow-outline bg-white mb-6"
                  onChange={handleFormChange}
                  value={formData.date}
                />
                <div className="flex items-center justify-center">
                  <button type="submit" className="lg:text-xl md:text-lg sm:text-lg bg-primary-400 hover:bg-primary-500 text-white font-bold py-3 px-6 rounded-2xl focus:outline-none focus:shadow-outline">Enviar Pago</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>

      <div className='text-center lg:w-3/5 md:w-3/5 sm:w-4/5 text-xl font-bold mx-auto mt-5'>
        <h1>Tu pago será verificado por uno de nuestros Administradores, y si todos los datos son correctos, te lo haremos saber!</h1>
      </div>

    </>
  );
}

export default Pagos;
