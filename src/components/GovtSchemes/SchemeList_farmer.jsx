import React, { useState, useEffect } from 'react'; // React + Hooks
import { ArrowLeft, CheckCircle2, ArrowUpRight, Loader2, Sprout, ShieldCheck, ExternalLink, XCircle } from 'lucide-react'; // Icons
import { useNavigate } from 'react-router-dom'; // Navigation hook
import axios from 'axios'; // HTTP client

const SchemeList = ({ user }) => { // Component receives logged-in user as prop

  const navigate = useNavigate(); // Used for route navigation

  // ===== STATE VARIABLES =====
  const [landSize, setLandSize] = useState(''); // Stores user land size input
  const [schemes, setSchemes] = useState([]); // Stores all schemes from backend
  const [myApplications, setMyApplications] = useState([]); // Stores scheme IDs user applied for
  const [loading, setLoading] = useState(true); // Controls loading spinner
  const [submittingId, setSubmittingId] = useState(null); // Tracks which scheme is being applied/cancelled

  // ===== FETCH DATA ON COMPONENT LOAD =====
  useEffect(() => {

    const fetchData = async () => {
      try {
        // Fetch all schemes
        const res = await axios.get('http://localhost:5001/api/schemes');
        setSchemes(Array.isArray(res.data) ? res.data : []); // Ensure it's an array
        
        // If user is logged in, fetch their applications
        if (user && user.email) {
            const appsRes = await axios.get(
              `http://localhost:5001/api/schemes/user-applications?email=${user.email}`
            );

            // Store only scheme IDs
            setMyApplications(appsRes.data.map(app => app.schemeId));
        }

      } catch (err) { 
        console.error("Fetch error:", err); // Log any errors
      }
      finally { 
        setLoading(false); // Stop loading spinner
      }
    };

    fetchData(); // Call function

  }, [user]); // Runs whenever user changes

  // ===== APPLY FUNCTION =====
  const handleApply = async (scheme) => {

    // If land size not entered → focus input
    if (!landSize) {
      document.getElementById('land-input').focus();
      return;
    }

    // Check eligibility based on min and max land range
    const isEligible =
      landSize >= (scheme.minLand || 0) &&
      landSize <= (scheme.maxLand || 9999);

    if (!isEligible) return; // Stop if not eligible

    setSubmittingId(scheme._id); // Show spinner on that specific card

    try {
      await axios.post('http://localhost:5001/api/schemes/apply', {
        farmerEmail: user?.email || "unknown@agriwise.com", // fallback email
        schemeName: scheme.name,
        schemeId: scheme._id,
        landSize: landSize
      });

      // Update UI immediately
      setMyApplications([...myApplications, scheme._id]);

    } catch (err) {
      alert("Application failed."); // Show error
    } finally {
      setSubmittingId(null); // Stop spinner
    }
  };

  // ===== CANCEL FUNCTION =====
  const handleCancel = async (schemeId) => {

    // Confirm before cancelling
    if (!window.confirm("Are you sure you want to cancel this application?")) return;
    
    setSubmittingId(schemeId); // Show spinner

    try {
      const email = user?.email;

      // Delete request with email and schemeId
      await axios.delete(
        `http://localhost:5001/api/schemes/cancel/${email}/${schemeId}`
      );
      
      // Remove scheme from applied list in UI
      setMyApplications(myApplications.filter(id => id !== schemeId));

    } catch (err) {
      console.error("Cancellation error:", err);
      alert("Cancellation failed. Check if backend restarted.");
    } finally {
      setSubmittingId(null);
    }
  };

  // ===== FORMAT LAND RANGE =====
  const renderRange = (min, max) => {
    if (min === undefined || max === undefined)
      return "Eligibility: N/A";
    return `${min} - ${max} Acres`;
  };

  // ===== UI START =====
  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900 pb-20">

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

        {/* HEADER SECTION */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          
          {/* Left side */}
          <div>
            <button 
              onClick={() => navigate('/govt-schemes')} 
              className="flex items-center gap-2 text-slate-400 hover:text-slate-700 transition-colors mb-4 font-medium"
            >
              <ArrowLeft size={18} /> Back
            </button>

            <h1 className="text-4xl font-extrabold tracking-tight">
              Government <span className="text-emerald-600">Schemes</span>
            </h1>
          </div>
          
          {/* Right side controls */}
          <div className="flex flex-col md:flex-row items-center gap-4">

            {/* Official external link */}
            <a 
              href="https://pmkisan.gov.in/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-2 bg-white border rounded-full text-xs font-bold"
            >
              Official India Portal <ExternalLink size={14} />
            </a>

            {/* Land input box */}
            <div className="relative group bg-white p-1 pl-1 pr-6 rounded-full border-2 flex items-center gap-3 shadow-sm">

              <div className="p-3 rounded-full">
                <Sprout size={20} />
              </div>

              <div className="flex flex-col">
                <label className="text-[10px] font-bold uppercase">
                  Your Land Size
                </label>

                <input
                  id="land-input"
                  type="number"
                  value={landSize}
                  onChange={(e) => setLandSize(e.target.value)} // Update state
                  className="w-32 bg-transparent outline-none font-bold"
                  placeholder="Enter acres..."
                />
              </div>

            </div>
          </div>
        </div>

        {/* Loading Spinner */}
        {loading && (
          <div className="text-center py-20">
            <Loader2 className="animate-spin mx-auto text-emerald-500" />
          </div>
        )}

        {/* Schemes Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

          {!loading && schemes.map(scheme => {

            const min = scheme.minLand || 0;
            const max = scheme.maxLand || 10000;

            const isEligible =
              landSize && landSize >= min && landSize <= max;

            const isApplied =
              myApplications.includes(scheme._id);

            const isSubmitting =
              submittingId === scheme._id;

            const cardStatus =
              !landSize ? 'neutral' :
              isEligible ? 'eligible' :
              'ineligible';

            return (
              <div key={scheme._id} className="flex flex-col h-full bg-white rounded-3xl border">

                {/* Top Benefit Section */}
                <div className="px-6 py-4 border-b flex justify-between items-start">
                  <div>
                    <span className="text-xs font-bold uppercase">
                      Benefit
                    </span>
                    <p className="font-bold text-lg mt-1">
                      {scheme.benefit || "View Details"}
                    </p>
                  </div>
                  <ShieldCheck size={20} />
                </div>

                {/* Body */}
                <div className="p-6 flex-1 flex flex-col">

                  <h3 className="font-bold text-xl mb-2">
                    {scheme.name || "Untitled Scheme"}
                  </h3>

                  <div className="text-sm mb-6">
                    Range: {renderRange(scheme.minLand, scheme.maxLand)}
                  </div>

                  {/* Buttons */}
                  <div className="mt-auto space-y-3">

                    {isApplied ? (
                      <>
                        {/* Already applied */}
                        <button disabled className="w-full py-3 bg-emerald-100">
                          <CheckCircle2 size={18} /> Applied
                        </button>

                        <button
                          onClick={() => handleCancel(scheme._id)}
                          disabled={isSubmitting}
                          className="w-full py-2 bg-red-50"
                        >
                          {isSubmitting ? <Loader2 size={14} className="animate-spin" /> : <XCircle size={14} />}
                          Cancel Application
                        </button>
                      </>
                    ) : (
                      <button
                        onClick={() => handleApply(scheme)}
                        className="w-full py-3"
                      >
                        {isSubmitting && <Loader2 className="animate-spin" size={18} />}
                        {!isSubmitting && (
                          cardStatus === 'neutral'
                            ? "Check Eligibility"
                            : cardStatus === 'eligible'
                              ? "Apply Now"
                              : "Not Eligible"
                        )}
                        {!isSubmitting && <ArrowUpRight size={18} />}
                      </button>
                    )}

                  </div>
                </div>

              </div>
            );
          })}
        </div>

      </div>
    </div>
  );
};

export default SchemeList; // Export component