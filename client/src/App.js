import React, { useEffect, useRef, useState } from 'react';
import Axios from 'axios';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import { GoogleLogin } from '@react-oauth/google';
import { signup, login, logout, useAuth } from "./firebase";

import './App.css';

import Navbar from './components/Navbar';
import Feed from './pages/feed';
import Profile from './pages/profile';
import WholeUserPost from './components/FeedComponents/WholeUserPost';
import CreateUserPost from './components/FeedComponents/CreateUserPost';

function App() {


    // State and ref from the second block
    const [loading, setLoading] = useState(false);
    const currentUser = useAuth();
    const emailRef = useRef();
    const passwordRef = useRef();

    // Handlers from the second block
    const responseMessage = response => console.log(response);
    const errorMessage = error => console.log(error);

    async function handleSignup() {
        setLoading(true);
        try {
            await signup(emailRef.current.value, passwordRef.current.value);
        } catch {
            alert("Error!");
        }
        setLoading(false);
    }

    async function handleLogin() {
        setLoading(true);
        try {
            await login(emailRef.current.value, passwordRef.current.value);
        } catch {
            alert("Error!");
        }
        setLoading(false);
    }

    async function handleLogout() {
        setLoading(true);
        try {
            await logout();
        } catch {
            alert("Error!");
        }
        setLoading(false);
    }

    return (
        <Router>
            {/* From the second block */}
            <div id="main">
                <div>Currently logged in as: {currentUser?.email}</div>
                {!currentUser && (
                    <>
                        <div className="fields">
                            <input ref={emailRef} placeholder="Email" />
                            <input ref={passwordRef} type="password" placeholder="Password" />
                        </div>
                        <button disabled={loading} onClick={handleSignup}>Sign Up</button>
                        <button disabled={loading} onClick={handleLogin}>Log In</button>
                    </>
                )}
                {currentUser && (
                    <button disabled={loading || !currentUser} onClick={handleLogout}>Log Out</button>
                )}
            </div>
            <div>
                <br />
                <GoogleLogin onSuccess={responseMessage} onError={errorMessage} />
            </div>

            {/* From the first block */}
            <Navbar />
            <Routes>
                <Route exact path='/feed' element={<Feed currentUser={currentUser} />} />
                <Route path='/profile' element={currentUser ? <Profile user={currentUser}/> : <div>Please sign in to view your profile.</div>} />
                <Route path='/posts/:id' element={<WholeUserPost />} />
                <Route path='/posts/create-post' element={<CreateUserPost currentUsername={currentUser} />} />
            </Routes>
        </Router>
    );
}

export default App;