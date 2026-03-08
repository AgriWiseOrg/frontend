import React, { useState, useEffect } from 'react'; // React + Hooks
import { ArrowLeft, CheckCircle2, ArrowUpRight, Loader2, Sprout, ShieldCheck, ExternalLink, XCircle } from 'lucide-react'; // Icons
import { useNavigate } from 'react-router-dom'; // Navigation hook
import axios from 'axios'; // HTTP client
import { useLanguage } from '../LanguageContext';

const slTranslations = {
  en: { back: 'Back', title: 'Government', titleHighlight: 'Schemes', officialPortal: 'Official India Portal', landLabel: 'Your Land Size', landPlaceholder: 'Enter acres...', benefit: 'Benefit', viewDetails: 'View Details', checkEligibility: 'Check Eligibility', applyNow: 'Apply Now', notEligible: 'Not Eligible', applied: 'Applied', cancelApp: 'Cancel Application', range: 'Range', acres: 'Acres', eligibility: 'Eligibility: N/A', appFailed: 'Application failed.', cancelConfirm: 'Are you sure you want to cancel this application?', cancelFailed: 'Cancellation failed. Check if backend restarted.' },
  hi: { back: 'वापस', title: 'सरकारी', titleHighlight: 'योजनाएं', officialPortal: 'आधिकारिक भारत पोर्टल', landLabel: 'आपकी भूमि का आकार', landPlaceholder: 'एकड़ दर्ज करें...', benefit: 'लाभ', viewDetails: 'विवरण देखें', checkEligibility: 'पात्रता जांचें', applyNow: 'अभी आवेदन करें', notEligible: 'पात्र नहीं', applied: 'आवेदन किया', cancelApp: 'आवेदन रद्द करें', range: 'सीमा', acres: 'एकड़', eligibility: 'पात्रता: N/A', appFailed: 'आवेदन विफल।', cancelConfirm: 'क्या आप इस आवेदन को रद्द करना चाहते हैं?', cancelFailed: 'रद्दीकरण विफल।' },
  te: { back: 'వెనక్కి', title: 'ప్రభుత్వ', titleHighlight: 'పథకాలు', officialPortal: 'అధికారిక భారత పోర్టల్', landLabel: 'మీ భూమి పరిమాణం', landPlaceholder: 'ఎకరాలు నమోదు చేయండి...', benefit: 'ప్రయోజనం', viewDetails: 'వివరాలు చూడండి', checkEligibility: 'అర్హత తనిఖీ', applyNow: 'ఇప్పుడు దరఖాస్తు చేయండి', notEligible: 'అర్హత లేదు', applied: 'దరఖాస్తు చేశారు', cancelApp: 'దరఖాస్తు రద్దు', range: 'పరిధి', acres: 'ఎకరాలు', eligibility: 'అర్హత: వర్తించదు', appFailed: 'దరఖాస్తు విఫలమైంది.', cancelConfirm: 'మీరు ఈ దరఖాస్తు రద్దు చేయాలనుకుంటున్నారా?', cancelFailed: 'రద్దు విఫలమైంది.' },
  ta: { back: 'பின்செல்', title: 'அரசு', titleHighlight: 'திட்டங்கள்', officialPortal: 'அதிகாரப்பூர்வ இந்திய போர்டல்', landLabel: 'உங்கள் நில அளவு', landPlaceholder: 'ஏக்கர் உள்ளிடு...', benefit: 'பலன்', viewDetails: 'விவரங்கள் காண', checkEligibility: 'தகுதி சரிபார்க்க', applyNow: 'இப்போது விண்ணப்பிக்க', notEligible: 'தகுதியற்றவர்', applied: 'விண்ணப்பித்தது', cancelApp: 'விண்ணப்பம் ரத்து', range: 'வரம்பு', acres: 'ஏக்கர்', eligibility: 'தகுதி: N/A', appFailed: 'விண்ணப்பம் தோல்வி.', cancelConfirm: 'இந்த விண்ணப்பத்தை ரத்து செய்யவா?', cancelFailed: 'ரத்து தோல்வி.' },
  mr: { back: 'मागे', title: 'सरकारी', titleHighlight: 'योजना', officialPortal: 'अधिकृत भारत पोर्टल', landLabel: 'तुमच्या जमिनीचा आकार', landPlaceholder: 'एकर टाका...', benefit: 'फायदा', viewDetails: 'तपशील पहा', checkEligibility: 'पात्रता तपासा', applyNow: 'आता अर्ज करा', notEligible: 'पात्र नाही', applied: 'अर्ज केला', cancelApp: 'अर्ज रद्द करा', range: 'श्रेणी', acres: 'एकर', eligibility: 'पात्रता: N/A', appFailed: 'अर्ज अयशस्वी.', cancelConfirm: 'हा अर्ज रद्द करायचा आहे का?', cancelFailed: 'रद्द करणे अयशस्वी.' },
  kn: { back: 'ಹಿಂದೆ', title: 'ಸರ್ಕಾರಿ', titleHighlight: 'ಯೋಜನೆಗಳು', officialPortal: 'ಅಧಿಕೃತ ಭಾರತ ಪೋರ್ಟಲ್', landLabel: 'ನಿಮ್ಮ ಭೂಮಿ ಗಾತ್ರ', landPlaceholder: 'ಎಕರೆ ನಮೂದಿಸಿ...', benefit: 'ಪ್ರಯೋಜನ', viewDetails: 'ವಿವರ ನೋಡಿ', checkEligibility: 'ಅರ್ಹತೆ ಪರೀಕ್ಷಿಸಿ', applyNow: 'ಈಗ ಅರ್ಜಿ ಸಲ್ಲಿಸಿ', notEligible: 'ಅರ್ಹರಲ್ಲ', applied: 'ಅರ್ಜಿ ಸಲ್ಲಿಸಲಾಗಿದೆ', cancelApp: 'ಅರ್ಜಿ ರದ್ದು', range: 'ವ್ಯಾಪ್ತಿ', acres: 'ಎಕರೆ', eligibility: 'ಅರ್ಹತೆ: N/A', appFailed: 'ಅರ್ಜಿ ವಿಫಲವಾಗಿದೆ.', cancelConfirm: 'ಈ ಅರ್ಜಿ ರದ್ದು ಮಾಡಬೇಕೇ?', cancelFailed: 'ರದ್ದು ವಿಫಲ.' },
  pa: { back: 'ਵਾਪਸ', title: 'ਸਰਕਾਰੀ', titleHighlight: 'ਯੋਜਨਾਵਾਂ', officialPortal: 'ਅਧਿਕਾਰਿਕ ਭਾਰਤ ਪੋਰਟਲ', landLabel: 'ਤੁਹਾਡੀ ਜ਼ਮੀਨ ਦਾ ਆਕਾਰ', landPlaceholder: 'ਏਕੜ ਦਰਜ ਕਰੋ...', benefit: 'ਲਾਭ', viewDetails: 'ਵੇਰਵੇ ਦੇਖੋ', checkEligibility: 'ਯੋਗਤਾ ਜਾਂਚੋ', applyNow: 'ਹੁਣ ਅਰਜ਼ੀ ਦਿਓ', notEligible: 'ਯੋਗ ਨਹੀਂ', applied: 'ਅਰਜ਼ੀ ਦਿੱਤੀ', cancelApp: 'ਅਰਜ਼ੀ ਰੱਦ ਕਰੋ', range: 'ਸੀਮਾ', acres: 'ਏਕੜ', eligibility: 'ਯੋਗਤਾ: N/A', appFailed: 'ਅਰਜ਼ੀ ਅਸਫਲ।', cancelConfirm: 'ਕੀ ਤੁਸੀਂ ਇਹ ਅਰਜ਼ੀ ਰੱਦ ਕਰਨਾ ਚਾਹੁੰਦੇ ਹੋ?', cancelFailed: 'ਰੱਦ ਕਰਨਾ ਅਸਫਲ।' },
  ml: { back: 'വെനക്കി', title: 'സർക്കാർ', titleHighlight: 'പദ്ധതികൾ', officialPortal: 'ഔദ്യോഗിക ഇന്ത്യ പോർട്ടൽ', landLabel: 'നിങ്ങളുടെ ഭൂമി വലുപ്പം', landPlaceholder: 'ഏക്കർ നൽകൂ...', benefit: 'ആനുകൂല്യം', viewDetails: 'വിശദാംശങ്ങൾ', checkEligibility: 'യോഗ്യത പരിശോധിക്കൂ', applyNow: 'ഇപ്പോൾ അപേക്ഷിക്കൂ', notEligible: 'യോഗ്യതയില്ല', applied: 'അപേക്ഷിച്ചു', cancelApp: 'അപേക്ഷ റദ്ദ്', range: 'ശ്രേണി', acres: 'ഏക്കർ', eligibility: 'യോഗ്യത: N/A', appFailed: 'അപേക്ഷ പരാജയപ്പെട്ടു.', cancelConfirm: 'ഈ അപേക്ഷ റദ്ദ് ചെയ്യണോ?', cancelFailed: 'റദ്ദ് ചെയ്യൽ പരാജയപ്പെട്ടു.' },
};

