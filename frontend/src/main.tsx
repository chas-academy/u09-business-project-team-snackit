import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import Login from './Login.tsx'
import Game from './Game.tsx'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Leaderboard from './Leaderboard.tsx'
import Profile from './Profile.tsx'
import Instructions from './Instructions.tsx'
import ErrorElement from './404.tsx'


const router = createBrowserRouter([
  {
    path: "/",
    errorElement: <ErrorElement />,
    element: <Login />
  },
  {
    path: "/lobby",
    errorElement: <ErrorElement />,
    element: <App />
  },
  {
  path: "/instructions",
  errorElement: <ErrorElement />,
  element: <Instructions />,
  },
  {
    path: "/game",
    errorElement: <ErrorElement />,
    element: <Game />
  },
  {
    path: "/leaderboard",
    errorElement: <ErrorElement />,
    element: <Leaderboard />
  },
  {
    path: "/profile",
    errorElement: <ErrorElement />,
    element: <Profile />
  },
  {
    path: "*",
    errorElement: <ErrorElement />,
    element: <ErrorElement />
  }
])

createRoot(document.getElementById('root')as HTMLElement).render(
  <StrictMode>
    <RouterProvider router = {router} />
  </StrictMode>,
)
