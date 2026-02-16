import React, { useState, useEffect } from 'react'; // Import React and required hooks
import { Sprout, Droplets, Sun, Bug, ArrowLeft, Loader2 } from 'lucide-react'; // Import icons
import { useNavigate } from 'react-router-dom'; // For navigation between routes
import axios from 'axios'; // For making HTTP requests

const FarmingTips = () => { // Functional component starts

  const navigate = useNavigate(); // Hook used to move between pages

  const [tips, setTips] = useState([]); 
  // 'tips' → stores farming tips data
  // 'setTips' → updates the tips state
  // Initial value is empty array

  const [loading, setLoading] = useState(true); 
  // 'loading' → controls spinner visibility
  // Starts as true because data is not yet fetched

  useEffect(() => { 
    // Runs only once when component mounts (because dependency array is empty)

    const fetchTips = async () => { 
      // Async function to fetch data from backend
      try {
        const res = await axios.get('http://localhost:5001/api/farming-tips'); 
        // Make GET request to backend API

        setTips(Array.isArray(res.data) ? res.data : []); 
        // Ensure response is array before storing
        // Prevents crash if backend returns wrong format

      } catch (err) { 
        console.error("Error fetching tips"); 
        // If API fails, log error in console
      }
      finally { 
        setLoading(false); 
        // Stop loading spinner after API finishes (success or failure)
      }
    };

    fetchTips(); // Call the function

  }, []); // Empty dependency array → run only once

  const getIcon = (type) => { 
    // Function to decide which icon to show based on tip type

    switch (type) {
      case 'water': 
        return <Droplets />; // Show water icon
      case 'sun': 
        return <Sun />; // Show sun icon
      case 'bug': 
        return <Bug />; // Show pest icon
      default: 
        return <Sprout />; // Default icon if none matches
    }
  };

  return ( // JSX UI starts here

    <div className="min-h-screen bg-white p-6 md:p-10 font-sans">
      {/* Full screen container with padding */}

      <div className="max-w-4xl mx-auto">
        {/* Center content with max width */}

        <button 
          onClick={() => navigate('/govt-schemes')} 
          // Navigate back when clicked

          className="flex items-center gap-2 mb-6 text-slate-500 font-bold hover:text-slate-800"
        >
          <ArrowLeft size={20} /> 
          {/* Back arrow icon */}
          Back to Hub
        </button>

        <h1 className="text-3xl font-black text-slate-900 mb-8">
          Smart Farming Advisory
        </h1>

        {loading ? ( 
          // If loading is true → show spinner

          <div className="text-center p-10">
            <Loader2 className="animate-spin mx-auto text-emerald-600" />
            {/* Spinning loader icon */}
          </div>

        ) : ( 
          // If loading is false → show tips

          <div className="grid gap-6">
            {/* Grid layout for tips */}

            {tips.map((tip) => ( 
              // Loop through tips array

              <div 
                key={tip._id} 
                // Unique key required for React list rendering

                className="flex items-start gap-4 p-6 rounded-3xl bg-gray-50 border border-gray-100 hover:shadow-md transition-shadow"
              >
                {/* Each tip card */}

                <div 
                  className={`p-3 rounded-2xl bg-white shadow-sm ${tip.color}`}
                >
                  {/* Icon container with dynamic color from backend */}
                  {getIcon(tip.iconType)}
                  {/* Call function to get correct icon */}
                </div>

                <div>
                  <h2 className="font-bold text-xl mb-1 text-slate-900">
                    {tip.title}
                    {/* Tip title */}
                  </h2>

                  <p className="text-gray-600 leading-relaxed">
                    {tip.desc}
                    {/* Tip description */}
                  </p>
                </div>

              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default FarmingTips; 
// Export component so it can be used in routing