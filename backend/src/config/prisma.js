/**
 * Cliente Prisma para acesso ao banco de dados
 * @module config/prisma
 */
const { PrismaClient } = require('@prisma/client');

/**
 * Instância do Prisma Client
 * @type {PrismaClient}
 */
const prisma = new PrismaClient();

module.exports = prisma;
