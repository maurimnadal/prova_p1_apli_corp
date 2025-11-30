const EventService = require('../../src/services/event.service');
const EventModel = require('../../src/models/event.model');

jest.mock('../../src/models/event.model');
jest.mock('../../src/config/logger');

describe('EventService', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('listar', () => {
    it('deve listar todos os eventos', async () => {
      const mockEvents = [
        { id: 1, title: 'Evento 1', date: new Date() },
        { id: 2, title: 'Evento 2', date: new Date() },
      ];
      EventModel.listar.mockResolvedValue(mockEvents);

      const result = await EventService.listar();

      expect(result).toEqual(mockEvents);
      expect(EventModel.listar).toHaveBeenCalled();
    });
  });

  describe('criar', () => {
    it('deve criar um evento com sucesso', async () => {
      const eventData = {
        title: 'Novo Evento',
        description: 'Descrição',
        date: '2025-12-31',
        location: 'Local',
        max_volunteers: 50,
        created_by: 1,
      };
      EventModel.criar.mockResolvedValue({ id: 1, ...eventData });

      const result = await EventService.criar(eventData);

      expect(result).toHaveProperty('id');
      expect(result.title).toBe(eventData.title);
      expect(EventModel.criar).toHaveBeenCalledWith(eventData);
    });

    it('deve lançar erro se campos obrigatórios estão faltando', async () => {
      await expect(
        EventService.criar({ description: 'Sem título' })
      ).rejects.toThrow('Preencha os campos obrigatórios');
    });
  });

  describe('atualizar', () => {
    it('deve atualizar um evento existente', async () => {
      const eventData = { title: 'Atualizado', date: '2025-12-31' };
      EventModel.buscarPorId.mockResolvedValue({ id: 1, title: 'Original' });
      EventModel.atualizar.mockResolvedValue({ id: 1, ...eventData });

      const result = await EventService.atualizar(1, eventData);

      expect(result.title).toBe(eventData.title);
      expect(EventModel.atualizar).toHaveBeenCalledWith(1, eventData);
    });

    it('deve lançar erro se evento não existe', async () => {
      EventModel.buscarPorId.mockResolvedValue(null);

      await expect(
        EventService.atualizar(999, { title: 'Teste' })
      ).rejects.toThrow('Evento não encontrado');
    });
  });

  describe('remover', () => {
    it('deve remover um evento existente', async () => {
      const mockEvent = { id: 1, title: 'Evento' };
      EventModel.buscarPorId.mockResolvedValue(mockEvent);
      EventModel.remover.mockResolvedValue(mockEvent);

      const result = await EventService.remover(1);

      expect(result).toEqual(mockEvent);
      expect(EventModel.remover).toHaveBeenCalledWith(1);
    });

    it('deve lançar erro se evento não existe', async () => {
      EventModel.buscarPorId.mockResolvedValue(null);

      await expect(EventService.remover(999)).rejects.toThrow('Evento não encontrado');
    });
  });
});
