import { CriarTarefaForm } from '../components/criarTarefaForm';
import {ListaTarefas, type Tarefa} from '../components/listaTarefas';
import { useState, useEffect } from 'react';

export function TarefasPage() {
  const [tarefas, setTarefas] = useState<Tarefa[]>([]);

  async function handleCriarTarefa(descricao: string) {
    try {

      const resposta = await fetch('http://localhost:3333/api/tarefas', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ descricao }),
      });

      if (resposta.ok) {
        const novaTarefa = await resposta.json();
        console.log('Tarefa criada com sucesso:', novaTarefa);
        await carregarTarefas();
        alert('Tarefa criada com sucesso!');

      } else {

        const dadosErro = await resposta.json().catch(() => ({}));
        console.log('Status do erro:', resposta.status);
        console.log('Detalhes do erro:', dadosErro);
        alert(`Erro ao criar tarefa! Status: ${resposta.status}`);
      }

    } catch (erro) {

      console.error('Erro de ligação ao servidor:', erro);
      alert('Não foi possível conectar ao backend. O servidor está a rodar na porta 3333?');
    }
  } 

  async function carregarTarefas() {
    try {

      const resposta = await fetch('http://localhost:3333/api/tarefas');
      const dados = await resposta.json();
      setTarefas(dados);

    } catch (erro) {

      console.error('Erro ao carregar tarefas:', erro);
    }
  }

  useEffect(() => {
    carregarTarefas();
  }, []);

  return (
    <div className="container py-5" style={{ maxWidth: '650px' }}>
      <div className="card shadow-sm border-0 my-3">
        <div className="card-body p-4 p-md-5">
          <h1 className="card-title text-center text-primary mb-4 fw-bold">
            Gestão de Tarefas 📝
          </h1>
          
          <div className="mt-4">
            <CriarTarefaForm onCriarTarefa={handleCriarTarefa} />
          </div>
        </div>
      </div>
      <ListaTarefas tarefas={tarefas} />
    </div>
  );
}