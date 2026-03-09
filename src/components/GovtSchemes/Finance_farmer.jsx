import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useLanguage } from '../LanguageContext';
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

const ffLang = {
  en: { back: 'Back to Hub', tabLoans: 'Loan Schemes', tabSub: 'Subsidy Checker', annualInt: 'Annual Interest', applyNow: 'Apply Now', applied: 'Applied', landLabel: 'Total Land Size (Hectares)', farmerCat: 'Farmer Category', checkBtn: 'Check My Eligibility', subTitle: 'Subsidy Eligibility', subDesc: 'Check your status for government subventions.' },
  hi: { back: '\u0939\u092c \u092a\u0930 \u0935\u093e\u092a\u0938', tabLoans: '\u0924\u0941\u0932\u0928\u093e \u092f\u094b\u091c\u0928\u093e\u090f\u0902', tabSub: '\u0938\u092c\u094d\u0938\u093f\u0921\u0940 \u091c\u093e\u0902\u091a\u0915', annualInt: '\u0935\u093e\u0930\u094d\u0937\u093f\u0915 \u092c\u094d\u092f\u093e\u091c', applyNow: '\u0905\u092d\u0940 \u0906\u0935\u0947\u0926\u0928 \u0915\u0930\u0947\u0902', applied: '\u0906\u0935\u0947\u0926\u0928 \u0915\u093f\u092f\u093e', landLabel: '\u0915\u0941\u0932 \u092d\u0942\u092e\u093f (\u0939\u0947\u0915\u094d\u091f\u0947\u092f\u0930)', farmerCat: '\u0915\u093f\u0938\u093e\u0928 \u0936\u094d\u0930\u0947\u0923\u0940', checkBtn: '\u092e\u0947\u0930\u0940 \u092a\u093e\u0924\u094d\u0930\u0924\u093e \u091c\u093e\u0902\u091a\u0947\u0902', subTitle: '\u0938\u092c\u094d\u0938\u093f\u0921\u0940 \u092a\u093e\u0924\u094d\u0930\u0924\u093e', subDesc: '\u0938\u0930\u0915\u093e\u0930\u0940 \u0905\u0928\u0941\u0926\u093e\u0928 \u0915\u0940 \u0938\u094d\u0925\u093f\u0924\u093f \u091c\u093e\u0902\u091a\u0947\u0902.' },
  te: { back: '\u0c39\u0c2c\u0c4d\u200c\u0c15\u0c41 \u0c35\u0c46\u0c28\u0c15\u0c4d\u0c15\u0c3f', tabLoans: '\u0c30\u0c41\u0c23 \u0c2a\u0c25\u0c15\u0c3e\u0c32\u0c41', tabSub: '\u0c38\u0c2c\u0c4d\u0c38\u0c3f\u0c21\u0c40 \u0c24\u0c28\u0c3f\u0c16\u0c40', annualInt: '\u0c35\u0c3e\u0c30\u0c4d\u0c37\u0c3f\u0c15 \u0c35\u0c21\u0c4d\u0c21\u0c40', applyNow: '\u0c07\u0c2a\u0c4d\u0c2a\u0c41\u0c21\u0c41 \u0c26\u0c30\u0c16\u0c3e\u0c38\u0c4d\u0c24\u0c41', applied: '\u0c26\u0c30\u0c16\u0c3e\u0c38\u0c4d\u0c24\u0c41 \u0c1a\u0c47\u0c36\u0c3e\u0c30\u0c41', landLabel: '\u0c2e\u0c4a\u0c24\u0c4d\u0c24\u0c02 \u0c2d\u0c42\u0c2e\u0c3f (\u0c39\u0c46\u0c15\u0c4d\u0c1f\u0c3e\u0c30\u0c4d\u0c32\u0c41)', farmerCat: '\u0c30\u0c48\u0c24\u0c41 \u0c35\u0c30\u0c4d\u0c17\u0c02', checkBtn: '\u0c28\u0c3e \u0c05\u0c30\u0c4d\u0c39\u0c24 \u0c24\u0c28\u0c3f\u0c16\u0c40', subTitle: '\u0c38\u0c2c\u0c4d\u0c38\u0c3f\u0c21\u0c40 \u0c05\u0c30\u0c4d\u0c39\u0c24', subDesc: '\u0c2a\u0c4d\u0c30\u0c2d\u0c41\u0c24\u0c4d\u0c35 \u0c38\u0c39\u0c3e\u0c2f\u0c02 \u0c24\u0c28\u0c3f\u0c16\u0c40.' },
  mr: { back: '\u0939\u092c\u0935\u0930 \u092a\u0930\u0924', tabLoans: '\u0915\u0930\u094d\u091c \u092f\u094b\u091c\u0928\u093e', tabSub: '\u0905\u0928\u0941\u0926\u093e\u0928 \u0924\u092a\u093e\u0938\u0923\u0940', annualInt: '\u0935\u093e\u0930\u094d\u0937\u093f\u0915 \u0935\u094d\u092f\u093e\u091c', applyNow: '\u0906\u0924\u093e \u0905\u0930\u094d\u091c \u0915\u0930\u093e', applied: '\u0905\u0930\u094d\u091c \u0915\u0947\u0932\u093e', landLabel: '\u0915\u0941\u0932 \u091c\u092e\u093f\u0928 (\u0939\u0947\u0915\u094d\u091f\u0930)', farmerCat: '\u0936\u0947\u0924\u0915\u0930\u0940 \u0935\u0930\u094d\u0917', checkBtn: '\u092e\u093e\u091d\u0940 \u092a\u093e\u0924\u094d\u0930\u0924\u093e \u0924\u092a\u093e\u0938\u093e', subTitle: '\u0905\u0928\u0941\u0926\u093e\u0928 \u092a\u093e\u0924\u094d\u0930\u0924\u093e', subDesc: '\u0938\u0930\u0915\u093e\u0930\u0940 \u0905\u0928\u0941\u0926\u093e\u0928\u093e\u091a\u0940 \u0938\u094d\u0925\u093f\u0924\u0940 \u0924\u092a\u093e\u0938\u093e.' },
  kn: { back: '\u0cb9\u0cac\u0ccd\u200c\u0c97\u0cc6 \u0cb9\u0cbf\u0c82\u0ca4\u0cbf\u0cb0\u0cc1\u0c97\u0cbf', tabLoans: '\u0cb8\u0cbe\u0cb2 \u0caf\u0ccb\u0c9c\u0ca8\u0cc6', tabSub: '\u0cb8\u0cb9\u0cbe\u0caf \u0caa\u0cb0\u0cc0\u0c95\u0ccd\u0cb7\u0c95', annualInt: '\u0cb5\u0cbe\u0cb0\u0ccd\u0cb7\u0cbf\u0c95 \u0cac\u0ca1\u0ccd\u0ca1\u0cbf', applyNow: '\u0c88\u0c97 \u0c85\u0cb0\u0ccd\u0c9c\u0cbf\u0cb8\u0cbf', applied: '\u0c85\u0cb0\u0ccd\u0c9c\u0cbf \u0cb8\u0cb2\u0ccd\u0cb2\u0cbf\u0cb8\u0cb2\u0cbe\u0c97\u0cbf\u0ca6\u0cc6', landLabel: '\u0cae\u0cca\u0ca4\u0ccd\u0ca4 \u0cad\u0cc2\u0cae\u0cbf (\u0cb9\u0cc6\u0c95\u0ccd\u0c9f\u0cc0\u0cb0\u0ccd)', farmerCat: '\u0cb0\u0cc8\u0ca4 \u0cb5\u0cb0\u0ccd\u0c97', checkBtn: '\u0ca8\u0ca8\u0ccd\u0ca8 \u0c85\u0cb0\u0ccd\u0cb9\u0ca4\u0cc6 \u0caa\u0cb0\u0cbf\u0cb6\u0ccb\u0ca7\u0cbf\u0cb8\u0cbf', subTitle: '\u0cb8\u0cb9\u0cbe\u0caf \u0c85\u0cb0\u0ccd\u0cb9\u0ca4\u0cc6', subDesc: '\u0cb8\u0cb0\u0ccd\u0c95\u0cbe\u0cb0\u0cbf \u0cb8\u0cb9\u0cbe\u0caf\u0ca6 \u0cb8\u0ccd\u0ca5\u0cbf\u0ca4\u0cbf \u0caa\u0cb0\u0cbf\u0cb6\u0ccb\u0ca7\u0cbf\u0cb8\u0cbf.' },
  ta: { back: '\u0bae\u0bc8\u0baf\u0ba4\u0bcd\u0ba4\u0bbf\u0bb1\u0bcd\u0b95\u0bc1 \u0ba4\u0bbf\u0bb0\u0bc1\u0bae\u0bcd\u0baa\u0bc1', tabLoans: '\u0b95\u0b9f\u0ba9\u0bcd \u0ba4\u0bbf\u0b9f\u0bcd\u0b9f\u0b99\u0bcd\u0b95\u0bb3\u0bcd', tabSub: '\u0bae\u0bbe\u0ba9\u0bbf\u0baf \u0b9a\u0bb0\u0bbf\u0baa\u0bbe\u0bb0\u0bcd\u0baa\u0bcd\u0baa\u0bc1', annualInt: '\u0bb5\u0bbe\u0bb0\u0bcd\u0bb7\u0bbf\u0b95 \u0bb5\u0b9f\u0bcd\u0b9f\u0bbf', applyNow: '\u0b87\u0baa\u0bcd\u0baa\u0bcb\u0ba4\u0bc1 \u0bb5\u0bbf\u0ba3\u0bcd\u0ba3\u0baa\u0bcd\u0baa\u0bbf\u0b95\u0bcd\u0b95', applied: '\u0bb5\u0bbf\u0ba3\u0bcd\u0ba3\u0baa\u0bcd\u0baa\u0bbf\u0ba4\u0bcd\u0ba4\u0ba4\u0bc1', landLabel: '\u0bae\u0bca\u0ba4\u0bcd\u0ba4 \u0ba8\u0bbf\u0bb2 (\u0bb5\u0bc6\u0b95\u0bcd\u0b9f\u0bc7\u0bb0\u0bcd)', farmerCat: '\u0bb5\u0bbf\u0bb5\u0b9a\u0bbe\u0baf \u0bb5\u0b95\u0bc8', checkBtn: '\u0b8f\u0ba9\u0bcd \u0ba4\u0b95\u0bc1\u0ba4\u0bbf \u0b9a\u0bb0\u0bbf\u0baa\u0bbe\u0bb0\u0bcd\u0b95\u0bcd\u0b95', subTitle: '\u0bae\u0bbe\u0ba9\u0bbf\u0baf \u0ba4\u0b95\u0bc1\u0ba4\u0bbf', subDesc: '\u0b85\u0bb0\u0b9a\u0bc1 \u0bae\u0bbe\u0ba9\u0bbf\u0baf\u0ba4\u0bcd\u0ba4\u0bbf\u0bb1\u0bcd\u0b95\u0bc1 \u0ba4\u0b95\u0bc1\u0ba4\u0bbf \u0b9a\u0bb0\u0bbf\u0baa\u0bbe\u0bb0\u0bcd\u0b95\u0bcd\u0b95.' },
  pa: { back: '\u0a39\u0a71\u0a2c \u0a24\u0a47 \u0a35\u0a3e\u0a2a\u0a38', tabLoans: '\u0a15\u0a30\u0a1c\u0a3c\u0a47 \u0a38\u0a15\u0a40\u0a2e\u0a3e\u0a02', tabSub: '\u0a38\u0a2c\u0a38\u0a3f\u0a21\u0a40 \u0a1c\u0a3e\u0a02\u0a1a\u0a15', annualInt: '\u0a38\u0a32\u0a3e\u0a28\u0a3e \u0a35\u0a3f\u0a06\u0a1c', applyNow: '\u0a39\u0a41\u0a23 \u0a05\u0a30\u0a1c\u0a3c\u0a40 \u0a26\u0a3f\u0a13', applied: '\u0a05\u0a30\u0a1c\u0a3c\u0a40 \u0a26\u0a3f\u0a71\u0a24\u0a40', landLabel: '\u0a15\u0a41\u0a71\u0a32 \u0a1c\u0a3c\u0a2e\u0a40\u0a28 (\u0a39\u0a48\u0a15\u0a1f\u0a47\u0a05\u0a30)', farmerCat: '\u0a15\u0a3f\u0a38\u0a3e\u0a28 \u0a38\u0a3c\u0a4d\u0a30\u0a47\u0a23\u0a40', checkBtn: '\u0a2e\u0a47\u0a30\u0a40 \u0a2f\u0a4b\u0a17\u0a24\u0a3e \u0a1c\u0a3e\u0a02\u0a1a\u0a4b', subTitle: '\u0a38\u0a2c\u0a38\u0a3f\u0a21\u0a40 \u0a2f\u0a4b\u0a17\u0a24\u0a3e', subDesc: '\u0a38\u0a30\u0a15\u0a3e\u0a30\u0a40 \u0a38\u0a39\u0a3e\u0a08\u0a24\u0a3e \u0a32\u0a08 \u0a2f\u0a4b\u0a17\u0a24\u0a3e \u0a1c\u0a3e\u0a02\u0a1a\u0a4b.' },
  ml: { back: '\u0d39\u0d2c\u0d4d\u0d2c\u0d3f\u0d32\u0d47\u0d15\u0d4d\u0d15\u0d4d \u0d2e\u0d1f\u0d19\u0d4d\u0d19\u0d7d', tabLoans: '\u0d35\u0d3e\u0d2f\u0d4d\u0d2a \u0d2a\u0d26\u0d4d\u0d27\u0d24\u0d3f\u0d15\u0d7e', tabSub: '\u0d38\u0d2c\u0d4d\u0d38\u0d3f\u0d21\u0d3f \u0d2a\u0d30\u0d3f\u0d36\u0d4b\u0d27\u0d15\u0d02', annualInt: '\u0d35\u0d3e\u0d7c\u0d37\u0d3f\u0d15 \u0d2a\u0d32\u0d3f\u0d36', applyNow: '\u0d07\u0d2a\u0d4d\u0d2a\u0d4b\u0d7e \u0d05\u0d2a\u0d47\u0d15\u0d4d\u0d37\u0d3f\u0d15\u0d4d\u0d15\u0d42', applied: '\u0d05\u0d2a\u0d47\u0d15\u0d4d\u0d37\u0d3f\u0d1a\u0d4d\u0d1a\u0d41', landLabel: '\u0d06\u0d15\u0d46 \u0d2d\u0d42\u0d2e\u0d3f (\u0d39\u0d46\u0d15\u0d4d\u0d1f\u0d4d\u0d1f\u0d7c)', farmerCat: '\u0d15\u0d7c\u0d37\u0d15\u0d7c \u0d35\u0d3f\u0d2d\u0d3e\u0d17\u0d02', checkBtn: '\u0d0e\u0d28\u0d4d\u0d31\u0d46 \u0d2f\u0d4b\u0d17\u0d4d\u0d2f\u0d24 \u0d2a\u0d30\u0d3f\u0d36\u0d4b\u0d27\u0d3f\u0d15\u0d4d\u0d15\u0d42', subTitle: '\u0d38\u0d2c\u0d4d\u0d38\u0d3f\u0d21\u0d3f \u0d2f\u0d4b\u0d17\u0d4d\u0d2f\u0d24', subDesc: '\u0d38\u0d7c\u0d15\u0d4d\u0d15\u0d3e\u0d7c \u0d38\u0d38\u0d3e\u0d2f\u0d24\u0d4d\u0d24\u0d3f\u0d28\u0d4d\u0d31\u0d46 \u0d28\u0d3f\u0d32 \u0d2a\u0d30\u0d3f\u0d36\u0d4b\u0d27\u0d3f\u0d15\u0d4d\u0d15\u0d42.' },
};

