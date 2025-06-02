
import { useEffect, useState } from 'react';
import './App.css'
import Register from './Register'
import Lobby from './Lobby';

function App() {
  document.getElementById('login-body')?.setAttribute('id', 'root-body')
    const param = new URLSearchParams(window.location.search)
    const userId = param.get("userid")
    // console.log(userId)
    const [user, setUser] = useState<any>(null);
    let msg = ""
    const fetchUser = async () => {
      const res = await fetch (`http://localhost:3003/users/${userId}`, {
        credentials: "include",
        method: "GET",
        headers: {"Content-Type":"application/json"}
      });
      
      const data = await res.json();
      setUser(data);
    };
    
    useEffect(() => {
      fetchUser();
    }, []);
    
    console.log(user)
    if(user){
      msg = user.message
    }
  return (
    <>
  <main>
  {msg ? (
    <div> <Register /></div>
  ) : (
    <div><Lobby /></div>
  ) }
  </main>
    </>
  )
}

export default App


