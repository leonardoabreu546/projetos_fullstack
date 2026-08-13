import { open } from 'sqlite';
import sqlite3 from 'sqlite3';

export async function conectarDB() {
  const db = await open({
    filename: './src/database/database.sqlite', // Onde o ficheiro da base de dados vai ficar guardado
    driver: sqlite3.Database
  });

  await db.exec(`
    CREATE TABLE IF NOT EXISTS tarefas (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      descricao TEXT NOT NULL,
      concluida INTEGER DEFAULT 0
    );
  `);

  return db;
}