import { CriarTarefaForm } from '../components/criarTarefaForm';

export function TarefasPage() {
    
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
        alert('Tarefa criada com sucesso!');
      } else {
        alert('Erro ao criar tarefa!');
      }
    } catch (erro) {
      console.error('Erro de ligação ao servidor:', erro);
      alert('Não foi possível conectar ao backend. O servidor está a rodar na porta 3333?');
    }
  }

  return (
    <div className="container mt-5">
      <h1>Gestão de Tarefas</h1>
      <CriarTarefaForm onCriarTarefa={handleCriarTarefa} />
    </div>
  );
}