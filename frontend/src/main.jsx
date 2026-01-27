import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import ContextUser from './context/ContextUser.jsx';
import './index.css';
import App from './App.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ContextUser>
      <App />
    </ContextUser>
  </StrictMode>
);
