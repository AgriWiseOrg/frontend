import React, { useState, useEffect } from 'react'; // Import React and hooks
import { Bell, Calendar, ArrowLeft, ExternalLink, Loader2 } from 'lucide-react'; // Import icons
import { useNavigate } from 'react-router-dom'; // For page navigation
import axios from 'axios'; // For API calls

const LatestUpdates = () => { // Functional component
  const navigate = useNavigate(); // Hook to navigate between routes
  const [updates, setUpdates] = useState([]); // State to store updates data
  const [loading, setLoading] = useState(true); // State to track loading status

  useEffect(() => { // USEEFFECT IS USED TO FETCH UPDATES FROM THE BACKEND WHEN THE PAGE LOADS.
    const fetchUpdates = async () => { // Async function to fetch data
      try {
        const res = await axios.get('http://localhost:5001/api/latest-updates'); // API call
        setUpdates(Array.isArray(res.data) ? res.data : []); // Ensure response is array
      } catch (err) { 
        console.error("Error fetching updates"); // Log error if API fails
      }
      finally { 
        setLoading(false); // Stop loading spinner after API call
      }
    };
    fetchUpdates(); // Call function
  }, []); // Empty dependency → runs only once

  return ( // JSX UI starts here
    <div className="min-h-screen bg-gray-50 p-6"> {/* Full screen container */}
      <button 
        onClick={() => navigate('/govt-schemes')} // Navigate back
        className="flex items-center gap-2 mb-8 text-orange-600 font-bold"
      >
        <ArrowLeft size={20} /> {/* Back icon */}
        Back to Hub
      </button>

      <div className="max-w-2xl mx-auto"> {/* Center content */}
        <h1 className="text-3xl font-extrabold text-gray-900 mb-2 flex items-center gap-3">
          <Bell className="text-orange-500" /> {/* Title icon */}
          Latest Updates
        </h1>
        <p className="text-gray-500 mb-8">
          Stay informed about deadlines and new opportunities.
        </p>

        <div className="space-y-4"> {/* Space between cards */}
          {loading ? ( // If loading true
            <div className="text-center p-10">
              <Loader2 className="animate-spin mx-auto text-orange-500" /> {/* Spinner */}
            </div>
          ) : (
            updates.map((item) => ( // Loop through updates array
              <div 
                key={item._id} // Unique key for React rendering
                className="bg-white p-6 rounded-3xl shadow-sm border-l-8 border-orange-500 hover:shadow-md transition-shadow"
              >
                <div className="flex justify-between items-start mb-2">
                  <span className="text-xs font-black uppercase px-2 py-1 bg-orange-100 text-orange-700 rounded-lg">
                    {item.tag} {/* Category tag */}
                  </span>
                  <span className="text-sm text-gray-400 flex items-center gap-1">
                    <Calendar size={14} /> {/* Date icon */}
                    {item.date 
                      ? new Date(item.date).toLocaleDateString() // Format date
                      : 'N/A'} {/* If no date */}
                  </span>
                </div>

                <h3 className="text-xl font-bold text-gray-800 mb-2">
                  {item.title} {/* Update title */}
                </h3>

                <p className="text-gray-600 mb-4">
                  {item.desc} {/* Update description */}
                </p>

                <button className="text-orange-600 font-bold flex items-center gap-1 hover:underline">
                  Read More 
                  <ExternalLink size={16} /> {/* External link icon */}
                </button>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default LatestUpdates; // Export component