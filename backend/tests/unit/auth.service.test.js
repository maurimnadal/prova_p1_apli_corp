const AuthService = require('../../src/services/auth.service');
const UserModel = require('../../src/models/user.model');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

jest.mock('../../src/models/user.model');
jest.mock('../../src/config/logger');

describe('AuthService', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('register', () => {
    it('deve registrar um novo usuário com sucesso', async () => {
      const userData = { name: 'Test', email: 'test@test.com', password: '123456' };
      UserModel.buscarPorEmail.mockResolvedValue(null);
      UserModel.criar.mockResolvedValue({ id: 1, ...userData, role: 'volunteer' });

      const result = await AuthService.register(userData);

      expect(result).toHaveProperty('id');
      expect(result.email).toBe(userData.email);
      expect(UserModel.criar).toHaveBeenCalledWith({ ...userData, role: 'volunteer' });
    });

    it('deve lançar erro se usuário já existe', async () => {
      UserModel.buscarPorEmail.mockResolvedValue({ id: 1, email: 'test@test.com' });

      await expect(
        AuthService.register({ name: 'Test', email: 'test@test.com', password: '123456' })
      ).rejects.toThrow('Usuário já registrado');
    });

    it('deve lançar erro se campos obrigatórios estão faltando', async () => {
      await expect(
        AuthService.register({ name: '', email: 'test@test.com', password: '123456' })
      ).rejects.toThrow('Preencha todos os campos');
    });
  });

  describe('login', () => {
    it('deve fazer login com sucesso', async () => {
      const hashedPassword = await bcrypt.hash('123456', 10);
      const user = { id: 1, name: 'Test', email: 'test@test.com', password: hashedPassword, role: 'volunteer' };
      
      UserModel.buscarPorEmail.mockResolvedValue(user);

      const result = await AuthService.login('test@test.com', '123456');

      expect(result).toHaveProperty('token');
      expect(typeof result.token).toBe('string');
    });

    it('deve lançar erro se usuário não existe', async () => {
      UserModel.buscarPorEmail.mockResolvedValue(null);

      await expect(
        AuthService.login('invalid@test.com', '123456')
      ).rejects.toThrow('Usuário não encontrado');
    });

    it('deve lançar erro se senha está incorreta', async () => {
      const hashedPassword = await bcrypt.hash('123456', 10);
      UserModel.buscarPorEmail.mockResolvedValue({ 
        id: 1, 
        email: 'test@test.com', 
        password: hashedPassword 
      });

      await expect(
        AuthService.login('test@test.com', 'wrongpassword')
      ).rejects.toThrow('Senha incorreta');
    });
  });
});
