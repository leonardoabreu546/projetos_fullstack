import { useState } from 'react';

interface CriarTarefaFormProps {
    onCriarTarefa: (descricao: string) => void;
}

export function CriarTarefaForm({ onCriarTarefa }: CriarTarefaFormProps) {
    const [descricao, setDescricao] = useState('');
    return (
        <form
            onSubmit={(e) => {
                e.preventDefault();
                if (descricao.trim()) {
                    onCriarTarefa(descricao);
                    setDescricao('');
                }
            }}
        >
            <div className="form-group">
                <label htmlFor="descricao">Descrição da Tarefa:</label>
                <input
                    type="text"
                    className="form-control"
                    id="descricao"
                    value={descricao}
                    onChange={(e) => setDescricao(e.target.value)}
                    placeholder="Digite a descrição da tarefa..."
                />
            </div>
            <button type="submit" className="btn btn-primary">
                Criar Tarefa
            </button>
        </form>
    );
}