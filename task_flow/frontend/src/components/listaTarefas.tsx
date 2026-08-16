export interface Tarefa {
    id: number;
    descricao: string;
    concluida: number;
}

interface ListaTarefasProps {
    tarefas: Tarefa[];
}

export function ListaTarefas({ tarefas }: ListaTarefasProps) {
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
                        </li>
                    ))}
                </ul>
            )}
        </div>
    )}