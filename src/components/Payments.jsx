import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from './CartContext';
import { CheckCircle2, XCircle, Loader2, CreditCard, Smartphone, ShieldCheck, ChevronRight, ArrowLeft, MapPin, User, Phone } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useLanguage } from './LanguageContext';

const translations = {
    en: {
        processingTitle: "Processing Payment...",
        processingDesc: "Securing your transaction, please do not close this window.",
        successTitle: "Payment Successful!",
        successDesc: "Your order has been placed and sent to the farmers. They will begin processing your harvest shortly.",
        trackOrder: "Track Order Status",
        continueShopping: "Continue Shopping",
        failedTitle: "Payment Failed",
        failedDesc: "There was an issue processing your order:",
        tryAgain: "Try Again",
        returnCart: "Return to Cart",
        checkout: "Checkout",
        completeOrder: "Complete your order below.",
        deliveryDetails: "Delivery Details",
        fullName: "Full Name",
        phone: "Phone Number",
        address: "Complete Address",
        payment: "Payment",
        card: "Card",
        upi: "UPI",
        cardNumber: "Card Number",
        cardName: "Cardholder Name",
        expiry: "Expiry Date",
        cvv: "CVV",
        upiId: "UPI ID",
        vpaDetails: "Enter your Virtual Payment Address (VPA)",
        upiApproveDesc: "A payment request will be sent to your UPI app. Please approve it to complete the transaction.",
        proceedPay: "Proceed to Pay",
        simulateFailure: "Simulate Failure",
        orderSummary: "Order Summary",
        totalPay: "Total to Pay",
        secureMock: "Secure Payment Simulation",
        mockWarning: "This is a mock gateway. No real charges are processed.",
        fillDeliveryAlert: "Please fill in all Delivery Details.",
        fillCardAlert: "Please fill in all card details for simulation.",
        fillUpiAlert: "Please enter a UPI ID for simulation.",
        declinedMsg: "Payment was declined by the simulated bank."
    },
    hi: {
        processingTitle: "भुगतान संसाधित हो रहा है...",
        processingDesc: "आपके लेन-देन को सुरक्षित किया जा रहा है, कृपया इस विंडो को बंद न करें।",
        successTitle: "भुगतान सफल!",
        successDesc: "आपका ऑर्डर दे दिया गया है और किसानों को भेज दिया गया है। वे जल्द ही आपकी फसल की प्रक्रिया शुरू करेंगे।",
        trackOrder: "ऑर्डर स्थिति ट्रैक करें",
        continueShopping: "खरीदारी जारी रखें",
        failedTitle: "भुगतान विफल",
        failedDesc: "आपके ऑर्डर को संसाधित करने में एक समस्या थी:",
        tryAgain: "पुनः प्रयास करें",
        returnCart: "कार्ट पर वापस जाएं",
        checkout: "चेकआउट",
        completeOrder: "नीचे अपना ऑर्डर पूरा करें।",
        deliveryDetails: "वितरण विवरण",
        fullName: "पूरा नाम",
        phone: "फ़ोन नंबर",
        address: "पूरा पता",
        payment: "भुगतान",
        card: "कार्ड",
        upi: "यूपीआई",
        cardNumber: "कार्ड नंबर",
        cardName: "कार्डधारक का नाम",
        expiry: "समाप्ति तिथि",
        cvv: "सीवीवी",
        upiId: "यूपीआई आईडी",
        vpaDetails: "अपना वर्चुअल भुगतान पता (VPA) दर्ज करें",
        upiApproveDesc: "आपके यूपीआई ऐप पर एक भुगतान अनुरोध भेजा जाएगा। कृपया लेन-देन पूरा करने के लिए इसे स्वीकृत करें।",
        proceedPay: "भुगतान के लिए आगे बढ़ें",
        simulateFailure: "विफलता का अनुकरण करें",
        orderSummary: "ऑर्डर सारांश",
        totalPay: "भुगतान करने के लिए कुल",
        secureMock: "सुरक्षित भुगतान अनुकरण",
        mockWarning: "यह एक मॉक गेटवे है। कोई वास्तविक शुल्क संसाधित नहीं किया जाता है।",
        fillDeliveryAlert: "कृपया सभी वितरण विवरण भरें।",
        fillCardAlert: "अनुकरण के लिए कृपया सभी कार्ड विवरण भरें।",
        fillUpiAlert: "अनुकरण के लिए कृपया यूपीआई आईडी दर्ज करें।",
        declinedMsg: "सिम्युलेटेड बैंक द्वारा भुगतान अस्वीकार कर दिया गया था।"
    },
    te: {
        processingTitle: "చెల్లింపు ప్రాసెస్ చేయబడుతోంది...",
        processingDesc: "మీ లావాదేవీని సురక్షితం చేస్తున్నాము, దయచేసి ఈ విండోను మూసివేయవద్దు.",
        successTitle: "చెల్లింపు విజయవంతమైంది!",
        successDesc: "మీ ఆర్డర్ చేయబడింది మరియు రైతులకు పంపబడింది. వారు త్వరలో మీ పంటను ప్రాసెస్ చేయడం ప్రారంభిస్తారు.",
        trackOrder: "ఆర్డర్ స్థితిని ట్రాక్ చేయండి",
        continueShopping: "షాపింగ్ కొనసాగించండి",
        failedTitle: "చెల్లింపు విఫలమైంది",
        failedDesc: "మీ ఆర్డర్‌ను ప్రాసెస్ చేయడంలో సమస్య ఏర్పడింది:",
        tryAgain: "మళ్ళీ ప్రయత్నించండి",
        returnCart: "కార్ట్‌కు తిరిగి వెళ్లండి",
        checkout: "చెక్అవుట్",
        completeOrder: "దిగువ మీ ఆర్డర్‌ను పూర్తి చేయండి.",
        deliveryDetails: "డెలివరీ వివరాలు",
        fullName: "పూర్తి పేరు",
        phone: "ఫోన్ నంబర్",
        address: "పూర్తి చిరునామా",
        payment: "చెల్లింపు",
        card: "కార్డు",
        upi: "UPI",
        cardNumber: "కార్డు సంఖ్య",
        cardName: "కార్డుదారుని పేరు",
        expiry: "గడువు తేదీ",
        cvv: "CVV",
        upiId: "UPI ID",
        vpaDetails: "మీ వర్చువల్ చెల్లింపు చిరునామా (VPA) ను నమోదు చేయండి",
        upiApproveDesc: "మీ UPI యాప్‌కు చెల్లింపు అభ్యర్థన పంపబడుతుంది. దయచేసి లావాదేవీని పూర్తి చేయడానికి దానిని ఆమోదించండి.",
        proceedPay: "చెల్లించడానికి కొనసాగండి",
        simulateFailure: "వైఫల్యాన్ని అనుకరించండి",
        orderSummary: "ఆర్డర్ సారాంశం",
        totalPay: "చెల్లించాల్సిన మొత్తం",
        secureMock: "సురక్షిత చెల్లింపు అనుకరణ",
        mockWarning: "ఇది మాక్ గేట్‌వే. నిజమైన ఛార్జీలు ప్రాసెస్ చేయబడవు.",
        fillDeliveryAlert: "దయచేసి అన్ని డెలివరీ వివరాలను పూరించండి.",
        fillCardAlert: "అనుకరణ కోసం దయచేసి అన్ని కార్డు వివరాలను పూరించండి.",
        fillUpiAlert: "అనుకరణ కోసం దయచేసి UPI ID ని నమోదు చేయండి.",
        declinedMsg: "సిమ్యులేట్ చేసిన బ్యాంక్ చెల్లింపును తిరస్కరించింది."
    },
    ta: {
        processingTitle: "கட்டணம் செயலாக்கப்படுகிறது...",
        processingDesc: "உங்கள் பரிவர்த்தனையைப் பாதுகாக்கிறது, தயவுசெய்து இந்த சாளரத்தை மூட வேண்டாம்.",
        successTitle: "கட்டணம் வெற்றிகரமாக செலுத்தப்பட்டது!",
        successDesc: "உங்கள் ஆர்டர் செய்யப்பட்டு விவசாயிகளுக்கு அனுப்பப்பட்டுள்ளது. அவர்கள் விரைவில் உங்கள் அறுவடையைச் செயல்படுத்தத் தொடங்குவார்கள்.",
        trackOrder: "ஆர்டரின் நிலையைக் கண்காணிக்கவும்",
        continueShopping: "தொடர்ந்து ஷாப்பிங் செய்யுங்கள்",
        failedTitle: "கட்டணம் தோல்வியடைந்தது",
        failedDesc: "உங்கள் ஆர்டரைச் செயலாக்குவதில் ஒரு சிக்கல் இருந்தது:",
        tryAgain: "மீண்டும் முயற்சிக்கவும்",
        returnCart: "வண்டிக்குத் திரும்பு",
        checkout: "செக்அவுட்",
        completeOrder: "கீழே உங்கள் ஆர்டரை முடிக்கவும்.",
        deliveryDetails: "விநியோக விவரங்கள்",
        fullName: "முழு பெயர்",
        phone: "தொலைபேசி எண்",
        address: "முழுமையான முகவரி",
        payment: "கட்டணம்",
        card: "அட்டை",
        upi: "யுபிஐ (UPI)",
        cardNumber: "அட்டை எண்",
        cardName: "அட்டைதாரரின் பெயர்",
        expiry: "காலாவதி தேதி",
        cvv: "சிவிவி (CVV)",
        upiId: "யுபிஐ ஐடி (UPI ID)",
        vpaDetails: "உங்கள் மெய்நிகர் கட்டண முகவரியை (VPA) உள்ளிடவும்",
        upiApproveDesc: "உங்கள் UPI பயன்பாட்டிற்கு கட்டணக் கோரிக்கை அனுப்பப்படும். பரிவர்த்தனையை நிறைவு செய்ய தயவுசெய்து அதை அங்கீகரிக்கவும்.",
        proceedPay: "பணம் செலுத்த தொடரவும்",
        simulateFailure: "தோல்வியைப் பாசாங்கு செய்",
        orderSummary: "ஆர்டர் சுருக்கம்",
        totalPay: "செலுத்த வேண்டிய மொத்தம்",
        secureMock: "பாதுகாப்பான கட்டண உருவகப்படுத்துதல்",
        mockWarning: "இது ஒரு மாதிரி நுழைவாயில். உண்மையான கட்டணங்கள் எதுவும் செயலாக்கப்படவில்லை.",
        fillDeliveryAlert: "அனைத்து விநியோக விவரங்களையும் நிரப்பவும்.",
        fillCardAlert: "உருவகப்படுத்துதலுக்கான அனைத்து அட்டை விவரங்களையும் நிரப்பவும்.",
        fillUpiAlert: "உருவகப்படுத்துதலுக்கான UPI ஐடியை உள்ளிடவும்.",
        declinedMsg: "உருவகப்படுத்தப்பட்ட வங்கியால் கட்டணம் நிராகரிக்கப்பட்டது."
    },
    ml: {
        processingTitle: "പേയ്‌മെൻ്റ് പ്രോസസ്സ് ചെയ്യുന്നു...",
        processingDesc: "നിങ്ങളുടെ ഇടപാട് സുരക്ഷിതമാക്കുന്നു, ദയവായി ഈ വിൻഡോ അടയ്ക്കരുത്.",
        successTitle: "പേയ്‌മെൻ്റ് വിജയകരം!",
        successDesc: "നിങ്ങളുടെ ഓർഡർ കർഷകർക്ക് അയച്ചിട്ടുണ്ട്. അവർ ഉടൻ തന്നെ നിങ്ങളുടെ വിളവെടുപ്പ് പ്രോസസ്സ് ചെയ്യാൻ തുടങ്ങും.",
        trackOrder: "ഓർഡർ നില ട്രാക്ക് ചെയ്യുക",
        continueShopping: "ഷോപ്പിംഗ് തുടരുക",
        failedTitle: "പേയ്‌മെൻ്റ് പരാജയപ്പെട്ടു",
        failedDesc: "നിങ്ങളുടെ ഓർഡർ പ്രോസസ്സ് ചെയ്യുന്നതിൽ ഒരു പ്രശ്നമുണ്ടായിരുന്നു:",
        tryAgain: "വീണ്ടും ശ്രമിക്കുക",
        returnCart: "കാർട്ടിലേക്ക് മടങ്ങുക",
        checkout: "ചെക്ക്ഔട്ട്",
        completeOrder: "താഴെ നിങ്ങളുടെ ഓർഡർ പൂർത്തിയാക്കുക.",
        deliveryDetails: "ഡെലിവറി വിശദാംശങ്ങൾ",
        fullName: "പൂർണ്ണമായ പേര്",
        phone: "ഫോൺ നമ്പർ",
        address: "മുഴുവൻ വിലാസം",
        payment: "പേയ്‌മെൻ്റ്",
        card: "കാർഡ്",
        upi: "യുപിഐ (UPI)",
        cardNumber: "കാർഡ് നമ്പർ",
        cardName: "കാർഡ് ഉടമയുടെ പേര്",
        expiry: "കാലാവധി തീരുന്ന തീയതി",
        cvv: "സിവിവി (CVV)",
        upiId: "യുപിഐ ഐഡി (UPI ID)",
        vpaDetails: "നിങ്ങളുടെ വെർച്വൽ പേയ്‌മെൻ്റ് വിലാസം (VPA) നൽകുക",
        upiApproveDesc: "നിങ്ങളുടെ UPI ആപ്പിലേക്ക് ഒരു പേയ്‌മെൻ്റ് അഭ്യർത്ഥന അയയ്‌ക്കും. ഇടപാട് പൂർത്തിയാക്കാൻ ദയവായി അത് അംഗീകരിക്കുക.",
        proceedPay: "പണമടയ്ക്കാൻ തുടരുക",
        simulateFailure: "പരാജയം അനുകരിക്കുക",
        orderSummary: "ഓർഡർ സംഗ്രഹം",
        totalPay: "അടയ്‌ക്കേണ്ട ആകെ തുക",
        secureMock: "സുരക്ഷിത പേയ്‌മെൻ്റ് സിമുലേഷൻ",
        mockWarning: "ഇതൊരു മോക്ക് ഗേറ്റ്‌വേയാണ്. യഥാർത്ഥ നിരക്കുകളൊന്നും പ്രോസസ്സ് ചെയ്യുന്നില്ല.",
        fillDeliveryAlert: "ദയവായി എല്ലാ ഡെലിവറി വിശദാംശങ്ങളും പൂരിപ്പിക്കുക.",
        fillCardAlert: "സിമുലേഷനായി ദയവായി എല്ലാ കാർഡ് വിശദാംശങ്ങളും പൂരിപ്പിക്കുക.",
        fillUpiAlert: "സിമുലേഷനായി ദയവായി ഒരു UPI ഐഡി നൽകുക.",
        declinedMsg: "സിമുലേറ്റഡ് ബാങ്ക് പേയ്‌മെൻ്റ് നിരസിച്ചു."
    },
    kn: {
        processingTitle: "ಪಾವತಿಯನ್ನು ಪ್ರಕ್ರಿಯೆಗೊಳಿಸಲಾಗುತ್ತಿದೆ...",
        processingDesc: "ನಿಮ್ಮ ವಹಿವಾಟನ್ನು ಸುರಕ್ಷಿತಗೊಳಿಸಲಾಗುತ್ತಿದೆ, ದಯವಿಟ್ಟು ಈ ವಿಂಡೋವನ್ನು ಮುಚ್ಚಬೇಡಿ.",
        successTitle: "ಪಾವತಿ ಯಶಸ್ವಿಯಾಗಿದೆ!",
        successDesc: "ನಿಮ್ಮ ಆದೇಶವನ್ನು ಇರಿಸಲಾಗಿದೆ ಮತ್ತು ರೈತರಿಗೆ ಕಳುಹಿಸಲಾಗಿದೆ. ಅವರು ಶೀಘ್ರದಲ್ಲೇ ನಿಮ್ಮ ಸುಗ್ಗಿಯನ್ನು ಪ್ರಕ್ರಿಯೆಗೊಳಿಸಲು ಪ್ರಾರಂಭಿಸುತ್ತಾರೆ.",
        trackOrder: "ಆರ್ಡರ್ ಸ್ಥಿತಿಯನ್ನು ಟ್ರ್ಯಾಕ್ ಮಾಡಿ",
        continueShopping: "ಶಾಪಿಂಗ್ ಮುಂದುವರಿಸಿ",
        failedTitle: "ಪಾವತಿ ವಿಫಲವಾಗಿದೆ",
        failedDesc: "ನಿಮ್ಮ ಆದೇಶವನ್ನು ಪ್ರಕ್ರಿಯೆಗೊಳಿಸುವಲ್ಲಿ ಸಮಸ್ಯೆ ಇತ್ತು:",
        tryAgain: "ಮತ್ತೆ ಪ್ರಯತ್ನಿಸಿ",
        returnCart: "ಕಾರ್ಟ್‌ಗೆ ಹಿಂತಿರುಗಿ",
        checkout: "ಚೆಕ್ಔಟ್",
        completeOrder: "ಕೆಳಗೆ ನಿಮ್ಮ ಆದೇಶವನ್ನು ಪೂರ್ಣಗೊಳಿಸಿ.",
        deliveryDetails: "ವಿತರಣಾ ವಿವರಗಳು",
        fullName: "ಪೂರ್ಣ ಹೆಸರು",
        phone: "ದೂರವಾಣಿ ಸಂಖ್ಯೆ",
        address: "ಪೂರ್ಣ ವಿಳಾಸ",
        payment: "ಪಾವತಿ",
        card: "ಕಾರ್ಡ್",
        upi: "UPI",
        cardNumber: "ಕಾರ್ಡ್ ಸಂಖ್ಯೆ",
        cardName: "ಕಾರ್ಡುದಾರರ ಹೆಸರು",
        expiry: "ವಾಯಿದೆ ಮುಗಿಯುವ ದಿನಾಂಕ",
        cvv: "CVV",
        upiId: "UPI ID",
        vpaDetails: "ನಿಮ್ಮ ವರ್ಚುವಲ್ ಪಾವತಿ ವಿಳಾಸ (VPA) ನಮೂದಿಸಿ",
        upiApproveDesc: "ನಿಮ್ಮ UPI ಅಪ್ಲಿಕೇಶನ್‌ಗೆ ಪಾವತಿ ವಿನಂತಿಯನ್ನು ಕಳುಹಿಸಲಾಗುತ್ತದೆ. ವಹಿವಾಟನ್ನು ಪೂರ್ಣಗೊಳಿಸಲು ದಯವಿಟ್ಟು ಅದನ್ನು ಅನುಮೋದಿಸಿ.",
        proceedPay: "ಪಾವತಿಸಲು ಮುಂದುವರಿಯಿರಿ",
        simulateFailure: "ವೈಫಲ್ಯವನ್ನು ಅನುಕರಿಸಿ",
        orderSummary: "ಆರ್ಡರ್ ಸಾರಾಂಶ",
        totalPay: "ಪಾವತಿಸಬೇಕಾದ ಒಟ್ಟು",
        secureMock: "ಸುರಕ್ಷಿತ ಪಾವತಿ ಸಿಮ್ಯುಲೇಶನ್",
        mockWarning: "ಇದು ಅಣಕು ಗೇಟ್ವೇ. ಯಾವುದೇ ನೈಜ ಶುಲ್ಕಗಳು ಪ್ರಕ್ರಿಯೆಗೊಂಡಿಲ್ಲ.",
        fillDeliveryAlert: "ದಯವಿಟ್ಟು ಎಲ್ಲಾ ವಿತರಣಾ ವಿವರಗಳನ್ನು ಭರ್ತಿ ಮಾಡಿ.",
        fillCardAlert: "ಸಿಮ್ಯುಲೇಶನ್‌ಗಾಗಿ ದಯವಿಟ್ಟು ಎಲ್ಲಾ ಕಾರ್ಡ್ ವಿವರಗಳನ್ನು ಭರ್ತಿ ಮಾಡಿ.",
        fillUpiAlert: "ಸಿಮ್ಯುಲೇಶನ್‌ಗಾಗಿ ದಯವಿಟ್ಟು UPI ID ಯನ್ನು ನಮೂದಿಸಿ.",
        declinedMsg: "ಸಿಮ್ಯುಲೇಟೆಡ್ ಬ್ಯಾಂಕ್‌ನಿಂದ ಪಾವತಿಯನ್ನು ತಿರಸ್ಕರಿಸಲಾಗಿದೆ."
    },
    pa: {
        processingTitle: "ਭੁਗਤਾਨ ਦੀ ਪ੍ਰਕਿਰਿਆ ਹੋ ਰਹੀ ਹੈ...",
        processingDesc: "ਤੁਹਾਡੇ ਲੈਣ-ਦੇਣ ਨੂੰ ਸੁਰੱਖਿਅਤ ਕੀਤਾ ਜਾ ਰਿਹਾ ਹੈ, ਕਿਰਪਾ ਕਰਕੇ ਇਸ ਵਿੰਡੋ ਨੂੰ ਬੰਦ ਨਾ ਕਰੋ।",
        successTitle: "ਭੁਗਤਾਨ ਸਫਲ!",
        successDesc: "ਤੁਹਾਡਾ ਆਰਡਰ ਦੇ ਦਿੱਤਾ ਗਿਆ ਹੈ ਅਤੇ ਕਿਸਾਨਾਂ ਨੂੰ ਭੇਜ ਦਿੱਤਾ ਗਿਆ ਹੈ। ਉਹ ਜਲਦੀ ਹੀ ਤੁਹਾਡੀ ਫਸਲ ਦੀ ਪ੍ਰਕਿਰਿਆ ਸ਼ੁਰੂ ਕਰਨਗੇ।",
        trackOrder: "ਆਰਡਰ ਦੀ ਸਥਿਤੀ ਟਰੈਕ ਕਰੋ",
        continueShopping: "ਖਰੀਦਦਾਰੀ ਜਾਰੀ ਰੱਖੋ",
        failedTitle: "ਭੁਗਤਾਨ ਅਸਫਲ",
        failedDesc: "ਤੁਹਾਡੇ ਆਰਡਰ ਦੀ ਪ੍ਰਕਿਰਿਆ ਕਰਨ ਵਿੱਚ ਕੋਈ ਸਮੱਸਿਆ ਸੀ:",
        tryAgain: "ਦੁਬਾਰਾ ਕੋਸ਼ਿਸ਼ ਕਰੋ",
        returnCart: "ਕਾਰਟ 'ਤੇ ਵਾਪਸ ਜਾਓ",
        checkout: "ਚੈੱਕਆਉਟ",
        completeOrder: "ਹੇਠਾਂ ਆਪਣਾ ਆਰਡਰ ਪੂਰਾ ਕਰੋ।",
        deliveryDetails: "ਡਿਲੀਵਰੀ ਵੇਰਵੇ",
        fullName: "ਪੂਰਾ ਨਾਮ",
        phone: "ਫੋਨ ਨੰਬਰ",
        address: "ਪੂਰਾ ਪਤਾ",
        payment: "ਭੁਗਤਾਨ",
        card: "ਕਾਰਡ",
        upi: "ਯੂਪੀਆਈ",
        cardNumber: "ਕਾਰਡ ਨੰਬਰ",
        cardName: "ਕਾਰਡਧਾਰਕ ਦਾ ਨਾਮ",
        expiry: "ਮਿਆਦ ਪੁੱਗਣ ਦੀ ਮਿਤੀ",
        cvv: "ਸੀਵੀਵੀ",
        upiId: "ਯੂਪੀਆਈ ਆਈਡੀ",
        vpaDetails: "ਆਪਣਾ ਵਰਚੁਅਲ ਭੁਗਤਾਨ ਪਤਾ (VPA) ਦਰਜ ਕਰੋ",
        upiApproveDesc: "ਤੁਹਾਡੇ UPI ਐਪ 'ਤੇ ਇੱਕ ਭੁਗਤਾਨ ਬੇਨਤੀ ਭੇਜੀ ਜਾਵੇਗੀ। ਕਿਰਪਾ ਕਰਕੇ ਲੈਣ-ਦੇਣ ਨੂੰ ਪੂਰਾ ਕਰਨ ਲਈ ਇਸਨੂੰ ਮਨਜ਼ੂਰੀ ਦਿਓ।",
        proceedPay: "ਭੁਗਤਾਨ ਕਰਨ ਲਈ ਅੱਗੇ ਵਧੋ",
        simulateFailure: "ਅਸਫਲਤਾ ਦੀ ਨਕਲ ਕਰੋ",
        orderSummary: "ਆਰਡਰ ਦਾ ਸਾਰ",
        totalPay: "ਭੁਗਤਾਨ ਕਰਨ ਲਈ ਕੁੱਲ",
        secureMock: "ਸੁਰੱਖਿਅਤ ਭੁਗਤਾਨ ਸਿਮੂਲੇਸ਼ਨ",
        mockWarning: "ਇਹ ਇੱਕ ਮੌਕ ਗੇਟਵੇ ਹੈ। ਕੋਈ ਅਸਲ ਖਰਚੇ ਦੀ ਪ੍ਰਕਿਰਿਆ ਨਹੀਂ ਕੀਤੀ ਜਾਂਦੀ।",
        fillDeliveryAlert: "ਕਿਰਪਾ ਕਰਕੇ ਸਾਰੇ ਡਿਲੀਵਰੀ ਵੇਰਵੇ ਭਰੋ।",
        fillCardAlert: "ਸਿਮੂਲੇਸ਼ਨ ਲਈ ਕਿਰਪਾ ਕਰਕੇ ਕਾਰਡ ਦੇ ਸਾਰੇ ਵੇਰਵੇ ਭਰੋ।",
        fillUpiAlert: "ਸਿਮੂਲੇਸ਼ਨ ਲਈ ਕਿਰਪਾ ਕਰਕੇ ਯੂਪੀਆਈ ਆਈਡੀ ਦਰਜ ਕਰੋ।",
        declinedMsg: "ਸਿਮੂਲੇਟਡ ਬੈਂਕ ਦੁਆਰਾ ਭੁਗਤਾਨ ਤੋਂ ਇਨਕਾਰ ਕਰ ਦਿੱਤਾ ਗਿਆ ਸੀ।"
    },
    mr: {
        processingTitle: "पेमेंटवर प्रक्रिया होत आहे...",
        processingDesc: "तुमचा व्यवहार सुरक्षित करत आहे, कृपया ही विंडो बंद करू नका.",
        successTitle: "पेमेंट यशस्वी!",
        successDesc: "तुमची ऑर्डर दिली गेली आहे आणि शेतकऱ्यांना पाठवली गेली आहे. ते लवकरच तुमच्या कापणीवर प्रक्रिया सुरू करतील.",
        trackOrder: "ऑर्डर स्थितीचा मागोवा घ्या",
        continueShopping: "खरेदी सुरू ठेवा",
        failedTitle: "पेमेंट अयशस्वी",
        failedDesc: "तुमच्या ऑर्डरवर प्रक्रिया करताना एक समस्या होती:",
        tryAgain: "पुन्हा प्रयत्न करा",
        returnCart: "कार्टमध्ये परत जा",
        checkout: "चेकआउट",
        completeOrder: "खाली तुमची ऑर्डर पूर्ण करा.",
        deliveryDetails: "वितरण तपशील",
        fullName: "पूर्ण नाव",
        phone: "फोन नंबर",
        address: "संपूर्ण पत्ता",
        payment: "पेमेंट",
        card: "कार्ड",
        upi: "UPI",
        cardNumber: "कार्ड नंबर",
        cardName: "कार्डधारकाचे नाव",
        expiry: "कालबाह्यता तारीख",
        cvv: "CVV",
        upiId: "UPI ID",
        vpaDetails: "तुमचा व्हर्च्युअल पेमेंट पत्ता (VPA) प्रविष्ट करा",
        upiApproveDesc: "तुमच्या UPI अ‍ॅपवर पेमेंट विनंती पाठवली जाईल. कृपया व्यवहार पूर्ण करण्यासाठी त्यास मान्यता द्या.",
        proceedPay: "देय देण्यासाठी पुढे जा",
        simulateFailure: "अयशस्वी होण्याचे अनुकरण करा",
        orderSummary: "ऑर्डर सारांश",
        totalPay: "भरणे एकूण",
        secureMock: "सुरक्षित पेमेंट सिम्युलेशन",
        mockWarning: "हे मॉक गेटवे आहे. कोणतेही वास्तविक शुल्क आकारले जात नाही.",
        fillDeliveryAlert: "कृपया सर्व वितरण तपशील भरा.",
        fillCardAlert: "सिम्युलेशनसाठी कृपया सर्व कार्ड तपशील भरा.",
        fillUpiAlert: "सिम्युलेशनसाठी कृपया UPI आयडी प्रविष्ट करा.",
        declinedMsg: "सिम्युलेटेड बँकेने पेमेंट नाकारले."
    }
};

