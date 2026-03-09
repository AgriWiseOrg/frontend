import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Award, Sprout, Landmark, Bell, ArrowLeft, ChevronRight } from 'lucide-react';
import { useLanguage } from './LanguageContext';

const translations = {
  en: {
    heading: 'AgriWise', headingHighlight: 'Support',
    subtitle: 'Your digital partner for navigating government schemes, financial growth, and expert farming advice.',
    back: 'Back to Home',
    stayAhead: 'Stay ahead of the season',
    tracked: "We've tracked 45+ new schemes this month.",
    viewAlerts: 'View All Alerts',
    cards: {
      schemes: { title: 'Schemes for Me', desc: 'Unlock government subsidies and financial aid tailored for your farm.' },
      tips: { title: 'Smart Farming Tips', desc: 'Modern advisory for sustainable growth and pest management.' },
      finance: { title: 'Loans & Finance', desc: 'Low-interest credit options and micro-finance for equipment.' },
      updates: { title: 'Latest Updates', desc: 'Never miss a deadline. News and notifications from agri-departments.' },
    }
  },
  hi: {
    heading: 'एग्रीवाइज', headingHighlight: 'सहायता',
    subtitle: 'सरकारी योजनाओं, वित्तीय विकास और विशेषज्ञ कृषि सलाह के लिए आपका डिजिटल साथी।',
    back: 'होम पर वापस जाएं',
    stayAhead: 'मौसम से आगे रहें',
    tracked: 'इस महीने हमने 45+ नई योजनाएं ट्रैक की हैं।',
    viewAlerts: 'सभी अलर्ट देखें',
    cards: {
      schemes: { title: 'मेरे लिए योजनाएं', desc: 'आपके खेत के लिए अनुकूलित सरकारी सब्सिडी और वित्तीय सहायता।' },
      tips: { title: 'स्मार्ट खेती टिप्स', desc: 'सतत विकास और कीट प्रबंधन के लिए आधुनिक सलाह।' },
      finance: { title: 'ऋण और वित्त', desc: 'उपकरणों के लिए कम ब्याज क्रेडिट और माइक्रो-फाइनेंस।' },
      updates: { title: 'नवीनतम अपडेट', desc: 'कोई भी समय-सीमा न चूकें। कृषि विभागों की खबरें।' },
    }
  },
  te: {
    heading: 'అగ్రివైజ్', headingHighlight: 'సహాయం',
    subtitle: 'ప్రభుత్వ పథకాలు, ఆర్థిక వృద్ధి మరియు నిపుణ వ్యవసాయ సలహా కోసం మీ డిజిటల్ భాగస్వామి.',
    back: 'హోమ్‌కు తిరిగి వెళ్ళు',
    stayAhead: 'సీజన్‌కు ముందు ఉండండి',
    tracked: 'ఈ నెల 45+ కొత్త పథకాలను ట్రాక్ చేశాం.',
    viewAlerts: 'అన్ని హెచ్చరికలు చూడండి',
    cards: {
      schemes: { title: 'నాకు పథకాలు', desc: 'మీ వ్యవసాయానికి అనుగుణంగా ప్రభుత్వ సబ్సిడీలు.' },
      tips: { title: 'స్మార్ట్ వ్యవసాయ చిట్కాలు', desc: 'సుస్థిర వృద్ధి మరియు పురుగు నిర్వహణకు ఆధునిక సలహా.' },
      finance: { title: 'రుణాలు & ఆర్థికం', desc: 'పరికరాల కోసం తక్కువ వడ్డీ రుణాలు మరియు మైక్రో-ఫైనాన్స్.' },
      updates: { title: 'తాజా అప్‌డేట్‌లు', desc: 'గడువులను మిస్ చేయకుండా ఉండండి. వ్యవసాయ విభాగాల వార్తలు.' },
    }
  },
  ta: {
    heading: 'அக்ரிவைஸ்', headingHighlight: 'ஆதரவு',
    subtitle: 'அரசு திட்டங்கள், நிதி வளர்ச்சி மற்றும் வல்லுனர் விவசாய ஆலோசனைக்கான உங்கள் டிஜிட்டல் பங்காளி.',
    back: 'முகப்புக்கு திரும்பு',
    stayAhead: 'பருவத்திற்கு முன்னால் இருங்கள்',
    tracked: 'இந்த மாதம் 45+ புதிய திட்டங்களை கண்காணித்தோம்.',
    viewAlerts: 'அனைத்து எச்சரிக்கைகளையும் காண்க',
    cards: {
      schemes: { title: 'என்னுடைய திட்டங்கள்', desc: 'உங்கள் பண்ணைக்கு ஏற்ற அரசு மானியங்கள்.' },
      tips: { title: 'ஸ்மார்ட் விவசாய குறிப்புகள்', desc: 'நிலையான வளர்ச்சிக்கான நவீன ஆலோசனை.' },
      finance: { title: 'கடன்கள் & நிதி', desc: 'குறைந்த வட்டி கடன் மற்றும் நுண்-நிதி.' },
      updates: { title: 'சமீபத்திய புதுப்பிப்புகள்', desc: 'எந்த காலக்கெடுவையும் தவறவிடாதீர்கள்.' },
    }
  },
  mr: {
    heading: 'अॅग्रीवाइज', headingHighlight: 'समर्थन',
    subtitle: 'सरकारी योजना, आर्थिक वाढ आणि कृषी सल्ल्यासाठी तुमचा डिजिटल सहकारी.',
    back: 'मुख्यपृष्ठावर परत जा',
    stayAhead: 'हंगामापुढे राहा',
    tracked: 'या महिन्यात आम्ही 45+ नवीन योजना ट्रॅक केल्या.',
    viewAlerts: 'सर्व सूचना पहा',
    cards: {
      schemes: { title: 'माझ्यासाठी योजना', desc: 'तुमच्या शेतासाठी सरकारी अनुदान व आर्थिक मदत.' },
      tips: { title: 'स्मार्ट शेती टिपा', desc: 'शाश्वत वाढ आणि कीड व्यवस्थापनासाठी सल्ला.' },
      finance: { title: 'कर्जे आणि वित्त', desc: 'कमी व्याजदर कर्ज आणि मायक्रो-फायनान्स.' },
      updates: { title: 'ताजे अपडेट्स', desc: 'कोणतीही मुदत चुकवू नका. कृषी विभागाच्या बातम्या.' },
    }
  },
  kn: {
    heading: 'ಅಗ್ರಿವೈಸ್', headingHighlight: 'ಬೆಂಬಲ',
    subtitle: 'ಸರ್ಕಾರಿ ಯೋಜನೆಗಳು, ಆರ್ಥಿಕ ವೃದ್ಧಿ ಮತ್ತು ತಜ್ಞ ಕೃಷಿ ಸಲಹೆಗಾಗಿ ನಿಮ್ಮ ಡಿಜಿಟಲ್ ಸಹಚರ.',
    back: 'ಮನೆ ಪುಟಕ್ಕೆ ಹಿಂತಿರುಗಿ',
    stayAhead: 'ಋತುವಿಗೆ ಮುಂದಿರಿ',
    tracked: 'ಈ ತಿಂಗಳು 45+ ಹೊಸ ಯೋಜನೆಗಳನ್ನು ಟ್ರ್ಯಾಕ್ ಮಾಡಿದ್ದೇವೆ.',
    viewAlerts: 'ಎಲ್ಲಾ ಎಚ್ಚರಿಕೆಗಳನ್ನು ವೀಕ್ಷಿಸಿ',
    cards: {
      schemes: { title: 'ನನಗಾಗಿ ಯೋಜನೆಗಳು', desc: 'ನಿಮ್ಮ ಜಮೀನಿಗೆ ಸರ್ಕಾರಿ ಸಹಾಯಧನ.' },
      tips: { title: 'ಸ್ಮಾರ್ಟ್ ಕೃಷಿ ಸಲಹೆಗಳು', desc: 'ಸುಸ್ಥಿರ ಬೆಳವಣಿಗೆಗಾಗಿ ಆಧುನಿಕ ಸಲಹೆ.' },
      finance: { title: 'ಸಾಲಗಳು ಮತ್ತು ಹಣಕಾಸು', desc: 'ಕಡಿಮೆ ಬಡ್ಡಿ ಸಾಲ ಮತ್ತು ಮೈಕ್ರೋ-ಫೈನಾನ್ಸ್.' },
      updates: { title: 'ಇತ್ತೀಚಿನ ಅಪ್‌ಡೇಟ್‌ಗಳು', desc: 'ಯಾವುದೇ ಗಡುವನ್ನು ತಪ್ಪಿಸಬೇಡಿ.' },
    }
  },
  pa: {
    heading: 'ਐਗਰੀਵਾਈਜ਼', headingHighlight: 'ਸਹਾਇਤਾ',
    subtitle: 'ਸਰਕਾਰੀ ਯੋਜਨਾਵਾਂ, ਵਿੱਤੀ ਵਿਕਾਸ ਅਤੇ ਮਾਹਿਰ ਖੇਤੀ ਸਲਾਹ ਲਈ ਤੁਹਾਡਾ ਡਿਜੀਟਲ ਸਾਥੀ।',
    back: 'ਘਰ ਤੇ ਵਾਪਸ ਜਾਓ',
    stayAhead: 'ਮੌਸਮ ਤੋਂ ਅੱਗੇ ਰਹੋ',
    tracked: 'ਇਸ ਮਹੀਨੇ ਅਸੀਂ 45+ ਨਵੀਆਂ ਯੋਜਨਾਵਾਂ ਟਰੈਕ ਕੀਤੀਆਂ।',
    viewAlerts: 'ਸਾਰੇ ਅਲਰਟ ਦੇਖੋ',
    cards: {
      schemes: { title: 'ਮੇਰੇ ਲਈ ਯੋਜਨਾਵਾਂ', desc: 'ਤੁਹਾਡੇ ਖੇਤ ਲਈ ਸਰਕਾਰੀ ਸਬਸਿਡੀਆਂ ਅਤੇ ਵਿੱਤੀ ਸਹਾਇਤਾ।' },
      tips: { title: 'ਸਮਾਰਟ ਖੇਤੀ ਸੁਝਾਅ', desc: 'ਟਿਕਾਊ ਵਿਕਾਸ ਲਈ ਆਧੁਨਿਕ ਸਲਾਹ।' },
      finance: { title: 'ਕਰਜ਼ੇ ਅਤੇ ਵਿੱਤ', desc: 'ਘੱਟ ਵਿਆਜ ਕਰਜ਼ ਅਤੇ ਮਾਈਕ੍ਰੋ-ਫਾਈਨਾਂਸ।' },
      updates: { title: 'ਤਾਜ਼ੇ ਅਪਡੇਟ', desc: 'ਕੋਈ ਵੀ ਸਮਾਂ ਸੀਮਾ ਨਾ ਖੁੰਝੋ।' },
    }
  },
  ml: {
    heading: 'അഗ്രിവൈസ്', headingHighlight: 'പിന്തുണ',
    subtitle: 'സർക്കാർ പദ്ധതികൾ, സാമ്പത്തിക വളർച്ച, കൃഷി ഉപദേശം എന്നിവയ്ക്കുള്ള ഡിജിറ്റൽ പങ്കാളി.',
    back: 'ഹോമിലേക്ക് തിരങ്ങൽ',
    stayAhead: 'സീസണിനേക്കാൾ മുമ്പ് ഉണ്ടയിരിക്കുക',
    tracked: 'ഈ മാസം 45+ പദ്ധതികൾ ട്രാക്ക് ചെയ്തു.',
    viewAlerts: 'എല്ലാ അലേർട്ടുകളും കാണുക',
    cards: {
      schemes: { title: 'എനിക്കുള്ള പദ്ധതികൾ', desc: 'നിങ്ങളുടെ ഫാമിനായി സർക്കാർ സബ്സിഡി.' },
      tips: { title: 'സ്മാർട്ട് കൃഷി ടിപ്സ്', desc: 'സുസ്ഥിര വളർച്ചയ്ക്കും കീടനിയന്ത്രണത്തിനും.' },
      finance: { title: 'വായ്പകളും ധനകാര്യവും', desc: 'കുറഞ്ഞ പലിശ വായ്പകൾ, മൈക്രോ-ഫൈനാൻസ്.' },
      updates: { title: 'ഏറ്റവും പുതിയ അപ്ഡേറ്റുകൾ', desc: 'ഒരു ഡെഡ്‌ലൈനും നഷ്ടമാക്കരുത്.' },
    }
  },
};

