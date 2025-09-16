import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'
import './index.css'
import App from './App.tsx'
import About from './About.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <nav>
        <Link to="/">Home</Link>
        <Link to="/about">About buses</Link>
      </nav>

      <Routes>
        <Route path="/" element = {<App />} />
        <Route path="/about" element = {<About />} />
      </Routes>

    </BrowserRouter>

    
  </StrictMode>,
)
