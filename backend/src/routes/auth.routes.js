const express = require("express");
const AuthController = require("../controllers/auth.controller");

const router = express.Router();

// Registro de usuários
router.post("/register", AuthController.register);

// Login
router.post("/login", AuthController.login);

module.exports = router;
