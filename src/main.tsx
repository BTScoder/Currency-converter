import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { CurrencyProvider } from './contexts/CurrencyContext.tsx'
import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <CurrencyProvider>
      <App />
    </CurrencyProvider>
  </StrictMode>,
)
