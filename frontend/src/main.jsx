import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import ContextUser from './context/ContextUser.jsx';
import ContextCaptain from './context/ContextCaptain.jsx';
import './index.css';
import App from './App.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ContextCaptain>
      <ContextUser>
      <App />
    </ContextUser>
    </ContextCaptain>
    
  </StrictMode>
);
