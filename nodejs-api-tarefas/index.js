require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { Pool } = require('pg');

const app = express();
app.use(cors());
app.use(express.json());

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false },
});

// Listar tarefas
app.get('/tarefas', async (req, res) => {
  try {
    const { rows } = await pool.query('SELECT id, title, completed FROM tarefas ORDER BY id');
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ erro: 'Erro ao listar tarefas' });
  }
});

// Criar tarefa
app.post('/tarefas', async (req, res) => {
  const { title, completed = false } = req.body;
  if (!title || !title.trim()) return res.status(400).json({ erro: 'title é obrigatório' });
  try {
    const { rows } = await pool.query(
      'INSERT INTO tarefas (title, completed) VALUES ($1, $2) RETURNING id, title, completed',
      [title.trim(), completed]
    );
    res.status(201).json(rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ erro: 'Erro ao criar tarefa' });
  }
});

// Editar tarefa (título e/ou status)
app.put('/tarefas/:id', async (req, res) => {
  const { title, completed } = req.body;
  try {
    const { rows } = await pool.query(
      `UPDATE tarefas
         SET title = COALESCE($1, title),
             completed = COALESCE($2, completed)
       WHERE id = $3
       RETURNING id, title, completed`,
      [title ?? null, completed ?? null, req.params.id]
    );
    if (!rows.length) return res.status(404).json({ erro: 'Tarefa não encontrada' });
    res.json(rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ erro: 'Erro ao editar tarefa' });
  }
});

// Deletar tarefa
app.delete('/tarefas/:id', async (req, res) => {
  try {
    const { rowCount } = await pool.query('DELETE FROM tarefas WHERE id = $1', [req.params.id]);
    if (!rowCount) return res.status(404).json({ erro: 'Tarefa não encontrada' });
    res.status(204).end();
  } catch (err) {
    console.error(err);
    res.status(500).json({ erro: 'Erro ao deletar tarefa' });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`API rodando em http://localhost:${PORT}`));
