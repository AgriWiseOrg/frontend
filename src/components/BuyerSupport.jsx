import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from './LanguageContext';

const BuyerSupport = ({ user }) => {
    const navigate = useNavigate();
    const { langCode: lang, setLanguage: setLang } = useLanguage();
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
            disputeRaised: 'Dispute Raised! âœ…',
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
            title: 'à¤–à¤°à¥€ददार सहायता à¤”र सहायता',
            subtitle: 'à¤†à¤ªà¤•à¥€ à¤–à¤°à¥€द यात्रा à¤•à¥‹ सुव्यवस्थित à¤•रना। हम à¤•à¥ˆà¤¸à¥‡ मदद à¤•र à¤¸à¤•à¤¤à¥‡ à¤¹à¥ˆà¤‚?',
            voiceCall: 'à¤•à¥‰ल à¤¸à¤ªà¥‹à¤°à¥à¤Ÿ',
            whatsapp: 'à¤¸à¤‚à¤šालन à¤šà¥ˆà¤Ÿ',
            smsIvr: 'एसएमएस स्थिति',
            faqs: 'à¤–à¤°à¥€ददार à¤¸à¤‚साधन',
            dispute: 'à¤²à¥‡à¤¨à¤¦à¥‡न à¤•à¥€ समस्या à¤•à¥€ à¤°à¤¿à¤ªà¥‹à¤°à¥à¤Ÿ à¤•à¤°à¥‡à¤‚',
            back: 'à¤®à¤¾à¤°à¥à¤•à¥‡à¤Ÿà¤ªà¥à¤²à¥‡स पर वापस',
            selectLang: 'भाषा à¤šà¥à¤¨à¥‡à¤‚',
            procurementTitle: 'à¤–à¤°à¥€द à¤”र à¤¬à¥‹à¤²à¥€',
            procurementDesc: 'à¤¥à¥‹à¤• à¤¬à¥‹à¤²à¥€ à¤”र à¤ˆ-à¤¨à¥€à¤²à¤¾à¤®à¥€ à¤•à¥‡ लिए à¤‰न्नत नियम।',
            procurementFull: 'à¤à¤—à¥à¤°à¥€à¤µà¤¾à¤‡à¤œ़ à¤–à¤°à¥€द à¤‡à¤‚à¤œन à¤•à¥‹ à¤à¤‚à¤Ÿà¤°à¤ªà¥à¤°à¤¾à¤‡à¤œ-à¤—à¥à¤°à¥‡ड à¤¦à¤•्षता à¤•à¥‡ लिए à¤¡à¤¿à¤œà¤¼à¤¾à¤‡न à¤•िया à¤—या à¤¹à¥ˆ, à¤œà¥‹ à¤ªà¥à¤°à¤¤à¥à¤¯à¤•्ष à¤¸à¥à¤ªà¥‰à¤Ÿ-à¤¬à¤¾à¤¯à¤¿à¤‚à¤— à¤”र à¤œà¤Ÿिल रिवर्स à¤‘à¤•्शन à¤¦à¥‹à¤¨à¥‹à¤‚ à¤•ा समर्थन à¤•रता à¤¹à¥ˆ। à¤–à¤°à¥€दार à¤ªà¤¾à¤°à¤¦à¤°à¥à¤¶à¥€ à¤ˆ-à¤¨à¥€à¤²à¤¾à¤®à¥€ à¤®à¥‡à¤‚ à¤­à¤¾à¤— à¤²à¥‡ à¤¸à¤•à¤¤à¥‡ à¤¹à¥ˆà¤‚ à¤œà¤¹à¤¾à¤‚ à¤•िसान à¤†à¤ªà¤•à¥‡ à¤²à¤•्षित à¤®à¥‚ल्य à¤•à¥‹ à¤ªà¥‚रा à¤•à¤°à¤¨à¥‡ à¤•à¥‡ लिए à¤¬à¥‹à¤²à¥€ à¤²à¤—à¤¾à¤¤à¥‡ à¤¹à¥ˆà¤‚।',
            logisticsTitle: 'रसद à¤”र à¤Ÿà¥à¤°à¥ˆà¤•à¤¿à¤‚à¤—',
            logisticsDesc: 'à¤µà¤¾à¤¸à¥à¤¤à¤µà¤¿à¤• समय à¤¬à¥‡à¤¡à¤¼à¥‡ à¤ªà¥à¤°à¤¬à¤‚धन à¤”र à¤µà¤¾à¤¹à¤• समन्वय।',
            logisticsFull: 'à¤•ुशल à¤†à¤ªà¥‚र्ति à¤¶à¥à¤°à¥ƒà¤‚à¤–ला à¤ªà¥à¤°à¤¬à¤‚धन à¤–à¤°à¥€दार à¤•à¥‡ à¤…नुभव à¤•à¥‡ à¤•à¥‡à¤‚द्र à¤®à¥‡à¤‚ à¤¹à¥ˆ। à¤à¤—à¥à¤°à¥€à¤µà¤¾à¤‡à¤œ à¤•à¤¨à¥‡à¤•à¥à¤Ÿ à¤•à¥‡ माध्यम à¤¸à¥‡, à¤–à¤°à¥€à¤¦à¤¾à¤°à¥‹à¤‚ à¤•à¥‹ à¤•à¥ƒषि परिवहन à¤®à¥‡à¤‚ à¤µà¤¿à¤¶à¥‡à¤·à¤œà¥à¤žता à¤°à¤–à¤¨à¥‡ à¤µà¤¾à¤²à¥‡ à¤¸à¥à¤¥à¤¾à¤¨à¥€à¤¯à¤•à¥ƒत, à¤•à¥‡à¤µà¤¾à¤ˆà¤¸à¥€-सत्यापित à¤¬à¥‡à¤¡à¤¼à¥‡ à¤®à¤¾à¤²à¤¿à¤•à¥‹à¤‚ à¤•à¥‡ à¤¨à¥‡à¤Ÿà¤µà¤°à¥à¤• à¤¤à¤• à¤¸à¥€à¤§à¥€ à¤ªà¤¹à¥à¤‚à¤š à¤®à¤¿à¤²à¤¤à¥€ à¤¹à¥ˆ।',
            paymentTitle: 'à¤šालान à¤”र à¤­à¥à¤—तान',
            paymentDesc: 'à¤œà¥€à¤à¤¸à¤Ÿà¥€-à¤…नुपालन à¤à¤¸à¥à¤•à¥à¤°à¥‹ à¤”र à¤µà¥‰à¤²à¥‡à¤Ÿ à¤¨à¤¿à¤ªà¤Ÿान à¤ªà¥à¤°à¤£à¤¾à¤²à¥€।',
            paymentFull: 'à¤à¤—à¥à¤°à¥€à¤µà¤¾à¤‡à¤œ़ à¤¦à¥‹à¤¨à¥‹à¤‚ à¤ªà¤•à¥à¤·à¥‹à¤‚ à¤•à¥‡ लिए à¤ªà¥‚र्ण à¤µà¤¿à¤¤à¥à¤¤à¥€य à¤¸à¥à¤°à¤•्षा प्रदान à¤•à¤°à¤¨à¥‡ à¤•à¥‡ लिए à¤à¤• à¤¸à¥à¤°à¤•्षित à¤®à¤²à¥à¤Ÿà¥€-à¤¸à¤¿à¤—à¥à¤¨à¥‡à¤šर à¤à¤¸à¥à¤•à¥à¤°à¥‹ à¤¤à¤‚त्र à¤•ा à¤‰à¤ªà¤¯à¥‹à¤— à¤•रता à¤¹à¥ˆ। à¤œब à¤†प à¤à¤• à¤¸à¥Œà¤¦à¥‡ à¤•à¥‹ à¤…à¤‚तिम à¤°à¥‚प à¤¦à¥‡à¤¤à¥‡ à¤¹à¥ˆà¤‚, à¤¤à¥‹ à¤†à¤ªà¤•ा à¤«à¤‚ड à¤¸à¥à¤°à¤•्षित à¤°à¥‚प à¤¸à¥‡ à¤°à¤–ा à¤œाता à¤¹à¥ˆ।',
            qualityTitle: 'à¤—ुणवत्ता à¤®à¤¾à¤¨à¤•',
            qualityDesc: 'à¤µà¤¿à¤¸à¥à¤¤à¥ƒत à¤—à¥à¤°à¥‡à¤¡à¤¿à¤‚à¤— à¤šà¤¾à¤°à¥à¤Ÿ à¤”र à¤²à¥ˆब प्रमाणन à¤ªà¥à¤°à¥‹à¤Ÿà¥‹à¤•à¥‰ल।',
            qualityFull: 'à¤—ुणवत्ता à¤†श्वासन à¤¹à¤®à¤¾à¤°à¥‡ à¤¬à¤¾à¤œार à¤•à¥€ à¤†धारशिला à¤¹à¥ˆ। à¤à¤—à¥à¤°à¥€à¤µà¤¾à¤‡à¤œ पर à¤¸à¥‚à¤šà¥€बद्ध à¤ªà¥à¤°à¤¤à¥à¤¯à¥‡à¤• à¤•à¥ƒषि à¤²à¥‰à¤Ÿ à¤•à¥‹ à¤¹à¤®à¤¾à¤°à¥‡ à¤®à¤¾à¤²à¤¿à¤•ाना "à¤à¤—à¥à¤°à¥€à¤µà¤¾à¤‡à¤œ à¤¸à¥à¤Ÿà¥ˆà¤‚डर्ड v2.0" à¤¢à¤¾à¤‚à¤šà¥‡ à¤•à¥‡ à¤–िलाफ à¤—à¥à¤°à¥‡ड à¤•िया à¤—या à¤¹à¥ˆ।',
            enterpriseSupport: 'à¤à¤‚à¤Ÿà¤°à¤ªà¥à¤°à¤¾à¤‡à¤œ à¤¸à¤ªà¥‹à¤°à¥à¤Ÿ 2.0',
            heroTitlePrefix: 'à¤…à¤ªà¤¨à¥€ à¤–à¤°à¥€द à¤•à¥‹',
            heroTitleHighlight: 'à¤…à¤¨à¥à¤•à¥‚लित à¤•à¤°à¥‡à¤‚',
            heroDesc: 'à¤¹à¤®à¤¾à¤°à¥‡ à¤‰न्नत à¤–à¤°à¥€दार सहायता à¤ªà¥‹à¤°à¥à¤Ÿल à¤•à¥‡ माध्यम à¤¸à¥‡ à¤¬à¥‹à¤²à¥€, रसद à¤”र à¤—ुणवत्ता à¤†श्वासन à¤•à¥‹ सुव्यवस्थित à¤•à¤°à¥‡à¤‚।',
            opsLine: 'à¤¸à¥€à¤§à¥€ à¤ªà¤°à¤¿à¤šालन à¤²à¤¾à¤‡न',
            logisticsHelp: '24/7 रसद सहायता',
            queryStatus: 'à¤•à¥à¤µà¥‡à¤°à¥€ स्थिति',
            openHub: 'à¤–à¤°à¥€द हब à¤–à¥‹à¤²à¥‡à¤‚ →',
            logisticsDash: 'à¤²à¥‰à¤œà¤¿à¤¸à¥à¤Ÿà¤¿à¤•्स à¤¡à¥ˆà¤¶à¤¬à¥‹र्ड →',
            gradingProto: 'à¤—à¥à¤°à¥‡à¤¡à¤¿à¤‚à¤— à¤ªà¥à¤°à¥‹à¤Ÿà¥‹à¤•à¥‰ल →',
            escrowSet: 'à¤à¤¸à¥à¤•à¥à¤°à¥‹ à¤¸à¥‡à¤Ÿà¤¿à¤‚à¤—्स →',
            disputeDesc: 'à¤—ुणवत्ता, à¤µà¤œन à¤•à¥‡ à¤¬à¥‡à¤®à¥‡ल या à¤¡à¤¿à¤²à¥€à¤µà¤°à¥€ à¤®à¥‡à¤‚ à¤¦à¥‡à¤°à¥€ à¤•à¥€ à¤¸à¤®à¤¸à¥à¤¯à¤¾à¤“à¤‚ à¤•à¥‹ à¤°à¤¿à¤ªà¥‹à¤°à¥à¤Ÿ à¤•à¤°à¥‡à¤‚। à¤¹à¤®à¤¾à¤°à¥€ समर्पित à¤‘à¤¡à¤¿à¤Ÿà¤¿à¤‚à¤— à¤Ÿà¥€म 48 à¤˜à¤‚à¤Ÿà¥‹à¤‚ à¤•à¥‡ à¤­à¥€तर à¤¨à¤¿à¤·à¥à¤ªà¤•्ष समाधान à¤¸à¥à¤¨à¤¿à¤¶à¥à¤šित à¤•à¤°à¥‡à¤—à¥€।',
            raiseDispute: 'à¤…à¤­à¥€ विवाद à¤‰à¤ à¤¾à¤à¤‚',
            cancelDispute: 'विवाद रद्द à¤•à¤°à¥‡à¤‚',
            farmerNameLabel: 'à¤•िसान à¤•ा नाम / à¤†à¤ˆà¤¡à¥€',
            farmerNamePlaceholder: 'à¤µà¤¿à¤•à«àª°à«‡તા विवरण',
            orderIdLabel: 'à¤‘र्डर/à¤²à¥‰à¤Ÿ à¤†à¤ˆà¤¡à¥€',
            orderIdPlaceholder: 'à¤²à¥‡à¤¨à¤¦à¥‡न à¤†à¤ˆà¤¡à¥€',
            issueTypeLabel: 'समस्या à¤•ा à¤ªà¥à¤°à¤•ार',
            selectCategory: 'à¤¶à¥à¤°à¥‡à¤£à¥€ à¤šà¥à¤¨à¥‡à¤‚...',
            issueQuality: 'à¤—ुणवत्ता à¤¬à¥‡à¤®à¥‡ल',
            issueWeight: 'à¤µà¤œन/मात्रा à¤•à¥€ à¤•à¤®à¥€',
            issueDelivery: 'à¤¦à¥‡र à¤¸à¥‡ à¤¡à¤¿à¤²à¥€à¤µà¤°à¥€',
            issueInvoice: 'à¤šालान/à¤œà¥€à¤à¤¸à¤Ÿà¥€ à¤¤à¥à¤°à¥à¤Ÿि',
            messageLabel: 'à¤µà¤¿à¤¸à¥à¤¤à¥ƒत à¤¸à¤‚à¤¦à¥‡श',
            messagePlaceholder: 'à¤¹à¤®à¤¾à¤°à¥€ सत्यापन à¤Ÿà¥€म à¤•à¥‡ लिए समस्या à¤•ा à¤¸à¤‚à¤•à¥à¤·à¥‡प à¤®à¥‡à¤‚ वर्णन à¤•à¤°à¥‡à¤‚...',
            submitInvest: 'à¤œà¤¾à¤‚à¤š à¤•à¥‡ लिए à¤¸à¤¬à¤®à¤¿à¤Ÿ à¤•à¤°à¥‡à¤‚',
            registering: 'à¤ªà¤‚à¤œà¥€à¤•रण à¤•र रहा à¤¹à¥ˆ...',
            disputeRaised: 'विवाद à¤‰ठाया à¤—या! âœ…',
            backDashboard: 'à¤¡à¥ˆà¤¶à¤¬à¥‹र्ड पर वापस',
            auctionRules: 'à¤ˆ-à¤¨à¥€à¤²à¤¾à¤®à¥€ नियम',
            tenderTracker: 'निविदा à¤Ÿà¥à¤°à¥ˆà¤•र',
            liveTracking: 'à¤²à¤¾à¤‡व à¤Ÿà¥à¤°à¥ˆà¤•à¤¿à¤‚à¤— सुविधा',
            trackingDesc: '"à¤¬à¤¾à¤œ़ार > à¤‘र्डर" à¤Ÿà¥ˆब à¤•ा à¤‰à¤ªà¤¯à¥‹à¤— à¤•à¤°à¤•à¥‡ à¤…à¤ªà¤¨à¥‡ वर्तमान à¤¶à¤¿à¤ªà¤®à¥‡à¤‚à¤Ÿ à¤•à¥‡ लिए à°°à±€యల్-à°Ÿà±ˆమ్ à¤œà¥€à¤ªà¥€एस स्थिति à¤”र तापमान à¤²à¥‰à¤— à¤¦à¥‡à¤–à¥‡à¤‚।',
            gradeAplus: 'à¤—à¥à¤°à¥‡ड A+',
            gradeA: 'à¤—à¥à¤°à¥‡ड A',
            gradeB: 'à¤—à¥à¤°à¥‡ड B',
            exportGrade: 'निर्यात à¤—à¥à¤°à¥‡ड',
            domesticStd: 'à¤˜à¤°à¥‡à¤²à¥‚ à¤®à¤¾à¤¨à¤•',
            industrial: 'à¤”à¤¦à¥à¤¯à¥‹à¤—à¤¿à¤•',
            downloadGst: 'à¤œà¥€à¤à¤¸à¤Ÿà¥€ à¤¹à¥‡ल्पर à¤¡à¤¾à¤‰à¤¨à¤²à¥‹ड à¤•à¤°à¥‡à¤‚',
            walletSettings: 'à¤µà¥‰à¤²à¥‡à¤Ÿ à¤¸à¥‡à¤Ÿà¤¿à¤‚à¤—्स',
            footerText: 'à¤à¤—à¥à¤°à¥€à¤µà¤¾à¤‡à¤œ à¤à¤‚à¤Ÿà¤°à¤ªà¥à¤°à¤¾à¤‡à¤œ — à¤†à¤ªà¥‚र्ति à¤¶à¥à¤°à¥ƒà¤‚à¤–ला à¤•à¥‹ à¤¸à¥à¤°à¤•्षित à¤•रना'
        },
        te: {
            title: 'à°•à±Šà°¨à±à°—à±‹లుదారు మద్దతు & à°¸à°¹à°¾à°¯à°‚',
            subtitle: 'à°®à±€ à°¸à±‡à°•రణ ప్రయాణాన్ని à°•à±à°°à°®à°¬à°¦à±à°§à±€à°•à°°à°¿à°‚à°šà°¡à°‚. à°®à±‡ము à°Žలా à°¸à°¹à°¾à°¯à°ªà°¡à°—లము?',
            voiceCall: 'à°•ాల్ à°¸à°ªà±‹à°°à±à°Ÿ్',
            whatsapp: 'à°†à°ªà°°à±‡షన్స్ à°šà°¾à°Ÿ్',
            smsIvr: 'SMS స్థితి',
            faqs: 'à°•à±Šà°¨à±à°—à±‹లుదారు వనರುలు',
            dispute: 'à°²à°¾à°µà°¾à°¦à±‡à°µà±€ సమస్యను à°¨à°¿à°µà±‡à°¦à°¿à°‚à°šà°‚డి',
            back: 'à°®à°¾à°°à±à°•à±†à°Ÿà±â€Œà°ªà±à°²à±‡à°¸à±â€Œà°•ు à°¤à°¿à°°à°¿à°—ి à°µà±†à°³à±à°³à°‚డి',
            selectLang: 'భాషను à°Žà°‚à°šà±à°•à±‹à°‚డి',
            procurementTitle: 'à°¸à±‡à°•రణ & à°¬à°¿à°¡à±à°¡à°¿à°‚à°—్',
            procurementDesc: 'à°¬à°²à±à°•్ à°¬à°¿à°¡à±à°¡à°¿à°‚à°—్ మరియు à°‡-à°µà±‡à°²à°‚ à°•à±‹à°¸à°‚ à°…ధునాతన నియమాలు.',
            procurementFull: 'à°…à°—à±à°°à°¿à°µà±ˆà°œ్ à°ªà±à°°à±Šà°•à±à°¯à±‚à°°à±â€Œà°®à±†à°‚à°Ÿ్ à°‡à°‚à°œిన్ à°Žà°‚à°Ÿà°°à±â€Œà°ªà±à°°à±ˆà°œ్-à°—à±à°°à±‡డ్ à°¸à°¾à°®à°°à±à°¥à±à°¯à°‚ à°•à±‹à°¸à°‚ à°°à±‚à°ªà±Šà°‚à°¦à°¿à°‚à°šà°¬à°¡à°¿à°‚ది, à°ªà±à°°à°¤à±à°¯à°•్ష à°¸à±à°ªà°¾à°Ÿ్-à°¬à±ˆà°¯à°¿à°‚à°—్ và à°¸à°‚à°•à±à°²à°¿à°·à±à°Ÿ రివర్స్ à°µà±‡à°²à°‚ à°°à±†à°‚à°¡à°¿à°‚à°Ÿà°¿à°•ి మద్దతు à°‡à°¸à±à°¤à±à°‚ది.',
            logisticsTitle: 'à°²à°¾à°œà°¿à°¸à±à°Ÿà°¿à°•్స్ & à°Ÿà±à°°à°¾à°•à°¿à°‚à°—్',
            logisticsDesc: 'రియల్ à°Ÿà±ˆమ్ à°«à±à°²à±€à°Ÿ్ à°®à±‡à°¨à±‡à°œà±â€Œà°®à±†à°‚à°Ÿ్ మరియు à°•్యారియర్ à°•à±‹à°†à°°à±à°¡à°¿à°¨à±‡షన్.',
            logisticsFull: 'à°¸à°®à°°à±à°¥à°µà°‚à°¤à°®à±ˆన à°¸à°ªà±à°²à±ˆ à°šà±ˆన్ à°®à±‡à°¨à±‡à°œà±â€Œà°®à±†à°‚à°Ÿ్ à°•à±Šà°¨à±à°—à±‹లుదారు à°…à°¨à±à°­à°µà°‚à°²à±‹ à°ªà±à°°à°§à°¾à°¨à°®à±ˆనది. à°…à°—à±à°°à°¿à°µà±ˆà°œ్ à°•à°¨à±†à°•à±à°Ÿ్ ద్వారా, à°•à±Šà°¨à±à°—à±‹లుదారులు à°«à±à°²à±€à°Ÿ్ à°¯à°œమానుల à°¨à±†à°Ÿà±â€Œà°µà°°à±â€Œà°•ు à°ªà±à°°à°¤à±à°¯à°•్ష ప్రాప్యతను à°ªà±Šà°‚దుతారు.',
            paymentTitle: 'à°‡à°¨à±â€Œà°µà°¾à°¯à°¿à°¸à±â€Œలు & à°šà±†à°²à±à°²à°¿à°‚పులు',
            paymentDesc: 'GST-à°…à°¨à±à°•à±‚ల à°Žà°¸à±à°•à±à°°à±‹ మరియు à°µà°¾à°²à±†à°Ÿ్ à°¸à±†à°Ÿà°¿à°²à±à°®à±†à°‚à°Ÿ్ à°¸à°¿à°¸à±à°Ÿమ్స్.',
            paymentFull: 'à°°à±†à°‚డు à°ªà°¾à°°à±à°Ÿà±€à°²à°•ు à°ªà±‚ర్తి à°†à°°à±à°¥à°¿à°• భద్రతను à°…à°‚à°¦à°¿à°‚à°šà°¡à°¾à°¨à°¿à°•ి à°…à°—à±à°°à°¿à°µà±ˆà°œ్ à°¸à±à°°à°•à±à°·à°¿à°¤à°®à±ˆన à°®à°²à±à°Ÿà±€-à°¸à°¿à°—à±à°¨à±‡à°šర్ à°Žà°¸à±à°•à±à°°à±‹ à°®à±†à°•à°¾à°¨à°¿à°œà°‚ను à°‰à°ªà°¯à±‹à°—à°¿à°¸à±à°¤à±à°‚ది.',
            qualityTitle: 'à²¨à²¾à²£à³à²¯à²¤à³† ప్రమాణాలు',
            qualityDesc: 'à°µà°¿à°µà°°à°£à°¾à°¤à±à°®à°• à°—à±à°°à±‡à°¡à°¿à°‚à°—్ à°šà°¾à°°à±à°Ÿà±â€Œలు మరియు ల్యాబ్ à°¸à°°à±à°Ÿà°¿à°«à°¿à°•à³‡షన్ à°ªà±à°°à±‹à°Ÿà±‹à°•ాల్స్.',
            qualityFull: 'నాణ్యత à°¹à°¾à°®à±€ మా à°®à°¾à°°à±à°•à±†à°Ÿà±â€Œà°ªà±à°²à±‡à°¸à±â€Œà°•ు పునాది. à°…à°—à±à°°à°¿à°µà±ˆà°œà±â€Œà°²à±‹ à°œాబితా à°šà±‡యబడిన ప్రతి వ్యవసాయ à°²à°¾à°Ÿ్ మా "à°…à°—à±à°°à°¿à°µà±ˆà°œ్ à°¸à±à°Ÿà°¾à°‚డర్డ్ v2.0" à°«à±à°°à±‡à°®à±â€Œà°µà°°à±à°•్ à°ªà±à°°à°•à°¾à°°à°‚ à°—à±à°°à±‡డ్ à°šà±‡à°¯à°¬à°¡à°¿à°‚ది.',
            enterpriseSupport: 'Enterprise Support 2.0',
            heroTitlePrefix: 'Optimize your',
            heroTitleHighlight: 'procurement',
            heroDesc: 'Streamline bidding, logistics, and quality assurance through our advanced buyer assistance portal.',
            opsLine: 'Direct Ops Line',
            logisticsHelp: '24/7 Logistics Help',
            queryStatus: 'Query Status',
            openHub: 'Open Procurement Hub →',
            logisticsDash: 'Logistics Dashboard →',
            gradingProto: 'Grading Protocols →',
            escrowSet: 'Escrow Settings →',
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
            disputeRaised: 'Dispute Raised! âœ…',
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
            footerText: 'AgriWise Enterprise — Securing the Supply Chain',
            queryOptions: {
                kyc_help: 'Registration / KYC',
                logistics_help: 'Logistics Request',
                payment_issue: 'Payment / Wallet',
                other: 'Other Inquiry'
            },
            formTabs: {
                query: 'General Inquiry',
                dispute: 'Raise Dispute'
            }
        },
        ta: {
            title: 'à®µà®¾à®™à¯à®•ுபவர் à®†தரவு & à®‰தவி',
            subtitle: 'à®‰à®™à¯à®•ள் à®•à¯Šள்முதல் à®ªà®¯à®£à®¤à¯à®¤à¯ˆ à®¨à¯†à®±à®¿à®ªà¯à®ªà®Ÿுத்துதல். à®¨à®¾à®™à¯à®•ள் à®Žவ்வாறு à®‰தவ à®®à¯à®Ÿியும்?',
            voiceCall: 'à®…à®´à¯ˆப்பு à®†தரவு',
            whatsapp: 'à®šà¯†à®¯à®²à¯à®ªà®¾à®Ÿà¯à®•ள் à®…à®°à®Ÿà¯à®Ÿà¯ˆ',
            smsIvr: 'SMS à®¨à®¿à®²à¯ˆ',
            faqs: 'à®µà®¾à®™à¯à®•ுபவர் à®µà®³à®™à¯à®•ள்',
            dispute: 'à®ªà®°à®¿à®µà®°à¯à®¤à¯à®¤à®©à¯ˆ à®šà®¿à®•à¯à®•à®²à¯ˆப் à®ªà¯à®•à®¾à®°à®³à®¿à®•à¯à®•வும்',
            back: 'à®šà®¨à¯à®¤à¯ˆà®•à¯à®•ுத் திரும்பு',
            selectLang: 'à®®à¯Šà®´à®¿à®¯à¯ˆத் à®¤à¯‡à®°à¯à®¨à¯à®¤à¯†à®Ÿà¯à®•à¯à®•வும்',
            procurementTitle: 'à®•à¯Šள்முதல் & ஏலம்',
            procurementDesc: 'à®®à¯Šத்த ஏலம் மற்றும் மின்-à®à®²à®™à¯à®•à®³à¯à®•à¯à®•ான à®®à¯‡à®®à¯à®ªà®Ÿà¯à®Ÿ à®µà®¿à®¤à®¿à®•ள்.',
            procurementFull: 'AgriWise à®•à¯Šள்முதல் à®‡யந்திரம் நிறுவன தர à®šà¯†à®¯à®²à¯à®¤à®¿à®±à®©à¯à®•à¯à®•à®¾à®• à®µà®Ÿà®¿à®µà®®à¯ˆà®•à¯à®•à®ªà¯à®ªà®Ÿà¯à®Ÿுள்ளது, à®¨à¯‡à®°à®Ÿி à®¸à¯à®ªà®¾à®Ÿ்-à®ªà¯ˆà®¯à®¿à®™் மற்றும் à®šà®¿à®•à¯à®•லான à®¤à®²à¯ˆà®•à¯€ழ் ஏலம் à®‡à®°à®£à¯à®Ÿà¯ˆயும் à®†à®¤à®°à®¿à®•à¯à®•ிறது.',
            logisticsTitle: 'à®¤à®³à®µà®¾à®Ÿà®™à¯à®•ள் & à®•à®£à¯à®•ாணிப்பு',
            logisticsDesc: 'à®¨à®¿à®•à®´à¯à®¨à¯‡ர à®•à®Ÿà®±à¯à®ªà®Ÿà¯ˆ à®®à¯‡à®²à®¾à®£à¯à®®à¯ˆ மற்றும் à®•à¯‡ரியர் à®’à®°à¯à®™à¯à®•à®¿à®£à¯ˆப்பு.',
            logisticsFull: 'à®¤à®¿à®±à®®à¯ˆயான à®µà®¿à®¨à®¿à®¯à¯‹à®•à®š் à®šà®™à¯à®•ிலி à®®à¯‡à®²à®¾à®£à¯à®®à¯ˆ à®µà®¾à®™à¯à®•ுபவரின் à®…னுபவத்தின் à®®à¯ˆயத்தில் à®‰ள்ளது. AgriWise Connect à®®à¯‚லம், à®µà®¾à®™à¯à®•à¯à®ªà®µà®°à¯à®•ள் à®•à®Ÿà®±à¯à®ªà®Ÿà¯ˆ à®‰à®°à®¿à®®à¯ˆà®¯à®¾à®³à®°à¯à®•ளின் à®¨à¯†à®Ÿà¯à®µà¯Šà®°à¯à®•à¯à®•à®¿à®±à¯à®•ு à®¨à¯‡à®°à®Ÿி à®…à®£à¯à®•à®²à¯ˆப் à®ªà¯†à®±à¯à®•à®¿à®±à®¾à®°à¯à®•ள்.',
            gradingProto: 'Grading Protocols →',
            escrowSet: 'Escrow Settings →',
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
            disputeRaised: 'Dispute Raised! âœ…',
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
        }
    };

    const t = translations[lang] || translations['en'];

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
                setStatusMessage({ type: 'success', text: formType === 'dispute' ? t.disputeRaised : 'Message Sent! âœ…' });
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
                <span className="inline-block bg-blue-100 text-blue-700 px-6 py-2 rounded-full text-xs font-black uppercase tracking-widest mb-6">{t.enterpriseSupport}</span>
                <h1 className="text-4xl md:text-7xl font-black text-slate-900 mb-6 tracking-tight leading-none">
                    {t.heroTitlePrefix} <br /><span className="text-blue-600">{t.heroTitleHighlight}</span>
                </h1>
                <p className="text-slate-500 text-lg md:text-xl font-bold max-w-xl leading-relaxed">
                    {t.heroDesc}
                </p>
            </div>
            <div className="absolute right-[-50px] top-[-50px] w-96 h-96 bg-blue-50 rounded-full blur-3xl opacity-50 group-hover:bg-blue-100 transition-colors duration-700"></div>
        </div>

        {/* Multimodal Action Bar */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <a href="tel:+916301230747" className="flex flex-col items-center justify-center p-8 bg-gradient-to-br from-blue-600 to-blue-700 text-white rounded-[2.5rem] shadow-2xl shadow-blue-200 hover:scale-105 transition-all group text-center">
                <span className="text-5xl mb-3 group-hover:rotate-12 transition-transform duration-300">📞</span>
                <span className="font-black text-xl tracking-tight">{t.voiceCall}</span>
                <span className="text-[10px] opacity-80 uppercase font-bold mt-2 tracking-widest">{t.opsLine}</span>
            </a>
            <a href="https://wa.me/916301230747" target="_blank" rel="noreferrer" className="flex flex-col items-center justify-center p-8 bg-gradient-to-br from-emerald-500 to-teal-600 text-white rounded-[2.5rem] shadow-2xl shadow-emerald-200 hover:scale-105 transition-all group text-center">
                <span className="text-5xl mb-3 group-hover:rotate-12 transition-transform duration-300">💬</span>
                <span className="font-black text-xl tracking-tight">{t.whatsapp}</span>
                <span className="text-[10px] opacity-80 uppercase font-bold mt-2 tracking-widest">{t.logisticsHelp}</span>
            </a>
            <a href="sms:+916301230747" className="flex flex-col items-center justify-center p-8 bg-gradient-to-br from-slate-800 to-slate-900 text-white rounded-[2.5rem] shadow-2xl shadow-slate-300 hover:scale-105 transition-all group text-center">
                <span className="text-5xl mb-3 group-hover:rotate-12 transition-transform duration-300">📱</span>
                <span className="font-black text-xl tracking-tight">{t.smsIvr}</span>
                <span className="text-[10px] opacity-80 uppercase font-bold mt-2 tracking-widest">{t.queryStatus}</span>
            </a>
        </section>

        <hr className="border-slate-200" />

        {/* Interactive Feature Cards */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            <FeatureCard
                icon="📋"
                title={t.procurementTitle}
                desc={t.procurementDesc}
                color="blue"
                onClick={() => {
                    setActiveView('dispute');
                    setFormType('dispute');
                }}
                footer={t.openHub}
                bgIcon="⚖️"
            />
            <FeatureCard
                icon="📊"
                title={t.logisticsTitle}
                desc={t.logisticsDesc}
                color="indigo"
                onClick={() => setShowMyReports(true)}
                footer={t.logisticsDash}
                bgIcon="📈"
            />
            <FeatureCard
                icon="📖"
                title={t.qualityTitle}
                desc={t.qualityDesc}
                color="amber"
                onClick={() => setActiveView('guide')}
                footer={t.gradingProto}
                bgIcon="✅"
            />
            <FeatureCard
                icon="⚖️"
                title={t.paymentTitle}
                desc={t.paymentDesc}
                color="emerald"
                onClick={() => setActiveView('policy')}
                footer={t.escrowSet}
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
        <span className="group-hover:-translate-x-1 transition-transform">â†</span> {t.backDashboard}
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
                    <span>←</span> {activeView === 'main' ? t.back : 'Dashboard'}
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
                        <h2 className="text-4xl font-black text-slate-900 mb-8 tracking-tight">âš–️ {t.dispute}</h2>
                        <p className="text-slate-600 font-medium mb-8 text-lg">{t.disputeDesc}</p>
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
                                ðŸš¨ Urgent Dispute
                            </button>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-5">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                <div className="space-y-2">
                                    <label className="text-xs font-black uppercase tracking-widest text-slate-500 ml-2">Your Name</label>
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
                                    <label className="text-xs font-black uppercase tracking-widest text-slate-500 ml-2">Order ID (Optional)</label>
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
                                    <label className="text-xs font-black uppercase tracking-widest text-slate-500 ml-2">Issue Type</label>
                                    <select
                                        name="issueType"
                                        value={formData.issueType}
                                        onChange={handleInputChange}
                                        className="w-full bg-rose-50 border-none rounded-xl px-5 py-4 focus:ring-4 focus:ring-rose-100 transition-all outline-none font-bold text-rose-900 appearance-none cursor-pointer"
                                    >
                                        <option value="quality">Quality Standards Not Met</option>
                                        <option value="weight">Weight / Quantity Mismatch</option>
                                        <option value="payment">Payment Delay / Escrow Issue</option>
                                        <option value="logistics">Logistics / Delivery Damage</option>
                                        <option value="other">Other Dispute</option>
                                    </select>
                                </div>
                            )}

                            <div className="space-y-2">
                                <label className="text-xs font-black uppercase tracking-widest text-slate-500 ml-2">Detailed Message</label>
                                <textarea
                                    name="message"
                                    value={formData.message}
                                    onChange={handleInputChange}
                                    rows="4"
                                    className="w-full bg-slate-50 border-none rounded-xl px-5 py-4 focus:ring-4 focus:ring-blue-100 focus:bg-white transition-all outline-none font-medium resize-none"
                                    required
                                    placeholder={formType === 'dispute' ? 'Describe the issue in detail. If this is about quality, mention the lab testing parameters...' : 'How can we help you today?'}
                                ></textarea>
                            </div>

                            {statusMessage && (
                                <div className={`p-4 rounded-xl flex items-center gap-3 font-bold animate-in zoom-in-95 duration-200 ${statusMessage.type === 'success' ? 'bg-emerald-50 text-emerald-700 border border-emerald-100' : 'bg-rose-50 text-rose-700 border border-rose-100'
                                    }`}>
                                    <span>{statusMessage.type === 'success' ? 'âœ…' : 'ðŸš¨'}</span>
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
                                {submitting ? 'Submitting securely...' : formType === 'dispute' ? 'Submit Urgent Dispute ðŸš¨' : 'Send Message âœ‰️'}
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
                        <h2 className="text-4xl font-black text-slate-900 mb-8 tracking-tight">📖 How to Use AgriWise</h2>
                        <div className="space-y-6">
                            {[
                                { step: '1', icon: 'ðŸ”', title: 'Explore the Marketplace', desc: 'Go to Marketplace from your dashboard. Browse crops by category, filter by price, location, or quality grade.' },
                                { step: '2', icon: 'ðŸ›’', title: 'Place Your Order', desc: 'Select the crop and quantity you want. Click "Add to Cart" and checkout. Your order is sent to the farmer immediately.' },
                                { step: '3', icon: 'ðŸ’³', title: 'Secure Escrow Payment', desc: 'Your payment is Held in Escrow. It is NOT released to the farmer until you receive and verify the crops.' },
                                { step: '4', icon: 'ðŸ“¦', title: 'Track Delivery', desc: 'Go to "My Orders" in your dashboard to see the status: Pending → Processing → Shipped → Delivered.' },
                                { step: '5', icon: 'âš–️', title: 'Verify & Report', desc: 'If you have any issue with quality, quantity, or delivery — use the Dispute form on this Support page to pause payment.' },
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
                        <h2 className="text-4xl font-black text-slate-900 mb-8 tracking-tight">ðŸ›¡ï¸ Quality & Refund Policy</h2>
                        <p className="text-slate-600 font-bold mb-8 text-lg">
                            AgriWise strictly enforces quality standards to protect buyers. You can legally reject a shipment and claim a full escrow refund if the lab report exceeds the following limits:
                        </p>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                            <div className="bg-rose-50 border-2 border-rose-100 rounded-[2rem] p-8 text-rose-900">
                                <h3 className="font-black text-2xl mb-4">ðŸ’§ Moisture Content (MC%)</h3>
                                <p className="font-bold text-lg mb-2">Maximum allowed: <span className="bg-white px-3 py-1 rounded-lg shadow-sm">14.0%</span></p>
                                <p className="opacity-80">If MC &gt; 14%, standard penalty of 1% price deduction per 1% extra moisture applies. If MC &gt; 18%, absolute right to reject.</p>
                            </div>
                            <div className="bg-amber-50 border-2 border-amber-100 rounded-[2rem] p-8 text-amber-900">
                                <h3 className="font-black text-2xl mb-4">ðŸ‚ Foreign Matter (FM%)</h3>
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
            <p className="text-slate-400 font-black text-xs uppercase tracking-[0.3em] italic">{t.footerText}</p>
        </footer>
        {/* My Reports Modal */}
        {showMyReports && (
            <div className="fixed inset-0 bg-slate-900/50 z-[100] flex items-center justify-center p-4 backdrop-blur-sm animate-in fade-in duration-200">
                <div className="bg-white rounded-[2rem] w-full max-w-2xl max-h-[80vh] overflow-hidden flex flex-col shadow-2xl animate-in zoom-in-95 duration-200 border-4 border-slate-50">
                    <div className="p-8 border-b border-slate-100 flex justify-between items-center bg-slate-50">
                        <h3 className="text-2xl font-black text-slate-800 tracking-tight">{t.myReports || 'My Reports'}</h3>
                        <button onClick={() => setShowMyReports(false)} className="w-10 h-10 rounded-full bg-slate-200 flex items-center justify-center text-slate-500 hover:text-slate-700 hover:bg-slate-300 transition-all font-bold">âœ•</button>
                    </div>
                    <div className="p-8 overflow-y-auto">
                        {myReports.length === 0 ? (
                            <div className="text-center py-12 text-slate-400 border-2 border-dashed border-slate-200 rounded-3xl bg-slate-50">
                                <p className="font-bold">No reports found.</p>
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
