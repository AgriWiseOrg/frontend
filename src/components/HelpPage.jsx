import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
    ArrowLeft, FileText, Sprout, Landmark, ShoppingBag, CloudSun,
    LifeBuoy, ChevronDown, ChevronUp, CheckCircle, Package
} from 'lucide-react';
import { useTranslation } from 'react-i18next';

const HelpPage = () => {
    const navigate = useNavigate();
    const { t } = useTranslation();
    const [openApp, setOpenApp] = useState(null);

    const helpSections = [
        {
            id: 'getting_started',
            title: t('helpGettingStartedTitle', 'Getting Started'),
            icon: <CheckCircle className="w-6 h-6 text-emerald-500" />,
            content: [
                t('helpStart1', '1. Use the navigation buttons on your dashboard to explore features.'),
                t('helpStart2', '2. Keep your profile updated by clicking on the User icon in the top right.'),
                t('helpStart3', '3. Change language preferences anytime from the language dropdown in the header.')
            ]
        },
        {
            id: 'market_prices',
            title: t('helpMarketPricesTitle', 'Market Prices'),
            icon: <Sprout className="w-6 h-6 text-blue-500" />,
            content: [
                t('helpMarket1', 'Check real-time crop rates in your area.'),
                t('helpMarket2', 'Select your crop and state to see the latest mandi prices.')
            ]
        },
        {
            id: 'my_crops',
            title: t('helpMyCropsTitle', 'My Crops'),
            icon: <Sprout className="w-6 h-6 text-green-500" />,
            content: [
                t('helpCrops1', 'Keep a digital record of the crops you are currently growing.'),
                t('helpCrops2', 'Add new crops and track their growth stages.')
            ]
        },
        {
            id: 'govt_schemes',
            title: t('helpGovtSchemesTitle', 'Government Schemes & Grants'),
            icon: <Landmark className="w-6 h-6 text-orange-500" />,
            content: [
                t('helpSchemes1', 'Browse available agricultural subsidies and financial aid.'),
                t('helpSchemes2', 'Read expert farming tips and latest updates from authorities.')
            ]
        },
        {
            id: 'marketplace',
            title: t('helpMarketplaceTitle', 'Marketplace & Orders'),
            icon: <ShoppingBag className="w-6 h-6 text-purple-500" />,
            content: [
                t('helpMarketplace1', 'Buy equipment, seeds, and fertilizers directly.'),
                t('helpMarketplace2', 'Manage incoming buyer orders from the Order Management section.')
            ]
        },
        {
            id: 'weather',
            title: t('helpWeatherTitle', 'Weather Forecast'),
            icon: <CloudSun className="w-6 h-6 text-sky-500" />,
            content: [
                t('helpWeather1', 'Get precise local weather forecasts before planning your day.'),
                t('helpWeather2', 'Access it quickly from the cloud icon in the top header.')
            ]
        },
        {
            id: 'support',
            title: t('helpSupportTitle', 'Expert Support'),
            icon: <LifeBuoy className="w-6 h-6 text-rose-500" />,
            content: [
                t('helpSupport1', 'Raise tickets if you face issues or need farming advice.'),
                t('helpSupport2', 'Our experts aim to respond within 24 hours.')
            ]
        }
    ];

    return (
        <div className="min-h-screen bg-slate-50 text-slate-800 font-sans pb-24">
            {/* Header */}
            <header className="bg-white border-b border-slate-200 sticky top-0 z-50 shadow-sm">
                <div className="max-w-4xl mx-auto px-6 py-4 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <button
                            onClick={() => navigate(-1)}
                            className="p-2 -ml-2 hover:bg-slate-100 rounded-xl transition-colors text-slate-500 hover:text-slate-800"
                        >
                            <ArrowLeft className="w-5 h-5" />
                        </button>
                        <h1 className="text-xl font-bold text-slate-900">{t('helpCenter', 'Help Center')}</h1>
                    </div>
                </div>
            </header>

            <main className="max-w-3xl mx-auto px-6 pt-12">
                <div className="text-center mb-12">
                    <div className="inline-flex items-center justify-center w-20 h-20 bg-emerald-100 text-emerald-600 rounded-full mb-6">
                        <LifeBuoy className="w-10 h-10" />
                    </div>
                    <h2 className="text-4xl font-black text-slate-900 mb-4 tracking-tight">
                        {t('howCanWeHelp', 'How can we help you?')}
                    </h2>
                    <p className="text-lg text-slate-500 font-medium">
                        {t('helpSubtitle', 'Learn how to use AgriWise effectively to boost your farming operations.')}
                    </p>
                </div>

                <div className="bg-white rounded-[2rem] border border-slate-200 shadow-sm overflow-hidden">
                    {helpSections.map((section, index) => (
                        <div key={section.id} className={`border-b border-slate-100 last:border-0 ${openApp === section.id ? 'bg-slate-50/50' : 'bg-white'}`}>
                            <button
                                onClick={() => setOpenApp(openApp === section.id ? null : section.id)}
                                className="w-full flex items-center justify-between p-6 md:p-8 text-left transition-colors hover:bg-slate-50"
                            >
                                <div className="flex items-center gap-4">
                                    <div className="p-3 bg-white border border-slate-200 rounded-2xl shadow-sm">
                                        {section.icon}
                                    </div>
                                    <h3 className="text-xl font-bold text-slate-800">{section.title}</h3>
                                </div>
                                <div className="text-slate-400">
                                    {openApp === section.id ? <ChevronUp className="w-6 h-6" /> : <ChevronDown className="w-6 h-6" />}
                                </div>
                            </button>

                            <motion.div
                                initial={false}
                                animate={{ height: openApp === section.id ? 'auto' : 0, opacity: openApp === section.id ? 1 : 0 }}
                                className="overflow-hidden"
                            >
                                <div className="px-6 md:px-8 pb-8 pt-2 pl-20 md:pl-24">
                                    <ul className="space-y-4">
                                        {section.content.map((point, idx) => (
                                            <li key={idx} className="flex gap-3 text-slate-600">
                                                <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 mt-2.5 flex-shrink-0" />
                                                <span className="text-[1.05rem] leading-relaxed font-medium">{point}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </motion.div>
                        </div>
                    ))}
                </div>

                <div className="mt-12 bg-emerald-600 rounded-3xl p-8 md:p-10 text-center text-white relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500 rounded-full blur-[80px] opacity-50 -translate-y-1/2 translate-x-1/2"></div>
                    <div className="relative z-10">
                        <h3 className="text-2xl font-bold mb-3">{t('stillNeedHelp', 'Still need help?')}</h3>
                        <p className="text-emerald-100 mb-6 font-medium max-w-sm mx-auto">
                            {t('stillNeedHelpDesc', 'If you couldn\'t find the answer to your question, our support team is ready to assist you.')}
                        </p>
                        <button
                            onClick={() => navigate('/support')}
                            className="bg-white text-emerald-600 px-8 py-3.5 rounded-xl font-bold shadow-lg hover:shadow-xl hover:scale-105 transition-all active:scale-95"
                        >
                            {t('contactSupport', 'Contact Support')}
                        </button>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default HelpPage;
