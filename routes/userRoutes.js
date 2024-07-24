const express = require('express');
const { getAllUsers, registerController, loginController } = require('../controllers/userController');

// router object 
const router = express.Router();

// get all users || GET
router.get('/all-users', getAllUsers)

// CREATE User || POST
router.post('/register', registerController);

// Login user || POST
router.post('/login', loginController); 

module.exports = router;