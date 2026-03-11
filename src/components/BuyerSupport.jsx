import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from './LanguageContext';
import { useTranslation } from 'react-i18next';

const BuyerSupport = ({ user }) => {
    const navigate = useNavigate();
    const { langCode: lang, setLanguage: setLang } = useLanguage();
    const { t } = useTranslation();
    const translations = {
        en: {
            title: 'Buyer Support & Assistance',
            subtitle: 'Streamlining your procurement journey. How can we help?',
            voiceCall: 'Call Support',
            whatsapp: 'Operations Chat',
            smsIvr: 'SMS Status',
            faqs: 'Buyer Resources',
            dispute: 'Report a Transaction Issue',
            back: 'Back to Marketplace',
            myReports: 'My Reports',
            selectLang: 'Select Language',
            procurementTitle: 'Report an Issue',
            procurementDesc: 'Flag quality, weight, delivery, or invoice issues quickly.',

            logisticsTitle: 'Track Previous Tickets',
            logisticsDesc: 'Check the real-time status of your raised disputes and queries.',

            qualityTitle: 'AgriWise Usage Guide',
            qualityDesc: 'Step-by-step instructions: explore, order, pay, and track.',

            paymentTitle: 'Quality & Refund Policy',
            paymentDesc: 'Official rules on when you can reject a shipment for a refund.',

            enterpriseSupport: 'Buyer Support Center',
            heroTitlePrefix: 'Your complete',
            heroTitleHighlight: 'support hub',
            heroDesc: 'Report issues, track tickets, learn how to buy, and view quality policies — all in one place.',

            opsLine: 'Operations Chat',
            logisticsHelp: '24/7 Logistics Help',
            queryStatus: 'Query Status',

            openHub: 'Open Dispute Form →',
            logisticsDash: 'View My Reports →',
            gradingProto: 'Read Full Guide →',
            escrowSet: 'View Quality Policy →',
            disputeDesc: 'Flag issues with quality, weight mismatch, or delivery delays. Our dedicated auditing team will mediate to ensure a fair resolution within 48 hours.',
            raiseDispute: 'Raise Dispute Now',
            cancelDispute: 'Cancel Dispute',
            farmerNameLabel: 'Farmer Name / ID',
            farmerNamePlaceholder: 'Seller Details',
            orderIdLabel: 'Order/Lot ID',
            orderIdPlaceholder: 'Transaction ID',
            issueTypeLabel: 'Type of Issue',
            selectCategory: 'Select category...',
            issueQuality: 'Quality Mismatch',
            issueWeight: 'Weight/Quantity Shortage',
            issueDelivery: 'Late Delivery',
            issueInvoice: 'Invoice/GST Error',
            messageLabel: 'Detailed Message',
            messagePlaceholder: 'Briefly describe the issue for our verification team...',
            submitInvest: 'Submit for Investigation',
            registering: 'Registering...',
            disputeRaised: 'Dispute Raised! ✅',
            backDashboard: 'Back to Dashboard',
            auctionRules: 'E-Auction Rules',
            tenderTracker: 'Tender Tracker',
            liveTracking: 'Live Tracking Feature',
            trackingDesc: 'Use the "Marketplace > Orders" tab to see real-time GPS status and temperature logs for your current shipments.',
            gradeAplus: 'Grade A+',
            gradeA: 'Grade A',
            gradeB: 'Grade B',
            exportGrade: 'Export Grade',
            domesticStd: 'Domestic Std',
            industrial: 'Industrial',
            downloadGst: 'Download GST Helper',
            walletSettings: 'Wallet Settings',
            footerText: 'AgriWise Enterprise — Securing the Supply Chain'
        },
        hi: {
            title: 'खरीददार समर्थन & सहायता',
            subtitle: 'आपकी खरीद यात्रा को सुव्यवस्थित करना। हम कैसे मदद कर सकते हैं?',
            voiceCall: 'कॉल सपोर्ट',
            whatsapp: 'ऑपरेशंस चैट',
            smsIvr: 'SMS स्थिति',
            faqs: 'खरीददार संसाधन',
            dispute: 'लेनदेन की समस्या की रिपोर्ट करें',
            back: 'मार्केटप्लेस पर वापस',
            myReports: 'मेरी रिपोर्ट',
            selectLang: 'भाषा चुनें',
            procurementTitle: 'समस्या की रिपोर्ट करें',
            procurementDesc: 'गुणवत्ता, वजन, डिलीवरी, चालान की समस्याओं को तुरंत फ़्लैग करें।',
            logisticsTitle: 'पिछले टिकट ट्रैक करें',
            logisticsDesc: 'अपने विवादों और पूछताछ की वास्तविक समय स्थिति जांचें।',
            qualityTitle: 'AgriWise उपयोग गाइड',
            qualityDesc: 'चरण-दर-चरण निर्देश: अन्वेषण, ऑर्डर, भुगतान, ट्रैक।',
            paymentTitle: 'गुणवत्ता और वापसी नीति',
            paymentDesc: 'शिपमेंट अस्वीकार करने के आधिकारिक नियम।',
            enterpriseSupport: 'खरीददार सहायता केंद्र',
            heroTitlePrefix: 'आपका संपूर्ण',
            heroTitleHighlight: 'समर्थन हब',
            heroDesc: 'समस्याएं रिपोर्ट करें, टिकट ट्रैक करें, खरीद का तरीका जानें — एक ही जगह।',
            opsLine: 'ऑपरेशंस चैट',
            logisticsHelp: '24/7 लॉजिस्टिक्स मदद',
            queryStatus: 'पूछताछ स्थिति',
            openHub: 'विवाद फॉर्म खोलें →',
            logisticsDash: 'मेरी रिपोर्ट देखें →',
            gradingProto: 'पूरी गाइड पढ़ें →',
            escrowSet: 'गुणवत्ता नीति देखें →',
            disputeDesc: 'गुणवत्ता, वजन, डिलीवरी की समस्याओं को फ़्लैग करें। 48 घंटों में उचित समाधान सुनिश्चित किया जाएगा।',
            raiseDispute: 'अभी विवाद उठाएं',
            cancelDispute: 'विवाद रद्द करें',
            farmerNameLabel: 'किसान का नाम / ID',
            farmerNamePlaceholder: 'विक्रेता का विवरण',
            orderIdLabel: 'ऑर्डर/लॉट ID',
            orderIdPlaceholder: 'लेनदेन ID',
            issueTypeLabel: 'समस्या का प्रकार',
            selectCategory: 'श्रेणी चुनें...',
            issueQuality: 'गुणवत्ता में बेमेल',
            issueWeight: 'वजन/मात्रा में कमी',
            issueDelivery: 'देर से डिलीवरी',
            issueInvoice: 'चालान/GST त्रुटि',
            messageLabel: 'विस्तृत संदेश',
            messagePlaceholder: 'हमारी सत्यापन टीम के लिए समस्या का संक्षेप में वर्णन करें...',
            submitInvest: 'जांच के लिए सबमिट करें',
            registering: 'पंजीकरण हो रहा है...',
            disputeRaised: 'विवाद उठाया गया! ✅',
            backDashboard: 'डैशबोर्ड पर वापस',
            auctionRules: 'ई-नीलामी नियम',
            tenderTracker: 'टेंडर ट्रैकर',
            liveTracking: 'लाइव ट्रैकिंग सुविधा',
            trackingDesc: 'वर्तमान शिपमेंट की GPS स्थिति देखने के लिए "Marketplace > Orders" टैब का उपयोग करें।',
            gradeAplus: 'ग्रेड A+',
            gradeA: 'ग्रेड A',
            gradeB: 'ग्रेड B',
            exportGrade: 'निर्यात ग्रेड',
            domesticStd: 'घरेलू Std',
            industrial: 'औद्योगिक',
            downloadGst: 'GST सहायक डाउनलोड करें',
            walletSettings: 'वॉलेट सेटिंग्स',
            footerText: 'AgriWise Enterprise — आपूर्ति श्रृंखला को सुरक्षित करना'
        },
        te: {
            title: 'కొనుగోలుదారు మద్దతు & సహాయం',
            subtitle: 'మీ సేకరణ ప్రయాణాన్ని సులభతరం చేస్తున్నాము. మేము ఎలా సహాయపడగలము?',
            voiceCall: 'కాల్ సపోర్ట్',
            whatsapp: 'ఆపరేషన్స్ చాట్',
            smsIvr: 'SMS స్థితి',
            faqs: 'కొనుగోలుదారు వనరులు',
            dispute: 'లావాదేవీ సమస్యను నివేదించండి',
            back: 'మార్కెట్‌ప్లేస్‌కు తిరిగి వెళ్లండి',
            selectLang: 'భాషను ఎంచుకోండి',
            procurementTitle: 'సేకరణ & బిడ్డింగ్',
            procurementDesc: 'బల్క్ బిడ్డింగ్ మరియు ఈ-వేలం కోసం అధునాతన నియమాలు.',
            procurementFull: 'AgriWise ప్రొక్యూర్‌మెంట్ ఇంజిన్ ఎంటర్‌ప్రైజ్-గ్రేడ్ సామర్థ్యం కోసం రూపొందించబడింది, ప్రత్యక్ష స్పాట్-బైయింగ్ మరియు సంక్లిష్ట రివర్స్ వేలం రెంటికీ మద్దతు ఇస్తుంది.',
            logisticsTitle: 'లాజిస్టిక్స్ & ట్రాకింగ్',
            logisticsDesc: 'రియల్ టైమ్ ఫ్లీట్ మేనేజ్‌మెంట్ మరియు క్యారియర్ సమన్వయం.',
            logisticsFull: 'సమర్థవంతమైన సరఫరా గొలుసు నిర్వహణ కొనుగోలుదారు అనుభవంలో ప్రధానమైనది. AgriWise Connect ద్వారా, కొనుగోలుదారులు ఫ్లీట్ యజమానుల నెట్‌వర్క్‌కు ప్రత్యక్ష ప్రాప్యతను పొందుతారు.',
            paymentTitle: 'ఇన్‌వాయిస్‌లు & చెల్లింపులు',
            paymentDesc: 'GST-అనుకూల ఎస్క్రో మరియు వాలెట్ సెటిల్‌మెంట్ సిస్టమ్స్.',
            paymentFull: 'AgriWise రెండు పార్టీలకు పూర్తి ఆర్థిక భద్రతను అందించడానికి సురక్షితమైన మల్టీ-సిగ్నేచర్ ఎస్క్రో యంత్రాంగాన్ని ఉపయోగిస్తుంది. మీరు డీల్‌ని ఫైనలైజ్ చేసినప్పుడు, మీ ఫండ్స్ సురక్షితంగా ఉంటాయి.',
            qualityTitle: 'నాణ్యతా ప్రమాణాలు',
            qualityDesc: 'వివరణాత్మక గ్రేడింగ్ చార్ట్‌లు మరియు ల్యాబ్ సర్టిఫికేషన్ ప్రోటోకాల్స్.',
            qualityFull: 'నాణ్యత హామీ మా మార్కెట్‌ప్లేస్‌కు పునాది. AgriWise లో జాబితా చేయబడిన ప్రతి వ్యవసాయ లాట్ మా "AgriWise Standard v2.0" ఫ్రేమ్‌వర్క్ ప్రకారం గ్రేడ్ చేయబడింది.',
            enterpriseSupport: 'Enterprise Support 2.0',
            heroTitlePrefix: 'మీ',
            heroTitleHighlight: 'సేకరణను',
            heroDesc: 'మా అధునాతన కొనుగోలుదారు సహాయ పోర్టల్ ద్వారా బిడ్డింగ్, లాజిస్టిక్స్ మరియు నాణ్యత హామీని క్రమబద్ధీకరించండి.',
            opsLine: 'డైరెక్ట్ ఆప్స్ లైన్',
            logisticsHelp: '24/7 లాజిస్టిక్స్ హెల్ప్',
            queryStatus: 'ప్రశ్న స్థితి',
            openHub: 'ఓపెన్ ప్రొక్యూర్‌మెంట్ హబ్ →',
            logisticsDash: 'లాజిస్టిక్స్ డాష్‌బోర్డ్ →',
            gradingProto: 'గ్రేడింగ్ ప్రోటోకాల్స్ →',
            escrowSet: 'ఎస్క్రో సెట్టింగ్‌లు →',
            disputeDesc: 'నాణ్యత, బరువు అసమతుల్యత లేదా డెలివరీ ఆలస్యంతో సమస్యలను ఫ్లాగ్ చేయండి. 48 గంటల్లో సరైన పరిష్కారాన్ని నిర్ధారించడానికి మా డెడికేటెడ్ ఆడిటింగ్ బృందం మధ్యవర్తిత్వం వహిస్తుంది.',
            raiseDispute: 'ఇప్పుడే వివాదాన్ని లేవనెత్తండి',
            cancelDispute: 'వివాదాన్ని రద్దు చేయండి',
            farmerNameLabel: 'రైతు పేరు / ID',
            farmerNamePlaceholder: 'విక్రేత వివరాలు',
            orderIdLabel: 'ఆర్డర్/లాట్ ID',
            orderIdPlaceholder: 'లావాదేవీ ID',
            issueTypeLabel: 'సమస్య రకం',
            selectCategory: 'వర్గాన్ని ఎంచుకోండి...',
            issueQuality: 'నాణ్యత అసమతుల్యత',
            issueWeight: 'బరువు/పరిమాణం కొరత',
            issueDelivery: 'ఆలస్యమైన డెలివరీ',
            issueInvoice: 'ఇన్‌వాయిస్/GST లోపం',
            messageLabel: 'వివరణాత్మక సందేశం',
            messagePlaceholder: 'మా ధృవీకరణ బృందం కోసం సమస్యను క్లుప్తంగా వివరించండి...',
            submitInvest: 'దర్యాప్తు కోసం సమర్పించండి',
            registering: 'నమోదు అవుతోంది...',
            disputeRaised: 'వివాదం లేవనెత్తబడింది! ✅',
            backDashboard: 'డాష్‌బోర్డ్‌కు తిరిగి వెళ్లండి',
            auctionRules: 'ఈ-వేలం నిబంధనలు',
            tenderTracker: 'టెండర్ ట్రాకర్',
            liveTracking: 'లైవ్ ట్రాకింగ్ ఫీచర్',
            trackingDesc: 'మీ ప్రస్తుత షిప్‌మెంట్‌ల కోసం రియల్-టైమ్ GPS స్థితి మరియు ఉష్ణోగ్రత లాగ్‌లను చూడటానికి "మార్కెట్‌ప్లేస్ > ఆర్డర్‌లు" ట్యాబ్‌ను ఉపయోగించండి.',
            gradeAplus: 'గ్రేడ్ A+',
            gradeA: 'గ్రేడ్ A',
            gradeB: 'గ్రేడ్ B',
            exportGrade: 'ఎగుమతి గ్రేడ్',
            domesticStd: 'దేశీయ స్టాండర్డ్',
            industrial: 'పారిశ్రామిక',
            downloadGst: 'GST హెల్పర్ డౌన్‌లోడ్ చేయండి',
            walletSettings: 'వాలెట్ సెట్టింగ్‌లు',
            footerText: 'AgriWise Enterprise — సరఫరా గొలుసును సురక్షితం చేయడం'
        },
        ta: {
            title: 'வாங்குபவர் ஆதரவு & உதவி',
            subtitle: 'உங்கள் கொள்முதல் பயணத்தை நெறிப்படுத்துதல். நாங்கள் எவ்வாறு உதவ முடியும்?',
            voiceCall: 'அழைப்பு ஆதரவு',
            whatsapp: 'செயல்பாடுகள் அரட்டை',
            smsIvr: 'SMS நிலை',
            faqs: 'வாங்குபவர் வளங்கள்',
            dispute: 'பரிவர்த்தனை சிக்கலைப் புகாரளிக்கவும்',
            back: 'சந்தைக்குத் திரும்பு',
            myReports: 'என் அறிக்கைகள்',
            selectLang: 'மொழியினைத் தேர்ந்தெடுக்கவும்',
            procurementTitle: 'சிக்கலைப் புகாரளிக்கவும்',
            procurementDesc: 'தரம், எடை, டெலிவரி, இன்வாய்ஸ் சிக்கல்களை விரைவாகக் கொடியிடவும்.',
            logisticsTitle: 'முந்தைய டிக்கெட்டுகளைக் கண்காணிக்கவும்',
            logisticsDesc: 'உங்கள் சர்ச்சைகளின் நிகழ்நேர நிலையைச் சரிபார்க்கவும்.',
            qualityTitle: 'AgriWise பயன்பாட்டு வழிகாட்டி',
            qualityDesc: 'படிப்படியான வழிமுறைகள்: ஆராய்தல், ஆர்டர், பணம் செலுத்துதல், கண்காணிப்பு.',
            paymentTitle: 'தரம் & திரும்பப்பெறும் கொள்கை',
            paymentDesc: 'ஷிப்மென்ட்டை நிராகரிப்பதற்கான அதிகாரப்பூர்வ விதிகள்.',
            enterpriseSupport: 'வாங்குபவர் ஆதரவு மையம்',
            heroTitlePrefix: 'உங்கள் முழுமையான',
            heroTitleHighlight: 'ஆதரவு மையம்',
            heroDesc: 'சிக்கல்களைப் புகாரளிக்கவும், டிக்கெட்டுகளைக் கண்காணிக்கவும், வாங்கும் முறையை அறியவும் — ஒரே இடத்தில்.',
            opsLine: 'செயல்பாடுகள் அரட்டை',
            logisticsHelp: '24/7 லாஜிஸ்டிக்ஸ் உதவி',
            queryStatus: 'வினவல் நிலை',
            openHub: 'சர்ச்சை படிவத்தைத் திறக்க →',
            logisticsDash: 'என் அறிக்கைகளைப் பார்க்க →',
            gradingProto: 'முழு வழிகாட்டியைப் படிக்க →',
            escrowSet: 'தரக் கொள்கையைப் பார்க்க →',
            disputeDesc: 'தரம், எடை, டெலிவரி சிக்கல்களைக் கொடியிடவும். 48 மணிநேரத்திற்குள் நியாயமான தீர்வு உறுதி செய்யப்படும்.',
            raiseDispute: 'இப்போது சர்ச்சையை எழுப்புக',
            cancelDispute: 'சர்ச்சையை ரத்துசெய்க',
            farmerNameLabel: 'விவசாயி பெயர் / ID',
            farmerNamePlaceholder: 'விற்பனையாளர் விவரங்கள்',
            orderIdLabel: 'ஆர்டர்/லாட் ID',
            orderIdPlaceholder: 'பரிவர்த்தனை ID',
            issueTypeLabel: 'சிக்கலின் வகை',
            selectCategory: 'வகையைத் தேர்ந்தெடுக்கவும்...',
            issueQuality: 'தர வேறுபாடு',
            issueWeight: 'எடை/அளவு குறைபாடு',
            issueDelivery: 'தாமதமான டெலிவரி',
            issueInvoice: 'இன்வாய்ஸ்/GST பிழை',
            messageLabel: 'விரிவான செய்தி',
            messagePlaceholder: 'எங்கள் சரிபார்ப்பு குழுவிற்கான சிக்கலை சுருக்கமாக விவரிக்கவும்...',
            submitInvest: 'விசாரணைக்கு சமர்ப்பிக்கவும்',
            registering: 'பதிவு செய்யப்படுகிறது...',
            disputeRaised: 'சர்ச்சை எழுப்பப்பட்டது! ✅',
            backDashboard: 'டாஷ்போர்டுக்குத் திரும்பு',
            auctionRules: 'இ-ஏல விதிகள்',
            tenderTracker: 'டெண்டர் டிராக்கர்',
            liveTracking: 'நேரடி கண்காணிப்பு வசதி',
            trackingDesc: 'தற்போதைய ஷிப்மென்ட்களின் GPS நிலையைப் பார்க்க "Marketplace > Orders" தாவலைப் பயன்படுத்தவும்.',
            gradeAplus: 'தரம் A+',
            gradeA: 'தரம் A',
            gradeB: 'தரம் B',
            exportGrade: 'ஏற்றுமதி தரம்',
            domesticStd: 'உள்நாட்டு Std',
            industrial: 'தொழில்துறை',
            downloadGst: 'GST உதவியாளரைப் பதிவிறக்கவும்',
            walletSettings: 'வாலெட் அமைப்புகள்',
            footerText: 'AgriWise Enterprise — விநியோகச் சங்கிலியைப் பாதுகாத்தல்'
        },
        ml: {
            title: 'വാങ്ങുന്നവർ പിന്തുണ & സഹായം',
            subtitle: 'നിങ്ങളുടെ സംഭരണ യാത്ര ക്രമീകരിക്കൽ. ഞങ്ങൾ എങ്ങനെ സഹായിക്കാം?',
            voiceCall: 'കോൾ സപ്പോർട്ട്',
            whatsapp: 'ഓപ്പറേഷൻസ് ചാറ്റ്',
            smsIvr: 'SMS സ്റ്റാറ്റസ്',
            faqs: 'വാങ്ങുന്നവർ റിസോഴ്സുകൾ',
            dispute: 'ഒരു ഇടപാട് പ്രശ്നം റിപ്പോർട്ട് ചെയ്യുക',
            back: 'മാർക്കറ്റ്പ്ലേസിലേക്ക് മടങ്ങുക',
            myReports: 'എന്റെ റിപ്പോർട്ടുകൾ',
            selectLang: 'ഭാഷ തിരഞ്ഞെടുക്കുക',
            procurementTitle: 'ഒരു പ്രശ്നം റിപ്പോർട്ട് ചെയ്യുക',
            procurementDesc: 'ഗുണനിലവാരം, ഭാരം, ഡെലിവറി, ഇൻവോയ്സ് പ്രശ്നങ്ങൾ വേഗത്തിൽ ഫ്ലാഗ് ചെയ്യുക.',
            logisticsTitle: 'മുൻ ടിക്കറ്റുകൾ ട്രാക്ക് ചെയ്യുക',
            logisticsDesc: 'ഉയർത്തിയ തർക്കങ്ങളുടെയും അന്വേഷണങ്ങളുടെയും തത്സമയ നിലവാരം പരിശോധിക്കുക.',
            qualityTitle: 'AgriWise ഉപയോഗ ഗൈഡ്',
            qualityDesc: 'ഘട്ടം ഘട്ടമായുള്ള നിർദ്ദേശങ്ങൾ: ന്വേഷണം, ഓർഡർ, പേ, ട്രാക്ക്.',
            paymentTitle: 'ഗുണനിലവാരം & തിരിച്ചടവ് നയം',
            paymentDesc: 'ഒരു ഷിപ്പ്മെന്റ് തിരിച്ചടക്കാനുള്ള ഔദ്യോഗിക നിയമങ്ങൾ.',
            enterpriseSupport: 'വാങ്ങുന്നവർ പിന്തുണ കേന്ദ്രം',
            heroTitlePrefix: 'നിങ്ങളുടെ പൂർണ്ണ',
            heroTitleHighlight: 'പിന്തുണ ഹബ്',
            heroDesc: 'പ്രശ്നങ്ങൾ റിപ്പോർട്ട് ചെയ്യുക, ടിക്കറ്റുകൾ ട്രാക്ക് ചെയ്യുക, വാങ്ങൽ രീതി അറിയുക — ഒരിടത്ത്.',
            opsLine: 'ഓപ്പറേഷൻസ് ചാറ്റ്',
            logisticsHelp: '24/7 ലോജിസ്റ്റിക്സ് സഹായം',
            queryStatus: 'ക്വറി സ്റ്റാറ്റസ്',
            openHub: 'ഡിസ്പ്യൂട്ട് ഫോം തുറക്കുക →',
            logisticsDash: 'എന്റെ റിപ്പോർട്ടുകൾ കാണുക →',
            gradingProto: 'പൂർണ്ണ ഗൈഡ് വായിക്കുക →',
            escrowSet: 'ഗുണനിലവാര നയം കാണുക →',
            disputeDesc: 'ഗുണനിലവാരം, ഭാരം, ഡെലിവറി പ്രശ്നങ്ങൾ ഫ്ലാഗ് ചെയ്യുക. 48 മണിക്കൂറിൽ ന്യായമായ പരിഹാരം ഉറപ്പാക്കും.',
            raiseDispute: 'ഇപ്പോൾ തർക്കം ഉന്നയിക്കുക',
            cancelDispute: 'തർക്കം റദ്ദാക്കുക',
            farmerNameLabel: 'കർഷകന്റെ പേര് / ID',
            farmerNamePlaceholder: 'വിൽക്കുന്നയാളുടെ വിശദാംശങ്ങൾ',
            orderIdLabel: 'ഓർഡർ/ലോട്ട് ID',
            orderIdPlaceholder: 'ഇടപാട് ID',
            issueTypeLabel: 'പ്രശ്നത്തിന്റെ തരം',
            selectCategory: 'വർഗ്ഗം തിരഞ്ഞെടുക്കുക...',
            issueQuality: 'ഗുണനിലവാര അടുക്ക്',
            issueWeight: 'ഭാരം/അളവ് കുറവ്',
            issueDelivery: 'വൈകിയ ഡെലിവറി',
            issueInvoice: 'ഇൻവോയ്സ്/GST പിശക്',
            messageLabel: 'വിശദമായ സന്ദേശം',
            messagePlaceholder: 'ഞങ്ങളുടെ പരിശോധന ടീമിനായി പ്രശ്നം ചുരുക്കി വിവരിക്കുക...',
            submitInvest: 'അന്വേഷണത്തിനായി സമർപ്പിക്കുക',
            registering: 'രജിസ്റ്റർ ചെയ്യുന്നു...',
            disputeRaised: 'തർക്കം ഉന്നയിച്ചു! ✅',
            backDashboard: 'ഡാഷ്ബോർഡിലേക്ക് മടങ്ങുക',
            auctionRules: 'ഇ-ലേലം നിയമങ്ങൾ',
            tenderTracker: 'ടെൻഡർ ട്രാക്കർ',
            liveTracking: 'ലൈവ് ട്രാക്കിംഗ് ഫീച്ചർ',
            trackingDesc: 'നിലവിലെ ഷിപ്പ്മെന്റുകളുടെ GPS സ്റ്റാറ്റസ് കാണാൻ "Marketplace > Orders" ടാബ് ഉപയോഗിക്കുക.',
            gradeAplus: 'ഗ്രേഡ് A+',
            gradeA: 'ഗ്രേഡ് A',
            gradeB: 'ഗ്രേഡ് B',
            exportGrade: 'കയറ്റുമതി ഗ്രേഡ്',
            domesticStd: 'ആഭ്യന്തര Std',
            industrial: 'വ്യാവസായിക',
            downloadGst: 'GST ഹെൽപ്പർ ഡൗൺലോഡ് ചെയ്യുക',
            walletSettings: 'വാലറ്റ് ക്രമീകരണങ്ങൾ',
            footerText: 'AgriWise Enterprise — വിതരണ ശൃംഖല സുരക്ഷിതമാക്കൽ'
        },
        kn: {
            title: 'ಖರೀದಿದಾರ ಬೆಂಬಲ & ಸಹಾಯ',
            subtitle: 'ನಿಮ್ಮ ಸಂಗ್ರಹಣ ಪ್ರಯಾಣವನ್ನು ಸುಗಮಗೊಳಿಸಲಾಗುತ್ತಿದೆ. ನಾವು ಹೇಗೆ ಸಹಾಯ ಮಾಡಬಹುದು?',
            voiceCall: 'ಕಾಲ್ ಸಪೋರ್ಟ್',
            whatsapp: 'ಆಪರೇಷನ್ಸ್ ಚಾಟ್',
            smsIvr: 'SMS ಸ್ಥಿತಿ',
            faqs: 'ಖರೀದಿದಾರ ಸಂಪನ್ಮೂಲಗಳು',
            dispute: 'ವಹಿವಾಟು ಸಮಸ್ಯೆಯನ್ನು ವರದಿ ಮಾಡಿ',
            back: 'ಮಾರ್ಕೆಟ್‌ಪ್ಲೇಸ್‌ಗೆ ಹಿಂತಿರುಗಿ',
            myReports: 'ನನ್ನ ವರದಿಗಳು',
            selectLang: 'ಭಾಷೆ ಆಯ್ಕೆಮಾಡಿ',
            procurementTitle: 'ಸಮಸ್ಯೆ ವರದಿ ಮಾಡಿ',
            procurementDesc: 'ಗುಣಮಟ್ಟ, ತೂಕ, ಡೆಲಿವರಿ, ಇನ್‌ವಾಯ್ಸ್ ಸಮಸ್ಯೆಗಳನ್ನು ತ್ವರಿತವಾಗಿ ಫ್ಲ್ಯಾಗ್ ಮಾಡಿ.',
            logisticsTitle: 'ಹಿಂದಿನ ಟಿಕೆಟ್‌ಗಳನ್ನು ಟ್ರ್ಯಾಕ್ ಮಾಡಿ',
            logisticsDesc: 'ನಿಮ್ಮ ವಿವಾದಗಳ ನೈಜ-ಸಮಯದ ಸ್ಥಿತಿ ಪರಿಶೀಲಿಸಿ.',
            qualityTitle: 'AgriWise ಬಳಕೆ ಮಾರ್ಗದರ್ಶಿ',
            qualityDesc: 'ಹಂತ-ಹಂತದ ಸೂಚನೆಗಳು: ಅನ್ವೇಷಣೆ, ಆದೇಶ, ಪಾವತಿ, ಟ್ರ್ಯಾಕ್.',
            paymentTitle: 'ಗುಣಮಟ್ಟ & ಮರುಪಾವತಿ ನೀತಿ',
            paymentDesc: 'ಶಿಪ್‌ಮೆಂಟ್ ತಿರಸ್ಕರಿಸಲು ಅಧಿಕೃತ ನಿಯಮಗಳು.',
            enterpriseSupport: 'ಖರೀದಿದಾರ ಬೆಂಬಲ ಕೇಂದ್ರ',
            heroTitlePrefix: 'ನಿಮ್ಮ ಸಂಪೂರ್ಣ',
            heroTitleHighlight: 'ಬೆಂಬಲ ಹಬ್',
            heroDesc: 'ಸಮಸ್ಯೆಗಳನ್ನು ವರದಿ ಮಾಡಿ, ಟಿಕೆಟ್‌ಗಳನ್ನು ಟ್ರ್ಯಾಕ್ ಮಾಡಿ, ಖರೀದಿ ವಿಧಾನ ತಿಳಿಯಿರಿ — ಒಂದೆಡೆ.',
            opsLine: 'ಆಪರೇಷನ್ಸ್ ಚಾಟ್',
            logisticsHelp: '24/7 ಲಾಜಿಸ್ಟಿಕ್ಸ್ ಸಹಾಯ',
            queryStatus: 'ಪ್ರಶ್ನೆ ಸ್ಥಿತಿ',
            openHub: 'ವಿವಾದ ಫಾರ್ಮ್ ತೆರೆಯಿರಿ →',
            logisticsDash: 'ನನ್ನ ವರದಿಗಳನ್ನು ಕಾಣಿ →',
            gradingProto: 'ಪೂರ್ಣ ಮಾರ್ಗದರ್ಶಿ ಓದಿ →',
            escrowSet: 'ಗುಣಮಟ್ಟ ನೀತಿ ಕಾಣಿ →',
            disputeDesc: 'ಗುಣಮಟ್ಟ, ತೂಕ, ಡೆಲಿವರಿ ಸಮಸ್ಯೆಗಳನ್ನು ಫ್ಲ್ಯಾಗ್ ಮಾಡಿ. 48 ಗಂಟೆಗಳಲ್ಲಿ ನ್ಯಾಯಯುತ ಪರಿಹಾರ ಖಾತ್ರಿಪಡಿಸಲಾಗುತ್ತದೆ.',
            raiseDispute: 'ಈಗ ವಿವಾದ ಎಬ್ಬಿಸಿ',
            cancelDispute: 'ವಿವಾದ ರದ್ದುಮಾಡಿ',
            farmerNameLabel: 'ರೈತರ ಹೆಸರು / ID',
            farmerNamePlaceholder: 'ಮಾರಾಟಗಾರರ ವಿವರಗಳು',
            orderIdLabel: 'ಆದೇಶ/ಲಾಟ್ ID',
            orderIdPlaceholder: 'ವಹಿವಾಟು ID',
            issueTypeLabel: 'ಸಮಸ್ಯೆಯ ಪ್ರಕಾರ',
            selectCategory: 'ವರ್ಗ ಆಯ್ಕೆಮಾಡಿ...',
            issueQuality: 'ಗುಣಮಟ್ಟ ವ್ಯತ್ಯಾಸ',
            issueWeight: 'ತೂಕ/ಪ್ರಮಾಣ ಕೊರತೆ',
            issueDelivery: 'ತಡ ಡೆಲಿವರಿ',
            issueInvoice: 'ಇನ್‌ವಾಯ್ಸ್/GST ದೋಷ',
            messageLabel: 'ವಿವರವಾದ ಸಂದೇಶ',
            messagePlaceholder: 'ನಮ್ಮ ಪರಿಶೀಲನಾ ತಂಡಕ್ಕಾಗಿ ಸಮಸ್ಯೆಯನ್ನು ಸಂಕ್ಷಿಪ್ತವಾಗಿ ವಿವರಿಸಿ...',
            submitInvest: 'ತನಿಖೆಗಾಗಿ ಸಲ್ಲಿಸಿ',
            registering: 'ನೋಂದಾಯಿಸಲಾಗುತ್ತಿದೆ...',
            disputeRaised: 'ವಿವಾದ ಎಬ್ಬಿಸಲಾಗಿದೆ! ✅',
            backDashboard: 'ಡ್ಯಾಶ್‌ಬೋರ್ಡ್‌ಗೆ ಹಿಂತಿರುಗಿ',
            auctionRules: 'ಇ-ಹರಾಜು ನಿಯಮಗಳು',
            tenderTracker: 'ಟೆಂಡರ್ ಟ್ರ್ಯಾಕರ್',
            liveTracking: 'ಲೈವ್ ಟ್ರ್ಯಾಕಿಂಗ್ ವೈಶಿಷ್ಟ್ಯ',
            trackingDesc: 'ಪ್ರಸ್ತುತ ಶಿಪ್‌ಮೆಂಟ್‌ಗಳ GPS ಸ್ಥಿತಿ ಕಾಣಲು "Marketplace > Orders" ಟ್ಯಾಬ್ ಬಳಸಿ.',
            gradeAplus: 'ಗ್ರೇಡ್ A+',
            gradeA: 'ಗ್ರೇಡ್ A',
            gradeB: 'ಗ್ರೇಡ್ B',
            exportGrade: 'ರಫ್ತು ಗ್ರೇಡ್',
            domesticStd: 'ದೇಶೀಯ Std',
            industrial: 'ಕೈಗಾರಿಕಾ',
            downloadGst: 'GST ಸಹಾಯಕ ಡೌನ್‌ಲೋಡ್ ಮಾಡಿ',
            walletSettings: 'ವಾಲೆಟ್ ಸೆಟ್ಟಿಂಗ್‌ಗಳು',
            footerText: 'AgriWise Enterprise — ಪೂರೈಕೆ ಸರಪಳಿ ಸುರಕ್ಷಿತಗೊಳಿಸುವುದು'
        },
        pa: {
            title: 'ਖਰੀਦਦਾਰ ਸਹਾਇਤਾ ਅਤੇ ਮਦਦ',
            subtitle: 'ਤੁਹਾਡੀ ਖਰੀਦ ਯਾਤਰਾ ਨੂੰ ਸੁਚਾਰੂ ਬਣਾਉਣਾ। ਅਸੀਂ ਕਿਵੇਂ ਮਦਦ ਕਰ ਸਕਦੇ ਹਾਂ?',
            voiceCall: 'ਕਾਲ ਸਹਾਇਤਾ',
            whatsapp: 'ਆਪ੍ਰੇਸ਼ਨਜ਼ ਚੈਟ',
            smsIvr: 'SMS ਸਥਿਤੀ',
            faqs: 'ਖਰੀਦਦਾਰ ਸਰੋਤ',
            dispute: 'ਲੈਣ-ਦੇਣ ਦੀ ਸਮੱਸਿਆ ਦੀ ਰਿਪੋਰਟ ਕਰੋ',
            back: 'ਮਾਰਕੀਟਪਲੇਸ ਤੇ ਵਾਪਸ',
            myReports: 'ਮੇਰੀਆਂ ਰਿਪੋਰਟਾਂ',
            selectLang: 'ਭਾਸ਼ਾ ਚੁਣੋ',
            procurementTitle: 'ਸਮੱਸਿਆ ਦੀ ਰਿਪੋਰਟ ਕਰੋ',
            procurementDesc: 'ਗੁਣਵੱਤਾ, ਭਾਰ, ਡਿਲਿਵਰੀ, ਇਨਵੌਇਸ ਸਮੱਸਿਆਵਾਂ ਤੁਰੰਤ ਫਲੈਗ ਕਰੋ।',
            logisticsTitle: 'ਪਿਛਲੀਆਂ ਟਿਕਟਾਂ ਟ੍ਰੈਕ ਕਰੋ',
            logisticsDesc: 'ਆਪਣੇ ਵਿਵਾਦਾਂ ਦੀ ਅਸਲ-ਸਮੇਂ ਦੀ ਸਥਿਤੀ ਜਾਂਚੋ।',
            qualityTitle: 'AgriWise ਵਰਤੋਂ ਗਾਈਡ',
            qualityDesc: 'ਕਦਮ-ਦਰ-ਕਦਮ ਨਿਰਦੇਸ਼: ਖੋਜ, ਆਰਡਰ, ਭੁਗਤਾਨ, ਟ੍ਰੈਕ।',
            paymentTitle: 'ਗੁਣਵੱਤਾ & ਵਾਪਸੀ ਨੀਤੀ',
            paymentDesc: 'ਸ਼ਿਪਮੈਂਟ ਰੱਦ ਕਰਨ ਲਈ ਅਧਿਕਾਰਤ ਨਿਯਮ।',
            enterpriseSupport: 'ਖਰੀਦਦਾਰ ਸਹਾਇਤਾ ਕੇਂਦਰ',
            heroTitlePrefix: 'ਤੁਹਾਡਾ ਪੂਰਾ',
            heroTitleHighlight: 'ਸਹਾਇਤਾ ਹੱਬ',
            heroDesc: 'ਸਮੱਸਿਆਵਾਂ ਰਿਪੋਰਟ ਕਰੋ, ਟਿਕਟਾਂ ਟ੍ਰੈਕ ਕਰੋ, ਖਰੀਦਣ ਦਾ ਤਰੀਕਾ ਜਾਣੋ — ਇੱਕੀ ਥਾਂ।',
            opsLine: 'ਆਪ੍ਰੇਸ਼ਨਜ਼ ਚੈਟ',
            logisticsHelp: '24/7 ਲੌਜਿਸਟਿਕਸ ਮਦਦ',
            queryStatus: 'ਪੁੱਛਗਿੱਛ ਸਥਿਤੀ',
            openHub: 'ਵਿਵਾਦ ਫਾਰਮ ਖੋਲ੍ਹੋ →',
            logisticsDash: 'ਮੇਰੀਆਂ ਰਿਪੋਰਟਾਂ ਵੇਖੋ →',
            gradingProto: 'ਪੂਰੀ ਗਾਈਡ ਪੜ੍ਹੋ →',
            escrowSet: 'ਗੁਣਵੱਤਾ ਨੀਤੀ ਵੇਖੋ →',
            disputeDesc: 'ਗੁਣਵੱਤਾ, ਭਾਰ, ਡਿਲਿਵਰੀ ਸਮੱਸਿਆਵਾਂ ਫਲੈਗ ਕਰੋ। 48 ਘੰਟਿਆਂ ਵਿੱਚ ਨਿਆਂਪੂਰਨ ਹੱਲ ਯਕੀਨੀ ਕੀਤਾ ਜਾਵੇਗਾ।',
            raiseDispute: 'ਹੁਣੇ ਵਿਵਾਦ ਉਠਾਓ',
            cancelDispute: 'ਵਿਵਾਦ ਰੱਦ ਕਰੋ',
            farmerNameLabel: 'ਕਿਸਾਨ ਦਾ ਨਾਮ / ID',
            farmerNamePlaceholder: 'ਵਿਕ੍ਰੇਤਾ ਵੇਰਵੇ',
            orderIdLabel: 'ਆਰਡਰ/ਲਾਟ ID',
            orderIdPlaceholder: 'ਲੈਣ-ਦੇਣ ID',
            issueTypeLabel: 'ਸਮੱਸਿਆ ਦੀ ਕਿਸਮ',
            selectCategory: 'ਸ਼੍ਰੇਣੀ ਚੁਣੋ...',
            issueQuality: 'ਗੁਣਵੱਤਾ ਅਸੰਗਤੀ',
            issueWeight: 'ਭਾਰ/ਮਾਤਰਾ ਦੀ ਕਮੀ',
            issueDelivery: 'ਦੇਰ ਨਾਲ ਡਿਲਿਵਰੀ',
            issueInvoice: 'ਇਨਵੌਇਸ/GST ਗਲਤੀ',
            messageLabel: 'ਵਿਸਤ੍ਰਿਤ ਸੁਨੇਹਾ',
            messagePlaceholder: 'ਸਾਡੀ ਤਸਦੀਕ ਟੀਮ ਲਈ ਸਮੱਸਿਆ ਸੰਖੇਪ ਵਿੱਚ ਦੱਸੋ...',
            submitInvest: 'ਜਾਂਚ ਲਈ ਜਮ੍ਹਾਂ ਕਰੋ',
            registering: 'ਰਜਿਸਟਰ ਹੋ ਰਿਹਾ ਹੈ...',
            disputeRaised: 'ਵਿਵਾਦ ਉਠਾਇਆ ਗਿਆ! ✅',
            backDashboard: 'ਡੈਸ਼ਬੋਰਡ ਤੇ ਵਾਪਸ',
            auctionRules: 'ਈ-ਨਿਲਾਮੀ ਨਿਯਮ',
            tenderTracker: 'ਟੈਂਡਰ ਟ੍ਰੈਕਰ',
            liveTracking: 'ਲਾਈਵ ਟ੍ਰੈਕਿੰਗ ਵਿਸ਼ੇਸ਼ਤਾ',
            trackingDesc: 'ਮੌਜੂਦਾ ਸ਼ਿਪਮੈਂਟ GPS ਸਥਿਤੀ ਦੇਖਣ ਲਈ "Marketplace > Orders" ਟੈਬ ਵਰਤੋ।',
            gradeAplus: 'ਗ੍ਰੇਡ A+',
            gradeA: 'ਗ੍ਰੇਡ A',
            gradeB: 'ਗ੍ਰੇਡ B',
            exportGrade: 'ਨਿਰਯਾਤ ਗ੍ਰੇਡ',
            domesticStd: 'ਘਰੇਲੂ Std',
            industrial: 'ਉਦਯੋਗਿਕ',
            downloadGst: 'GST ਸਹਾਇਕ ਡਾਊਨਲੋਡ ਕਰੋ',
            walletSettings: 'ਵਾਲਿਟ ਸੈਟਿੰਗਾਂ',
            footerText: 'AgriWise Enterprise — ਸਪਲਾਈ ਚੇਨ ਸੁਰੱਖਿਅਤ ਕਰਨਾ'
        },
        mr: {
            title: 'खरेदीदार समर्थन आणि मदत',
            subtitle: 'तुमच्या खरेदी प्रवासाला सुव्यवस्थित करणे. आम्ही कशी मदत करू शकतो?',
            voiceCall: 'कॉल समर्थन',
            whatsapp: 'ऑपरेशन्स चॅट',
            smsIvr: 'SMS स्थिती',
            faqs: 'खरेदीदार संसाधने',
            dispute: 'व्यवहार समस्येची नोंद करा',
            back: 'मार्केटप्लेसवर परत जा',
            myReports: 'माझे अहवाल',
            selectLang: 'भाषा निवडा',
            procurementTitle: 'समस्येची नोंद करा',
            procurementDesc: 'गुणवत्ता, वजन, वितरण, इनव्हॉइस समस्या त्वरित नोंदवा.',
            logisticsTitle: 'मागील तिकिटे ट्रॅक करा',
            logisticsDesc: 'तुमच्या वादांची वास्तविक-वेळ स्थिती तपासा.',
            qualityTitle: 'AgriWise वापर मार्गदर्शिका',
            qualityDesc: 'चरण-दर-चरण सूचना: अन्वेषण, ऑर्डर, पेमेंट, ट्रॅक.',
            paymentTitle: 'गुणवत्ता & परतावा धोरण',
            paymentDesc: 'शिपमेंट नाकारण्यासाठीचे अधिकृत नियम.',
            enterpriseSupport: 'खरेदीदार समर्थन केंद्र',
            heroTitlePrefix: 'तुमचे संपूर्ण',
            heroTitleHighlight: 'समर्थन हब',
            heroDesc: 'समस्या नोंदवा, तिकिटे ट्रॅक करा, खरेदीचे मार्ग जाणून घ्या — एकाच ठिकाणी.',
            opsLine: 'ऑपरेशन्स चॅट',
            logisticsHelp: '24/7 लॉजिस्टिक्स मदत',
            queryStatus: 'चौकशी स्थिती',
            openHub: 'वाद फॉर्म उघडा →',
            logisticsDash: 'माझे अहवाल पहा →',
            gradingProto: 'पूर्ण मार्गदर्शिका वाचा →',
            escrowSet: 'गुणवत्ता धोरण पहा →',
            disputeDesc: 'गुणवत्ता, वजन, वितरण समस्या नोंदवा. 48 तासांत न्याय्य निराकरण सुनिश्चित केले जाईल.',
            raiseDispute: 'आत्ता वाद उठवा',
            cancelDispute: 'वाद रद्द करा',
            farmerNameLabel: 'शेतकऱ्याचे नाव / ID',
            farmerNamePlaceholder: 'विक्रेत्याचे तपशील',
            orderIdLabel: 'ऑर्डर/लॉट ID',
            orderIdPlaceholder: 'व्यवहार ID',
            issueTypeLabel: 'समस्येचा प्रकार',
            selectCategory: 'श्रेणी निवडा...',
            issueQuality: 'गुणवत्ता तफावत',
            issueWeight: 'वजन/प्रमाण कमतरता',
            issueDelivery: 'उशीर वितरण',
            issueInvoice: 'इनव्हॉइस/GST त्रुटी',
            messageLabel: 'तपशीलवार संदेश',
            messagePlaceholder: 'आमच्या पडताळणी टीमसाठी समस्या थोडक्यात सांगा...',
            submitInvest: 'तपासणीसाठी सादर करा',
            registering: 'नोंदणी होत आहे...',
            disputeRaised: 'वाद उठवला! ✅',
            backDashboard: 'डॅशबोर्डवर परत जा',
            auctionRules: 'ई-लिलाव नियम',
            tenderTracker: 'टेंडर ट्रॅकर',
            liveTracking: 'लाइव्ह ट्रॅकिंग वैशिष्ट्य',
            trackingDesc: 'सध्याच्या शिपमेंटची GPS स्थिती पाहण्यासाठी "Marketplace > Orders" टॅब वापरा.',
            gradeAplus: 'ग्रेड A+',
            gradeA: 'ग्रेड A',
            gradeB: 'ग्रेड B',
            exportGrade: 'निर्यात ग्रेड',
            domesticStd: 'देशांतर्गत Std',
            industrial: 'औद्योगिक',
            downloadGst: 'GST सहाय्यक डाउनलोड करा',
            walletSettings: 'वॉलेट सेटिंग्ज',
            footerText: 'AgriWise Enterprise — पुरवठा साखळी सुरक्षित करणे'
        }
    };

    const tr = translations[lang] || translations['en'];

    const [myReports, setMyReports] = useState([]);
    const [showMyReports, setShowMyReports] = useState(false);
    const [formType, setFormType] = useState('query');
    const [submitting, setSubmitting] = useState(false);
    const [statusMessage, setStatusMessage] = useState(null);
    const [formData, setFormData] = useState({
        farmerName: '',
        orderId: '',
        issueType: 'quality',
        message: ''
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSubmitting(true);
        setStatusMessage(null);

        try {
            const res = await fetch(`${import.meta.env.VITE_API_URL || "http://localhost:5001"}/api/support/${formType === 'dispute' ? 'dispute' : 'query'}`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    ...formData,
                    email: user?.email,
                    type: formType,
                    subject: formType === 'dispute' ? `Dispute: ${formData.issueType}` : 'General Query',
                    details: formData.message
                })
            });
            const data = await res.json();
            if (data.success) {
                setStatusMessage({ type: 'success', text: formType === 'dispute' ? tr.disputeRaised : 'Message Sent! ✅' });
                setFormData({ farmerName: '', orderId: '', issueType: 'quality', message: '' });
            } else {
                setStatusMessage({ type: 'error', text: 'Failed to submit. Please try again.' });
            }
        } catch (err) {
            setStatusMessage({ type: 'error', text: 'Network error. check your connection.' });
        } finally {
            setSubmitting(false);
        }
    };

React.useEffect(() => {
    if (user?.email) {
        fetch(`${import.meta.env.VITE_API_URL || `${import.meta.env.VITE_API_URL || "http://localhost:5001"}`}/api/support/my-reports?email=${user.email}`)
            .then(res => res.json())
            .then(data => {
                if (data.success) setMyReports(data.data);
            })
            .catch(err => console.error("Failed to fetch reports:", err));
    }
}, [user?.email]);
const [activeView, setActiveView] = useState('main');

const MainView = () => (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-700 space-y-12">
        {/* Hero Section */}
        <div className="bg-white rounded-[3.5rem] p-10 md:p-14 shadow-2xl border-2 border-slate-50 relative overflow-hidden group">
            <div className="relative z-10">
                <span className="inline-block bg-blue-100 text-blue-700 px-6 py-2 rounded-full text-xs font-black uppercase tracking-widest mb-6">{tr.enterpriseSupport}</span>
                <h1 className="text-4xl md:text-7xl font-black text-slate-900 mb-6 tracking-tight leading-none">
                    {tr.heroTitlePrefix} <br /><span className="text-blue-600">{tr.heroTitleHighlight}</span>
                </h1>
                <p className="text-slate-500 text-lg md:text-xl font-bold max-w-xl leading-relaxed">
                    {tr.heroDesc}
                </p>
            </div>
            <div className="absolute right-[-50px] top-[-50px] w-96 h-96 bg-blue-50 rounded-full blur-3xl opacity-50 group-hover:bg-blue-100 transition-colors duration-700"></div>
        </div>

        {/* Multimodal Action Bar */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <a href="tel:+916301230747" className="flex flex-col items-center justify-center p-8 bg-gradient-to-br from-blue-600 to-blue-700 text-white rounded-[2.5rem] shadow-2xl shadow-blue-200 hover:scale-105 transition-all group text-center">
                <span className="text-5xl mb-3 group-hover:rotate-12 transition-transform duration-300">📞</span>
                <span className="font-black text-xl tracking-tight">{tr.voiceCall}</span>
                <span className="text-[10px] opacity-80 uppercase font-bold mt-2 tracking-widest">{tr.opsLine}</span>
            </a>
            <a href="https://wa.me/916301230747" target="_blank" rel="noreferrer" className="flex flex-col items-center justify-center p-8 bg-gradient-to-br from-emerald-500 to-teal-600 text-white rounded-[2.5rem] shadow-2xl shadow-emerald-200 hover:scale-105 transition-all group text-center">
                <span className="text-5xl mb-3 group-hover:rotate-12 transition-transform duration-300">💬</span>
                <span className="font-black text-xl tracking-tight">{tr.whatsapp}</span>
                <span className="text-[10px] opacity-80 uppercase font-bold mt-2 tracking-widest">{tr.logisticsHelp}</span>
            </a>
            <a href="sms:+916301230747" className="flex flex-col items-center justify-center p-8 bg-gradient-to-br from-slate-800 to-slate-900 text-white rounded-[2.5rem] shadow-2xl shadow-slate-300 hover:scale-105 transition-all group text-center">
                <span className="text-5xl mb-3 group-hover:rotate-12 transition-transform duration-300">📱</span>
                <span className="font-black text-xl tracking-tight">{tr.smsIvr}</span>
                <span className="text-[10px] opacity-80 uppercase font-bold mt-2 tracking-widest">{tr.queryStatus}</span>
            </a>
        </section>

        <hr className="border-slate-200" />

        {/* Interactive Feature Cards */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            <FeatureCard
                icon="📋"
                title={tr.procurementTitle}
                desc={tr.procurementDesc}
                color="blue"
                onClick={() => {
                    setActiveView('dispute');
                    setFormType('dispute');
                }}
                footer={tr.openHub}
                bgIcon="⚖️"
            />
            <FeatureCard
                icon="📊"
                title={tr.logisticsTitle}
                desc={tr.logisticsDesc}
                color="indigo"
                onClick={() => setShowMyReports(true)}
                footer={tr.logisticsDash}
                bgIcon="📈"
            />
            <FeatureCard
                icon="📖"
                title={tr.qualityTitle}
                desc={tr.qualityDesc}
                color="amber"
                onClick={() => setActiveView('guide')}
                footer={tr.gradingProto}
                bgIcon="✅"
            />
            <FeatureCard
                icon="⚖️"
                title={tr.paymentTitle}
                desc={tr.paymentDesc}
                color="emerald"
                onClick={() => setActiveView('policy')}
                footer={tr.escrowSet}
                bgIcon="💰"
            />
        </section>

        {/* Dispute Resolution Section */}
        {/* The Dispute form directly visible under the cards if activated */}

    </div>
);

const FeatureCard = ({ icon, title, desc, onClick, color, footer, bgIcon }) => {
    const colors = {
        blue: "from-blue-50 border-blue-100 hover:border-blue-300",
        indigo: "from-indigo-50 border-indigo-100 hover:border-indigo-300",
        amber: "from-amber-50 border-amber-100 hover:border-amber-300",
        emerald: "from-emerald-50 border-emerald-100 hover:border-emerald-300"
    };
    const btnColors = {
        blue: "bg-blue-600",
        indigo: "bg-indigo-600",
        amber: "bg-amber-600",
        emerald: "bg-emerald-600"
    };
    return (
        <div onClick={onClick} className={`bg-gradient-to-br ${colors[color]} to-white border-2 rounded-[3rem] p-10 cursor-pointer hover:shadow-2xl transition-all group relative overflow-hidden`}>
            <div className="relative z-10">
                <span className="text-6xl block mb-6 group-hover:scale-110 transition-transform">{icon}</span>
                <h3 className="text-2xl font-black text-slate-800 mb-2">{title}</h3>
                <p className="text-slate-500 font-bold mb-6 leading-relaxed">{desc}</p>
                <span className={`inline-block ${btnColors[color]} text-white font-black px-6 py-3 rounded-xl text-sm transition-transform active:scale-95`}>{footer}</span>
            </div>
            <div className="absolute -right-10 -bottom-10 text-[12rem] opacity-5 group-hover:opacity-10 transition-opacity pointer-events-none">{bgIcon}</div>
        </div>
    );
};

const SubPageHeader = () => (
    <button onClick={() => setActiveView('main')} className="text-blue-600 font-black flex items-center gap-2 mb-8 bg-blue-50 px-6 py-3 rounded-2xl hover:bg-blue-100 transition-all w-fit group">
        <span className="group-hover:-translate-x-1 transition-transform">â†</span> {tr.backDashboard}
    </button>
);

const SubPageView = ({ title, fullText, icon, colorClass, children, bgIcon }) => (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-700 space-y-8">
        <SubPageHeader />
        <div className={`bg-white rounded-[3.5rem] p-10 md:p-14 shadow-2xl border-2 ${colorClass} relative overflow-hidden`}>
            <div className="max-w-2xl relative z-10 space-y-8">
                <h2 className="text-4xl md:text-7xl font-black text-slate-900 tracking-tight leading-none">{title} {icon}</h2>
                <p className="text-slate-600 font-bold text-lg md:text-xl leading-relaxed">{fullText}</p>
                {children}
            </div>
            <div className="absolute -right-20 -bottom-20 text-[20rem] opacity-5 rotate-12 pointer-events-none">{bgIcon}</div>
        </div>
    </div>
);

return (
    <div className="min-h-screen bg-slate-50 pb-20 font-sans">
        {/* Main Navigation Header */}
        <header className="bg-white/80 backdrop-blur-md border-b border-slate-200 sticky top-0 z-50">
            <div className="max-w-4xl mx-auto px-6 py-4 flex justify-between items-center">
                <button onClick={() => activeView === 'main' ? navigate('/marketplace') : setActiveView('main')} className="flex items-center gap-2 text-blue-700 font-black uppercase text-xs tracking-widest hover:text-blue-500 transition-colors">
                    <span>←</span> {activeView === 'main' ? tr.back : 'Dashboard'}
                </button>
                <select
                    value={lang}
                    onChange={(e) => setLang(e.target.value)}
                    className="bg-slate-100 border-none rounded-xl px-4 py-2 text-xs font-black uppercase tracking-widest text-blue-700 outline-none cursor-pointer hover:bg-white hover:ring-2 hover:ring-blue-100 transition-all shadow-sm"
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
        </header>

        <main className="max-w-4xl mx-auto p-6 mt-8">
            {activeView === 'main' && <MainView />}
            {/* NEW DISPUTE FORM VIEW */}
            {activeView === 'dispute' && (
                <div className="animate-in fade-in slide-in-from-bottom-4 duration-700 space-y-8">
                    <SubPageHeader />
                    <div className="bg-white border-2 border-slate-100 rounded-[2.5rem] p-8 md:p-14 shadow-2xl space-y-6">
                        <h2 className="text-4xl font-black text-slate-900 mb-8 tracking-tight">⚠️–️ {tr.dispute}</h2>
                        <p className="text-slate-600 font-medium mb-8 text-lg">{tr.disputeDesc}</p>
                        {/* Custom Tabs */}
                        <div className="flex p-1 bg-slate-100 rounded-2xl mb-6">
                            <button
                                onClick={() => setFormType('general')}
                                className={`flex-1 py-3 px-6 rounded-xl font-bold text-sm transition-all ${formType === 'general' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500 hover:text-slate-700 hover:bg-slate-200/50'
                                    }`}
                            >
                                General Query
                            </button>
                            <button
                                onClick={() => setFormType('dispute')}
                                className={`flex-1 py-3 px-6 rounded-xl font-bold text-sm transition-all ${formType === 'dispute' ? 'bg-rose-50 text-rose-700 shadow-sm border border-rose-100' : 'text-slate-500 hover:text-slate-700 hover:bg-slate-200/50'
                                    }`}
                            >
                                🚨 {tr.issueTypeLabel || 'Urgent Dispute'}
                            </button>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-5">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                <div className="space-y-2">
                                    <label className="text-xs font-black uppercase tracking-widest text-slate-500 ml-2">{tr.farmerNameLabel || 'Your Name'}</label>
                                    <input
                                        type="text"
                                        name="farmerName"
                                        value={formData.farmerName}
                                        onChange={handleInputChange}
                                        className="w-full bg-slate-50 border-none rounded-xl px-5 py-4 focus:ring-4 focus:ring-blue-100 focus:bg-white transition-all outline-none font-medium"
                                        required
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-xs font-black uppercase tracking-widest text-slate-500 ml-2">{tr.orderIdLabel || 'Order ID (Optional)'}</label>
                                    <input
                                        type="text"
                                        name="orderId"
                                        value={formData.orderId}
                                        onChange={handleInputChange}
                                        className="w-full bg-slate-50 border-none rounded-xl px-5 py-4 focus:ring-4 focus:ring-blue-100 focus:bg-white transition-all outline-none font-medium text-slate-600"
                                        placeholder="#ORD-"
                                    />
                                </div>
                            </div>

                            {formType === 'dispute' && (
                                <div className="space-y-2">
                                    <label className="text-xs font-black uppercase tracking-widest text-slate-500 ml-2">{tr.issueTypeLabel || 'Issue Type'}</label>
                                    <select
                                        name="issueType"
                                        value={formData.issueType}
                                        onChange={handleInputChange}
                                        className="w-full bg-rose-50 border-none rounded-xl px-5 py-4 focus:ring-4 focus:ring-rose-100 transition-all outline-none font-bold text-rose-900 appearance-none cursor-pointer"
                                    >
                                        <option value="quality">{tr.issueQuality || 'Quality Standards Not Met'}</option>
                                        <option value="weight">{tr.issueWeight || 'Weight / Quantity Mismatch'}</option>
                                        <option value="payment">Payment Delay / Escrow Issue</option>
                                        <option value="logistics">{tr.issueDelivery || 'Logistics / Delivery Damage'}</option>
                                        <option value="other">Other Dispute</option>
                                    </select>
                                </div>
                            )}

                            <div className="space-y-2">
                                <label className="text-xs font-black uppercase tracking-widest text-slate-500 ml-2">{tr.messageLabel || 'Detailed Message'}</label>
                                <textarea
                                    name="message"
                                    value={formData.message}
                                    onChange={handleInputChange}
                                    rows="4"
                                    className="w-full bg-slate-50 border-none rounded-xl px-5 py-4 focus:ring-4 focus:ring-blue-100 focus:bg-white transition-all outline-none font-medium resize-none"
                                    required
                                    placeholder={tr.messagePlaceholder || (formType === 'dispute' ? 'Describe the issue in detail...' : 'How can we help you today?')}
                                ></textarea>
                            </div>

                            {statusMessage && (
                                <div className={`p-4 rounded-xl flex items-center gap-3 font-bold animate-in zoom-in-95 duration-200 ${statusMessage.type === 'success' ? 'bg-emerald-50 text-emerald-700 border border-emerald-100' : 'bg-rose-50 text-rose-700 border border-rose-100'
                                    }`}>
                                    <span>{statusMessage.type === 'success' ? '✅' : '🚨'}</span>
                                    {statusMessage.text}
                                </div>
                            )}

                            <button
                                type="submit"
                                disabled={submitting}
                                className={`w-full py-5 rounded-xl font-black text-lg transition-all active:scale-[0.98] ${formType === 'dispute'
                                    ? 'bg-rose-600 hover:bg-rose-700 text-white shadow-xl shadow-rose-200 disabled:bg-rose-300'
                                    : 'bg-blue-600 hover:bg-blue-700 text-white shadow-xl shadow-blue-200 disabled:bg-blue-300'
                                    }`}
                            >
                                {submitting ? (tr.registering || 'Submitting securely...') : formType === 'dispute' ? (tr.submitInvest || 'Submit Urgent Dispute 🚨') : 'Send Message ✉️'}
                            </button>
                        </form>
                    </div>
                </div>
            )}
            {/* Blocks 1 & 2 are handled via modals (Dispute Form / My Reports) in MainView */}

            {/* BLOCK 3: HOW TO USE AGRIWISE */}
            {activeView === 'guide' && (
                <div className="animate-in fade-in slide-in-from-bottom-4 duration-700 space-y-8">
                    <SubPageHeader />
                    <div className="bg-white rounded-[3.5rem] p-10 md:p-14 shadow-2xl border-2 border-emerald-50 relative overflow-hidden">
                        <h2 className="text-4xl font-black text-slate-900 mb-8 tracking-tight">📖 {tr.qualityTitle || 'How to Use AgriWise'}</h2>
                        <div className="space-y-6">
                            {[
                                { step: '1', icon: '🔍', title: 'Explore the Marketplace', desc: 'Go to Marketplace from your dashboard. Browse crops by category, filter by price, location, or quality grade.' },
                                { step: '2', icon: '🛒', title: 'Place Your Order', desc: 'Select the crop and quantity you want. Click "Add to Cart" and checkout. Your order is sent to the farmer immediately.' },
                                { step: '3', icon: '💳', title: 'Secure Escrow Payment', desc: 'Your payment is Held in Escrow. It is NOT released to the farmer until you receive and verify the crops.' },
                                { step: '4', icon: '📦', title: 'Track Delivery', desc: 'Go to "My Orders" in your dashboard to see the status: Pending → Processing → Shipped → Delivered.' },
                                { step: '5', icon: '⚖️', title: 'Verify & Report', desc: 'If you have any issue with quality, quantity, or delivery — use the Dispute form on this Support page to pause payment.' },
                            ].map((item) => (
                                <div key={item.step} className="flex items-start gap-6 p-6 bg-slate-50 rounded-2xl border border-slate-100 hover:shadow-md transition-all">
                                    <div className="w-12 h-12 bg-emerald-600 text-white rounded-full flex items-center justify-center font-black text-lg shrink-0">{item.step}</div>
                                    <div>
                                        <h3 className="font-black text-slate-800 text-lg mb-1">{item.icon} {item.title}</h3>
                                        <p className="text-slate-600 font-medium leading-relaxed">{item.desc}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            )}

            {/* BLOCK 4: QUALITY & REFUND POLICY */}
            {activeView === 'policy' && (
                <div className="animate-in fade-in slide-in-from-bottom-4 duration-700 space-y-8">
                    <SubPageHeader />
                    <div className="bg-white rounded-[3.5rem] p-10 md:p-14 shadow-2xl border-2 border-slate-100 relative overflow-hidden">
                        <h2 className="text-4xl font-black text-slate-900 mb-8 tracking-tight">🛡️ {tr.paymentTitle || 'Quality & Refund Policy'}</h2>
                        <p className="text-slate-600 font-bold mb-8 text-lg">
                            AgriWise strictly enforces quality standards to protect buyers. You can legally reject a shipment and claim a full escrow refund if the lab report exceeds the following limits:
                        </p>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                            <div className="bg-rose-50 border-2 border-rose-100 rounded-[2rem] p-8 text-rose-900">
                                <h3 className="font-black text-2xl mb-4">💧 Moisture Content (MC%)</h3>
                                <p className="font-bold text-lg mb-2">Maximum allowed: <span className="bg-white px-3 py-1 rounded-lg shadow-sm">14.0%</span></p>
                                <p className="opacity-80">If MC &gt; 14%, standard penalty of 1% price deduction per 1% extra moisture applies. If MC &gt; 18%, absolute right to reject.</p>
                            </div>
                            <div className="bg-amber-50 border-2 border-amber-100 rounded-[2rem] p-8 text-amber-900">
                                <h3 className="font-black text-2xl mb-4">🍂 Foreign Matter (FM%)</h3>
                                <p className="font-bold text-lg mb-2">Maximum allowed: <span className="bg-white px-3 py-1 rounded-lg shadow-sm">2.0%</span></p>
                                <p className="opacity-80">Includes dust, stones, weed seeds, and other crop types. If FM &gt; 2%, proportional deduction. If FM &gt; 5%, absolute right to reject.</p>
                            </div>
                        </div>

                        <div className="bg-emerald-50 border-2 border-emerald-100 rounded-[2rem] p-8 text-emerald-900">
                            <h3 className="font-black text-xl mb-4">How to Claim Escrow Refund</h3>
                            <ol className="list-decimal ml-6 space-y-3 font-bold opacity-90">
                                <li>Refuse to sign the "Quality Received" digital certificate via the Delivery App.</li>
                                <li>Click <strong>Report an Issue</strong> on this dashboard immediately.</li>
                                <li>Upload photos of the payload and the digital weighing/lab slip.</li>
                                <li>AgriWise verification team will halt the escrow payout and reverse the funds within 48 hours.</li>
                            </ol>
                        </div>
                    </div>
                </div>
            )}
        </main>

        {/* Premium Decorative Footer */}
        <footer className="text-center p-14 opacity-40">
            <p className="text-slate-400 font-black text-xs uppercase tracking-[0.3em] italic">{tr.footerText}</p>
        </footer>
        {/* My Reports Modal */}
        {showMyReports && (
            <div className="fixed inset-0 bg-slate-900/50 z-[100] flex items-center justify-center p-4 backdrop-blur-sm animate-in fade-in duration-200">
                <div className="bg-white rounded-[2rem] w-full max-w-2xl max-h-[80vh] overflow-hidden flex flex-col shadow-2xl animate-in zoom-in-95 duration-200 border-4 border-slate-50">
                    <div className="p-8 border-b border-slate-100 flex justify-between items-center bg-slate-50">
                        <h3 className="text-2xl font-black text-slate-800 tracking-tight">{tr.myReports || 'My Reports'}</h3>
                        <button onClick={() => setShowMyReports(false)} className="w-10 h-10 rounded-full bg-slate-200 flex items-center justify-center text-slate-500 hover:text-slate-700 hover:bg-slate-300 transition-all font-bold">✕</button>
                    </div>
                    <div className="p-8 overflow-y-auto">
                        {myReports.length === 0 ? (
                            <div className="text-center py-12 text-slate-400 border-2 border-dashed border-slate-200 rounded-3xl bg-slate-50">
                                <p className="font-bold">{tr.noReports || 'No reports found.'}</p>
                            </div>
                        ) : (
                            <div className="space-y-4">
                                {myReports.map((report) => (
                                    <div key={report._id} className="border border-slate-100 rounded-2xl p-6 hover:shadow-xl hover:shadow-slate-100 transition-all bg-white group">
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

export default BuyerSupport;
