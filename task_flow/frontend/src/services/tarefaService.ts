export async function criarTarefaAPI(descricao: string) {
  const resposta = await fetch('http://localhost:3333/api/tarefas', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ descricao }),
  });

  // Se o servidor devolver status de erro (ex: 400 ou 500), lança o alarme
  if (!resposta.ok) {
    throw new Error(`Erro no servidor! Status: ${resposta.status}`);
  }

  // Se correu tudo bem, devolve os dados para a página
  return await resposta.json();
}

export async function carregarTarefasAPI() {
    const resposta = await fetch('http://localhost:3333/api/tarefas');
    const dados = await resposta.json();

    if (!resposta.ok) {
      throw new Error(`Erro no servidor! Status: ${resposta.status}`);
    }
    return dados;
}

export async function alternarConcluidaAPI(id: number, novoStatus: number, descricao: string) {
  const resposta = await fetch(`http://localhost:3333/api/tarefas/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ 
      concluida: novoStatus,
      descricao: descricao 
    }),
  });

  if (!resposta.ok) {
    throw new Error(`Erro ao atualizar tarefa! Status: ${resposta.status}`);
  }
}

export async function editarTarefaAPI(id: number, novaDescricao: string, statusAtual: number) {
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

  if (!resposta.ok) {
    throw new Error(`Erro ao editar tarefa! Status: ${resposta.status}`);
  }
}

export async function apagarTarefaAPI(id: number) {
  const resposta = await fetch(`http://localhost:3333/api/tarefas/${id}`, {
        method: 'DELETE',
      });
  if (!resposta.ok) {
    throw new Error(`Erro ao apagar tarefa! Status: ${resposta.status}`);
  }
} 