const welcome = (name) => {
  return `
<!DOCTYPE html>
<html lang="es">

<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <link
    href="https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,100..900;1,100..900&family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap"
    rel="stylesheet" />
  <title>Bienvenido a nuestro sitio</title>
  <style>
    body {
      font-family: 'Montserrat', 'Poppins', Arial, sans-serif;
      margin: 0;
      padding: 0;
      color-scheme: light dark;
      color: rgba(255, 255, 255, 0.87);
    }
    
    .container {
      background-color: linear-gradient(to right, #1e40af,#7e22ce)
      max-width: 600px;
      margin: 20px auto;
    }
    .content{
      background-color: #fff;
      padding: 20px;
      border-radius: 10px;
      box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    }

    header img {
      max-width: 200px;
    }

    h1 {
      color: #333;
    }

    p {
      color: #666;
    }

    .button {
      display: inline-block;
      background-color: #007bff;
      color: #fff;
      text-decoration: none;
      padding: 10px 20px;
      border-radius: 5px;
    }
  </style>
</head>

<body>
  <div class="container">
    <header>
      <img src="https://i.ibb.co/N6vdWyK/Logo.png" alt="Logo">
      <h1>Bienvenido ${name} a nuestro sitio</h1>
    </header>
    <p>¡Gracias por registrarte en nuestro sitio! Estamos emocionados de tenerte como parte de nuestra comunidad.</p>
    <p>Si tienes alguna pregunta o necesitas ayuda, no dudes en ponerte en contacto con nosotros.</p>
    <p>¡Esperamos que tengas una excelente experiencia en nuestro sitio y disfrutes de todos los eventos!</p>
  </div>
</body>

</html>
`}

const approveEvent = (name, event) => {
  return `
<!DOCTYPE html>
<html lang="es">

<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <link
    href="https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,100..900;1,100..900&family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap"
    rel="stylesheet" />
  <title>Bienvenido a nuestro sitio</title>
  <style>
    body {
      font-family: 'Montserrat', 'Poppins', Arial, sans-serif;
      margin: 0;
      padding: 0;
      color-scheme: light dark;
      color: rgba(255, 255, 255, 0.87);
    }
    
    .container {
      background-color: linear-gradient(to right, #1e40af,#7e22ce)
      max-width: 600px;
      margin: 20px auto;
    }
    .content{
      background-color: #fff;
      padding: 20px;
      border-radius: 10px;
      box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    }

    img {
      max-width: 120px;
    }

    h1 {
      color: #333;
    }

    p {
      color: #666;
    }

    .button {
      display: inline-block;
      background-color: #007bff;
      color: #fff;
      text-decoration: none;
      padding: 10px 20px;
      border-radius: 5px;
    }
  </style>
</head>

<body>
  <div class="container">
    <header>
      <img src="https://i.ibb.co/N6vdWyK/Logo.png" alt="Logo">
      <h1>Solicitud de Evento aprobada</h1>
    </header>
    <p>¡Hola ${name}! Nos complace informarte que tu solicitud de Evento <b>${event.name}</b> ha sido aprobada por uno de nuestros administradores.</p>
    <p>Si tienes alguna pregunta o necesitas ayuda, no dudes en ponerte en contacto con nosotros.</p>
    <p>¡Esperamos que tengas una excelente experiencia con este evento y nos cuentes como te fué!</p>
  </div>
</body>

</html>
`}

const approvedPayment = (name, payment, event) => {
  return `
<!DOCTYPE html>
<html lang="es">

<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <link
    href="https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,100..900;1,100..900&family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap"
    rel="stylesheet" />
  <title>Bienvenido a nuestro sitio</title>
  <style>
    body {
      font-family: 'Montserrat', 'Poppins', Arial, sans-serif;
      margin: 0;
      padding: 0;
      color-scheme: light dark;
      color: rgba(255, 255, 255, 0.87);
    }
    
    .container {
      background-color: linear-gradient(to right, #1e40af,#7e22ce)
      max-width: 600px;
      margin: 20px auto;
    }
    .content{
      background-color: #fff;
      padding: 20px;
      border-radius: 10px;
      box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    }

    img {
      max-width: 120px;
    }

    h1 {
      color: #333;
    }

    p {
      color: #666;
    }

    .button {
      display: inline-block;
      background-color: #007bff;
      color: #fff;
      text-decoration: none;
      padding: 10px 20px;
      border-radius: 5px;
    }
  </style>
</head>

<body>
  <div class="container">
    <header>
      <img src="https://i.ibb.co/N6vdWyK/Logo.png" alt="Logo">
      <h1>Pago aprobado </h1>
    </header>
    <p>¡Hola ${name}! Nos complace informarte que ha sido aprobado tu pago por ${payment.payment.rate}$ para el evento: ${event.name}.</p>
    <p>El numero de orden es: ${payment.orderNumber}</p>
    <p>Si tienes alguna pregunta o necesitas ayuda, no dudes en ponerte en contacto con nosotros.</p>
    <p>¡Esperamos que tengas una excelente experiencia en el evento y nos cuentes como te fué!</p>
  </div>
</body>

</html>
`}

module.exports = { welcome, approveEvent, approvedPayment }