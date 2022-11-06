import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { CustomizationProvider } from 'context/CustomizationContext';
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <React.StrictMode>
    <CustomizationProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </CustomizationProvider>
  </React.StrictMode>
);
