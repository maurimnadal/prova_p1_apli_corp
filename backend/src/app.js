require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const pool = require("./config/db");

const authRoutes = require("./routes/auth.routes");
const eventRoutes = require("./routes/event.routes");

const app = express();

// Middleware para parsing de JSON
app.use(bodyParser.json());

// Rotas
app.use("/auth", authRoutes);
app.use("/events", eventRoutes);

// Rota de teste
app.get("/", (req, res) => {
  res.send("API funcionando 🚀");
});

// Testa conexão com o banco ao iniciar
(async () => {
  try {
    const connection = await pool.getConnection();
    console.log("Conectado ao MySQL");
    connection.release();
  } catch (err) {
    console.error("Erro ao conectar no MySQL", err.message);
  }
})();

module.exports = app;
