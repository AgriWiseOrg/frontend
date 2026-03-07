import React, { useState, useEffect } from 'react';
import { Bell, Calendar, ArrowLeft, ExternalLink, Loader2, Globe, Radio, Rss } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const LatestUpdates = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('local');
  const [localUpdates, setLocalUpdates] = useState([]);
  const [liveUpdates, setLiveUpdates] = useState([]);
  const [loadingLocal, setLoadingLocal] = useState(true);
  const [loadingLive, setLoadingLive] = useState(false);

  // 1. Fetch Local Updates from your Node.js Backend
  useEffect(() => {
    const fetchLocal = async () => {
      try {
        const res = await axios.get('http://localhost:5001/api/latest-updates');
        setLocalUpdates(Array.isArray(res.data) ? res.data : []);
      } catch (err) { 
        console.error("Error fetching local updates:", err); 
      } finally { 
        setLoadingLocal(false); 
      }
    };
    fetchLocal();
  }, []);

  // 2. Fetch REAL Live Feed from PIB (Ministry of Agriculture)
  useEffect(() => {
    if (activeTab === 'live' && liveUpdates.length === 0) {
      setLoadingLive(true);
      
      // PIB RSS for Ministry of Agriculture (Lang=1: English, Regid=3: Agriculture)
      const pibRssUrl = "https://pib.gov.in/RssMain.aspx?ModId=6&Lang=1&Regid=3";
      // We use rss2json to bypass CORS and get a clean JSON object
      const proxyUrl = `https://api.rss2json.com/v1/api.json?rss_url=${encodeURIComponent(pibRssUrl)}`;

      axios.get(proxyUrl)
        .then((res) => {
          if (res.data.status === 'ok') {
            const formattedNews = res.data.items.map((item) => ({
              title: item.title,
              source: "PIB India",
              time: new Date(item.pubDate).toLocaleDateString('en-IN', {
                day: '2-digit',
                month: 'short',
                year: 'numeric'
              }),
              link: item.link
            }));
            setLiveUpdates(formattedNews);
          }
        })
        .catch((err) => {
          console.error("Error fetching PIB updates:", err);
        })
        .finally(() => setLoadingLive(false));
    }
  }, [activeTab, liveUpdates.length]);

  const govtLinks = [
    { name: "PM Kisan Samman Nidhi", url: "https://pmkisan.gov.in/", color: "bg-green-600" },
    { name: "eNAM (National Agriculture Market)", url: "https://www.enam.gov.in/", color: "bg-blue-600" },
    { name: "Soil Health Card", url: "https://soilhealth.dac.gov.in/", color: "bg-amber-600" },
    { name: "Pradhan Mantri Fasal Bima Yojana", url: "https://pmfby.gov.in/", color: "bg-indigo-600" },
    { name: "Agri Cooperatives", url: "https://cooperation.gov.in/", color: "bg-teal-600" },
    { name: "Kisan Call Center", url: "https://dackkms.gov.in/", color: "bg-red-600" }
  ];

  return (
    <div className="min-h-screen bg-[#F8FAFC] p-4 md:p-8 font-sans">
      <div className="max-w-4xl mx-auto">
        {/* Navigation & Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <div>
            <button onClick={() => navigate('/govt-schemes')} className="flex items-center gap-2 mb-3 text-slate-500 hover:text-orange-600 font-bold transition-colors">
              <ArrowLeft size={20} /> Back to Hub
            </button>
            <h1 className="text-4xl font-black text-slate-900 flex items-center gap-3">
              <Bell className="text-orange-500 fill-orange-500" /> Latest Updates
            </h1>
            <p className="text-slate-500 mt-1">Official announcements from PIB & Ministry of Agriculture.</p>
          </div>

          {/* TABS */}
          <div className="flex bg-white p-1.5 rounded-2xl shadow-sm border border-slate-200">
            <button
              onClick={() => setActiveTab('local')}
              className={`px-6 py-2.5 rounded-xl font-bold text-sm transition-all flex items-center gap-2 ${activeTab === 'local' ? 'bg-orange-500 text-white shadow-md' : 'text-slate-500 hover:bg-slate-50'}`}
            >
              <Bell size={16} /> AgriWise
            </button>
            <button
              onClick={() => setActiveTab('live')}
              className={`px-6 py-2.5 rounded-xl font-bold text-sm transition-all flex items-center gap-2 ${activeTab === 'live' ? 'bg-orange-500 text-white shadow-md' : 'text-slate-500 hover:bg-slate-50'}`}
            >
              <Rss size={16} /> Live Feed
            </button>
            <button
              onClick={() => setActiveTab('links')}
              className={`px-6 py-2.5 rounded-xl font-bold text-sm transition-all flex items-center gap-2 ${activeTab === 'links' ? 'bg-orange-500 text-white shadow-md' : 'text-slate-500 hover:bg-slate-50'}`}
            >
              <Globe size={16} /> Gov Portals
            </button>
          </div>
        </div>

        {/* CONTENT AREA */}
        <div className="min-h-[400px]">

          {/* TAB 1: LOCAL UPDATES */}
          {activeTab === 'local' && (
            <div className="space-y-4">
              {loadingLocal ? (
                <div className="text-center p-20"><Loader2 className="animate-spin mx-auto text-orange-500 w-10 h-10" /></div>
              ) : localUpdates.length === 0 ? (
                <div className="text-center p-10 text-slate-400 font-bold">No internal updates found.</div>
              ) : (
                localUpdates.map((item) => (
                  <div key={item._id} className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100 hover:border-orange-200 hover:shadow-md transition-all group">
                    <div className="flex justify-between items-start mb-3">
                      <span className="text-[10px] font-black uppercase px-3 py-1 bg-orange-50 text-orange-600 rounded-full tracking-wider">
                        {item.tag || 'General'}
                      </span>
                      <span className="text-xs text-slate-400 font-bold flex items-center gap-1">
                        <Calendar size={12} /> {item.date ? new Date(item.date).toLocaleDateString() : 'Just Now'}
                      </span>
                    </div>
                    <h3 className="text-xl font-bold text-slate-800 mb-2 group-hover:text-orange-600 transition-colors">{item.title}</h3>
                    <p className="text-slate-500 text-sm leading-relaxed mb-4">{item.desc}</p>
                    <button className="text-orange-600 text-sm font-bold flex items-center gap-1 hover:gap-2 transition-all">
                      Read Full Details <ExternalLink size={14} />
                    </button>
                  </div>
                ))
              )}
            </div>
          )}

          {/* TAB 2: LIVE FEED (REAL GOVT API) */}
          {activeTab === 'live' && (
            <div className="space-y-4">
              {loadingLive ? (
                <div className="text-center p-20">
                  <Loader2 className="animate-spin mx-auto text-orange-500 w-10 h-10 mb-4" />
                  <p className="text-slate-400 font-bold animate-pulse">Fetching official PIB releases...</p>
                </div>
              ) : (
                liveUpdates.map((news, idx) => (
                  <div key={idx} className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100 relative overflow-hidden">
                    <div className="absolute top-0 left-0 w-1 h-full bg-red-500" />
                    <div className="flex justify-between items-start mb-2">
                      <span className="text-xs font-bold text-red-500 flex items-center gap-1">
                        <Radio size={12} className="animate-pulse" /> OFFICIAL RELEASE
                      </span>
                      <span className="text-xs text-slate-400 font-bold">{news.time}</span>
                    </div>
                    <h3 className="text-lg font-bold text-slate-900 mb-1 leading-snug">{news.title}</h3>
                    <div className="flex justify-between items-end mt-4">
                      <span className="text-[10px] text-slate-400 font-black uppercase tracking-widest">Source: {news.source}</span>
                      <a 
                        href={news.link} 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="p-2 bg-slate-50 rounded-full hover:bg-orange-100 hover:text-orange-600 text-slate-600 transition-colors"
                      >
                        <ExternalLink size={16} />
                      </a>
                    </div>
                  </div>
                ))
              )}
            </div>
          )}

          {/* TAB 3: GOVT LINKS */}
          {activeTab === 'links' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {govtLinks.map((link, idx) => (
                <a
                  key={idx}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative overflow-hidden bg-white p-6 rounded-3xl shadow-sm border border-slate-100 hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
                >
                  <div className={`absolute top-0 right-0 w-24 h-24 ${link.color} opacity-10 rounded-bl-[4rem] group-hover:scale-150 transition-transform duration-500`} />

                  <div className={`w-12 h-12 ${link.color} rounded-2xl flex items-center justify-center text-white mb-4 shadow-lg`}>
                    <Globe size={24} />
                  </div>

                  <h3 className="text-lg font-bold text-slate-800 mb-1 pr-8 group-hover:text-slate-900">
                    {link.name}
                  </h3>
                  <div className="flex items-center gap-2 text-xs font-bold text-slate-400 mt-4 group-hover:text-blue-600 transition-colors">
                    Visit Official Portal <ExternalLink size={12} />
                  </div>
                </a>
              ))}
            </div>
          )}

        </div>
      </div>
    </div>
  );
};

export default LatestUpdates; // Export component