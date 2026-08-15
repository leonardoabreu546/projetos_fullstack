import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { TarefasPage } from './pages/tarefasPage';

export function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<TarefasPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App; 