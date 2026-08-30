import { CriarTarefaForm } from '../components/criarTarefaForm';
import { ListaTarefas, type Tarefa } from '../components/listaTarefas';
import { useState, useEffect } from 'react';
import { criarTarefaAPI, carregarTarefasAPI, alternarConcluidaAPI, editarTarefaAPI, apagarTarefaAPI } from '../services/tarefaService';

export function TarefasPage() {
  const [tarefas, setTarefas] = useState<Tarefa[]>([]);
  const [carregando, setCarregando] = useState(true);

  async function handleCriarTarefa(descricao: string) {
  try {
    // Chama o serviço para criar a tarefa
    const novaTarefa = await criarTarefaAPI(descricao);
    
    console.log('Tarefa criada com sucesso:', novaTarefa);
    await carregarTarefas();
    alert('Tarefa criada com sucesso!');

  } catch (erro) {
    // O throw do serviço faz o código saltar diretamente para aqui se algo falhar
    console.error('Erro ao criar tarefa:', erro);
    alert('Não foi possível criar a tarefa!');
  }
}

  async function carregarTarefas() {
    try {
      setCarregando(true);
      const dados = await carregarTarefasAPI();
      setTarefas(dados);

    } catch (erro) {
      console.error('Erro ao carregar tarefas:', erro);
    } finally {
      setCarregando(false);
    }
  }

  async function handleAlternarConcluida(id: number, statusAtual: number) {
    try {
      // 1. Inverte o status (de 0 para 1 ou de 1 para 0)
      const novoStatus = statusAtual === 1 ? 0 : 1;

      // 2. Procura a tarefa atual no estado local para reaproveitar a descrição
      const tarefaAtual = tarefas.find((t) => t.id === id);
      const descricao = tarefaAtual ? tarefaAtual.descricao : '';

      // 3. Chama o serviço para atualizar na base de dados
      await alternarConcluidaAPI(id, novoStatus, descricao);

      // 4. Se correu bem, recarrega a lista
      await carregarTarefas();

    } catch (erro) {
      // 5. Se o serviço der throw (resposta.ok for false) ou a rede falhar, cai aqui
      console.error('Erro ao alternar status da tarefa:', erro);
      alert('Não foi possível atualizar a tarefa.');
    }
  }

  async function handleEditarTarefa(id: number, novaDescricao: string, statusAtual: number) {
    try {
      await editarTarefaAPI(id, novaDescricao, statusAtual);
      await carregarTarefas();
      alert('Tarefa editada com sucesso!');

    } catch (erro) {
      
      console.error('Erro de ligação ao servidor:', erro);
      alert('Não foi possível editar a tarefa.');
    }
  }

  async function handleApagarTarefa(id: number) {
    try {

        await apagarTarefaAPI(id);
        await carregarTarefas();
        alert('Tarefa apagada com sucesso!');

    } catch (erro) {
      console.error('Erro de ligação ao servidor:', erro);
      alert('Não foi possível apagar a tarefa.');
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
        carregando={carregando}
        onAlternarConcluida={handleAlternarConcluida} 
        onEditarTarefa={handleEditarTarefa}
        onApagarTarefa={handleApagarTarefa}
      />
    </div>
  );
}