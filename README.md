# Prova P1 - Aplicações Corporativas (IFRS) - Sistema de Voluntariado

**Aluno:** (substitua pelo seu nome)  
**Disciplina:** Desenvolvimento de Aplicações Corporativas  
**Professor:** Prof. Dr. Maurício Covolan Rosito

---

## 1. Descrição do projeto

Projeto monolítico para gerenciar ações de voluntariado (eventos e voluntários) composto por **back-end** (Node.js + Express + MySQL) e **front-end** (React + Vite). Permite autenticação via JWT, CRUD de eventos (com controle de acesso por role) e visualização de dashboard para usuários autenticados.

Este pacote foi preparado para a **Prova P1** e inclui código, documentação Swagger, scripts de teste e instruções para execução.

---

## 2. Requisitos do sistema

- Node.js v18+ (ou v22)
- npm 8+
- MySQL 8 (Wamp, XAMPP, ou servidor local)
- Navegador moderno (Chrome/Edge/Firefox)
- VS Code recomendado (com extensão REST Client para `tests.rest`)

---

## 3. Tecnologias

- Backend: Node.js, Express, mysql2/promise, bcryptjs, jsonwebtoken, swagger-jsdoc, swagger-ui-express
- Frontend: React 18, Vite, Axios, React Router
- Lint/Format: ESLint, Prettier (configs incluídos)

---

## 4. Estrutura do projeto

```
prova_p1_apli_corp/
├─ backend/
│  ├─ src/
│  │  ├─ config/db.js
│  │  ├─ controllers/
│  │  ├─ services/
│  │  ├─ models/
│  │  ├─ routes/
│  │  ├─ middlewares/
│  │  ├─ swagger.js
│  │  └─ app.js
│  ├─ package.json
│  └─ .env (exemplo: .env.example)
├─ frontend/
│  ├─ src/
│  └─ package.json
├─ README.md
└─ tests/ (REST Client scripts)
```

---

## 5. Configuração do banco (MySQL)

1. Crie o banco e as tabelas usando o script SQL (ex.: `ifrs_voluntariado.sql`) - caso não esteja aqui, use o script que forneceu no enunciado:
```sql
CREATE DATABASE IF NOT EXISTS ifrs_voluntariado;
USE ifrs_voluntariado;

CREATE TABLE users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  email VARCHAR(150) NOT NULL UNIQUE,
  password VARCHAR(255) NOT NULL,
  role ENUM('admin','volunteer') NOT NULL DEFAULT 'volunteer',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE events (
  id INT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  description TEXT,
  date DATE NOT NULL,
  location VARCHAR(255),
  max_volunteers INT DEFAULT 50,
  created_by INT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (created_by) REFERENCES users(id)
);
```

2. (Opcional) Insira dados fictícios para testes (admin e volunteer). Se usar o endpoint `/auth/register`, não é necessário inserir manualmente.

---

## 6. Variáveis de ambiente (.env)

No diretório `backend/` crie um arquivo `.env` com o conteúdo:

```
PORT=3000
DB_HOST=127.0.0.1
DB_USER=root
DB_PASSWORD=       # deixe vazio se root sem senha
DB_NAME=ifrs_voluntariado
JWT_SECRET=troque_esta_chave_por_uma_segura
```

> Se você criou usuário MySQL com senha, coloque a senha em `DB_PASSWORD`.

---

## 7. Como executar (backend)

```bash
cd backend
npm install
# configurar .env conforme acima
npm run dev
```

- O servidor roda por padrão em: `http://localhost:3000`  
- Swagger UI disponível em: `http://localhost:3000/api-docs` (ou `/docs`)

---

## 8. Como executar (frontend)

```bash
cd frontend
npm install
npm run dev
```

- Frontend roda por padrão em `http://localhost:5173`  
- O frontend consome o backend em `http://localhost:3000` (ajuste `src/api/api.js` se necessário).

---

## 9. Rotas principais (exemplos)

### Autenticação
- `POST /auth/register` - Registrar usuário (name, email, password, role)
- `POST /auth/login` - Login retorna `{ token }` (JWT)

### Dashboard
- `GET /dashboard` - Rota protegida, retorna info do usuário autenticado

### Eventos
- `GET /events` - Lista eventos (autenticado)
- `GET /events/:id` - Buscar evento por id
- `POST /events` - Criar evento (admin apenas)
- `PUT /events/:id` - Atualizar evento (admin apenas)
- `DELETE /events/:id` - Remover evento (admin apenas)

> Use `Authorization: Bearer <token>` no header para rotas protegidas.

---

## 10. Testes (REST Client)

- Abra `backend/tests/tests.rest` no VS Code com a extensão **REST Client**.
- Execute os blocos de login para salvar `ADMIN_TOKEN` e `VOLUNTEER_TOKEN` automaticamente.
- Em seguida execute os testes de eventos e dashboard.

---

## 11. Swagger e documentação

- A documentação OpenAPI está configurada e exposta em `/api-docs` (Swagger UI).
- Documentei os endpoints principais (`GET /events`, `POST /events`, `POST /auth/login`) como mínimo exigido pela prova.

---

## 12. Boas práticas aplicadas

- Arquitetura em camadas (Model → Service → Controller → Routes) com separação de responsabilidades.  
- Autenticação JWT e proteção de rotas via middleware.  
- Uso de `bcryptjs` para hash de senha.  
- Configuração ESLint/Prettier (não foram aplicadas correções automáticas nesta versão).  
- JSDoc básica adicionada a controllers e serviços.  

---

## 13. Observações e próximos passos recomendados

- Adicionar JSDoc completos e exemplos de payload em Swagger se desejar melhorar a documentação.  
- Rodar `npm run lint` e `npm run format` em frontend/backend para ajustar estilo.  
- Garantir que credenciais MySQL no `.env` estejam corretas antes de iniciar o backend.  

---

### Contato
Se precisar, posso ajustar o pacote para requisitos específicos (ex.: remover `sequelize` do package.json, ajustar ports, gerar vídeo de demonstração, etc.).

Gerado em: 2025-10-14T23:07:09.161713Z

