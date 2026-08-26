import { CriarTarefaForm } from '../components/criarTarefaForm';
import { ListaTarefas, type Tarefa } from '../components/listaTarefas';
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

  async function handleAlternarConcluida(id: number, statusAtual: number) {
    try {
      const novoStatus = statusAtual === 1 ? 0 : 1;
      const tarefaAtual = tarefas.find((t) => t.id === id);

      const resposta = await fetch(`http://localhost:3333/api/tarefas/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          concluida: novoStatus,
          descricao: tarefaAtual ? tarefaAtual.descricao : ''
        }),
      });

      if (resposta.ok) {
        await carregarTarefas();
      } else {
        alert(`Erro ao atualizar tarefa! Status: ${resposta.status}`);
      }
    } catch (erro) {
      console.error('Erro de ligação ao servidor:', erro);
    }
  } 

  async function handleEditarTarefa(id: number, novaDescricao: string, statusAtual: number) {
    try {
      const resposta = await fetch(`http://localhost:3333/api/tarefas/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          descricao: novaDescricao, 
          concluida: statusAtual 
        }),
      });

      if (resposta.ok) {
        await carregarTarefas();
      } else {
        alert(`Erro ao atualizar tarefa! Status: ${resposta.status}`);
      }
    } catch (erro) {
      console.error('Erro de ligação ao servidor:', erro);
    }
  }

  async function handleApagarTarefa(id: number) {
    try {
      const resposta = await fetch(`http://localhost:3333/api/tarefas/${id}`, {
        method: 'DELETE',
      });
      if (resposta.ok) {
        await carregarTarefas();
        alert('Tarefa apagada com sucesso!');
      } else {
        alert(`Erro ao apagar tarefa! Status: ${resposta.status}`);
      }
    } catch (erro) {
      console.error('Erro de ligação ao servidor:', erro);
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
      <ListaTarefas 
        tarefas={tarefas} 
        onAlternarConcluida={handleAlternarConcluida} 
        onEditarTarefa={handleEditarTarefa}
        onApagarTarefa={handleApagarTarefa}
      />
    </div>
  );
}