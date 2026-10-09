import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext.jsx';
import './AdminLogin.css';

const AdminLogin = ({ onLogin }) => {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { adminLogin } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    // Simulate async login
    await new Promise(resolve => setTimeout(resolve, 500));

    const success = adminLogin(password);
    
    if (success) {
      onLogin();
      setPassword('');
    } else {
      setError('Incorrect password. Please try again.');
    }
    setIsLoading(false);
  };

  return (
    <div className="admin-login-overlay">
      <div className="admin-login-modal">
        <div className="admin-login-icon">🔐</div>
        <h2>Admin Access</h2>
        <p>Enter the admin password to continue.</p>
        
        <form onSubmit={handleSubmit} className="admin-login-form">
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter admin password"
            required
            disabled={isLoading}
            autoFocus
          />
          {error && <div className="admin-login-error">{error}</div>}
          <button 
            type="submit" 
            className="btn-primary login-btn"
            disabled={isLoading}
          >
            {isLoading ? 'Checking...' : '🔓 Unlock Admin Panel'}
          </button>
        </form>
        
        <div className="admin-login-footer">
          <a href="/" className="back-to-site">← Back to Site</a>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;