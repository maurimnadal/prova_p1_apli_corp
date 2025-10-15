const express = require("express");
const router = express.Router();
const DashboardController = require("../controllers/dashboard.controller");
const { authMiddleware } = require("../middlewares/auth.middleware");


// Rota protegida
router.get("/", authMiddleware, DashboardController.acessar);

module.exports = router;
