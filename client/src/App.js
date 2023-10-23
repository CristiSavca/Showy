import React from 'react';
import './App.css';
import Navbar from './components/Navbar';
import { BrowserRouter as Router, Routes, Route }
	from 'react-router-dom';
import Feed from './pages/feed';
import {GoogleLogin } from '@react-oauth/google';
import Profile from './pages/profile';
import Signup from './pages/Signup';
import Login from './pages/Login';

function App() {
	const responseMessage = (response) => {
        console.log(response);
    };
    const errorMessage = (error) => {
        console.log(error);
    };
	return (
		<Router>
			<div>
            	<br />
            	<br />
				<br />
            	<br />
            	<GoogleLogin onSuccess={responseMessage} onError={errorMessage} />
        	</div>
			<Navbar />
			<Routes>
				<Route path='/signup' element={<Signup />} />
				<Route path='/login' element={<Login />} />
				<Route exact path='/feed' element={<Feed />} />
				<Route path='/profile' element={<Profile />} />
			</Routes>
		</Router>
	);
}

export default App;
