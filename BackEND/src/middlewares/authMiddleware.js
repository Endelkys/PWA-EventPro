const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const createError = require('../utils/appError');
const { SECRET_KEY } = process.env;

//Verificar token en la solicitudes
const verifyToken = (req, res, next) => {
  const token = req.headers.authorization;

  if (!token) {
    return next(new createError('Token de autorizacion no proporcionado'))
  }

  try {
    const decoded = jwt.verify(token, SECRET_KEY);
    req.user = decoded;
    next();
  } catch (error) {
    console.log(error)
    next(new createError('Token de autorizacion no válido'));
  }
}

//Middleware para renovar token
const renewToken = (req, res, next) => {
  try {
    const token = jwt.sign({ _id: req.user._id, role: req.user.role}, SECRET_KEY, {
      expiresIn: '90d',
    });
    res.status(200).json({token})
  } catch (error) {
    next(new createError('Error al renovar el token', 500));
  }
}

const createToken = (user) => {
  return jwt.sign(user, SECRET_KEY, {
    expiresIn: '90d',
  })
}

const comparePasswords = async (plainPassword, hashedPassword) => {
  return await bcrypt.compare(plainPassword, hashedPassword);
}

const hashPassword = async (password) => {
  return await bcrypt.hash(password, 12);
}

module.exports = { verifyToken, renewToken, createToken, comparePasswords, hashPassword };