# ⚽ API Times do Campeonato Brasileiro 2025

## 📖 Descrição
API REST desenvolvida em **Node.js, Express e MongoDB Atlas**.  
O sistema permite gerenciar **times, campeonatos, partidas e classificação da Série A do Brasileirão 2025**.  
Inclui também um **front-end em React com Material UI** para exibir a tabela de classificação.

---

## 🚀 Tecnologias Utilizadas

- **Node.js** – Ambiente de execução JavaScript  
- **Express** – Framework para criação de APIs REST  
- **MongoDB Atlas** – Banco de dados NoSQL na nuvem  
- **Mongoose** – ODM para modelagem dos dados  
- **Nodemon** – Hot reload em desenvolvimento  
- **Dotenv** – Variáveis de ambiente  
- **Morgan** – Logger de requisições HTTP  
- **CORS** – Controle de acesso entre origens  
- **React + Material UI** – Front-end para exibição da classificação  

---

## ⚙️ Instalação e Execução

### 🔹 Back-end
```bash
# Clone o repositório
git clone https://github.com/SEU_USUARIO/api-times-brasileirao.git

# Entre na pasta
cd api-times-brasileirao

# Instale as dependências
npm install

# Crie o arquivo .env com as variáveis
echo "MONGODB_URI=<sua-string-de-conexao>" > .env
echo "PORT=4000" >> .env

### 🔹 Front-end
```bash
# Entre na pasta
cd frontend

# Instale as dependências
npm install

# Para produção (servido pelo Express)
npm run build
```

# Execute em modo desenvolvimento
npm run dev
```

Acesse em: [http://localhost:4000](http://localhost:4000)

---

## 📌 Endpoints da API

### Times
- **POST** `/teams` → Criar um time  
- **GET** `/teams` → Listar todos os times  
- **GET** `/teams/:id` → Buscar um time por ID  
- **PUT** `/teams/:id` → Atualizar um time  
- **DELETE** `/teams/:id` → Remover um time  

### Campeonatos
- **POST** `/campeonatos` → Criar um campeonato  
- **GET** `/campeonatos/:id` → Detalhes de um campeonato  
- **GET** `/campeonatos` → Listar todos os campeonatos  

### Partidas
- **POST** `/campeonatos/:id/partidas` → Cadastrar uma partida  
- **GET** `/campeonatos/:id/partidas` → Listar todas as partidas de um campeonato  

### Classificação
- **GET** `/campeonatos/:id/partidas/classificacao` → Retorna a tabela de classificação calculada dinamicamente  

---

## 📊 Banco de Dados

- **Banco:** `Brasileirao2025`  

### Coleções
- `teams` → Times participantes  
- `campeonatos` → Campeonatos cadastrados  
- `partidas` → Jogos realizados  

---

## 🧪 Testando com Insomnia ou Postman

1. Crie um campeonato (**POST** `/campeonatos`)  
2. Cadastre os times (**POST** `/teams`)  
3. Associe os times ao campeonato  
4. Insira partidas (**POST** `/campeonatos/:id/partidas`)  
5. Consulte a classificação (**GET** `/campeonatos/:id/partidas/classificacao`)  

---

## 👨‍💻 Autores

- **Mauricio** – FATEC Registro  
- **Bruno Davies** – FATEC Registro  

---

## 📌 Observações

- IDs são gerados automaticamente pelo MongoDB  
- O campo `temporada` é definido como **2025** por padrão  
- Se enviar um ID inválido, a API retorna **400 Bad Request**  
- Se o recurso não existir, retorna **404 Not Found**  
