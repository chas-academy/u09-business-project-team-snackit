import './App.css'
import Lobby from './Lobby';

function App() {
  document.getElementById('login-body')?.setAttribute('id', 'root-body')

  return (
   <Lobby />
  )
}

export default App