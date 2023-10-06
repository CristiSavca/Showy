import React from 'react';
import './App.css';
import Navbar from './components/Navbar';
import { BrowserRouter as Router, Routes, Route }
	from 'react-router-dom';
import Feed from './pages/feed';
import Profile from './pages/profile';
import WholeUserPost from './components/FeedComponents/WholeUserPost';

function App() {
	return (
		<Router>
			<Navbar />
			<Routes>
				<Route exact path='/feed' element={<Feed />} />
				<Route path='/profile' element={<Profile />} />
				<Route path='/posts/:id' element={<WholeUserPost />} />
			</Routes>
		</Router>
	);
}

export default App;
