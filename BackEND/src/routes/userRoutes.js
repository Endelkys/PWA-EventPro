const express = require('express');
const userController = require('../controllers/UserController');

const router = express.Router();

router.post('/singup', userController.singup);
router.post('/login', userController.login);
router.delete('/users/:id', userController.deleteUser);
router.put('/users/:id', userController.updateUser);
router.get('/users', userController.getAllUsers);
router.get('/users/:id', userController.getUserById);
router.post('/verify', userController.verifySesion);

module.exports = router;
