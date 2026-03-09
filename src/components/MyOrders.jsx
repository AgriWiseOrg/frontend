import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Package, Clock, CheckCircle, Truck, XCircle, Search, Calendar, User, ArrowLeft, ArrowRight, ShoppingBag } from 'lucide-react';

const MyOrders = ({ user }) => {
    const navigate = useNavigate();
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState("");

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                if (!user) {
                    setLoading(false);
                    return;
                }

                const response = await fetch(`http://localhost:5001/api/orders/buyer/${user.email}`);
                if (response.ok) {
                    const data = await response.json();
                    setOrders(data);
                }
            } catch (error) {
                console.error("Failed to fetch buyer orders:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchOrders();
    }, [user]);

    const getStatusColor = (status) => {
        switch (status) {
            case 'Pending': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
            case 'Processing': return 'bg-blue-100 text-blue-800 border-blue-200';
            case 'Shipped': return 'bg-purple-100 text-purple-800 border-purple-200';
            case 'Delivered': return 'bg-emerald-100 text-emerald-800 border-emerald-200';
            case 'Cancelled': return 'bg-red-100 text-red-800 border-red-200';
            default: return 'bg-slate-100 text-slate-800 border-slate-200';
        }
    };

    const getStatusIcon = (status) => {
        switch (status) {
            case 'Pending': return <Clock size={16} className="text-yellow-600" />;
            case 'Processing': return <Package size={16} className="text-blue-600" />;
            case 'Shipped': return <Truck size={16} className="text-purple-600" />;
            case 'Delivered': return <CheckCircle size={16} className="text-emerald-600" />;
            case 'Cancelled': return <XCircle size={16} className="text-red-600" />;
            default: return <Clock size={16} />;
        }
    };

    const filteredOrders = orders.filter(order =>
        order.farmerEmail.toLowerCase().includes(searchQuery.toLowerCase()) ||
        order._id.includes(searchQuery) ||
        order.items.some(item => item.crop.toLowerCase().includes(searchQuery.toLowerCase()))
    );

    if (loading) {
        return <div className="min-h-screen flex items-center justify-center bg-slate-50 text-emerald-700 font-bold">Loading Orders...</div>;
    }

    if (!user) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center bg-slate-50 p-6 text-center">
                <ShoppingBag size={64} className="text-slate-300 mb-6" />
                <h2 className="text-2xl font-black text-slate-800 mb-2">Access Denied</h2>
                <p className="text-slate-500 mb-8 max-w-md">Please log in to view your order history.</p>
                <button onClick={() => navigate(-1)} className="bg-emerald-600 text-white font-bold py-3 px-8 rounded-xl shadow-lg hover:bg-emerald-700 transition-all flex items-center gap-2">
                    <ArrowLeft size={20} /> Go Back
                </button>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#F8FAFC] pb-24 text-slate-900 font-sans selection:bg-emerald-100">
            {/* Header */}
            <div className="bg-emerald-700 text-white pt-8 pb-32 px-6">
                <div className="max-w-7xl mx-auto">
                    {/* Header Options */}
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-8">
                        <div>
                            <button onClick={() => navigate('/')} className="text-emerald-100 hover:text-white font-bold mb-6 flex items-center gap-2 transition-all hover:-translate-x-1 group">
                                <ArrowLeft size={18} /> Back to Dashboard
                            </button>
                            <h1 className="text-4xl md:text-5xl font-black tracking-tighter flex items-center gap-4 text-white">
                                My Orders
                                <span className="bg-emerald-800/60 text-emerald-100 text-sm font-bold px-3 py-1 rounded-full border border-emerald-600/40 shadow-sm">
                                    {orders.length} Total
                                </span>
                            </h1>
                            <p className="text-emerald-50 font-medium mt-3">Track your purchases and view order history.</p>
                        </div>

                        <div className="relative w-full md:w-96 group">
                            <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-emerald-600 transition-colors" />
                            <input
                                type="text"
                                placeholder="Search by ID, Farmer, or Crop..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full bg-white border-2 border-transparent rounded-[2rem] py-4 pl-14 pr-6 shadow-lg focus:shadow-emerald-500/20 focus:border-emerald-400 transition-all outline-none font-medium text-slate-700"
                            />
                        </div>
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className="max-w-7xl mx-auto px-6 -mt-16 relative z-10">
                {/* Orders List */}
                {filteredOrders.length === 0 ? (
                    <div className="bg-white rounded-[2.5rem] p-16 text-center shadow-xl shadow-slate-200/40 border border-slate-100 flex flex-col items-center">
                        <div className="w-24 h-24 bg-emerald-50 rounded-[2rem] flex items-center justify-center text-emerald-500 mb-6 rotate-3">
                            <ShoppingBag size={48} />
                        </div>
                        <h3 className="text-3xl font-black text-slate-800 mb-3 tracking-tight">No orders found</h3>
                        <p className="text-slate-500 font-medium max-w-sm mb-8 text-lg">You haven't placed any orders yet, or no orders match your search.</p>
                        <button onClick={() => navigate('/marketplace')} className="bg-emerald-600 text-white font-bold py-4 px-10 rounded-[1.5rem] shadow-xl shadow-emerald-600/20 hover:bg-emerald-700 hover:-translate-y-1 transition-all flex items-center gap-3">
                            Go to Marketplace
                        </button>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 gap-8">
                        {filteredOrders.map((order) => (
                            <div key={order._id} className="bg-white rounded-[2.5rem] p-8 shadow-xl shadow-slate-200/40 border border-slate-100 hover:shadow-2xl hover:shadow-emerald-500/5 transition-all duration-300 group">
                                <div className="flex flex-col lg:flex-row justify-between lg:items-center gap-8 pb-8 border-b border-slate-100">
                                    {/* Order Meta */}
                                    <div className="flex-1">
                                        <div className="flex flex-wrap items-center gap-4 mb-4">
                                            <span className="font-mono text-xs font-black text-slate-500 bg-slate-100 px-4 py-1.5 rounded-lg border border-slate-200 uppercase tracking-widest">ID: {order._id.slice(-8)}</span>
                                            <span className="flex items-center gap-2 text-slate-500 text-sm font-bold"><Calendar size={16} className="text-slate-400" /> {new Date(order.createdAt).toLocaleDateString()}</span>
                                        </div>
                                        <div className="flex flex-wrap items-center gap-8 mt-6">
                                            <div className="flex items-center gap-4">
                                                <div className="w-12 h-12 bg-emerald-50 rounded-2xl flex items-center justify-center text-emerald-600 border border-emerald-100 group-hover:bg-emerald-100 transition-colors">
                                                    <User size={22} />
                                                </div>
                                                <div>
                                                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1 lg:mb-0.5">SOLD BY</p>
                                                    <p className="font-black text-slate-800 text-lg capitalize tracking-tight">{order.farmerName || order.farmerEmail}</p>
                                                </div>
                                            </div>

                                            {/* Delivery Info */}
                                            {order.deliveryDetails && (
                                                <div className="hidden sm:flex items-center gap-4">
                                                    <div className="w-12 h-12 bg-slate-50 rounded-2xl flex items-center justify-center text-slate-600 border border-slate-100">
                                                        <MapPin size={22} />
                                                    </div>
                                                    <div>
                                                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1 lg:mb-0.5">DELIVERED TO</p>
                                                        <p className="font-black text-slate-800 text-lg line-clamp-1 max-w-[180px] tracking-tight" title={order.deliveryDetails.address}>
                                                            {order.deliveryDetails.name}
                                                        </p>
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    </div>

                                    {/* Order Total & Status Control */}
                                    <div className="flex flex-wrap lg:flex-nowrap items-center gap-6 lg:gap-8 lg:bg-slate-50/50 lg:p-4 lg:rounded-[2rem] lg:border lg:border-slate-100 shrink-0">
                                        <div>
                                            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">TOTAL AMOUNT</p>
                                            <p className="text-3xl font-black text-slate-900 tracking-tighter">₹{order.totalAmount.toLocaleString()}</p>
                                        </div>
                                        <div className="w-px h-12 bg-slate-200 hidden lg:block"></div>
                                        <div>
                                            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1.5">CURRENT STATUS</p>
                                            <div className={`flex items-center gap-2 px-4 py-2 rounded-xl border-2 font-black text-sm uppercase tracking-wider ${getStatusColor(order.status)}`}>
                                                {getStatusIcon(order.status)}
                                                {order.status}
                                            </div>
                                        </div>
                                        <div className="w-full lg:w-auto mt-4 lg:mt-0 flex gap-4 lg:ml-4">
                                            <button
                                                onClick={() => navigate(`/order/${order._id}`)}
                                                className="w-full lg:w-auto bg-emerald-600 hover:bg-emerald-700 text-white text-sm rounded-[1.25rem] px-8 py-3.5 font-bold transition-all shadow-md shadow-emerald-600/20 flex items-center justify-center gap-2 active:scale-95"
                                            >
                                                View Details <ArrowRight size={18} />
                                            </button>
                                        </div>
                                    </div>
                                </div>

                                {/* Order Items Preview */}
                                <div className="mt-8">
                                    <div className="flex items-center gap-4 overflow-x-auto pb-4 scrollbar-hide">
                                        {order.items.map((item, idx) => (
                                            <div key={idx} className="flex items-center gap-4 p-3 rounded-2xl border border-slate-100 bg-slate-50/80 min-w-[220px] hover:bg-white hover:shadow-md hover:-translate-y-1 transition-all group/item cursor-default">
                                                <div className="w-14 h-14 rounded-xl overflow-hidden bg-slate-200 shrink-0 shadow-sm">
                                                    {item.imageUrl ? (
                                                        <img src={item.imageUrl} alt={item.crop} className="w-full h-full object-cover group-hover/item:scale-110 transition-transform duration-500" />
                                                    ) : (
                                                        <div className="w-full h-full flex items-center justify-center text-slate-400 p-2"><Package size={24} /></div>
                                                    )}
                                                </div>
                                                <div>
                                                    <p className="font-black text-slate-800 text-sm truncate w-28 tracking-tight">{item.crop}</p>
                                                    <p className="text-xs font-bold text-slate-500 mt-0.5 tracking-wide">Qty: {item.quantity}</p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default MyOrders;
