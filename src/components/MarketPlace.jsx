import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import {
  Search,
  MapPin,
  Filter,
  Star,
  Phone,
  TrendingUp,
  ArrowLeft,
  ShoppingCart,
  ChevronRight,
  PackageCheck,
  Store,
  Loader2
} from "lucide-react";
import { useCart } from "./CartContext";
import { useLanguage } from "./LanguageContext";

const mpTranslations = {
  en: { search: 'Search premium crops or farmers...', filters: 'Market Filters', region: 'Region / State', regionPH: 'e.g. Kerala', budget: 'Max Budget', budgetPH: 'Enter amount', liveText: 'Crops added by local farmers appear here in real-time.', verifiedTitle: 'Verified Harvests', productsAvail: 'products available from local farmers', fetchingData: 'Fetching live harvest data...', noFiltered: 'No crops found matching your filters.', featured: '✨ Featured Selection', priceLow: '📉 Price: Low to High', priceHigh: '📈 Price: High to Low', farmerRating: '⭐️ Farmer Rating', farmerLabel: 'Farmer', stockLabel: 'Stock', details: 'Details', qualityTitle: 'Quality Assurance', qualityDesc: 'Every harvest is verified for grade and moisture by local experts.', sellerProgram: 'Verified Seller Program', quintal: 'Quintal' },
  hi: { search: 'फसल या किसान खोजें...', filters: 'बाज़ार फ़िल्टर', region: 'क्षेत्र / राज्य', regionPH: 'उदा. केरल', budget: 'अधिकतम बजट', budgetPH: 'राशि दर्ज करें', liveText: 'स्थानीय किसानों द्वारा जोड़ी गई फसलें यहाँ दिखती हैं।', verifiedTitle: 'सत्यापित फसलें', productsAvail: 'उत्पाद उपलब्ध', fetchingData: 'लाइव डेटा लोड हो रहा है...', noFiltered: 'कोई फसल नहीं मिली।', featured: '✨ विशेष चयन', priceLow: '📉 मूल्य: कम से अधिक', priceHigh: '📈 मूल्य: अधिक से कम', farmerRating: '⭐️ किसान रेटिंग', farmerLabel: 'किसान', stockLabel: 'स्टॉक', details: 'विवरण', qualityTitle: 'गुणवत्ता आश्वासन', qualityDesc: 'हर फसल स्थानीय विशेषज्ञों द्वारा सत्यापित है।', sellerProgram: 'विक्रेता सत्यापन कार्यक्रम', quintal: 'क्विंटल' },
  te: { search: 'పంటలు లేదా రైతులను వెతకండి...', filters: 'మార్కెట్ ఫిల్టర్లు', region: 'ప్రాంతం / రాష్ట్రం', regionPH: 'ఉదా. కేరళ', budget: 'గరిష్ట బడ్జెట్', budgetPH: 'మొత్తం నమోదు చేయండి', liveText: 'స్థానిక రైతులు జోడించిన పంటలు ఇక్కడ కనిపిస్తాయి.', verifiedTitle: 'ధృవీకరించిన పంటలు', productsAvail: 'ఉత్పత్తులు అందుబాటులో', fetchingData: 'లైవ్ డేటా లోడ్ అవుతోంది...', noFiltered: 'ఫిల్టర్లకు సరిపోలే పంటలు లేవు.', featured: '✨ ఫీచర్డ్ ఎంపిక', priceLow: '📉 ధర: తక్కువ నుండి ఎక్కువ', priceHigh: '📈 ధర: ఎక్కువ నుండి తక్కువ', farmerRating: '⭐️ రైతు రేటింగ్', farmerLabel: 'రైతు', stockLabel: 'స్టాక్', details: 'వివరాలు', qualityTitle: 'నాణ్యత హామీ', qualityDesc: 'ప్రతి పంట స్థానిక నిపుణులచే ధృవీకరించబడింది.', sellerProgram: 'ధృవీకరించిన విక్రేత కార్యక్రమం', quintal: 'క్వింటల్' },
  ta: { search: 'பயிர்கள் அல்லது விவசாயிகளை தேடுங்கள்...', filters: 'சந்தை வடிகட்டிகள்', region: 'பகுதி / மாநிலம்', regionPH: 'எ.கா. கேரளா', budget: 'அதிகபட்ச பட்ஜெட்', budgetPH: 'தொகை உள்ளிடு', liveText: 'உள்ளூர் விவசாயிகள் சேர்க்கும் பயிர்கள் இங்கே தோன்றும்.', verifiedTitle: 'சரிபார்க்கப்பட்ட அறுவடை', productsAvail: 'தயாரிப்புகள் கிடைக்கும்', fetchingData: 'நேரடி தரவு ஏற்றுகிறது...', noFiltered: 'பொருந்தும் பயிர்கள் இல்லை.', featured: '✨ சிறப்பு தேர்வு', priceLow: '📉 விலை: குறைவு', priceHigh: '📈 விலை: அதிகம்', farmerRating: '⭐️ விவசாயி மதிப்பு', farmerLabel: 'விவசாயி', stockLabel: 'இருப்பு', details: 'விவரங்கள்', qualityTitle: 'தர உறுதிப்பாடு', qualityDesc: 'ஒவ்வொரு அறுவடையும் உள்ளூர் நிபுணர்களால் சரிபார்க்கப்படுகிறது.', sellerProgram: 'சரிபார்க்கப்பட்ட விற்பனையாளர் திட்டம்', quintal: 'குவிண்டல்' },
  mr: { search: 'पिके किंवा शेतकरी शोधा...', filters: 'बाजार फिल्टर', region: 'प्रदेश / राज्य', regionPH: 'उदा. केरळ', budget: 'कमाल बजेट', budgetPH: 'रक्कम टाका', liveText: 'स्थानिक शेतकऱ्यांनी जोडलेली पिके येथे दिसतात.', verifiedTitle: 'सत्यापित कापणी', productsAvail: 'उत्पादने उपलब्ध', fetchingData: 'लाइव्ह डेटा लोड होत आहे...', noFiltered: 'जुळणारी पिके सापडली नाहीत.', featured: '✨ वैशिष्ट्यीकृत निवड', priceLow: '📉 किंमत: कमी', priceHigh: '📈 किंमत: जास्त', farmerRating: '⭐️ शेतकरी रेटिंग', farmerLabel: 'शेतकरी', stockLabel: 'साठा', details: 'तपशील', qualityTitle: 'गुणवत्ता आश्वासन', qualityDesc: 'प्रत्येक कापणी स्थानिक तज्ज्ञांकडून सत्यापित केली जाते.', sellerProgram: 'सत्यापित विक्रेता कार्यक्रम', quintal: 'क्विंटल' },
  kn: { search: 'ಬೆಳೆಗಳು ಅಥವಾ ರೈತರನ್ನು ಹುಡುಕಿ...', filters: 'ಮಾರ್ಕೆಟ್ ಫಿಲ್ಟರ್‌ಗಳು', region: 'ಪ್ರದೇಶ / ರಾಜ್ಯ', regionPH: 'ಉದಾ. ಕೇರಳ', budget: 'ಗರಿಷ್ಠ ಬಜೆಟ್', budgetPH: 'ಮೊತ್ತ ನಮೂದಿಸಿ', liveText: 'ಸ್ಥಳೀಯ ರೈತರು ಸೇರಿಸಿದ ಬೆಳೆಗಳು ಇಲ್ಲಿ ಕಾಣಿಸುತ್ತವೆ.', verifiedTitle: 'ಪರಿಶೀಲಿಸಿದ ಬೆಳೆಗಳು', productsAvail: 'ಉತ್ಪನ್ನಗಳು ಲಭ್ಯ', fetchingData: 'ಲೈವ್ ಡೇಟಾ ಲೋಡ್ ಆಗುತ್ತಿದೆ...', noFiltered: 'ಫಿಲ್ಟರ್‌ಗಳಿಗೆ ಹೊಂದುವ ಬೆಳೆಗಳಿಲ್ಲ.', featured: '✨ ವೈಶಿಷ್ಟ್ಯದ ಆಯ್ಕೆ', priceLow: '📉 ಬೆಲೆ: ಕಡಿಮೆ', priceHigh: '📈 ಬೆಲೆ: ಹೆಚ್ಚು', farmerRating: '⭐️ ರೈತ ರೇಟಿಂಗ್', farmerLabel: 'ರೈತ', stockLabel: 'ಸ್ಟಾಕ್', details: 'ವಿವರ', qualityTitle: 'ಗುಣಮಟ್ಟ ಖಾತ್ರಿ', qualityDesc: 'ಪ್ರತಿ ಬೆಳೆ ಸ್ಥಳೀಯ ತಜ್ಞರಿಂದ ಪರಿಶೀಲಿಸಲಾಗಿದೆ.', sellerProgram: 'ಪರಿಶೀಲಿತ ಮಾರಾಟಗಾರ ಕಾರ್ಯಕ್ರಮ', quintal: 'ಕ್ವಿಂಟಲ್' },
  pa: { search: 'ਫ਼ਸਲਾਂ ਜਾਂ ਕਿਸਾਨਾਂ ਦੀ ਖੋਜ ਕਰੋ...', filters: 'ਮਾਰਕੀਟ ਫਿਲਟਰ', region: 'ਖੇਤਰ / ਰਾਜ', regionPH: 'ਉਦਾ. ਕੇਰਲਾ', budget: 'ਵੱਧ ਤੋਂ ਵੱਧ ਬਜਟ', budgetPH: 'ਰਕਮ ਦਰਜ ਕਰੋ', liveText: 'ਸਥਾਨਕ ਕਿਸਾਨਾਂ ਦੀਆਂ ਫ਼ਸਲਾਂ ਇੱਥੇ ਦਿਖਦੀਆਂ ਹਨ।', verifiedTitle: 'ਤਸਦੀਕ ਫ਼ਸਲਾਂ', productsAvail: 'ਉਤਪਾਦ ਉਪਲਬਧ', fetchingData: 'ਲਾਈਵ ਡੇਟਾ ਲੋਡ ਹੋ ਰਿਹਾ ਹੈ...', noFiltered: 'ਕੋਈ ਫ਼ਸਲ ਨਹੀਂ ਮਿਲੀ।', featured: '✨ ਵਿਸ਼ੇਸ਼ ਚੋਣ', priceLow: '📉 ਕੀਮਤ: ਘੱਟ ਤੋਂ ਵੱਧ', priceHigh: '📈 ਕੀਮਤ: ਵੱਧ ਤੋਂ ਘੱਟ', farmerRating: '⭐️ ਕਿਸਾਨ ਰੇਟਿੰਗ', farmerLabel: 'ਕਿਸਾਨ', stockLabel: 'ਸਟਾਕ', details: 'ਵੇਰਵੇ', qualityTitle: 'ਗੁਣਵੱਤਾ ਭਰੋਸਾ', qualityDesc: 'ਹਰੇਕ ਫ਼ਸਲ ਸਥਾਨਕ ਮਾਹਰਾਂ ਦੁਆਰਾ ਤਸਦੀਕ ਕੀਤੀ ਜਾਂਦੀ ਹੈ।', sellerProgram: 'ਤਸਦੀਕਸ਼ੁਦਾ ਵਿਕ੍ਰੇਤਾ ਪ੍ਰੋਗਰਾਮ', quintal: 'ਕੁਇੰਟਲ' },
  ml: { search: 'വിളകൾ അല്ലെങ്കിൽ കർഷകരെ തിരയൂ...', filters: 'മാർക്കറ്റ് ഫിൽറ്ററുകൾ', region: 'പ്രദേശം / സംസ്ഥാനം', regionPH: 'ഉദാ. കേരള', budget: 'പരമ്പരാ ബഡ്ജറ്റ്', budgetPH: 'തുക നൽകൂ', liveText: 'പ്രാദേശിക കർഷകർ ചേർക്കുന്ന വിളകൾ ഇവിടെ കാണാം.', verifiedTitle: 'സ്ഥിരീകരിച്ച വിളകൾ', productsAvail: 'ഉൽപ്പന്നങ്ങൾ ലഭ്യം', fetchingData: 'ലൈവ് ഡാറ്റ ലോഡ്...', noFiltered: 'ഫിൽറ്ററുകൾക്ക് യോജിക്കുന്ന വിളകൾ ഇല്ല.', featured: '✨ ഫീച്ചർ ചെയ്ത തിരഞ്ഞെടുപ്പ്', priceLow: '📉 വില: കുറഞ്ഞതിൽ നിന്ന്', priceHigh: '📈 വില: കൂടുതൽ ആദ്യം', farmerRating: '⭐️ കർഷക റേറ്റിംഗ്', farmerLabel: 'കർഷകൻ', stockLabel: 'സ്റ്റോക്ക്', details: 'വിശദാംശങ്ങൾ', qualityTitle: 'ഗുണനിലവാര ഉറപ്പ്', qualityDesc: 'ഓരോ വിളയും പ്രാദേശിക വിദഗ്ദ്ധർ പരിശോധിക്കുന്നു.', sellerProgram: 'സ്ഥിരീകരിച്ച വിൽപ്പനക്കാരൻ', quintal: 'ക്വിൻറ്റൽ' },
};

