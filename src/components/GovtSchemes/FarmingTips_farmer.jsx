import React, { useState, useEffect } from 'react';
import { Sprout, Droplets, Sun, Bug, ArrowLeft, Loader2, Lightbulb, Thermometer, Wind, Target } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const FarmingTips = () => {
  const navigate = useNavigate();
  const [advisory, setAdvisory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('advisory');

  // Hardcoded Expert Tips Data
  const hardcodedTips = [
    {
      id: 1,
      title: "Crop Rotation Strategy",
      desc: "Avoid planting the same crop family in the same spot two years in a row to prevent soil nutrient depletion and pest buildup.",
      icon: <Sprout className="text-emerald-600" />,
      tag: "Soil Health",
      color: "bg-emerald-50"
    },
    {
      id: 2,
      title: "Early Morning Irrigation",
      desc: "Water your crops between 5:00 AM and 9:00 AM. This reduces evaporation and prevents fungal growth that occurs when leaves stay wet overnight.",
      icon: <Droplets className="text-blue-600" />,
      tag: "Watering",
      color: "bg-blue-50"
    },
    {
      id: 3,
      title: "Natural Pest Repellents",
      desc: "Plant Marigolds or Neem trees near your main crops. They act as natural deterrents for aphids and nematodes without using chemicals.",
      icon: <Bug className="text-red-600" />,
      tag: "Protection",
      color: "bg-red-50"
    },
    {
      id: 4,
      title: "Mulching Benefits",
      desc: "Apply a layer of organic matter (straw or dried leaves) around the base of plants to retain moisture and suppress weed growth.",
      icon: <Wind className="text-amber-600" />,
      tag: "Maintenance",
      color: "bg-amber-50"
    },
    {
      id: 5,
      title: "NPK Balance Check",
      desc: "Ensure your fertilizer has the right Nitrogen, Phosphorus, and Potassium ratio for the specific growth stage of your crop.",
      icon: <Target className="text-purple-600" />,
      tag: "Fertilizer",
      color: "bg-purple-50"
    }
  ];

  useEffect(() => {
    const fetchAdvisory = async () => {
      try {
        const res = await axios.get('http://localhost:5001/api/farming-tips');
        setAdvisory(Array.isArray(res.data) ? res.data : []);
      } catch (err) {
        console.error("Error fetching advisory");
      } finally {
        setLoading(false);
      }
    };
    fetchAdvisory();
  }, []);

  const getAdvisoryIcon = (type) => {
    switch (type) {
      case 'water': 
        return <Droplets />; // Show water icon
      case 'sun': 
        return <Sun />; // Show sun icon
      case 'bug': 
        return <Bug />; // Show pest icon
      default: 
        return <Sprout />; // Default icon if none matches
    }
  };

  return ( // JSX UI starts here

    <div className="min-h-screen bg-white p-6 md:p-10 font-sans">
      {/* Full screen container with padding */}

      <div className="max-w-4xl mx-auto">
        <button 
          onClick={() => navigate('/govt-schemes')} 
          className="flex items-center gap-2 mb-6 text-slate-500 font-bold hover:text-slate-800 transition-colors"
        >
          <ArrowLeft size={20} /> Back to Hub
        </button>

        <h1 className="text-4xl font-black text-slate-900 mb-8 tracking-tight">Farming Insights</h1>

        {/* Tab Switcher */}
        <div className="flex gap-2 mb-8 bg-gray-100 p-1 rounded-2xl w-fit">
          <button 
            onClick={() => setActiveTab('advisory')}
            className={`px-6 py-2 rounded-xl font-bold transition-all ${activeTab === 'advisory' ? 'bg-white text-emerald-600 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
          >
            Live Advisory
          </button>
          <button 
            onClick={() => setActiveTab('tips')}
            className={`px-6 py-2 rounded-xl font-bold transition-all ${activeTab === 'tips' ? 'bg-white text-emerald-600 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
          >
            Expert Tips
          </button>
        </div>

        {loading && activeTab === 'advisory' ? (
          <div className="text-center py-20">
            <Loader2 className="animate-spin mx-auto text-emerald-600" size={32} />
          </div>
        ) : (
          <div className="grid gap-4">
            {activeTab === 'advisory' ? (
              advisory.length > 0 ? advisory.map((item) => (
                <div key={item._id} className="flex items-start gap-4 p-6 rounded-3xl bg-gray-50 border border-gray-100 shadow-sm">
                  <div className={`p-3 rounded-2xl bg-white shadow-inner ${item.color || 'text-emerald-600'}`}>
                    {getAdvisoryIcon(item.iconType)}
                  </div>
                  <div>
                    <h2 className="font-bold text-xl text-slate-900">{item.title}</h2>
                    <p className="text-gray-600 mt-1">{item.desc}</p>
                  </div>
                </div>
              )) : <p className="text-center text-slate-400 py-10">No advisory data found.</p>
            ) : (
              // Rendering Hardcoded Tips
              hardcodedTips.map((tip) => (
                <div key={tip.id} className="group relative overflow-hidden flex items-start gap-5 p-6 rounded-3xl border border-gray-100 hover:border-emerald-200 hover:shadow-lg transition-all bg-white">
                  <div className={`absolute top-0 left-0 w-1 h-full ${tip.color.replace('bg-', 'bg-')}`} style={{backgroundColor: 'currentColor'}} />
                  <div className={`p-4 rounded-2xl ${tip.color}`}>
                    {tip.icon}
                  </div>
                  <div>
                    <div className="flex items-center gap-3 mb-1">
                      <h2 className="font-bold text-xl text-slate-900">{tip.title}</h2>
                      <span className="text-[10px] uppercase font-black tracking-widest bg-gray-100 px-2 py-0.5 rounded text-slate-500">
                        {tip.tag}
                      </span>
                    </div>
                    <p className="text-slate-600 leading-relaxed">{tip.desc}</p>
                  </div>
                </div>
              ))
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default FarmingTips; 
// Export component so it can be used in routing