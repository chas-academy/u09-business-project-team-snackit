import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import Login from './Login.tsx'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { GoogleOAuthProvider } from '@react-oauth/google'



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
    <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
    <RouterProvider router = {router} />
    </GoogleOAuthProvider>
  </StrictMode>,
)
