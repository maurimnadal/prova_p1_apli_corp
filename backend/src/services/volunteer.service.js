// src/services/volunteer.service.js
const VolunteerModel = require("../models/volunteer.model");

const VolunteerService = {
  listar: async () => {
    return VolunteerModel.listar();
  },

  buscarPorId: async (id) => {
    const volunteer = await VolunteerModel.buscarPorId(id);
    if (!volunteer) throw new Error("Voluntário não encontrado");
    return volunteer;
  },

  criar: async ({ name, email, password, role }) => {
    if (!name || !email || !password) throw new Error("Preencha todos os campos");
    return VolunteerModel.criar({ name, email, password, role });
  },

  atualizar: async (id, data) => {
    return VolunteerModel.atualizar(id, data);
  },

  remover: async (id) => {
    const volunteer = await VolunteerModel.remover(id);
    if (!volunteer) throw new Error("Voluntário não encontrado");
    return volunteer;
  },
};

module.exports = VolunteerService;
