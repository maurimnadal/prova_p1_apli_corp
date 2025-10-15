// src/swagger.js
const swaggerJsDoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");
const path = require("path");

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "IFRS Voluntariado API",
      version: "1.0.0",
      description: `
      API monolítica desenvolvida para o IFRS - Prova P1  
      Permite gerenciar **eventos sociais** e **voluntários**, com autenticação JWT e rotas protegidas.

      **Rotas principais:**
      - Autenticação: \`/auth/login\`, \`/auth/register\`
      - Dashboard protegido: \`/dashboard\`
      - Eventos: \`/events\` (CRUD)
      - Voluntários: \`/volunteers\` (CRUD)
      `,
    },
    servers: [
      {
        url: "http://localhost:3000",
        description: "Servidor local de desenvolvimento",
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
      schemas: {
        AuthLogin: {
          type: "object",
          properties: {
            email: { type: "string", example: "admin@ifrs.edu.br" },
            password: { type: "string", example: "123456" },
          },
        },
        AuthRegister: {
          type: "object",
          properties: {
            name: { type: "string", example: "João da Silva" },
            email: { type: "string", example: "joao@ifrs.edu.br" },
            password: { type: "string", example: "123456" },
            role: { type: "string", example: "admin" },
          },
        },
        Event: {
          type: "object",
          properties: {
            id: { type: "integer", example: 1 },
            title: { type: "string", example: "Campanha de Doação de Sangue" },
            description: { type: "string", example: "Evento de doação de sangue no IFRS" },
            date: { type: "string", example: "2025-10-20" },
            location: { type: "string", example: "Campus IFRS" },
            max_volunteers: { type: "integer", example: 20 },
          },
        },
        Volunteer: {
          type: "object",
          properties: {
            id: { type: "integer", example: 1 },
            name: { type: "string", example: "Maria Oliveira" },
            email: { type: "string", example: "maria@email.com" },
            phone: { type: "string", example: "(11) 99999-9999" },
          },
        },
      },
    },
    security: [
      {
        bearerAuth: [],
      },
    ],
  },
  apis: [
    path.join(__dirname, "routes", "*.js"),
    path.join(__dirname, "controllers", "*.js"),
  ],
};

const swaggerSpec = swaggerJsDoc(options);

/**
 * Configura e disponibiliza o Swagger UI na aplicação.
 * 
 * - `/api-docs`: caminho principal da documentação
 * - `/docs`: rota alternativa
 */
function setupSwagger(app) {
  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
  app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

  console.log("📘 Swagger UI disponível em:");
  console.log("👉 http://localhost:3000/api-docs");
  console.log("👉 http://localhost:3000/docs");
}

module.exports = setupSwagger;
