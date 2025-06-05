import './App.css'
import Lobby from './Lobby';

function App() {
  document.getElementById('login-body')?.setAttribute('id', 'root-body')

  return (
    <div><Lobby /></div>
  )
}

export default App


