import express from 'express';
import cors from 'cors';

const app = express();
const PORT = 3333;

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