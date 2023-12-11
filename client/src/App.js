import React, { useEffect, useRef, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';


import Axios from 'axios';


import { GoogleLogin } from '@react-oauth/google';
import { signup, login, logout, useAuth } from "./firebase";


import { useDispatch } from 'react-redux';
import { saveUsernameId } from './redux/slices/saveUsernameSlice';


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


   // Dispatch to save uid
   const dispatch = useDispatch();


   async function handleSignup() {
       setLoading(true);
       try {
           const newUser = await signup(emailRef.current.value, passwordRef.current.value);
           const userID = newUser.user.uid;
           const userEmail = newUser.user.email;
           console.log(userID);
           console.log(userEmail);
  
           Axios.post("http://localhost:5000/addUserFromAuthenticator", { uuid: userID, email: userEmail })
               .then(response => {
                   console.log('User added to Firestore:', response.data);
               })
               .catch(error => {
                   console.error('Error adding user to Firestore:', error);
           });
  
       } catch (error) {
           console.log("Signup error:", error);
           alert("Error during signup!");
       } finally {
           setLoading(false);
       }
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
           dispatch(saveUsernameId(""));
       } catch {
           alert("Error!");
       }
       setLoading(false);
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
                       </>
                   )}
               </div>
           </div>
       );
   }


   return (
       <Router>
           <div id="main">
               {/* <div>{currentUser?.email}</div> */}
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
               {/* <div className="logout-container">
                {currentUser && (
                    <button
                        disabled={loading || !currentUser}
                        onClick={handleLogout}
                        className="logout-button"
                    >
                    Log Out
                    </button>
                    )}
            </div> */}


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