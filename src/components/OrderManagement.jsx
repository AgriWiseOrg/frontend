import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Package, Clock, CheckCircle, Truck, XCircle, Search, Calendar, User, ArrowLeft, Sprout } from 'lucide-react';
import { useLanguage } from './LanguageContext';

const omTranslations = {
    en: { title: 'Order Management', backDash: 'Back to Dashboard', searchPlaceholder: 'Search by ID, Buyer, or Crop...', total: 'Total', loading: 'Loading Orders...', accessDenied: 'Access Denied', accessMsg: 'Only registered farmers have access to the Order Management dashboard.', goBack: 'Go Back', noOrders: 'No orders found', noOrdersMsg: "We couldn't find any orders matching your criteria. When buyers purchase your crops, they will appear here.", totalAmt: 'Total Amount', currentStatus: 'Current Status', buyerDetails: 'Buyer Details', orderItems: 'Order Items', viewDetails: 'View Details', pending: 'Mark Pending', processing: 'Mark Processing', shipped: 'Mark Shipped', delivered: 'Mark Delivered', cancel: 'Cancel Order' },
    hi: { title: 'ऑर्डर प्रबंधन', backDash: 'डैशबोर्ड पर वापस', searchPlaceholder: 'ID, खरीदार, या फसल से खोजें...', total: 'कुल', loading: 'ऑर्डर लोड हो रहे हैं...', accessDenied: 'प्रवेश निषेध', accessMsg: 'केवल पंजीकृत किसानों को ऑर्डर प्रबंधन तक पहुंच है।', goBack: 'वापस जाएं', noOrders: 'कोई ऑर्डर नहीं मिला', noOrdersMsg: 'आपकी खोज से मेल खाने वाले कोई ऑर्डर नहीं मिले।', totalAmt: 'कुल राशि', currentStatus: 'वर्तमान स्थिति', buyerDetails: 'खरीदार विवरण', orderItems: 'ऑर्डर आइटम', viewDetails: 'विवरण देखें', pending: 'लंबित चिह्नित करें', processing: 'प्रसंस्करण', shipped: 'भेजा गया', delivered: 'वितरित', cancel: 'ऑर्डर रद्द करें' },
    te: { title: 'ఆర్డర్ నిర్వహణ', backDash: 'డాష్‌బోర్డ్‌కు తిరిగి', searchPlaceholder: 'ID, కొనుగోలుదారు, లేదా పంట ద్వారా శోధించండి...', total: 'మొత్తం', loading: 'ఆర్డర్‌లు లోడ్ అవుతున్నాయి...', accessDenied: 'యాక్సెస్ నిరాకరించబడింది', accessMsg: 'నిర్వహించే రైతులకు మాత్రమే ఆర్డర్ నిర్వహణ యాక్సెస్ ఉంది.', goBack: 'వెనక్కి వెళ్ళు', noOrders: 'ఆర్డర్‌లు కనుగొనబడలేదు', noOrdersMsg: 'మీ ప్రమాణాలకు సరిపోలే ఆర్డర్‌లు లేవు.', totalAmt: 'మొత్తం మొత్తం', currentStatus: 'ప్రస్తుత స్థితి', buyerDetails: 'కొనుగోలుదారు వివరాలు', orderItems: 'ఆర్డర్ అంశాలు', viewDetails: 'వివరాలు చూడండి', pending: 'పెండింగ్ గుర్తించు', processing: 'ప్రాసెసింగ్', shipped: 'పంపి', delivered: 'డెలివరీ', cancel: 'ఆర్డర్ రద్దు' },
    ta: { title: 'ஆர்டர் மேலாண்மை', backDash: 'டாஷ்போர்டுக்கு திரும்பு', searchPlaceholder: 'ID, வாங்குபவர் அல்லது பயிர் தேடு...', total: 'மொத்தம்', loading: 'ஆர்டர்கள் ஏற்றுகிறது...', accessDenied: 'அணுகல் மறுக்கப்பட்டது', accessMsg: 'பதிவு செய்யப்பட்ட விவசாயிகளுக்கு மட்டுமே அணுகல் உள்ளது.', goBack: 'திரும்பு', noOrders: 'ஆர்டர்கள் இல்லை', noOrdersMsg: 'தேடலுக்கு ஆர்டர்கள் கிடைக்கவில்லை.', totalAmt: 'மொத்த தொகை', currentStatus: 'தற்போதைய நிலை', buyerDetails: 'வாங்குபவர் தகவல்', orderItems: 'ஆர்டர் பொருட்கள்', viewDetails: 'விவரங்கள் காண', pending: 'நிலுவை குறிக்க', processing: 'செயலாக்கம்', shipped: 'அனுப்பப்பட்டது', delivered: 'வழங்கப்பட்டது', cancel: 'ஆர்டர் ரத்து' },
    mr: { title: 'ऑर्डर व्यवस्थापन', backDash: 'डॅशबोर्डवर परत', searchPlaceholder: 'ID, खरेदीदार किंवा पीक शोधा...', total: 'एकूण', loading: 'ऑर्डर लोड होत आहेत...', accessDenied: 'प्रवेश नाकारला', accessMsg: 'केवळ नोंदणीकृत शेतकऱ्यांना ऑर्डर व्यवस्थापन उपलब्ध आहे.', goBack: 'परत जा', noOrders: 'ऑर्डर आढळल्या नाहीत', noOrdersMsg: 'आपल्या निकषाशी जुळणाऱ्या ऑर्डर आढळल्या नाहीत.', totalAmt: 'एकूण रक्कम', currentStatus: 'सध्याची स्थिती', buyerDetails: 'खरेदीदार तपशील', orderItems: 'ऑर्डर बाबी', viewDetails: 'तपशील पहा', pending: 'प्रलंबित चिन्हांकित करा', processing: 'प्रक्रिया', shipped: 'पाठवले', delivered: 'वितरित', cancel: 'ऑर्डर रद्द करा' },
    kn: { title: 'ಆರ್ಡರ್ ನಿರ್ವಹಣೆ', backDash: 'ಡ್ಯಾಶ್‌ಬೋರ್ಡ್‌ಗೆ ಹಿಂತಿರುಗಿ', searchPlaceholder: 'ID, ಖರೀದಿದಾರ ಅಥವಾ ಬೆಳೆ ಹುಡುಕಿ...', total: 'ಒಟ್ಟು', loading: 'ಆರ್ಡರ್‌ಗಳು ಲೋಡ್ ಆಗುತ್ತಿವೆ...', accessDenied: 'ಪ್ರವೇಶ ನಿರಾಕರಿಸಲಾಗಿದೆ', accessMsg: 'ನೋಂದಾಯಿತ ರೈತರಿಗೆ ಮಾತ್ರ ಪ್ರವೇಶ.', goBack: 'ಹಿಂದೆ ಹೋಗಿ', noOrders: 'ಆರ್ಡರ್‌ಗಳು ಕಂಡುಬಂದಿಲ್ಲ', noOrdersMsg: 'ನಿಮ್ಮ ಮಾನದಂಡಕ್ಕೆ ಹೊಂದಿಕೆಯಾಗುವ ಆರ್ಡರ್‌ಗಳಿಲ್ಲ.', totalAmt: 'ಒಟ್ಟು ಮೊತ್ತ', currentStatus: 'ಪ್ರಸ್ತುತ ಸ್ಥಿತಿ', buyerDetails: 'ಖರೀದಿದಾರ ವಿವರ', orderItems: 'ಆರ್ಡರ್ ಐಟಂಗಳು', viewDetails: 'ವಿವರ ನೋಡಿ', pending: 'ಬಾಕಿ ಗುರುತಿಸಿ', processing: 'ಸಂಸ್ಕರಣೆ', shipped: 'ಕಳುಹಿಸಲಾಗಿದೆ', delivered: 'ತಲುಪಿಸಲಾಗಿದೆ', cancel: 'ಆರ್ಡರ್ ರದ್ದು' },
    pa: { title: 'ਆਰਡਰ ਪ੍ਰਬੰਧਨ', backDash: 'ਡੈਸ਼ਬੋਰਡ ਤੇ ਵਾਪਸ', searchPlaceholder: 'ID, ਖਰੀਦਦਾਰ ਜਾਂ ਫ਼ਸਲ ਦੁਆਰਾ ਖੋਜੋ...', total: 'ਕੁੱਲ', loading: 'ਆਰਡਰ ਲੋਡ ਹੋ ਰਹੇ ਹਨ...', accessDenied: 'ਪਹੁੰਚ ਤੋਂ ਇਨਕਾਰ', accessMsg: 'ਸਿਰਫ਼ ਰਜਿਸਟਰਡ ਕਿਸਾਨਾਂ ਨੂੰ ਪਹੁੰਚ ਹੈ।', goBack: 'ਵਾਪਸ ਜਾਓ', noOrders: 'ਕੋਈ ਆਰਡਰ ਨਹੀਂ ਮਿਲਿਆ', noOrdersMsg: 'ਤੁਹਾਡੇ ਮਾਪਦੰਡਾਂ ਨਾਲ ਕੋਈ ਆਰਡਰ ਮੇਲ ਨਹੀਂ ਖਾਂਦਾ।', totalAmt: 'ਕੁੱਲ ਰਕਮ', currentStatus: 'ਮੌਜੂਦਾ ਸਥਿਤੀ', buyerDetails: 'ਖਰੀਦਦਾਰ ਵੇਰਵੇ', orderItems: 'ਆਰਡਰ ਆਈਟਮਾਂ', viewDetails: 'ਵੇਰਵੇ ਦੇਖੋ', pending: 'ਬਕਾਇਆ ਚਿੰਨਤ ਕਰੋ', processing: 'ਪ੍ਰਕਿਰਿਆ', shipped: 'ਭੇਜਿਆ ਗਿਆ', delivered: 'ਡਿਲੀਵਰ', cancel: 'ਆਰਡਰ ਰੱਦ ਕਰੋ' },
    ml: { title: 'ഓർഡർ മാനേജ്‌മെന്റ്', backDash: 'ഡാഷ്‌ബോർഡിലേക്ക് മടങ്ങൽ', searchPlaceholder: 'ID, വാങ്ങുന്നയാൾ, അല്ലെങ്കിൽ വിള തിരയൂ...', total: 'ആകെ', loading: 'ഓർഡറുകൾ ലോഡ് ചെയ്യുന്നു...', accessDenied: 'ആക്‌സസ് നിരസിച്ചു', accessMsg: 'രജിസ്‌ട്രേഷൻ ഉള്ള കർഷകർക്ക് മാത്രം ആക്‌സസ്.', goBack: 'തിരിച്ചു പോകൂ', noOrders: 'ഓർഡറുകൾ കണ്ടെത്തിയില്ല', noOrdersMsg: 'നിങ്ങളുടെ മാനദണ്ഡങ്ങളുമായി പൊരുത്തപ്പെടുന്ന ഓർഡറുകൾ ഇല്ല.', totalAmt: 'ആകെ തുക', currentStatus: 'നിലവിലുള്ള നില', buyerDetails: 'വാങ്ങുന്നയാൾ വിശദാംശങ്ങൾ', orderItems: 'ഓർഡർ ഇനങ്ങൾ', viewDetails: 'വിശദാംശങ്ങൾ കാണുക', pending: 'പെൻഡിംഗ് അടയാളപ്പെടുത്തുക', processing: 'പ്രോസസ്സിംഗ്', shipped: 'അയച്ചു', delivered: 'ഡെലിവർ ചെയ്തു', cancel: 'ഓർഡർ റദ്ദാക്കുക' },
};

