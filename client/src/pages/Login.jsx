/* eslint-disable no-unused-vars */
import { useState } from 'react';
import { supabase } from './client';
import { Link, useNavigate } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [signUpMail, setSignUpMail] = useState('')
  const [signUpPass, setSignUpPass] = useState('')
  const [error, setError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false); // Modal state for SignUp
  const [message, setMessage] = useState("");

  const navigate = useNavigate();

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

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      const { data, error } = await supabase.auth.signUp({
        email: signUpMail,
        password: signUpPass,
        options: {
          data: { full_name: username }, 
        },
      });
  
      if (error) {
        setMessage(`Error: ${error.message}`);
      } else {
        console.log("Check your email for the verification link.");
        navigate("/login"); 
      }
    } catch (error) {
      console.error(error);
    }
  };
  

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen); // Toggle SignUp modal visibility
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
        <p className="mt-3 text-gray-400">
          No Account?{' '}
          <span onClick={toggleModal} className="text-blue-400 cursor-pointer">
            Create One
          </span>
        </p>
      </form>

      {/* SignUp Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-gray-800 p-8 rounded-lg">
            <h2 className="text-3xl mb-6">Sign Up</h2>
            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="bg-gray-700 text-white w-full mb-4 p-2 rounded"
            />
            <input
              type="email"
              placeholder="Email"
              value={signUpMail}
              onChange={(e) => setSignUpMail(e.target.value)}
              className="bg-gray-700 text-white w-full mb-4 p-2 rounded"
            />
            <input
              type="password"
              placeholder="Password"
              value={signUpPass}
              onChange={(e) => setSignUpPass(e.target.value)}
              className="bg-gray-700 text-white w-full mb-4 p-2 rounded"
            />
            <button className="bg-blue-600 text-white py-2 px-4 rounded-full" onClick={handleSignup}>
              Sign Up
            </button>
            <button
              onClick={toggleModal}
              className="mt-4 ml-5 text-gray-400 hover:text-white"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Login;
