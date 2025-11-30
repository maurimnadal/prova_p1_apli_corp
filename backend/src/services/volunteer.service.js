/**
 * Volunteer Service - Lógica de negócio para voluntários
 * @module services/VolunteerService
 */
const VolunteerModel = require('../models/volunteer.model');
const logger = require('../config/logger');

const VolunteerService = {
  listar: async () => {
    logger.info('Listando todos os voluntários');
    return await VolunteerModel.listar();
  },

  buscarPorId: async (id) => {
    logger.info('Buscando voluntário por ID', { volunteerId: id });
    const volunteer = await VolunteerModel.buscarPorId(id);
    if (!volunteer) {
      logger.warn('Voluntário não encontrado', { volunteerId: id });
      throw new Error('Voluntário não encontrado');
    }
    return volunteer;
  },

  criar: async ({ name, email, password, role }) => {
    if (!name || !email || !password) {
      logger.warn('Tentativa de criar voluntário sem campos obrigatórios');
      throw new Error('Preencha todos os campos');
    }
    const volunteer = await VolunteerModel.criar({ name, email, password, role });
    logger.info('Voluntário criado com sucesso', { volunteerId: volunteer.id, email });
    return volunteer;
  },

  atualizar: async (id, data, usuario) => {
    if (usuario.role !== 'admin' && usuario.id !== parseInt(id)) {
      logger.warn('Tentativa de atualizar voluntário sem permissão', { userId: usuario.id, targetId: id });
      throw new Error('Acesso negado: você só pode editar o próprio perfil');
    }

    const dadosAtualizados = {
      name: data.name,
      email: data.email,
    };

    if (data.password) {
      dadosAtualizados.password = data.password;
    }

    const updated = await VolunteerModel.atualizar(id, dadosAtualizados);
    logger.info('Voluntário atualizado com sucesso', { volunteerId: id });
    return updated;
  },

  remover: async (id) => {
    const volunteer = await VolunteerModel.remover(id);
    if (!volunteer) {
      logger.warn('Tentativa de remover voluntário inexistente', { volunteerId: id });
      throw new Error('Voluntário não encontrado');
    }
    logger.info('Voluntário removido com sucesso', { volunteerId: id });
    return volunteer;
  },
};

module.exports = VolunteerService;
