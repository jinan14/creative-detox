import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import api from './api/axios'

// Fire-and-forget wake-up for the Render backend (free tier sleeps after
// ~15 min idle). Starts the cold start while the visitor is still on the
// page they landed on, before they navigate to a page that needs data.
api.get('/health').catch(() => {})

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
