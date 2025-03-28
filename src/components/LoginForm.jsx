import React, { useState } from 'react';
import { authAPI } from './api';

const LoginForm = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Simple validation
    if (!username || !password) {
      setError('Please enter both username and password.');
      return;
    }
    
    try {
      setLoading(true);
      setError('');
      
      // Call the real API for authentication
      const user = await authAPI.login(username, password);
      
      // Map the backend roles to frontend roles if needed
      const role = user.role.toLowerCase();
      onLogin({ 
        id: user.id,
        role: role, 
        name: user.name 
      });
      
    } catch (error) {
      console.error('Login error:', error);
      setError(
        error.response?.status === 401
          ? 'Invalid username or password.'
          : 'An error occurred during login. Please try again.'
      );
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-md">
        <div className="text-center mb-8">
          <div className="font-bold text-3xl mb-2">AGI</div>
          <div className="text-lg font-bold">GREENPAC</div>
          <div className="w-24 h-1 bg-black mx-auto mt-2 rounded-full"></div>
          <h2 className="mt-6 text-xl font-semibold">Inspection System Login</h2>
        </div>
        
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            {error}
          </div>
        )}
        
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
              Username
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring focus:border-blue-500"
              id="username"
              type="text"
              placeholder="Enter your username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              disabled={loading}
            />
          </div>
          
          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
              Password
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring focus:border-blue-500"
              id="password"
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              disabled={loading}
            />
          </div>
          
          <div>
            <button
              className={`w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline ${
                loading ? 'opacity-70 cursor-not-allowed' : ''
              }`}
              type="submit"
              disabled={loading}
            >
              {loading ? 'Signing In...' : 'Sign In'}
            </button>
          </div>
        </form>
        
        <div className="mt-8 text-center text-sm text-gray-600">
          <p>For demo purposes:</p>
          <p>Operator login: username "operator" / password "operator123"</p>
          <p>QA login: username "qa" / password "qa123"</p>
          <p>AVP login: username "avp" / password "avp123"</p>
          <p>Master login: username "master" / password "master123"</p>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;