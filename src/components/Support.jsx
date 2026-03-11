// Component for rendering support section
import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from './LanguageContext'; // Import hook

const MainView = ({ t, setActiveView, showDisputeForm, setShowDisputeForm, subsidyStep, setSubsidyStep, navigate, setFormType }) => (
    <div className="space-y-8 animate-in fade-in duration-500">
        {/* Title Section */}
        <section className="text-center space-y-2">
            <h1 className="text-3xl md:text-5xl font-black text-slate-900 leading-tight">{t.title} 📞</h1>
            <p className="text-slate-500 font-medium text-lg">{t.subtitle}</p>
        </section>

        {/* Multimodal Action Bar */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <a href="tel:+916301230747" className="flex flex-col items-center justify-center p-8 bg-gradient-to-br from-rose-600 to-rose-700 text-white rounded-[2.5rem] shadow-2xl shadow-rose-200 hover:scale-105 transition-all group">
                <span className="text-5xl mb-3 group-hover:rotate-12 transition-transform duration-300">📞</span>
                <span className="font-black text-xl">{t.voiceCall}</span>
                <span className="text-[10px] opacity-80 uppercase font-bold mt-2 tracking-widest">Available 24/7</span>
            </a>
            <a href="https://wa.me/916301230747" target="_blank" rel="noreferrer" className="flex flex-col items-center justify-center p-8 bg-gradient-to-br from-emerald-500 to-teal-600 text-white rounded-[2.5rem] shadow-2xl shadow-emerald-200 hover:scale-105 transition-all group">
                <span className="text-5xl mb-3 group-hover:rotate-12 transition-transform duration-300">💬</span>
                <span className="font-black text-xl">{t.whatsapp}</span>
                <span className="text-[10px] opacity-80 uppercase font-bold mt-2 tracking-widest">Fast Response</span>
            </a>
            <a href="sms:+916301230747" className="flex flex-col items-center justify-center p-8 bg-gradient-to-br from-slate-800 to-slate-900 text-white rounded-[2.5rem] shadow-2xl shadow-slate-300 hover:scale-105 transition-all group">
                <span className="text-5xl mb-3 group-hover:rotate-12 transition-transform duration-300">📱</span>
                <span className="font-black text-xl">{t.smsIvr}</span>
                <span className="text-[10px] opacity-80 uppercase font-bold mt-2 tracking-widest">Dial *123#</span>
            </a>
        </section>

        <hr className="border-slate-200" />

        {/* Feature Cards Grid */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Market Insight Module Card */}
            <div onClick={() => setActiveView('market')} className="bg-gradient-to-br from-orange-50 to-white border-2 border-orange-100 rounded-[3rem] p-10 cursor-pointer hover:shadow-2xl hover:border-orange-300 transition-all group relative overflow-hidden">
                <div className="relative z-10">
                    <span className="text-6xl block mb-6 group-hover:scale-110 transition-transform">📈</span>
                    <h3 className="text-2xl font-black text-slate-800 mb-2">{t.marketTitle}</h3>
                    <p className="text-slate-500 font-bold mb-6">{t.marketDesc}</p>
                    <span className="inline-block bg-orange-600 text-white font-black px-6 py-3 rounded-xl text-sm">{t.portalBtn}</span>
                </div>
                <div className="absolute -right-10 -bottom-10 text-[12rem] opacity-5 group-hover:opacity-10 transition-opacity">💹</div>
            </div>

            {/* Crop Health Interactive Card */}
            <div onClick={() => setActiveView('diagnostic')} className="bg-gradient-to-br from-emerald-50 to-white border-2 border-emerald-100 rounded-[3rem] p-10 cursor-pointer hover:shadow-2xl hover:border-emerald-300 transition-all group relative overflow-hidden">
                <div className="relative z-10">
                    <span className="text-6xl block mb-6 group-hover:scale-110 transition-transform">🌱</span>
                    <h3 className="text-2xl font-black text-slate-800 mb-2">{t.diagnosticTitle}</h3>
                    <p className="text-slate-500 font-bold mb-6">{t.diagnosticDesc}</p>
                    <span className="inline-block bg-emerald-600 text-white font-black px-6 py-3 rounded-xl text-sm">{t.diagnosticBtn}</span>
                </div>
                <div className="absolute -right-10 -bottom-10 text-[12rem] opacity-5 group-hover:opacity-10 transition-opacity">🩺</div>
            </div>

            {/* Premium Scheme Portal Card */}
            <div onClick={() => setActiveView('schemes')} className="bg-gradient-to-br from-blue-50 to-white border-2 border-blue-100 rounded-[3rem] p-10 cursor-pointer hover:shadow-2xl hover:border-blue-300 transition-all group relative overflow-hidden">
                <div className="relative z-10">
                    <span className="text-6xl block mb-6 group-hover:scale-110 transition-transform">🏛️</span>
                    <h3 className="text-2xl font-black text-slate-800 mb-2">{t.schemeTitle}</h3>
                    <p className="text-slate-500 font-bold mb-6">{t.schemeDesc}</p>
                    <span className="inline-block bg-blue-600 text-white font-black px-6 py-3 rounded-xl text-sm">{t.schemeBtn}</span>
                </div>
                <div className="absolute -right-10 -bottom-10 text-[12rem] opacity-5 group-hover:opacity-10 transition-opacity">📜</div>
            </div>

            {/* Subsidy Eligibility Wizard Card (Moved or kept as secondary) */}
            <div className="bg-white border-2 border-emerald-100 rounded-[3rem] p-10 shadow-xl shadow-emerald-50 relative overflow-hidden">
                <div className="flex items-center gap-4 mb-8">
                    <div className="w-16 h-16 bg-emerald-600 rounded-[1.5rem] flex items-center justify-center text-3xl shadow-lg shadow-emerald-200">💰</div>
                    <div>
                        <h3 className="font-black text-2xl text-slate-800">{t.subsidyTitle}</h3>
                        <p className="text-slate-400 text-xs font-black uppercase tracking-widest">{t.subsidyDesc}</p>
                    </div>
                </div>

                {subsidyStep === 0 ? (
                    <div className="space-y-6">
                        <p className="text-slate-500 font-bold leading-relaxed text-lg">{t.subsidyText}</p>
                        <button onClick={() => setSubsidyStep(1)} className="w-full bg-emerald-600 text-white font-black py-5 rounded-2xl hover:bg-emerald-700 transition-all shadow-xl shadow-emerald-100">
                            {t.findNow} →
                        </button>
                    </div>
                ) : (
                    <div className="bg-emerald-50 p-6 rounded-[2rem] border-2 border-emerald-100 animate-in zoom-in duration-300">
                        <ul className="space-y-3 mb-6">
                            <li className="text-slate-700 font-bold flex items-center gap-3">🎯 {t.quickLinks?.pmKisan || 'PM-Kisan'}</li>
                            <li className="text-slate-700 font-bold flex items-center gap-3">🎯 {t.quickLinks?.pmfby || 'PMFBY'}</li>
                            <li className="text-slate-700 font-bold flex items-center gap-3">🎯 {t.quickLinks?.kcc || 'KCC'}</li>
                        </ul>
                        <button onClick={() => setSubsidyStep(0)} className="text-emerald-700 font-black uppercase text-xs underline">{t.quickLinks?.back || 'Back'}</button>
                    </div>
                )}
            </div>
        </section>


        {/* Dispute Link */}
        <section className="bg-slate-900 rounded-[3rem] p-10 text-white flex flex-col md:flex-row items-center justify-between gap-8 group overflow-hidden relative">
            <div className="relative z-10 max-w-xl">
                <h2 className="text-3xl font-black mb-2">{t.disputeTitle} ⚖️</h2>
                <p className="text-slate-400 font-medium text-lg">{t.disputeDesc}</p>
            </div>
            <button onClick={() => { setShowDisputeForm(!showDisputeForm); setFormType('dispute'); }} className="relative z-10 bg-white text-slate-900 font-black px-10 py-5 rounded-2xl hover:bg-rose-50 hover:text-rose-600 transition-all shadow-2xl">
                {showDisputeForm ? t.closeBtn : t.reportBtn}
            </button>
            <div className="absolute -right-10 -bottom-10 text-[15rem] opacity-5 group-hover:rotate-12 transition-transform duration-1000">🛡️</div>
        </section>
    </div>
);

// ─── DiagnosticView ──────────────────────────────────────────────────────────
const DiagnosticView = ({ t, setActiveView, diagnosticStep, setDiagnosticStep, symptoms, setSymptoms, getDiagnosis }) => {
    const toggleSymptom = (id) => {
        setSymptoms(prev => prev.includes(id) ? prev.filter(s => s !== id) : [...prev, id]);
    };

    const diagnosticSymptoms = [
        { id: 'yellowing', label: t.symptoms?.yellowing || 'Yellow Leaves', icon: '🍂' },
        { id: 'spots', label: t.symptoms?.spots || 'Brown/Black Spots', icon: '🌑' },
        { id: 'holes', label: t.symptoms?.holes || 'Holes in Leaves', icon: '🕳️' },
        { id: 'wilting', label: t.symptoms?.wilting || 'Wilting/Drooping', icon: '🥀' },
        { id: 'pests', label: t.symptoms?.pests || 'Visible Insects', icon: '🐛' },
    ];

    const diagnosis = getDiagnosis();

    return (
        <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 space-y-8">
            <button onClick={() => { setActiveView('main'); setDiagnosticStep(0); setSymptoms([]); }}
                className="flex items-center gap-2 text-indigo-600 font-black bg-indigo-50 px-6 py-3 rounded-2xl hover:bg-indigo-100 transition-all w-fit group">
                <span className="group-hover:-translate-x-1 transition-transform">←</span> {t.back || 'Back'}
            </button>

            <div className="bg-white border-2 border-emerald-100 rounded-[3.5rem] p-10 md:p-14 shadow-2xl">
                <h2 className="text-4xl md:text-6xl font-black text-slate-900 mb-4 tracking-tight">🌱 {t.diagnosticTitle || 'Crop Health Diagnostic'}</h2>
                <p className="text-slate-500 font-bold text-lg mb-10">{t.diagnosticDesc || 'Identify pests, diseases, and nutrient deficiencies in seconds.'}</p>

                {diagnosticStep === 0 && (
                    <div className="space-y-6">
                        <h3 className="font-black text-xl text-slate-700 uppercase tracking-widest">{t.step1 || 'Step 1: Select Symptoms'}</h3>
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                            {diagnosticSymptoms.map(s => (
                                <button key={s.id} onClick={() => toggleSymptom(s.id)}
                                    className={`flex items-center gap-3 p-5 rounded-2xl border-2 font-bold transition-all text-left ${
                                        symptoms.includes(s.id)
                                            ? 'bg-emerald-600 text-white border-emerald-600 shadow-lg shadow-emerald-100'
                                            : 'bg-slate-50 border-slate-100 text-slate-700 hover:border-emerald-300 hover:bg-emerald-50'
                                    }`}>
                                    <span className="text-3xl">{s.icon}</span>
                                    <span>{s.label}</span>
                                </button>
                            ))}
                        </div>
                        <button
                            disabled={symptoms.length === 0}
                            onClick={() => setDiagnosticStep(1)}
                            className="mt-4 w-full bg-emerald-600 disabled:bg-slate-200 disabled:text-slate-400 text-white font-black py-5 rounded-2xl hover:bg-emerald-700 transition-all shadow-xl shadow-emerald-100 text-lg">
                            {t.stepAnalyze || 'Generate Analysis →'}
                        </button>
                    </div>
                )}

                {diagnosticStep === 1 && (
                    <div className="animate-in zoom-in-95 duration-300 space-y-6">
                        <h3 className="font-black text-xl text-slate-700 uppercase tracking-widest">{t.analysisResult || 'Analysis Result'}</h3>
                        <div className="bg-emerald-50 border-2 border-emerald-200 rounded-[2rem] p-8 space-y-4">
                            <p className="text-xs font-black uppercase tracking-widest text-emerald-600 mb-2">{t.likelyCase || 'Likely Case:'}</p>
                            <h4 className="text-3xl font-black text-slate-900">{diagnosis?.title || 'General Nutrient Stress'}</h4>
                            <div className="h-px bg-emerald-100 my-4"></div>
                            <p className="text-slate-700 font-bold text-lg leading-relaxed">{diagnosis?.remedy || 'Apply balanced NPK fertilizer and ensure consistent irrigation.'}</p>
                        </div>
                        <div className="flex flex-col sm:flex-row gap-4 mt-4">
                            <a href="https://wa.me/916301230747" target="_blank" rel="noreferrer"
                                className="flex-1 text-center bg-emerald-600 text-white font-black py-5 rounded-2xl hover:bg-emerald-700 transition-all shadow-xl shadow-emerald-100">
                                💬 {t.chatExpert || 'Chat with Expert'}
                            </a>
                            <button onClick={() => { setDiagnosticStep(0); setSymptoms([]); }}
                                className="flex-1 bg-slate-100 text-slate-700 font-black py-5 rounded-2xl hover:bg-slate-200 transition-all">
                                🔄 {t.resetTool || 'Reset Tool'}
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

// ─── SchemePortalView ─────────────────────────────────────────────────────────
const SchemePortalView = ({ t, setActiveView }) => (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 space-y-8">
        <button onClick={() => setActiveView('main')}
            className="flex items-center gap-2 text-indigo-600 font-black bg-indigo-50 px-6 py-3 rounded-2xl hover:bg-indigo-100 transition-all w-fit group">
            <span className="group-hover:-translate-x-1 transition-transform">←</span> {t.back || 'Back'}
        </button>

        <div className="bg-white border-2 border-blue-100 rounded-[3.5rem] p-10 md:p-14 shadow-2xl space-y-10">
            <div>
                <h2 className="text-4xl md:text-6xl font-black text-slate-900 mb-4 tracking-tight">🏛️ {t.schemeTitle || 'Premium Scheme Portal'}</h2>
                <p className="text-slate-500 font-bold text-lg">{t.schemeDesc || 'Explore central and state subsidies with eligibility checks.'}</p>
            </div>

            <div className="space-y-4">
                <h3 className="font-black text-sm uppercase tracking-widest text-slate-400">{t.centralSchemes || 'Central Gov Schemes'}</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {(t.schemesList || []).map((scheme, i) => (
                        <a key={i} href={scheme.link} target="_blank" rel="noreferrer"
                            className="group block p-8 bg-gradient-to-br from-blue-50 to-white border-2 border-blue-100 rounded-[2rem] hover:border-blue-400 hover:shadow-xl transition-all">
                            <div className="flex items-start justify-between mb-3">
                                <h4 className="font-black text-slate-800 text-lg leading-tight">{scheme.name}</h4>
                                <span className="text-blue-400 group-hover:text-blue-600 transition-colors text-xl ml-3 shrink-0">→</span>
                            </div>
                            <p className="text-slate-500 font-bold text-sm">{scheme.benefit}</p>
                            <span className="inline-block mt-4 text-xs font-black uppercase tracking-widest text-blue-600 bg-blue-50 px-4 py-2 rounded-full border border-blue-100">
                                Apply Online →
                            </span>
                        </a>
                    ))}
                </div>
            </div>

            <div className="bg-indigo-50 border-2 border-indigo-100 rounded-[2rem] p-8 flex flex-col md:flex-row items-center justify-between gap-6">
                <div>
                    <h3 className="font-black text-xl text-slate-900 mb-1">{t.needHelp || 'Need Help Applying?'}</h3>
                    <p className="text-slate-500 font-medium">{t.helpDesc || "Our experts can help you fill forms over WhatsApp."}</p>
                </div>
                <a href="https://wa.me/916301230747" target="_blank" rel="noreferrer"
                    className="shrink-0 bg-indigo-600 text-white font-black px-8 py-4 rounded-2xl hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-200">
                    💬 {t.getHelp || 'Get Expert Help'}
                </a>
            </div>
        </div>
    </div>
);

// ─── MarketView ───────────────────────────────────────────────────────────────
const MarketView = ({ t, setActiveView, navigate }) => (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 space-y-8">
        <button onClick={() => setActiveView('main')}
            className="flex items-center gap-2 text-indigo-600 font-black bg-indigo-50 px-6 py-3 rounded-2xl hover:bg-indigo-100 transition-all w-fit group">
            <span className="group-hover:-translate-x-1 transition-transform">←</span> {t.back || 'Back'}
        </button>

        <div className="bg-white border-2 border-orange-100 rounded-[3.5rem] p-10 md:p-14 shadow-2xl space-y-10">
            <div>
                <h2 className="text-4xl md:text-6xl font-black text-slate-900 mb-4 tracking-tight">📈 {t.mkTitle || 'Market Intelligence Portal'}</h2>
            </div>

            {/* Pricing Strategy */}
            <div className="bg-orange-50 border-2 border-orange-100 rounded-[2rem] p-8 space-y-4">
                <h3 className="font-black text-xl text-slate-800">{t.pricingStrategyTitle || 'Pricing Strategy'}</h3>
                <p className="text-slate-600 font-bold leading-relaxed">{t.pricingStrategyDesc || 'Never sell in haste. Check the 3-month trend on our Market Prices dashboard.'}</p>
                <button onClick={() => navigate('/market-prices')}
                    className="inline-block bg-orange-600 text-white font-black px-8 py-4 rounded-2xl hover:bg-orange-700 transition-all shadow-lg shadow-orange-200 mt-2">
                    📊 {t.viewTrends || 'View Market Trends'}
                </button>
            </div>

            {/* Official Links */}
            <div className="space-y-4">
                <h3 className="font-black text-sm uppercase tracking-widest text-slate-400">{t.officialLinksTitle || 'Official Pricing Links'}</h3>
                <p className="text-slate-500 font-bold">{t.officialLinksDesc || 'Access official government dashboards for real-time Mandi arrivals.'}</p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
                    {(t.officialLinks || []).map((link, i) => (
                        <a key={i} href={link.url} target="_blank" rel="noreferrer"
                            className="group flex items-center gap-4 p-6 bg-slate-50 border-2 border-slate-100 rounded-[1.5rem] hover:border-orange-300 hover:bg-orange-50 transition-all">
                            <span className="text-3xl">{link.icon}</span>
                            <div>
                                <p className="font-black text-slate-800 text-sm leading-tight">{link.label}</p>
                                <p className="text-xs text-orange-500 font-bold mt-1 group-hover:underline">Visit →</p>
                            </div>
                        </a>
                    ))}
                </div>
            </div>
        </div>
    </div>
);

const Support = ({ user }) => {
    const navigate = useNavigate();
    const { langCode: lang, setLanguage: setLang } = useLanguage(); // Use global state

    const [showDisputeForm, setShowDisputeForm] = useState(false);
    const [formStatus, setFormStatus] = useState('');
    const [subsidyStep, setSubsidyStep] = useState(0);
    const [activeView, setActiveView] = useState('main'); // 'main', 'diagnostic', 'schemes'
    const [diagnosticStep, setDiagnosticStep] = useState(0);
    const [symptoms, setSymptoms] = useState([]);
    const [myReports, setMyReports] = useState([]);
    const [showMyReports, setShowMyReports] = useState(false);
    const [formType, setFormType] = useState('query');

    useEffect(() => {
        if (user?.email) {
            fetch(`${import.meta.env.VITE_API_URL || `${import.meta.env.VITE_API_URL || "http://localhost:5001"}`}/api/support/my-reports?email=${user.email}`)
                .then(res => res.json())
                .then(data => {
                    if (data.success) setMyReports(data.data);
                })
                .catch(err => console.error("Failed to fetch reports:", err));
        }
    }, [user?.email]);



    const translations = {
        en: {
            title: 'Decision Support & Assistance',
            subtitle: 'Knowledge is power. How can we help you today?',
            voiceCall: 'Voice Help',
            voiceDesc: 'Available 24/7',
            whatsapp: 'WhatsApp Chat',
            whatsappDesc: 'Fast Response',
            smsIvr: 'SMS/IVR info',
            smsDesc: 'Dial *123#',
            faqs: 'Quick Guidance',
            marketTitle: 'Market & Pricing Insights',
            marketDesc: 'Stay ahead with official Mandi rates and strategic selling advice.',
            portalBtn: 'Explore Portal →',
            diagnosticTitle: 'Crop Health Diagnostic',
            diagnosticDesc: 'Identify pests, diseases, and nutrient deficiencies in seconds.',
            diagnosticBtn: 'Open Diagnostic Tool →',
            schemeTitle: 'Premium Scheme Portal',
            schemeDesc: 'Explore the full list of central and state subsidies with eligibility checks.',
            schemeBtn: 'Enter Portal →',
            subsidyTitle: 'Subsidy Quick-Check',
            subsidyDesc: 'Eligibility Fast Track',
            subsidyText: 'Quickly verify your basic eligibility for the 3 most popular schemes.',
            findNow: 'Check Eligibility →',
            disputeTitle: 'Dispute Resolution',
            disputeDesc: 'Fairness for all. Report issues with buyers or payments.',
            reportBtn: 'Report Issue',
            closeBtn: 'Close Report',
            back: 'Back to Home',
            selectLang: 'Select Language',
            doctorTitle: 'AI Crop Doctor',
            selectSymptom: 'Select Symptom',
            analyzeBtn: 'Get Analysis',
            resultsTitle: 'Diagnosis Results',
            issueLabel: 'Possible Issue',
            actionLabel: 'Recommended Action',
            lodgeDispute: 'Lodge a Dispute',
            orderIdLabel: 'Order ID',
            issueTypeLabel: 'Issue Type',
            descLabel: 'Description',
            submitBtn: 'Submit Report',
            sending: 'Sending...',
            paymentIssue: 'Payment Issue',
            qualityIssue: 'Quality Dispute',
            logisticsIssue: 'Logistics Delay',
            step1: 'Step 1: Identify Symptoms',
            stepAnalyze: 'Generate Analysis →',
            analysisResult: 'Analysis Result',
            likelyCase: 'Likely Case:',
            chatExpert: 'Chat with Expert',
            resetTool: 'Reset Tool',
            mkTitle: 'Market Intelligence Portal',
            officialLinksTitle: 'Official Pricing Links',
            officialLinksDesc: 'Access official government dashboards for real-time Mandi arrivals and pricing across India.',
            pricingStrategyTitle: 'Pricing Strategy',
            pricingStrategyDesc: 'Never sell in haste. Check the 3-month trend on our **Market Prices** dashboard. If its a surplus season, consider dry storage to sell when supply drops.',
            viewTrends: 'View Market Trends',
            centralSchemes: 'Central Gov Schemes',
            needHelp: 'Need Help Applying?',
            helpDesc: "Don't let paperwork stop you. Our experts can help you fill forms over WhatsApp.",
            getHelp: 'Get Expert Help',
            submitReq: 'Submit Investigation Request',
            buyerDetail: 'Buyer Detail',
            buyerPlaceholder: 'Company or Individual Name',
            orderRef: 'Order Ref',
            orderPlaceholder: '#ID-2024-XXXX',
            issueCategory: 'Issue Category',
            issuePlaceholder: 'What went wrong?',
            issueOptions: {
                payment: 'Delayed Payment',
                price: 'Agreed Price Dispute',
                delivery: 'Pickup Refusal',
                quality: 'Unfair Grading'
            },
            addDetails: 'Additional Details',
            detailsPlaceholder: 'Describe the problem...',
            registering: 'Registering...',
            reportSuccess: 'Report Received! ✅',
            sealSubmit: 'Seal and Submit for Investigation',
            footerTitle: 'AgriWise Decision Support Framework v3.0',
            footerDesc: 'Protecting the livelihood of Indian Farmers through transparency',
            officialLinks: [
                { label: 'Agmarknet (Govt of India)', url: 'https://agmarknet.gov.in/', icon: '🇮🇳' },
                { label: 'e-NAM (Digital Market)', url: 'https://www.enam.gov.in/', icon: '🖥️' },
                { label: 'NHB (Horticulture Board)', url: 'https://nhb.gov.in/OnlineStats/ArrivalAndPriceReports.aspx', icon: '🍎' }
            ],
            schemesList: [
                { name: 'PM-Kisan Samman Nidhi', benefit: '₹6,000 yearly income support', link: 'https://pmkisan.gov.in/' },
                { name: 'Fasal Bima Yojana', benefit: 'Low-cost crop insurance', link: 'https://pmfby.gov.in/' },
                { name: 'Kisan Credit Card (KCC)', benefit: 'Loans at 4% interest rate', link: 'https://www.myscheme.gov.in/schemes/kcc' },
                { name: 'Soil Health Card', benefit: 'Free soil testing & reports', link: 'https://soilhealth.dac.gov.in/' }
            ],
            symptoms: {
                yellowing: 'Yellow Leaves',
                spots: 'Brown/Black Spots',
                holes: 'Holes in Leaves',
                wilting: 'Wilting/Drooping',
                pests: 'Visible Insects'
            },
            diagnosis: {
                nitrogen: { title: 'Nitrogen Deficiency', remedy: 'Apply urea or organic compost. Check soil moisture.' },
                fungal: { title: 'Fungal Infection (Blight)', remedy: 'Use copper-based fungicide. Avoid overhead watering.' },
                pest: { title: 'Aphid/Caterpillar Infestation', remedy: 'Spray Neem oil or recommended insecticide.' },
                general: { title: 'General Nutrient Stress', remedy: 'Balanced NPK application and consistent irrigation required.' }
            },
            quickLinks: {
                pmKisan: 'PM-Kisan (Income)',
                pmfby: 'PMFBY (Insurance)',
                kcc: 'KCC (Low Interest)',
                back: 'Back',
                myReports: 'My Reports'
            },
            queryOptions: {
                crop_advisory: 'Crop Advisory',
                scheme_help: 'Scheme Assistance',
                app_support: 'App / Tech Support',
                other: 'Other Inquiry'
            },
            formTabs: {
                query: 'Ask a Query',
                dispute: 'Raise Only Dispute'
            }
        },
        hi: {
            title: 'निर्णय समर्थन और सहायता',
            subtitle: 'ज्ञान ही शक्ति है। हम आज आपकी कैसे मदद कर सकते हैं?',
            voiceCall: 'आवाज सहायता',
            voiceDesc: '24/7 उपलब्ध',
            whatsapp: 'व्हाट्सएप चैट',
            whatsappDesc: 'त्वरित प्रतिक्रिया',
            smsIvr: 'SMS/IVR जानकारी',
            smsDesc: '*123# डायल करें',
            faqs: 'त्वरित मार्गदर्शन',
            marketTitle: 'बाजार और मूल्य निर्धारण',
            marketDesc: 'सीखें कि मूल्य चार्ट का उपयोग कैसे करें और अधिकतम लाभ के लिए कब बेचना है।',
            portalBtn: 'पोर्टल खोजें →',
            diagnosticTitle: 'फसल स्वास्थ्य निदान',
            diagnosticDesc: 'सेकंड में कीट, रोग और पोषक तत्वों की कमी की पहचान करें।',
            diagnosticBtn: 'निदान उपकरण खोलें →',
            schemeTitle: 'प्रीमियम योजना पोर्टल',
            schemeDesc: 'पात्रता जांच के साथ केंद्रीय और राज्य सब्सिडी की पूरी सूची देखें।',
            schemeBtn: 'पोर्टल दर्ज करें →',
            subsidyTitle: 'सब्सिडी त्वरित-जांच',
            subsidyDesc: 'पात्रता फास्ट ट्रैक',
            subsidyText: '3 सबसे लोकप्रिय योजनाओं के लिए अपनी मूल पात्रता को जल्दी से सत्यापित करें।',
            findNow: 'पात्रता की जांच करें →',
            disputeTitle: 'विवाद समाधान',
            disputeDesc: 'सभी के लिए निष्पक्षता। खरीदारों या भुगतान के साथ समस्याओं की रिपोर्ट करें।',
            reportBtn: 'समस्या रिपोर्ट करें',
            closeBtn: 'रिपोर्ट बंद करें',
            back: 'होम पर वापस',
            selectLang: 'भाषा चुनें',
            doctorTitle: 'एआई फसल डॉक्टर',
            selectSymptom: 'लक्षण चुनें',
            analyzeBtn: 'विश्लेषण प्राप्त करें',
            resultsTitle: 'निदान परिणाम',
            issueLabel: 'संभावित समस्या',
            actionLabel: 'सुझाया गया उपाय',
            lodgeDispute: 'विवाद दर्ज करें',
            orderIdLabel: 'ऑर्डर आईडी',
            issueTypeLabel: 'समस्या का प्रकार',
            descLabel: 'विवरण',
            submitBtn: 'रिपोर्ट भेजें',
            sending: 'भेज रहा है...',
            paymentIssue: 'भुगतान समस्या',
            qualityIssue: 'गुणवत्ता विवाद',
            logisticsIssue: 'रसद में देरी',
            step1: 'चरण 1: लक्षणों की पहचान करें',
            stepAnalyze: 'विश्लेषण उत्पन्न करें →',
            analysisResult: 'विश्लेषण परिणाम',
            likelyCase: 'संभावित मामला:',
            chatExpert: 'विशेषज्ञ से चैट करें',
            resetTool: 'टूल रीसेट करें',
            mkTitle: 'बाजार खुफिया पोर्टल',
            officialLinksTitle: 'आधिकारिक मूल्य निर्धारण लिंक',
            officialLinksDesc: 'पूरे भारत में रीयल-टाइम मंडी आवक और मूल्य निर्धारण के लिए आधिकारिक सरकारी डैशबोर्ड तक पहुंचें।',
            pricingStrategyTitle: 'मूल्य निर्धारण रणनीति',
            pricingStrategyDesc: 'जल्दबाजी में कभी न बेचें। हमारे **बाजार मूल्य** डैशबोर्ड पर 3 महीने का रुझान देखें। यदि यह अधिशेष मौसम है, तो आपूर्ति कम होने पर बेचने के लिए सूखे भंडारण पर विचार करें।',
            viewTrends: 'बाजार के रुझान देखें',
            centralSchemes: 'केंद्र सरकार की योजनाएं',
            needHelp: 'आवेदन करने में सहायता चाहिए?',
            helpDesc: 'कागजी कार्रवाई को आप न रोकें। हमारे विशेषज्ञ व्हाट्सएप पर फॉर्म भरने में आपकी मदद कर सकते हैं।',
            getHelp: 'विशेषज्ञ सहायता प्राप्त करें',
            submitReq: 'जांच अनुरोध सबमिट करें',
            buyerDetail: 'खरीदार विवरण',
            buyerPlaceholder: 'कंपनी या व्यक्ति का नाम',
            orderRef: 'ऑर्डर संदर्भ',
            orderPlaceholder: '#ID-2024-XXXX',
            issueCategory: 'समस्या श्रेणी',
            issuePlaceholder: 'क्या गलत हुआ?',
            issueOptions: {
                payment: 'विलंबित भुगतान',
                price: 'सहमत मूल्य विवाद',
                delivery: 'पिकअप से इनकार',
                quality: 'अनुचित ग्रेडिंग'
            },
            addDetails: 'अतिरिक्त विवरण',
            detailsPlaceholder: 'समस्या का वर्णन करें...',
            registering: 'पंजीकरण हो रहा है...',
            reportSuccess: 'रिपोर्ट प्राप्त हुई! ✅',
            sealSubmit: 'सील करें और जांच के लिए सबमिट करें',
            footerTitle: 'एग्रीवाइज निर्णय समर्थन फ्रेमवर्क v3.0',
            footerDesc: 'पारदर्शिता के माध्यम से भारतीय किसानों की आजीविका की रक्षा करना',
            officialLinks: [
                { label: 'एगमार्कनेट (भारत सरकार)', url: 'https://agmarknet.gov.in/', icon: '🇮🇳' },
                { label: 'ई-नाम (डिजिटल मार्केट)', url: 'https://www.enam.gov.in/', icon: '🖥️' },
                { label: 'एनएचबी (बागवानी बोर्ड)', url: 'https://nhb.gov.in/OnlineStats/ArrivalAndPriceReports.aspx', icon: '🍎' }
            ],
            schemesList: [
                { name: 'पीएम-किसान सम्मान निधि', benefit: '₹6,000 वार्षिक आय सहायता', link: 'https://pmkisan.gov.in/' },
                { name: 'फसल बीमा योजना', benefit: 'कम लागत वाली फसल बीमा', link: 'https://pmfby.gov.in/' },
                { name: 'किसान क्रेडिट कार्ड (KCC)', benefit: '4% ब्याज दर पर ऋण', link: 'https://www.myscheme.gov.in/schemes/kcc' },
                { name: 'मृदा स्वास्थ्य कार्ड', benefit: 'मुफ्त मिट्टी परीक्षण और रिपोर्ट', link: 'https://soilhealth.dac.gov.in/' }
            ],
            symptoms: {
                yellowing: 'पीले पत्त',
                spots: 'भूरे/काले धब्बे',
                holes: 'पत्तियों में छेद',
                wilting: 'मुरझाना/झुकना',
                pests: 'कीड़े दिखाई दे रहे हैं'
            },
            diagnosis: {
                nitrogen: { title: 'नाइट्रोजन की कमी', remedy: 'यूरिया या जैविक खाद डालें। मिट्टी की नमी की जाँच करें।' },
                fungal: { title: 'फंगल संक्रमण (ब्लाइट)', remedy: 'कॉपर-आधारित कवकनाशी का प्रयोग करें। ऊपरी पानी देने से बचें।' },
                pest: { title: 'एफ़िड / कैटरपिलर संक्रमण', remedy: 'नीम के तेल या अनुशंसित कीटनाशक का छिड़काव करें।' },
                general: { title: 'सामान्य पोषक तत्वों का तनाव', remedy: 'संतुलित एनपीके अनुप्रयोग और निरंतर सिंचाई आवश्यक है।' }
            },
            quickLinks: {
                pmKisan: 'पीएम-किसान (आय)',
                pmfby: 'पीएमएफबीवाई (बीमा)',
                kcc: 'केसीसी (कम ब्याज)',
                back: 'वापस'
            }
        },
        te: {
            title: 'నిర్ణయ మద్దతు & సహాయం',
            subtitle: 'జ్ఞానమే శక్తి. ఈరోజు మేము మీకు ఎలా సహాయం చేయగలము?',
            voiceCall: 'వాయిస్ సహాయం',
            voiceDesc: '24/7 అందుబాటులో ఉంది',
            whatsapp: 'వాట్సాప్ చాట్',
            whatsappDesc: 'వేగవంతమైన స్పందన',
            smsIvr: 'SMS/IVR సమాచారం',
            smsDesc: '*123# డయల్ చేయండి',
            faqs: 'త్వరిత మార్గదర్శకత్వం',
            marketTitle: 'మార్కెట్ & ధరలు',
            marketDesc: 'ధరల చార్ట్‌లను ఎలా ఉపయోగించాలో మరియు గరిష్ట లాభం కోసం ఎప్పుడు అమ్మాలి అనే విషయాన్ని తెలుసుకోండి.',
            portalBtn: 'పోర్టల్ అన్వేషించండి →',
            diagnosticTitle: 'పంట ఆరోగ్య నిర్ధారణ',
            diagnosticDesc: 'సెకన్లలో తెగుళ్లు, వ్యాధులు మరియు పోషక లోపాలను గుర్తించండి.',
            diagnosticBtn: 'డయాగ్నస్టిక్ టూల్ తెరవండి →',
            schemeTitle: 'ప్రీమియం స్కీమ్ పోర్టల్',
            schemeDesc: 'అర్హత తనిఖీలతో కేంద్ర మరియు రాష్ట్ర సబ్సిడీల పూర్తి జాబితాను అన్వేషించండి.',
            schemeBtn: 'పోర్టల్ నమోదు చేయండి →',
            subsidyTitle: 'సబ్సిడీ శీఘ్ర-తనిఖీ',
            subsidyDesc: 'అర్హత ఫాస్ట్ ట్రాక్',
            subsidyText: '3 అత్యంత ప్రజాదరణ పొందిన పథకాల కోసం మీ ప్రాథమిక అర్హతను త్వరగా ధృవీకరించండి.',
            findNow: 'అర్హతను తనిఖీ చేయండి →',
            disputeTitle: 'వివాద పరిష్కారం',
            disputeDesc: 'అందరికీ నిష్పక్షపాతం. కొనుగోలుదారులు లేదా చెల్లింపులతో సమస్యలను నివేదించండి.',
            reportBtn: 'సమస్యను నివేదించండి',
            closeBtn: 'నివేదికను మూసివేయండి',
            back: 'హోమ్‌కు వెళ్లండి',
            selectLang: 'భాషను ఎంచుకోండి',
            doctorTitle: 'AI Crop Doctor',
            selectSymptom: 'Select Symptom',
            analyzeBtn: 'Get Analysis',
            resultsTitle: 'Diagnosis Results',
            issueLabel: 'Possible Issue',
            actionLabel: 'Recommended Action',
            lodgeDispute: 'Lodge a Dispute',
            orderIdLabel: 'Order ID',
            issueTypeLabel: 'Issue Type',
            descLabel: 'Description',
            submitBtn: 'Submit Report',
            sending: 'Sending...',
            paymentIssue: 'Payment Issue',
            qualityIssue: 'Quality Dispute',
            logisticsIssue: 'Logistics Delay',
            step1: 'Step 1: Identify Symptoms',
            stepAnalyze: 'Generate Analysis →',
            analysisResult: 'Analysis Result',
            likelyCase: 'Likely Case:',
            chatExpert: 'Chat with Expert',
            resetTool: 'Reset Tool',
            mkTitle: 'Market Intelligence Portal',
            officialLinksTitle: 'Official Pricing Links',
            officialLinksDesc: 'Access official government dashboards for real-time Mandi arrivals and pricing across India.',
            pricingStrategyTitle: 'Pricing Strategy',
            pricingStrategyDesc: 'Never sell in haste. Check the 3-month trend on our **Market Prices** dashboard. If its a surplus season, consider dry storage to sell when supply drops.',
            viewTrends: 'View Market Trends',
            centralSchemes: 'Central Gov Schemes',
            needHelp: 'Need Help Applying?',
            helpDesc: "Don't let paperwork stop you. Our experts can help you fill forms over WhatsApp.",
            getHelp: 'Get Expert Help',
            submitReq: 'Submit Investigation Request',
            buyerDetail: 'Buyer Detail',
            buyerPlaceholder: 'Company or Individual Name',
            orderRef: 'Order Ref',
            orderPlaceholder: '#ID-2024-XXXX',
            issueCategory: 'Issue Category',
            issuePlaceholder: 'What went wrong?',
            issueOptions: {
                payment: 'Delayed Payment',
                price: 'Agreed Price Dispute',
                delivery: 'Pickup Refusal',
                quality: 'Unfair Grading'
            },
            addDetails: 'Additional Details',
            detailsPlaceholder: 'Describe the problem...',
            registering: 'Registering...',
            reportSuccess: 'Report Received! ✅',
            sealSubmit: 'Seal and Submit for Investigation',
            footerTitle: 'AgriWise Decision Support Framework v3.0',
            footerDesc: 'Protecting the livelihood of Indian Farmers through transparency',
            officialLinks: [
                { label: 'Agmarknet (భారత ప్రభుత్వం)', url: 'https://agmarknet.gov.in/', icon: '🇮🇳' },
                { label: 'e-NAM (డిజిటల్ మార్కెట్)', url: 'https://www.enam.gov.in/', icon: '🖥️' },
                { label: 'NHB (హార్టికల్చర్ బోర్డు)', url: 'https://nhb.gov.in/OnlineStats/ArrivalAndPriceReports.aspx', icon: '🍎' }
            ],
            schemesList: [
                { name: 'PM-కిసాన్ సమ్మాన్ నిధి', benefit: '₹6,000 వార్షిక ఆదాయ మద్దతు', link: 'https://pmkisan.gov.in/' },
                { name: 'ఫసల్ బీమా యోజన', benefit: 'తక్కువ ఖర్చుతో కూడిన పంటల బీమా', link: 'https://pmfby.gov.in/' },
                { name: 'కిసాన్ క్రెడిట్ కార్డ్ (KCC)', benefit: '4% వడ్డీ రేటుతో రుణాలు', link: 'https://www.myscheme.gov.in/schemes/kcc' },
                { name: 'సాయిల్ హెల్త్ కార్డ్', benefit: 'ఉచిత మట్టి పరీక్షలు & నివేదికలు', link: 'https://soilhealth.dac.gov.in/' }
            ],
            symptoms: {
                yellowing: 'పసుపు ఆకులు',
                spots: 'గోధుమ/నలుపు మచ్చలు',
                holes: 'ఆకులలో రంధ్రాలు',
                wilting: 'వాడిపోవడం/వాలడం',
                pests: 'కనిపించే కీటకాలు'
            },
            diagnosis: {
                nitrogen: { title: 'నైట్రోజన్ లోపం', remedy: 'యూరియా లేదా సేంద్రీయ ఎరువు వేయండి. నేల తేమను తనిఖీ చేయండి.' },
                fungal: { title: 'శిలీంధ్ర సంక్రమణ (బ్లైట్)', remedy: 'కాపర్ ఆధారిత శిలీంధ్రనాశనిని వాడండి. తలపై నీరు పోయడం మానుకోండి.' },
                pest: { title: 'ఎఫిడ్/గొంగళి పురుగు ముట్టడి', remedy: 'వేప నూనె లేదా సిఫార్సు చేసిన పురుగుమందు పిచికారీ చేయండి.' },
                general: { title: 'సాధారణ పోషక ఒత్తిడి', remedy: 'సమతుల్య ఎన్‌పి‌కె అనువర్తనం మరియు స్థిరమైన నీటిపారుదల అవసరం.' }
            },
            quickLinks: {
                pmKisan: 'PM-కిసాన్ (ఆదాయం)',
                pmfby: 'PMFBY (భీమా)',
                kcc: 'KCC (తక్కువ వడ్డీ)',
                back: 'వెనుకకు'
            }
        },
        ta: {
            title: 'முடிவு ஆதரவு & உதவி',
            subtitle: 'அறிவு என்பது சக்தி. இன்று நாம் உங்களுக்கு எப்படி உதவ முடியும்?',
            voiceCall: 'குரல் உதவி',
            voiceDesc: '24/7 கிடைக்கிறது',
            whatsapp: 'வாட்ஸ்அப் அரட்டை',
            whatsappDesc: 'விரைவான பதில்',
            smsIvr: 'SMS/IVR தகவல்',
            smsDesc: '*123# டயல் செய்யவும்',
            faqs: 'விரைவான வழிகாட்டுதல்',
            marketTitle: 'சந்தை & விலை',
            marketDesc: 'விலை விளக்கப்படங்களை எவ்வாறு பயன்படுத்துவது மற்றும் லாபத்திற்காக எப்போது விற்பது என்பதைக் கற்றுக் கொள்ளுங்கள்.',
            portalBtn: 'போர்ட்டலை ஆராயுங்கள் →',
            diagnosticTitle: 'பயிர் ஆரோக்கிய கண்டறிதல்',
            diagnosticDesc: 'பூச்சிகள், நோய்கள் மற்றும் ஊட்டச்சத்து குறைபாடுகளை நொடிகளில் கண்டறியவும்.',
            diagnosticBtn: 'கண்டறியும் கருவியைத் திற →',
            schemeTitle: 'உயர்தர திட்ட போர்டல்',
            schemeDesc: 'தகுதிச் சோதனைகளுடன் மத்திய மற்றும் மாநில மானியங்களின் முழுப் பட்டியலையும் ஆராயுங்கள்.',
            schemeBtn: 'போர்ட்டலை உள்ளிடவும் →',
            subsidyTitle: 'மானிய விரைவு சரிபார்ப்பு',
            subsidyDesc: 'தகுதி ஃபாஸ்ட் டிராக்',
            subsidyText: 'மிகவும் பிரபலமான 3 திட்டங்களுக்கான உங்கள் அடிப்படைத் தகுதியை விரைவாகச் சரிபார்க்கவும்.',
            findNow: 'தகுதியைச் சரிபார்க்கவும் →',
            disputeTitle: 'பிணக்கு தீர்வு',
            disputeDesc: 'அனைவருக்கும் நியாயம். வாங்குபவர்கள் அல்லது கொடுப்பனவுகளில் உள்ள சிக்கல்களைப் புகாரளிக்கவும்.',
            reportBtn: 'சிக்கலைப் புகாரளிக்கவும்',
            closeBtn: 'புகாரை மூடு',
            back: 'முகப்புக்குத் திரும்பு',
            selectLang: ' மொழியைத் தேர்ந்தெடுக்கவும்',
            doctorTitle: 'AI Crop Doctor',
            selectSymptom: 'Select Symptom',
            analyzeBtn: 'Get Analysis',
            resultsTitle: 'Diagnosis Results',
            issueLabel: 'Possible Issue',
            actionLabel: 'Recommended Action',
            lodgeDispute: 'Lodge a Dispute',
            orderIdLabel: 'Order ID',
            issueTypeLabel: 'Issue Type',
            descLabel: 'Description',
            submitBtn: 'Submit Report',
            sending: 'Sending...',
            paymentIssue: 'Payment Issue',
            qualityIssue: 'Quality Dispute',
            logisticsIssue: 'Logistics Delay',
            step1: 'Step 1: Identify Symptoms',
            stepAnalyze: 'Generate Analysis →',
            analysisResult: 'Analysis Result',
            likelyCase: 'Likely Case:',
            chatExpert: 'Chat with Expert',
            resetTool: 'Reset Tool',
            mkTitle: 'Market Intelligence Portal',
            officialLinksTitle: 'Official Pricing Links',
            officialLinksDesc: 'Access official government dashboards for real-time Mandi arrivals and pricing across India.',
            pricingStrategyTitle: 'Pricing Strategy',
            pricingStrategyDesc: 'Never sell in haste. Check the 3-month trend on our **Market Prices** dashboard. If its a surplus season, consider dry storage to sell when supply drops.',
            viewTrends: 'View Market Trends',
            centralSchemes: 'Central Gov Schemes',
            needHelp: 'Need Help Applying?',
            helpDesc: "Don't let paperwork stop you. Our experts can help you fill forms over WhatsApp.",
            getHelp: 'Get Expert Help',
            submitReq: 'Submit Investigation Request',
            buyerDetail: 'Buyer Detail',
            buyerPlaceholder: 'Company or Individual Name',
            orderRef: 'Order Ref',
            orderPlaceholder: '#ID-2024-XXXX',
            issueCategory: 'Issue Category',
            issuePlaceholder: 'What went wrong?',
            issueOptions: {
                payment: 'Delayed Payment',
                price: 'Agreed Price Dispute',
                delivery: 'Pickup Refusal',
                quality: 'Unfair Grading'
            },
            addDetails: 'Additional Details',
            detailsPlaceholder: 'Describe the problem...',
            registering: 'Registering...',
            reportSuccess: 'Report Received! ✅',
            sealSubmit: 'Seal and Submit for Investigation',
            footerTitle: 'AgriWise Decision Support Framework v3.0',
            footerDesc: 'Protecting the livelihood of Indian Farmers through transparency',
            officialLinks: [
                { label: 'Agmarknet (இந்திய அரசு)', url: 'https://agmarknet.gov.in/', icon: '🇮🇳' },
                { label: 'e-NAM (டிஜிட்டல் சந்தை)', url: 'https://www.enam.gov.in/', icon: '🖥️' },
                { label: 'NHB (தோட்டக்கலை வாரியம்)', url: 'https://nhb.gov.in/OnlineStats/ArrivalAndPriceReports.aspx', icon: '🍎' }
            ],
            schemesList: [
                { name: 'PM-கிசான் சம்மான் நிதி', benefit: '₹6,000 ஆண்டு வருமான ஆதரவு', link: 'https://pmkisan.gov.in/' },
                { name: 'ஃபசல் பீமா யோஜனா', benefit: 'குறைந்த செலவில் பயிர் காப்பீடு', link: 'https://pmfby.gov.in/' },
                { name: 'கிசான் கிரெடிட் கார்டு (KCC)', benefit: '4% வட்டி விகிதத்தில் கடன்கள்', link: 'https://www.myscheme.gov.in/schemes/kcc' },
                { name: 'மண் சுகாதார அட்டை', benefit: 'இலவச மண் பரிசோதனை & அறிக்கைகள்', link: 'https://soilhealth.dac.gov.in/' }
            ],
            symptoms: {
                yellowing: 'மஞ்சள் இலைகள்',
                spots: 'பழுப்பு/கருப்பு புள்ளிகள்',
                holes: 'இலைகளில் துளைகள்',
                wilting: 'வாடுதல்/தொங்குதல்',
                pests: 'தெரியும் பூச்சிகள்'
            },
            diagnosis: {
                nitrogen: { title: 'நைட்ரஜன் குறைபாடு', remedy: 'யூரியா அல்லது இயற்கை உரத்தைப் பயன்படுத்துங்கள். மண் ஈரப்பதத்தை சரிபார்க்கவும்.' },
                fungal: { title: 'பூஞ்சை தொற்று (கருகல்)', remedy: 'தாமிரம் சார்ந்த பூஞ்சைக் கொல்லியைப் பயன்படுத்தவும். மேல்நிலை நீர்ப்பாசனத்தைத் தவிர்க்கவும்.' },
                pest: { title: 'அஃபிட்/கம்பளிப்பூச்சி தாக்கம்', remedy: 'வேப்ப எண்ணெய் அல்லது பரிந்துரைக்கப்பட்ட பூச்சிக்கொல்லியை தெளிக்கவும்.' },
                general: { title: 'பொதுவான ஊட்டச்சத்து அழுத்தம்', remedy: 'சீரான NPK பயன்பாடு மற்றும் நிலையான நீர்ப்பாசனம் தேவை.' }
            },
            quickLinks: {
                pmKisan: 'PM-கிசான் (வருமானம்)',
                pmfby: 'PMFBY (காப்பீடு)',
                kcc: 'KCC (குறைந்த வட்டி)',
                back: 'பின்னால்'
            }
        },
        ml: {
            title: 'തീരുമാന പിന്തുണയും സഹായവും',
            subtitle: 'അറിവ് ശക്തിയാണ്. ഇന്ന് ഞങ്ങൾക്ക് നിങ്ങളെ എങ്ങനെ സഹായിക്കാനാകും?',
            voiceCall: 'വോയ്‌സ് സഹായം',
            voiceDesc: '24/7 ലഭ്യമാണ്',
            whatsapp: 'വാട്ട്‌സ്ആപ്പ് ചാറ്റ്',
            whatsappDesc: 'ദ്രുത പ്രതികരണം',
            smsIvr: 'SMS/IVR വിവരങ്ങൾ',
            smsDesc: '*123# ഡയൽ ചെയ്യുക',
            faqs: 'ദ്രുത മാർഗ്ഗനിർദ്ദേശം',
            marketTitle: 'മാർക്കറ്റ് & വിലനിർണ്ണയം',
            marketDesc: 'വില ചാർട്ടുകൾ എങ്ങനെ ഉപയോഗിക്കാമെന്നും ലാഭത്തിനായി എപ്പോൾ വിൽക്കാമെന്നും മനസിലാക്കുക.',
            portalBtn: 'പോർട്ടൽ പര്യവേക്ഷണം ചെയ്യുക →',
            diagnosticTitle: 'വിള ആരോഗ്യ രോഗനിർണയം',
            diagnosticDesc: 'കീടങ്ങൾ, രോഗങ്ങൾ, പോഷകങ്ങളുടെ കുറവുകൾ എന്നിവ നിമിഷങ്ങൾക്കുള്ളിൽ തിരിച്ചറിയുക.',
            diagnosticBtn: 'ഡയഗ്നോസ്റ്റിക് ടൂൾ തുറക്കുക →',
            schemeTitle: 'പ്രീമിയം സ്കീം പോർട്ടൽ',
            schemeDesc: 'യോഗ്യതാ പരിശോധനകളോടെ കേന്ദ്ര, സംസ്ഥാന സബ്‌സിഡികളുടെ പൂർണ്ണ ലിസ്റ്റ് പര്യവേക്ഷണം ചെയ്യുക.',
            schemeBtn: 'പോർട്ടൽ നൽകുക →',
            subsidyTitle: 'സബ്‌സിഡി ദ്രുത പരിശോധന',
            subsidyDesc: 'യോഗ്യത ഫാസ്റ്റ് ട്രാക്ക്',
            subsidyText: 'ഏറ്റവും പ്രചാരമുള്ള 3 സ്കീമുകൾക്കായുള്ള നിങ്ങളുടെ അടിസ്ഥാന യോഗ്യത വേഗത്തിൽ പരിശോധിച്ചുറപ്പിക്കുക.',
            findNow: 'യോഗ്യത പരിശോധിക്കുക →',
            disputeTitle: 'തർക്ക പരിഹാരം',
            disputeDesc: 'എല്ലാവർക്കും നീതി. വാങ്ങുന്നവർ അല്ലെങ്കിൽ പേയ്‌മെന്റുകൾ എന്നിവയിലെ പ്രശ്നങ്ങൾ റിപ്പോർട്ട് ചെയ്യുക.',
            reportBtn: 'പ്രശ്നം റിപ്പോർട്ട് ചെയ്യുക',
            closeBtn: 'റിപ്പോർട്ട് അടയ്ക്കുക',
            back: 'ഹോമിലേക്ക് മടങ്ങുക',
            selectLang: 'ഭാഷ തിരഞ്ഞെടുക്കുക',
            doctorTitle: 'AI Crop Doctor',
            selectSymptom: 'Select Symptom',
            analyzeBtn: 'Get Analysis',
            resultsTitle: 'Diagnosis Results',
            issueLabel: 'Possible Issue',
            actionLabel: 'Recommended Action',
            lodgeDispute: 'Lodge a Dispute',
            orderIdLabel: 'Order ID',
            issueTypeLabel: 'Issue Type',
            descLabel: 'Description',
            submitBtn: 'Submit Report',
            sending: 'Sending...',
            paymentIssue: 'Payment Issue',
            qualityIssue: 'Quality Dispute',
            logisticsIssue: 'Logistics Delay',
            step1: 'Step 1: Identify Symptoms',
            stepAnalyze: 'Generate Analysis →',
            analysisResult: 'Analysis Result',
            likelyCase: 'Likely Case:',
            chatExpert: 'Chat with Expert',
            resetTool: 'Reset Tool',
            mkTitle: 'Market Intelligence Portal',
            officialLinksTitle: 'Official Pricing Links',
            officialLinksDesc: 'Access official government dashboards for real-time Mandi arrivals and pricing across India.',
            pricingStrategyTitle: 'Pricing Strategy',
            pricingStrategyDesc: 'Never sell in haste. Check the 3-month trend on our **Market Prices** dashboard. If its a surplus season, consider dry storage to sell when supply drops.',
            viewTrends: 'View Market Trends',
            centralSchemes: 'Central Gov Schemes',
            needHelp: 'Need Help Applying?',
            helpDesc: "Don't let paperwork stop you. Our experts can help you fill forms over WhatsApp.",
            getHelp: 'Get Expert Help',
            submitReq: 'Submit Investigation Request',
            buyerDetail: 'Buyer Detail',
            buyerPlaceholder: 'Company or Individual Name',
            orderRef: 'Order Ref',
            orderPlaceholder: '#ID-2024-XXXX',
            issueCategory: 'Issue Category',
            issuePlaceholder: 'What went wrong?',
            issueOptions: {
                payment: 'Delayed Payment',
                price: 'Agreed Price Dispute',
                delivery: 'Pickup Refusal',
                quality: 'Unfair Grading'
            },
            addDetails: 'Additional Details',
            detailsPlaceholder: 'Describe the problem...',
            registering: 'Registering...',
            reportSuccess: 'Report Received! ✅',
            sealSubmit: 'Seal and Submit for Investigation',
            footerTitle: 'AgriWise Decision Support Framework v3.0',
            footerDesc: 'Protecting the livelihood of Indian Farmers through transparency',
            officialLinks: [
                { label: 'Agmarknet (ഇന്ത്യൻ സർക്കാർ)', url: 'https://agmarknet.gov.in/', icon: '🇮🇳' },
                { label: 'e-NAM (ഡിജിറ്റൽ മാർക്കറ്റ്)', url: 'https://www.enam.gov.in/', icon: '🖥️' },
                { label: 'NHB (ഹോർട്ടികൾച്ചർ ബോർഡ്)', url: 'https://nhb.gov.in/OnlineStats/ArrivalAndPriceReports.aspx', icon: '🍎' }
            ],
            schemesList: [
                { name: 'പിഎം-കിസാൻ സമ്മാൻ നിധി', benefit: '₹6,000 വാർഷിക വരുമാന പിന്തുണ', link: 'https://pmkisan.gov.in/' },
                { name: 'ഫസൽ ബീമാ യോജന', benefit: 'കുറഞ്ഞ ചിലവിൽ വിള ഇൻഷുറൻസ്', link: 'https://pmfby.gov.in/' },
                { name: 'കിസാൻ ക്രെഡിറ്റ് കാർഡ് (KCC)', benefit: '4% പലിശ നിരക്കിൽ വായ്പകൾ', link: 'https://www.myscheme.gov.in/schemes/kcc' },
                { name: 'സോയിൽ ഹെൽത്ത് കാർഡ്', benefit: 'സൗജന്യ മണ്ണ് പരിശോധനയും റിപ്പോർട്ടുകളും', link: 'https://soilhealth.dac.gov.in/' }
            ],
            symptoms: {
                yellowing: 'മഞ്ഞ ഇലകൾ',
                spots: 'തവിട്ട്/കറുത്ത പാടുകൾ',
                holes: 'ഇലകളിലെ ദ്വാരങ്ങൾ',
                wilting: 'വാടിപ്പോകുക/തൂങ്ങുക',
                pests: 'ദൃശ്യമായ പ്രാണികൾ'
            },
            diagnosis: {
                nitrogen: { title: 'നൈട്രജന്റെ കുറവ്', remedy: 'യൂറിയ അല്ലെങ്കിൽ ജൈവവളം പ്രയോഗിക്കുക. മണ്ണിന്റെ ഈർപ്പം പരിശോധിക്കുക.' },
                fungal: { title: 'ഫംഗസ് അണുബാധ (ബ്ലൈറ്റ്)', remedy: 'ചെമ്പ് അടിസ്ഥാനമാക്കിയുള്ള കുമിൾനാശിനി ഉപയോഗിക്കുക. ഓവർഹെഡ് നനവ് ഒഴിവാക്കുക.' },
                pest: { title: 'മുഞ്ഞ/കാറ്റർപില്ലർ ബാധ', remedy: 'വേപ്പെണ്ണ അല്ലെങ്കിൽ ശുപാർശ ചെയ്യുന്ന കീടനാശിനി തളിക്കുക.' },
                general: { title: 'പൊതുവായ പോഷക സമ്മർദ്ദം', remedy: 'സന്തുലിതമായ NPK പ്രയോഗവും സ്ഥിരമായ ജലസേചനവും ആവശ്യമാണ്.' }
            },
            quickLinks: {
                pmKisan: 'പിഎം-കിസാൻ (വരുമാനം)',
                pmfby: 'PMFBY (ഇൻഷുറൻസ്)',
                kcc: 'KCC (കുറഞ്ഞ പലിശ)',
                back: 'തിരികെ'
            }
        },
        kn: {
            title: 'ನಿರ್ಧಾರ ಬೆಂಬಲ ಮತ್ತು ಸಹಾಯ',
            subtitle: 'ಜ್ಞಾನವೇ ಶಕ್ತಿ. ಇಂದು ನಾವು ನಿಮಗೆ ಹೇಗೆ ಸಹಾಯ ಮಾಡಬಹುದು?',
            voiceCall: 'ಧ್ವನಿ ಸಹಾಯ',
            voiceDesc: '24/7 ಲಭ್ಯವಿದೆ',
            whatsapp: 'ವಾಟ್ಸಾಪ್ ಚಾಟ್',
            whatsappDesc: 'ತ್ವರಿತ ಪ್ರತಿಕ್ರಿಯೆ',
            smsIvr: 'SMS/IVR ಮಾಹಿತಿ',
            smsDesc: '*123# ಡಯಲ್ ಮಾಡಿ',
            faqs: 'ತ್ವರಿತ ಮಾರ್ಗದರ್ಶನ',
            marketTitle: 'ಮಾರುಕಟ್ಟೆ ಮತ್ತು ಬೆಲೆ',
            marketDesc: 'ಬೆಲೆ ಚಾರ್ಟ್‌ಗಳನ್ನು ಹೇಗೆ ಬಳಸುವುದು ಮತ್ತು ಲಾಭಕ್ಕಾಗಿ ಯಾವಾಗ ಮಾರಾಟ ಮಾಡಬೇಕೆಂದು ತಿಳಿಯಿರಿ.',
            portalBtn: 'ಪೋರ್ಟಲ್ ಅನ್ವೇಷಿಸಿ →',
            diagnosticTitle: 'ಬೆಳೆ ಆರೋಗ್ಯ ರೋಗನಿರ್ಣಯ',
            diagnosticDesc: 'ಕೀಟಗಳು, ರೋಗಗಳು ಮತ್ತು ಪೋಷಕಾಂಶಗಳ ಕೊರತೆಯನ್ನು ಸೆಕೆಂಡುಗಳಲ್ಲಿ ಗುರುತಿಸಿ.',
            diagnosticBtn: 'ರೋಗನಿರ್ಣಯದ ಪರಿಕರವನ್ನು ತೆರೆಯಿರಿ →',
            schemeTitle: 'ಪ್ರೀಮಿಯಂ ಯೋಜನೆ ಪೋರ್ಟಲ್',
            schemeDesc: 'ಅರ್ಹತಾ ಪರಿಶೀಲನೆಗಳೊಂದಿಗೆ ಕೇಂದ್ರ ಮತ್ತು ರಾಜ್ಯ ಸಬ್ಸಿಡಿಗಳ ಪೂರ್ಣ ಪಟ್ಟಿಯನ್ನು ಅನ್ವೇಷಿಸಿ.',
            schemeBtn: 'ಪೋರ್ಟಲ್ ನಮೂದಿಸಿ →',
            subsidyTitle: 'ಸಬ್ಸಿಡಿ ತ್ವರಿತ ಪರಿಶೀಲನೆ',
            subsidyDesc: 'ಅರ್ಹತೆ ಫಾಸ್ಟ್ ಟ್ರ್ಯಾಕ್',
            subsidyText: '3 ಅತ್ಯಂತ ಜನಪ್ರಿಯ ಯೋಜನೆಗಳಿಗಾಗಿ ನಿಮ್ಮ ಮೂಲ ಅರ್ಹತೆಯನ್ನು ತ್ವರಿತವಾಗಿ ಪರಿಶೀಲಿಸಿ.',
            findNow: 'ಅರ್ಹತೆಯನ್ನು ಪರಿಶೀಲಿಸಿ →',
            disputeTitle: 'ವಿವಾದ ಪರಿಹಾರ',
            disputeDesc: 'ಎಲ್ಲರಿಗೂ ನ್ಯಾಯ. ಖರೀದಿದಾರರು ಅಥವಾ ಪಾವತಿಗಳ ಸಮಸ್ಯೆಗಳನ್ನು ವರದಿ ಮಾಡಿ.',
            reportBtn: 'ಸಮಸ್ಯೆಯನ್ನು ವರದಿ ಮಾಡಿ',
            closeBtn: 'ವರದಿಯನ್ನು ಮುಚ್ಚಿ',
            back: 'ಮುಖಪುಟಕ್ಕೆ ಹಿಂತಿರುಗಿ',
            selectLang: 'ಭಾಷೆಯನ್ನು ಆರಿಸಿ',
            doctorTitle: 'AI Crop Doctor',
            selectSymptom: 'Select Symptom',
            analyzeBtn: 'Get Analysis',
            resultsTitle: 'Diagnosis Results',
            issueLabel: 'Possible Issue',
            actionLabel: 'Recommended Action',
            lodgeDispute: 'Lodge a Dispute',
            orderIdLabel: 'Order ID',
            issueTypeLabel: 'Issue Type',
            descLabel: 'Description',
            submitBtn: 'Submit Report',
            sending: 'Sending...',
            paymentIssue: 'Payment Issue',
            qualityIssue: 'Quality Dispute',
            logisticsIssue: 'Logistics Delay',
            step1: 'Step 1: Identify Symptoms',
            stepAnalyze: 'Generate Analysis →',
            analysisResult: 'Analysis Result',
            likelyCase: 'Likely Case:',
            chatExpert: 'Chat with Expert',
            resetTool: 'Reset Tool',
            mkTitle: 'Market Intelligence Portal',
            officialLinksTitle: 'Official Pricing Links',
            officialLinksDesc: 'Access official government dashboards for real-time Mandi arrivals and pricing across India.',
            pricingStrategyTitle: 'Pricing Strategy',
            pricingStrategyDesc: 'Never sell in haste. Check the 3-month trend on our **Market Prices** dashboard. If its a surplus season, consider dry storage to sell when supply drops.',
            viewTrends: 'View Market Trends',
            centralSchemes: 'Central Gov Schemes',
            needHelp: 'Need Help Applying?',
            helpDesc: "Don't let paperwork stop you. Our experts can help you fill forms over WhatsApp.",
            getHelp: 'Get Expert Help',
            submitReq: 'Submit Investigation Request',
            buyerDetail: 'Buyer Detail',
            buyerPlaceholder: 'Company or Individual Name',
            orderRef: 'Order Ref',
            orderPlaceholder: '#ID-2024-XXXX',
            issueCategory: 'Issue Category',
            issuePlaceholder: 'What went wrong?',
            issueOptions: {
                payment: 'Delayed Payment',
                price: 'Agreed Price Dispute',
                delivery: 'Pickup Refusal',
                quality: 'Unfair Grading'
            },
            addDetails: 'Additional Details',
            detailsPlaceholder: 'Describe the problem...',
            registering: 'Registering...',
            reportSuccess: 'Report Received! ✅',
            sealSubmit: 'Seal and Submit for Investigation',
            footerTitle: 'AgriWise Decision Support Framework v3.0',
            footerDesc: 'Protecting the livelihood of Indian Farmers through transparency',
            officialLinks: [
                { label: 'Agmarknet (ಭಾರತ ಸರ್ಕಾರ)', url: 'https://agmarknet.gov.in/', icon: '🇮🇳' },
                { label: 'e-NAM (ಡಿಜಿಟಲ್ ಮಾರುಕಟ್ಟೆ)', url: 'https://www.enam.gov.in/', icon: '🖥️' },
                { label: 'NHB (ತೋಟಗಾರಿಕಾ ಮಂಡಳಿ)', url: 'https://nhb.gov.in/OnlineStats/ArrivalAndPriceReports.aspx', icon: '🍎' }
            ],
            schemesList: [
                { name: 'ಪಿಎಂ-ಕಿಸಾನ್ ಸಮ್ಮಾನ್ ನಿಧಿ', benefit: '₹6,000 ವಾರ್ಷಿಕ ಆದಾಯ ಬೆಂಬಲ', link: 'https://pmkisan.gov.in/' },
                { name: 'ಫಸಲ್ ಬೀಮಾ ಯೋಜನೆ', benefit: 'ಕಡಿಮೆ ವೆಚ್ಚದ ಬೆಳೆ ವಿಮೆ', link: 'https://pmfby.gov.in/' },
                { name: 'ಕಿಸಾನ್ ಕ್ರೆಡಿಟ್ ಕಾರ್ಡ್ (KCC)', benefit: '4% ಬಡ್ಡಿ ದರದಲ್ಲಿ ಸಾಲಗಳು', link: 'https://www.myscheme.gov.in/schemes/kcc' },
                { name: 'ಮಣ್ಣಿನ ಆರೋಗ್ಯ ಕಾರ್ಡ್', benefit: 'ಉಚಿತ ಮಣ್ಣು ಪರೀಕ್ಷೆ ಮತ್ತು ವರದಿಗಳು', link: 'https://soilhealth.dac.gov.in/' }
            ],
            symptoms: {
                yellowing: 'ಹಳದಿ ಎಲೆಗಳು',
                spots: 'ಕಂದು/ಕಪ್ಪು ಕಲೆಗಳು',
                holes: 'ಎಲೆಗಳಲ್ಲಿ ರಂಧ್ರಗಳು',
                wilting: 'ಬಾಡೂವುದು/ಜೋತು ಬೀಳುವುದು',
                pests: 'ಕಾಣುವ ಕೀಟಗಳು'
            },
            diagnosis: {
                nitrogen: { title: 'ಾರಜನಕ ಕೊರತೆ', remedy: 'ಯೂರಿಯಾ ಅಥವಾ ಸಾವಯವ ಗೊಬ್ಬರವನ್ನು ಅನ್ವಯಿಸಿ. ಮಣ್ಣಿನ ತೇವಾಂಶವನ್ನು ಪರಿಶೀಲಿಸಿ.' },
                fungal: { title: 'ಫಂಗಲ್ ಸೋಂಕು (ಬ್ಲೈಟ್)', remedy: 'ತಾಮ್ರ ಆಧಾರಿತ ಶಿಲೀಂಧ್ರನಾಶಕವನ್ನು ಬಳಸಿ. ಓವರ್ಹೆಡ್ ನೀರುಹಾಕುವುದು ತಪ್ಪಿಸಿ.' },
                pest: { title: 'ಗಿಡಹೇನು/ಕಂಬಳಿ ಹುಳು ಬಾಧೆ', remedy: 'ಬೇವವಿನ ಎಣ್ಣೆ ಅಥವಾ ಶಿಫಾರಸು ಮಾಡಿದ ಕೀಟನಾಶಕವನ್ನು ಸಿಂಪಡಿಸಿ.' },
                general: { title: 'ಸಾಮಾನ್ಯ ಪೋಷಕಾಂಶಗಳ ಒತ್ತಡ', remedy: 'ಸಮತೋಲಿತ NPK ಅಪ್ಲಿಕೇಶನ್ ಮತ್ತು ಸ್ಥಿರವಾದ ನೀರಾವರಿ ಅಗತ್ಯವಿದೆ.' }
            },
            quickLinks: {
                pmKisan: 'ಪಿಎಂ-ಕಿಸಾನ್ (ಆದಾಯ)',
                pmfby: 'PMFBY (ವಿಮೆ)',
                kcc: 'KCC (ಕಡಿಮೆ ಬಡ್ಡಿ)',
                back: 'ಹಿಂದೆ'
            }
        },
        pa: {
            title: 'ਫੈਸਲਾ ਸਹਾਇਤਾ ਅਤੇ ਮਦਦ',
            subtitle: 'ਗਿਆਨ ਹੀ ਸ਼ਕਤੀ ਹੈ। ਅੱਜ ਅਸੀਂ ਤੁਹਾਡੀ ਕਿਵੇਂ ਮਦਦ ਕਰ ਸਕਦੇ ਹਾਂ?',
            voiceCall: 'ਵਾਇਸ ਮਦਦ',
            voiceDesc: '24/7 ਉਪਲਬਧ',
            whatsapp: 'ਵਟਸਐਪ ਚੈਟ',
            whatsappDesc: 'ਤੇਜ਼ ਜਵਾਬ',
            smsIvr: 'SMS/IVR ਜਾਣਕਾਰੀ',
            smsDesc: '*123# ਡਾਇਲ ਕਰੋ',
            faqs: 'ਤੁਰੰਤ ਮਾਰਗਦਰਸ਼ਨ',
            marketTitle: 'ਮਾਰਕੀਟ ਅਤੇ ਕੀਮਤ',
            marketDesc: 'ਕੀਮਤ ਚਾਰਟ ਦੀ ਵਰਤੋਂ ਕਰਨਾ ਅਤੇ ਮੁਨਾਫੇ ਲਈ ਕਦੋਂ ਵੇਚਣਾ ਹੈ ਸਿੱਖੋ।',
            portalBtn: 'ਪੋਰਟਲ ਦੀ ਪੜਚੋਲ ਕਰੋ →',
            diagnosticTitle: 'ਫਸਲ ਸਿਹਤ ਜਾਂਚ',
            diagnosticDesc: 'ਕੀੜਿਆਂ, ਬਿਮਾਰੀਆਂ ਅਤੇ ਪੌਸ਼ਟਿਕ ਤੱਤਾਂ ਦੀ ਕਮੀ ਨੂੰ ਸਕਿੰਟਾਂ ਵਿੱਚ ਪਛਾਣੋ।',
            diagnosticBtn: 'ਜਾਂਚ ਟੂਲ ਖੋਲ੍ਹੋ →',
            schemeTitle: 'ਪ੍ਰੀਮੀਅਮ ਸਕੀਮ ਪੋਰਟਲ',
            schemeDesc: 'ਯੋਗਤਾ ਜਾਂਚਾਂ ਦੇ ਨਾਲ ਕੇਂਦਰੀ ਅਤੇ ਰਾਜ ਸਬਸਿਡੀਆਂ ਦੀ ਪੂਰੀ ਸੂਚੀ ਦੀ ਪੜਚੋਲ ਕਰੋ।',
            schemeBtn: 'ਪੋਰਟਲ ਦਾਖਲ ਕਰੋ →',
            subsidyTitle: 'ਸਬਸਿਡੀ ਤੇਜ਼ ਜਾਂਚ',
            subsidyDesc: 'ਯੋਗਤਾ ਤੇਜ਼ ਟਰੈਕ',
            subsidyText: '3 ਸਭ ਤੋਂ ਪ੍ਰਸਿੱਧ ਸਕੀਮਾਂ ਲਈ ਆਪਣੀ ਮੂਲ ਯੋਗਤਾ ਦੀ ਜਲਦੀ ਜਾਂਚ ਕਰੋ।',
            findNow: 'ਯੋਗਤਾ ਦੀ ਜਾਂਚ ਕਰੋ →',
            disputeTitle: 'ਝਗੜਾ ਨਿਪਟਾਰਾ',
            disputeDesc: 'ਸਭ ਲਈ ਇਨਸਾਫ। ਖਰੀਦਦਾਰਾਂ ਜਾਂ ਭੁਗਤਾਨਾਂ ਦੀਆਂ ਸਮੱਸਿਆਵਾਂ ਦੀ ਰਿਪੋਰਟ ਕਰੋ।',
            reportBtn: 'ਸਮੱਸਿਆ ਦੀ ਰਿਪੋਰਟ ਕਰੋ',
            closeBtn: 'ਰਿਪੋਰਟ ਬੰਦ ਕਰੋ',
            back: 'ਹੋਮ ਤੇ ਵਾਪਸ',
            selectLang: 'ਭਾਸ਼ਾ ਚੁਣੋ',
            doctorTitle: 'AI Crop Doctor',
            selectSymptom: 'Select Symptom',
            analyzeBtn: 'Get Analysis',
            resultsTitle: 'Diagnosis Results',
            issueLabel: 'Possible Issue',
            actionLabel: 'Recommended Action',
            lodgeDispute: 'Lodge a Dispute',
            orderIdLabel: 'Order ID',
            issueTypeLabel: 'Issue Type',
            descLabel: 'Description',
            submitBtn: 'Submit Report',
            sending: 'Sending...',
            paymentIssue: 'Payment Issue',
            qualityIssue: 'Quality Dispute',
            logisticsIssue: 'Logistics Delay',
            step1: 'Step 1: Identify Symptoms',
            stepAnalyze: 'Generate Analysis →',
            analysisResult: 'Analysis Result',
            likelyCase: 'Likely Case:',
            chatExpert: 'Chat with Expert',
            resetTool: 'Reset Tool',
            mkTitle: 'Market Intelligence Portal',
            officialLinksTitle: 'Official Pricing Links',
            officialLinksDesc: 'Access official government dashboards for real-time Mandi arrivals and pricing across India.',
            pricingStrategyTitle: 'Pricing Strategy',
            pricingStrategyDesc: 'Never sell in haste. Check the 3-month trend on our **Market Prices** dashboard. If its a surplus season, consider dry storage to sell when supply drops.',
            viewTrends: 'View Market Trends',
            centralSchemes: 'Central Gov Schemes',
            needHelp: 'Need Help Applying?',
            helpDesc: "Don't let paperwork stop you. Our experts can help you fill forms over WhatsApp.",
            getHelp: 'Get Expert Help',
            submitReq: 'Submit Investigation Request',
            buyerDetail: 'Buyer Detail',
            buyerPlaceholder: 'Company or Individual Name',
            orderRef: 'Order Ref',
            orderPlaceholder: '#ID-2024-XXXX',
            issueCategory: 'Issue Category',
            issuePlaceholder: 'What went wrong?',
            issueOptions: {
                payment: 'Delayed Payment',
                price: 'Agreed Price Dispute',
                delivery: 'Pickup Refusal',
                quality: 'Unfair Grading'
            },
            addDetails: 'Additional Details',
            detailsPlaceholder: 'Describe the problem...',
            registering: 'Registering...',
            reportSuccess: 'Report Received! ✅',
            sealSubmit: 'Seal and Submit for Investigation',
            footerTitle: 'AgriWise Decision Support Framework v3.0',
            footerDesc: 'Protecting the livelihood of Indian Farmers through transparency',
            officialLinks: [
                { label: 'Agmarknet (ਭਾਰਤ ਸਰਕਾਰ)', url: 'https://agmarknet.gov.in/', icon: '🇮🇳' },
                { label: 'e-NAM (ਡਿਜੀਟਲ ਮਾਰਕੀਟ)', url: 'https://www.enam.gov.in/', icon: '🖥️' },
                { label: 'NHB (ਬਾਗਬਾਨੀ ਬੋਰਡ)', url: 'https://nhb.gov.in/OnlineStats/ArrivalAndPriceReports.aspx', icon: '🍎' }
            ],
            schemesList: [
                { name: 'ਪ੍ਰਧਾਨ ਮੰਤਰੀ ਕਿਸਾਨ ਸਨਮਾਨ ਨਿਧੀ', benefit: '₹6,000 ਸਾਲਾਨਾ ਆਮਦਨ ਸਹਾਇਤਾ', link: 'https://pmkisan.gov.in/' },
                { name: 'ਫਸਲ ਬੀਮਾ ਯੋਜਨਾ', benefit: 'ਘੱਟ ਲਾਗਤ ਵਾਲਾ ਫਸਲ ਬੀਮਾ', link: 'https://pmfby.gov.in/' },
                { name: 'ਕਿਸਾਨ ਕ੍ਰੈਡਿਟ ਕਾਰਡ (KCC)', benefit: '4% ਵਿਆਜ ਦਰ \'ਤੇ ਕਰਜ਼ੇ', link: 'https://www.myscheme.gov.in/schemes/kcc' },
                { name: 'ਮਿੱਟੀ ਸਿਹਤ ਕਾਰਡ', benefit: 'ਮੁਫਤ ਮਿੱਟੀ ਪਰਖ ਅਤੇ ਰਿਪੋਰਟਾਂ', link: 'https://soilhealth.dac.gov.in/' }
            ],
            symptoms: {
                yellowing: 'ਪੀਲੇ ਪੱਤੇ',
                spots: 'ਭੂਰੇ/ਕਾਲੇ ਚਟਾਕ',
                holes: 'ਪੱਤਿਆਂ ਵਿੱਚ ਛੇਕ',
                wilting: 'ਮੁਰਝਾਉਣਾ/ਝੁਕਣਾ',
                pests: 'ਦਿਸਣਯੋਗ ਕੀੜੇ'
            },
            diagnosis: {
                nitrogen: { title: 'ਨਾਈਟ੍ਰੋਜਨ ਦੀ ਕਮੀ', remedy: 'ਯੂਰੀਆ ਜਾਂ ਜੈਵਿਕ ਖਾਦ ਪਾਓ। ਮਿੱਟੀ ਦੀ ਨਮੀ ਦੀ ਜਾਂਚ ਕਰੋ।' },
                fungal: { title: 'ਉੱਲੀ ਦਾ ਸੰਕਰਮਣ (ਬਲਾਇਟ)', remedy: 'ਕਾਪਰ-ਅਧਾਰਤ ਉੱਲੀਨਾਸ਼ਕ ਦੀ ਵਰਤੋਂ ਕਰੋ। ਉੱਪਰੋਂ ਪਾਣੀ ਦੇਣ ਤੋਂ ਬਚੋ।' },
                pest: { title: 'ਐਫੀਡ/ਕੈਟਰਪਿਲਰ ਦਾ ਹਮਲਾ', remedy: 'ਨੀਮ ਦੇ ਤੇਲ ਜਾਂ ਸਿਫ਼ਾਰਸ਼ ਕੀਤੇ ਕੀਟਨਾਸ਼ਕ ਦਾ ਛਿੜਕਾਅ ਕਰੋ।' },
                general: { title: 'ਆਮ ਪੌਸ਼ਟਿਕ ਤਣਾਅ', remedy: 'ਸੰਤੁਲਿਤ NPK ਐਪਲੀਕੇਸ਼ਨ ਅਤੇ ਲਗਾਤਾਰ ਸਿੰਚਾਈ ਦੀ ਲੋੜ ਹੈ।' }
            },
            quickLinks: {
                pmKisan: 'ਪੀਐਮ-ਕਿਸਾਨ (ਆਮਦਨ)',
                pmfby: 'PMFBY (ਬੀਮਾ)',
                kcc: 'KCC (ਘੱਟ ਵਿਆਜ)',
                back: 'ਵਾਪਸ'
            }
        },
        mr: {
            title: 'निर्णय समर्थन आणि मदत',
            subtitle: 'ज्ञान हीच शक्ती आहे. आज आम्ही तुम्हाला कशी मदत करू शकतो?',
            voiceCall: 'व्हॉइस मदत',
            voiceDesc: '24/7 उपलब्ध',
            whatsapp: 'व्हॉट्सॲप चॅट',
            whatsappDesc: 'त्वरित प्रतिसाद',
            smsIvr: 'SMS/IVR माहिती',
            smsDesc: '*123# डायल करा',
            faqs: 'त्वरीत मार्गदर्शन',
            marketTitle: 'बाजार आणि किंमत',
            marketDesc: 'किंमत चार्ट कसे वापरावे आणि नफ्यासाठी कधी विक्री करावी हे शिका।',
            portalBtn: 'पोर्टल एक्सप्लोर करा →',
            diagnosticTitle: 'पीक आरोग्य निदान',
            diagnosticDesc: 'कीटक, रोग आणि पोषक तत्वांची कमतरता काही सेकंदात ओळखा।',
            diagnosticBtn: 'निदान साधन उघडा →',
            schemeTitle: 'प्रीमियम योजना पोर्टल',
            schemeDesc: 'पात्रता तपासणीसह केंद्रीय आणि राज्य अनुदानांची संपूर्ण यादी पहा।',
            schemeBtn: 'पोर्टल प्रविष्ट करा →',
            subsidyTitle: 'अनुदान त्वरित तपासणी',
            subsidyDesc: 'पात्रता फास्ट ट्रॅक',
            subsidyText: '3 सर्वात लोकप्रिय योजनांसाठी तुमची मूलभूत पात्रता त्वरित तपासा।',
            findNow: 'पात्रता तपासा →',
            disputeTitle: 'विवाद निवारण',
            disputeDesc: 'सर्वांसाठी न्याय। खरेदीदार किंवा पेमेंटमधील समस्यांची तक्रार करा।',
            reportBtn: 'समस्येची तक्रार करा',
            closeBtn: 'अहवाल बंद करा',
            back: 'होमवर परत जा',
            selectLang: 'भाषा निवडा',
            doctorTitle: 'AI Crop Doctor',
            selectSymptom: 'Select Symptom',
            analyzeBtn: 'Get Analysis',
            resultsTitle: 'Diagnosis Results',
            issueLabel: 'Possible Issue',
            actionLabel: 'Recommended Action',
            lodgeDispute: 'Lodge a Dispute',
            orderIdLabel: 'Order ID',
            issueTypeLabel: 'Issue Type',
            descLabel: 'Description',
            submitBtn: 'Submit Report',
            sending: 'Sending...',
            paymentIssue: 'Payment Issue',
            qualityIssue: 'Quality Dispute',
            logisticsIssue: 'Logistics Delay',
            step1: 'Step 1: Identify Symptoms',
            stepAnalyze: 'Generate Analysis →',
            analysisResult: 'Analysis Result',
            likelyCase: 'Likely Case:',
            chatExpert: 'Chat with Expert',
            resetTool: 'Reset Tool',
            mkTitle: 'Market Intelligence Portal',
            officialLinksTitle: 'Official Pricing Links',
            officialLinksDesc: 'Access official government dashboards for real-time Mandi arrivals and pricing across India.',
            pricingStrategyTitle: 'Pricing Strategy',
            pricingStrategyDesc: 'Never sell in haste. Check the 3-month trend on our **Market Prices** dashboard. If its a surplus season, consider dry storage to sell when supply drops.',
            viewTrends: 'View Market Trends',
            centralSchemes: 'Central Gov Schemes',
            needHelp: 'Need Help Applying?',
            helpDesc: "Don't let paperwork stop you. Our experts can help you fill forms over WhatsApp.",
            getHelp: 'Get Expert Help',
            submitReq: 'Submit Investigation Request',
            buyerDetail: 'Buyer Detail',
            buyerPlaceholder: 'Company or Individual Name',
            orderRef: 'Order Ref',
            orderPlaceholder: '#ID-2024-XXXX',
            issueCategory: 'Issue Category',
            issuePlaceholder: 'What went wrong?',
            issueOptions: {
                payment: 'Delayed Payment',
                price: 'Agreed Price Dispute',
                delivery: 'Pickup Refusal',
                quality: 'Unfair Grading'
            },
            addDetails: 'Additional Details',
            detailsPlaceholder: 'Describe the problem...',
            registering: 'Registering...',
            reportSuccess: 'Report Received! ✅',
            sealSubmit: 'Seal and Submit for Investigation',
            footerTitle: 'AgriWise Decision Support Framework v3.0',
            footerDesc: 'Protecting the livelihood of Indian Farmers through transparency',
            officialLinks: [
                { label: 'Agmarknet (भारत सरकार)', url: 'https://agmarknet.gov.in/', icon: '🇮🇳' },
                { label: 'e-NAM (डिजिटल मार्केट)', url: 'https://www.enam.gov.in/', icon: '🖥️' },
                { label: 'NHB (फलोत्पादन मंडळ)', url: 'https://nhb.gov.in/OnlineStats/ArrivalAndPriceReports.aspx', icon: '🍎' }
            ],
            schemesList: [
                { name: 'पीएम-किसान सन्मान निधी', benefit: '₹6,000 वार्षिक उत्पन्न मदत', link: 'https://pmkisan.gov.in/' },
                { name: 'पीक विमा योजना', benefit: 'कमी खर्चात पीक विमा', link: 'https://pmfby.gov.in/' },
                { name: 'किसान क्रेडिट कार्ड (KCC)', benefit: '4% व्याजदराने कर्ज', link: 'https://www.myscheme.gov.in/schemes/kcc' },
                { name: 'मृदा आरोग्य कार्ड', benefit: 'मोफत माती परीक्षण आणि अहवाल', link: 'https://soilhealth.dac.gov.in/' }
            ],
            symptoms: {
                yellowing: 'पिवळी पाने',
                spots: 'तपकिरी/काळे ठिपके',
                holes: 'पानांवर छिद्रे',
                wilting: 'सुकणे/वाकणे',
                pests: 'दिसणारे कीटक'
            },
            diagnosis: {
                nitrogen: { title: 'नायट्रोजन कमतरता', remedy: 'युरिया किंवा सेंद्रिय खत वापरा। जमिनीतील ओलावा तपासा।' },
                fungal: { title: 'बुरशीजन्य संसर्ग (ब्लाइट)', remedy: 'कॉपर-आधारित बुरशीनाशक वापरा। पाणी वरून देणे टाळा।' },
                pest: { title: 'मावा/अळीचा प्रादुर्भाव', remedy: 'लिंबोळी तेल किंवा शिफारस केलेले कीटकनाशक फवारा।' },
                general: { title: 'सामान्य पोषक तणाव', remedy: 'संतुलित NPK वापर आणि सातत्यपूर्ण सिंचन आवश्यक आहे।' }
            },
            quickLinks: {
                pmKisan: 'पीएम-किसान (उत्पन्न)',
                pmfby: 'PMFBY (विमा)',
                kcc: 'KCC (कमी व्याज)',
                back: 'परत'
            }
        }
    };

    const t = translations[lang] || translations['en'];

    // Diagnostic Wizard Data - Dependent on translations
    const diagnosticSymptoms = [
        { id: 'yellowing', label: t.symptoms.yellowing, icon: '🍂' },
        { id: 'spots', label: t.symptoms.spots, icon: '🌑' },
        { id: 'holes', label: t.symptoms.holes, icon: '🕳️' },
        { id: 'wilting', label: t.symptoms.wilting, icon: '🥀' },
        { id: 'pests', label: t.symptoms.pests, icon: '🐛' }
    ];

    const getDiagnosis = () => {
        if (symptoms.includes('yellowing')) return t.diagnosis.nitrogen;
        if (symptoms.includes('spots')) return t.diagnosis.fungal;
        if (symptoms.includes('pests')) return t.diagnosis.pest;
        return t.diagnosis.general;
    };


    const handleQuerySubmit = async (e, type) => {
        e.preventDefault();
        setFormStatus('sending');
        const formData = new FormData(e.target);

        // Construct payload match functionality in BuyerSupport but adapted for Support
        const payload = {
            name: user?.name || formData.get('buyerName') || 'Farmer',
            email: user?.email,
            buyerName: formData.get('buyerName'),
            orderId: formData.get('orderId'),
            issue: formData.get('issue'),
            details: formData.get('details'),
            subject: type === 'dispute' ? 'Dispute: ' + formData.get('issue') : 'General Query',
            message: formData.get('details'),
            language: lang,
            type: type
        };

        try {
            // Use same endpoint logic 
            const endpoint = type === 'dispute' ? 'dispute' : 'query';
            const res = await fetch(`${import.meta.env.VITE_API_URL || `${import.meta.env.VITE_API_URL || "http://localhost:5001"}`}/api/support/${endpoint}`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload)
            });
            const data = await res.json();
            if (data.success) {
                setFormStatus('success');
                setTimeout(() => {
                    setShowDisputeForm(false);
                    setFormStatus('');
                    if (e.target.reset) e.target.reset();

                    // Refresh reports
                    if (user?.email) {
                        fetch(`${import.meta.env.VITE_API_URL || `${import.meta.env.VITE_API_URL || "http://localhost:5001"}`}/api/support/my-reports?email=${user.email}`)
                            .then(r => r.json())
                            .then(d => d.success && setMyReports(d.data));
                    }
                }, 2000);
            } else {
                setFormStatus('error');
            }
        } catch (err) {
            console.error("Submission failed", err);
            setFormStatus('error');
        }
    };

    return (
        <div className="min-h-screen bg-slate-50 pb-20 selection:bg-indigo-100">
            {/* Nav Header */}
            <div className="bg-white/80 backdrop-blur-md border-b border-slate-200 sticky top-0 z-50">
                <div className="max-w-5xl mx-auto px-6 py-5 flex justify-between items-center">
                    <button onClick={() => navigate('/')} className="flex items-center gap-3 text-slate-900 font-black text-lg group">
                        <span className="bg-slate-100 w-10 h-10 rounded-xl flex items-center justify-center group-hover:bg-indigo-600 group-hover:text-white transition-all">←</span>
                        <span>{t.back}</span>
                    </button>

                    <div className="flex items-center gap-4">
                        <button
                            onClick={() => setShowMyReports(true)}
                            className="relative p-2 rounded-xl hover:bg-slate-100 transition-all group"
                            title={t.quickLinks?.myReports || "My Reports"}
                        >
                            <span className="text-2xl">🔔</span>
                            {myReports.some(r => r.status !== 'resolved') && (
                                <span className="absolute top-0 right-0 w-3 h-3 bg-rose-500 rounded-full border-2 border-white animate-pulse"></span>
                            )}
                        </button>
                        <select
                            value={lang}
                            onChange={(e) => setLang(e.target.value)}
                            className="bg-slate-100 border-none rounded-2xl px-6 py-3 text-xs font-black uppercase tracking-widest text-indigo-700 outline-none cursor-pointer hover:bg-indigo-50 transition-all shadow-sm"
                        >
                            <option value="en">English (EN)</option>
                            <option value="hi">हिंदी (HI)</option>
                            <option value="te">తెలుగు (TE)</option>
                            <option value="ta">தமிழ் (TA)</option>
                            <option value="ml">മലയാളം (ML)</option>
                            <option value="kn">ಕನ್ನಡ (KN)</option>
                            <option value="pa">ਪੰਜਾਬੀ (PA)</option>
                            <option value="mr">मराठी (MR)</option>
                        </select>
                    </div>
                </div>
            </div>

            <div className="max-w-5xl mx-auto p-6 md:p-10">
                {activeView === 'main' && <MainView t={t} setActiveView={setActiveView} showDisputeForm={showDisputeForm} setShowDisputeForm={setShowDisputeForm} subsidyStep={subsidyStep} setSubsidyStep={setSubsidyStep} navigate={navigate} setFormType={setFormType}/>}
                {activeView === 'diagnostic' && <DiagnosticView t={t} setActiveView={setActiveView} diagnosticStep={diagnosticStep} setDiagnosticStep={setDiagnosticStep} symptoms={symptoms} setSymptoms={setSymptoms} getDiagnosis={getDiagnosis} />}
                {activeView === 'schemes' && <SchemePortalView t={t} setActiveView={setActiveView} />}
                {activeView === 'market' && <MarketView t={t} setActiveView={setActiveView} navigate={navigate} />}

                {/* Dispute Form (Shared) */}
                {showDisputeForm && (
                    <div className="mt-10 bg-white border-4 border-slate-900 rounded-[3rem] p-10 md:p-14 shadow-2xl space-y-8 animate-in slide-in-from-top duration-500">
                        {/* Custom Tabs */}
                        <div className="flex p-1 bg-slate-100 rounded-2xl mb-6">
                            <button
                                onClick={() => setFormType('query')}
                                className={`flex-1 py-4 rounded-xl font-black text-sm uppercase tracking-widest transition-all ${formType === 'query' ? 'bg-indigo-600 text-white shadow-lg' : 'text-slate-400 hover:text-slate-600'}`}
                            >
                                ❓ {t.formTabs?.query || 'General Query'}
                            </button>
                            <button
                                onClick={() => setFormType('dispute')}
                                className={`flex-1 py-4 rounded-xl font-black text-sm uppercase tracking-widest transition-all ${formType === 'dispute' ? 'bg-rose-600 text-white shadow-lg' : 'text-slate-400 hover:text-slate-600'}`}
                            >
                                ⚖️ {t.formTabs?.dispute || 'Raise Dispute'}
                            </button>
                        </div>

                        <form onSubmit={(e) => handleQuerySubmit(e, formType)} className="space-y-8">
                            <h2 className="text-3xl font-black text-slate-900 uppercase tracking-tighter">
                                {formType === 'dispute' ? t.submitReq : (t.formTabs?.query || 'Submit Query')}
                            </h2>

                            {formType === 'dispute' && (
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                    <div className="space-y-2">
                                        <label className="text-xs font-black text-slate-400 uppercase tracking-widest ml-1">{t.buyerDetail}</label>
                                        <input required name="buyerName" type="text" placeholder={t.buyerPlaceholder} className="w-full bg-slate-50 border-2 border-transparent focus:border-indigo-500 rounded-2xl px-6 py-5 outline-none transition-all font-bold" />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-xs font-black text-slate-400 uppercase tracking-widest ml-1">{t.orderRef}</label>
                                        <input required name="orderId" type="text" placeholder={t.orderPlaceholder} className="w-full bg-slate-50 border-2 border-transparent focus:border-indigo-500 rounded-2xl px-6 py-5 outline-none transition-all font-bold" />
                                    </div>
                                </div>
                            )}

                            <div className="space-y-2">
                                <label className="text-xs font-black text-slate-400 uppercase tracking-widest ml-1">{t.issueCategory}</label>
                                <select required name="issue" className="w-full bg-slate-50 border-2 border-transparent focus:border-indigo-500 rounded-2xl px-6 py-5 outline-none transition-all font-black text-slate-700">
                                    <option value="">{t.issuePlaceholder}</option>
                                    {formType === 'dispute' ? (
                                        <>
                                            <option value="payment">{t.issueOptions.payment}</option>
                                            <option value="price">{t.issueOptions.price}</option>
                                            <option value="delivery">{t.issueOptions.delivery}</option>
                                            <option value="quality">{t.issueOptions.quality}</option>
                                        </>
                                    ) : (
                                        <>
                                            <option value="crop_advisory">{t.queryOptions?.crop_advisory || 'Crop Advisory'}</option>
                                            <option value="scheme_help">{t.queryOptions?.scheme_help || 'Scheme Help'}</option>
                                            <option value="app_support">{t.queryOptions?.app_support || 'App Support'}</option>
                                            <option value="other">{t.queryOptions?.other || 'Other'}</option>
                                        </>
                                    )}
                                </select>
                            </div>

                            <div className="space-y-2">
                                <label className="text-xs font-black text-slate-400 uppercase tracking-widest ml-1">{t.addDetails}</label>
                                <textarea name="details" required rows="4" placeholder={t.detailsPlaceholder} className="w-full bg-slate-50 border-2 border-transparent focus:border-indigo-500 rounded-2xl px-6 py-5 outline-none transition-all font-bold resize-none"></textarea>
                            </div>
                            <button
                                disabled={formStatus === 'sending'}
                                className={`w-full py-6 rounded-[2rem] font-black text-xl shadow-2xl transition-all active:scale-95 ${formStatus === 'success' ? 'bg-emerald-500 text-white' : 'bg-slate-900 text-white'}`}
                            >
                                {formStatus === 'sending' ? t.registering : formStatus === 'success' ? t.reportSuccess : t.sealSubmit}
                            </button>
                        </form>
                    </div>
                )}
            </div>

            {/* Decorative Footer */}
            <div className="text-center p-14 bg-white border-t border-slate-200 mt-20">
                <p className="text-slate-300 font-black italic tracking-[0.2em] uppercase text-sm">{t.footerTitle}</p>
                <p className="text-slate-200 mt-2 font-medium">{t.footerDesc}</p>
            </div>
            {/* My Reports Modal */}
            {showMyReports && (
                <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4 backdrop-blur-sm animate-in fade-in duration-200">
                    <div className="bg-white rounded-[2rem] w-full max-w-2xl max-h-[80vh] overflow-hidden flex flex-col shadow-2xl animate-in zoom-in-95 duration-200">
                        <div className="p-8 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
                            <h3 className="text-2xl font-black text-slate-800 tracking-tight">{t.myReports || 'My Reports'}</h3>
                            <button onClick={() => setShowMyReports(false)} className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-400 hover:text-slate-600 hover:bg-slate-200 transition-all font-bold">✕</button>
                        </div>
                        <div className="p-8 overflow-y-auto">
                            {myReports.length === 0 ? (
                                <div className="text-center py-12 text-slate-400 border-2 border-dashed border-slate-100 rounded-3xl bg-slate-50/50">
                                    <p className="font-bold">No reports found.</p>
                                </div>
                            ) : (
                                <div className="space-y-4">
                                    {myReports.map((report) => (
                                        <div key={report._id} className="border border-slate-100 rounded-2xl p-6 hover:shadow-lg hover:border-indigo-100 transition-all bg-white group">
                                            <div className="flex justify-between items-start mb-4">
                                                <div>
                                                    <span className={`text-[10px] font-black uppercase tracking-widest px-3 py-1.5 rounded-full ${report.type === 'dispute' ? 'bg-rose-100 text-rose-600' : 'bg-blue-100 text-blue-600'
                                                        }`}>
                                                        {report.type}
                                                    </span>
                                                    <h4 className="font-bold text-slate-800 mt-3 text-lg">{report.subject}</h4>
                                                    <p className="text-xs font-bold text-slate-400 mt-1 uppercase tracking-wider">{new Date(report.createdAt).toLocaleDateString()}</p>
                                                </div>
                                                <div className="flex flex-col items-end">
                                                    <span className={`text-xs font-black uppercase tracking-widest px-4 py-2 rounded-full shadow-sm ${report.status === 'resolved' ? 'bg-emerald-500 text-white' :
                                                        report.status === 'in-progress' ? 'bg-amber-400 text-white' :
                                                            'bg-slate-200 text-slate-500'
                                                        }`}>
                                                        {report.status}
                                                    </span>
                                                </div>
                                            </div>
                                            <div className="bg-slate-50 p-4 rounded-xl text-sm font-medium text-slate-600">
                                                <p className="line-clamp-2">{report.details.message || report.details.details || report.details.issue}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Support;
