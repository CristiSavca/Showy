import React from 'react';
import './App.css';
import Navbar from './components/Navbar';
import { BrowserRouter as Router, Routes, Route }
	from 'react-router-dom';
import Feed from './pages/feed';
import Profile from './pages/profile';
import WholeUserPost from './components/FeedComponents/WholeUserPost';
import CreateUserPost from './components/FeedComponents/CreateUserPost';

function App() {
	return (
		<Router>
			<Navbar />
			<Routes>
				<Route exact path='/feed' element={<Feed />} />
				<Route path='/profile' element={<Profile />} />
				<Route path='/posts/:id' element={<WholeUserPost />} />
				<Route path='/posts/create-post' element={<CreateUserPost />} />
			</Routes>
		</Router>
	);
}

export default App;
