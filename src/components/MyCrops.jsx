import { useTranslation } from 'react-i18next';
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Plus, Edit3, Trash2, ChevronLeft, 
  LayoutGrid, Package, Sprout, 
  TrendingUp, X, Loader2, ImageIcon, Upload, Image as LucideImage
} from 'lucide-react';

const MyCrops = ({ user }) => {
  const { t } = useTranslation();

  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({ 
    name: '', 
    price: '', 
    description: '', 
    quantity: '', 
    imageUrl: '', 
    id: null 
  });

  useEffect(() => { 
    if (user?.id || user?._id) {
        fetchProducts(); 
    }
  }, [user]);

  const fetchProducts = async () => {
    const userId = user?._id || user?.id;
    if (!userId) return;

    setLoading(true);
    try {
      const res = await fetch(`http://localhost:5001/api/products/farmer/${userId}`);
      const data = await res.json();
      setProducts(Array.isArray(data) ? data : []);
    } catch (err) { 
      console.error("Fetch error:", err); 
    } finally { 
      setLoading(false); 
    }
  };

  // Function to handle local file upload from PC
  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 1048576) { // 1MB Limit for Base64 storage
        alert("File is too large! Please upload an image under 1MB.");
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData({ ...formData, imageUrl: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const userId = user?._id || user?.id;
    const isEdit = !!formData.id;
    
    const payload = {
      name: formData.name,
      crop: formData.name,
      price: Number(formData.price),
      quantity: Number(formData.quantity),
      description: formData.description || "Fresh harvest from local fields.",
      imageUrl: formData.imageUrl, 
      farmerId: userId,
      farmerName: user?.email ? user.email.split('@')[0] : "Verified Farmer", 
      location: user?.location || "Kerala, India"
    };

    try {
      const url = isEdit 
        ? `http://localhost:5001/api/products/${formData.id}` 
        : 'http://localhost:5001/api/products';
        
      const response = await fetch(url, {
        method: isEdit ? 'PUT' : 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      const result = await response.json();

      if (response.ok) {
        fetchProducts();
        resetForm();
      } else {
        alert(`Error: ${result.message || 'Failed to save product'}`);
      }
    } catch (err) { 
      alert('Error connecting to server.'); 
    } finally { 
      setLoading(false); 
    }
  };

  const handleDelete = async (productId) => {
    if (!window.confirm("Are you sure you want to remove this crop?")) return;
    setLoading(true);
    try {
      const res = await fetch(`http://localhost:5001/api/products/${productId}`, {
        method: 'DELETE'
      });
      if (res.ok) fetchProducts();
    } catch (err) {
      alert("Delete failed.");
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setFormData({ name: '', price: '', description: '', quantity: '', imageUrl: '', id: null });
    setShowForm(false);
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex font-sans text-slate-900">
      <aside className="w-20 lg:w-64 bg-white border-r border-slate-200 hidden md:flex flex-col p-6">
        <div className="flex items-center gap-3 px-2 mb-10">
          <div className="w-10 h-10 bg-emerald-600 rounded-xl flex items-center justify-center text-white shadow-lg">
            <Sprout size={24} />
          </div>
          <span className="font-black text-xl tracking-tight hidden lg:block text-slate-800">{t("AgriPro")}</span>
        </div>
        
        <nav className="space-y-2">
          <button className="w-full flex items-center gap-4 p-3 bg-emerald-50 text-emerald-700 rounded-xl font-bold transition-all">
            <LayoutGrid size={20} /> <span className="hidden lg:block">{t("Inventory")}</span>
          </button>
          <button onClick={() => navigate('/')} className="w-full flex items-center gap-4 p-3 text-slate-400 hover:bg-slate-50 hover:text-slate-600 rounded-xl font-medium transition-all">
            <ChevronLeft size={20} /> <span className="hidden lg:block">{t("Exit Panel")}</span>
          </button>
        </nav>
      </aside>

      <main className="flex-1 p-4 md:p-10 overflow-y-auto">
        <header className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
          <div>
            <h1 className="text-3xl font-black text-slate-900">{t("Crop Inventory")}</h1>
            <p className="text-slate-500 font-medium tracking-tight">
                {t("Manage your marketplace listings for")} <span className="text-emerald-600">{user?.email || 'Farmer'}</span>
            </p>
          </div>
          <button 
            onClick={() => setShowForm(true)}
            className="bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-3.5 rounded-2xl font-bold flex items-center justify-center gap-2 transition-all shadow-xl shadow-emerald-100 active:scale-95"
          >
            <Plus size={20} /> {t("Add New Crop")}
          </button>
        </header>

        <section className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          <div className="bg-white p-6 rounded-[2rem] border border-slate-100 shadow-sm flex items-center gap-5">
            <div className="w-14 h-14 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center"><Package /></div>
            <div><p className="text-slate-400 text-xs font-black uppercase tracking-widest">{t("Active Listings")}</p><h4 className="text-2xl font-black">{products.length}</h4></div>
          </div>
          <div className="bg-white p-6 rounded-[2rem] border border-slate-100 shadow-sm flex items-center gap-5">
            <div className="w-14 h-14 bg-emerald-50 text-emerald-600 rounded-2xl flex items-center justify-center"><TrendingUp /></div>
            <div><p className="text-slate-400 text-xs font-black uppercase tracking-widest">{t("Seller Status")}</p><h4 className="text-2xl font-black text-emerald-600">{t("Verified")}</h4></div>
          </div>
        </section>

        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
          {products.map(product => (
            <div key={product._id} className="group bg-white p-6 rounded-[2.5rem] border border-slate-100 flex flex-col sm:flex-row items-center gap-6 hover:shadow-2xl transition-all duration-500 relative overflow-hidden">
              <div className="absolute top-0 left-0 w-2 h-full bg-emerald-500 opacity-0 group-hover:opacity-100 transition-opacity" />
              
              <div className="w-32 h-32 bg-slate-100 rounded-[2rem] flex items-center justify-center overflow-hidden border border-slate-100">
                {product.imageUrl ? (
                  <img src={product.imageUrl} alt={product.name} className="w-full h-full object-cover" />
                ) : (
                  <LucideImage className="text-slate-300" size={32} />
                )}
              </div>

              <div className="flex-1 text-center sm:text-left">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
                  <h3 className="text-xl font-black text-slate-800 tracking-tight">{product.name}</h3>
                  <span className="bg-emerald-100 text-emerald-700 px-4 py-1 rounded-full text-sm font-black">
                    ₹{product.price} / qtl
                  </span>
                </div>
                <p className="text-slate-400 text-sm mb-4 line-clamp-1">{product.description || "Fresh harvest listing."}</p>
                <div className="flex items-center justify-center sm:justify-start gap-3">
                  <button 
                    onClick={() => {
                        setFormData({ 
                            name: product.name, 
                            price: product.price, 
                            description: product.description, 
                            quantity: product.quantity, 
                            imageUrl: product.imageUrl || '',
                            id: product._id 
                        });
                        setShowForm(true);
                    }} 
                    className="p-3 bg-slate-50 hover:bg-emerald-50 text-slate-400 hover:text-emerald-600 rounded-xl transition-all"
                  >
                    <Edit3 size={18}/>
                  </button>
                  <button 
                    onClick={() => handleDelete(product._id)}
                    className="p-3 bg-slate-50 hover:bg-red-50 text-slate-400 hover:text-red-600 rounded-xl transition-all"
                  >
                    <Trash2 size={18}/>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {loading && (
          <div className="fixed inset-0 bg-white/60 backdrop-blur-sm z-50 flex items-center justify-center">
            <Loader2 className="animate-spin text-emerald-600" size={48} />
          </div>
        )}
      </main>

      {showForm && (
        <div className="fixed inset-0 z-[60] flex items-center justify-end">
          <div className="absolute inset-0 bg-slate-900/20 backdrop-blur-md" onClick={resetForm} />
          <div className="relative w-full max-w-md h-full bg-white shadow-2xl p-8 flex flex-col animate-in slide-in-from-right duration-300 overflow-y-auto">
            <button onClick={resetForm} className="self-end p-2 hover:bg-slate-100 rounded-full mb-8"><X /></button>
            <h2 className="text-3xl font-black mb-2">{formData.id ? 'Edit Crop' : 'New Listing'}</h2>
            <p className="text-slate-500 mb-8">{t("Upload an image from your computer or use a URL.")}</p>
            
            <form onSubmit={handleSubmit} className="space-y-6 pb-10">
              {/* IMAGE UPLOAD SECTION */}
              <div className="space-y-4">
                <label className="text-xs font-black uppercase text-slate-400 block">{t("Crop Image")}</label>
                
                {formData.imageUrl ? (
                  <div className="relative w-full h-40 rounded-2xl overflow-hidden group border-2 border-emerald-100">
                    <img src={formData.imageUrl} className="w-full h-full object-cover" alt="Preview" />
                    <button 
                      type="button"
                      onClick={() => setFormData({...formData, imageUrl: ''})}
                      className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <X size={16} />
                    </button>
                  </div>
                ) : (
                  <div className="flex flex-col gap-3">
                    {/* PC Upload Option */}
                    <label className="w-full h-32 border-2 border-dashed border-slate-200 rounded-2xl flex flex-col items-center justify-center gap-2 cursor-pointer hover:border-emerald-400 hover:bg-emerald-50/30 transition-all">
                      <Upload size={24} className="text-slate-400" />
                      <span className="text-xs font-bold text-slate-500">{t("Upload from PC")}</span>
                      <input type="file" accept="image/*" className="hidden" onChange={handleFileUpload} />
                    </label>
                    
                    <div className="flex items-center gap-2">
                      <div className="h-[1px] bg-slate-100 flex-1"></div>
                      <span className="text-[10px] font-black text-slate-300 uppercase">{t("OR")}</span>
                      <div className="h-[1px] bg-slate-100 flex-1"></div>
                    </div>

                    {/* URL Option */}
                    <div className="relative">
                      <ImageIcon size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                      <input 
                        placeholder={t("Paste image URL instead")} 
                        className="w-full bg-slate-50 border-2 border-slate-50 pl-11 pr-4 py-4 rounded-2xl focus:border-emerald-500 outline-none text-sm" 
                        value={formData.imageUrl} 
                        onChange={e => setFormData({...formData, imageUrl: e.target.value})} 
                      />
                    </div>
                  </div>
                )}
              </div>

              <div>
                <label className="text-xs font-black uppercase text-slate-400 mb-2 block">{t("Crop Name")}</label>
                <input required placeholder={t("e.g. Basmati Rice")} className="w-full bg-slate-50 border-2 border-slate-50 p-4 rounded-2xl focus:border-emerald-500 focus:bg-white outline-none transition-all" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-black uppercase text-slate-400 mb-2 block">{t("Price (₹/qtl)")}</label>
                  <input type="number" required placeholder="₹" className="w-full bg-slate-50 border-2 border-slate-50 p-4 rounded-2xl focus:border-emerald-500 focus:bg-white outline-none transition-all" value={formData.price} onChange={e => setFormData({...formData, price: e.target.value})} />
                </div>
                <div>
                  <label className="text-xs font-black uppercase text-slate-400 mb-2 block">{t("Quantity (qtl)")}</label>
                  <input type="number" required placeholder={t("Qty")} className="w-full bg-slate-50 border-2 border-slate-50 p-4 rounded-2xl focus:border-emerald-500 focus:bg-white outline-none transition-all" value={formData.quantity} onChange={e => setFormData({...formData, quantity: e.target.value})} />
                </div>
              </div>

              <div>
                <label className="text-xs font-black uppercase text-slate-400 mb-2 block">{t("Description")}</label>
                <textarea rows="3" className="w-full bg-slate-50 border-2 border-slate-50 p-4 rounded-2xl focus:border-emerald-500 focus:bg-white outline-none transition-all resize-none" value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})} />
              </div>
              <button 
                disabled={loading}
                className="w-full py-5 bg-emerald-600 text-white font-black rounded-2xl shadow-lg hover:bg-emerald-700 transition-all mt-4 disabled:opacity-50"
              >
                {formData.id ? 'UPDATE LISTING' : 'PUBLISH TO MARKETPLACE'}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyCrops;