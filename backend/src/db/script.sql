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

-- Dados fictícios
INSERT INTO users (name, email, password, role) VALUES
('Admin IFRS', 'admin@ifrs.edu.br', '123456', 'admin'),
('João Voluntário', 'joao@ifrs.edu.br', '123456', 'volunteer');

INSERT INTO events (title, description, date, location, max_volunteers, created_by) VALUES
('Campanha de Doação de Sangue', 'Doação de sangue no campus central', '2025-10-25', 'Campus Central', 100, 1),
('Mutirão Ambiental', 'Limpeza de área verde', '2025-11-10', 'Praça X', 30, 1);
