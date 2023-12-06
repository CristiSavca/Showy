import React, { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { signup } from '../firebase';
import './SignUp.css';

function SignUp() {
    const emailRef = useRef();
    const passwordRef = useRef();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    async function handleSignup(event) {
        event.preventDefault();
        setLoading(true);
        try {
            await signup(emailRef.current.value, passwordRef.current.value);
            navigate('/login'); 
        } catch {
            setError('Failed to create an account. Please try again.');
            setLoading(false);
        }
    }

    return (
        <div className="signup-container">
            <div className="signup-box">
                <h1 className="signup-title">Create Account</h1>
                <form onSubmit={handleSignup} className="signup-form">
                    <input ref={emailRef} type="email" placeholder="Email" required />
                    <input ref={passwordRef} type="password" placeholder="Password" required />
                    <button type="submit" disabled={loading}>{loading ? 'Signing up...' : 'Sign Up'}</button>
                    {error && <div className="signup-error">{error}</div>}
                </form>
            </div>
        </div>
    );
}

export default SignUp;
