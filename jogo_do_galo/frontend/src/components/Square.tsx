interface SquareProps {
  value: string | null;
  onSquareClick: () => void;
}

export function Square({ value, onSquareClick }: SquareProps) {
  return (
    <button 
      className="btn btn-outline-dark fs-1 fw-bold p-0"
      style={{ width: '80px', height: '80px', verticalAlign: 'top' }}
      onClick={onSquareClick}
    >
      {value}
    </button>
  );
}