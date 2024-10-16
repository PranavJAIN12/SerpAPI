// import { useState } from "react";
// import axios from "axios";

// const Home = () => {
//   const [searchTerm, setSearchTerm] = useState("");
//   const [result, setResult] = useState([]);
//   const [loading, setLoading] = useState(false);

//   const handleSearch = (e) => {
//     setSearchTerm(e.target.value);
//   };

//   const fetchData = async () => {
//     if (!searchTerm) return;
//     console.log("btn clicked");
//     setLoading(true);

//     try {
//       const response = await axios.get("https://hook.us2.make.com/qfn7qbhmeyfg73pg0ohxrg4xgdtokqhf", {
//         params: {
//           engine: "google",
//           q: searchTerm,
//           api_key: "177e05c2db3e213b4f0f367a6272a253d13972eb9c6eb539bd776d447a5b449d",
//         },
//       });
//       setResult(response.data.immersive_products);
//       // console.log("before", response)
//       console.log(response.data.immersive_products);
//     } catch (error) {

//       console.error(error.message);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="flex h-screen bg-gray-900 text-gray-100 overflow-hidden">
//       <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 opacity-80">
//         <h1 className="text-gray-100 text-center text-4xl font-semibold m-3">
//           SerpAPI GoogleSearch
//         </h1>

//         <div className="flex justify-center mt-8">
//           <input
//             type="text"
//             placeholder="Search here"
//             className="bg-gray-700 text-white placeholder-gray-400 rounded-lg pl-10 pr-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 border"
//             value={searchTerm}
//             onChange={handleSearch}
//           />
//           <button
//             type="button"
//             className="ml-3 text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
//             onClick={fetchData}
//           >
//             Search
//           </button>
//         </div>
//         <div>
//         <table className="w-full min-w-full divide-y divide-gray-700">
//             <thead>
//               <tr>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Category</th>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Source</th>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Title</th>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Rating</th>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Reviews</th>
//                 <th className="px-6 py-3 text-xs font-medium text-gray-400 uppercase tracking-wider text-center">Price</th>
//                 <th className="px-6 py-3 text-xs font-medium text-gray-400 uppercase tracking-wider text-center">Thumbnail</th>
//               </tr>
//             </thead>
//             <tbody className="divide-y divide-gray-700">
//               {result.map((element, index) => (
//                 <tr key={index}>
//                   <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-100">{element.category}</td>
//                   <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">{element.source}</td>
//                   <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">{element.title}</td>
//                   <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">{element.rating}</td>
//                   <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">{element.reviews}</td>
//                   <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">${element.price}</td>
//                   <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
//                     <img src={element.thumbnail} alt={element.title} className="w-20 h-20 object-cover"/>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>

//       </div>
//     </div>
//   );
// };

// export default Home;

//add per month subs based for payment method... and lock some features to get only on payment gateway....

import { useState } from "react";
import axios from "axios";
import { Search } from "lucide-react";
import { motion } from "framer-motion";

