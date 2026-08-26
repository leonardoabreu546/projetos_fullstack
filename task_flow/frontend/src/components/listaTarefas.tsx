import { useState } from 'react';

export interface Tarefa {
    id: number;
    descricao: string;
    concluida: number;
}

interface ListaTarefasProps {
    tarefas: Tarefa[];
    onAlternarConcluida: (id: number, statusAtual: number) => void;
    onEditarTarefa: (id: number, novaDescricao: string, statusAtual: number) => void;
    onApagarTarefa: (id: number) => void;
}

export function ListaTarefas({ tarefas, onAlternarConcluida, onEditarTarefa, onApagarTarefa }: ListaTarefasProps) {
    const [idEditando, setIdEditando] = useState<number | null>(null);
    const [textoEditado, setTextoEditado] = useState('');

    return(
        <div className="mt-4">
            <h2 className="fw-semibold mb-3">Lista de Tarefas</h2>
            {tarefas.length === 0 ? (
                <p className="text-muted">Nenhuma tarefa encontrada.</p>
            ) : (
                <ul className="list-group">
                    {tarefas.map((tarefa) => (
                        <li key={tarefa.id} className="list-group-item">
                            {idEditando === tarefa.id ? (
                                <div>
                                    <textarea
                                        className="form-control mb-2"
                                        rows={3}
                                        value={textoEditado}
                                        onChange={(e) => setTextoEditado(e.target.value)}
                                    />
                                    <button
                                        className="btn btn-sm btn-success me-2"
                                        onClick={() => {
                                            if (textoEditado.trim() !== '') {
                                                onEditarTarefa(tarefa.id, textoEditado, tarefa.concluida);
                                            }
                                            setIdEditando(null);
                                        }}
                                    >
                                        Guardar
                                    </button>
                                    <button
                                        className="btn btn-sm btn-secondary"
                                        onClick={() => setIdEditando(null)}
                                    >
                                        Cancelar
                                    </button>
                                </div>
                            ) : (
                                <div className="d-flex justify-content-between align-items-center">
                                    <span className="text-start me-3" style={{ whiteSpace: 'pre-line' }}>
                                        {tarefa.descricao}
                                    </span>
                                    <div className="d-flex gap-2 text-nowrap">
                                        <button
                                            className="btn btn-sm btn-outline-warning"
                                            onClick={() => {
                                                setIdEditando(tarefa.id);
                                                setTextoEditado(tarefa.descricao);
                                            }}
                                        >
                                            Editar
                                        </button>
                                        <button
                                            className="btn btn-sm btn-outline-primary"
                                            onClick={() => onAlternarConcluida(tarefa.id, tarefa.concluida)}
                                        >
                                            {tarefa.concluida === 1 ? 'Desmarcar' : 'Marcar como Concluída'}
                                        </button>
                                        <button
                                            className="btn btn-sm btn-outline-danger"
                                            onClick={() => onApagarTarefa(tarefa.id)}
                                        >
                                            Apagar
                                        </button>
                                    </div>
                                </div>
                            )}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}