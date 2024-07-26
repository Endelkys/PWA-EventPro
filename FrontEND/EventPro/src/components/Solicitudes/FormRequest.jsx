import { useState, useEffect, useRef } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { createEvent, updateEvent } from '../../utils/eventRequest';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Boleto from './Boleto';

const FormRequest = ({ accepted, editingEvent, editing, setEditing, setUpdateEvents }) => {
  const { user } = useAuth();
  const nameRef = useRef(null);
  const timeRef = useRef(null);
  const [ticketsList, setTicketsList] = useState([]);
  const [formData, setFormData] = useState({
    name: '',
    date: new Date(Date.now()).toISOString().split('T')[0],
    time: '00:00',
    place: '',
    description: '',
    images: '',
    status: 'Por aprobar',
    tickets: ticketsList,
  });

  useEffect(() => {
    if (accepted) {
      console.log(accepted);
      //Formatear la fecha y la hora
      const localDate = new Date(accepted.date).toISOString().split('T')[0];
      const localTime = new Date(accepted.date).toLocaleTimeString('en-US', { hour12: false });

      setFormData({
        name: accepted.name,
        date: localDate,
        time: localTime || '',
        place: accepted.place,
        description: accepted.description,
        images: accepted.image,
        status: accepted.status,
      });
      setTicketsList(accepted.tickets);
      timeRef.current.focus();
    }
  }, [accepted]);

  useEffect(() => {
    if (editing) {
      if (!editingEvent) {
        return toast.error("No se ha encontrado el evento a editar");
      }
      //Formatear la fecha y la hora
      const localDate = new Date(editingEvent.date).toISOString().split('T')[0];
      const localTime = new Date(editingEvent.date).toLocaleTimeString('en-US', { hour12: false });

      setFormData({
        name: editingEvent.name,
        date: localDate,
        time: localTime || '',
        place: editingEvent.place,
        description: editingEvent.description,
        images: editingEvent.image,
        status: editingEvent.status,
      });
      setTicketsList(editingEvent.tickets);
      console.log(editingEvent)
      nameRef.current.focus();
    }
  }, [editing])

  useEffect(() => {
    setFormData({ ...formData, tickets: ticketsList })
  }, [ticketsList])

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editing && editingEvent || accepted) {
        //editar evento
        if (accepted && ticketsList.length === 0) {
          return toast.error("Debes agregarle al menos un tipo de entrada para aprobar el evento")
        }
        const event = editingEvent ? editingEvent : accepted;
        formData['promotorID'] = event.promotorID;
        const res = await updateEvent(event._id, formData)
        toast.success(res.data.message);
        setEditing(false)
      } else {
        //crear evento
        const res = await createEvent(formData);
        toast.success(res.data.message);
      }
      setFormData({
        name: '',
        date: new Date(Date.now()).toISOString().split('T')[0],
        time: '00:00',
        place: '',
        description: '',
        images: '',
        status: 'Por aprobar',
        tickets: [],
      });
      setTicketsList([]);
      setUpdateEvents(true);
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onload = (event) => {
      const image = new Image();
      image.src = event.target.result;

      image.onload = () => {
        const canvas = document.createElement('canvas');
        const maxSize = 800; // Tamaño máximo permitido

        let width = image.width;
        let height = image.height;

        if (width > height) {
          if (width > maxSize) {
            height *= maxSize / width;
            width = maxSize;
          }
        } else {
          if (height > maxSize) {
            width *= maxSize / height;
            height = maxSize;
          }
        }

        canvas.width = width;
        canvas.height = height;

        const ctx = canvas.getContext('2d');
        ctx.drawImage(image, 0, 0, width, height);

        const resizedImage = canvas.toDataURL('image/jpeg', 0.7); // Reducción de calidad a 70%

        setFormData({ ...formData, images: resizedImage });
      };
    };
    reader.readAsDataURL(file);
  };

  return (
    <div>
      <ToastContainer />
      <h2 className='bg-gradient-to-r from-complement-800 to-primary-600 montserrat text-3xl w-lg font-black text-center p-3 rounded-xl text-white'>{editing ? 'Editar Evento' : 'Cargar un Evento'}</h2>
      <form onSubmit={handleSubmit} className="max-w-lg mx-auto mt-5 p-5 lg:p-8 lg:rounded-2xl rounded-xl bg-primary-350 flex flex-col gap-3">
        <input
          type="text"
          placeholder="Nombre"
          name="name"
          ref={nameRef}
          value={formData.name}
          onChange={handleChange}
          className="p-2 bg-secondary-50 text-secondary-900 border rounded-xl w-full"
          required // Campo requerido
        />
        <input
          type="text"
          placeholder="Lugar del evento"
          name="place"
          value={formData.place}
          onChange={handleChange}
          className="p-2 bg-secondary-50 text-secondary-900 border rounded-xl"
          required // Campo requerido
        />
        <input
          type="date"
          name="date"
          value={formData.date}
          onChange={handleChange}
          className="p-2 bg-secondary-50 text-secondary-900 border rounded-xl"
          required // Campo requerido
        />
        {user.role === 'admin' && (
          <input
            type="time"
            name="time"
            id="time"
            ref={timeRef}
            className="p-2 bg-secondary-50 text-secondary-900 border rounded-xl"
            value={formData.time}
            onChange={handleChange}
          />

        )}
        <textarea
          type="text"
          placeholder="Descripción"
          name="description"
          value={formData.description}
          onChange={handleChange}
          className="p-2 bg-secondary-50 text-secondary-900 border rounded-xl md:col-span-2"
          required // Campo requerido
        />
        {user.role === 'admin' && (
          <>
            <select
              className='p-2 bg-secondary-50 text-secondary-900 border rounded-xl'
              name="status"
              id="status"
              value={formData.status}
              onChange={handleChange}
            >
              <option value="Por aprobar">Por aprobar</option>
              <option value="Disponible">Disponible</option>
              <option value="Finalizado">Finalizado</option>
            </select>
            <h2 className='bg-gradient-to-r from-complement-800 to-primary-600 montserrat text-xl w-lg font-black text-center p-3 rounded-xl text-white'>{editing ? 'Editar Boletos' : 'Cargar Boletos'}</h2>
            <Boleto
              ticketsList={ticketsList}
              setTicketsList={setTicketsList}
            />
          </>
        )}
        {!accepted && (
          <>
            <h2 className='md:col-span-2 text-secondary-900 text-center'>Agrega una Imagen para mostrar el Evento :</h2>
            <input
              type="file"
              className="p-2 bg-secondary-50 text-secondary-900 border rounded w-full hover:bg-gray-300 focus:outline-none focus:bg-white md:col-span-2"
              name="images"
              onChange={handleImageChange}
              required={!editing}
            />
          </>
        )}

        <button
          type="submit"
          className="bg-complement-500 hover:bg-complement-800 text-white font-bold py-2 px-4 rounded md:col-span-2"
        >
          Enviar
        </button>
      </form>
    </div>
  );
};

export default FormRequest;
