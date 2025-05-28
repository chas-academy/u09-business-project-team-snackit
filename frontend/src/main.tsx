import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import Login from './Login.tsx'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'


const router = createBrowserRouter([
  {
    path: "/",
    element: <Login />
  },
  {
    path: "/lobby",
    element: <App />
  }
])

createRoot(document.getElementById('root')as HTMLElement).render(
  <StrictMode>
    <RouterProvider router = {router} />
  </StrictMode>,
)
