const express = require('express');
const cors = require('cors');
require('dotenv').config();
//Conexion base de datos
require('./config/database');

// Importar Rutas
const authRouter = require('./routes/userRoutes');
const eventRouter = require('./routes/eventRoutes');
const paymentRouter = require('./routes/paymentRoutes');

const app = express();
// PUERTO
app.set('port', process.env.PORT || 4000);

// Middleware
app.use(cors({
  origin: ['http://localhost:3000', 'http://localhost:3010'],
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true
}));

app.use(express.json());

//Rutas
app.use('/api/auth', authRouter);
app.use('/api/events', eventRouter);
app.use('/api/payments', paymentRouter);

// Global Error
app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || 'An error occurred';
  
  res.status(statusCode).json({
    status: 'error',
    message,
  });
});


module.exports = app;