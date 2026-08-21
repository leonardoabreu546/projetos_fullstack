import express from 'express';
import cors from 'cors';
import { conectarDB } from './database/index.js';

const app = express();
const PORT = 3333;
const db = await conectarDB();

// Middlewares
app.use(cors());
app.use(express.json());

app.post('/api/tarefas', async (req, res) => {
  try {
  const {descricao} = req.body;

  if (!descricao) {
    return res.status(400).json({ error: 'A descrição da tarefa é obrigatória.' });
  }

  const resultado = await db.run(
    'INSERT INTO tarefas (descricao) VALUES (?)',
    [descricao]
  );

  return res.status(201).json({ id: resultado.lastID, descricao, concluida: 0 });

  } catch (error) {
    return res.status(500).json({ error: 'Erro ao criar tarefa!' });
  }
});

app.get('/api/tarefas', async (req, res) => {
  try {
    const tarefas = await db.all('SELECT * FROM tarefas');
    return res.status(200).json(tarefas);

  } catch (error) {
    console.error('Erro ao buscar tarefas:', error);
    return res.status(500).json({ error: 'Erro ao buscar tarefas!' });
  }
});

app.put('/api/tarefas/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { concluida, descricao } = req.body;
    const resultado = await db.run(
      'UPDATE tarefas SET concluida = ?, descricao = ? WHERE id = ?',
      [concluida, descricao, id]
    );

    if (resultado.changes === 0) {
      return res.status(404).json({ error: 'Tarefa não encontrada.' });
    }

    return res.status(200).json({ message: 'Tarefa atualizada com sucesso!' });

  } catch (error) {
    console.error('Erro ao atualizar tarefa:', error);
    return res.status(500).json({ error: 'Erro ao atualizar tarefa!' });
  }
});

app.listen(PORT, () => {
  console.log(`🔥 Servidor a rodar em http://localhost:${PORT}`);
});