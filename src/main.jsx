import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

// StrictMode runs effects twice in development to catch side-effect bugs.
// Our Three.js cleanup in PoseViewer handles this correctly.
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
