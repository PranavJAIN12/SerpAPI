import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";
import { supabase } from "../pages/client";
import { 
  Search, 
  Zap, 
  Award,  
  CheckCircle, 
  Rocket 
} from "lucide-react";

const Landing = () => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [username, setUsername] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const checkSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (session) {
        setLoggedIn(true);
        setUsername(session.user.email);
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
        email: userEmail
      });
      
      window.location.href = response.data.session.url;
    } catch (error) {
      console.error('Error creating subscription', error);
    }
  };

  const handleAnnualPayment = async () => {
    try {
      const { data: { session } } = await supabase.auth.getSession(); 
      const userEmail = session.user.email;
  
      const response = await axios.post('http://localhost:3000/create-subs', {
        plan_name: 'annual',
        duration: 'year',
        email: userEmail
      });
      
      window.location.href = response.data.session.url;
    } catch (error) {
      console.error('Error creating subscription', error);
    }
  };
  
  return (
    <div className="bg-dark-900 text-dark-50 min-h-screen font-inter text-md">
      {/* Gradient Background Overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-dark-900 via-dark-800 to-dark-700 opacity-75 z-0"></div>

      {/* Navigation */}
      <nav className="relative z-10 px-6 py-4 flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <Rocket className="text-brand-400 w-8 h-8" />
          <h1 className="text-2xl font-black text-brand-300">IntelliSearch</h1>
        </div>
        
        {loggedIn ? (
          <div className="flex items-center space-x-4">
            <span className="text-dark-200">Welcome, {username}</span>
            <Link 
              to="/home" 
              className="px-4 py-2 bg-brand-600 text-white rounded-lg hover:bg-brand-700 transition-colors"
            >
              Go to Dashboard
            </Link>
          </div>
        ) : (
          <div className="flex items-center space-x-4">
            <Link 
              to="/login" 
              className="px-4 py-2 border border-dark-700 text-dark-200 rounded-lg hover:bg-dark-700 transition-colors"
            >
              Login
            </Link>
            <Link 
              to="/login" 
              className="px-4 py-2 bg-brand-600 text-white rounded-lg hover:bg-brand-700 transition-colors"
            >
              Sign Up
            </Link>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <motion.header 
        className="relative z-10 container mx-auto px-6 pt-16 text-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <h1 className="text-5xl md:text-6xl font-black mb-6 text-transparent bg-clip-text bg-gradient-to-r from-brand-300 to-brand-600">
          AI-Powered Product Discovery
        </h1>
        <p className="text-xl md:text-2xl max-w-3xl mx-auto text-dark-200 mb-10">
          Revolutionize your shopping experience with intelligent search and comprehensive product insights.
        </p>
        
        <div className="flex justify-center space-x-4">
          <Link 
            to="/home" 
            className="flex items-center px-6 py-3 bg-brand-600 text-white rounded-lg hover:bg-brand-700 transition-all group"
          >
            <Search className="mr-2 group-hover:animate-pulse" />
            Start Searching
          </Link>
          {!loggedIn && (
            <Link 
              to="/signup" 
              className="flex items-center px-6 py-3 border border-dark-700 text-dark-200 rounded-lg hover:bg-dark-700 transition-colors"
            >
              <CheckCircle className="mr-2" />
              Create Account
            </Link>
          )}
        </div>
      </motion.header>

      {/* Features Section */}
      <motion.section 
        className="relative z-10 container mx-auto px-6 py-16"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.8 }}
      >
        <h2 className="text-4xl font-bold text-center mb-12 text-transparent bg-clip-text bg-gradient-to-r from-brand-400 to-brand-600">
          Powerful Features
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { 
              icon: Search, 
              title: "Advanced Search", 
              description: "Comprehensive product search with detailed insights and comparisons."
            },
            { 
              icon: Zap, 
              title: "AI-Powered Results", 
              description: "Intelligent analysis and recommendations powered by cutting-edge AI."
            },
            { 
              icon: Award, 
              title: "Verified Information", 
              description: "Curated and verified product details from multiple trusted sources."
            }
          ].map((feature, index) => (
            <motion.div
              key={index}
              className="bg-dark-800 border border-dark-700 rounded-xl p-6 text-center hover:shadow-lg transition-all"
              whileHover={{ scale: 1.05 }}
            >
              <div className="flex justify-center mb-4">
                <feature.icon className="w-12 h-12 text-brand-500" />
              </div>
              <h3 className="text-xl font-bold mb-3 text-brand-300">{feature.title}</h3>
              <p className="text-dark-200">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* Pricing Section */}
      <motion.section 
        className="relative z-10 container mx-auto px-6 py-16"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6, duration: 0.8 }}
      >
        <h2 className="text-4xl font-bold text-center mb-12 text-transparent bg-clip-text bg-gradient-to-r from-brand-400 to-brand-600">
          Choose Your Plan
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { 
              title: "Free", 
              price: "$0", 
              description: "Get started with basic features", 
              action: () => navigate("/home"),
              features: ["Limited Searches", "Basic Results", "Community Support"]
            },
            { 
              title: "3 Months", 
              price: "$29", 
              description: "Premium access for a quarter", 
              action: handlePayment,
              features: ["Unlimited Searches", "Advanced Insights", "Priority Support"]
            },
            { 
              title: "Annual", 
              price: "$99", 
              description: "Full year of unlimited access", 
              action: handleAnnualPayment,
              features: ["All Premium Features", "Unlimited Searches", "Exclusive Updates"]
            }
          ].map((plan, index) => (
            <motion.div
              key={index}
              className="bg-dark-800 border border-dark-700 rounded-xl p-6 text-center"
              whileHover={{ scale: 1.05 }}
            >
              <h3 className="text-2xl font-bold mb-3 text-brand-400">{plan.title}</h3>
              <p className="text-dark-200 mb-4">{plan.description}</p>
              <div className="text-4xl font-black mb-6 text-transparent bg-clip-text bg-gradient-to-r from-brand-300 to-brand-600">
                {plan.price}
              </div>
              <ul className="mb-6 space-y-2 text-dark-200">
                {plan.features.map((feature, idx) => (
                  <li key={idx} className="flex items-center justify-center">
                    <CheckCircle className="w-4 h-4 mr-2 text-brand-500" />
                    {feature}
                  </li>
                ))}
              </ul>
              <button 
                onClick={plan.action}
                className="w-full py-3 bg-brand-600 text-white rounded-lg hover:bg-brand-700 transition-colors"
              >
                Choose {plan.title}
              </button>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* Footer */}
      <footer className="relative z-10 bg-dark-800 py-8 mt-16">
        <div className="container mx-auto px-6 text-center">
          <p className="text-dark-300">&copy; 2024 ProductAI. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Landing;