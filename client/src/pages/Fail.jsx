
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const Fail = () => {
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
        <h1 className="text-4xl font-bold mb-4">Payment Failed!</h1>
        <p className="text-xl mb-6">
          Unfortunately, your payment could not be processed. Please try again later or use a different payment method.
        </p>
        <Link to="/">
          <button className="bg-red-600 text-white py-2 px-6 rounded-full hover:bg-red-500 transition duration-300">
            Try Again
          </button>
        </Link>
        <Link to="/">
          <button className="bg-blue-600 text-white py-2 px-6 rounded-full hover:bg-blue-500 transition duration-300 ml-4">
            Go to Home
          </button>
        </Link>
      </motion.div>
    </motion.div>
  );
};

export default Fail;
