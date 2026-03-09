import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from './LanguageContext';

const Weather = () => {
  const navigate = useNavigate();
  const { langCode: lang } = useLanguage(); // Use global language state
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  const translations = {
    en: {
      back: 'Back to Dashboard',
      portal: 'Live Satellite Portal',
      advisory: 'Agricultural Advisory',
      optimize: 'Optimize Intelligence for your Crop:',
      rainProb: '24h Rainfall Probability',
      next8h: 'Next 8h',
      now: 'Now',
      plus8h: '+8 Hours',
      humidity: 'Humidity',
      wind: 'Wind Speed',
      extended: 'Precision Extended Forecast',
      today: 'Today',
      windSpray: 'Wind & Spray Guidance',
      stress: 'Atmospheric Stress',
      evaporation: 'Evaporation',
      fungalRisk: 'Fungal Risk',
      high: 'High',
      low: 'Low',
      normal: 'Normal',
      ideal: 'IDEAL',
      extremeWind: 'EXTREME WIND',
      stable: 'Stable',
      monitor: 'Monitor immediately',
      listen: 'Listen to Advisory',
      syncing: 'Syncing Satellite Intelligence...',
      failed: 'Connection Failed',
      reach: "We couldn't reach the weather satellites. Please check your internet.",
      return: 'Return Home',
      currWind: 'Current wind speed is ',
      idealCond: ' Conditions are IDEAL for pesticide spraying.',
      postpone: ' Postpone spraying to prevent chemical drift.',
      currHum: 'Humidity is at ',
      highMoist: ' HIGH MOISTURE: ',
      stableMoist: ' Stable atmospheric moisture levels detected.',
      sky0: 'Clear Sky',
      sky1: 'Partly Cloudy',
      sky2: 'Foggy',
      sky3: 'Rainy',
      sky4: 'Snowy',
      sky5: 'Showers',
      sky6: 'Stormy'
    },
    hi: {
      back: 'डैशबोर्ड पर वापस',
      portal: 'लाइव सैटेलाइट पोर्टल',
      advisory: 'कृषि सलाह',
      optimize: 'अपनी फसल के लिए बुद्धिमत्ता को अनुकूलित करें:',
      rainProb: '24 घंटे बारिश की संभावना',
      next8h: 'अगले 8 घंटे',
      now: 'अभी',
      plus8h: '+8 घंटे',
      humidity: 'आर्द्रता',
      wind: 'हवा की गति',
      extended: 'सटीक विस्तारित पूर्वानुमान',
      today: 'आज',
      windSpray: 'हवा और स्प्रे मार्गदर्शन',
      stress: 'वायुमंडलीय तनाव',
      evaporation: 'वाष्पीकरण',
      fungalRisk: 'कवक जोखिम',
      high: 'उच्च',
      low: 'कम',
      normal: 'सामान्य',
      ideal: 'आदर्श',
      extremeWind: 'तेज हवा',
      stable: 'स्थिर',
      monitor: 'तुरंत निगरानी करें',
      listen: 'सलाह सुनें',
      syncing: 'सैटेलाइट इंटेलिजेंस सिंक हो रहा है...',
      failed: 'कनेक्शन विफल रहा',
      reach: "हम मौसम उपग्रहों तक नहीं पहुँच सके। कृपया अपना इंटरनेट जांचें।",
      return: 'होम पर वापस',
      currWind: 'वर्तमान हवा की गति ',
      idealCond: ' कीटनाशक छिड़काव के लिए स्थितियां आदर्श हैं।',
      postpone: ' रासायनिक बहाव को रोकने के लिए छिड़काव स्थगित करें।',
      currHum: 'आर्द्रता ',
      highMoist: ' उच्च नमी: ',
      stableMoist: ' वायुमंडलीय नमी का स्तर स्थिर पाया गया।',
      sky0: 'साफ आकाश',
      sky1: 'आंशिक रूप से बादल',
      sky2: 'धुंधला',
      sky3: 'बरसाती',
      sky4: 'बर्फबारी',
      sky5: 'बोछारें',
      sky6: 'तूफानी'
    },
    te: {
      back: 'డాష్‌బోర్డ్‌కు తిరిగి వెళ్లండి',
      portal: 'లైవ్ శాటిలైట్ పోర్టల్',
      advisory: 'వ్యవసాయ సలహా',
      optimize: 'మీ పంట కోసం మేధస్సును ఆప్టిమైజ్ చేయండి:',
      rainProb: '24 గంటల వర్షపాతం సంభావ్యత',
      next8h: 'తదుపరి 8 గంటలు',
      now: 'ఇప్పుడు',
      plus8h: '+8 గంటలు',
      humidity: 'తేమ',
      wind: 'గాలి వేగం',
      extended: 'ఖచ్చితమైన పొడిగించిన సూచిక',
      today: 'ఈ రోజు',
      windSpray: 'గాలి & స్ప్రే మార్గదర్శకత్వం',
      stress: 'వాతావరణ ఒత్తిడి',
      evaporation: 'ఆవిరి',
      fungalRisk: 'శిలీంధ్రాల ప్రమాదం',
      high: 'ఎక్కువ',
      low: 'తక్కువ',
      normal: 'సాధారణం',
      ideal: 'అనుకూలం',
      extremeWind: 'తీవ్రమైన గాలి',
      stable: 'స్థిరంగా ఉంది',
      monitor: 'వెంటనే పర్యవేక్షించండి',
      listen: 'సలహా వినండి',
      syncing: 'శాటిలైట్ ఇంటెలిజెన్స్ సింక్ అవుతోంది...',
      failed: 'కనెక్షన్ విఫలమైంది',
      reach: "మేము వాతావరణ ఉపగ్రహాలను చేరుకోలేకపోయాము. దయచేసి మీ ఇంటర్నెట్‌ని తనిఖీ చేయండి.",
      return: 'హోమ్‌కు తిరిగి వెళ్లండి',
      currWind: 'ప్రస్తుత గాలి వేగం ',
      idealCond: ' పురుగుమందుల పిచికారీకి పరిస్థితులు అనుకూలంగా ఉన్నాయి.',
      postpone: ' రసాయన ప్రవాహాన్ని నిరోధించడానికి పిచിക്കారీని వాయిదా వేయండి.',
      currHum: 'తేమ ',
      highMoist: ' అధిక తేమ: ',
      stableMoist: ' వాతావరణ తేమ స్థాయిలు స్థిరంగా ఉన్నాయి.',
      sky0: 'నిర్మలమైన ఆకాశం',
      sky1: 'పాక్షికంగా ఆకాశం',
      sky2: 'పొగమంచు',
      sky3: 'వర్షం',
      sky4: 'హిమపాతం',
      sky5: 'జల్లులు',
      sky6: 'తుఫాను'
    },
    ta: {
      back: 'டாஷ்போர்டுக்கு திரும்பு',
      portal: 'நேரடி செயற்கைக்கோள்',
      advisory: 'விவசாய ஆலோசனை',
      optimize: 'பயிருக்கான நுண்ணறிவு:',
      rainProb: 'மழை நிகழ்தகவு',
      next8h: '8 மணிநேரம்',
      now: 'இப்போது',
      plus8h: '+8 மணி',
      humidity: 'ஈரப்பதம்',
      wind: 'காற்றின் வேகம்',
      extended: 'நீட்டிக்கப்பட்ட முன்னறிவிப்பு',
      today: 'இன்று',
      windSpray: 'காற்று வழிகாட்டுதல்',
      stress: 'வளிமண்டல அழுத்தம்',
      evaporation: 'ஆவியாதல்',
      fungalRisk: 'பூஞ்சை ஆபத்து',
      high: 'அதிகம்',
      low: 'குறைவு',
      normal: 'சாதாரண',
      ideal: 'சிறந்தது',
      extremeWind: 'கடுமையான காற்று',
      stable: 'நிலையானது',
      monitor: 'கண்காணிக்கவும்',
      listen: 'கேளுங்கள்',
      syncing: 'ஒத்திசைக்கிறது...',
      failed: 'தோல்வி',
      reach: 'தொடர்பு கொள்ள முடியவில்லை.',
      return: 'முகப்பு',
      currWind: 'காற்றின் வேகம் ',
      idealCond: ' தெளிக்க சிறந்தது.',
      postpone: ' தெளிப்பதை தவிர்க்கவும்.',
      currHum: 'ஈரப்பதம் ',
      highMoist: ' அதிக ஈரப்பதம்: ',
      stableMoist: ' ஈரப்பதம் சீராக உள்ளது.',
      sky0: 'தெளிவான வானம்',
      sky1: 'மேகமூட்டம்',
      sky2: 'மூடுபனி',
      sky3: 'மழை',
      sky4: 'பனி',
      sky5: 'மழைத்தூறல்',
      sky6: 'புயல்'
    },
    kn: {
      back: 'ಹಿಂತಿರುಗಿ',
      portal: 'ಸ್ಯಾಟಲೈಟ್ ಪೋರ್ಟಲ್',
      advisory: 'ಕೃಷಿ ಸಲಹೆ',
      optimize: 'ಬೆಳೆ ಬುದ್ಧಿವಂತಿಕೆ:',
      rainProb: 'ಮಳೆಯ ಸಾಧ್ಯತೆ',
      next8h: '8 ಗಂಟೆ',
      now: 'ಈಗ',
      plus8h: '+8 ಗಂಟೆ',
      humidity: 'ಆರ್ದ್ರತೆ',
      wind: 'ಗಾಳಿಯ ವೇಗ',
      extended: 'ವಿಸ್ತೃತ ಮುನ್ಸೂಚನೆ',
      today: 'ಇಂದು',
      windSpray: 'ಗಾಳಿ ಮಾರ್ಗದರ್ಶನ',
      stress: 'ವಾತಾವರಣದ ಒತ್ತಡ',
      evaporation: 'ಆವಿಯಾಗುವಿಕೆ',
      fungalRisk: 'ಶಿಲೀಂಧ್ರ ಅಪಾಯ',
      high: 'ಹೆಚ್ಚು',
      low: 'ಕಡಿಮೆ',
      normal: 'ಸಾಮಾನ್ಯ',
      ideal: 'ಆದರ್ಶ',
      extremeWind: 'ತೀವ್ರ ಗಾಳಿ',
      stable: 'ಸ್ಥಿರ',
      monitor: 'ಮೇಲ್ವಿಚಾರಣೆ',
      listen: 'ಆಲಿಸಿ',
      syncing: 'ಸಿಂಕ್ ಆಗುತ್ತಿದೆ...',
      failed: 'ವಿಫಲ',
      reach: 'ತಲುಪಲು ಸಾಧ್ಯವಾಗಿಲ್ಲ.',
      return: 'ಹೋಮ್',
      currWind: 'ಗಾಳಿಯ ವೇಗ ',
      idealCond: ' ಸ್ಪ್ರೇ ಮಾಡಲು ಆದರ್ಶವಾಗಿದ.',
      postpone: ' ಸ್ಪ್ರೇ ಮುಂದೂಡಿ.',
      currHum: 'ಆರ್ದ್ರತೆ ',
      highMoist: ' ಹೆಚ್ಚು ತೇವಾಂಶ: ',
      stableMoist: ' ತೇವಾಂಶ ಸ್ಥಿರವಾಗಿದೆ.',
      sky0: 'ನಿರ್ಮಲ ಆಕಾಶ',
      sky1: 'ಭಾಗಶಃ ಮೋಡ',
      sky2: 'ಮಂಜು',
      sky3: 'ಮಳೆ',
      sky4: 'ಹಿಮ',
      sky5: 'ಜಲ್ಲು ಮಳೆ',
      sky6: 'ಬಿರುಗಾಳಿ'
    },
    mr: {
      back: 'परत जा',
      portal: 'सॅटेलाईट पोर्टल',
      advisory: 'कृषी सल्ला',
      optimize: 'पीक बुद्धिमत्ता:',
      rainProb: 'पावसाची शक्यता',
      next8h: '8 तास',
      now: 'आता',
      plus8h: '+8 तास',
      humidity: 'आद्रता',
      wind: 'वाऱ्याचा वेग',
      extended: 'पुढील अंदाज',
      today: 'आज',
      windSpray: 'फवारणी मार्गदर्शन',
      stress: 'वातावरणातील ताण',
      evaporation: 'बाष्पीभवन',
      fungalRisk: 'बुरशीचा धोका',
      high: 'जास्त',
      low: 'कमी',
      normal: 'सामान्य',
      ideal: 'आदर्श',
      extremeWind: 'वेगवान वारा',
      stable: 'स्थिर',
      monitor: 'लक्ष द्या',
      listen: 'ऐका',
      syncing: 'सिंक होत आहे...',
      failed: 'अयशस्वी',
      reach: 'संपर्क होऊ शकला नाही.',
      return: 'होम',
      currWind: 'वाऱ्याचा वेग ',
      idealCond: ' फवारणीसाठी योग्य.',
      postpone: ' फवारणी पुढे ढकला.',
      currHum: 'आद्रता ',
      highMoist: ' जास्त ओलावा: ',
      stableMoist: ' ओलावा स्थिर आहे.',
      sky0: 'स्वच्छ आकाश',
      sky1: 'अंशतः ढगाळ',
      sky2: 'धुके',
      sky3: 'पाऊस',
      sky4: 'बर्फ',
      sky5: 'सरी',
      sky6: 'वादळ'
    },
    ml: {
      back: 'മടങ്ങുക',
      portal: 'സാറ്റലൈറ്റ് പോർട്ടൽ',
      advisory: 'കാർഷിക ഉപദേശം',
      optimize: 'വിള ബുദ്ധി:',
      rainProb: 'മഴ സാധ്യത',
      next8h: '8 മണിക്കൂർ',
      now: 'ഇപ്പോൾ',
      plus8h: '+8 മണി',
      humidity: 'ആർദ്രത',
      wind: 'കാറ്റിന്റെ വേഗത',
      extended: 'പ്രവചനം',
      today: 'ഇന്ന്',
      windSpray: 'സ്‌പ്രേയിംഗ് പ്ലാൻ',
      stress: 'അന്തരീക്ഷ സമ്മർദ്ദം',
      evaporation: 'ബാഷ്പീകരണം',
      fungalRisk: 'കുമിൾ ബാധ',
      high: 'കൂടുതൽ',
      low: 'കുറഞ്ഞത്',
      normal: 'സാധാരണ',
      ideal: 'അനുയോജ്യം',
      extremeWind: 'ശക്തമായ കാറ്റ്',
      stable: 'സ്ഥിരത',
      monitor: 'ശ്രദ്ധിക്കുക',
      listen: 'കേൾക്കുക',
      syncing: 'സിങ്ക് ചെയ്യുന്നു...',
      failed: 'പരാജയം',
      reach: 'ബന്ധപ്പെടാൻ കഴിഞ്ഞില്ല.',
      return: 'ഹോം',
      currWind: 'കാറ്റിന്റെ വേഗത ',
      idealCond: ' സ്പ്രേ ചെയ്യാൻ ഉചിതം.',
      postpone: ' മാറ്റിവെക്കുക.',
      currHum: 'ആർദ്രത ',
      highMoist: ' കൂടുതൽ ഈർപ്പം: ',
      stableMoist: ' ഈർപ്പം സാധാരണമാണ്.',
      sky0: 'തെളിഞ്ഞ ആകാശം',
      sky1: 'മേഘാവൃതം',
      sky2: 'മഞ്ഞുമ്മൂടി',
      sky3: 'മഴ',
      sky4: 'മഞ്ഞ്',
      sky5: 'ചാറ്റൽ മഴ',
      sky6: 'കൊടുങ്കാറ്റ്'
    },
    bn: {
      back: 'ফিরে যান',
      portal: 'স্যাটেলাইট পোর্টাল',
      advisory: 'কৃষি পরামর্শ',
      optimize: 'ফসলের বুদ্ধি:',
      rainProb: 'বৃষ্টির সম্ভাবনা',
      next8h: '৮ ঘন্টা',
      now: 'এখন',
      plus8h: '+৮ ঘন্টা',
      humidity: 'আর্দ্রতা',
      wind: 'বাতাসের গতি',
      extended: 'পূর্বাভাস',
      today: 'আজ',
      windSpray: 'স্প্রে নির্দেশিকা',
      stress: 'বায়ুমণ্ডলীয় চাপ',
      evaporation: 'বাষ্পীভবন',
      fungalRisk: 'ছত্রাক ঝুঁকি',
      high: 'উচ্চ',
      low: 'স্বল্প',
      normal: 'স্বাভাবিক',
      ideal: 'আদর্শ',
      extremeWind: 'চরম বাতাস',
      stable: 'স্থিতিশীল',
      monitor: 'পর্যবেক্ষণ',
      listen: 'শুনুন',
      syncing: 'সিঙ্ক হচ্ছে...',
      failed: 'ব্যর্থ',
      reach: 'যোগাযোগ করা যায়নি।',
      return: 'হোমে ফিরে যান',
      currWind: 'বাতাসের গতি ',
      idealCond: ' স্প্রে করার আদর্শ সময়।',
      postpone: ' স্প্রে স্থগিত করুন।',
      currHum: 'আর্দ্রতা ',
      highMoist: ' উচ্চ আর্দ্রতা: ',
      stableMoist: ' আর্দ্রতা স্থিতিশীল।',
      sky0: 'পরিষ্কার আকাশ',
      sky1: 'আংশিক মেঘলা',
      sky2: 'কুয়াশা',
      sky3: 'বৃষ্টি',
      sky4: 'তুষারপাত',
      sky5: 'ঝিরঝিরে বৃষ্টি',
      sky6: 'ঝড়'
    }
  };

  const t = translations[lang] || translations.en;

  const speakAdvisory = (text) => {
    if (!window.speechSynthesis) return;
    window.speechSynthesis.cancel();

    const utterance = new SpeechSynthesisUtterance(text);
    const langMap = {
      en: 'en-IN', hi: 'hi-IN', te: 'te-IN',
      ta: 'ta-IN', kn: 'kn-IN', mr: 'mr-IN',
      ml: 'ml-IN', bn: 'bn-IN'
    };
    const targetLang = langMap[lang] || 'en-IN';
    utterance.lang = targetLang;

    const findVoice = () => {
      const voices = window.speechSynthesis.getVoices();
      if (!voices.length) return null;

      // 1. Try exact BCP 47 match (e.g. te-IN)
      let voice = voices.find(v => v.lang === targetLang || v.lang.replace('_', '-') === targetLang);

      // 2. Try prefix match (e.g. te)
      if (!voice) {
        voice = voices.find(v => v.lang.startsWith(targetLang.split('-')[0]));
      }

      // 3. Special Case: If it's a regional lang and no native voice found, 
      // check for "Indian" variants but AVOID common English if possible
      if (!voice && targetLang !== 'en-IN') {
        voice = voices.find(v => v.lang.includes('IN') && (v.name.includes('Google') || v.name.includes('Natural')));
      }

      // 4. Fallback to English only as a very last resort
      if (!voice) {
        voice = voices.find(v => v.lang.startsWith('en'));
      }

      return voice;
    };

    const voice = findVoice();
    if (voice) {
      utterance.voice = voice;
      console.log(`🔊 Speaking in ${lang} using voice:`, voice.name);
    } else {
      console.warn(`⚠️ No native voice found for ${lang}, falling back to default.`);
    }

    utterance.rate = 0.8;
    utterance.pitch = 1.0;

    // Add a small delay if voices were just loaded
    setTimeout(() => {
      window.speechSynthesis.speak(utterance);
    }, 100);
  };

  // Pre-load voices for browsers that need a prompt
  useEffect(() => {
    if (window.speechSynthesis) {
      window.speechSynthesis.getVoices();
      window.speechSynthesis.onvoiceschanged = () => {
        const voices = window.speechSynthesis.getVoices();
        console.log("🌦️ Browser voices loaded:", voices.length);
      };
    }
  }, []);


  // --- Dynamic Weather Assets ---

  const SatelliteRadar = () => (
    <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-20">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[200%] h-[200%] border-[1px] border-white/20 rounded-full animate-[spin_10s_linear_infinite]">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1 h-1/2 bg-gradient-to-t from-emerald-400 to-transparent origin-bottom"></div>
      </div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(255,255,255,0.05)_100%)]"></div>
    </div>
  );

  const Sunbeams = () => (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {[...Array(6)].map((_, i) => (
        <div key={i} className="absolute top-[-10%] w-32 h-[120%] bg-gradient-to-b from-white/20 to-transparent blur-3xl -rotate-12 animate-[pulse_4s_ease-in-out_infinite]" style={{ left: `${i * 20}%`, animationDelay: `${i * 0.5}s` }}></div>
      ))}
    </div>
  );

  const Raindrops = () => (
    <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-40">
      {[...Array(20)].map((_, i) => (
        <div key={i} className="absolute w-[1px] h-10 bg-white/40 animate-[fall_1s_linear_infinite]" style={{ left: `${Math.random() * 100}%`, animationDuration: `${0.5 + Math.random()}s`, animationDelay: `${Math.random()}s` }}></div>
      ))}
      <style>{`
        @keyframes fall {
          0% { transform: translateY(-100px); }
          100% { transform: translateY(500px); }
        }
      `}</style>
    </div>
  );

  const [selectedCrop, setSelectedCrop] = useState('General');

  const fetchWeather = async (lat = 28.6139, lon = 77.2090, crop = 'General', currentLang = 'en') => {
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL || `${import.meta.env.VITE_API_URL || "http://localhost:5001"}`}/api/support/weather?lat=${lat}&lon=${lon}&crop=${crop}&lang=${currentLang}`);
      const json = await res.json();
      if (json.success) setData(json.data);
    } catch (err) {
      console.error("Failed to fetch weather", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => fetchWeather(pos.coords.latitude, pos.coords.longitude, selectedCrop, lang),
        () => fetchWeather(28.6139, 77.2090, selectedCrop, lang)
      );
    } else {
      fetchWeather(28.6139, 77.2090, selectedCrop, lang);
    }
  }, [selectedCrop, lang]);

  const getWeatherLabel = (code) => {
    if (code === 0) return { label: t.sky0, icon: '☀️' };
    if (code <= 3) return { label: t.sky1, icon: '🌤️' };
    if (code <= 48) return { label: t.sky2, icon: '🌫️' };
    if (code <= 67) return { label: t.sky3, icon: '🌧️' };
    if (code <= 77) return { label: t.sky4, icon: '❄️' };
    if (code <= 82) return { label: t.sky5, icon: '🌦️' };
    return { label: t.sky6, icon: '⛈️' };
  };

  if (loading) return (
    <div className="min-h-screen bg-slate-900 flex items-center justify-center p-10">
      <div className="text-center space-y-4">
        <div className="w-16 h-16 border-4 border-sky-500 border-t-transparent rounded-full animate-spin mx-auto"></div>
        <p className="font-black text-sky-400 uppercase tracking-widest text-xs">{t.syncing}</p>
      </div>
    </div>
  );

  if (!data) return (
    <div className="min-h-screen bg-slate-50 p-6 flex items-center justify-center">
      <div className="bg-white p-10 rounded-[2.5rem] shadow-2xl border-2 border-slate-100 text-center space-y-4 max-w-sm">
        <span className="text-6xl">📡</span>
        <h2 className="text-2xl font-black text-slate-800">{t.failed}</h2>
        <p className="text-slate-500 font-medium">{t.reach}</p>
        <button onClick={() => navigate('/')} className="w-full bg-slate-900 text-white font-black py-4 rounded-2xl">{t.return}</button>
      </div>
    </div>
  );

  const isRainy = data.code >= 51;
  const isSunny = data.code === 0;

  return (
    <div className="min-h-screen bg-[#f8fbff] pb-20">
      {/* Header */}
      <div className="bg-white/80 backdrop-blur-md sticky top-0 z-40 border-b border-slate-100">
        <div className="max-w-5xl mx-auto px-6 py-4 flex justify-between items-center">
          <button onClick={() => navigate('/')} className="flex items-center gap-2 text-sky-700 font-black uppercase text-xs tracking-widest hover:text-sky-500 transition-colors">
            <span>←</span> {t.back}
          </button>

          <div className="flex items-center gap-4">
            <div className="flex bg-slate-100 p-1 rounded-xl border border-slate-200 overflow-x-auto max-w-[200px] md:max-w-none no-scrollbar">
              {Object.keys(translations).map(l => (
                <button
                  key={l}
                  onClick={() => setLang(l)}
                  className={`px-3 py-1 rounded-lg text-[10px] font-black uppercase transition-all flex-shrink-0 ${lang === l ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-400 hover:text-slate-600'}`}
                >
                  {l}
                </button>
              ))}
            </div>
            <div className="hidden md:flex items-center gap-2 bg-sky-50 px-4 py-2 rounded-full border border-sky-100">
              <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></span>
              <span className="text-[10px] font-black text-sky-700 uppercase tracking-widest">{t.portal}</span>
            </div>
          </div>
        </div>
      </div>

      <main className="max-w-5xl mx-auto p-6 space-y-10 mt-8">
        {/* Current Weather Section - Command Center Style */}
        <section className={`relative overflow-hidden rounded-[3.5rem] p-8 md:p-12 text-white shadow-2xl transition-all duration-1000 ${isRainy ? 'bg-gradient-to-br from-slate-800 to-indigo-950' : isSunny ? 'bg-gradient-to-br from-amber-400 to-orange-600' : 'bg-gradient-to-br from-sky-500 to-indigo-600'}`}>
          {/* Background Animations */}
          <SatelliteRadar />
          {isSunny && <Sunbeams />}
          {isRainy && <Raindrops />}

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
            <div className="space-y-6">
              <div className="flex items-center gap-6">
                <span className="text-8xl drop-shadow-2xl">{data.icon}</span>
                <div>
                  <h1 className="text-7xl font-black tracking-tighter leading-none">{data.temp}°</h1>
                  <p className="text-xl font-bold text-sky-100 opacity-90 mt-2">{getWeatherLabel(data.code).label}</p>
                </div>
              </div>

              <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-[2.5rem] p-8 space-y-6">
                <div className="flex justify-between items-start gap-4">
                  <div>
                    <h3 className="text-xs font-black uppercase tracking-[0.2em] mb-3 text-white/60">{t.advisory}</h3>
                    <p className="text-xl font-bold leading-relaxed">{data.advisory}</p>
                  </div>
                  <button
                    onClick={() => speakAdvisory(data.advisory)}
                    className="p-4 bg-white/10 hover:bg-white/20 rounded-2xl transition-all group active:scale-90"
                    title={t.listen}
                  >
                    <span className="text-2xl group-hover:scale-110 block transition-transform">🔊</span>
                  </button>
                </div>

                <div className="pt-4 border-t border-white/10">
                  <p className="text-[10px] font-black uppercase tracking-widest text-white/50 mb-3">{t.optimize}</p>
                  <div className="flex flex-wrap gap-2">
                    {['General', 'Rice', 'Wheat', 'Tomato'].map(c => (
                      <button
                        key={c}
                        onClick={() => setSelectedCrop(c)}
                        className={`px-6 py-2 rounded-full text-xs font-black transition-all ${selectedCrop === c ? 'bg-white text-slate-900' : 'bg-white/10 text-white hover:bg-white/20'}`}
                      >
                        {c}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-8">
              <div>
                <div className="flex justify-between items-end mb-4">
                  <h3 className="text-xs font-black uppercase tracking-[0.2em] text-white/60">{t.rainProb}</h3>
                  <span className="text-[10px] font-black bg-white/10 px-2 py-1 rounded">{t.next8h}</span>
                </div>
                <div className="flex items-end gap-2 h-32 bg-white/5 rounded-[2rem] p-6 border border-white/5">
                  {data.rainProb && data.rainProb.map((p, i) => (
                    <div key={i} className="flex-1 group relative">
                      <div
                        className="bg-emerald-400 rounded-t-lg transition-all duration-1000 hover:bg-white"
                        style={{ height: `${p}%` }}
                      ></div>
                      <span className="absolute -top-6 left-1/2 -translate-x-1/2 text-[8px] font-black opacity-0 group-hover:opacity-100 transition-opacity">{p}%</span>
                    </div>
                  ))}
                </div>
                <div className="flex justify-between mt-3 px-2">
                  <span className="text-[8px] font-black uppercase opacity-40">{t.now}</span>
                  <span className="text-[8px] font-black uppercase opacity-40">{t.plus8h}</span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="bg-white/5 rounded-3xl p-6 border border-white/5">
                  <p className="text-[10px] font-black uppercase tracking-widest opacity-40 mb-1">{t.humidity}</p>
                  <p className="text-2xl font-black">{data.humidity}%</p>
                </div>
                <div className="bg-white/5 rounded-3xl p-6 border border-white/5">
                  <p className="text-[10px] font-black uppercase tracking-widest opacity-40 mb-1">{t.wind}</p>
                  <p className="text-2xl font-black">{data.wind} <span className="text-xs opacity-40">km/h</span></p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 5-Day Extended Forecast */}
        <section className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-black text-slate-800 tracking-tight uppercase tracking-widest text-xs opacity-50">{t.extended}</h2>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {data.forecast.map((day, i) => {
              const date = new Date(day.date);
              const isToday = i === 0;
              const weather = getWeatherLabel(day.code);

              return (
                <div key={i} className={`p-8 rounded-[2.5rem] border-2 transition-all ${isToday ? 'bg-white border-sky-400 shadow-xl shadow-sky-50' : 'bg-white border-slate-100 hover:border-sky-200'}`}>
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest text-center mb-6">
                    {isToday ? t.today : date.toLocaleDateString(lang === 'en' ? 'en-US' : lang === 'hi' ? 'hi-IN' : lang === 'te' ? 'te-IN' : lang + '-IN', { weekday: 'short' })}
                  </p>
                  <span className="text-5xl block text-center mb-6">{weather.icon}</span>
                  <div className="text-center space-y-1">
                    <p className="text-2xl font-black text-slate-800">{day.max}°</p>
                    <p className="text-sm font-bold text-slate-400">{day.min}°</p>
                  </div>
                  <p className="text-[9px] font-black text-sky-600 uppercase text-center mt-6 tracking-widest">{weather.label}</p>
                </div>
              );
            })}
          </div>
        </section>

        {/* Live Agricultural Insights */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-slate-900 rounded-[3rem] p-10 text-white relative overflow-hidden group">
            <div className="relative z-10 space-y-4">
              <h3 className="text-2xl font-black italic text-emerald-400">{t.windSpray}</h3>
              <p className="text-slate-400 font-medium leading-relaxed">
                {t.currWind}
                <span className="text-white font-bold">{data.wind} km/h</span>.
                {data.wind < 15 ? t.idealCond : ` ${t.extremeWind}: ${t.postpone}`}
              </p>
              <div className="flex items-center gap-4">
                <div className="flex-1 h-3 bg-slate-800 rounded-full overflow-hidden">
                  <div className="h-full bg-emerald-500 transition-all duration-1000" style={{ width: `${Math.min(100, (data.wind / 30) * 100)}%` }}></div>
                </div>
                <span className="text-[10px] font-black uppercase tracking-widest opacity-40">Turbulence Index</span>
              </div>
            </div>
            <span className="absolute -right-6 -bottom-6 text-9xl opacity-10 rotate-12 group-hover:rotate-0 transition-transform duration-1000">🌬️</span>
          </div>

          <div className="bg-white border-2 border-slate-100 rounded-[3rem] p-10 relative overflow-hidden group">
            <div className="relative z-10 space-y-4">
              <h3 className="text-2xl font-black text-slate-800">{t.stress}</h3>
              <p className="text-slate-500 font-medium leading-relaxed">
                {t.currHum}
                <span className="text-slate-900 font-bold">{data.humidity}%</span>.
                {data.humidity > 75 ? ` ${t.high.toUpperCase()} MOISTURE: ${t.monitor}.` : t.stableMoist}
              </p>
              <div className="grid grid-cols-2 gap-4 pt-2">
                <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100">
                  <p className="text-[10px] font-black uppercase text-slate-400 mb-1">{t.evaporation}</p>
                  <p className="text-lg font-black text-slate-800">{data.temp > 30 ? t.high : t.normal}</p>
                </div>
                <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100">
                  <p className="text-[10px] font-black uppercase text-slate-400 mb-1">{t.fungalRisk}</p>
                  <p className="text-lg font-black text-slate-800">{data.humidity > 70 ? t.high : t.low}</p>
                </div>
              </div>
            </div>
            <span className="absolute -right-6 -bottom-6 text-9xl opacity-5 rotate-12 group-hover:rotate-0 transition-transform duration-1000 grayscale">🌡️</span>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Weather;