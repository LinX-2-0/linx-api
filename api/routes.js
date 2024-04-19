const express = require('express');
const userController = require('./userController');

const router = express.Router();


router.get('/api/users', userController.getAllUsers);
router.post('/api/login', userController.getUserLoginDetails);
router.post('/api/userExists', userController.checkUserExistence);



module.exports = router;
