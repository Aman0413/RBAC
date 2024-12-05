import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { BrowserRouter } from 'react-router-dom'
import { AuthContext } from './context/AuthContext.ts'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <AuthContext.Provider value={'aman'}>

        <App />
      </AuthContext.Provider>
    </BrowserRouter>
  </StrictMode>,
)
