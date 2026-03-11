import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Package, Clock, CheckCircle, Truck, XCircle, Search, Calendar, User, ArrowLeft, ArrowRight, ShoppingBag, MapPin } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useLanguage } from './LanguageContext';

const translations = {
    en: {
        loadingOrders: "Loading Orders...",
        accessDenied: "Access Denied",
        loginToView: "Please log in to view your order history.",
        goBack: "Go Back",
        backToDashboard: "Back to Dashboard",
        myOrders: "My Orders",
        total: "Total",
        trackPurchases: "Track your purchases and view order history.",
        searchPlaceholder: "Search by ID, Farmer, or Crop...",
        noOrdersFound: "No orders found",
        noOrdersDesc: "You haven't placed any orders yet, or no orders match your search.",
        goToMarketplace: "Go to Marketplace",
        id: "ID",
        soldBy: "SOLD BY",
        deliveredTo: "DELIVERED TO",
        totalAmount: "TOTAL AMOUNT",
        currentStatus: "CURRENT STATUS",
        viewDetails: "View Details",
        qty: "Qty"
    },
    hi: {
        loadingOrders: "ऑर्डर लोड हो रहे हैं...",
        accessDenied: "पहुंच अस्वीकृत",
        loginToView: "अपना ऑर्डर इतिहास देखने के लिए कृपया लॉग इन करें।",
        goBack: "वापस जाएं",
        backToDashboard: "डैशबोर्ड पर वापस",
        myOrders: "मेरे ऑर्डर",
        total: "कुल",
        trackPurchases: "अपनी खरीदारी ट्रैक करें और ऑर्डर इतिहास देखें।",
        searchPlaceholder: "आईडी, किसान या फसल से खोजें...",
        noOrdersFound: "कोई ऑर्डर नहीं मिला",
        noOrdersDesc: "आपने अभी तक कोई ऑर्डर नहीं दिया है, या कोई ऑर्डर आपकी खोज से मेल नहीं खाता है।",
        goToMarketplace: "मार्केटप्लेस पर जाएं",
        id: "आईडी",
        soldBy: "विक्रेता",
        deliveredTo: "वितरण पता",
        totalAmount: "कुल राशि",
        currentStatus: "वर्तमान स्थिति",
        viewDetails: "विवरण देखें",
        qty: "मात्रा"
    },
    te: {
        loadingOrders: "ఆర్డర్‌లు లోడ్ అవుతున్నాయి...",
        accessDenied: "యాక్సెస్ నిరాకరించబడింది",
        loginToView: "దయచేసి మీ ఆర్డర్ చరిత్రను చూడటానికి లాగిన్ అవ్వండి.",
        goBack: "వెనక్కి వెళ్ళు",
        backToDashboard: "డాష్‌బోర్డ్‌కు తిరిగి వెళ్లండి",
        myOrders: "నా ఆర్డర్‌లు",
        total: "మొత్తం",
        trackPurchases: "మీ కొనుగోళ్లను ట్రాక్ చేయండి మరియు విక్రయాలను చూడండి.",
        searchPlaceholder: "ID, రైతు లేదా పంట ద్వారా శోధించండి...",
        noOrdersFound: "ఆర్డర్‌లు కనుగొనబడలేదు",
        noOrdersDesc: "మీరు ఇంకా ఆర్డర్‌లు చేయలేదు, లేదా మీ శోధనకు సరిపోలే ఆర్డర్‌లు లేవు.",
        goToMarketplace: "మార్కెట్‌ప్లేస్‌కు వెళ్లండి",
        id: "ID",
        soldBy: "విక్రేత",
        deliveredTo: "డెలివరీ చిరునామా",
        totalAmount: "మొత్తం మొత్తం",
        currentStatus: "ప్రస్తుత స్థితి",
        viewDetails: "వివరాలను చూడండి",
        qty: "పరిమాణం"
    },
    ta: {
        loadingOrders: "ஆர்டர்கள் ஏற்றப்படுகின்றன...",
        accessDenied: "அணுகல் மறுக்கப்பட்டது",
        loginToView: "உங்கள் ஆர்டர் வரலாற்றைக் காண உள்நுழையவும்.",
        goBack: "திரும்பி செல்",
        backToDashboard: "டாஷ்போர்டுக்கு திரும்பு",
        myOrders: "என் ஆர்டர்கள்",
        total: "மொத்தம்",
        trackPurchases: "உங்கள் வாங்குதல்களைக் கண்காணிக்கவும் மற்றும் ஆர்டர் வரலாற்றைக் காணவும்.",
        searchPlaceholder: "ஐடி, விவசாயி அல்லது பயிர் மூலம் தேடவும்...",
        noOrdersFound: "ஆர்டர்கள் எதுவும் கிடைக்கவில்லை",
        noOrdersDesc: "நீங்கள் இன்னும் எந்த ஆர்டர்களையும் செய்யவில்லை, அல்லது உங்கள் தேடலில் எந்த ஆர்டர்களும் பொருந்தவில்லை.",
        goToMarketplace: "சந்தைக்குச் செல்லுங்கள்",
        id: "ஐடி",
        soldBy: "விற்பனையாளர்",
        deliveredTo: "விநியோக முகவரி",
        totalAmount: "மொத்த தொகை",
        currentStatus: "தற்போதைய நிலை",
        viewDetails: "விவரங்களைக் காண்க",
        qty: "அளவு"
    },
    ml: {
        loadingOrders: "ഓർഡറുകൾ ലോഡുചെയ്യുന്നു...",
        accessDenied: "പ്രവേശനം നിഷേധിച്ചു",
        loginToView: "നിങ്ങളുടെ ഓർഡർ ചരിത്രം കാണുന്നതിന് ദയവായി ലോഗിൻ ചെയ്യുക.",
        goBack: "തിരികെ പോവുക",
        backToDashboard: "ഡാഷ്‌ബോർഡിലേക്ക് മടങ്ങുക",
        myOrders: "എൻ്റെ ഓർഡറുകൾ",
        total: "ആകെ",
        trackPurchases: "നിങ്ങളുടെ വാങ്ങലുകൾ ട്രാക്കുചെയ്യുക, ഓർഡർ ചരിത്രം കാണുക.",
        searchPlaceholder: "ഐഡി, കർഷകൻ അല്ലെങ്കിൽ വിള ഉപയോഗിച്ച് തിരയുക...",
        noOrdersFound: "ഓർഡറുകളൊന്നും കണ്ടെത്തിയില്ല",
        noOrdersDesc: "നിങ്ങൾ ഇതുവരെ ഓർഡറുകളൊന്നും നൽകിയിട്ടില്ല, അല്ലെങ്കിൽ നിങ്ങളുടെ തിരയലിന് ഓർഡറുകളൊന്നും പൊരുത്തപ്പെടുന്നില്ല.",
        goToMarketplace: "മാർക്കറ്റ് പ്ലേസിലേക്ക് പോകുക",
        id: "ഐഡി",
        soldBy: "വിൽപ്പനക്കാരൻ",
        deliveredTo: "ഡെലിവറി വിലാസം",
        totalAmount: "മൊത്തം തുക",
        currentStatus: "നിലവിലെ അവസ്ഥ",
        viewDetails: "വിശദാംശങ്ങൾ കാണുക",
        qty: "അളവ്"
    },
    kn: {
        loadingOrders: "ಆದೇಶಗಳನ್ನು ಲೋಡ್ ಮಾಡಲಾಗುತ್ತಿದೆ...",
        accessDenied: "ಪ್ರವೇಶ ನಿರಾಕರಿಸಲಾಗಿದೆ",
        loginToView: "ನಿಮ್ಮ ಆರ್ಡರ್ ಇತಿಹಾಸವನ್ನು ವೀಕ್ಷಿಸಲು ದಯವಿಟ್ಟು ಲಾಗ್ ಇನ್ ಮಾಡಿ.",
        goBack: "ಹಿಂದೆ ಹೋಗು",
        backToDashboard: "ಡ್ಯಾಶ್‌ಬೋರ್ಡ್‌ಗೆ ಹಿಂತಿರುಗಿ",
        myOrders: "ನನ್ನ ಆದೇಶಗಳು",
        total: "ಒಟ್ಟು",
        trackPurchases: "ನಿಮ್ಮ ಖರೀದಿಗಳನ್ನು ಟ್ರ್ಯಾಕ್ ಮಾಡಿ ಮತ್ತು ಆರ್ಡರ್ ಇತಿಹಾಸವನ್ನು ವೀಕ್ಷಿಸಿ.",
        searchPlaceholder: "ಐಡಿ, ರೈತ ಅಥವಾ ಬೆಳೆಯ ಮೂಲಕ ಹುಡುಕಿ...",
        noOrdersFound: "ಯಾವುದೇ ಆರ್ಡರ್‌ಗಳು ಕಂಡುಬಂದಿಲ್ಲ",
        noOrdersDesc: "ನೀವು ಇನ್ನೂ ಯಾವುದೇ ಆರ್ಡರ್‌ಗಳನ್ನು ಮಾಡಿಲ್ಲ, ಅಥವಾ ನಿಮ್ಮ ಹುಡುಕಾಟಕ್ಕೆ ಯಾವುದೇ ಆರ್ಡರ್‌ಗಳು ಹೊಂದಿಕೆಯಾಗುವುದಿಲ್ಲ.",
        goToMarketplace: "ಮಾರುಕಟ್ಟೆಗೆ ಹೋಗಿ",
        id: "ಐಡಿ",
        soldBy: "ಮಾರಾಟಗಾರ",
        deliveredTo: "ವಿತರಣಾ ವಿಳಾಸ",
        totalAmount: "ಒಟ್ಟು ಮೊತ್ತ",
        currentStatus: "ಪ್ರಸ್ತುತ ಸ್ಥಿತಿ",
        viewDetails: "ವಿವರಗಳನ್ನು ವೀಕ್ಷಿಸಿ",
        qty: "ಪ್ರಮಾಣ"
    },
    pa: {
        loadingOrders: "ਆਰਡਰ ਲੋਡ ਹੋ ਰਹੇ ਹਨ...",
        accessDenied: "ਪਹੁੰਚ ਅਸਵੀਕਾਰ ਕੀਤੀ ਗਈ",
        loginToView: "ਆਪਣਾ ਆਰਡਰ ਇਤਿਹਾਸ ਦੇਖਣ ਲਈ ਕਿਰਪਾ ਕਰਕੇ ਲੌਗ ਇਨ ਕਰੋ।",
        goBack: "ਵਾਪਸ ਜਾਓ",
        backToDashboard: "ਡੈਸ਼ਬੋਰਡ 'ਤੇ ਵਾਪਸ",
        myOrders: "ਮੇਰੇ ਆਰਡਰ",
        total: "ਕੁੱਲ",
        trackPurchases: "ਆਪਣੀਆਂ ਖਰੀਦਾਂ ਨੂੰ ਟਰੈਕ ਕਰੋ ਅਤੇ ਆਰਡਰ ਇਤਿਹਾਸ ਦੇਖੋ।",
        searchPlaceholder: "ਆਈਡੀ, ਕਿਸਾਨ, ਜਾਂ ਫਸਲ ਦੁਆਰਾ ਖੋਜੋ...",
        noOrdersFound: "ਕੋਈ ਆਰਡਰ ਨਹੀਂ ਮਿਲਿਆ",
        noOrdersDesc: "ਤੁਸੀਂ ਹਜੇ ਤੱਕ ਕੋਈ ਆਰਡਰ ਨਹੀਂ ਦਿੱਤਾ ਹੈ, ਜਾਂ ਤੁਹਾਡੀ ਖੋਜ ਨਾਲ ਕੋਈ ਆਰਡਰ ਮੇਲ ਨਹੀਂ ਖਾਂਦਾ।",
        goToMarketplace: "ਮਾਰਕੀਟਪਲੇਸ 'ਤੇ ਜਾਓ",
        id: "ਆਈਡੀ",
        soldBy: "ਵਿਕਰੇਤਾ",
        deliveredTo: "ਡਿਲੀਵਰੀ ਪਤਾ",
        totalAmount: "ਕੁੱਲ ਰਕਮ",
        currentStatus: "ਮੌਜੂਦਾ ਸਥਿਤੀ",
        viewDetails: "ਵੇਰਵੇ ਦੇਖੋ",
        qty: "ਮਾਤਰਾ"
    },
    mr: {
        loadingOrders: "ऑर्डर लोड होत आहेत...",
        accessDenied: "प्रवेश नाकारला",
        loginToView: "तुमचा ऑर्डर इतिहास पाहण्यासाठी कृपया लॉग इन करा.",
        goBack: "मागे जा",
        backToDashboard: "डॅशबोर्डवर परत",
        myOrders: "माझ्या ऑर्डर्स",
        total: "एकूण",
        trackPurchases: "तुमच्या खरेदीचा मागोवा घ्या आणि ऑर्डर इतिहास पहा.",
        searchPlaceholder: "आयडी, शेतकरी किंवा पीक यानुसार शोधा...",
        noOrdersFound: "कोणत्याही ऑर्डर्स सापडल्या नाहीत",
        noOrdersDesc: "तुम्ही अद्याप कोणतीही ऑर्डर दिलेली नाही किंवा तुमच्या शोधाशी कोणतीही ऑर्डर जुळत नाही.",
        goToMarketplace: "मार्केटप्लेसवर जा",
        id: "आयडी",
        soldBy: "विक्रेता",
        deliveredTo: "वितरण पत्ता",
        totalAmount: "एकूण रक्कम",
        currentStatus: "सध्याची स्थिती",
        viewDetails: "तपशील पहा",
        qty: "प्रमाण"
    }
};

