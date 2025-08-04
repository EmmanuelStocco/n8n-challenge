## 📩 Desafio n8n

Este projeto demonstra uma aplicação simples utilizando o [n8n](https://n8n.io/) como backend para criação de automações e APIs, e um frontend básico construído com React + Vite para consumir essas APIs.

---

### 📦 Estrutura do Projeto

- **Backend**: n8n rodando em container Docker, persistência via MongoDB.
- **Frontend**: React + Vite (projeto base de interface para testar as automações do n8n).

---

## 🚀 Como rodar o projeto localmente

### ⚖️ Pré-requisitos

- [Docker](https://www.docker.com/)
- [Node.js](https://nodejs.org/) e [npm](https://www.npmjs.com/) para o frontend

---

### 🛠️ Backend (n8n + MongoDB)

1. Clone o repositório:

   ```bash
   git clone https://github.com/seu-usuario/desafio-n8n.git
   cd desafio-n8n
   ```

2. Suba os containers:

   ```bash
   docker-compose up -d
   ```

3. Acesse a interface do n8n:

   - URL: [http://localhost:5678](http://localhost:5678)
   - Usuário: `admin`
   - Senha: `admin`

> Obs: as credenciais podem ser modificadas no arquivo `docker-compose.yml`.

---

### 🖥️ Frontend (React + Vite)

1. Va para o diretório do frontend:

   ```bash
   cd frontend
   ```

2. Instale as dependências:

   ```bash
   npm install
   ```

3. Rode a aplicação:

   ```bash
   npm run dev
   ```

4. Acesse no navegador: [http://localhost:5173](http://localhost:5173)

---

## 📌 Exemplos de uso

Você pode criar **workflows** no n8n acessando o painel e usando nós HTTP para criar pequenas APIs que o frontend consome.

Exemplos comuns:

- GET `/api/hello` → retorna uma mensagem simples
- POST `/api/soma` → recebe dois números e retorna a soma
- Qualquer outro teste de fluxo que você configurar no n8n

---

## 📂 Estrutura de Pastas (sugestão)

```bash
desafio-n8n/
├── docker-compose.yml
├── frontend/
│   ├── index.html
│   ├── package.json
│   └── src/
│       ├── App.jsx
│       └── ...
└── README.md
```

---

## 🧠 Observações

- O `N8N_USER_MANAGEMENT_DISABLED=true` desativa o sistema de múltiplos usuários do n8n.
- As credenciais estão expostas apenas para ambiente de desenvolvimento. Em produção, use variáveis seguras.
- Os dados do n8n e MongoDB são persistidos em volumes Docker (`n8n_data`, `mongo_data`).

---

## 📃 Licença

Esse projeto é apenas para fins educacionais e pode ser livremente modificado.
