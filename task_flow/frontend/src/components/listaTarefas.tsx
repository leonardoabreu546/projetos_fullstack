import { ItemTarefa } from './itemTarefa'; // importa o novo componente

export interface Tarefa {
  id: number;
  descricao: string;
  concluida: number;
}

interface ListaTarefasProps {
  tarefas: Tarefa[];
  carregando: boolean;
  onAlternarConcluida: (id: number, statusAtual: number) => void;
  onEditarTarefa: (id: number, novaDescricao: string, statusAtual: number) => void;
  onApagarTarefa: (id: number) => void; 
}

export function ListaTarefas({
  tarefas,
  onAlternarConcluida,
  onEditarTarefa,
  onApagarTarefa,
  carregando
}: ListaTarefasProps) {
    if (carregando) {
    return (
      <div className="text-center my-4">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">A carregar...</span>
        </div>
        <p className="mt-2 text-muted">A carregar tarefas...</p>
      </div>
    );
  }

  return (
    <div className="mt-4">
      <h2 className="fw-semibold mb-3">Lista de Tarefas</h2>
      {tarefas.length === 0 ? (
        <p className="text-muted">Nenhuma tarefa encontrada.</p>
      ) : (
        <ul className="list-group">
          {tarefas.map((tarefa) => (
            <ItemTarefa
              key={tarefa.id}
              tarefa={tarefa}
              onAlternarConcluida={onAlternarConcluida}
              onEditarTarefa={onEditarTarefa}
              onApagarTarefa={onApagarTarefa}
            />
          ))}
        </ul>
      )}
    </div>
  );
}