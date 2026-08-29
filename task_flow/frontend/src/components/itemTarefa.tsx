import type { Tarefa } from './listaTarefas';
import { useState } from 'react';

interface ItemTarefaProps {
    tarefa: Tarefa;
    onAlternarConcluida: (id: number, statusAtual: number) => void;
    onEditarTarefa: (id: number, novaDescricao: string, statusAtual: number) => void;
    onApagarTarefa: (id: number) => void;
}

export function ItemTarefa({ tarefa, onAlternarConcluida, onEditarTarefa, onApagarTarefa }: ItemTarefaProps) {
    const [isEditando, setIsEditando] = useState(false);
    const [textoEditado, setTextoEditado] = useState(tarefa.descricao);

    return (
        <li className="list-group-item">
            {isEditando ? (
                <div>
                    <textarea
                        className="form-control mb-2"
                        rows={3}
                        value={textoEditado}
                        onChange={(e) => setTextoEditado(e.target.value)}
                    />
                    <button
                        className="btn btn-success btn-sm"
                        onClick={() => {
                            if (textoEditado.trim() !== '') {
                                onEditarTarefa(tarefa.id, textoEditado, tarefa.concluida);
                            }
                            setIsEditando(false);
                        }}
                    >
                        Guardar
                    </button>
                    <button
                        className="btn btn-sm btn-secondary"
                        onClick={() => setIsEditando(false)}
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
                            className={"btn btn-sm btn-outline-warning"}
                            onClick={() => {
                                setIsEditando(true);
                                setTextoEditado(tarefa.descricao);
                            }}
                        >
                            Editar
                        </button>
                        <button
                            className="btn btn-sm btn-outline-primary"
                            onClick={() => onAlternarConcluida(tarefa.id, tarefa.concluida)}
                        >
                            {tarefa.concluida === 1 ? 'Marcar como Pendente' : 'Marcar como Concluída'}
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
    );
}
