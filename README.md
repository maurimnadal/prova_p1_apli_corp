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
- MySQL2 (conexão com banco)
- bcryptjs (hash de senhas)
- jsonwebtoken (autenticação JWT)
- swagger-jsdoc + swagger-ui-express (documentação)
- cors, helmet (segurança)
- dotenv (variáveis de ambiente)

### Frontend
- React 18
- Vite (build tool)
- React Router DOM (roteamento)
- Axios (requisições HTTP)

### Desenvolvimento
- ESLint + Prettier (padronização de código)
- Nodemon (desenvolvimento)

---

## 📁 Estrutura do Projeto

```
prova_p1_apli_corp/
├── backend/
│   ├── src/
│   │   ├── config/db.js
│   │   ├── controllers/
│   │   ├── services/
│   │   ├── models/
│   │   ├── routes/
│   │   ├── middlewares/
│   │   ├── db/script.sql
│   │   ├── app.js
│   │   └── swagger.js
│   ├── tests/tests.rest
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

Execute o script SQL localizado em `backend/src/db/script.sql`:

```sql
CREATE DATABASE IF NOT EXISTS ifrs_voluntariado;
USE ifrs_voluntariado;

-- Tabelas users e events serão criadas automaticamente
-- Dados fictícios incluídos para testes
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
```

---

## 🚀 Como Executar

### Backend
```bash
cd backend
npm install
npm run dev
```

- Servidor: `http://localhost:3000`
- Swagger UI: `http://localhost:3000/api-docs`

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
- **Código**: Comentários JSDoc nos controllers e services
- **Testes**: Exemplos completos em `tests.rest`

---

## 🔧 Scripts Disponíveis

### Backend
- `npm start` - Produção
- `npm run dev` - Desenvolvimento (nodemon)
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