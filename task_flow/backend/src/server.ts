import express from 'express';
import cors from 'cors';
import { conectarDB } from './database/index.js';

const app = express();
const PORT = 3333;
const db = await conectarDB();

// Middlewares
app.use(cors());
app.use(express.json());

// Rota de teste
app.get('/api/teste', (req, res) => {
  return res.json({ mensagem: 'API do Gestor de Tarefas a funcionar! 🚀' });
});

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`🔥 Servidor a rodar em http://localhost:${PORT}`);
});