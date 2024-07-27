const User = require('../models/userModel');
const createError = require('../utils/appError');
const jwt = require('jsonwebtoken')
const { hashPassword, comparePasswords, createToken } = require('../middlewares/authMiddleware');
const { sendMailRegister } = require('../config/nodemailer');

exports.singup = async (req, res, next) => {
  try {
    const { name, email, password, role } = req.body;

    const userExists = await User.findOne({ email });

    if (userExists) {
      return next(new createError("Usuario ya existe", 400));
    }

    const hashedPassword = await hashPassword(password);

    const newUser = await User.create({
      name,
      email,
      password: hashedPassword,
      role: role || 'user', // Si no se proporciona un rol, se establece como 'user'
    });

    //Envio de correo electronico de bienvenida
    sendMailRegister(newUser.name, newUser.email);

    res.status(201).json({
      status: 'Exitoso',
      message: 'Usuario Registrado correctamente',
      user: {
        _id: newUser._id,
        name: newUser.name,
        email: newUser.email,
        role: newUser.role,
      },
    });

  } catch (error) {
    console.log(error)
    next(error);
  }
};


// Login de Usarios
exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) return next(new createError("Usuario no encontrado", 404));


    const isPasswordValid = await comparePasswords(password, user.password);

    if (!isPasswordValid) {
      return next(new createError('Email o Contraseña Invalido', 401));
    }

    // Generar token
    const token = createToken({ '_id': user._id, 'role': user.role });

    res.status(200).json({
      status: 'Exitoso',
      token,
      message: 'Inicio de sesion exitoso',
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

// Eliminar un usuario por ID
exports.deleteUser = async (req, res, next) => {
  try {
    const userId = req.params.id;
    const user = await User.findByIdAndDelete(userId);

    if (!user) {
      return next(new createError("Usuario no encontrado", 404));
    }

    res.status(200).json({
      status: 'Exitoso',
      message: 'Usuario eliminado correctamente',
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    next(error);
  }
};

// Editar un usuario por ID
exports.updateUser = async (req, res, next) => {
  try {
    const userId = req.params.id;
    const { name, email, role } = req.body;

    const updatedUser = await User.findByIdAndUpdate(userId, { name, email, role }, { new: true });

    if (!updatedUser) {
      return next(new createError("Usuario no encontrado", 404));
    }

    res.status(200).json({
      status: 'Exitoso',
      message: 'Usuario actualizado correctamente',
      user: {
        _id: updatedUser._id,
        name: updatedUser.name,
        email: updatedUser.email,
        role: updatedUser.role,
      },
    });
  } catch (error) {
    next(error);
  }
};

// Obtener todos los usuarios
exports.getAllUsers = async (req, res, next) => {
  try {
    const users = await User.find();

    res.status(200).json({
      status: 'Exitoso',
      count: users.length,
      users: users.map(user => ({
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      })),
    });
  } catch (error) {
    next(error);
  }
};

// Obtener un usuario por ID
exports.getUserById = async (req, res, next) => {
  try {
    const userId = req.params.id;
    const user = await User.findById(userId);

    if (!user) {
      return next(new createError("Usuario no encontrado", 404));
    }

    res.status(200).json({
      status: 'Exitoso',
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    next(error);
  }
};

exports.verifySesion = async (req, res, next) => {
  try {
    const { token } = req.body;

    if (!token) {
      return res.status(400).json({ message: "No hay sesión activa, vuelva a ingresar" })
    }

    const decoded = jwt.verify(token, process.env.SECRET_KEY,)
    const userFound = await User.findById(decoded)

    if (!userFound) return res.status(400).json({ message: "Token inválido" })

    res.status(200).json({
      status: 'Exitoso',
      token,
      message: 'Inicio de sesion exitoso',
      user: {
        _id: userFound._id,
        name: userFound.name,
        email: userFound.email,
        role: userFound.role,
      },
    });
  } catch (error) {

  }
}