const OrderManagement = ({ user }) => {
    const navigate = useNavigate();
    const { langCode } = useLanguage();
    const t = omTranslations[langCode] || omTranslations.en;
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState("");
    const [updatingId, setUpdatingId] = useState(null);

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                if (!user || user.role !== 'farmer') {
                    setLoading(false);
                    return;
                }

                const response = await fetch(`http://localhost:5001/api/orders/farmer/${user.email}`);
                if (response.ok) {
                    const data = await response.json();
                    setOrders(data);
                }
            } catch (error) {
                console.error("Failed to fetch orders:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchOrders();
    }, [user]);

    const handleStatusUpdate = async (orderId, newStatus) => {
        try {
            setUpdatingId(orderId);
            const response = await fetch(`http://localhost:5001/api/orders/${orderId}/status`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ status: newStatus })
            });

            if (response.ok) {
                const updatedOrder = await response.json();
                setOrders(orders.map(order => order._id === orderId ? updatedOrder : order));
            }
        } catch (error) {
            console.error("Error updating order status:", error);
        } finally {
            setUpdatingId(null);
        }
    };

    const getStatusColor = (status) => {
        switch (status) {
            case 'Pending': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
            case 'Processing': return 'bg-blue-100 text-blue-800 border-blue-200';
            case 'Shipped': return 'bg-purple-100 text-purple-800 border-purple-200';
            case 'Delivered': return 'bg-green-100 text-green-800 border-green-200';
            case 'Cancelled': return 'bg-red-100 text-red-800 border-red-200';
            default: return 'bg-gray-100 text-gray-800 border-gray-200';
        }
    };

    const getStatusIcon = (status) => {
        switch (status) {
            case 'Pending': return <Clock size={16} className="text-yellow-600" />;
            case 'Processing': return <Package size={16} className="text-blue-600" />;
            case 'Shipped': return <Truck size={16} className="text-purple-600" />;
            case 'Delivered': return <CheckCircle size={16} className="text-green-600" />;
            case 'Cancelled': return <XCircle size={16} className="text-red-600" />;
            default: return <Clock size={16} />;
        }
    };

    const filteredOrders = orders.filter(order =>
        order.buyerEmail.toLowerCase().includes(searchQuery.toLowerCase()) ||
        order._id.includes(searchQuery) ||
        order.items.some(item => item.crop.toLowerCase().includes(searchQuery.toLowerCase()))
    );

    if (loading) {
        return <div className="min-h-screen flex items-center justify-center bg-gray-50 text-emerald-700 font-bold">{t.loading}</div>;
    }

    if (!user || user.role !== 'farmer') {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 p-6 text-center">
                <Package size={64} className="text-slate-300 mb-6" />
                <h2 className="text-2xl font-black text-slate-800 mb-2">{t.accessDenied}</h2>
                <p className="text-slate-500 mb-8 max-w-md">{t.accessMsg}</p>
                <button onClick={() => navigate(-1)} className="bg-emerald-600 text-white font-bold py-3 px-8 rounded-xl shadow-lg hover:bg-emerald-700 transition-all flex items-center gap-2">
                    <ArrowLeft size={20} /> {t.goBack}
                </button>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#F8FAFC] pb-24 text-slate-900 font-sans">
            <div className="max-w-7xl mx-auto px-6 pt-12">

                {/* Header Options */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-10">
                    <div>
                        <button onClick={() => navigate('/')} className="text-slate-500 hover:text-emerald-600 font-bold mb-4 flex items-center gap-2 transition-colors">
                            <ArrowLeft size={18} /> {t.backDash}
                        </button>
                        <h1 className="text-4xl md:text-5xl font-black tracking-tight flex items-center gap-4">
                            {t.title}
                            <span className="bg-sky-100 text-sky-700 text-sm font-bold px-3 py-1 rounded-full border border-sky-200">
                                {orders.length} {t.total}
                            </span>
                        </h1>
                        <p className="text-slate-500 font-medium mt-3">Manage incoming orders from buyers and track delivery status.</p>
                    </div>

                    <div className="relative w-full md:w-80 group">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-sky-600 transition-colors" />
                        <input
                            type="text"
                            placeholder={t.searchPlaceholder}
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full bg-white border-2 border-slate-200 rounded-2xl py-3 pl-12 pr-4 shadow-sm focus:border-sky-500 focus:ring-4 focus:ring-sky-500/10 outline-none transition-all font-medium"
                        />
                    </div>
                </div>

                {/* Orders List */}
                {filteredOrders.length === 0 ? (
                    <div className="bg-white rounded-3xl p-16 text-center shadow-lg border border-slate-200 flex flex-col items-center">
                        <div className="w-24 h-24 bg-sky-50 rounded-full flex items-center justify-center text-sky-400 mb-6">
                            <Package size={48} />
                        </div>
                        <h3 className="text-2xl font-black text-slate-800 mb-2">{t.noOrders}</h3>
                        <p className="text-slate-500 font-medium max-w-sm">{t.noOrdersMsg}</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 gap-6">
                        {filteredOrders.map((order) => (
                            <div key={order._id} className="bg-white rounded-[2rem] p-6 md:p-8 shadow-md border border-slate-200 hover:shadow-xl transition-all duration-300">
                                <div className="flex flex-col lg:flex-row justify-between lg:items-center gap-6 pb-6 border-b border-slate-100">
                                    {/* Order Meta */}
                                    <div>
                                        <div className="flex items-center gap-3 mb-2">
                                            <span className="font-mono text-xs font-bold text-slate-400 bg-slate-100 px-3 py-1 rounded-lg">ID: {order._id.slice(-8).toUpperCase()}</span>
                                            <span className="flex items-center gap-1 text-slate-500 text-sm font-medium"><Calendar size={14} /> {new Date(order.createdAt).toLocaleDateString()}</span>
                                        </div>
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 bg-emerald-100 rounded-xl flex items-center justify-center text-emerald-700">
                                                <User size={20} />
                                            </div>
                                            <div>
                                                <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-0.5">{t.buyerDetails}</p>
                                                <p className="font-bold text-slate-800">{order.buyerEmail}</p>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Order Total & Status Control */}
                                    <div className="flex flex-wrap items-center gap-4 lg:gap-8 bg-slate-50 p-4 rounded-2xl border border-slate-100">
                                        <div>
                                            <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-0.5">{t.totalAmt}</p>
                                            <p className="text-2xl font-black text-slate-900">₹{order.totalAmount.toLocaleString()}</p>
                                        </div>
                                        <div className="w-px h-10 bg-slate-200 hidden md:block"></div>
                                        <div>
                                            <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">{t.currentStatus}</p>
                                            <div className={`flex items-center gap-2 px-4 py-2 rounded-xl border font-bold text-sm ${getStatusColor(order.status)}`}>
                                                {getStatusIcon(order.status)}
                                                {order.status}
                                            </div>
                                        </div>
                                        <div className="w-full lg:w-auto mt-2 lg:mt-0 flex gap-4">
                                            <select
                                                value={order.status}
                                                onChange={(e) => handleStatusUpdate(order._id, e.target.value)}
                                                disabled={updatingId === order._id || order.status === 'Cancelled' || order.status === 'Delivered'}
                                                className="w-full lg:w-48 bg-white border-2 border-slate-200 text-slate-700 text-sm rounded-xl px-4 py-3 font-bold focus:outline-none focus:border-sky-500 focus:ring-4 focus:ring-sky-500/10 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed shadow-sm transition-all"
                                            >
                                                <option value="Pending">{t.pending}</option>
                                                <option value="Processing">{t.processing}</option>
                                                <option value="Shipped">{t.shipped}</option>
                                                <option value="Delivered">{t.delivered}</option>
                                                <option value="Cancelled">{t.cancel}</option>
                                            </select>
                                            <button
                                                onClick={() => navigate(`/order/${order._id}`)}
                                                className="w-full lg:w-auto bg-white border-2 border-emerald-500 text-emerald-700 hover:bg-emerald-50 text-sm rounded-xl px-6 py-3 font-bold transition-all shadow-sm"
                                            >
                                                {t.viewDetails}
                                            </button>
                                        </div>
                                    </div>
                                </div>

                                {/* Order Items */}
                                <div className="mt-6">
                                    <h4 className="text-sm font-black text-slate-800 uppercase tracking-wider mb-4 flex items-center gap-2">
                                        <Package size={16} className="text-slate-400" />
                                        Order Items ({order.items.length})
                                    </h4>
                                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                        {order.items.map((item, idx) => (
                                            <div key={idx} className="flex gap-4 p-4 rounded-2xl border border-slate-100 bg-slate-50/50 hover:bg-white hover:shadow-md transition-all">
                                                <div className="w-16 h-16 rounded-xl overflow-hidden bg-slate-200 shrink-0 border border-slate-200">
                                                    {item.imageUrl ? (
                                                        <img src={item.imageUrl} alt={item.crop} className="w-full h-full object-cover" />
                                                    ) : (
                                                        <div className="w-full h-full flex items-center justify-center text-slate-400"><Sprout /></div>
                                                    )}
                                                </div>
                                                <div className="flex flex-col justify-center">
                                                    <p className="font-bold text-slate-800 text-lg leading-tight mb-1">{item.crop}</p>
                                                    <div className="flex items-center gap-2 text-sm">
                                                        <span className="font-bold text-sky-600">₹{item.price}</span>
                                                        <span className="text-slate-300">|</span>
                                                        <span className="font-medium text-slate-500">Qty: {item.quantity}</span>
                                                    </div>
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

export default OrderManagement;
