import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { CurrencyProvider } from './contexts/CurrencyContext.tsx'
import { LogsProvider } from './contexts/LogsContext.tsx'
import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <LogsProvider>
      <CurrencyProvider>
        <App />
      </CurrencyProvider>
    </LogsProvider>
  </StrictMode>,
)
