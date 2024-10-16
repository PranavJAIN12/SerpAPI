/* eslint-disable no-unused-vars */
import  { useState } from 'react';
import { supabase } from './client';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError(null);
  
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
  
    if (error) {
      setError(error.message);
    } else {
      window.location.href = '/'; 
    }
  };
  

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white">
      <form onSubmit={handleLogin} className="bg-gray-800 p-8 rounded-lg">
        <h2 className="text-3xl mb-6">Login</h2>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="bg-gray-700 text-white w-full mb-4 p-2 rounded"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="bg-gray-700 text-white w-full mb-4 p-2 rounded"
        />
        <button type="submit" className="bg-blue-600 text-white py-2 px-4 rounded-full">
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
