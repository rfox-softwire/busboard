import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import './index.css';
import BusBoardApp from './BusBoardApp.tsx';
import About from './About.tsx';
import 'leaflet/dist/leaflet.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <nav className="border-b-2 border-gray-200">
        <ul>
          <li className="inline m-2 p-2 hover:text-cyan-700 ">
            <Link to="/">Busboard</Link>
          </li>
          <li className="inline m-2 p-2 hover:text-cyan-700">
            <Link to="/about">About buses</Link>
          </li>
        </ul>
      </nav>

      <Routes>
        <Route path="/" element = {<BusBoardApp />} />
        <Route path="/about" element = {<About />} />
      </Routes>

    </BrowserRouter>

    
  </StrictMode>,
);
