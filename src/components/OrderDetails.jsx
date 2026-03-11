import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
    Package, Clock, CheckCircle, Truck, XCircle,
    ArrowLeft, User, Calendar, Sprout, ShoppingBag,
    MapPin, Wallet
} from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useLanguage } from './LanguageContext';

const translations = {
    en: {
        orderNotFound: "Order Not Found",
        orderNotFoundDesc: "We couldn't find the order details you're looking for. It might have been deleted or the ID is incorrect.",
        goBack: "Go Back",
        backToOrders: "Back to Orders",
        orderDetails: "Order Details",
        orderStatus: "Order Status",
        currentStatus: "Current Status",
        lastUpdated: "Last updated on",
        orderedItems: "Ordered Items",
        perUnit: "per unit",
        paymentSummary: "Payment Summary",
        subtotal: "Subtotal",
        items: "items",
        deliveryAndHandling: "Delivery & Handling",
        free: "Free",
        tax: "Tax",
        total: "Total",
        farmerDetails: "Farmer Details",
        buyerDetails: "Buyer Details",
        deliveryInfo: "Delivery Information",
        phoneLabel: "Phone",
        qty: "Qty"
    },
    hi: {
        orderNotFound: "ऑर्डर नहीं मिला",
        orderNotFoundDesc: "हम आपके द्वारा खोजे जा रहे ऑर्डर विवरण नहीं ढूंढ सके। हो सकता है यह हटा दिया गया हो या आईडी गलत हो।",
        goBack: "वापस जाएं",
        backToOrders: "ऑर्डर पर वापस",
        orderDetails: "ऑर्डर विवरण",
        orderStatus: "ऑर्डर की स्थिति",
        currentStatus: "वर्तमान स्थिति",
        lastUpdated: "अंतिम बार अपडेट किया गया",
        orderedItems: "ऑर्डर किए गए आइटम",
        perUnit: "प्रति इकाई",
        paymentSummary: "भुगतान सारांश",
        subtotal: "उप-कुल",
        items: "वस्तुएं",
        deliveryAndHandling: "वितरण और हैंडलिंग",
        free: "मुफ़्त",
        tax: "कर",
        total: "कुल",
        farmerDetails: "किसान विवरण",
        buyerDetails: "खरीददार विवरण",
        deliveryInfo: "वितरण जानकारी",
        phoneLabel: "फ़ोन",
        qty: "मात्रा"
    },
    te: {
        orderNotFound: "ఆర్డర్ కనుగొనబడలేదు",
        orderNotFoundDesc: "మేము మీరు వెతుకుతున్న ఆర్డర్ వివరాలను కనుగొనలేకపోయాము. అది తొలగించబడి ఉండవచ్చు లేదా ID తప్పు కావచ్చు.",
        goBack: "వెనక్కి వెళ్ళు",
        backToOrders: "ఆర్డర్‌లకు తిరిగి వెళ్లు",
        orderDetails: "ఆర్డర్ వివరాలు",
        orderStatus: "ఆర్డర్ స్థితి",
        currentStatus: "ప్రస్తుత స్థితి",
        lastUpdated: "చివరిగా నవీకరించబడింది",
        orderedItems: "ఆర్డర్ చేసిన వస్తువులు",
        perUnit: "యూనిట్‌కు",
        paymentSummary: "చెల్లింపు సారాంశం",
        subtotal: "ఉపమొత్తం",
        items: "వస్తువులు",
        deliveryAndHandling: "డెలివరీ & హ్యాండ్లింగ్",
        free: "ఉచితం",
        tax: "పన్ను",
        total: "మొత్తం",
        farmerDetails: "రైతు వివరాలు",
        buyerDetails: "కొనుగోలుదారు వివరాలు",
        deliveryInfo: "డెలివరీ సమాచారం",
        phoneLabel: "ఫోన్",
        qty: "పరిమాణం"
    },
    ta: {
        orderNotFound: "ஆர்டரைக் காணவில்லை",
        orderNotFoundDesc: "நீங்கள் தேடும் ஆர்டர் விவரங்களை எங்களால் கண்டுபிடிக்க முடியவில்லை. அது நீக்கப்பட்டிருக்கலாம் அல்லது ஐடி தவறாக இருக்கலாம்.",
        goBack: "திரும்பி செல்",
        backToOrders: "ஆர்டர்களுக்கு திரும்பு",
        orderDetails: "ஆர்டர் விவரங்கள்",
        orderStatus: "ஆர்டர் நிலை",
        currentStatus: "தற்போதைய நிலை",
        lastUpdated: "கடைசியாக புதுப்பிக்கப்பட்டது",
        orderedItems: "ஆர்டர் செய்யப்பட்ட பொருட்கள்",
        perUnit: "ஒரு ஓரளவிற்கு",
        paymentSummary: "கட்டணச் சுருக்கம்",
        subtotal: "உப-மொத்தம்",
        items: "பொருட்கள்",
        deliveryAndHandling: "விநியோகம் மற்றும் கையாளுதல்",
        free: "இலவசம்",
        tax: "வரி",
        total: "மொத்தம்",
        farmerDetails: "விவசாயி விவரங்கள்",
        buyerDetails: "வாங்குபவர் விவரங்கள்",
        deliveryInfo: "விநியோக தகவல்",
        phoneLabel: "தொலைபேசி",
        qty: "அளவு"
    },
    ml: {
        orderNotFound: "ഓർഡർ കണ്ടെത്താനായില്ല",
        orderNotFoundDesc: "നിങ്ങൾ തിരയുന്ന ഓർഡർ വിശദാംശങ്ങൾ കണ്ടെത്താനായില്ല. അത് ഇല്ലാതാക്കിയിരിക്കാം അല്ലെങ്കിൽ ഐഡി തെറ്റായിരിക്കാം.",
        goBack: "തിരികെ പോവുക",
        backToOrders: "ഓർഡറുകളിലേക്ക് മടങ്ങുക",
        orderDetails: "ഓർഡർ വിശദാംശങ്ങൾ",
        orderStatus: "ഓർഡർ നില",
        currentStatus: "നിലവിലെ അവസ്ഥ",
        lastUpdated: "അവസാനം അപ്‌ഡേറ്റ് ചെയ്തത്",
        orderedItems: "ഓർഡർ ചെയ്ത ഇനങ്ങൾ",
        perUnit: "ഒരു യൂണിറ്റിന്",
        paymentSummary: "പേയ്‌മെൻ്റ് സംഗ്രഹം",
        subtotal: "ഉപമൊത്തം",
        items: "ഇനങ്ങൾ",
        deliveryAndHandling: "ഡെലിവറിയും കൈകാര്യം ചെയ്യലും",
        free: "സൗ ജന്യം",
        tax: "നികുതി",
        total: "ആകെ",
        farmerDetails: "കർഷകൻ്റെ വിശദാംശങ്ങൾ",
        buyerDetails: "വാങ്ങുന്നയാളുടെ വിശദാംശങ്ങൾ",
        deliveryInfo: "ഡെലിവറി വിവരങ്ങൾ",
        phoneLabel: "ഫോൺ",
        qty: "അളവ്"
    },
    kn: {
        orderNotFound: "ಆರ್ಡರ್ ಕಂಡುಬಂದಿಲ್ಲ",
        orderNotFoundDesc: "ನೀವು ಹುಡುಕುತ್ತಿರುವ ಆರ್ಡರ್ ವಿವರಗಳನ್ನು ನಮಗೆ ಹುಡುಕಲಾಗಲಿಲ್ಲ. ಅದನ್ನು ಅಳಿಸಿರಬಹುದು ಅಥವಾ ID ತಪ್ಪಾಗಿರಬಹುದು.",
        goBack: "ಹಿಂದೆ ಹೋಗು",
        backToOrders: "ಆರ್ಡರ್‌ಗಳಿಗೆ ಹಿಂತಿರುಗಿ",
        orderDetails: "ಆರ್ಡರ್ ವಿವರಗಳು",
        orderStatus: "ಆರ್ಡರ್ ಸ್ಥಿತಿ",
        currentStatus: "ಪ್ರಸ್ತುತ ಸ್ಥಿತಿ",
        lastUpdated: "ಕೊನೆಯದಾಗಿ ನವೀಕರಿಸಲಾಗಿದೆ",
        orderedItems: "ಆರ್ಡರ್ ಮಾಡಿದ ವಸ್ತುಗಳು",
        perUnit: "ಪ್ರತಿ ಯೂನಿಟ್",
        paymentSummary: "ಪಾವತಿ ಸಾರಾಂಶ",
        subtotal: "ಉಪಮೊತ್ತ",
        items: "ವಸ್ತುಗಳು",
        deliveryAndHandling: "ವಿತರಣೆ ಮತ್ತು ನಿರ್ವಹಣೆ",
        free: "ಉಚಿತ",
        tax: "ತೆರಿಗೆ",
        total: "ಒಟ್ಟು",
        farmerDetails: "ರೈತ ವಿವರಗಳು",
        buyerDetails: "ಖರೀದಿದಾರರ ವಿವರಗಳು",
        deliveryInfo: "ವಿತರಣಾ ಮಾಹಿತಿ",
        phoneLabel: "ಫೋನ್",
        qty: "ಪ್ರಮಾಣ"
    },
    pa: {
        orderNotFound: "ਆਰਡਰ ਨਹੀਂ ਮਿਲਿਆ",
        orderNotFoundDesc: "ਅਸੀਂ ਉਹ ਆਰਡਰ ਵੇਰਵੇ ਨਹੀਂ ਲੱਭ ਸਕੇ ਜਿਸ ਦੀ ਤੁਸੀਂ ਭਾਲ ਕਰ ਰਹੇ ਹੋ। ਹੋ ਸਕਦਾ ਹੈ ਇਹ ਹਟਾ ਦਿੱਤਾ ਗਿਆ ਹੋਵੇ ਜਾਂ ਆਈਡੀ ਗਲਤ ਹੋਵੇ।",
        goBack: "ਵਾਪਸ ਜਾਓ",
        backToOrders: "ਆਰਡਰ 'ਤੇ ਵਾਪਸ",
        orderDetails: "ਆਰਡਰ ਵੇਰਵੇ",
        orderStatus: "ਆਰਡਰ ਦੀ ਸਥਿਤੀ",
        currentStatus: "ਮੌਜੂਦਾ ਸਥਿਤੀ",
        lastUpdated: "ਪਿਛਲਾ ਅਪਡੇਟ",
        orderedItems: "ਆਰਡਰ ਕੀਤੀਆਂ ਚੀਜ਼ਾਂ",
        perUnit: "ਪ੍ਰਤੀ ਯੂਨਿਟ",
        paymentSummary: "ਭੁਗਤਾਨ ਦਾ ਸਾਰ",
        subtotal: "ਉਪ-ਕੁੱਲ",
        items: "ਚੀਜ਼ਾਂ",
        deliveryAndHandling: "ਡਿਲੀਵਰੀ ਅਤੇ ਹੈਂਡਲਿੰਗ",
        free: "ਮੁਫ਼ਤ",
        tax: "ਟੈਕਸ",
        total: "ਕੁੱਲ",
        farmerDetails: "ਕਿਸਾਨ ਵੇਰਵੇ",
        buyerDetails: "ਖਰੀਦਦਾਰ ਵੇਰਵੇ",
        deliveryInfo: "ਡਿਲੀਵਰੀ ਜਾਣਕਾਰੀ",
        phoneLabel: "ਫ਼ੋਨ",
        qty: "ਮਾਤਰਾ"
    },
    mr: {
        orderNotFound: "ऑर्डर सापडली नाही",
        orderNotFoundDesc: "तुम्ही शोधत असलेले ऑर्डर तपशील आम्हाला सापडले नाहीत. ते कदाचित हटवले गेले असेल किंवा ID चुकीचा असेल.",
        goBack: "मागे जा",
        backToOrders: "ऑर्डर्सवर परत",
        orderDetails: "ऑर्डर तपशील",
        orderStatus: "ऑर्डरची स्थिती",
        currentStatus: "सध्याची स्थिती",
        lastUpdated: "शेवटचे अपडेट",
        orderedItems: "ऑर्डर केलेल्या वस्तू",
        perUnit: "प्रति युनिट",
        paymentSummary: "पेमेंट सारांश",
        subtotal: "उप-एकूण",
        items: "वस्तू",
        deliveryAndHandling: "वितरण आणि हाताळणी",
        free: "मोफत",
        tax: "कर",
        total: "एकूण",
        farmerDetails: "शेतकरी तपशील",
        buyerDetails: "खरेदीदार तपशील",
        deliveryInfo: "वितरण माहिती",
        phoneLabel: "फोन",
        qty: "प्रमाण"
    }
};

const OrderDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [order, setOrder] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
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
        const fetchOrderDetails = async () => {
            try {
                const response = await fetch(`${import.meta.env.VITE_API_URL || `${import.meta.env.VITE_API_URL || "http://localhost:5001"}`}/api/orders/${id}`);
                if (!response.ok) {
                    throw new Error("Order not found");
                }
                const data = await response.json();
                setOrder(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchOrderDetails();
    }, [id]);

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

    const getStatusIcon = (status, size = 24) => {
        switch (status) {
            case 'Pending': return <Clock size={size} className="text-yellow-600" />;
            case 'Processing': return <Package size={size} className="text-blue-600" />;
            case 'Shipped': return <Truck size={size} className="text-purple-600" />;
            case 'Delivered': return <CheckCircle size={size} className="text-emerald-600" />;
            case 'Cancelled': return <XCircle size={size} className="text-red-600" />;
            default: return <Clock size={size} className="text-slate-600" />;
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-slate-50">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-emerald-600"></div>
            </div>
        );
    }

    if (error || !order) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center bg-slate-50 p-6 text-center">
                <div className="w-24 h-24 bg-red-50 rounded-full flex items-center justify-center text-red-400 mb-6">
                    <XCircle size={48} />
                </div>
                <h2 className="text-3xl font-black text-slate-800 mb-2">{tr.orderNotFound}</h2>
                <p className="text-slate-500 mb-8 max-w-md">{tr.orderNotFoundDesc}</p>
                <button onClick={() => navigate(-1)} className="bg-emerald-600 text-white font-bold py-3 px-8 rounded-xl shadow-lg hover:bg-emerald-700 transition-all flex items-center gap-2">
                    <ArrowLeft size={20} /> {tr.goBack}
                </button>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#F8FAFC] pb-24 text-slate-900 font-sans">
            {/* Header */}
            <div className="bg-emerald-700 text-white pt-8 pb-32 px-6">
                <div className="max-w-5xl mx-auto">
                    <button onClick={() => navigate(-1)} className="text-emerald-100 hover:text-white font-bold mb-8 flex items-center gap-2 transition-colors">
                        <ArrowLeft size={20} /> {tr.backToOrders}
                    </button>
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
                        <div>
                            <h1 className="text-3xl md:text-5xl font-black tracking-tight mb-3 text-white">
                                {tr.orderDetails}
                            </h1>
                            <div className="flex items-center gap-4 text-emerald-100 font-medium">
                                <span className="flex items-center gap-1.5 bg-emerald-800/60 px-3 py-1.5 rounded-lg border border-emerald-600/40 shadow-sm">
                                    <ShoppingBag size={16} /> ID: {order._id.slice(-8).toUpperCase()}
                                </span>
                                <span className="flex items-center gap-1.5 bg-emerald-800/60 px-3 py-1.5 rounded-lg border border-emerald-600/40 shadow-sm">
                                    <Calendar size={16} /> {new Date(order.createdAt).toLocaleDateString()}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className="max-w-5xl mx-auto px-6 -mt-20 relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

                    {/* Left Column: Items and Info */}
                    <div className="lg:col-span-2 space-y-8">

                        {/* Status Card */}
                        <div className="bg-white rounded-3xl p-8 shadow-lg shadow-slate-200/50 border border-slate-100">
                            <h2 className="text-xl font-black mb-6 flex items-center gap-2">
                                <Package className="text-slate-400" /> {tr.orderStatus}
                            </h2>
                            <div className="flex items-center p-6 bg-slate-50 rounded-2xl border border-slate-100 gap-6">
                                <div className="p-4 bg-white rounded-2xl shadow-sm border border-slate-100">
                                    {getStatusIcon(order.status, 32)}
                                </div>
                                <div>
                                    <p className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-1">{tr.currentStatus}</p>
                                    <h3 className={`text-2xl font-black flex items-center gap-3 ${order.status === 'Cancelled' ? 'text-red-600' :
                                        order.status === 'Delivered' ? 'text-emerald-600' :
                                            'text-slate-800'
                                        }`}>
                                        {order.status}
                                    </h3>
                                    <p className="text-slate-500 font-medium mt-1">
                                        {tr.lastUpdated} {new Date(order.updatedAt || order.createdAt).toLocaleDateString()}
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Items List */}
                        <div className="bg-white rounded-3xl p-8 shadow-lg shadow-slate-200/50 border border-slate-100">
                            <h2 className="text-xl font-black mb-6 flex items-center gap-2">
                                <Sprout className="text-slate-400" /> {tr.orderedItems}
                            </h2>
                            <div className="space-y-4">
                                {order.items.map((item, idx) => (
                                    <div key={idx} className="flex gap-4 p-4 rounded-2xl border border-slate-100 bg-slate-50/50 hover:bg-white hover:shadow-md transition-all">
                                        <div className="w-20 h-20 rounded-2xl overflow-hidden bg-slate-200 shrink-0 border border-slate-200">
                                            {item.imageUrl ? (
                                                <img src={item.imageUrl} alt={item.crop} className="w-full h-full object-cover" />
                                            ) : (
                                                <div className="w-full h-full flex items-center justify-center text-slate-400"><Sprout size={32} /></div>
                                            )}
                                        </div>
                                        <div className="flex flex-col justify-center flex-1">
                                            <div className="flex justify-between items-start mb-1">
                                                <h3 className="font-bold text-slate-800 text-lg leading-tight">{item.crop}</h3>
                                                <span className="font-black text-slate-900 text-lg">₹{item.price * item.quantity}</span>
                                            </div>
                                            <div className="flex items-center gap-3 mt-2">
                                                <span className="bg-slate-100 text-slate-600 text-xs font-bold px-2.5 py-1 rounded-lg">{tr.qty}: {item.quantity}</span>
                                                <span className="text-slate-400 text-sm font-medium">₹{item.price} {tr.perUnit}</span>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Right Column: Summary and People */}
                    <div className="space-y-8">

                        {/* Order Summary */}
                        <div className="bg-white rounded-3xl p-8 shadow-lg shadow-slate-200/50 border border-slate-100">
                            <h2 className="text-xl font-black mb-6 flex items-center gap-2">
                                <Wallet className="text-slate-400" /> {tr.paymentSummary}
                            </h2>
                            <div className="space-y-4 mb-6">
                                <div className="flex justify-between text-slate-600 font-medium">
                                    <span>{tr.subtotal} ({order.items.length} {tr.items})</span>
                                    <span className="font-bold text-slate-900">₹{order.totalAmount}</span>
                                </div>
                                <div className="flex justify-between text-slate-600 font-medium">
                                    <span>{tr.deliveryAndHandling}</span>
                                    <span className="text-emerald-600 font-bold">{tr.free}</span>
                                </div>
                                <div className="flex justify-between text-slate-600 font-medium">
                                    <span>{tr.tax}</span>
                                    <span className="font-bold text-slate-900">₹0</span>
                                </div>
                            </div>
                            <div className="pt-6 border-t border-slate-100 flex justify-between items-center">
                                <span className="text-lg font-black text-slate-800">{tr.total}</span>
                                <span className="text-3xl font-black text-emerald-600">₹{order.totalAmount}</span>
                            </div>
                        </div>

                        {/* People Involved */}
                        <div className="bg-white rounded-3xl p-8 shadow-lg shadow-slate-200/50 border border-slate-100 space-y-8">

                            {/* Farmer */}
                            <div>
                                <h3 className="text-xs font-black text-slate-400 uppercase tracking-wider mb-4">{tr.farmerDetails}</h3>
                                <div className="flex items-center gap-4 p-4 rounded-2xl bg-white border border-slate-200 shadow-sm hover:border-emerald-300 transition-colors">
                                    <div className="w-12 h-12 bg-emerald-50 rounded-full flex items-center justify-center text-emerald-600 shrink-0">
                                        <Sprout size={24} />
                                    </div>
                                    <div>
                                        <p className="font-bold text-slate-800 text-lg capitalize">{order.farmerName}</p>
                                        <p className="text-xs font-medium text-slate-500">{order.farmerEmail}</p>
                                    </div>
                                </div>
                            </div>

                            {/* Buyer */}
                            <div>
                                <h3 className="text-xs font-black text-slate-400 uppercase tracking-wider mb-4">{tr.buyerDetails}</h3>
                                <div className="flex items-center gap-4 p-4 rounded-2xl bg-white border border-slate-200 shadow-sm hover:border-emerald-300 transition-colors">
                                    <div className="w-12 h-12 bg-slate-50 rounded-full flex items-center justify-center text-slate-600 shrink-0">
                                        <User size={24} />
                                    </div>
                                    <div>
                                        <p className="font-bold text-slate-800 text-lg capitalize">{order.buyerName}</p>
                                        <p className="text-xs font-medium text-slate-500">{order.buyerEmail}</p>
                                    </div>
                                </div>
                            </div>

                            {/* Delivery Address Details */}
                            {order.deliveryDetails && (
                                <div>
                                    <h3 className="text-xs font-black text-slate-400 uppercase tracking-wider mb-4">{tr.deliveryInfo}</h3>
                                    <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-sm hover:border-emerald-300 transition-colors flex items-start gap-4">
                                        <div className="w-12 h-12 bg-emerald-50 rounded-full flex items-center justify-center text-emerald-600 shrink-0">
                                            <MapPin size={24} />
                                        </div>
                                        <div className="space-y-1">
                                            <p className="font-bold text-slate-800 text-lg capitalize">{order.deliveryDetails.name}</p>
                                            <p className="text-sm font-medium text-slate-600 flex items-center gap-2">
                                                <span className="bg-slate-100 text-slate-700 px-2 py-0.5 rounded-md text-xs font-bold border border-slate-200">{tr.phoneLabel}</span>
                                                {order.deliveryDetails.phone}
                                            </p>
                                            <p className="text-sm text-slate-500 mt-2 leading-relaxed">
                                                {order.deliveryDetails.address}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            )}

                        </div>

                    </div>
                </div>
            </div>
        </div>
    );
};

export default OrderDetails;