const GovtSchemes = () => {
  const navigate = useNavigate();
  const { langCode } = useLanguage();
  const t = translations[langCode] || translations.en;

  const hubs = [
    { id: 'schemes', icon: <Award size={32} />, gradient: 'from-emerald-500 to-teal-600', shadow: 'shadow-emerald-200', path: '/schemes/list' },
    { id: 'tips', icon: <Sprout size={32} />, gradient: 'from-green-400 to-emerald-500', shadow: 'shadow-green-200', path: '/schemes/tips' },
    { id: 'finance', icon: <Landmark size={32} />, gradient: 'from-blue-500 to-indigo-600', shadow: 'shadow-blue-200', path: '/schemes/finance' },
    { id: 'updates', icon: <Bell size={32} />, gradient: 'from-orange-400 to-red-500', shadow: 'shadow-orange-200', path: '/schemes/updates' },
  ];

  return (
    <div className="min-h-screen bg-gray-50/50 p-4 md:p-8 font-sans">

      <div className="max-w-6xl mx-auto mb-12 flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 tracking-tight">
            {t.heading} <span className="text-emerald-600">{t.headingHighlight}</span>
          </h1>
          <p className="text-lg text-gray-500 mt-3 max-w-lg">{t.subtitle}</p>
        </div>
        <button
          onClick={() => navigate('/')}
          className="flex items-center gap-2 px-6 py-3 bg-white text-gray-700 font-semibold rounded-2xl shadow-sm border border-gray-100 hover:bg-gray-50 transition-all active:scale-95 w-fit"
        >
          <ArrowLeft size={20} /> {t.back}
        </button>
      </div>

      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
        {hubs.map((hub) => {
          const card = t.cards[hub.id];
          return (
            <div
              key={hub.id}
              onClick={() => navigate(hub.path)}
              className="group relative bg-white rounded-3xl p-8 cursor-pointer overflow-hidden transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl border border-gray-100 active:scale-95"
            >
              <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${hub.gradient} opacity-5 -mr-16 -mt-16 rounded-full group-hover:scale-150 transition-transform duration-500`} />
              <div className="flex items-start justify-between">
                <div className={`p-4 rounded-2xl bg-gradient-to-br ${hub.gradient} text-white shadow-lg ${hub.shadow} group-hover:scale-110 transition-transform`}>
                  {hub.icon}
                </div>
                <div className="text-gray-300 group-hover:text-emerald-500 transition-colors">
                  <ChevronRight size={28} />
                </div>
              </div>
              <div className="mt-8">
                <h2 className="text-2xl font-bold text-gray-800 mb-3 group-hover:text-emerald-700 transition-colors">
                  {card.title}
                </h2>
                <p className="text-gray-500 leading-relaxed text-base">{card.desc}</p>
              </div>
              <div className={`absolute bottom-0 left-0 h-1.5 bg-gradient-to-r ${hub.gradient} transition-all duration-300 w-0 group-hover:w-full`} />
            </div>
          );
        })}
      </div>

      <div className="max-w-6xl mx-auto mt-16 p-8 bg-emerald-900 rounded-3xl text-white flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl">
        <div className="text-center md:text-left">
          <h3 className="text-xl font-bold">{t.stayAhead}</h3>
          <p className="text-emerald-100 opacity-80">{t.tracked}</p>
        </div>
        <button
          onClick={() => navigate('/schemes/updates')}
          className="px-8 py-3 bg-white text-emerald-900 font-bold rounded-xl hover:bg-emerald-50 transition-all active:scale-95"
        >
          {t.viewAlerts}
        </button>
      </div>

    </div>
  );
};

export default GovtSchemes;