import React from 'react';
import ReactDOM from 'react-dom';
import { GoogleOAuthProvider } from '@react-oauth/google'; 

import { Provider } from 'react-redux';
import store from './redux/store';

import App from './App';

ReactDOM.render(
	<GoogleOAuthProvider clientId="1044921691060-i2r4nt3ckg2h4u4m1ld4bbmc270barj1.apps.googleusercontent.com">
        <React.StrictMode>
            <Provider store={store}>
                <App />
            </Provider>
        </React.StrictMode>
    </GoogleOAuthProvider>,
	document.getElementById('root')
);