const MyOrders = ({ user }) => {
    const navigate = useNavigate();
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState("");
    const { language } = useLanguage();
    // Default to 'en' or parse from 'hi (Hindi)' format
    const langCode = language ? {
        'English': 'en',
        'हिंदी (Hindi)': 'hi',
        'తెలుగు (Telugu)': 'te',
        'தமிழ் (Tamil)': 'ta',
        'മലയാളം (Malayalam)': 'ml',
        'ಕನ್ನಡ (Kannada)': 'kn',
        'ਪੰਜਾਬੀ (Punjabi)': 'pa',
        'मराठी (Marathi)': 'mr'
    }[language] || 'en' : 'en';
    const tr = translations[langCode] || translations['en'];

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                if (!user) {
                    setLoading(false);
                    return;
                }

                const response = await fetch(`${import.meta.env.VITE_API_URL || `${import.meta.env.VITE_API_URL || "http://localhost:5001"}`}/api/orders/buyer/${user.email}`);
                if (response.ok) {
                    const data = await response.json();
                    setOrders(data);
                }
            } catch (error) {
                console.error("Failed to fetch buyer orders:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchOrders();
    }, [user]);

    const getStatusColor = (status) => {
        switch (status) {
            case 'Pending': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
            case 'Processing': return 'bg-blue-100 text-blue-800 border-blue-200';
            case 'Shipped': return 'bg-purple-100 text-purple-800 border-purple-200';
            case 'Delivered': return 'bg-emerald-100 text-emerald-800 border-emerald-200';
            case 'Cancelled': return 'bg-red-100 text-red-800 border-red-200';
            default: return 'bg-slate-100 text-slate-800 border-slate-200';
        }
    };

    const getStatusIcon = (status) => {
        switch (status) {
            case 'Pending': return <Clock size={16} className="text-yellow-600" />;
            case 'Processing': return <Package size={16} className="text-blue-600" />;
            case 'Shipped': return <Truck size={16} className="text-purple-600" />;
            case 'Delivered': return <CheckCircle size={16} className="text-emerald-600" />;
            case 'Cancelled': return <XCircle size={16} className="text-red-600" />;
            default: return <Clock size={16} />;
        }
    };

    const filteredOrders = orders.filter(order =>
        order.farmerEmail.toLowerCase().includes(searchQuery.toLowerCase()) ||
        order._id.includes(searchQuery) ||
        order.items.some(item => item.crop.toLowerCase().includes(searchQuery.toLowerCase()))
    );

    if (loading) {
        return <div className="min-h-screen flex items-center justify-center bg-slate-50 text-emerald-700 font-bold">{tr.loadingOrders}</div>;
    }

    if (!user) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center bg-slate-50 p-6 text-center">
                <ShoppingBag size={64} className="text-slate-300 mb-6" />
                <h2 className="text-2xl font-black text-slate-800 mb-2">{tr.accessDenied}</h2>
                <p className="text-slate-500 mb-8 max-w-md">{tr.loginToView}</p>
                <button onClick={() => navigate(-1)} className="bg-emerald-600 text-white font-bold py-3 px-8 rounded-xl shadow-lg hover:bg-emerald-700 transition-all flex items-center gap-2">
                    <ArrowLeft size={20} /> {tr.goBack}
                </button>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#F8FAFC] pb-24 text-slate-900 font-sans selection:bg-emerald-100">
            {/* Header */}
            <div className="bg-emerald-700 text-white pt-8 pb-32 px-6">
                <div className="max-w-7xl mx-auto">
                    {/* Header Options */}
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-8">
                        <div>
                            <button onClick={() => navigate('/')} className="text-emerald-100 hover:text-white font-bold mb-6 flex items-center gap-2 transition-all hover:-translate-x-1 group">
                                <ArrowLeft size={18} /> {tr.backToDashboard}
                            </button>
                            <h1 className="text-4xl md:text-5xl font-black tracking-tighter flex items-center gap-4 text-white">
                                {tr.myOrders}
                                <span className="bg-emerald-800/60 text-emerald-100 text-sm font-bold px-3 py-1 rounded-full border border-emerald-600/40 shadow-sm">
                                    {orders.length} {tr.total}
                                </span>
                            </h1>
                            <p className="text-emerald-50 font-medium mt-3">{tr.trackPurchases}</p>
                        </div>

                        <div className="relative w-full md:w-96 group">
                            <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-emerald-600 transition-colors" />
                            <input
                                type="text"
                                placeholder={tr.searchPlaceholder}
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full bg-white border-2 border-transparent rounded-[2rem] py-4 pl-14 pr-6 shadow-lg focus:shadow-emerald-500/20 focus:border-emerald-400 transition-all outline-none font-medium text-slate-700"
                            />
                        </div>
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className="max-w-7xl mx-auto px-6 -mt-16 relative z-10">
                {/* Orders List */}
                {filteredOrders.length === 0 ? (
                    <div className="bg-white rounded-[2.5rem] p-16 text-center shadow-xl shadow-slate-200/40 border border-slate-100 flex flex-col items-center">
                        <div className="w-24 h-24 bg-emerald-50 rounded-[2rem] flex items-center justify-center text-emerald-500 mb-6 rotate-3">
                            <ShoppingBag size={48} />
                        </div>
                        <h3 className="text-3xl font-black text-slate-800 mb-3 tracking-tight">{tr.noOrdersFound}</h3>
                        <p className="text-slate-500 font-medium max-w-sm mb-8 text-lg">{tr.noOrdersDesc}</p>
                        <button onClick={() => navigate('/marketplace')} className="bg-emerald-600 text-white font-bold py-4 px-10 rounded-[1.5rem] shadow-xl shadow-emerald-600/20 hover:bg-emerald-700 hover:-translate-y-1 transition-all flex items-center gap-3">
                            {tr.goToMarketplace}
                        </button>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 gap-8">
                        {filteredOrders.map((order) => (
                            <div key={order._id} className="bg-white rounded-[2.5rem] p-8 shadow-xl shadow-slate-200/40 border border-slate-100 hover:shadow-2xl hover:shadow-emerald-500/5 transition-all duration-300 group">
                                <div className="flex flex-col lg:flex-row justify-between lg:items-center gap-8 pb-8 border-b border-slate-100">
                                    {/* Order Meta */}
                                    <div className="flex-1">
                                        <div className="flex flex-wrap items-center gap-4 mb-4">
                                            <span className="font-mono text-xs font-black text-slate-500 bg-slate-100 px-4 py-1.5 rounded-lg border border-slate-200 uppercase tracking-widest">{tr.id}: {order._id.slice(-8)}</span>
                                            <span className="flex items-center gap-2 text-slate-500 text-sm font-bold"><Calendar size={16} className="text-slate-400" /> {new Date(order.createdAt).toLocaleDateString()}</span>
                                        </div>
                                        <div className="flex flex-wrap items-center gap-8 mt-6">
                                            <div className="flex items-center gap-4">
                                                <div className="w-12 h-12 bg-emerald-50 rounded-2xl flex items-center justify-center text-emerald-600 border border-emerald-100 group-hover:bg-emerald-100 transition-colors">
                                                    <User size={22} />
                                                </div>
                                                <div>
                                                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1 lg:mb-0.5">{tr.soldBy}</p>
                                                    <p className="font-black text-slate-800 text-lg capitalize tracking-tight">{order.farmerName || order.farmerEmail}</p>
                                                </div>
                                            </div>

                                            {/* Delivery Info */}
                                            {order.deliveryDetails && (
                                                <div className="hidden sm:flex items-center gap-4">
                                                    <div className="w-12 h-12 bg-slate-50 rounded-2xl flex items-center justify-center text-slate-600 border border-slate-100">
                                                        <MapPin size={22} />
                                                    </div>
                                                    <div>
                                                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1 lg:mb-0.5">{tr.deliveredTo}</p>
                                                        <p className="font-black text-slate-800 text-lg line-clamp-1 max-w-[180px] tracking-tight" title={order.deliveryDetails.address}>
                                                            {order.deliveryDetails.name}
                                                        </p>
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    </div>

                                    {/* Order Total & Status Control */}
                                    <div className="flex flex-wrap lg:flex-nowrap items-center gap-6 lg:gap-8 lg:bg-slate-50/50 lg:p-4 lg:rounded-[2rem] lg:border lg:border-slate-100 shrink-0">
                                        <div>
                                            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">{tr.totalAmount}</p>
                                            <p className="text-3xl font-black text-slate-900 tracking-tighter">₹{order.totalAmount.toLocaleString()}</p>
                                        </div>
                                        <div className="w-px h-12 bg-slate-200 hidden lg:block"></div>
                                        <div>
                                            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1.5">{tr.currentStatus}</p>
                                            <div className={`flex items-center gap-2 px-4 py-2 rounded-xl border-2 font-black text-sm uppercase tracking-wider ${getStatusColor(order.status)}`}>
                                                {getStatusIcon(order.status)}
                                                {order.status}
                                            </div>
                                        </div>
                                        <div className="w-full lg:w-auto mt-4 lg:mt-0 flex gap-4 lg:ml-4">
                                            <button
                                                onClick={() => navigate(`/order/${order._id}`)}
                                                className="w-full lg:w-auto bg-emerald-600 hover:bg-emerald-700 text-white text-sm rounded-[1.25rem] px-8 py-3.5 font-bold transition-all shadow-md shadow-emerald-600/20 flex items-center justify-center gap-2 active:scale-95"
                                            >
                                                {tr.viewDetails} <ArrowRight size={18} />
                                            </button>
                                        </div>
                                    </div>
                                </div>

                                {/* Order Items Preview */}
                                <div className="mt-8">
                                    <div className="flex items-center gap-4 overflow-x-auto pb-4 scrollbar-hide">
                                        {order.items.map((item, idx) => (
                                            <div key={idx} className="flex items-center gap-4 p-3 rounded-2xl border border-slate-100 bg-slate-50/80 min-w-[220px] hover:bg-white hover:shadow-md hover:-translate-y-1 transition-all group/item cursor-default">
                                                <div className="w-14 h-14 rounded-xl overflow-hidden bg-slate-200 shrink-0 shadow-sm">
                                                    {item.imageUrl ? (
                                                        <img src={item.imageUrl} alt={item.crop} className="w-full h-full object-cover group-hover/item:scale-110 transition-transform duration-500" />
                                                    ) : (
                                                        <div className="w-full h-full flex items-center justify-center text-slate-400 p-2"><Package size={24} /></div>
                                                    )}
                                                </div>
                                                <div>
                                                    <p className="font-black text-slate-800 text-sm truncate w-28 tracking-tight">{item.crop}</p>
                                                    <p className="text-xs font-bold text-slate-500 mt-0.5 tracking-wide">{tr.qty}: {item.quantity}</p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default MyOrders;
