import { useState, useEffect } from 'react'
import { RiEdit2Line, RiDeleteBin6Line } from 'react-icons/ri'

const Boleto = ({ ticketsList, setTicketsList }) => {

  const [type, setType] = useState('')
  const [available, setAvailable] = useState(0)
  const [rate, setRate] = useState(0);
  const [editingTicket, setEditingTicket] = useState({});
  const tickets = ticketsList || [];

  const addTicket = () => {
    const values = {
      type,
      available,
      rate,
    }
    tickets.push(values);
    console.log(tickets);
    setTicketsList([...tickets]);
    setType('');
    setAvailable(0);
    setRate(0);
  }

  const editTicket = (index) => {
    setEditingTicket(tickets[index])
    deleteTicket(index);
  }

  useEffect(() => {
    //Pasar los datos al formulario de boletos
    setType(editingTicket.type);
    setAvailable(editingTicket.available);
    setRate(editingTicket.rate);
  }, [editingTicket])

  const deleteTicket = (index) =>{
    const updateTickets = [...tickets];
    updateTickets.splice(index, 1);
    setTicketsList(updateTickets);
  }

  return (
    <div className='flex flex-col justify-center items-center gap-2'>
      <h3>Agrega los boletos</h3>
      <input
        type="text"
        name="type"
        id="type"
        className="p-2 bg-secondary-50 text-secondary-900 border rounded-xl"
        value={type}
        placeholder='Tipo de boleto'
        onChange={(e) => setType(e.target.value)}
      />
      <div className='flex flex-col justify-center items-start'>
        Cantidad de Entradas
        <input
          type="number"
          name="available"
          id="available"
          className="p-2 bg-secondary-50 text-secondary-900 border rounded-xl"
          value={available}
          placeholder='Cantidad Disponible'
          onChange={(e) => setAvailable(e.target.value)}
        />
      </div>
      <div className='flex flex-col justify-center items-start'>
        Precio
        <input
          type="number"
          name="rate"
          id="rate"
          className="p-2 bg-secondary-50 text-secondary-900 border rounded-xl"
          value={rate}
          placeholder='Precio'
          onChange={(e) => setRate(e.target.value)}
        />
      </div>
      <button type='button' className='bg-primary-200 text-secondary-900 px-4 py-2 rounded my-2' onClick={addTicket}>Agregar Boleto</button>
      {ticketsList && (
        <div className='w-full'>
          {ticketsList.map((ticket, index) => (
            <div key={index} className="bg-secondary-50 text-secondary-900 rounded-lg flex justify-between shadow-md p-4 mb-4">
              <div className="w-2/3">
                <h2 className="text-2xl poppins font-bold mb-2">{ticket.type}</h2>
                <div className='flex justify-between items-center'>
                  <p className="text-secondary-700 mb-2">Cantidad: {ticket.available}</p>
                  <p className="text-secondary-700 mb-2">Precio: ${ticket.rate}</p>
                </div>
              </div>
              <div className="flex flex-col justify-end items-end">
                <button
                  type='button'
                  onClick={() => editTicket(index)}
                  className="py-2 px-4 text-xl rounded focus:text-secondary-600 focus:outline-none focus:shadow-outline"
                >
                  <RiEdit2Line />
                </button>
                <button
                  type='button'
                  onClick={() => deleteTicket(index)}
                  className="py-2 px-4 text-xl rounded focus:text-secondary-600 focus:outline-none focus:shadow-outline"
                >
                  <RiDeleteBin6Line />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

    </div>
  )
}

export default Boleto
