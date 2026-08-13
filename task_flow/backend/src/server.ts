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

app.listen(PORT, () => {
  console.log(`🔥 Servidor a rodar em http://localhost:${PORT}`);
});