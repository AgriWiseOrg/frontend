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
  Loader2,
  FileSearch,
  CheckCircle,
  XCircle,
  Info
} from 'lucide-react';

const FinanceFarmer = ({ user }) => {
  const navigate = useNavigate();
  const [providers, setProviders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [appliedSchemes, setAppliedSchemes] = useState([]);
  const [submittingId, setSubmittingId] = useState(null);
  
  // Tab State
  const [activeTab, setActiveTab] = useState('finance');

  // Subsidy Form State
  const [subsidyData, setSubsidyData] = useState({ land: '', category: 'General' });
  const [eligibilityResult, setEligibilityResult] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const schemesRes = await axios.get('http://localhost:5001/api/finance');
        setProviders(Array.isArray(schemesRes.data) ? schemesRes.data : []);

        if (user && user.email) {
          const appsRes = await axios.get(`http://localhost:5001/api/finance/user-applications?email=${user.email}`);
          const appliedIds = appsRes.data.map(app => app.schemeId);
          setAppliedSchemes(appliedIds);
        }
      } catch (err) {
        setError("Unable to connect to the server.");
      } finally {
        setLoading(false);                                    // Stop loading
      }
    };

  const handleSubsidyCheck = (e) => {
    e.preventDefault();
    const landNum = parseFloat(subsidyData.land);
    
    // Logic: Eligible if land is less than 5 hectares OR if they are SC/ST category
    if (landNum > 0 && (landNum <= 5 || subsidyData.category !== 'General')) {
      setEligibilityResult({
        status: 'eligible',
        title: "You are Eligible!",
        desc: "Based on your profile, you qualify for Small Farmer Subsidies (up to 40% on equipment)."
      });
    } else {
      setEligibilityResult({
        status: 'ineligible',
        title: "Standard Category",
        desc: "You currently fall under the Large Farmer category. You may still apply for standard interest subventions."
      });
    }
  };

  const handleApply = async (scheme) => {
    if (!scheme || !scheme._id) return;
    setSubmittingId(scheme._id);
    try {
      const payload = {
        farmerEmail: user?.email || "unknown@agriwise.com",
        schemeName: scheme.name,
        schemeId: scheme._id,
        interestRate: scheme.interest
      };
      const response = await axios.post('http://localhost:5001/api/finance/apply', payload);
      if (response.status === 201) {
        setAppliedSchemes((prev) => [...prev, scheme._id]);
      }

    } catch (err) {
      alert("Application failed. Check backend connectivity.");
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
        
        {/* Navigation */}
        <div className="flex items-center mb-8">
          <button onClick={() => navigate('/govt-schemes')} className="flex items-center justify-center w-10 h-10 bg-white rounded-xl shadow-sm border border-slate-100 text-slate-600 hover:text-indigo-600 transition-all active:scale-90">
            <ChevronLeft className="w-5 h-5" />
          </button>
          <span className="ml-4 font-bold text-slate-400 uppercase tracking-widest text-[10px]">Back to Hub</span>
        </div>

        {/* Header & Tabs */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <BadgeCheck className="text-emerald-600 w-5 h-5" />
              <span className="text-sm font-bold uppercase tracking-widest text-emerald-600">Verified by AgriWise</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight">Financial <span className="text-indigo-600">Portal</span></h1>
          </div>

          <div className="flex bg-slate-200/50 p-1.5 rounded-2xl w-fit">
            <button 
              onClick={() => setActiveTab('finance')}
              className={`px-6 py-2.5 rounded-xl font-bold transition-all ${activeTab === 'finance' ? 'bg-white text-indigo-600 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
            >
              Loan Schemes
            </button>
            <button 
              onClick={() => setActiveTab('subsidies')}
              className={`px-6 py-2.5 rounded-xl font-bold transition-all ${activeTab === 'subsidies' ? 'bg-white text-indigo-600 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
            >
              Subsidy Checker
            </button>
          </div>
        </div>

        {activeTab === 'finance' ? (
          /* LOAN SCHEMES TAB */
          error ? (
            <div className="p-10 bg-red-50 text-red-600 rounded-3xl text-center font-bold border border-red-100">{error}</div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {providers.map((p) => {
                const isApplied = appliedSchemes.includes(p._id);
                const isSubmitting = submittingId === p._id;
                return (
                  <div key={p._id} className="group bg-white rounded-[2.5rem] p-2 shadow-xl shadow-slate-200/60 hover:shadow-2xl transition-all border border-slate-100 flex flex-col">
                    <div className="p-6 flex-1">
                      <div className="flex justify-between items-start mb-8">
                        <div className={`p-4 rounded-2xl ${getTheme(p.color)}`}>{getIcon(p.type)}</div>
                        <span className="text-[10px] font-black uppercase px-3 py-1 bg-slate-100 text-slate-500 rounded-full tracking-tighter">{p.tag || 'Active'}</span>
                      </div>
                      <h2 className="font-bold text-2xl mb-1 group-hover:text-indigo-600 transition-colors">{p.name}</h2>
                      <p className="text-slate-400 text-sm font-medium mb-8">{p.type}</p>
                      <div className="bg-slate-50 rounded-3xl p-5 group-hover:bg-indigo-50/50 transition-colors">
                        <p className="text-[10px] text-slate-400 font-black uppercase mb-1">Annual Interest</p>
                        <p className="text-4xl font-black text-slate-900 tracking-tight">{p.interest}</p>
                      </div>
                    </div>
                    <div className="px-4 pb-4">
                      <button 
                        onClick={() => !isApplied && !isSubmitting && handleApply(p)} 
                        disabled={isApplied || isSubmitting}
                        className={`w-full p-5 rounded-[1.5rem] font-bold flex items-center justify-center gap-2 transition-all ${isApplied ? "bg-emerald-100 text-emerald-600" : "bg-slate-900 text-white hover:bg-indigo-600"}`}
                      >
                        {isSubmitting ? <Loader2 className="w-5 h-5 animate-spin" /> : isApplied ? <>Applied <CheckCircle2 className="w-5 h-5" /></> : <>Apply Now <ArrowUpRight className="w-5 h-5" /></>}
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          )
        ) : (
          /* SUBSIDY CHECKER TAB */
          <div className="max-w-2xl mx-auto">
            <div className="bg-white rounded-[3rem] p-8 md:p-12 shadow-xl shadow-slate-200 border border-slate-100">
              <div className="flex items-center gap-4 mb-8">
                <div className="p-4 bg-indigo-50 text-indigo-600 rounded-3xl">
                  <FileSearch className="w-8 h-8" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold">Subsidy Eligibility</h2>
                  <p className="text-slate-500">Check your status for government subventions.</p>
                </div>
              </div>

              <form onSubmit={handleSubsidyCheck} className="space-y-6">
                <div>
                  <label className="block text-xs font-black uppercase tracking-widest text-slate-400 mb-2 ml-1">Total Land Size (Hectares)</label>
                  <input 
                    type="number" 
                    required
                    placeholder="e.g. 2.5"
                    className="w-full bg-slate-50 border-none rounded-2xl p-4 focus:ring-2 focus:ring-indigo-600 transition-all font-bold text-lg"
                    value={subsidyData.land}
                    onChange={(e) => setSubsidyData({...subsidyData, land: e.target.value})}
                  />
                </div>

                <div>
                  <label className="block text-xs font-black uppercase tracking-widest text-slate-400 mb-2 ml-1">Farmer Category</label>
                  <select 
                    className="w-full bg-slate-50 border-none rounded-2xl p-4 focus:ring-2 focus:ring-indigo-600 transition-all font-bold text-lg appearance-none"
                    value={subsidyData.category}
                    onChange={(e) => setSubsidyData({...subsidyData, category: e.target.value})}
                  >
                    <option>General</option>
                    <option>SC / ST</option>
                    <option>OBC</option>
                    <option>Women Farmer</option>
                  </select>
                </div>

                <button type="submit" className="w-full bg-indigo-600 text-white p-5 rounded-2xl font-black text-lg hover:bg-indigo-700 shadow-lg shadow-indigo-100 transition-all active:scale-95">
                  Check My Eligibility
                </button>
              </form>

              {eligibilityResult && (
                <div className={`mt-10 p-6 rounded-[2rem] border-2 flex items-start gap-4 transition-all animate-in fade-in slide-in-from-bottom-4 ${
                  eligibilityResult.status === 'eligible' ? "bg-emerald-50 border-emerald-100" : "bg-amber-50 border-amber-100"
                }`}>
                  {eligibilityResult.status === 'eligible' 
                    ? <CheckCircle className="w-8 h-8 text-emerald-600 mt-1 shrink-0" /> 
                    : <Info className="w-8 h-8 text-amber-600 mt-1 shrink-0" />
                  }
                  <div>
                    <h3 className={`text-xl font-bold ${eligibilityResult.status === 'eligible' ? "text-emerald-900" : "text-amber-900"}`}>
                      {eligibilityResult.title}
                    </h3>
                    <p className="text-slate-600 mt-1 font-medium leading-relaxed">
                      {eligibilityResult.desc}
                    </p>
                  </div>

                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default FinanceFarmer;                                   // Export component