const Home = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [result, setResult] = useState([]);
  const [relQues, setRelQues] = useState([]);
  const [loading, setLoading] = useState(false);
  // const [serInf, setSerInf] = useState([]);
  const [relSer, setRelSer] = useState([]);
  const [shopRes, setShopRes] = useState([]);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const fetchData = async () => {
    if (!searchTerm) return;
    console.log("btn clicked");
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
      // setSerInf(response.data.search_information.total_results);
      setRelQues(response.data.related_questions);
      console.log(response)
      console.log(response.data);
    } catch (error) {
      console.error(error);
      console.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (

    <motion.div className="flex h-screen bg-gray-900 text-gray-100 overflow-auto w-full" initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 1 }}>
      <div>
        <h1 className="text-gray-100 text-center text-4xl font-semibold m-3">
          Welcome to SerpAPI Product Search
        </h1>
        <h1 className="text-center m-4 mt-8 w-65 pl-5 pr-5 text-gray-300">
          Discover product details instantly using SerpAPI. This tool allows you
          to search and explore data fetched directly from Google search
          results. Simply type a keyword into the search bar and retrieve
          relevant product information, including categories, ratings, prices,
          and more.
          <br />
        </h1>

        <div className="flex justify-center mt-8">
          <input
            type="text"
            placeholder="Search here"
            className="bg-gray-700 text-white placeholder-gray-400 rounded-lg pl-10 pr-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 border"
            value={searchTerm}
            onChange={handleSearch}
          />
          <motion.button whileHover={{ scale: 1.1 }}
            type="button"
            className="ml-3 text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            onClick={fetchData}
          >
            Search
          </motion.button>
        </div>
        <div>
          <p>About results</p>
        </div>

        <motion.div initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1 }}>
          <div className="mt-8">
            {result.length > 0 && (
              <div className="space-y-4">
                <h1 className="text-center text-3xl m-4 font-semibold text-gray-100">
                  Organic Results
                </h1>

                {result.map((item, index) => (
                  <div
                    key={index}
                    className="bg-gray-900 border-b border-gray-600 py-4 px-6"
                  >
                    <div className="flex gap-4">
                      <img
                        src={item.favicon}
                        alt="image"
                        className="rounded-full h-12 justify-center align-middle"
                      />

                      <a
                        href={item.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 text-xl hover:underline font-medium"
                      >
                        {item.title}
                      </a>
                    </div>

                    <p className="text-green-700 text-sm mt-1">
                      {item.displayed_link || item.link}
                    </p>

                    <p className="text-gray-200 text-base mt-2">
                      {item.snippet}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="mt-8">
            {relQues.length > 0 && (
              <>
                <h1 className="text-center text-3xl m-4 font-semibold text-gray-100">
                  Related Questions
                </h1>
                {relQues.map((item, index) => (
                  <div
                    key={index}
                    className="bg-gray-800 rounded-lg p-4 shadow-lg"
                  >
                    <p className="text-gray-200 mt-2 text-lg font-medium">
                      {item.question}
                    </p>
                    <a
                      href={item.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-500 text-lg font-semibold hover:underline"
                    >
                      {item.title}
                    </a>

                    <p className="text-gray-400 text-sm">
                      {item.displayed_link || item.link}
                    </p>
                  </div>
                ))}
              </>
            )}
          </div>

          <div className="mt-8">
            {shopRes?.length > 0 && (
              <>
                <h1 className="text-center text-3xl m-4 font-semibold text-gray-100">
                  Shopping Results
                </h1>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                  {shopRes.map((item, index) => (
                    <div
                      key={index}
                      className="bg-gray-900 hover:bg-gray-800 rounded-lg p-4 shadow-lg transition-colors duration-300"
                    >
                      <div className="flex flex-col items-center w-80 align-middle text-center justify-center">
                        <img
                          src={item.thumbnail}
                          alt="Product image"
                          className="rounded-lg w-full h-80 object-cover"
                        />
                        <p className="text-lg font-semibold text-gray-200 mt-4">
                          {item.title.slice(0, 40)}...
                        </p>
                        <p className="text-xl font-bold text-green-500 mt-2">
                          {item.price}
                        </p>
                        <p className="text-sm text-gray-400 mt-1">
                          {item.source}
                        </p>
                        <a
                          href={item.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="mt-4 text-blue-500 hover:text-blue-300 font-semibold underline"
                        >
                          View Product
                        </a>
                        <button
                          type="button"
                          className=" mt-4 text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
                        >
                          Buy Now
                        </button>{" "}
                      </div>
                    </div>
                  ))}
                </div>
              </>
            )}
          </div>

          <div className="mt-8">
            {relSer.length > 0 && (
              <>
                <h1 className="text-center text-3xl m-4 font-semibold text-gray-100">
                  Related Searches
                </h1>

                <div className="flex justify-center  gap-3">
                  {relSer.map((item, index) => (
                    <div
                      key={index}
                      className="bg-gray-900 flex hover:bg-gray-800 rounded-lg py-3 px-4 shadow-lg transition-colors duration-300"
                    >
                      <Search className="text-gray-500 h-5 w-5 pr-1" />
                      <a
                        href={item.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-semibold text-gray-300 hover:text-blue-500 hover:underline"
                      >
                        {item.query}
                      </a>
                    </div>
                  ))}
                </div>
              </>
            )}
          </div>

          <div className="flex justify-center mt-4">
            {loading && <p>Loading...</p>}
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default Home;
