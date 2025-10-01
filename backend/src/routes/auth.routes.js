const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth.controller');


/**
* @route POST /auth/login
* @desc autentica e retorna token
*/
router.post('/auth/login', authController.login);


module.exports = router;