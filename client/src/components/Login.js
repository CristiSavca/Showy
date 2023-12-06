import React, { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { login } from '../firebase';
import './Login.css';

function Login() {
  const emailRef = useRef();
  const passwordRef = useRef();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  async function handleLogin(event) {
    event.preventDefault();
    setLoading(true);
    try {
      await login(emailRef.current.value, passwordRef.current.value);
      navigate('/feed');
    } catch {
      setError('Invalid email or password.');
      setLoading(false);
    }
  }

  return (
    <div className="login-container">
      <div className="login-box">
        <h1 className="login-title">Log In to Showy</h1>
        <form onSubmit={handleLogin} className="login-form">
          <input ref={emailRef} type="email" placeholder="Email" required />
          <input ref={passwordRef} type="password" placeholder="Password" required />
          <button type="submit" disabled={loading}>{loading ? 'Logging in...' : 'Log In'}</button>
          {error && <div className="login-error">{error}</div>}
        </form>
        <div className="signup-prompt">
          Don't have an account? <a href="/signup" className="signup-link">Sign Up</a>
        </div>
      </div>
    </div>
  );
}

export default Login;
