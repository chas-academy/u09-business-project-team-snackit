import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import Login from './Login.tsx'
import Game from './Game.tsx'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Leaderboard from './Leaderboard.tsx'
import Profile from './Profile.tsx'


const router = createBrowserRouter([
  {
    path: "/",
    element: <Login />
  },
  {
    path: "/lobby",
    element: <App />
  },
  {
    path: "/game",
    element: <Game />
  },
  {
    path: "/leaderboard",
    element: <Leaderboard />
  },
  {
    path: "/profile",
    element: <Profile />
  }
])

createRoot(document.getElementById('root')as HTMLElement).render(
  <StrictMode>
    <RouterProvider router = {router} />
  </StrictMode>,
)
