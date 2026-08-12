import { useState } from 'react';
import { Board } from '../components/Board';

// 1. Função colocada FORA do componente
function calculateWinner(squares: (string | null)[]): string | null {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  for (const [a, b, c] of lines) {
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }

  return null;
}

export function JogoPage() {
  const [squares, setSquares] = useState<(string | null)[]>(Array(9).fill(null));
  const [xIsNext, setXIsNext] = useState<boolean>(true);

  function handleClick(i: number) {
    // Bloqueia cliques se o quadrado já tiver valor ou se já houver um vencedor
    if (squares[i] || calculateWinner(squares)) return;

    const nextSquares = squares.slice();
    nextSquares[i] = xIsNext ? 'X' : 'O';

    setSquares(nextSquares);
    setXIsNext(!xIsNext);
  }

  const winner = calculateWinner(squares);
  const isDraw = !winner && squares.every((square) => square !== null);

  const status = winner
    ? `Vencedor: ${winner}! 🎉`
    : isDraw
    ? `Empate! 😢`
    : `Próximo a jogar: ${xIsNext ? 'X' : 'O'}`;

  function handleReset() {
    setSquares(Array(9).fill(null));
    setXIsNext(true);
  }

  return (
    <div className="d-flex flex-column align-items-center">
      <h1 className="mb-4">Jogo do Galo</h1>
      <p className="fs-4">{status}</p>
      <Board squares={squares} onSquareClick={handleClick} />
      {(winner || isDraw) && (
        <button className="btn btn-primary mt-3" onClick={handleReset}>
          Reiniciar Jogo
        </button>
      )}
    </div>
  );
}