# Projeto To do (Node.js + Supabase + HTML)

Estrutura:

```
todo-projeto/
├── schema.sql              # tabela "tarefas" + tarefa inicial (Supabase)
├── nodejs-api-tarefas/     # Backend (API Node.js + Express)
└── todo-html/              # Frontend (index.html)
```

## O que VOCÊ precisa fazer (eu não consigo por você)

### 1. Pré-requisitos
- Instalar o **Node.js**: https://nodejs.org/en/download
- Ter o **VS Code** (ou outra IDE)
- Criar conta gratuita no **Supabase** (https://supabase.com/) e no **Postman** (https://www.postman.com/)

### 2. Criar o banco no Supabase
1. No Supabase: **New project**. Defina uma senha e **salve essa senha**.
2. Abra **SQL Editor > New query**, cole o conteúdo de `schema.sql` e clique em **Run**.
   Isso cria a tabela `tarefas` (`id` int8, `title` varchar, `completed` bool) e já insere
   **("Ir ao supermercado", false)**.
   (Alternativa manual: Table Editor > New table, e adicionar a linha na mão.)
3. Clique no botão **Connect** do projeto, aba **Connection string**, e copie a URI do
   **Session pooler**. Troque `[YOUR-PASSWORD]` pela sua senha.

### 3. Configurar e iniciar a API
No terminal, dentro da pasta `nodejs-api-tarefas`:

```bash
cp .env.example .env        # (Windows: copy .env.example .env)
# edite o .env e cole sua DATABASE_URL
npm install
node index.js
```

Deve aparecer: `API rodando em http://localhost:3000`

### 4. Testar com o Postman
- **GET** `http://localhost:3000/tarefas` → deve devolver a lista com "Ir ao supermercado".
- (Opcional) **POST** `/tarefas` com body JSON `{"title":"Estudar"}`,
  **PUT** `/tarefas/1` com `{"title":"Novo título"}`, **DELETE** `/tarefas/1`.

### 5. Abrir a página
Com o servidor rodando, abra `todo-html/index.html` no navegador (duplo clique).

### 6. Gravar o vídeo (Loom) mostrando:
1. Criar nova tarefa
2. Editar tarefa
3. Deletar tarefa

Depois, compartilhe o link do vídeo no Teams.

## Endpoints da API

| Método | Rota             | Descrição                         |
|--------|------------------|-----------------------------------|
| GET    | `/tarefas`       | Lista tarefas                     |
| POST   | `/tarefas`       | Cria (`title`, `completed`)       |
| PUT    | `/tarefas/:id`   | Edita (`title` e/ou `completed`)  |
| DELETE | `/tarefas/:id`   | Remove                            |

## Se usar o computador da escola
Ao terminar:
- Apague a `DATABASE_URL` do arquivo `.env`
- Altere a senha do banco (Supabase > Project Settings > Database) **ou** delete o projeto
