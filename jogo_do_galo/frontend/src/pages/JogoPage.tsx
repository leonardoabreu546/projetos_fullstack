import { useState } from 'react'
import {Board} from '../components/Board'

export function JogoPage() {
  const [squares, setSquares] = useState<(string | null)[]>(Array(9).fill(null));
  const [xIsNext, setXIsNext] = useState<boolean>(true);

  function handleClick(i: number) {
    if (squares[i] || calculateWinner(squares)) return;

    const nextSquares = squares.slice();

    nextSquares[i] = xIsNext ? 'X' : 'O';

    setSquares(nextSquares);
    setXIsNext(!xIsNext);
  }

  const winner = calculateWinner(squares);

  const status = winner 
  ? `Vencedor: ${winner}! 🎉` 
  : `Próximo a jogar: ${xIsNext ? 'X' : 'O'}`;

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
      return squares[a];} // Retorna 'X' ou 'O'
  }

  return null;
  
}



  return (
    <div className="d-flex flex-column align-items-center">
      <h1 className="mb-4">Jogo do Galo</h1>
      <p className="fs-4">{status}</p>
      <Board squares={squares} onSquareClick={handleClick} />
    </div>
  );
}
  