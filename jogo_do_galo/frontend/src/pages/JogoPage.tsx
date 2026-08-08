import { useState } from 'react'
import {Board} from '../components/Board'

export function JogoPage() {
  const [squares, setSquares] = useState<(string | null)[]>(Array(9).fill(null));
  const [xIsNext, setXIsNext] = useState<boolean>(true);

  function handleClick(i: number) {
    if (squares[i]) return;

    const nextSquares = squares.slice();

    nextSquares[i] = xIsNext ? 'X' : 'O';

    setSquares(nextSquares);
    setXIsNext(!xIsNext);
  }

  return (
    <div className="d-flex flex-column align-items-center">
      <h1 className="mb-4">Jogo do Galo</h1>
        <p>"Próximo a jogar:" <strong>{xIsNext ? 'X' : 'O'}</strong></p>
        <Board squares={squares} onSquareClick={handleClick} />
    </div>
  );
}
  