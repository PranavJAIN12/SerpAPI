
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import axios from "axios";
import { useEffect } from "react";

const Success = () => {

  const queryParams = new URLSearchParams(location.search);
  const sessionId = queryParams.get("session_id");

  const savePayment = async ()=>{
    const response = await axios({
      method:"POST",
      url:'http://localhost:3000/save-payment',
      data:{session_id:sessionId},
      headers:{
        "Content-Type":"application/json",

      },
    });
    console.log({data: response.data})
  }

  useEffect(()=>{
    if(sessionId){
      savePayment()
    }
  }, [sessionId])
  return (
    <motion.div
      className="min-h-screen flex flex-col items-center justify-center bg-gray-900 text-white"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1 }}
    >
      <motion.div
        className="p-10 bg-gray-800 rounded-lg shadow-lg text-center"
        initial={{ scale: 0.8 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-4xl font-bold mb-4">Payment Successful!</h1>
        <p className="text-xl mb-6">
          Thank you for your payment. You have successfully subscribed to the plan.
        </p>
        <Link to="/home">
          <button className="bg-blue-600 text-white py-2 px-6 rounded-full hover:bg-blue-500 transition duration-300">
            Go to Home
          </button>
        </Link>
      </motion.div>
    </motion.div>
  );
};

export default Success;
