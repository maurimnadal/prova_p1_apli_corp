// Ponto de entrada do backend

require("dotenv").config(); // Carrega variáveis do .env
const app = require("./src/app");

// Porta
const PORT = process.env.PORT || 3000;

// Inicializa o servidor
app.listen(PORT, () => {
  console.log(`🚀 Servidor rodando em http://localhost:${PORT}`);
});
