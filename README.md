
# 📦 API de Vendas — NestJS + Prisma

## 📖 Descrição

Este é um projeto de **API RESTful** desenvolvido com **NestJS v11.0.6**, utilizando **TypeScript** e integrado com o **Prisma ORM** para comunicação com um banco de dados **PostgreSQL**.

A API tem como objetivo gerenciar operações de vendas, como cadastro de clientes, controle de produtos, estoque, contas a receber e detalhamento dos itens vendidos. O projeto encontra-se em desenvolvimento ativo.

---

## 🚧 Funcionalidades (Em Desenvolvimento)

- **Clientes**: Cadastro, listagem, atualização e exclusão.
- **Produtos**: Gerenciamento de produtos com controle de preço e estoque mínimo.
- **Estoque**: Controle de quantidade disponível de produtos.
- **Vendas**: Registro de vendas com valor total, descontos e itens vinculados.
- **Contas Pendentes**: Controle de valores a receber e recebidos em vendas a prazo.
- **Itens de Venda**: Detalhamento dos produtos incluídos em cada venda.

> 🔸 Algumas funcionalidades podem estar incompletas ou em fase de testes.

---

## ✅ Pré-requisitos

- **Node.js** v16 ou superior  
- **NPM** 
- **PostgreSQL** (banco de dados configurado)  
- **Prisma CLI** (`npx prisma`)  
- **NestJS** v11.0.6

---

## ⚙️ Configuração do Projeto

### 1. Clone o repositório:

```bash
git clone <git@github.com:guiihcolusso/dux.git>
cd <dux>
```

### 2. Instale as dependências:

```bash
npm install
```

### 3. Configure as variáveis de ambiente:

Crie um arquivo `.env` na raiz do projeto com base no `.env.example`:

```env
DATABASE_URL="postgresql://<USUARIO>:<SENHA>@<HOST>:<PORTA>/<NOME_DO_BANCO>?schema=public"
```

> Certifique-se de que o banco PostgreSQL esteja rodando e a `DATABASE_URL` esteja correta.

### 4. Execute as migrações do Prisma:

```bash
npx prisma migrate dev
```

### 5. Gere o cliente Prisma:

```bash
npx prisma generate
```

---

## 🚀 Executando o Projeto

### Modo de desenvolvimento:

```bash
npm run start
```

### Modo com hot-reload (recomendado):

```bash
npm run start:dev
```

### Modo de produção:

```bash
npm run start:prod
```

> A API estará disponível em: [http://localhost](http://localhost)

---

## 🔗 Endpoints da API (Em Desenvolvimento)

### 🧍 Clientes

- `POST /clientes` — Criar cliente  
- `GET /clientes` — Listar todos  
- `GET /clientes/:id` — Buscar por ID  
- `PUT /clientes/:id` — Atualizar  
- `DELETE /clientes/:id` — Remover

### 📦 Produtos

- `POST /produtos` — Criar produto  
- `GET /produtos` — Listar todos  
- `GET /produtos/:id` — Buscar por ID  
- `PUT /produtos/:id` — Atualizar  
- `DELETE /produtos/:id` — Remover

### 📊 Estoque

- `POST /estoque` — Adicionar entrada de estoque  
- `GET /estoque` — Listar entradas  
- `GET /estoque/:id` — Buscar por ID  
- `PUT /estoque/:id` — Atualizar  
- `DELETE /estoque/:id` — Remover

### 💰 Vendas

- `POST /vendas` — Registrar venda  
- `GET /vendas` — Listar todas  
- `GET /vendas/:id` — Buscar por ID  
- `PUT /vendas/:id` — Atualizar  
- `DELETE /vendas/:id` — Remover

### 🧾 Contas Pendentes

- `POST /contas-pendentes` — Criar conta  
- `GET /contas-pendentes` — Listar todas  
- `GET /contas-pendentes/:id` — Buscar por ID  
- `PUT /contas-pendentes/:id` — Atualizar  
- `DELETE /contas-pendentes/:id` — Remover

### 🧺 Itens de Venda

- `POST /itens` — Criar item  
- `GET /itens` — Listar todos  
- `GET /itens/:id` — Buscar por ID  
- `PUT /itens/:id` — Atualizar  
- `DELETE /itens/:id` — Remover

> 📘 A documentação completa será gerada com `@nestjs/swagger` em versões futuras.

---

## 🧪 Executar Testes

### Testes unitários:

```bash
npm run test
```

### Testes end-to-end:

```bash
npm run test:e2e
```

### Cobertura de testes:

```bash
npm run test:cov
```

---

## ☁️ Implantação

> ⚠️ Projeto em desenvolvimento. Ainda **não recomendado** para produção.

### Etapas para produção:

```bash
npm run build
npm run start:prod
```

### Deploy com NestJS Mau (exemplo para AWS):

```bash
npm install -g @nestjs/mau
mau deploy
```

> Para otimizar consultas, considere usar **Prisma Accelerate**.

---

## 🗂 Estrutura do Projeto

```bash
src/
├── prisma/
│   ├── schema.prisma
│   ├── prisma.module.ts
│   └── prisma.service.ts
├── cliente/
│   ├── cliente.module.ts
│   ├── cliente.controller.ts
│   ├── cliente.service.ts
│   └── dto/cliente.dto.ts
├── produto/
│   ├── produto.module.ts
│   ├── produto.controller.ts
│   ├── produto.service.ts
│   └── dto/produto.dto.ts
├── estoque/
│   ├── estoque.module.ts
│   ├── estoque.controller.ts
│   ├── estoque.service.ts
│   └── dto/estoque.dto.ts
├── venda/
│   ├── venda.module.ts
│   ├── venda.controller.ts
│   ├── venda.service.ts
│   └── dto/venda.dto.ts
├── contas-pendentes/
│   ├── contas-pendentes.module.ts
│   ├── contas-pendentes.controller.ts
│   ├── contas-pendentes.service.ts
│   └── dto/contas-pendentes.dto.ts
├── item/
│   ├── item.module.ts
│   ├── item.controller.ts
│   ├── item.service.ts
│   └── dto/item.dto.ts
├── app.module.ts
└── main.ts
```

---

> Desenvolvido com ❤️ usando NestJS + Prisma + PostgreSQL.
