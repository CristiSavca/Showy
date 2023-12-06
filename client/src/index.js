import React from 'react';
import ReactDOM from 'react-dom';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { BrowserRouter as Router } from 'react-router-dom';
import App from './App';

ReactDOM.render(
  <GoogleOAuthProvider clientId="1044921691060-i2r4nt3ckg2h4u4m1ld4bbmc270barj1.apps.googleusercontent.com">
    <React.StrictMode>
      <Router>
        <App />
      </Router>
    </React.StrictMode>
  </GoogleOAuthProvider>,
  document.getElementById('root')
);
