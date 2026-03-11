const fs = require('fs');
let code = fs.readFileSync('translations.js', 'utf8');

const additions = {
  bn: { trackOrders: "অর্ডার ট্র্যাক করুন", trackOrdersDesc: "আপনার কেনাকাটা দেখুন এবং ট্র্যাক করুন" },
  en: { trackOrders: "Track Orders", trackOrdersDesc: "View and track your purchases" },
  gu: { trackOrders: "ઓર્ડર ટ્રૅક કરો", trackOrdersDesc: "તમારી ખરીદીઓ જુઓ અને ટ્રૅક કરો" },
  hi: { trackOrders: "ऑर्डर ट्रैक करें", trackOrdersDesc: "अपनी खरीदारी देखें और ट्रैक करें" },
  kn: { trackOrders: "ಆದೇಶಗಳನ್ನು ಟ್ರ್ಯಾಕ್ ಮಾಡಿ", trackOrdersDesc: "ನಿಮ್ಮ ಖರೀದಿಗಳನ್ನು ವೀಕ್ಷಿಸಿ ಮತ್ತು ಟ್ರ್ಯಾಕ್ ಮಾಡಿ" },
  mr: { trackOrders: "ऑर्डर्सचा मागोवा घ्या", trackOrdersDesc: "तुमच्या खरेदी पहा आणि ट्रॅक करा" },
  pa: { trackOrders: "ਆਰਡਰ ਟਰੈਕ ਕਰੋ", trackOrdersDesc: "ਆਪਣੀਆਂ ਖਰੀਦਾਂ ਵੇਖੋ ਅਤੇ ਟਰੈਕ ਕਰੋ" },
  ta: { trackOrders: "ஆர்டர்களைக் கண்காணிக்கவும்", trackOrdersDesc: "உங்கள் வாங்குதல்களைக் கண்டு கண்காணிக்கவும்" },
  te: { trackOrders: "ఆర్డర్‌లను ట్రాక్ చేయండి", trackOrdersDesc: "మీ కొనుగోళ్లను వీక్షించండి మరియు ట్రాక్ చేయండి" },
  ml: { trackOrders: "ഓർഡറുകൾ ട്രാക്ക് ചെയ്യുക", trackOrdersDesc: "നിങ്ങളുടെ വാങ്ങലുകൾ കാണുകയും ട്രാക്ക് ചെയ്യുകയും ചെയ്യുക" }
};

for (const [lang, map] of Object.entries(additions)) {
    const searchStr1 = `"${lang}": {\n    "translation": {`;
    const searchStr2 = `"${lang}":{\n    "translation": {`;
    const searchStr3 = `  ${lang}: {\n    translation: {`;
    
    let replacement = `"${lang}": {\n    "translation": {\n`;
    for (const [k, v] of Object.entries(map)) {
        replacement += `      "${k}": "${v}",\n`;
    }
    
    if (code.includes(searchStr1)) {
        code = code.replace(searchStr1, replacement);
    } else if (code.includes(searchStr2)) {
        code = code.replace(searchStr2, replacement);
    } else if (code.includes(searchStr3)) {
        code = code.replace(searchStr3, replacement);
    } else {
        console.log(`Could not find dictionary for ${lang}`);
    }
}

fs.writeFileSync('translations.js', code);
console.log('Done injecting trackOrders!');