const SchemeList = ({ user }) => { // Component receives logged-in user as prop

  const navigate = useNavigate(); // Used for route navigation
  const { langCode } = useLanguage();
  const t = slTranslations[langCode] || slTranslations.en;

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
    if (!window.confirm(t.cancelConfirm)) return;

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
      alert(t.cancelFailed);
    } finally {
      setSubmittingId(null);
    }
  };

  // ===== FORMAT LAND RANGE =====
  const renderRange = (min, max) => {
    if (min === undefined || max === undefined)
      return "Eligibility: N/A";
    return `${min} - ${max} ${t.acres}`;
    // return `${min} - ${max} Acres`;
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
              <ArrowLeft size={18} /> {t.back}
            </button>

            <h1 className="text-4xl font-extrabold tracking-tight">
              Government <span className="text-emerald-600">{t.titleHighlight}</span>
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
                  {t.landLabel}
                </label>

                <input
                  id="land-input"
                  type="number"
                  value={landSize}
                  onChange={(e) => setLandSize(e.target.value)}
                  className="w-32 bg-transparent outline-none font-bold"
                  placeholder={t.landPlaceholder}
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
                      {t.benefit}
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
                          <CheckCircle2 size={18} /> {t.applied}
                        </button>

                        <button
                          onClick={() => handleCancel(scheme._id)}
                          disabled={isSubmitting}
                          className="w-full py-2 bg-red-50"
                        >
                          {isSubmitting ? <Loader2 size={14} className="animate-spin" /> : <XCircle size={14} />}
                          {t.cancelApp}
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
                            ? t.checkEligibility
                            : cardStatus === 'eligible'
                              ? t.applyNow
                              : t.notEligible
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