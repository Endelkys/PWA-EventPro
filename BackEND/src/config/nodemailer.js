const nodemailer = require('nodemailer');
const { welcome, approveEvent, approvedPayment } = require('../nodemailer/mails');
const { NODEMAILER_USER, NODEMAILER_PASS } = process.env;

const transporter = nodemailer.createTransport({
  service: 'Gmail',
  auth: {
    user: NODEMAILER_USER,
    pass: NODEMAILER_PASS,
  }
});

const sendMailRegister = (name, email) => {
  const welcomeMessage = welcome(name);

  const mailOptions = {
    from: NODEMAILER_USER,
    to: email,
    subject: 'Bienvenido a EventPro',
    html: welcomeMessage
  }
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
    } else {
      console.log("Correo enviado: ", info.response);
    }
  })
}

const sendMailApproveEvent = (name, email, event) => {
  const approveEventMessage = approveEvent(name, event);

  const mailOptions = {
    from: NODEMAILER_USER,
    to: email,
    subject: 'Evento aprobado',
    html: approveEventMessage
  }

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
    } else {
      console.log("Correo enviado: ", info.response);
    }
  })
};

const sendMailApprovedPayment = (name, email, payment, event) => {
  const approvedPaymentMessage = approvedPayment(name, payment, event);

  const mailOptions = {
    from: NODEMAILER_USER,
    to: email,
    subject: 'Pago aprobado',
    html: approvedPaymentMessage
  }

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
    } else {
      console.log("Correo enviado: ", info.response);
    }
  })
};

module.exports = { sendMailRegister, sendMailApproveEvent, sendMailApprovedPayment };