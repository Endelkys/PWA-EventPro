const PaymentRecord = require('../models/paymentRecordModel.js');
const Event = require('../models/eventModel');
const { sendMailApprovedPayment } = require('../config/nodemailer');

const createPaymentRecord = async (req, res) => {
  try {
    const user = req.user;

    const { payment, event, ticket, amount } = req.body;

    const orderNumber = Math.floor(100000 + Math.random() * 900000);

    const newPaymentRecord = new PaymentRecord({
      payment,
      event,
      ticket,
      amount,
      user: user._id,
      orderNumber,
    });

    const paymentSaved = await newPaymentRecord.save();

    res.status(201).json({
      status: 201,
      message: "Registro de pago creado exitosamente",
      paymentSaved,
    })
  } catch (error) {
    console.error('Error al crear el registro de pago:', error);
    return res.status(500).json({ message: 'Hubo un error al procesar la solicitud' });
  }
}

const approvePayment = async (req, res) => {
  try {
    const { id } = req.params;

    const paymentRecord = await PaymentRecord.findById(id).populate('user', 'name email');

    if (!paymentRecord) {
      return res.status(404).json({ message: 'Pago no encontrado' });
    }

    const event = await Event.findById(paymentRecord.event);

    //Verificar que si exista ese evento
    if (!event) {
      return res.status(404).json({ message: 'Evento asociado al pago no encontrado' });
    }

    //aprobar estatus
    paymentRecord.payment.status = 'Aprobado';
    paymentRecord.approvedBy = req.user._id;

    //Restamos la cantidad comprada de la disponible
    event.tickets.forEach(ticket => {
      if (ticket._id.equals(paymentRecord.ticket)) {
        ticket.available -= paymentRecord.amount;
      }
    })

    const approvedPayment = await paymentRecord.save();
    const eventUpdated = await event.save();

    //Envio de correo electronico de aprobacion
    sendMailApprovedPayment(paymentRecord.user.name, paymentRecord.user.email, approvedPayment, eventUpdated);

    res.status(201).json({
      status: 201,
      message: "Pago aprobado exitosamente",
      approvedPayment,
      eventUpdated,
    })
  } catch (error) {
    console.error('Error al aprobar el registro de pago:', error);
    return res.status(500).json({ message: 'Hubo un error al procesar la solicitud' });
  }
}

const deletePayment = async (req, res) => {
  try {
    const { id } = req.params;

    const paymentDeleted = await PaymentRecord.findByIdAndDelete(id);

    if (!paymentDeleted) {
      return res.status(404).json({ message: 'Pago a eliminar no encontrado' });
    }
    res.status(200).json({
      status: 200,
      message: "Pago eliminado exitosamente",
      paymentDeleted,
    })
  } catch (error) {
    console.error('Error al eliminar el registro de pago:', error);
    return res.status(500).json({ message: 'Hubo un error al procesar la solicitud' });
  }
}

const getPaymentRecords = async (req, res) => {
  try {
    const paymentRecords = await PaymentRecord.find({ 'payment.status': 'Pendiente' })
      .populate('event', 'name tickets')
      .populate('user', 'name email');

    if (!paymentRecords || paymentRecords.length === 0) {
      return res.status(404).json({ message: 'No se han encontrado pagos registrados' });
    }

    res.status(200).json({
      status: 200,
      message: "Exitoso",
      paymentRecords,
    });
  } catch (error) {
    console.error('Error al consultar registros de pago:', error);
    return res.status(500).json({ message: 'Hubo un error al procesar la solicitud' });
  }
}

const getPaymentRecordsUser = async (req, res) => {
  try {
    const user = req.user._id;
    const paymentRecords = await PaymentRecord.find({ user, 'payment.status': 'Aprobado' })
      .populate('event', 'name place image tickets')
      .populate('user', 'name email');

    if (!paymentRecords || paymentRecords.length === 0) {
      return res.status(404).json({ message: 'No se han encontrado pagos registrados' });
    }

    res.status(200).json({
      status: 200,
      message: "Exitoso",
      paymentRecords,
    });
  } catch (error) {
    console.error('Error al consultar registros de pago:', error);
    return res.status(500).json({ message: 'Hubo un error al procesar la solicitud' });
  }
}

module.exports = { getPaymentRecords, getPaymentRecordsUser, createPaymentRecord, approvePayment, deletePayment };