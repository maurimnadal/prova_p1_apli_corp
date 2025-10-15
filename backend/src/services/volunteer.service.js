// src/services/volunteer.service.js
const VolunteerModel = require('../models/volunteer.model');

const VolunteerService = {
  listar: async () => VolunteerModel.listar(),

  buscarPorId: async (id) => {
    const volunteer = await VolunteerModel.buscarPorId(id);
    if (!volunteer) throw new Error('Voluntário não encontrado');
    return volunteer;
  },

  criar: async ({ name, email, password, role }) => {
    if (!name || !email || !password)
      throw new Error('Preencha todos os campos');
    return VolunteerModel.criar({ name, email, password, role });
  },

  atualizar: async (id, data, usuario) => {
    // 🔒 Apenas admin ou o próprio voluntário
    if (usuario.role !== 'admin' && usuario.id !== parseInt(id)) {
      throw new Error('Acesso negado: você só pode editar o próprio perfil');
    }

    // Se não for admin, não pode mudar o papel
    const dadosAtualizados = {
      name: data.name,
      email: data.email,
    };

    if (data.password) {
      dadosAtualizados.password = data.password; // deixa o model hashear
    }

    return VolunteerModel.atualizar(id, dadosAtualizados);
  },

  remover: async (id) => {
    const volunteer = await VolunteerModel.remover(id);
    if (!volunteer) throw new Error('Voluntário não encontrado');
    return volunteer;
  },
};

module.exports = VolunteerService;
