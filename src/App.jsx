
import './App.css';
import { Titulo } from './components/Título';
import { Saldo } from './components/Saldo';
import { Botones } from './components/Botones';
import { Historial } from './components/Historial';
function App() {
  return (
    <div className="container">
      <Titulo />
      <Saldo />
      <Botones />
      <Historial />
      
    </div>
  );
}

export default App;
