# Sistema de Voluntariado IFRS

**Disciplina:** Desenvolvimento de Aplicações Corporativas  
**Instituição:** Instituto Federal do Rio Grande do Sul (IFRS)

---

## 📋 Descrição do Projeto

Sistema web completo para gerenciamento de ações de voluntariado, permitindo o cadastro e controle de eventos e voluntários. O projeto é composto por:

- **Backend**: API REST em Node.js + Express + MySQL
- **Frontend**: Interface React + Vite
- **Autenticação**: JWT com controle de acesso por roles (admin/volunteer)
- **Documentação**: Swagger UI integrado

---

## 🛠️ Tecnologias Utilizadas

### Backend
- Node.js + Express
- Prisma ORM (banco de dados)
- MySQL 8.0+
- bcryptjs (hash de senhas)
- jsonwebtoken (autenticação JWT)
- Winston (logs estruturados)
- swagger-jsdoc + swagger-ui-express (documentação)
- cors, helmet (segurança)
- dotenv (variáveis de ambiente)

### Frontend
- React 18
- Vite (build tool)
- React Router DOM (roteamento)
- Axios (requisições HTTP)

### Testes
- Jest (testes unitários)
- Supertest (testes de integração)
- Selenium WebDriver (testes E2E)

### Desenvolvimento
- ESLint + Prettier (padronização de código)
- Nodemon (desenvolvimento)

---

## 📁 Estrutura do Projeto

```
prova_p1_apli_corp/
├── backend/
│   ├── prisma/
│   │   ├── schema.prisma
│   │   └── seed.js
│   ├── src/
│   │   ├── config/
│   │   │   ├── prisma.js
│   │   │   └── logger.js
│   │   ├── controllers/
│   │   ├── services/
│   │   ├── models/
│   │   ├── routes/
│   │   ├── middlewares/
│   │   ├── db/script.sql
│   │   ├── app.js
│   │   └── swagger.js
│   ├── tests/
│   │   ├── unit/
│   │   ├── integration/
│   │   ├── e2e/
│   │   └── tests.rest
│   ├── logs/
│   ├── jest.config.js
│   ├── .env
│   └── package.json
├── frontend/
│   ├── src/
│   │   ├── api/
│   │   ├── components/
│   │   ├── pages/
│   │   └── App.jsx
│   └── package.json
└── README.md
```

---

## ⚙️ Configuração do Ambiente

### Pré-requisitos
- Node.js 18+
- npm 8+
- MySQL 8.0+
- VS Code (recomendado com extensão REST Client)

### 1. Configuração do Banco de Dados

Crie o banco de dados MySQL:

```sql
CREATE DATABASE IF NOT EXISTS ifrs_voluntariado;
```

### 2. Variáveis de Ambiente

O arquivo `.env` já está configurado em `backend/.env`:

```env
PORT=3000
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=
DB_NAME=ifrs_voluntariado
JWT_SECRET=troque_esta_chave_por_uma_segura
DATABASE_URL="mysql://root:@localhost:3306/ifrs_voluntariado"
```

### 3. Configurar Prisma

```bash
cd backend
npm install
npx prisma generate
npx prisma migrate dev --name init
npm run prisma:seed
```

---

## 🚀 Como Executar

### Backend
```bash
cd backend
npm install
npx prisma generate
npx prisma migrate dev --name init
npm run prisma:seed
npm run dev
```

- Servidor: `http://localhost:3000`
- Swagger UI: `http://localhost:3000/api-docs`
- Logs: `backend/logs/`

### Frontend
```bash
cd frontend
npm install
npm run dev
```

- Interface: `http://localhost:5173`

---

## 🔗 Endpoints da API

### Autenticação
- `POST /auth/register` - Cadastrar usuário
- `POST /auth/login` - Login (retorna JWT)

### Eventos
- `GET /events` - Listar eventos (autenticado)
- `POST /events` - Criar evento (admin)
- `PUT /events/:id` - Atualizar evento (admin)
- `DELETE /events/:id` - Deletar evento (admin)

### Voluntários
- `GET /volunteers` - Listar voluntários (admin)
- `POST /volunteers` - Criar voluntário (admin)
- `PUT /volunteers/:id` - Atualizar voluntário
- `DELETE /volunteers/:id` - Deletar voluntário (admin)

### Dashboard
- `GET /dashboard` - Informações do usuário autenticado

> **Autenticação**: Use `Authorization: Bearer <token>` no header

---

## 🧪 Testes

### Testes Automatizados

```bash
cd backend

# Todos os testes com cobertura
npm test

# Apenas testes unitários
npm run test:unit

# Apenas testes de integração
npm run test:integration

# Teste E2E (requer frontend rodando)
npm run test:e2e
```

### Testes Manuais (REST Client)

Utilize o arquivo `backend/tests/tests.rest` com a extensão REST Client do VS Code:

1. Execute os requests de registro/login
2. Teste os endpoints de eventos e voluntários
3. Verifique o acesso ao dashboard

---

## 👥 Roles e Permissões

### Admin
- CRUD completo de eventos
- CRUD completo de voluntários
- Acesso ao dashboard

### Volunteer
- Visualizar eventos
- Atualizar próprio perfil
- Acesso ao dashboard

---

## 📚 Documentação

- **Swagger UI**: Disponível em `/api-docs` quando o servidor estiver rodando
- **JSDoc**: Documentação completa em Models, Services e Controllers
- **Testes**: Exemplos completos em `tests.rest`
- **Guias**: 
  - `PRISMA_SETUP.md` - Setup do Prisma
  - `WINSTON_SETUP.md` - Setup do Winston
  - `TESTS_SETUP.md` - Setup dos testes
  - `CHECKLIST_REQUISITOS.md` - Checklist completo

---

## 🔧 Scripts Disponíveis

### Backend
- `npm start` - Produção
- `npm run dev` - Desenvolvimento (nodemon)
- `npm test` - Executar todos os testes
- `npm run test:unit` - Testes unitários
- `npm run test:integration` - Testes de integração
- `npm run test:e2e` - Teste E2E
- `npm run prisma:migrate` - Criar migration
- `npm run prisma:seed` - Popular banco com dados
- `npm run prisma:studio` - Interface visual do banco
- `npm run lint` - Verificar código

### Frontend
- `npm run dev` - Desenvolvimento
- `npm run build` - Build para produção
- `npm run lint` - Verificar código
- `npm run format` - Formatar código

---

## 🛡️ Segurança

- Senhas hasheadas com bcryptjs
- Autenticação JWT
- Middleware de autenticação
- CORS configurado
- Helmet para headers de segurança
- Validação de roles por endpoint

---

## 📊 Logs

- Logs estruturados com Winston
- Logs em arquivo: `logs/error.log` e `logs/combined.log`
- Logs no console (desenvolvimento)
- Log de todas as requisições HTTP
- Níveis: error, warn, info

---

## 🗄️ Banco de Dados

- ORM: Prisma
- Banco: MySQL 8.0+
- Migrations: Versionamento do schema
- Seeds: Dados fictícios para testes
- Models: User, Event

---

## 📖 Arquitetura

### Camadas
1. **Model** - Acesso ao banco (Prisma)
2. **Service** - Lógica de negócio
3. **Controller** - Requisições HTTP
4. **Routes** - Definição de rotas
5. **Middleware** - Autenticação, logs

### Princípios
- Clean Code
- SOLID
- RESTful APIs
- Separation of Concerns