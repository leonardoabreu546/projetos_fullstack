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
      <div className="mb-3">
        <label htmlFor="descricao" className="form-label fw-semibold">
          Descrição da Tarefa:
        </label>
        <textarea
          className="form-control"
          id="descricao"
          rows={3}
          value={descricao}
          onChange={(e) => setDescricao(e.target.value)}
          placeholder="Digite a descrição (pode usar Enter para criar novas linhas)..."
        />
      </div>

      <div className="d-grid gap-2">
        <button type="submit" className="btn btn-primary btn-lg">
          Criar Tarefa
        </button>
      </div>
    </form>
  );
}
