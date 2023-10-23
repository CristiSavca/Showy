import React, { useRef, useState } from 'react';
import './App.css';
import Navbar from './components/Navbar';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Feed from './pages/feed';
import Profile from './pages/profile';
import { GoogleLogin } from '@react-oauth/google';
import { signup, login, logout, useAuth } from "./firebase";

function App() {
    const [loading, setLoading] = useState(false);
    const currentUser = useAuth();

    const emailRef = useRef();
    const passwordRef = useRef();

    const responseMessage = response => console.log(response);
    const errorMessage = error => console.log(error);

    // Signup Handler
    async function handleSignup() {
        setLoading(true);
        try {
            await signup(emailRef.current.value, passwordRef.current.value);
        } catch {
            alert("Error!");
        }
        setLoading(false);
    }

    // Login Handler
    async function handleLogin() {
        setLoading(true);
        try {
            await login(emailRef.current.value, passwordRef.current.value);
        } catch {
            alert("Error!");
        }
        setLoading(false);
    }

    // Logout Handler
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
            <div id="main">
                {/* User Status */}
                <div>Currently logged in as: {currentUser?.email}</div>

                {/* Authentication Actions for Unauthenticated Users */}
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

                {/* Logout Action for Authenticated Users */}
                {currentUser && (
                    <button disabled={loading || !currentUser} onClick={handleLogout}>Log Out</button>
                )}
            </div>

            {/* Google Login */}
            <div>
                <br />
                <GoogleLogin onSuccess={responseMessage} onError={errorMessage} />
            </div>

            {/* Navigation */}
            <Navbar />

            {/* Page Content */}
            <Routes>
                <Route exact path='/feed' element={<Feed />} />
                <Route path='/profile' element={currentUser ? <Profile /> : <div>Please sign in to view your profile.</div>} />
            </Routes>
        </Router>
    );
}

export default App;