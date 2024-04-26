const express = require('express');
const userController = require('./userController');
const router = express.Router();
const noAuthMiddleware = require('../noAuthMiddleware')


router.get('/api/users', userController.getAllUsers);
router.post('/api/login', userController.getUserLoginDetails);
router.post('/api/userExists',noAuthMiddleware, userController.checkUserExistence);
router.post('/api/registerUser',noAuthMiddleware, userController.saveUser);




module.exports = router;
