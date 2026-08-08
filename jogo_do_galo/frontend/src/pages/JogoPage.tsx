import { Square } from '../components/Square';

export function JogoPage() {
  return (
    <div className="container mt-5 text-center">
      <h2>Testando o Componente Square</h2>
      <div className="mt-4">
        <Square value="X" onSquareClick={() => alert('Clicaste no X!')} />
        <Square value="O" onSquareClick={() => alert('Clicaste no O!')} />
      </div>
    </div>
  );
}