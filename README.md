# 📊 Gerenciamento de Ordens - BASE Exchange

Aplicação para gerenciamento de ordens de compra e venda de ativos financeiros.

O sistema permite criar, visualizar, filtrar, cancelar e executar ordens, simulando um fluxo básico de negociação.

---

## 🚀 Tecnologias utilizadas

- React
- TypeScript
- Vite
- JSON Server
- Vitest

---

## 📦 Como rodar o projeto

### 1. Instalar dependências

npm install

---

### 2. Criar arquivo .env

VITE_API_URL=http://localhost:3001

---

### 3. Rodar o JSON Server

npx json-server --watch db.json --port 3001

---

### 4. Rodar a aplicação

npm run dev

---

### 🧪 Rodar testes

npm run test

---

## 📋 Funcionalidades

- Listagem de ordens em tabela
- Filtros por status, lado, data e busca por ID/instrumento
- Paginação
- Modal de detalhes com histórico
- Criação de novas ordens
- Cancelamento de ordens com validação
- Feedback visual com toast

---

## 🧠 Lógica de execução

Ao criar uma nova ordem, o sistema tenta encontrar uma contraparte compatível.

Para isso, considera:
- mesmo instrumento
- lados opostos (compra/venda)
- preço compatível

### Exemplos

- Quantidades iguais → ambas executadas  
- Nova ordem maior → executa parcialmente  
- Nova ordem menor → contraparte fica parcial  
- Sem contraparte → ordem permanece aberta  

---

## 🧪 Testes

Foram criados testes para:

- Regras de cancelamento (`canCancelOrder`)
- Ordenação (`sortBy`)
- Execução de ordens (`executeOrderMatch`)

---

## 📁 Estrutura

src/
  components/
  utils/
  services/
  tests/

---

## 💬 Observações

Procurei manter o código simples e organizado, separando bem a lógica de negócio da interface.

---

## 🏁 Challenge

This is a challenge by https://coodesh.com/
