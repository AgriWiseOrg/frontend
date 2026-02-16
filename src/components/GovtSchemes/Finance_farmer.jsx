import React, { useState, useEffect } from 'react';          // Import React + hooks for state & lifecycle
import { useNavigate } from 'react-router-dom';              // Hook to programmatically change routes, functional components can do everything using hooks.
import axios from 'axios';                                   // For making HTTP requests to backend
import {
  Landmark,
  CreditCard,
  ShieldCheck,
  ArrowUpRight,
  BadgeCheck,
  ChevronLeft,
  CheckCircle2,
  Loader2
} from 'lucide-react';                                       // Importing icons

const FinanceFarmer = ({ user }) => {                        // Functional component (receives logged-in user as prop)

  const navigate = useNavigate();                            // Initialize navigation function

  const [providers, setProviders] = useState([]);            // Stores finance schemes
  const [loading, setLoading] = useState(true);              // Controls loading screen
  const [error, setError] = useState(null);                  // Stores error message
  const [appliedSchemes, setAppliedSchemes] = useState([]);  // Stores IDs of schemes already applied
  const [submittingId, setSubmittingId] = useState(null);    // Stores ID of scheme currently submitting

  // Load finance schemes + user's applied schemes
  useEffect(() => {                                          // USEEFFECT IS USED TO FETCH UPDATES FROM THE BACKEND WHEN THE PAGE LOADS.
    const fetchData = async () => {                          // Async function for API calls
      try {
        setLoading(true);                                    // Show loading spinner

        // Fetch all finance schemes
        const schemesRes = await axios.get('http://localhost:5001/api/finance'); // GET request
        setProviders(Array.isArray(schemesRes.data) ? schemesRes.data : []);    // Save schemes safely

        // If user is logged in → fetch their applied schemes
        if (user && user.email) {                            // Check user exists
          const appsRes = await axios.get(
            `http://localhost:5001/api/finance/user-applications?email=${user.email}`
          );                                                 // Fetch user applications

          const appliedIds = appsRes.data.map(app => app.schemeId); // Extract scheme IDs
          setAppliedSchemes(appliedIds);                      // Store applied scheme IDs
        }

      } catch (err) {
        console.error("Fetch error:", err);                   // Log error
        setError("Unable to connect to the server.");         // Set error message
      } finally {
        setLoading(false);                                    // Stop loading
      }
    };

    fetchData();                                              // Call function
  }, [user]);                                                 // Re-run if user changes

  const handleApply = async (scheme) => {                     // Function when APPLY button clicked
    if (!scheme || !scheme._id) return;                       // Safety check

    setSubmittingId(scheme._id);                              // Mark this scheme as submitting

    try {
      const payload = {                                       // Data to send to backend
        farmerEmail: user?.email || "unknown@agriwise.com",  
        schemeName: scheme.name,                            
        schemeId: scheme._id,                                
        interestRate: scheme.interest                        
      };

      const response = await axios.post(
        'http://localhost:5001/api/finance/apply', 
        payload
      );                                                       // Send POST request

      if (response.status === 201) {                           // If created successfully
        setAppliedSchemes((prev) => [...prev, scheme._id]);    // Add to applied list
        alert(`Request Received! Our team will reach out regarding ${scheme.name}.`);
      }

    } catch (err) {
      console.error("Application error:", err);                // Log error
      alert("Application failed. Make sure backend is running."); // Debug alert
    } finally {
      setSubmittingId(null);                                   // Remove submitting state
    }
  };

  const getIcon = (type) => {                                  // Function to return icon based on type
    const t = type?.toLowerCase() || '';                       // Convert safely to lowercase
    if (t.includes('loan')) return <Landmark className="w-6 h-6" />;      // Loan icon
    if (t.includes('private')) return <CreditCard className="w-6 h-6" />; // Private credit icon
    return <ShieldCheck className="w-6 h-6" />;                // Default icon
  };

  const getTheme = (color) => {                                // Returns color theme class
    const themes = {
      emerald: "bg-emerald-50 text-emerald-600",
      blue: "bg-blue-50 text-blue-600",
      amber: "bg-amber-50 text-amber-600",
      indigo: "bg-indigo-50 text-indigo-600"
    };
    return themes[color] || themes.indigo;                     // Default indigo
  };

  if (loading) return (                                        // If loading true
    <div className="min-h-screen flex items-center justify-center bg-[#F8FAFC]">
      <div className="flex flex-col items-center gap-4">
        <Loader2 className="w-8 h-8 animate-spin text-indigo-600" /> {/* Spinner */}
        <p className="font-bold text-slate-400 text-xl">Loading AgriWise Finance...</p>
      </div>
    </div>
  );

  return (                                                     // Main UI starts
    <div className="min-h-screen bg-[#F8FAFC] font-sans text-slate-900 p-4 md:p-10">
      <div className="max-w-6xl mx-auto">

        {/* Navigation Section */}
        <div className="flex items-center mb-8">
          <button
            onClick={() => navigate('/govt-schemes')}          // Navigate back
            className="flex items-center justify-center w-10 h-10 bg-white rounded-xl shadow-sm border border-slate-100 text-slate-600 hover:text-indigo-600 transition-all active:scale-90"
          >
            <ChevronLeft className="w-5 h-5" />                {/* Back icon */}
          </button>
          <span className="ml-4 font-bold text-slate-400 uppercase tracking-widest text-[10px]">
            Back to Hub
          </span>
        </div>

        {/* Header Section */}
        <div className="mb-10">
          <div className="flex items-center gap-2 mb-2">
            <BadgeCheck className="text-emerald-600 w-5 h-5" /> {/* Verified icon */}
            <span className="text-sm font-bold uppercase tracking-widest text-emerald-600">
              Verified by AgriWise
            </span>
          </div>

          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight">
            Loans & <span className="text-indigo-600">Finance</span>
          </h1>

          <p className="text-slate-500 mt-2">
            Personalized financial support for your agricultural growth.
          </p>
        </div>

        {error ? (                                              // If error exists
          <div className="p-10 bg-red-50 text-red-600 rounded-3xl text-center font-bold shadow-sm border border-red-100">
            {error}
          </div>
        ) : !providers.length ? (                               // If no schemes
          <div className="p-10 bg-white rounded-3xl text-center text-slate-400 border border-dashed border-slate-200">
            No active finance schemes available.
          </div>
        ) : (                                                   
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"> {/* Card grid */}
            {providers.map((p) => {                             // Loop each provider
              if (!p) return null;                              // Safety check

              const isApplied = appliedSchemes.includes(p._id); // Check if applied
              const isSubmitting = submittingId === p._id;      // Check if submitting

              return (
                <div key={p._id} className="group bg-white rounded-[2.5rem] p-2 shadow-xl hover:shadow-2xl transition-all duration-500 border flex flex-col">
                  
                  <div className="p-6 flex-1">                   {/* Card body */}
                    
                    <div className="flex justify-between items-start mb-8">
                      <div className={`p-4 rounded-2xl ${getTheme(p.color)}`}>
                        {getIcon(p.type)}                        {/* Dynamic icon */}
                      </div>

                      <span className="text-[10px] font-black uppercase px-3 py-1 bg-slate-100 text-slate-500 rounded-full">
                        {p.tag || 'Active'}                      {/* Scheme tag */}
                      </span>
                    </div>

                    <h2 className="font-bold text-2xl mb-1 group-hover:text-indigo-600">
                      {p.name || "Finance Scheme"}               {/* Scheme name */}
                    </h2>

                    <p className="text-slate-400 text-sm font-medium mb-8">
                      {p.type || "General Category"}             {/* Scheme type */}
                    </p>

                    <div className="bg-slate-50 rounded-3xl p-5 mb-2">
                      <p className="text-[10px] text-slate-400 font-black uppercase mb-1">
                        Annual Interest
                      </p>
                      <p className="text-4xl font-black text-slate-900">
                        {p.interest}                             {/* Interest value */}
                      </p>
                    </div>
                  </div>

                  <div className="px-4 pb-4">
                    <button
                      onClick={() => !isApplied && !isSubmitting && handleApply(p)} // Apply logic
                      disabled={isApplied || isSubmitting}       // Disable if applied/submitting
                      className={`w-full p-5 rounded-[1.5rem] font-bold flex items-center justify-center gap-2 transition-all ${
                        isApplied
                          ? "bg-emerald-100 text-emerald-600"
                          : "bg-slate-900 text-white hover:bg-indigo-600"
                      }`}
                    >
                      {isSubmitting ? (
                        <Loader2 className="w-5 h-5 animate-spin" /> // Spinner
                      ) : isApplied ? (
                        <>Applied <CheckCircle2 className="w-5 h-5" /></> // Applied state
                      ) : (
                        <>Apply Now <ArrowUpRight className="w-5 h-5" /></> // Default state
                      )}
                    </button>
                  </div>

                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default FinanceFarmer;                                   // Export component