const FinanceFarmer = ({ user }) => {
  const navigate = useNavigate();
  const { langCode } = useLanguage();
  const t = ffLang[langCode] || ffLang.en;
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
        const schemesRes = await axios.get(`${import.meta.env.VITE_API_URL || `${import.meta.env.VITE_API_URL || "http://localhost:5001"}`}/api/finance`);
        setProviders(Array.isArray(schemesRes.data) ? schemesRes.data : []);

        if (user && user.email) {
          const appsRes = await axios.get(`${import.meta.env.VITE_API_URL || `${import.meta.env.VITE_API_URL || "http://localhost:5001"}`}/api/finance/user-applications?email=${user.email}`);
          const appliedIds = appsRes.data.map(app => app.schemeId);
          setAppliedSchemes(appliedIds);
        }
      } catch (err) {
        setError("Unable to connect to the server.");
      } finally {
        setLoading(false);                                    // Stop loading
      }
    };

    fetchData();
  }, [user]);

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
      const response = await axios.post(`${import.meta.env.VITE_API_URL || `${import.meta.env.VITE_API_URL || "http://localhost:5001"}`}/api/finance/apply`, payload);
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
          <span className="ml-4 font-bold text-slate-400 uppercase tracking-widest text-[10px]">{t.back}</span>
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
              {t.tabLoans}
            </button>
            <button
              onClick={() => setActiveTab('subsidies')}
              className={`px-6 py-2.5 rounded-xl font-bold transition-all ${activeTab === 'subsidies' ? 'bg-white text-indigo-600 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
            >
              {t.tabSub}
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
                        <p className="text-[10px] text-slate-400 font-black uppercase mb-1">{t.annualInt}</p>
                        <p className="text-4xl font-black text-slate-900 tracking-tight">{p.interest}</p>
                      </div>
                    </div>
                    <div className="px-4 pb-4">
                      <button
                        onClick={() => !isApplied && !isSubmitting && handleApply(p)}
                        disabled={isApplied || isSubmitting}
                        className={`w-full p-5 rounded-[1.5rem] font-bold flex items-center justify-center gap-2 transition-all ${isApplied ? "bg-emerald-100 text-emerald-600" : "bg-slate-900 text-white hover:bg-indigo-600"}`}
                      >
                        {isSubmitting ? <Loader2 className="w-5 h-5 animate-spin" /> : isApplied ? <>{t.applied} <CheckCircle2 className="w-5 h-5" /></> : <>{t.applyNow} <ArrowUpRight className="w-5 h-5" /></>}
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
                  <h2 className="text-2xl font-bold">{t.subTitle}</h2>
                  <p className="text-slate-500">Check your status for government subventions.</p>
                </div>
              </div>

              <form onSubmit={handleSubsidyCheck} className="space-y-6">
                <div>
                  <label className="block text-xs font-black uppercase tracking-widest text-slate-400 mb-2 ml-1">{t.landLabel}</label>
                  <input
                    type="number"
                    required
                    placeholder="e.g. 2.5"
                    className="w-full bg-slate-50 border-none rounded-2xl p-4 focus:ring-2 focus:ring-indigo-600 transition-all font-bold text-lg"
                    value={subsidyData.land}
                    onChange={(e) => setSubsidyData({ ...subsidyData, land: e.target.value })}
                  />
                </div>

                <div>
                  <label className="block text-xs font-black uppercase tracking-widest text-slate-400 mb-2 ml-1">{t.farmerCat}</label>
                  <select
                    className="w-full bg-slate-50 border-none rounded-2xl p-4 focus:ring-2 focus:ring-indigo-600 transition-all font-bold text-lg appearance-none"
                    value={subsidyData.category}
                    onChange={(e) => setSubsidyData({ ...subsidyData, category: e.target.value })}
                  >
                    <option>General</option>
                    <option>SC / ST</option>
                    <option>OBC</option>
                    <option>Women Farmer</option>
                  </select>
                </div>

                <button type="submit" className="w-full bg-indigo-600 text-white p-5 rounded-2xl font-black text-lg hover:bg-indigo-700 shadow-lg shadow-indigo-100 transition-all active:scale-95">
                  {t.checkBtn}
                </button>
              </form>

              {eligibilityResult && (
                <div className={`mt-10 p-6 rounded-[2rem] border-2 flex items-start gap-4 transition-all animate-in fade-in slide-in-from-bottom-4 ${eligibilityResult.status === 'eligible' ? "bg-emerald-50 border-emerald-100" : "bg-amber-50 border-amber-100"
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

export default FinanceFarmer;