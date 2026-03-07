import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Landmark, FileText, Bell, Zap, LogOut, ShieldCheck,
    Search, ChevronRight, LayoutDashboard, Clock, Calendar,
    CloudSun, Droplets, Wind, RefreshCw, User
} from 'lucide-react';

const AdminFrontPage = ({ onLogout }) => {
    const navigate = useNavigate();
    const [currentTime, setCurrentTime] = useState(new Date());
    const [isScrolled, setIsScrolled] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");

    // Weather State
    const [weatherData, setWeatherData] = useState({ temp: '--', humidity: '--', wind: '--' });
    const [loadingWeather, setLoadingWeather] = useState(true);

    const fetchLiveWeather = React.useCallback(async (lat, lon) => {
        setLoadingWeather(true);
        try {
            const response = await fetch(
                `http://localhost:5001/api/support/weather?lat=${lat}&lon=${lon}`
            );
            const json = await response.json();
            if (json.success) {
                setWeatherData({
                    temp: Math.round(json.data.temp),
                    humidity: json.data.humidity + '%',
                    wind: Math.round(json.data.wind) + ' km/h'
                });
            }
        } catch (error) {
            console.error("Admin weather fetch failed", error);
            setWeatherData({ temp: '24', humidity: '62%', wind: '12 km/h' });
        } finally {
            setLoadingWeather(false);
        }
    }, []);

    useEffect(() => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (pos) => fetchLiveWeather(pos.coords.latitude, pos.coords.longitude),
                () => fetchLiveWeather(28.6139, 77.2090)
            );
        }
    }, [fetchLiveWeather]);

    useEffect(() => {
        const timer = setInterval(() => setCurrentTime(new Date()), 1000);
        return () => clearInterval(timer);
    }, []);

    useEffect(() => {
        const handleScroll = () => setIsScrolled(window.scrollY > 20);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const hour = currentTime.getHours();
    const greeting = hour < 12 ? 'Good Morning' : hour < 18 ? 'Good Afternoon' : 'Good Evening';

    const menuItems = [
        { title: 'Manage Schemes', icon: <Landmark />, desc: 'Add or edit govt schemes', color: 'bg-orange-600', path: '/schemes/list', badge: 'Core' },
        { title: 'Farming Tips', icon: <Zap />, desc: 'Update expert advice', color: 'bg-yellow-600', path: '/schemes/tips' },
        { title: 'Latest Updates', icon: <Bell />, desc: 'Broadcast news', color: 'bg-blue-600', path: '/schemes/updates', badge: 'Live' },
        { title: 'Finance Data', icon: <FileText />, desc: 'Manage financial records', color: 'bg-emerald-600', path: '/schemes/finance' },
        { title: 'Support Tickets', icon: <ShieldCheck />, desc: 'Manage disputes & queries', color: 'bg-rose-600', path: '/admin-support', badge: 'Action Req' },
    ];

    const filteredItems = menuItems.filter(item =>
        item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.desc.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className="min-h-screen bg-[#F8FAFC] text-slate-900 font-sans selection:bg-emerald-100">
            {/* Background Gradients */}
            <div className="fixed inset-0 overflow-hidden pointer-events-none">
                <div className="absolute -top-[10%] -left-[10%] w-[40%] h-[40%] rounded-full bg-emerald-100/50 blur-[120px]" />
                <div className="absolute top-[20%] -right-[5%] w-[30%] h-[30%] rounded-full bg-blue-100/50 blur-[100px]" />
            </div>

            {/* Navbar */}
            <nav className={`sticky top-0 z-[100] transition-all duration-300 px-6 py-4 ${isScrolled ? 'bg-white/80 backdrop-blur-xl border-b border-slate-200 shadow-md' : 'bg-transparent'}`}>
                <div className="max-w-7xl mx-auto flex justify-between items-center">
                    <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-slate-900 rounded-xl flex items-center justify-center shadow-lg shadow-slate-900/20">
                            <ShieldCheck className="text-white w-6 h-6" />
                        </div>
                        <span className="text-2xl font-black tracking-tight text-slate-900">AgriWise <span className="text-emerald-600">Admin</span></span>
                    </motion.div>

                    <div className="flex items-center gap-4">
                        <button onClick={() => navigate('/profile')} className="p-2.5 border border-slate-200 hover:bg-emerald-50 hover:border-emerald-200 text-slate-500 hover:text-emerald-600 rounded-full transition-all shadow-sm" title="Profile">
                            <User className="w-5 h-5" />
                        </button>
                        <button onClick={onLogout} className="p-2.5 border border-slate-200 hover:bg-red-50 hover:border-red-200 text-slate-500 hover:text-red-600 rounded-full transition-all shadow-sm">
                            <LogOut className="w-5 h-5" />
                        </button>
                    </div>
                </div>
            </nav>

            <main className="relative z-10 max-w-7xl mx-auto px-6 pt-8 pb-32">
                {/* Header Section */}
                <header className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-12">
                    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
                        <div className="flex items-center gap-2 mb-3">
                            <span className="px-3 py-1 rounded-lg bg-emerald-600 text-white text-[10px] font-black tracking-widest uppercase shadow-sm">Admin Portal</span>
                            <span className="text-slate-500 text-xs font-bold">{currentTime.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</span>
                        </div>
                        <h1 className="text-5xl md:text-7xl font-black text-slate-900 tracking-tighter">
                            {greeting}, <br /><span className="text-emerald-600">Admin</span>
                        </h1>
                    </motion.div>

                    <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="bg-white border-2 border-slate-200 rounded-[2.5rem] p-1.5 shadow-xl shadow-slate-200/60">
                        <div className="bg-slate-50/50 rounded-[2.3rem] p-6 flex flex-wrap items-center gap-8 md:gap-12">
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 bg-white border border-slate-200 text-indigo-600 rounded-2xl flex items-center justify-center shadow-sm">
                                    <Clock className="w-6 h-6" />
                                </div>
                                <div>
                                    <p className="text-[10px] uppercase font-black text-slate-400 tracking-widest mb-0.5">Local Time</p>
                                    <p className="text-xl font-black text-slate-800 tabular-nums">
                                        {currentTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                    </p>
                                </div>
                            </div>
                            <div className="hidden md:block w-px h-10 bg-slate-200" />
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 bg-white border border-slate-200 text-orange-500 rounded-2xl flex items-center justify-center shadow-sm">
                                    <CloudSun className="w-6 h-6" />
                                </div>
                                <div>
                                    <p className="text-[10px] uppercase font-black text-slate-400 tracking-widest mb-0.5">Temp</p>
                                    <p className="text-xl font-black text-slate-800 italic">
                                        {loadingWeather ? <RefreshCw className="w-5 h-5 animate-spin text-slate-300" /> : `${weatherData.temp}°C`}
                                    </p>
                                </div>
                            </div>
                            <div className="hidden md:block w-px h-10 bg-slate-200" />
                            <div className="flex items-center gap-6">
                                <div className="flex flex-col gap-1">
                                    <div className="flex items-center gap-2 text-blue-600">
                                        <Droplets size={14} strokeWidth={3} />
                                        <span className="text-sm font-black text-slate-800">{weatherData.humidity}</span>
                                    </div>
                                    <div className="flex items-center gap-2 text-sky-600">
                                        <Wind size={14} strokeWidth={3} />
                                        <span className="text-sm font-black text-slate-800">{weatherData.wind}</span>
                                    </div>
                                </div>
                                <button onClick={() => navigator.geolocation.getCurrentPosition((pos) => fetchLiveWeather(pos.coords.latitude, pos.coords.longitude))} className="p-3 bg-slate-900 text-white rounded-2xl hover:bg-emerald-600 transition-all shadow-lg active:scale-95">
                                    <RefreshCw size={18} className={loadingWeather ? "animate-spin" : ""} />
                                </button>
                            </div>
                        </div>
                    </motion.div>
                </header>

                {/* Hero Card - SLIDING ADMIN UPDATES */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    whileHover={{ y: -5 }}
                    className="relative overflow-hidden rounded-[2.5rem] bg-slate-900 p-10 md:p-16 text-white shadow-2xl shadow-slate-900/30 mb-12 border border-slate-800"
                >
                    <div className="relative z-10 max-w-2xl">
                        <div className="flex items-center gap-3 mb-6">
                            <div className="relative flex h-3 w-3">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
                            </div>
                            <span className="text-emerald-400 font-black text-xs uppercase tracking-[0.3em]">System Status</span>
                        </div>

                        <h2 className="text-4xl md:text-6xl font-black leading-tight mb-4">
                            All systems are <br />
                            <span className="text-emerald-400 italic underline decoration-white/20 underline-offset-8">
                                operational
                            </span>
                            .
                        </h2>

                        <p className="text-slate-400 text-lg font-medium mb-8 max-w-lg">
                            User activity is normal. Support ticket volume is low.
                        </p>

                        <button onClick={() => navigate('/admin-support')} className="bg-emerald-500 hover:bg-emerald-400 text-white font-black px-10 py-4 rounded-2xl transition-all flex items-center gap-3 group shadow-xl shadow-emerald-500/20 active:scale-95">
                            Check Reports
                            <ChevronRight className="group-hover:translate-x-1 transition-transform" />
                        </button>
                    </div>

                    <div className="absolute top-0 right-0 w-full h-full opacity-30 pointer-events-none">
                        <div className="absolute -right-20 -top-20 w-96 h-96 bg-emerald-500 rounded-full blur-[120px]" />
                    </div>
                    <ShieldCheck className="absolute -right-10 -bottom-10 w-64 h-64 text-emerald-500/10 rotate-12" />
                </motion.div>

                {/* Search Bar */}
                <div className="relative mb-12 group">
                    <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-emerald-600 transition-colors" />
                    <input
                        type="text"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder="Search admin modules..."
                        className="w-full bg-white border-2 border-slate-200 rounded-[2rem] py-6 px-16 shadow-lg shadow-slate-200/40 focus:shadow-emerald-500/10 focus:border-emerald-500 transition-all outline-none text-lg font-medium"
                    />
                </div>

                {/* Grid Menu */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    <AnimatePresence mode="popLayout">
                        {filteredItems.length > 0 ? (
                            filteredItems.map((item) => (
                                <motion.button
                                    key={item.title}
                                    layout
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.9 }}
                                    whileHover={{ y: -5 }}
                                    whileTap={{ scale: 0.98 }}
                                    transition={{ duration: 0.2 }}
                                    onClick={() => navigate(item.path)}
                                    className="group relative bg-white border-2 border-slate-200 p-8 rounded-[2.5rem] text-left hover:border-emerald-500 hover:shadow-2xl hover:shadow-emerald-500/5 transition-all duration-300"
                                >
                                    <div className={`${item.color} w-16 h-16 rounded-2xl flex items-center justify-center text-white mb-6 shadow-lg shadow-slate-200 group-hover:scale-110 transition-transform`}>
                                        {React.cloneElement(item.icon, { size: 32 })}
                                    </div>
                                    {item.badge && (
                                        <span className="absolute top-8 right-8 bg-slate-900 text-white text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-tighter shadow-xl">
                                            {item.badge}
                                        </span>
                                    )}
                                    <h3 className="text-2xl font-black text-slate-900 mb-2">{item.title}</h3>
                                    <p className="text-slate-500 font-bold leading-relaxed">{item.desc}</p>
                                    <div className="mt-8 flex items-center gap-2 text-emerald-600 font-black text-sm opacity-0 group-hover:opacity-100 transition-all transform translate-y-2 group-hover:translate-y-0">
                                        Open Module <ChevronRight size={16} />
                                    </div>
                                </motion.button>
                            ))
                        ) : (
                            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="col-span-full py-20 text-center">
                                <div className="bg-slate-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4 text-slate-400">
                                    <Search size={32} />
                                </div>
                                <h3 className="text-2xl font-black text-slate-800">No modules found</h3>
                                <p className="text-slate-500">We couldn't find anything matching "{searchQuery}"</p>
                                <button onClick={() => setSearchQuery("")} className="mt-6 text-orange-600 font-black underline underline-offset-4">Clear search</button>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </main>
        </div>
    );
};

export default AdminFrontPage;
