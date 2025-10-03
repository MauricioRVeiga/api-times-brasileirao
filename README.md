# API Times Brasileirão

API RESTful desenvolvida em Node.js + Express + MongoDB para gerenciar times do Campeonato Brasileiro. Inclui autenticação com JWT para proteger as rotas.

## 🚀 Tecnologias

- Node.js
- Express
- MongoDB + Mongoose
- JWT (Json Web Token)
- Bcrypt.js

## 📂 Estrutura do Projeto

```
api-times-brasileirao/
 ├── models/          # Schemas do Mongoose (User, Team)
 ├── routes/          # Rotas (authRoutes, teamRoutes)
 ├── controllers/     # Lógica das rotas
 ├── services/        # Regras de negócio
 ├── middleware/      # authMiddleware.js
 ├── config/          # Conexão com banco
 ├── seed.js          # Popula times no banco
 ├── index.js         # Ponto de entrada
 └── .env             # Variáveis de ambiente
```

## ⚙️ Configuração

1. Clonar repositório
   ```bash
   git clone https://github.com/seu-usuario/api-times-brasileirao.git
   cd api-times-brasileirao
   ```
2. Instalar dependências
   ```bash
   npm install
   ```
3. Configurar variáveis de ambiente  
   Crie um arquivo `.env` na raiz com:
   ```
   PORT=4000
   MONGO_URI=sua_string_de_conexao_mongodb
   JWT_SECRET=sua_chave_secreta_segura
   ```
4. Popular o banco com times
   ```bash
   node seed.js
   ```
5. Rodar servidor
   ```bash
   npm run dev
   ```
   ou
   ```bash
   node index.js
   ```

## 🔑 Autenticação

### Registrar usuário

`POST /api/register`

```json
{
  "username": "mauricio",
  "password": "123456"
}
```

### Login

`POST /api/login`

```json
{
  "username": "mauricio",
  "password": "123456"
}
```

Resposta:
```json
{ "token": "eyJhbGciOiJIUzI1NiIsInR..." }
```
Use esse token no header:

```
Authorization: Bearer <token>
```

## ⚽ Rotas Times (CRUD)

- Listar todos os times  
  `GET /api/teams`

- Buscar time por ID  
  `GET /api/teams/:id`

- Criar novo time  
  `POST /api/teams`
  ```json
  {
    "nome": "São Paulo",
    "estado": "SP",
    "titulos": 6
  }
  ```

- Atualizar time  
  `PUT /api/teams/:id`
  ```json
  {
    "nome": "São Paulo FC",
    "estado": "SP",
    "titulos": 7
  }
  ```

- Deletar time  
  `DELETE /api/teams/:id`

## 🧪 Testes

As rotas podem ser testadas no Insomnia ou Postman. Lembre-se de incluir o Bearer Token no header para acessar as rotas protegidas.

## 📜 Licença

Este projeto é open-source e pode ser usado para fins de estudo.

## 👨‍💻 Autores

- **Mauricio** – FATEC Registro  
- **Bruno Davies** – FATEC Registro
