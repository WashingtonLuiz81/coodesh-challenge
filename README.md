# 📊 Gerenciamento de Ordens - BASE Exchange

Aplicação front-end para gerenciamento de ordens de compra e venda de ativos financeiros.

O sistema permite criar, visualizar, filtrar, cancelar e executar ordens, simulando um fluxo básico de negociação.

---

## 🚀 Tecnologias utilizadas

- React
- TypeScript
- Vite
- JSON Server (API mock)
- Vitest (testes automatizados)

---

## 📦 Como rodar o projeto

### 1. Instalar dependências

```bash
npm install
```

---

### 2. Criar arquivo `.env`

```env
VITE_API_URL=http://localhost:3001
```

---

### 3. Rodar o JSON Server

```bash
npx json-server --watch db.json --port 3001
```

---

### 4. Rodar a aplicação

```bash
npm run dev
```

---

## 🧪 Rodar testes

```bash
npm run test
```

---

## 📋 Funcionalidades

- Listagem de ordens em tabela
- Filtros por status, lado, data e busca por ID/instrumento
- Paginação
- Modal de detalhes com histórico de status
- Criação de novas ordens
- Cancelamento de ordens com validação
- Feedback visual com toast
- Destaque visual ao criar/atualizar ordens
- Máscara de moeda no campo de preço

---

## 🧠 Lógica de execução

Ao criar uma nova ordem, o sistema tenta encontrar uma contraparte compatível.

Critérios considerados:
- Mesmo instrumento
- Lados opostos (compra/venda)
- Preço compatível

### Regras de execução

- Quantidades iguais → ambas ficam **executadas**
- Nova ordem maior → nova ordem fica **parcial**
- Nova ordem menor → contraparte fica **parcial**
- Sem contraparte → ordem permanece **aberta**

---

## 🧪 Testes

Foram criados testes unitários para:

- Regras de cancelamento (`canCancelOrder`)
- Ordenação (`sortBy`)
- Execução de ordens (`executeOrderMatch`)

---

## 📁 Estrutura do projeto

```
src/
  components/
  services/
  utils/
  tests/
```

---

## 💬 Observações

O projeto foi desenvolvido com foco em:

- Código simples e legível
- Separação entre lógica de negócio e interface
- Experiência do usuário (UX)
- Componentização e reutilização

---

## 🏁 Challenge

This is a challenge by [Coodesh](https://coodesh.com/)
