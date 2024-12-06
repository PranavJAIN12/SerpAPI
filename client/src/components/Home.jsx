//add per month subs based for payment method... and lock some features to get only on payment gateway....

import { useState, useEffect } from "react";
import axios from "axios";
import { Search, Link as LinkIcon, Rocket, Mic } from "lucide-react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const Home = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [result, setResult] = useState([]);
  // eslint-disable-next-line no-unused-vars
  const [relQues, setRelQues] = useState([]);
  const [loading, setLoading] = useState(false);
  const [relSer, setRelSer] = useState([]);
  const [shopRes, setShopRes] = useState([]);
  const [transcript, setTranscript] = useState("");
  const [isRecognizing, setIsRecognizing] = useState(false);
  let recognition;

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const fetchData = async () => {
    if (!searchTerm) return;
    setLoading(true);

    try {
      const response = await axios.get(
        "https://hook.us2.make.com/qfn7qbhmeyfg73pg0ohxrg4xgdtokqhf",
        {
          params: {
            engine: "google",
            location: "India",
            q: searchTerm,
            api_key:
              "177e05c2db3e213b4f0f367a6272a253d13972eb9c6eb539bd776d447a5b449d",
          },
        }
      );
      setShopRes(response.data.shopping_results);
      setRelSer(response.data.related_searches);
      setResult(response.data.organic_results || []);
      setRelQues(response.data.related_questions);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };
  const handleProdPayment = async (productDetails) => {
    try {
      const response = await axios.post(
        "http://localhost:3000/prod-payment",
        productDetails
      );
      const { session } = response.data;

      if (session && session.url) {
        window.location.href = session.url;
      }
    } catch (error) {
      console.error("Error initiating payment:", error);
    }
  };

  useEffect(() => {
    if (window.SpeechRecognition || window.webkitSpeechRecognition) {
      // eslint-disable-next-line react-hooks/exhaustive-deps
      recognition = new (window.SpeechRecognition ||
        window.webkitSpeechRecognition)();
      recognition.lang = "en-US";

      recognition.onresult = (event) => {
        const newTranscript = event.results[0][0].transcript;
        setTranscript(newTranscript); 
        console.log("Transcript:", newTranscript);
        recognition.stop(); 
        setIsRecognizing(false); 
      };

      recognition.onerror = (event) => {
        console.error("Speech Recognition Error:", event.error);
        recognition.stop(); 
        setIsRecognizing(false);
      };
    } else {
      console.warn("Speech Recognition API is not supported in this browser.");
    }
  }, []); 
  useEffect(()=>{
    if (!isRecognizing && transcript) {
      setSearchTerm(transcript);
    }
  }, [isRecognizing, transcript])

  const handleMic = () => {
    if (recognition) {
      if (!isRecognizing) {
        recognition.start();
        setIsRecognizing(true); 
        console.log("Recognition started");
      } else {
        console.log("Recognition is already active");
      }
    } else {
      alert("Speech Recognition is not supported in this browser.");
    }
  };

  return (
    <div className="bg-dark-900 text-gray-100 min-h-screen font-inter antialiased">
      <nav className="relative z-10 px-6 py-4 flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <Rocket className="text-brand-400 w-8 h-8" />
          <Link to="/" className="text-2xl font-black text-brand-300">
            IntelliSearch
          </Link>
        </div>
      </nav>
      <div className="container mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto"
        >
          <header className="text-center mb-12">
            <h1 className="text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-600 mb-4">
              SerpAPI Product Explorer
            </h1>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              Discover comprehensive product insights with our advanced search
              tool. Instantly access detailed information directly from Google
              search results.
            </p>
          </header>
          

          <div className="flex items-center mb-8">
            <div className="relative w-full">
              <input
                type="text"
                placeholder="Search products, services, or topics..."
                className="w-full pl-12 pr-4 py-3 bg-dark-800 border border-dark-700 rounded-xl text-white placeholder-gray-500 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                value = {isRecognizing ? transcript : searchTerm}
                // value={transcript}
                onChange={handleSearch}
              />
             
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" />
              <Mic
                className="absolute right-4 top-1/4 text-gray-500 cursor-pointer"
                onClick={handleMic}
              />
            </div>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="ml-4 px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-bold hover:from-blue-700 hover:to-purple-700 transition-all duration-300"
              onClick={fetchData}
            >
              Search
            </motion.button>
          </div>

          {loading && (
            <div className="flex justify-center items-center my-8">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
            </div>
          )}

          {/* Organic Results */}
          {result.length > 0 && (
            <section className="mb-12">
              <h2 className="text-2xl font-bold mb-6 text-center text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">
                Organic Search Results
              </h2>
              <div className="space-y-6">
                {result.map((item, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="bg-dark-800 rounded-xl p-6 border border-dark-700 hover:shadow-lg transition-all duration-300"
                  >
                    <div className="flex items-center mb-3">
                      {item.favicon && (
                        <img
                          src={item.favicon}
                          alt="favicon"
                          className="w-8 h-8 mr-4 rounded-full"
                        />
                      )}
                      <a
                        href={item.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xl font-bold text-blue-400 hover:text-blue-300 transition-colors"
                      >
                        {item.title}
                      </a>
                    </div>
                    <p className="text-green-500 text-sm mb-2">
                      {item.displayed_link || item.link}
                    </p>
                    <p className="text-gray-400">{item.snippet}</p>
                  </motion.div>
                ))}
              </div>
            </section>
          )}

          {/* Shopping Results */}
          {shopRes?.length > 0 && (
            <section className="mb-12">
              <h2 className="text-2xl font-bold mb-6 text-center text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">
                Shopping Results
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                {shopRes.map((item, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: index * 0.1 }}
                    className="bg-dark-800 rounded-xl overflow-hidden border border-dark-700 hover:shadow-xl transition-all duration-300"
                  >
                    <img
                      src={item.thumbnail}
                      alt="Product"
                      className="w-full h-64 object-cover"
                    />
                    <div className="p-5">
                      <h3 className="font-bold text-lg mb-2 text-white truncate">
                        {item.title}
                      </h3>
                      <p className="text-green-500 text-xl font-bold mb-2">
                        {item.price}
                      </p>
                      <p className="text-gray-400 text-sm mb-4">
                        {item.source}
                      </p>
                      <div className="flex space-x-3">
                        <a
                          href={item.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex-1 text-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                        >
                          View Details
                        </a>
                        <button
                          className="flex-1 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
                          onClick={() =>
                            handleProdPayment({
                              title: item.title,
                              price: item.price,
                            })
                          }
                        >
                          Buy Now
                        </button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </section>
          )}

          {/* Related Searches */}
          {relSer.length > 0 && (
            <section className="mb-12">
              <h2 className="text-2xl font-bold mb-6 text-center text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">
                Related Searches
              </h2>
              <div className="flex flex-wrap justify-center gap-3">
                {relSer.map((item, index) => (
                  <motion.a
                    key={index}
                    href={item.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-center bg-dark-800 px-4 py-2 rounded-full text-gray-300 hover:bg-dark-700 hover:text-blue-400 transition-all"
                  >
                    <LinkIcon className="mr-2 w-4 h-4" />
                    {item.query}
                  </motion.a>
                ))}
              </div>
            </section>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default Home;
