export interface Tarefa {
    id: number;
    descricao: string;
    concluida: number;
}

interface ListaTarefasProps {
    tarefas: Tarefa[];
    onAlternarConcluida: (id: number, statusAtual: number) => void;
}

export function ListaTarefas({ tarefas, onAlternarConcluida }: ListaTarefasProps) {
    return(
        <div className="mt-4">
            <h2 className="fw-semibold mb-3">Lista de Tarefas</h2>
            {tarefas.length === 0 ? (
                <p className="text-muted">Nenhuma tarefa encontrada.</p>
            ) : (
                <ul className="list-group">
                    {tarefas.map((tarefa) => (
                        <li key={tarefa.id} className="list-group-item">
                            {tarefa.descricao}
                            <button
                                className="btn btn-sm btn-outline-primary float-end"
                                onClick={() => onAlternarConcluida(tarefa.id, tarefa.concluida)}
                            >
                                {tarefa.concluida === 1 ? 'Desmarcar' : 'Marcar como Concluída'}
                            </button>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    )}