// Helper to assign images based on crop name
const getCropImage = (cropName) => {
  const name = cropName?.toLowerCase() || "";
  if (name.includes("rice")) return "https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&q=80&w=400";
  if (name.includes("wheat")) return "https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?auto=format&fit=crop&q=80&w=400";
  if (name.includes("tomato")) return "https://images.unsplash.com/photo-1592924357228-91a4daadcfea?auto=format&fit=crop&q=80&w=400";
  return "https://images.unsplash.com/photo-1500937386664-56d1dfef3854?auto=format&fit=crop&q=80&w=400";
};

const Marketplace = () => {
  const navigate = useNavigate();
  const { addToCart, totalItems } = useCart();
  const { langCode } = useLanguage();
  const t = mpTranslations[langCode] || mpTranslations.en;

  // State for Database Products
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  // Filters
  const [locationFilter, setLocationFilter] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [sortBy, setSortBy] = useState("featured");

  // 1. FETCH DATA FROM DATABASE
  useEffect(() => {
    const fetchCrops = async () => {
      try {
        const response = await fetch("http://localhost:5001/api/products");
        const data = await response.json();
        setProducts(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error("Error fetching Marketplace:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchCrops();
  }, []);

  // 2. FILTER & SORT LOGIC
  let filtered = products.filter((p) => {
    const matchesLocation = locationFilter === "" || p.location?.toLowerCase().includes(locationFilter.toLowerCase());
    const matchesPrice = maxPrice === "" || p.price <= parseInt(maxPrice);
    const matchesSearch =
      p.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.farmerName?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.crop?.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesLocation && matchesPrice && matchesSearch;
  });

  if (sortBy === "priceLow") filtered.sort((a, b) => a.price - b.price);
  else if (sortBy === "priceHigh") filtered.sort((a, b) => b.price - a.price);
  else if (sortBy === "rating") filtered.sort((a, b) => (b.rating || 0) - (a.rating || 0));

  return (
    <div className="bg-[#F8FAF9] min-h-screen font-sans text-slate-900 pb-10">
      {/* --- Premium Navbar --- */}
      <nav className="bg-emerald-900 text-white shadow-xl sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 md:px-8 py-4 flex justify-between items-center">
          <div className="flex items-center gap-6">
            <button onClick={() => navigate('/')} className="p-2 hover:bg-emerald-800 rounded-xl transition-all border border-emerald-800">
              <ArrowLeft size={20} />
            </button>
            <div className="flex items-center gap-2">
              <div className="bg-emerald-500 p-1.5 rounded-lg"><Store size={22} className="text-white" /></div>
              <h1 className="text-xl font-black tracking-tight uppercase">Agri<span className="text-emerald-400">Market</span></h1>
            </div>
          </div>

          <div className="hidden md:flex bg-emerald-950/50 rounded-2xl px-5 py-2.5 items-center w-2/5 border border-emerald-800 focus-within:border-emerald-400 transition-all shadow-inner">
            <Search size={18} className="text-emerald-500 mr-3" />
            <input
              type="text"
              placeholder={t.search}
              className="bg-transparent outline-none w-full text-sm placeholder-emerald-700 text-emerald-50"
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <button onClick={() => navigate('/cart')} className="p-3 bg-emerald-800 hover:bg-emerald-700 rounded-2xl transition-all relative border border-emerald-700">
            <ShoppingCart size={22} />
            {totalItems > 0 && (
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] font-bold h-5 w-5 flex items-center justify-center rounded-full border-2 border-emerald-900 animate-pulse">
                {totalItems}
              </span>
            )}
          </button>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto p-4 md:p-8 flex flex-col md:flex-row gap-10">
        {/* --- Sidebar Filters --- */}
        <aside className="w-full md:w-72 flex-shrink-0">
          <div className="bg-white p-7 rounded-[2.5rem] shadow-sm border border-emerald-100 sticky top-28">
            <div className="flex items-center gap-3 mb-8">
              <div className="p-2 bg-emerald-50 rounded-xl"><Filter size={20} className="text-emerald-700" /></div>
              <h3 className="font-black text-slate-800 uppercase tracking-widest text-sm">{t.filters}</h3>
            </div>

            <div className="space-y-8">
              <div>
                <label className="text-[10px] font-black uppercase text-emerald-800 mb-3 block tracking-widest">{t.region}</label>
                <div className="relative group">
                  <MapPin size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-emerald-600" />
                  <input
                    type="text"
                    placeholder={t.regionPH}
                    className="w-full bg-emerald-50/50 border border-emerald-100 rounded-2xl pl-11 pr-4 py-3.5 text-sm focus:ring-2 focus:ring-emerald-500 outline-none"
                    onChange={(e) => setLocationFilter(e.target.value)}
                  />
                </div>
              </div>

              <div>
                <label className="text-[10px] font-black uppercase text-emerald-800 mb-3 block tracking-widest">{t.budget}</label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-emerald-700 font-bold">₹</span>
                  <input
                    type="number"
                    placeholder={t.budgetPH}
                    className="w-full bg-emerald-50/50 border border-emerald-100 rounded-2xl pl-9 pr-4 py-3.5 text-sm focus:ring-2 focus:ring-emerald-500 outline-none"
                    onChange={(e) => setMaxPrice(e.target.value)}
                  />
                </div>
              </div>

              <div className="pt-4 border-t border-emerald-50">
                <div className="bg-emerald-900 rounded-2xl p-4 text-white">
                  <TrendingUp className="text-emerald-400 mb-2" size={20} />
                  <p className="text-xs font-medium opacity-80 leading-relaxed">{t.liveText}</p>
                </div>
              </div>
            </div>
          </div>
        </aside>

        {/* --- Product Grid --- */}
        <main className="flex-1">
          {loading ? (
            <div className="flex flex-col items-center justify-center py-20">
              <Loader2 className="animate-spin text-emerald-600 mb-4" size={40} />
              <p className="font-bold text-slate-400">{t.fetchingData}</p>
            </div>
          ) : (
            <>
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-10 gap-6">
                <div>
                  <h2 className="text-3xl font-black text-emerald-900 tracking-tight">{t.verifiedTitle}</h2>
                  <p className="text-slate-500 text-sm font-medium">{filtered.length} {t.productsAvail}</p>
                </div>

                <select
                  className="bg-white border-2 border-emerald-50 px-5 py-3 rounded-2xl text-sm font-bold text-emerald-900 outline-none shadow-sm cursor-pointer"
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                >
                  <option value="featured">{t.featured}</option>
                  <option value="priceLow">{t.priceLow}</option>
                  <option value="priceHigh">{t.priceHigh}</option>
                  <option value="rating">{t.farmerRating}</option>
                </select>
              </div>

              <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                <AnimatePresence>
                  {filtered.map((p) => {
                    const productImg = p.imageUrl || getCropImage(p.name || p.crop);
                    return (
                      <motion.div
                        layout
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        key={p._id || p.id}
                        className="bg-white rounded-[2.5rem] shadow-sm border border-emerald-50 overflow-hidden hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 group flex flex-col"
                      >
                        <div className="h-52 overflow-hidden relative">
                          <img src={productImg} alt={p.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                          <div className="absolute top-4 right-4 bg-white/95 backdrop-blur-sm px-3 py-1.5 rounded-2xl text-xs font-black text-emerald-800 flex items-center gap-1.5 shadow-xl">
                            <Star size={14} className="fill-emerald-500 text-emerald-500" /> {p.rating || 4.5}
                          </div>
                        </div>

                        <div className="p-6 flex flex-col flex-1">
                          <div className="flex justify-between items-center mb-4">
                            <div className="space-y-0.5">
                              <h3 className="font-black text-xl text-emerald-900 capitalize tracking-tight">{p.name || p.crop}</h3>
                              <div className="flex items-center text-[11px] text-slate-400 font-bold uppercase tracking-wider">
                                <MapPin size={12} className="mr-1 text-emerald-500" /> {p.location}
                              </div>
                            </div>
                            <div className="text-right">
                              <p className="text-emerald-700 font-black text-2xl tracking-tighter">₹{p.price}</p>
                              <p className="text-[9px] text-slate-400 font-black uppercase tracking-widest">{t.quintal}</p>
                            </div>
                          </div>

                          <div className="mt-auto">
                            <div className="py-4 border-t border-emerald-50 flex items-center justify-between">
                              <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-xl bg-emerald-50 flex items-center justify-center text-emerald-700 font-black text-sm border border-emerald-100 uppercase">
                                  {(p.farmerName || p.farmer || "F")[0]}
                                </div>
                                <div className="leading-tight">
                                  <p className="text-[9px] text-slate-400 font-bold uppercase tracking-widest">{t.farmerLabel}</p>
                                  <span className="text-slate-800 font-black text-sm">{p.farmerName || p.farmer}</span>
                                </div>
                              </div>
                              <div className="text-right leading-tight">
                                <p className="text-[9px] text-slate-400 font-bold uppercase tracking-widest">{t.stockLabel}</p>
                                <span className="text-emerald-600 font-black text-xs">{p.quantity} qtl</span>
                              </div>
                            </div>

                            <div className="flex gap-2.5 mt-2">
                              <button onClick={() => navigate(`/product/${p._id || p.id}`, { state: { ...p, imageUrl: productImg } })} className="flex-1 bg-white border-2 border-emerald-100 py-3 rounded-2xl font-black text-emerald-900 text-[10px] uppercase tracking-widest hover:bg-emerald-50 flex items-center justify-center gap-2">
                                {t.details} <ChevronRight size={14} />
                              </button>
                              <button
                                title="Add to Cart"
                                onClick={() => addToCart({ ...p, id: p._id || p.id, imageUrl: productImg })} className="w-12 h-12 bg-emerald-600 hover:bg-emerald-700 text-white rounded-2xl flex items-center justify-center shadow-lg transition-all active:scale-90">
                                <ShoppingCart size={18} />
                              </button>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    );
                  })}
                </AnimatePresence>
                {!loading && filtered.length === 0 && (
                  <div className="col-span-full py-20 text-center">
                    <p className="text-slate-400 font-bold">{t.noProducts}</p>
                  </div>
                )}
              </motion.div>
            </>
          )}
        </main>
      </div>

      {/* --- Footer Branding --- */}
      <div className="max-w-7xl mx-auto px-4 md:px-8 mt-12">
        <div className="bg-white border border-emerald-100 p-8 rounded-[3rem] flex flex-col md:flex-row items-center justify-between gap-6 shadow-sm">
          <div className="flex items-center gap-5">
            <div className="p-4 bg-emerald-900 rounded-2xl"><PackageCheck size={32} className="text-emerald-400" /></div>
            <div>
              <h4 className="font-black text-slate-800 text-lg">{t.qualityTitle}</h4>
              <p className="text-slate-500 text-sm font-medium">{t.qualityDesc}</p>
            </div>
          </div>
          <button className="bg-emerald-900 text-white px-10 py-4 rounded-2xl font-black text-xs uppercase tracking-[0.2em] shadow-xl shadow-emerald-100">{t.sellerProgram}</button>
        </div>
      </div>
    </div>
  );
};

export default Marketplace;