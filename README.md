# Testes de API com Cypress

Projeto de exemplo (completo) para praticar testes de API REST usando Cypress + JSONPlaceholder.

## 📋 Visão geral

A ideia aqui é mostrar, na prática, como validar endpoints REST com `cy.request()` e asserções simples. Todos os testes apontam para a API pública do JSONPlaceholder (sem login e sem token).

O que esse repositório cobre:

- ✅ Exemplos com GET, POST, PUT, PATCH e DELETE
- ✅ Checagens de status code, estrutura e campos do payload
- ✅ Organização por recurso (`/posts`, `/comments`, `/users`)
- ✅ Padrão de escrita consistente nos specs

> Dica: o Cypress já traz o `expect` (Chai) disponível globalmente. Então não precisa instalar/importar `chai`.

## 🚀 Como executar

### Requisitos

- Node.js 14+
- npm (ou yarn)

### Rodando localmente

```bash
# 1) Acessar a pasta do projeto
cd api-cypress

# 2) Instalar as dependências
npm install

# 3) Rodar os testes
npm run test:open  # abre a interface interativa
npm test           # executa headless
```

## 📁 Organização do projeto

```text
cypress/
├── e2e/
│   ├── posts/                     # Specs relacionados ao recurso /posts
│   │   ├── get-posts.cy.js         # GET: lista, detalhe, filtro e 404
│   │   ├── post-posts.cy.js        # POST: criação
│   │   ├── put-posts.cy.js         # PUT/PATCH: atualização total e parcial
│   │   └── delete-posts.cy.js      # DELETE: remoção
│   │
│   ├── comments/                  # Specs relacionados ao recurso /comments
│   │   ├── get-comments.cy.js      # GET: lista, detalhe, filtros, nested e 404
│   │   ├── post-comments.cy.js     # POST: criação
│   │   ├── put-comments.cy.js      # PUT: atualização
│   │   └── delete-comments.cy.js   # DELETE: remoção
│   │
│   └── users/                     # Specs relacionados ao recurso /users
│       └── get-users.cy.js         # GET: lista, detalhe e nested /posts
│
├── fixtures/
│   └── example.json
│
└── support/
    ├── commands.js                # Template para comandos customizados
    └── e2e.js                     # Configuração global carregada antes dos specs
```

## 🧪 Exemplos de chamadas (por método HTTP)

### GET — leitura de dados

```js
// Lista
cy.request('GET', '/posts').then(({ status, body }) => {
  expect(status).to.eq(200)
  expect(body).to.be.an('array')
})

// Detalhe
cy.request('GET', '/posts/1').then(({ status, body }) => {
  expect(status).to.eq(200)
  expect(body).to.have.property('id', 1)
})

// Filtro via querystring
cy.request('GET', '/posts?userId=1').then(({ status, body }) => {
  expect(status).to.eq(200)
  body.forEach((post) => {
    expect(post.userId).to.eq(1)
  })
})
```

### POST — criação

```js
cy.request({
  method: 'POST',
  url: '/posts',
  body: {
    title: 'Novo post',
    body: 'Conteúdo',
    userId: 1,
  },
}).then(({ status, body }) => {
  expect(status).to.eq(201)
  expect(body).to.have.property('id')
})
```

### PUT — atualização completa

```js
cy.request({
  method: 'PUT',
  url: '/posts/1',
  body: {
    id: 1,
    title: 'Título atualizado',
    body: 'Conteúdo atualizado',
    userId: 1,
  },
}).then(({ status, body }) => {
  expect(status).to.eq(200)
  expect(body.title).to.eq('Título atualizado')
})
```

### PATCH — atualização parcial

```js
cy.request({
  method: 'PATCH',
  url: '/posts/1',
  body: {
    title: 'Apenas título mudou',
  },
}).then(({ status, body }) => {
  expect(status).to.eq(200)
  expect(body.title).to.eq('Apenas título mudou')
})
```

### DELETE — remoção

```js
cy.request('DELETE', '/posts/1').then(({ status }) => {
  expect(status).to.be.oneOf([200, 204])
})
```

## 📊 Pontos importantes

### Status codes mais comuns

| Status | Significado | Exemplo |
|---:|---|---|
| 200 | OK | GET/PUT/PATCH/DELETE com sucesso |
| 201 | Created | POST que “criou” um recurso |
| 204 | No Content | DELETE com sucesso sem body |
| 404 | Not Found | ID inexistente |

### PUT x PATCH (bem resumido)

- **PUT**: envia o recurso “inteiro” (substituição completa)
- **PATCH**: manda só o que mudou (atualização parcial)

```js
// PUT - manda tudo
body: { id: 1, title: 'X', body: 'Y', userId: 1 }

// PATCH - manda apenas o necessário
body: { title: 'X' }
```

## ✅ Checagens que você vai usar sempre

```js
expect(status).to.eq(200)

expect(body).to.be.an('array')
expect(body).to.be.an('object')

expect(body).to.have.property('id')
expect(body).to.have.property('title', 'Esperado')

expect(status).to.be.oneOf([200, 204])

body.forEach((item) => {
  expect(item.userId).to.eq(1)
})
```

## ⚙️ Scripts úteis

```bash
npm run test:open
npm test

npm run test:posts
npm run test:comments
npm run test:users
```

## 🌐 API usada (JSONPlaceholder)

- Base URL: https://jsonplaceholder.typicode.com

Alguns recursos disponíveis:

- `/posts` (100)
- `/comments` (500)
- `/users` (10)
- `/albums` (100)
- `/photos` (5000)
- `/todos` (200)

Importante: o JSONPlaceholder é uma API “fake” para aprendizado. As respostas de escrita (POST/PUT/PATCH/DELETE) não representam persistência real de banco de dados.

## 📖 Boas práticas (para este tipo de projeto)

- ✅ Separar specs por endpoint/recurso
- ✅ Testar cenário de sucesso e pelo menos um cenário de erro (ex.: 404)
- ✅ Validar status code + campos essenciais do payload
- ✅ Evitar duplicação e manter um padrão de escrita nos testes
