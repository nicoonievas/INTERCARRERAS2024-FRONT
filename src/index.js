import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import './index.css';
import App from './App';
import { Auth0Provider } from '@auth0/auth0-react';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Auth0Provider
        domain="dev-ewcddx7xc8jwb37h.us.auth0.com"
        clientId="VKm9PRuunETMj0G4iyM5QnGsm6mLMHpy"
        authorizationParams={{
          redirect_uri: window.location.origin,
        }}
      >
        <App /> 
      </Auth0Provider>
    </BrowserRouter>
  </React.StrictMode>
);
