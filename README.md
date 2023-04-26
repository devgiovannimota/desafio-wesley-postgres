# CRUD TodoList com NodeJs

## 🧧 Sobre

API Financeira desenvolvida em **NodeJS** com o framework **Express**.

## 🚀 Tecnologias utilizadas

- [NodeJS](https://nodejs.org/en/)
- [Express](https://expressjs.com/)

## 📦 Como rodar o projeto

<br>

## 1 - Clonar o repo

```bash
# Clonar o repositório
$ git clone https://github.com/devgiovannimota/desafio-wesley-postgres.git

# Entrar no repositório
```

## 2 - Instalar as dependências

```bash
# Instalar as dependências
$ npm install
```

## 3 - Rodando o projeto

```bash
# Rodar o projeto
$ npm run dev
```

## 📦 Criação do banco de dados > Inserir a query abaixo

    CREATE DATABASE IF NOT EXISTS todo-app-teste;

    USE todo-app-teste;

CREATE TABLE users (user_id serial PRIMARY KEY, user_name VARCHAR(255) UNIQUE NOT NULL );

CREATE TABLE todos ( todo_id SERIAL PRIMARY KEY, todo_description TEXT NOT NULL, todo_done BOOLEAN NOT NULL, user_id INT NOT NULL, FOREIGN KEY (user_id) REFERENCES users (user_id) );

);

# Usando a API

Voce pode acessar a API usando os seguintes endpoints:

### `GET`

- `/users` : Ver todos os usuários

- `todo/:todo_id` : Ver o todo de tal usuário

### `POST`

- `/session` : Criação do user

  - Body:
    - `username: string` Nome do user

- `/todo/:user_id` : Criação do todo
  - Body:
    - `description: string` Descrição da todo
    - `done: boolean` Se está feita ou não

### `PATCH`

- `/todo/:user_id/:todo_id` : Update do todo"
  - Body:
    - `description: string` Descrição da todo
    - `done: boolean` Se está feita ou não

### `DELETE`

- `/todo/:user_id/:todo_id` : Delete do todo
