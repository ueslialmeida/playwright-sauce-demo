# Playwright Sauce Demo E2E Tests 🎭

Este repositório contém os testes automatizados End-to-End (E2E) para a aplicação [Sauce Demo](https://www.saucedemo.com/), desenvolvidos em **TypeScript** utilizando o **Playwright**.

---

## 📋 Sumário
- [Decisões Técnicas e Arquitetura](#-decisões-técnicas-e-arquitetura)
- [Estrutura do Projeto](#-estrutura-do-projeto)
- [Pré-requisitos e Instalação](#-pré-requisitos-e-instalação)
- [Executando os Testes](#-executando-os-testes)
- [Execução via GitHub Actions (CI/CD)](#-execução-via-github-actions-cicd)
- [Cenários de Testes](#-cenários-de-testes)

---

## 🛠️ Decisões Técnicas e Arquitetura

O projeto foi construído focando em manutenibilidade, reutilização de código e boas práticas de automação de testes:

1. **Page Object Model (POM):** Encapsulamento dos elementos e ações de cada página nas classes dentro de `src/pages/`. Isso isola a lógica da página das asserções do teste, facilitando a manutenção em caso de alterações na interface.
2. **Componentes Reutilizáveis:** Separação de elementos recorrentes (como a barra de navegação) em `src/components/` para evitar duplicação de código.
3. **Factory Pattern:** Utilização de `src/factories/client.factory.ts` para geração flexível de dados de teste de clientes/usuários.
4. **Authentication Setup (`auth.setup.ts`):** Reutilização de estados de autenticação para evitar realizar a etapa de login repetidamente em testes que dependem de uma sessão autenticada, otimizando o tempo de execução da suíte.
5. **Qualidade e Padronização de Código:**
   - **ESLint & Prettier:** Garantia do padrão estético e identificação de maus padrões no código.
   - **Husky & Commitlint:** Verificação de mensagens de commit padronizadas (Conventional Commits) e execução de validações antes dos commits.

---

## 📁 Estrutura do Projeto

```text
playwright-sauce-demo/
├── .github/
│   └── workflows/              # Workflows de CI/CD para automação via GitHub Actions
├── .husky/                     # Hooks do Git para linting e commitlint
├── src/
│   ├── components/             # Componentes globais da aplicação (ex: navigation)
│   ├── factories/              # Geradores de dados para testes (ex: client.factory.ts)
│   └── pages/                  # Mapeamentos e ações da interface (Page Object Model)
├── tests/                      # Arquivos de especificações de testes (.spec.ts)
│   ├── auth.setup.ts           # Configuração de pré-autenticação
│   ├── cart.spec.ts            # Testes da tela de carrinho
│   ├── checkout.spec.ts        # Testes do fluxo de checkout
│   ├── inventory.spec.ts       # Testes do catálogo de produtos
│   └── login.spec.ts           # Testes da página de login
├── .env.example                # Exemplo de variáveis de ambiente
├── commitlint.config.ts        # Configuração das regras do Commitlint
├── eslint.config.ts            # Configuração das regras do ESLint
├── playwright.config.ts        # Configurações gerais do Playwright
└── package.json                # Dependências e scripts do projeto
```

---

## 🚀 Pré-requisitos e Instalação

Antes de começar, garante que possui instalado na sua máquina:
- [Node.js](https://nodejs.org/) (Versão 18 ou superior)
- Gerenciador de pacotes **npm**

### Passo a passo para setup local

1. **Clonar o repositório:**
   ```bash
   git clone <URL_DO_REPOSITORIO>
   cd playwright-sauce-demo
   ```

2. **Instalar as dependências do Node.js:**
   ```bash
   npm install
   ```

3. **Instalar os navegadores do Playwright:**
   ```bash
   npx playwright install --with-deps
   ```

4. **Configurar variáveis de ambiente:**
   Duplique o arquivo `.env.example` e renomeie para `.env` preenchendo as variáveis necessárias.
   ```bash
   cp .env.example .env
   ```

---

## 🧪 Executando os Testes

Disponibilizamos comandos práticos no `package.json` para facilitar a execução dos testes e a visualização dos relatórios:

| Comando | Descrição |
| :--- | :--- |
| `npm run test:open` | Abre a **UI do Playwright**, permitindo visualizar interativamente a execução passo a passo. |
| `npm run test:run` | Executa todos os testes em modo **headless** no terminal. |
| `npm run test:report` | Exibe o relatório de execução HTML gerado pelo Playwright no navegador. |

---

## 🤖 Execução via GitHub Actions (CI/CD)

O projeto conta com um **GitHub Actions Workflow** configurado para ser executado automaticamente (em Pushs / Pull Requests) ou **manualmente**:

1. Acesse a aba **Actions** no repositório no GitHub.
2. Selecione o workflow de testes na lista à esquerda.
3. Clique em **Run workflow**, escolha a branch e confirme a execução.

---

## 🧪 Cenários de Testes

### ✅ Cobertos

* **Login:**
  - Login com credenciais válidas.
  - Tentativa de login com credenciais inválidas.
* **Catálogo de Produtos (Inventory):**
  - Ordenação de produtos por Nome (A-Z e Z-A).
  - Ordenação de produtos por Preço (Menor para Maior e Maior para Menor).
  - Navegação para a página de detalhes do produto.
  - Adição de produtos ao carrinho diretamente pelo catálogo e pela página de detalhes.
* **Carrinho de Compras:**
  - Validação dos itens e elementos na tela do carrinho.
  - Remoção de produtos do carrinho.
* **Checkout:**
  - Execução do fluxo completo de compra (preenchimento de dados e confirmação do pedido).

### ⏳ Pendentes / Backlog

* **Checkout:**
  - [ ] Suporte e validação de checkout com múltiplos produtos (dois ou mais itens no carrinho simultaneamente).