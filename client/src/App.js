import React, { useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import './App.css';

import Navbar from './components/Navbar';
import Feed from './pages/feed';
import Profile from './pages/profile';
import SignUp from './components/SignUp';
import Login from './components/Login';

import {useAuth } from "./firebase";

function App() {
    const [loading, setLoading] = useState(false);
    const currentUser = useAuth();

    return (
        <>
            <Navbar />
            <Routes>
                <Route index element={<Login loading={loading} setLoading={setLoading} />} />
                <Route path='/signup' element={<SignUp loading={loading} setLoading={setLoading} />} />
                <Route path='/login' element={<Login loading={loading} setLoading={setLoading} />} />
                <Route path='/feed' element={currentUser ? <Feed /> : <Navigate to="/login" />} />
                <Route path='/profile' element={currentUser ? <Profile /> : <Navigate to="/login" />} />
            </Routes>
        </>
    );
}

export default App;
