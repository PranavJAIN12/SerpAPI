/* eslint-disable no-unused-vars */
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";

import axios from "axios";
import { useEffect, useState } from "react";
import { supabase } from "../pages/client";



  


const Landing = () => {

  const [loggedIn, setLoggedIn] = useState(false);
  const [username, setUsername] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const checkSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      console.log("Current session:", session);

      if (session) {
        setLoggedIn(true);
        setUsername(session.user.email); // Or any property that holds the username
        console.log("User is logged in:", session.user);
      } else {
        console.log("No active session found.");
      }
    };

    checkSession();
  }, []);

  const handlePayment = async () => {
    try {
      const { data: { session } } = await supabase.auth.getSession(); 
      const userEmail = session.user.email; 
  
      const response = await axios.post('http://localhost:3000/create-subs', {
        plan_name: '3-mon', 
        duration: 'month',
        email: userEmail // Pass user's email to backend
      });
      
      console.log({ data: response.data });
      const sessionData = response.data.session;
      window.location.href = sessionData.url; // Redirect to Stripe checkout
    } catch (error) {
      console.error('Error creating subscription', error);
    }
  };

  const handleAnnualPayment = async () => {
    try {
      const { data: { session } } = await supabase.auth.getSession(); 
      const userEmail = session.user.email; // Get the logged-in user's email
  
      const response = await axios.post('http://localhost:3000/create-subs', {
        plan_name: 'annual',
        duration: 'year',
        email: userEmail // Pass user's email to backend
      });
      
      console.log({ data: response.data });
      const sessionData = response.data.session;
      window.location.href = sessionData.url; // Redirect to Stripe checkout
    } catch (error) {
      console.error('Error creating subscription', error);
    }
  };
  
  return (
    <motion.div
      className="w-full"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1 }}
    >
      <div className="min-h-screen bg-gray-900 text-white flex flex-col">
        {/* Hero Section */}
        <motion.header
          className="bg-blue-600 py-16"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="container mx-auto text-center">
            <h1 className="text-5xl font-bold mb-4">Welcome to AI Product Search</h1>
            <p className="text-xl mb-8">
              Discover and compare products instantly using our powerful AI.
            </p>
           
            {loggedIn ? (
  <p>Welcome, {username}!</p> // Show welcome message
) : (
  <Link to="/login">
    <motion.button className="ml-3 bg-white text-blue-600 py-2 px-6 rounded-full hover:bg-gray-200 transition duration-300" whileHover={{ scale: 1.1 }}>
      Login to Your Account
    </motion.button>
  </Link>
)}
          </div>
        </motion.header>

       
        <motion.section
          className="py-20 bg-gray-800"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.8 }}
        >
          <div className="container mx-auto">
            <h2 className="text-4xl font-bold text-center mb-10">Features of the App</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              <motion.div
                className="p-6 bg-gray-700 rounded-lg text-center"
                initial={{ scale: 0.9 }}
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.5 }}
              >
                <h3 className="text-2xl font-semibold mb-4">Product Search</h3>
                <p>Search products with detailed results including pricing, ratings, and more.</p>
              </motion.div>
              <motion.div
                className="p-6 bg-gray-700 rounded-lg text-center"
                initial={{ scale: 0.9 }}
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.5 }}
              >
                <h3 className="text-2xl font-semibold mb-4">Related Questions</h3>
                <p>Get AI-generated questions and answers for the products you’re interested in.</p>
              </motion.div>
              <motion.div
                className="p-6 bg-gray-700 rounded-lg text-center"
                initial={{ scale: 0.9 }}
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.5 }}
              >
                <h3 className="text-2xl font-semibold mb-4">Shopping Results</h3>
                <p>Explore real-time shopping results fetched directly from Google.</p>
              </motion.div>
            </div>
          </div>
        </motion.section>

        {/* Payment Cards Section */}
        <motion.section
          className="bg-gray-900 py-16"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.8 }}
        >
          <div className="container mx-auto text-center">
            <h2 className="text-3xl font-semibold mb-8">Choose Your Plan</h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {/* Free Plan */}
              <motion.div
                className="p-6 bg-gray-800 rounded-lg text-center"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.5 }}
              >
                <h3 className="text-2xl font-semibold mb-4">Free</h3>
                <p className="text-xl mb-6">Get started for free with limited features.</p>
                <p className="text-4xl font-bold mb-4">$0</p>
                <Link to="/home">
                  <button className="bg-blue-600 text-white py-2 px-6 rounded-full hover:bg-blue-500 transition duration-300">
                    Choose Free
                  </button>
                </Link>
              </motion.div>

              {/* 3-Month Plan */}
              <motion.div
                className="p-6 bg-gray-800 rounded-lg text-center"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.5 }}
              >
                <h3 className="text-2xl font-semibold mb-4">3 Months</h3>
                <p className="text-xl mb-6">Access premium features for 3 months.</p>
                <p className="text-4xl font-bold mb-4">$29</p>
                <button className="bg-blue-600 text-white py-2 px-6 rounded-full hover:bg-blue-500 transition duration-300" onClick={handlePayment}>
                    Choose 3mon
                  </button>
              </motion.div>

              {/* Annual Plan */}
              <motion.div
                className="p-6 bg-gray-800 rounded-lg text-center"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.5 }}
              >
                <h3 className="text-2xl font-semibold mb-4">Annual</h3>
                <p className="text-xl mb-6">Unlock full access for a whole year.</p>
                <p className="text-4xl font-bold mb-4">$99</p>
                <button className="bg-blue-600 text-white py-2 px-6 rounded-full hover:bg-blue-500 transition duration-300" onClick={handleAnnualPayment}>
                  Choose Annual
                </button>
              </motion.div>
            </div>
          </div>
        </motion.section>

        {/* Footer */}
        <motion.footer
          className="bg-gray-800 py-6"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="container mx-auto text-center">
            <p className="text-gray-400">&copy; 2024 AI Product Search. All rights reserved.</p>
          </div>
        </motion.footer>
      </div>
    </motion.div>
  );
};

export default Landing;
