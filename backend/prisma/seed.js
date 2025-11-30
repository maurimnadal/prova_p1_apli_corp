const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Iniciando seed...');

  // Limpar dados existentes
  await prisma.event.deleteMany();
  await prisma.user.deleteMany();

  // Hash de senha padrão
  const hashedPassword = await bcrypt.hash('123456', 10);

  // Criar usuários
  const admin = await prisma.user.create({
    data: {
      name: 'Admin IFRS',
      email: 'admin@ifrs.edu.br',
      password: hashedPassword,
      role: 'admin',
    },
  });

  const volunteer = await prisma.user.create({
    data: {
      name: 'João Voluntário',
      email: 'joao@ifrs.edu.br',
      password: hashedPassword,
      role: 'volunteer',
    },
  });

  // Criar eventos
  await prisma.event.createMany({
    data: [
      {
        title: 'Campanha de Doação de Sangue',
        description: 'Doação de sangue no campus central',
        date: new Date('2025-10-25'),
        location: 'Campus Central',
        maxVolunteers: 100,
        createdBy: admin.id,
      },
      {
        title: 'Mutirão Ambiental',
        description: 'Limpeza de área verde',
        date: new Date('2025-11-10'),
        location: 'Praça X',
        maxVolunteers: 30,
        createdBy: admin.id,
      },
    ],
  });

  console.log('✅ Seed concluído!');
}

main()
  .catch((e) => {
    console.error('❌ Erro no seed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
