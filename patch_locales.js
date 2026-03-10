import fs from 'fs';
import path from 'path';

const generateLocalesPath = path.join(process.cwd(), 'generate_locales.js');
let content = fs.readFileSync(generateLocalesPath, 'utf8');

const missingKeys = JSON.parse(fs.readFileSync('missing_keys.json', 'utf8'));

// Provide Hindi translations for the missing keys. Keep English for others as fallback.
const hiTranslations = {
    "manageSchemes": "योजनाएं प्रबंधित करें",
    "manageSchemesDesc": "सरकारी योजनाएं जोड़ें या संपादित करें",
    "badgeCore": "मुख्य",
    "farmingTips": "खेती के सुझाव",
    "farmingTipsDesc": "विशेषज्ञ सलाह अपडेट करें",
    "latestUpdates": "नवीनतम अपडेट",
    "latestUpdatesDesc": "समाचार प्रसारित करें",
    "badgeLive": "लाइव",
    "financeData": "वित्त डेटा",
    "financeDataDesc": "वित्तीय रिकॉर्ड प्रबंधित करें",
    "supportTicketsDesc": "विवाद और प्रश्न प्रबंधित करें",
    "badgeAction": "कार्रवाई आवश्यक",
    "adminPortal": "एडमिन पोर्टल",
    "admin": "एडमिन",
    "localTime": "स्थानीय समय",
    "temp": "तापमान",
    "systemStatus": "सिस्टम स्थिति",
    "allSystemsAre": "सभी सिस्टम हैं",
    "operational": "सुचारू",
    "systemStatusDesc": "उपयोगकर्ता गतिविधि सामान्य है। सपोर्ट टिकट की मात्रा कम है।",
    "checkReports": "रिपोर्ट जांचें",
    "searchAdmin": "एडमिन मॉड्यूल खोजें...",
    "openModule": "मॉड्यूल खोलें",
    "noModulesFound": "कोई मॉड्यूल नहीं मिला",
    "clearSearch": "खोज साफ़ करें",
    "marketPrices": "मंडी भाव",
    "marketPricesDesc": "रीयल-टाइम फसल दरें",
    "myCrops": "मेरी फसलें",
    "myCropsDesc": "अपनी वृद्धि ट्रैक करें",
    "govtSchemes": "सरकारी योजनाएं",
    "govtSchemesDesc": "सब्सिडी और अनुदान",
    "badgeNew": "नया",
    "orderManagement": "आदेश प्रबंधन",
    "orderManagementDesc": "खरीदार आदेश देखें",
    "badgeActive": "सक्रिय",
    "marketplace": "बाज़ार",
    "marketplaceDesc": "उपकरण और बीज",
    "support": "सहायता",
    "supportDesc": "विशेषज्ञ की मदद",
    "dashboard": "डैशबोर्ड",
    "farmer": "किसान",
    "searchFarmer": "फसलें, मंडी भाव, या विशेषज्ञ सलाह खोजें...",
    "marketIntelligence": "बाज़ार की जानकारी",
    "pricesAre": "की कीमतें",
    "priceUp": "बढ़ी हैं",
    "priceDown": "गिरी हैं",
    "inYourRegion": "आपके क्षेत्र में।",
    "viewMarketTrends": "बाज़ार रुझान देखें",
    "enterDashboard": "डैशबोर्ड खोलें",
    "noToolsFound": "कोई उपकरण नहीं मिला",
    "navStats": "आँकड़े",
    "navShop": "दुकान",
    "navHelp": "मदद",
    "navLocal": "स्थानीय",
    "buyEquipmentDesc": "उपकरण और बीज खरीदें",
    "logisticsForecast": "रसद पूर्वानुमान",
    "transportWeatherDesc": "परिवहन मौसम",
    "buyerSupport": "क्रेता सहायता",
    "procurementHelpDesc": "खरीद सहायता",
    "procurementDashboard": "खरीद डैशबोर्ड",
    "buyer": "क्रेता",
    "noMatchFound": "हमें कुछ भी मेल खाता हुआ नहीं मिला"
};

let newEntries = [];
for (const [key, val] of Object.entries(missingKeys)) {
    const hiVal = hiTranslations[key] || val;
    // We add it for all languages (fallback to English if not Hindi)
    newEntries.push(`        ${key}: { en: "${val.replace(/"/g, '\\"')}", hi: "${hiVal.replace(/"/g, '\\"')}", mr: "${val}", gu: "${val}", pa: "${val}", ta: "${val}", te: "${val}", kn: "${val}", bn: "${val}" }`);
}

const appendString = ",\n" + newEntries.join(",\n");

if (!content.includes('"manageSchemes":')) {
    content = content.replace("supportTickets: { en: 'Support Tickets', hi: 'समर्थन टिकट', mr: 'मदत तिकिटे', gu: 'સપોર્ટ ટિકિટ', pa: 'ਸਹਾਇਤਾ ਟਿਕਟਾਂ', ta: 'ஆதரவு டிக்கெட்டுகள்', te: 'మద్దతు టిక్కెట్లు', kn: 'ಬೆಂಬಲ ಟಿಕೆಟ್‌ಗಳು', bn: 'সহায়তা টিকিট' }",
        "supportTickets: { en: 'Support Tickets', hi: 'समर्थन टिकट', mr: 'मदत तिकिटे', gu: 'સપોર્ટ ટિકિટ', pa: 'ਸਹਾਇਤਾ ਟਿਕਟਾਂ', ta: 'ஆதரவு டிக்கெட்டுகள்', te: 'మద్దతు టిక్కెట్లు', kn: 'ಬೆಂಬಲ ಟಿಕೆಟ್‌ಗಳು', bn: 'সহায়তা টিকিট' }" + appendString);
    fs.writeFileSync(generateLocalesPath, content);
}
