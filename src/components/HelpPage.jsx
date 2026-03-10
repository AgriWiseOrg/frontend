import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
    ArrowLeft, FileText, Sprout, Landmark, ShoppingBag, CloudSun,
    LifeBuoy, ChevronDown, ChevronUp, CheckCircle, Package,
    TrendingUp, Activity, MapPin, Search, AlertCircle, ShoppingCart
} from 'lucide-react';
import { useTranslation } from 'react-i18next';

const HelpPage = () => {
    const navigate = useNavigate();
    const { t } = useTranslation();
    const [openApp, setOpenApp] = useState(null);

    const helpSections = [
        {
            id: 'getting_started',
            title: t('helpGettingStartedTitle', 'Getting Started & Dashboard'),
            icon: <CheckCircle className="w-6 h-6 text-emerald-500" />,
            content: [
                {
                    subtitle: t('helpNavigatingDash', 'Navigating your Dashboard'),
                    text: t('helpNavDashDesc', 'Your dashboard is your central hub. It displays a quick overview of system statuses, the current time, and live local weather. You can click on any of the large feature cards (like Market Prices or My Crops) to jump directly into those tools.')
                },
                {
                    subtitle: t('helpSearchBar', 'Global Search'),
                    text: t('helpSearchDesc', 'At the top of your dashboard, there is a search bar. Type in keywords like "Wheat", "Subsidy", or "Weather" to quickly find relevant tools without clicking through menus. You can also press CTRL+K (or CMD+K on Mac) to focus the search bar instantly.')
                },
                {
                    subtitle: t('helpProfileSettings', 'Profile & Settings'),
                    text: t('helpProfileDesc', 'Click the User icon in the top right corner to view and edit your profile. Keeping your location, farm size, and contact details updated helps AgriWise provide you with better localized recommendations.')
                },
                {
                    subtitle: t('helpLanguages', 'Changing the Language'),
                    text: t('helpLangDesc', 'AgriWise supports multiple regional languages. Click the language button (e.g., "English") in the top right header to open a dropdown menu. Select your preferred language, and the entire platform will translate instantly.')
                }
            ]
        },
        {
            id: 'market_prices',
            title: t('helpMarketPricesTitle', 'Market Prices & Analytics'),
            icon: <TrendingUp className="w-6 h-6 text-blue-500" />,
            content: [
                {
                    subtitle: t('helpViewPrices', 'Viewing Daily Rates'),
                    text: t('helpViewPricesDesc', 'Navigate to "Market Prices" from your dashboard. Here, you will see a list of crops with their current market rates. Use the filters at the top to select your specific State and District to get accurate local Mandi prices.')
                },
                {
                    subtitle: t('helpPriceTrends', 'Understanding Trends'),
                    text: t('helpTrendsDesc', 'Next to each price, you will see an indicator showing if the price is trending UP (green arrow) or DOWN (red arrow) compared to the previous week. This helps you decide the best time to sell your harvest.')
                },
                {
                    subtitle: t('helpHistoricalData', 'Historical Data Charts'),
                    text: t('helpHistDataDesc', 'Click on a specific crop card to view detailed historical charts. These graphs show how the price of the crop has fluctuated over the past months, providing deeper insights for your planting strategy.')
                }
            ]
        },
        {
            id: 'my_crops',
            title: t('helpMyCropsTitle', 'My Crops & Farm Management'),
            icon: <Sprout className="w-6 h-6 text-green-500" />,
            content: [
                {
                    subtitle: t('helpAddCrop', 'Adding a New Crop'),
                    text: t('helpAddCropDesc', 'Go to "My Crops" and click the "Add Crop" button. Fill in details such as the crop type, sowing date, and the land area used. This allows the system to track your current farming cycle.')
                },
                {
                    subtitle: t('helpTrackGrowth', 'Tracking Growth Stages'),
                    text: t('helpTrackGrowthDesc', 'Once a crop is added, AgriWise will estimate its current growth stage based on the sowing date. You will receive timely alerts on when to water, apply fertilizer, or prepare for harvesting.')
                },
                {
                    subtitle: t('helpYieldPredict', 'Yield Prediction'),
                    text: t('helpYieldPredDesc', 'Based on the entered acreage and local historical data, the platform provides an estimate of your expected yield, helping you plan your sales and storage in advance.')
                }
            ]
        },
        {
            id: 'govt_schemes',
            title: t('helpGovtSchemesTitle', 'Government Schemes & Finance'),
            icon: <Landmark className="w-6 h-6 text-orange-500" />,
            content: [
                {
                    subtitle: t('helpBrowseSchemes', 'Browsing Subsidies'),
                    text: t('helpBrowseSchemesDesc', 'The "Govt Schemes" hub lists active state and central government subsidies. You can filter them by category (e.g., Machinery, Seeds, Irrigation) to find grants that apply to your current needs.')
                },
                {
                    subtitle: t('helpEligibility', 'Checking Eligibility'),
                    text: t('helpEligibDesc', 'Click on any scheme card to read the full details, including eligibility criteria and required documents. Make sure your profile details match the scheme requirements before applying.')
                },
                {
                    subtitle: t('helpFinance', 'Applying for Loans & Finance'),
                    text: t('helpFinDesc', 'Under the Finance sub-section, you can explore agricultural loan options provided by empanelled banks, including KCC (Kisan Credit Card) rates and application procedures.')
                }
            ]
        },
        {
            id: 'marketplace',
            title: t('helpMarketplaceTitle', 'Marketplace & Orders'),
            icon: <ShoppingBag className="w-6 h-6 text-purple-500" />,
            content: [
                {
                    subtitle: t('helpBuyingGoods', 'Buying Equipment and Seeds'),
                    text: t('helpBuyDesc', 'Visit the Marketplace to purchase certified seeds, fertilizers, pesticides, and farming tools. Use the category tabs to filter products. Click "Add to Cart" to select items you wish to buy.')
                },
                {
                    subtitle: t('helpCheckout', 'Checkout Process'),
                    text: t('helpCheckDesc', 'Click the Shopping Cart icon in the top header to review your items. Proceed to checkout to securely pay and arrange for delivery directly to your registered farm address.')
                },
                {
                    subtitle: t('helpManageOrders', 'Managing Your Orders'),
                    text: t('helpManOrdDesc', 'If you are selling produce to buyers on the platform, go to the "Order Management" section. Here you can view incoming requests from buyers, accept or reject bids, and update the dispatch status of your goods.')
                }
            ]
        },
        {
            id: 'weather',
            title: t('helpWeatherTitle', 'Weather Forecast & Logistics'),
            icon: <CloudSun className="w-6 h-6 text-sky-500" />,
            content: [
                {
                    subtitle: t('helpLiveWeather', 'Live Local Weather'),
                    text: t('helpLiveWDesc', 'The top dashboard bar constantly displays your current local temperature, humidity, and wind speed based on your GPS location. Click the refresh button to update it instantly.')
                },
                {
                    subtitle: t('helpForecast', '7-Day Forecast'),
                    text: t('helpForeDesc', 'Click the "Weather" icon in the top navigation bar (or via the dashboard card) to see a detailed 7-day forecast. This is crucial for planning sowing, harvesting, and fertilizer application to avoid rain washouts.')
                },
                {
                    subtitle: t('helpLogisticsW', 'Transport Weather'),
                    text: t('helpLogWDesc', 'If you are shipping produce, check the weather along your transport routes to ensure sensitive crops do not spoil due to extreme heat or delays caused by heavy rainfall.')
                }
            ]
        },
        {
            id: 'support',
            title: t('helpSupportTitle', 'Expert Support & Ticketing'),
            icon: <LifeBuoy className="w-6 h-6 text-rose-500" />,
            content: [
                {
                    subtitle: t('helpRaiseTicket', 'Raising a Support Ticket'),
                    text: t('helpRaiseTDesc', 'If you encounter a bug, face an issue with an order, or need agronomy advice, go to the "Support" section. Click "Create Ticket", select the relevant category, and describe your issue in detail. You can also attach photos of diseased crops for expert diagnosis.')
                },
                {
                    subtitle: t('helpTrackTicket', 'Tracking Resolution Status'),
                    text: t('helpTrackTDesc', 'Once a ticket is submitted, it will appear in your Active Tickets list. You can track its status (Open, In Progress, Resolved) and reply to messages from agricultural experts or system administrators directly within the ticket interface.')
                }
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
                    {/* Add visual breadcrumb or secondary action if needed */}
                    <div className="hidden sm:flex items-center gap-2 text-sm font-medium text-slate-500">
                        <LifeBuoy className="w-4 h-4 text-emerald-500" />
                        <span>{t('agriwiseSupport', 'AgriWise Support')}</span>
                    </div>
                </div>
            </header>

            <main className="max-w-4xl mx-auto px-6 pt-12">
                <div className="text-center mb-16">
                    <motion.div
                        initial={{ scale: 0.9, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        className="inline-flex items-center justify-center w-24 h-24 bg-gradient-to-br from-emerald-100 to-teal-50 text-emerald-600 rounded-3xl mb-8 shadow-sm border border-emerald-100 transform rotate-3"
                    >
                        <LifeBuoy className="w-12 h-12" strokeWidth={1.5} />
                    </motion.div>
                    <motion.h2
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.1 }}
                        className="text-4xl md:text-5xl font-black text-slate-900 mb-6 tracking-tight"
                    >
                        {t('howCanWeHelp', 'How can we help you thrive?')}
                    </motion.h2>
                    <motion.p
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.2 }}
                        className="text-lg md:text-xl text-slate-500 font-medium max-w-2xl mx-auto leading-relaxed"
                    >
                        {t('helpSubtitle', 'Explore our comprehensive guides below to learn how to use AgriWise effectively, manage your farm digitally, and boost your agricultural yields.')}
                    </motion.p>
                </div>

                <div className="space-y-6">
                    {helpSections.map((section, index) => (
                        <motion.div
                            initial={{ y: 20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ delay: 0.1 * index }}
                            key={section.id}
                            className={`rounded-[2rem] border transition-all duration-300 overflow-hidden ${openApp === section.id ? 'bg-white border-emerald-200 shadow-xl shadow-emerald-900/5 ring-1 ring-emerald-100' : 'bg-white border-slate-200 shadow-sm hover:border-emerald-200 hover:shadow-md'}`}
                        >
                            <button
                                onClick={() => setOpenApp(openApp === section.id ? null : section.id)}
                                className="w-full flex items-center justify-between p-6 md:p-8 text-left transition-colors focus:outline-none focus-visible:bg-slate-50"
                            >
                                <div className="flex items-center gap-5">
                                    <div className={`p-4 rounded-2xl shadow-sm transition-colors ${openApp === section.id ? 'bg-emerald-50 border border-emerald-100' : 'bg-slate-50 border border-slate-100'}`}>
                                        {section.icon}
                                    </div>
                                    <h3 className={`text-xl md:text-2xl font-bold transition-colors ${openApp === section.id ? 'text-emerald-700' : 'text-slate-800'}`}>
                                        {section.title}
                                    </h3>
                                </div>
                                <div className={`p-2 rounded-full transition-colors ${openApp === section.id ? 'bg-emerald-100 text-emerald-600' : 'text-slate-400'}`}>
                                    <motion.div
                                        animate={{ rotate: openApp === section.id ? 180 : 0 }}
                                        transition={{ duration: 0.3 }}
                                    >
                                        <ChevronDown className="w-6 h-6" />
                                    </motion.div>
                                </div>
                            </button>

                            <AnimatePresence>
                                {openApp === section.id && (
                                    <motion.div
                                        initial={{ height: 0, opacity: 0 }}
                                        animate={{ height: 'auto', opacity: 1 }}
                                        exit={{ height: 0, opacity: 0 }}
                                        transition={{ duration: 0.3, ease: "easeInOut" }}
                                        className="overflow-hidden bg-slate-50/50 border-t border-slate-100"
                                    >
                                        <div className="px-6 md:px-8 pb-10 pt-6 pl-6 md:pl-28">
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                                {section.content.map((point, idx) => (
                                                    <div key={idx} className="flex flex-col gap-2">
                                                        <div className="flex items-center gap-2">
                                                            <div className="w-2 h-2 rounded-full bg-emerald-500 shadow-sm shadow-emerald-500/50" />
                                                            <h4 className="font-bold text-slate-800 text-lg">{point.subtitle}</h4>
                                                        </div>
                                                        <p className="text-slate-600 leading-relaxed font-medium pl-4 text-base">
                                                            {point.text}
                                                        </p>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </motion.div>
                    ))}
                </div>

                <motion.div
                    initial={{ y: 30, opacity: 0 }}
                    whileInView={{ y: 0, opacity: 1 }}
                    viewport={{ once: true }}
                    className="mt-16 mb-12 bg-emerald-600 rounded-[2.5rem] p-10 md:p-14 text-center text-white relative overflow-hidden shadow-2xl shadow-emerald-600/20"
                >
                    <div className="absolute top-0 right-0 w-80 h-80 bg-emerald-500 rounded-full blur-[100px] opacity-60 -translate-y-1/2 translate-x-1/3"></div>
                    <div className="absolute bottom-0 left-0 w-64 h-64 bg-emerald-700/50 rounded-full blur-[80px] translate-y-1/2 -translate-x-1/4"></div>

                    <div className="relative z-10">
                        <div className="w-16 h-16 bg-white/10 backdrop-blur-md rounded-2xl flex items-center justify-center mx-auto mb-6 border border-white/20">
                            <AlertCircle className="w-8 h-8 text-white" />
                        </div>
                        <h3 className="text-3xl font-black mb-4 tracking-tight">{t('stillNeedHelp', 'Still need help?')}</h3>
                        <p className="text-emerald-50 text-lg mb-8 font-medium max-w-xl mx-auto leading-relaxed">
                            {t('stillNeedHelpDesc', 'Browse our community forums for peer advice, or contact our dedicated agricultural support team directly working 24/7 to assist you.')}
                        </p>
                        <button
                            onClick={() => navigate('/support')}
                            className="bg-white text-emerald-600 px-10 py-4 rounded-2xl font-black text-lg shadow-xl hover:shadow-2xl hover:-translate-y-1 transition-all active:scale-95 flex items-center gap-2 mx-auto"
                        >
                            <LifeBuoy className="w-5 h-5" />
                            {t('contactSupport', 'Contact Support')}
                        </button>
                    </div>
                </motion.div>
            </main>
        </div>
    );
};

export default HelpPage;
