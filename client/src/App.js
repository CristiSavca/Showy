import React, { useEffect, useRef, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Axios from 'axios';

import { GoogleLogin } from '@react-oauth/google';
import { signup, login, logout, useAuth } from "./firebase";

import { useSelector, useDispatch } from 'react-redux';
import { saveUsername, saveUsernameId } from './redux/slices/saveUsernameSlice';

import './App.css';

import Navbar from './components/Navbar';
import Feed from './pages/feed';
import Profile from './pages/profile';
import WholeUserPost from './components/FeedComponents/WholeUserPost';
import CreateUserPost from './components/FeedComponents/CreateUserPost';

function App() {
    const [loading, setLoading] = useState(false);
    const [isSigningUp, setIsSigningUp] = useState(false);
    const currentUser = useAuth();
    const emailRef = useRef();
    const passwordRef = useRef();

    // Handlers from the second block
    const responseMessage = response => console.log(response);
    const errorMessage = error => console.log(error);

    // Used to get displayed username
    const dispatch = useDispatch();
    const userNameId = useSelector((state) => state.saveUsername.usernameId);

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
            dispatch(saveUsername(""));
            dispatch(saveUsernameId(""));
        } catch {
            alert("Error!");
        }
        setLoading(false);
    }

    async function getUsername() {
        await Axios.get("http://localhost:5000/getUsername", {
            params: {
                uid: userNameId
            }
        }).then((response) => {
            dispatch(saveUsername(response.data));
        }).catch((error) => {
            console.log(error);
        });
    }

    function getUser() {
        dispatch(saveUsernameId(currentUser.uid));
    }
    const toggleSignUp = () => setIsSigningUp(!isSigningUp);

    if (!currentUser) {
        return (
            <div id="login-container">
                <div className="login-box">
                    {isSigningUp ? (
                        <>
                            <h1>Create New Account</h1>
                            <div className="fields">
                                <input ref={emailRef} placeholder="Email address" />
                                <input ref={passwordRef} type="password" placeholder="Password" />
                            </div>
                            <button className="signup-btn" disabled={loading} onClick={handleSignup}>Sign Up</button>
                            <button className="switch-btn" onClick={toggleSignUp}>Already have an account? Log in</button>
                        </>
                    ) : (
                        <>
                            <h1>Welcome to Showy!</h1>
                            <div className="fields">
                                <input ref={emailRef} placeholder="Email address" />
                                <input ref={passwordRef} type="password" placeholder="Password" />
                            </div>
                            <button className="login-btn" onClick={handleLogin}>Log In</button>
                            <div className="separator">or</div>
                            <button className="switch-btn" onClick={toggleSignUp}>Create New Account</button>
                            <div className="google-login">
                                <GoogleLogin
                                    onSuccess={responseMessage}
                                     onError={errorMessage}
                                />
                            </div>
                        </>
                    )}
                </div>
            </div>
        );
    }

    return (
        <Router>
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

                {currentUser && getUser()}
            </div>

            <Navbar />
            <Routes>
                <Route exact path='/feed' element={<Feed />} />
                <Route path='/profile' element={currentUser ? <Profile user={currentUser}/> : <div>Please sign in to view your profile.</div>} />
                <Route path='/posts/:id' element={<WholeUserPost />} />
                <Route path='/posts/create-post' element={<CreateUserPost />} />
            </Routes>
        </Router>
    );
}

export default App;