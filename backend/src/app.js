const express = require("express");
const eventRoutes = require("./routes/eventRoutes");

const app = express();
const PORT = 3000;

app.use(express.json());

// Rotas
app.use("/events", eventRoutes);

// Rota inicial
app.get("/", (req, res) => {
  res.json({ message: "API de Eventos do IFRS rodando 🚀" });
});

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