const Payments = ({ user }) => {
    const navigate = useNavigate();
    const { fetchCart, cartItems, userEmail, totalPrice } = useCart();

    const [status, setStatus] = useState('method_selection'); // method_selection, processing, success, error
    const [errorMessage, setErrorMessage] = useState('');
    const [paymentMethod, setPaymentMethod] = useState('card'); // card, upi

    // Delivery Details Form State
    const [deliveryDetails, setDeliveryDetails] = useState({ name: '', phone: '', address: '' });

    // Mock Form States
    const [cardDetails, setCardDetails] = useState({ number: '', name: '', expiry: '', cvv: '' });
    const [upiId, setUpiId] = useState('');

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
        const fetchProfile = async () => {
            if (user?.id) {
                try {
                    const response = await fetch(`${import.meta.env.VITE_API_URL || "http://localhost:5001"}/api/users/${user.id}`);
                    if (response.ok) {
                        const data = await response.json();
                        if (data.profile) {
                            setDeliveryDetails(prev => ({
                                name: data.profile.name || prev.name,
                                phone: data.profile.phone || prev.phone,
                                address: data.profile.address || prev.address
                            }));
                        }
                    }
                } catch (error) {
                    console.error("Failed to fetch profile for pre-filling delivery details", error);
                }
            }
        };
        fetchProfile();
    }, [user]);

    const processOrder = async (shouldSucceed = true) => {
        setStatus('processing');

        // Simulate network delay
        await new Promise(resolve => setTimeout(resolve, 2000));

        if (!shouldSucceed) {
            setStatus('error');
            setErrorMessage(tr.declinedMsg);
            return;
        }

        try {
            // 1. Ensure we have the latest cart items
            await fetchCart();
            const email = userEmail || localStorage.getItem('userEmail');

            if (!email) {
                throw new Error("User session expired during payment.");
            }

            if (!cartItems || cartItems.length === 0) {
                setStatus('success'); // Assume already handled if cart empty
                return;
            }

            // 2. Create Orders for each farmer, passing in the delivery details explicitly
            const orderRes = await fetch(`${import.meta.env.VITE_API_URL || "http://localhost:5001"}/api/orders`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    buyerEmail: email,
                    items: cartItems,
                    deliveryDetails
                })
            });

            if (!orderRes.ok) {
                const errData = await orderRes.json();
                throw new Error(errData.message || "Failed to generate order documents.");
            }

            // 3. Clear Cart
            const clearRes = await fetch(`${import.meta.env.VITE_API_URL || `${import.meta.env.VITE_API_URL || "http://localhost:5001"}`}/api/cart/clear/${email}`, {
                method: 'DELETE'
            });

            if (!clearRes.ok) {
                console.error("Cart wasn't cleared but order succeeded.");
            }

            // Refresh cart state to empty globally
            fetchCart();
            setStatus('success');

        } catch (err) {
            console.error(err);
            setStatus('error');
            setErrorMessage(err.message);
        }
    };

    const handleSimulatePayment = (e) => {
        e.preventDefault();

        // Validation - Delivery details
        if (!deliveryDetails.name || !deliveryDetails.phone || !deliveryDetails.address) {
            alert(tr.fillDeliveryAlert);
            return;
        }

        // Validation - Payment Details
        if (paymentMethod === 'card') {
            if (!cardDetails.number || !cardDetails.name || !cardDetails.expiry || !cardDetails.cvv) {
                alert(tr.fillCardAlert);
                return;
            }
        } else {
            if (!upiId) {
                alert(tr.fillUpiAlert);
                return;
            }
        }

        processOrder(true);
    };

    if (status === 'processing') {
        return (
            <div className="min-h-screen bg-[#F8FAFC] flex flex-col items-center justify-center p-4">
                <Loader2 className="w-16 h-16 text-emerald-600 animate-spin mb-6" />
                <h1 className="text-2xl font-black text-slate-800 tracking-tight">{tr.processingTitle}</h1>
                <p className="text-slate-500 mt-2 font-medium">{tr.processingDesc}</p>
            </div>
        );
    }

    if (status === 'success') {
        return (
            <div className="min-h-screen bg-[#F8FAFC] flex items-center justify-center p-4">
                <div className="bg-white p-8 md:p-12 rounded-[2rem] shadow-2xl shadow-emerald-900/5 border border-slate-100 max-w-md w-full text-center">
                    <div className="w-24 h-24 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-8 animate-[bounce_1s_ease-in-out_infinite]">
                        <CheckCircle2 size={48} className="text-emerald-600" />
                    </div>
                    <h1 className="text-3xl font-black text-slate-900 tracking-tight mb-4">{tr.successTitle}</h1>
                    <p className="text-slate-500 font-medium mb-10 leading-relaxed">
                        {tr.successDesc}
                    </p>
                    <div className="space-y-4">
                        <button
                            onClick={() => navigate('/my-orders')}
                            className="w-full bg-emerald-600 hover:bg-emerald-700 text-white py-4 rounded-xl font-bold shadow-lg shadow-emerald-200 transition-all active:scale-95"
                        >
                            {tr.trackOrder}
                        </button>
                        <button
                            onClick={() => navigate('/marketplace')}
                            className="w-full bg-slate-100 hover:bg-slate-200 text-slate-700 py-4 rounded-xl font-bold transition-all active:scale-95"
                        >
                            {tr.continueShopping}
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    if (status === 'error') {
        return (
            <div className="min-h-screen bg-[#F8FAFC] flex items-center justify-center p-4">
                <div className="bg-white p-8 md:p-12 rounded-[2rem] shadow-2xl shadow-red-900/5 border border-slate-100 max-w-md w-full text-center">
                    <div className="w-24 h-24 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-8">
                        <XCircle size={48} className="text-red-500" />
                    </div>
                    <h1 className="text-3xl font-black text-slate-900 tracking-tight mb-4">{tr.failedTitle}</h1>
                    <p className="text-slate-500 font-medium mb-10 leading-relaxed">
                        {tr.failedDesc} {errorMessage}
                    </p>
                    <div className="space-y-4">
                        <button
                            onClick={() => setStatus('method_selection')}
                            className="w-full bg-emerald-600 hover:bg-emerald-700 text-white py-4 rounded-xl font-bold shadow-lg shadow-emerald-200 transition-all active:scale-95"
                        >
                            {tr.tryAgain}
                        </button>
                        <button
                            onClick={() => navigate('/cart')}
                            className="w-full bg-slate-100 hover:bg-slate-200 text-slate-700 py-4 rounded-xl font-bold transition-all active:scale-95"
                        >
                            {tr.returnCart}
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    // method_selection state
    return (
        <div className="min-h-screen bg-slate-50 py-8 px-4 sm:px-6 lg:px-8 font-sans">
            <div className="max-w-4xl mx-auto flex flex-col md:flex-row gap-8">

                {/* Left Column: Form Sections */}
                <div className="flex-1 space-y-6">
                    {/* Header with Back Button */}
                    <div className="flex items-center gap-4 mb-2">
                        <button
                            onClick={() => navigate('/cart')}
                            className="p-2 bg-white rounded-full shadow-sm border border-slate-200 hover:bg-slate-100 transition-colors text-slate-600"
                            aria-label="Back to Cart"
                        >
                            <ArrowLeft size={20} />
                        </button>
                        <div>
                            <h2 className="text-3xl font-black text-slate-900 tracking-tight">{tr.checkout}</h2>
                            <p className="text-slate-500 text-sm font-medium mt-1">{tr.completeOrder}</p>
                        </div>
                    </div>

                    <form onSubmit={handleSimulatePayment} className="space-y-6">
                        {/* 1. Delivery Details Section */}
                        <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-5">
                            <h3 className="font-black text-xl flex items-center gap-2 text-slate-800">
                                <MapPin size={22} className="text-emerald-600" /> {tr.deliveryDetails}
                            </h3>

                            <div className="space-y-4 pt-2">
                                <div className="space-y-2">
                                    <label className="text-sm font-bold text-slate-700 block">{tr.fullName}</label>
                                    <div className="relative">
                                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                                            <User size={18} />
                                        </div>
                                        <input
                                            type="text"
                                            placeholder="Enter your name"
                                            value={deliveryDetails.name}
                                            onChange={(e) => setDeliveryDetails({ ...deliveryDetails, name: e.target.value })}
                                            className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-10 pr-4 py-3 focus:outline-none focus:ring-2 focus:ring-emerald-500 font-medium transition-shadow"
                                            required
                                        />
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <label className="text-sm font-bold text-slate-700 block">{tr.phone}</label>
                                    <div className="relative">
                                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                                            <Phone size={18} />
                                        </div>
                                        <input
                                            type="tel"
                                            placeholder="10-digit mobile number"
                                            value={deliveryDetails.phone}
                                            onChange={(e) => setDeliveryDetails({ ...deliveryDetails, phone: e.target.value })}
                                            className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-10 pr-4 py-3 focus:outline-none focus:ring-2 focus:ring-emerald-500 font-medium transition-shadow"
                                            required
                                        />
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <label className="text-sm font-bold text-slate-700 block">{tr.address}</label>
                                    <textarea
                                        placeholder="House No, Building, Street, Area, City, Pincode"
                                        value={deliveryDetails.address}
                                        onChange={(e) => setDeliveryDetails({ ...deliveryDetails, address: e.target.value })}
                                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-emerald-500 font-medium min-h-[100px] transition-shadow resize-y"
                                        required
                                    />
                                </div>
                            </div>
                        </div>

                        {/* 2. Payment Method Section */}
                        <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-6">
                            <h3 className="font-black text-xl flex items-center gap-2 text-slate-800">
                                <CreditCard size={22} className="text-emerald-600" /> {tr.payment}
                            </h3>

                            {/* Tab Selection */}
                            <div className="flex gap-4 p-1 bg-slate-100 rounded-2xl">
                                <button
                                    type="button"
                                    onClick={() => setPaymentMethod('card')}
                                    className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-xl font-bold transition-all ${paymentMethod === 'card' ? 'bg-white text-emerald-800 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
                                >
                                    <CreditCard size={20} /> {tr.card}
                                </button>
                                <button
                                    type="button"
                                    onClick={() => setPaymentMethod('upi')}
                                    className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-xl font-bold transition-all ${paymentMethod === 'upi' ? 'bg-white text-emerald-800 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
                                >
                                    <Smartphone size={20} /> {tr.upi}
                                </button>
                            </div>

                            {/* Payment Method Forms */}
                            {paymentMethod === 'card' ? (
                                <div className="space-y-4 animate-in fade-in slide-in-from-bottom-2 duration-300">
                                    <div className="space-y-2">
                                        <label className="text-sm font-bold text-slate-700 block">{tr.cardNumber}</label>
                                        <input
                                            type="text"
                                            placeholder="0000 0000 0000 0000"
                                            value={cardDetails.number}
                                            onChange={(e) => setCardDetails({ ...cardDetails, number: e.target.value })}
                                            className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-emerald-500 font-medium"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-sm font-bold text-slate-700 block">{tr.cardName}</label>
                                        <input
                                            type="text"
                                            placeholder="John Doe"
                                            value={cardDetails.name}
                                            onChange={(e) => setCardDetails({ ...cardDetails, name: e.target.value })}
                                            className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-emerald-500 font-medium"
                                        />
                                    </div>
                                    <div className="flex gap-4">
                                        <div className="flex-1 space-y-2">
                                            <label className="text-sm font-bold text-slate-700 block">{tr.expiry}</label>
                                            <input
                                                type="text"
                                                placeholder="MM/YY"
                                                value={cardDetails.expiry}
                                                onChange={(e) => setCardDetails({ ...cardDetails, expiry: e.target.value })}
                                                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-emerald-500 font-medium"
                                            />
                                        </div>
                                        <div className="flex-1 space-y-2">
                                            <label className="text-sm font-bold text-slate-700 block">{tr.cvv}</label>
                                            <input
                                                type="text"
                                                placeholder="123"
                                                value={cardDetails.cvv}
                                                onChange={(e) => setCardDetails({ ...cardDetails, cvv: e.target.value })}
                                                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-emerald-500 font-medium"
                                            />
                                        </div>
                                    </div>
                                </div>
                            ) : (
                                <div className="space-y-4 animate-in fade-in slide-in-from-bottom-2 duration-300">
                                    <div className="space-y-2">
                                        <label className="text-sm font-bold text-slate-700 block">{tr.upiId}</label>
                                        <input
                                            type="text"
                                            placeholder="username@bank"
                                            value={upiId}
                                            onChange={(e) => setUpiId(e.target.value)}
                                            className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-emerald-500 font-medium"
                                        />
                                        <p className="text-xs text-slate-500 font-medium mt-1">{tr.vpaDetails}</p>
                                    </div>
                                    <div className="bg-emerald-50 p-4 rounded-xl border border-emerald-100 flex items-start gap-3">
                                        <Smartphone className="text-emerald-600 mt-0.5" size={20} />
                                        <div className="text-sm text-emerald-800 font-medium">
                                            {tr.upiApproveDesc}
                                        </div>
                                    </div>
                                </div>
                            )}

                            {/* Action Buttons */}
                            <div className="pt-4 border-t border-slate-100 flex flex-col sm:flex-row gap-4">
                                <button
                                    type="submit"
                                    className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white py-4 rounded-xl font-black shadow-lg shadow-emerald-200 transition-all active:scale-95 flex items-center justify-center gap-2"
                                >
                                    {tr.proceedPay} <ChevronRight size={20} />
                                </button>
                                <button
                                    type="button"
                                    onClick={() => processOrder(false)}
                                    className="sm:w-auto w-full bg-slate-100 hover:bg-slate-200 text-slate-700 py-4 px-6 rounded-xl font-bold transition-all active:scale-95 border border-slate-200"
                                >
                                    {tr.simulateFailure}
                                </button>
                            </div>
                        </div>
                    </form>
                </div>

                {/* Right Column: Order Summary */}
                <div className="md:w-[350px]">
                    <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm sticky top-6">
                        <h3 className="font-black text-xl mb-6">{tr.orderSummary}</h3>

                        <div className="flex justify-between items-center border-b border-slate-100 pb-6 mb-6">
                            <span className="font-bold text-slate-600 text-sm">{tr.totalPay}</span>
                            <span className="text-3xl font-black text-emerald-800">₹{totalPrice || 0}</span>
                        </div>

                        <div className="space-y-3">
                            <div className="bg-slate-50 p-4 rounded-xl flex items-center gap-3">
                                <ShieldCheck size={24} className="text-emerald-600 shrink-0" />
                                <div>
                                    <p className="text-sm font-bold text-slate-800">{tr.secureMock}</p>
                                    <p className="text-xs text-slate-500 mt-0.5">{tr.mockWarning}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default Payments;
