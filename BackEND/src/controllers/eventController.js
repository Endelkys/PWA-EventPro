const Event = require('../models/eventModel');
const User = require('../models/userModel');
const PaymentRecord = require('../models/paymentRecordModel.js');
const { sendMailApproveEvent } = require('../config/nodemailer');

const createEvent = async (req, res) => {
  try {
    const user = req.user;

    if (user.role !== 'promotor' && user.role !== 'admin') {
      return res.status(401).json({ message: 'No estás autorizado para agregar eventos. Contáctate con el administrador' });
    }

    const promotorID = user._id;
    const { name, date, time, place, description, images, status, tickets } = req.body;

    const newEvent = new Event({
      name,
      date: `${time ? new Date(date + 'T' + time) : date}`,
      place,
      description,
      image: images,
      status,
      promotorID,
      tickets,
    });

    const eventSaved = await newEvent.save();

    res.status(201).json({
      status: 201,
      message: 'Solictud de Evento Agregado con éxito',
      eventSaved
    });
  } catch (error) {
    console.log('Error al crear el evento: ', error);
    return res.status(500).json({ message: "Error al crear el evento" });
  }
}

const updateEvent = async (req, res) => {
  try {
    const user = req.user;

    if (user.role !== 'admin') {
      return res.status(401).json({ message: 'No estás autorizado para editar eventos. Contáctate con el administrador' });
    }

    const id = req.params.id;

    const { name, date, time, place, description, images, status, promotorID, tickets } = req.body;

    const updateEvent = await Event.findByIdAndUpdate(id, {
      name,
      date: `${time ? new Date(date + 'T' + time) : date}`,
      place,
      description,
      image: images,
      status,
      promotorID,
      tickets,
    }, { new: true });

    if (!updateEvent) {
      return next(new createError("Evento no encontrado", 404));
    }

    const userFound = await User.findById(user._id);

    sendMailApproveEvent(userFound.name, userFound.email, updateEvent);

    res.status(201).json({
      status: 201,
      message: 'Evento modificado con éxito',
      updateEvent,
    });
  } catch (error) {
    console.log(error)
    return res.status(500).json({ message: "Error al editar el evento" })
  }
}

const deleteEvent = async (req, res) => {
  const id = req.params.id;
  try {
    const eventDeleted = await Event.findByIdAndDelete(id)

    if (!eventDeleted) {
      return res.status(404).json({ message: "No se encontró el evento que se desea eliminar" });
    }

    res.status(200).json({
      message: 'Exitoso',
      status: 200,
      events: eventDeleted
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error del servidor al buscar eventos" });
  }
}

const getEventsByPromotorIdStatus = async (req, res) => {
  const promotorID = req.params.id;
  try {
    // Verificar si el promotor existe
    const promotor = await User.findById(promotorID);

    if (!promotor) {
      return res.status(404).json({ message: "Promotor no encontrado" });
    }

    const events = await Event.find({ promotorID, status: 'Por aprobar' }).populate('promotorID');

    if (!events || events.length === 0) {
      return res.status(404).json({ message: "No se encontraron eventos por aprobar para este promotor" });
    }

    res.status(200).json({
      message: 'Exitoso',
      status: 200,
      events: events
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error del servidor al buscar eventos" });
  }
}


const getEventsStatus = async (req, res) => {
  try {
    const status = req.params.filter;

    if (!status && status !== 'Disponible' && status !== 'Por aprobar' && status !== 'Finalizado') {
      return res.status(400).json({ message: "No se ha seleccionado ningun estatus válido para consultar " });
    }

    const events = await Event.find({ status: status }).populate('promotorID', 'name email');

    if (!events || events.length === 0) {
      return res.status(404).json({ message: `No se encontraron eventos ${status}` })
    }

    res.status(200).json({
      message: 'Exitoso',
      status: 200,
      events
    })
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error del servidor al buscar eventos" });
  }
};

const getEventsWithSalesInfo = async (req, res) => {
  try {
    // Obtener los IDs de eventos con al menos un ticket vendido
    const eventsWithSales = await PaymentRecord.distinct('event', { event: { $ne: null } });

    // Buscar los eventos que tienen tickets vendidos
    const events = await Event.find({ _id: { $in: eventsWithSales }, status: 'Disponible' });

    const eventsInfoSales = [];

    for (const event of events) {
      // Calcular la cantidad de tickets vendidos para este evento
      const ticketsSold = await PaymentRecord.countDocuments({ event: event._id });

      // Calcular el total de ventas recibidas para este evento
      const totalSales = await PaymentRecord.aggregate([
        { $match: { event: event._id } },
        { $group: { _id: null, totalAmount: { $sum: '$amount' } } }
      ]);

      const eventWithSalesInfo = {
        _id: event._id,
        name: event.name,
        date: event.date,
        place: event.place,
        description: event.description,
        image: event.image,
        status: event.status,
        promotorID: event.promotorID,
        tickets: event.tickets,
        ticketsSold: ticketsSold,
        totalSales: totalSales.length > 0 ? totalSales[0].totalAmount : 0
      };

      // Agregar el evento con información de ventas al array
      eventsInfoSales.push(eventWithSalesInfo);
    }

    // Devolver los eventos con información de ventas
    res.status(200).json({
      status: 200,
      message: "Eventos con información de ventas obtenidos exitosamente",
      events: eventsInfoSales
    });
  } catch (error) {
    console.error('Error al obtener eventos con información de ventas:', error);
    return res.status(500).json({ message: 'Hubo un error al procesar la solicitud' });
  }
};


const getAllEvents = async (req, res) => {
  try {
    const events = await Event.find();

    if (!events || events.length === 0) {
      return res.status(404).json({ message: `No se encontraron eventos en la base de datos` })
    }

    res.status(200).json({
      message: 'Exitoso',
      status: 200,
      events
    })
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error del servidor al buscar eventos" });
  }
}

module.exports = { createEvent, updateEvent, getAllEvents, getEventsByPromotorIdStatus, getEventsStatus, getEventsWithSalesInfo, deleteEvent };