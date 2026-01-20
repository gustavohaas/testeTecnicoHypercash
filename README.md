Aplicação Full-Stack (Next.js + Hono) para gerenciamento de usuários.

Stack
Web: Next.js 15, React 19, Tailwind v4, Shadcn/UI.

API: Hono + Bun Runtime.

Banco: SQLite (bun:sqlite).

Libs chave: TanStack Query & Table, React Hook Form, Zod.

Instalação e Execução
1. Requisitos
Bun instalado.

2. Setup
Bash

# Clonar
git clone https://github.com/gustavohaas/testeTecnicoHypercash.git

# Instalar dependências
cd api 

bun install

cd ../web 

bun install

Rodar (Full-Stack)
Na pasta /web, execute o comando que inicia o Frontend e o Backend simultaneamente:

bun dev:all

Web: http://localhost:3001

API: http://localhost:3000

🏗️ Estrutura
/api: Endpoints Hono, lógica de banco e arquivo .sqlite.

/web: Páginas de cadastro (/) e listagem (/listagem) com Shadcn.

📑 Funcionalidades
Cadastro: Validação Zod e feedback de erros da API.

Listagem: Tabela com busca, filtros e exclusão via modal.
