import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import 'normalize.css';
import './scss/style.scss';
import App from './js/components/App.tsx';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
