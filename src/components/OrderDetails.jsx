import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
    Package, Clock, CheckCircle, Truck, XCircle,
    ArrowLeft, User, Calendar, Sprout, ShoppingBag,
    MapPin, Wallet
} from 'lucide-react';

const OrderDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [order, setOrder] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchOrderDetails = async () => {
            try {
                const response = await fetch(`${import.meta.env.VITE_API_URL || `${import.meta.env.VITE_API_URL || "http://localhost:5001"}`}/api/orders/${id}`);
                if (!response.ok) {
                    throw new Error("Order not found");
                }
                const data = await response.json();
                setOrder(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchOrderDetails();
    }, [id]);

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

    const getStatusIcon = (status, size = 24) => {
        switch (status) {
            case 'Pending': return <Clock size={size} className="text-yellow-600" />;
            case 'Processing': return <Package size={size} className="text-blue-600" />;
            case 'Shipped': return <Truck size={size} className="text-purple-600" />;
            case 'Delivered': return <CheckCircle size={size} className="text-emerald-600" />;
            case 'Cancelled': return <XCircle size={size} className="text-red-600" />;
            default: return <Clock size={size} className="text-slate-600" />;
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-slate-50">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-emerald-600"></div>
            </div>
        );
    }

    if (error || !order) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center bg-slate-50 p-6 text-center">
                <div className="w-24 h-24 bg-red-50 rounded-full flex items-center justify-center text-red-400 mb-6">
                    <XCircle size={48} />
                </div>
                <h2 className="text-3xl font-black text-slate-800 mb-2">Order Not Found</h2>
                <p className="text-slate-500 mb-8 max-w-md">We couldn't find the order details you're looking for. It might have been deleted or the ID is incorrect.</p>
                <button onClick={() => navigate(-1)} className="bg-emerald-600 text-white font-bold py-3 px-8 rounded-xl shadow-lg hover:bg-emerald-700 transition-all flex items-center gap-2">
                    <ArrowLeft size={20} /> Go Back
                </button>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#F8FAFC] pb-24 text-slate-900 font-sans">
            {/* Header */}
            <div className="bg-emerald-700 text-white pt-8 pb-32 px-6">
                <div className="max-w-5xl mx-auto">
                    <button onClick={() => navigate(-1)} className="text-emerald-100 hover:text-white font-bold mb-8 flex items-center gap-2 transition-colors">
                        <ArrowLeft size={20} /> Back to Orders
                    </button>
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
                        <div>
                            <h1 className="text-3xl md:text-5xl font-black tracking-tight mb-3 text-white">
                                Order Details
                            </h1>
                            <div className="flex items-center gap-4 text-emerald-100 font-medium">
                                <span className="flex items-center gap-1.5 bg-emerald-800/60 px-3 py-1.5 rounded-lg border border-emerald-600/40 shadow-sm">
                                    <ShoppingBag size={16} /> ID: {order._id.slice(-8).toUpperCase()}
                                </span>
                                <span className="flex items-center gap-1.5 bg-emerald-800/60 px-3 py-1.5 rounded-lg border border-emerald-600/40 shadow-sm">
                                    <Calendar size={16} /> {new Date(order.createdAt).toLocaleDateString()}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className="max-w-5xl mx-auto px-6 -mt-20 relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

                    {/* Left Column: Items and Info */}
                    <div className="lg:col-span-2 space-y-8">

                        {/* Status Card */}
                        <div className="bg-white rounded-3xl p-8 shadow-lg shadow-slate-200/50 border border-slate-100">
                            <h2 className="text-xl font-black mb-6 flex items-center gap-2">
                                <Package className="text-slate-400" /> Order Status
                            </h2>
                            <div className="flex items-center p-6 bg-slate-50 rounded-2xl border border-slate-100 gap-6">
                                <div className="p-4 bg-white rounded-2xl shadow-sm border border-slate-100">
                                    {getStatusIcon(order.status, 32)}
                                </div>
                                <div>
                                    <p className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-1">Current Status</p>
                                    <h3 className={`text-2xl font-black flex items-center gap-3 ${order.status === 'Cancelled' ? 'text-red-600' :
                                        order.status === 'Delivered' ? 'text-emerald-600' :
                                            'text-slate-800'
                                        }`}>
                                        {order.status}
                                    </h3>
                                    <p className="text-slate-500 font-medium mt-1">
                                        Last updated on {new Date(order.updatedAt || order.createdAt).toLocaleDateString()}
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Items List */}
                        <div className="bg-white rounded-3xl p-8 shadow-lg shadow-slate-200/50 border border-slate-100">
                            <h2 className="text-xl font-black mb-6 flex items-center gap-2">
                                <Sprout className="text-slate-400" /> Ordered Items
                            </h2>
                            <div className="space-y-4">
                                {order.items.map((item, idx) => (
                                    <div key={idx} className="flex gap-4 p-4 rounded-2xl border border-slate-100 bg-slate-50/50 hover:bg-white hover:shadow-md transition-all">
                                        <div className="w-20 h-20 rounded-2xl overflow-hidden bg-slate-200 shrink-0 border border-slate-200">
                                            {item.imageUrl ? (
                                                <img src={item.imageUrl} alt={item.crop} className="w-full h-full object-cover" />
                                            ) : (
                                                <div className="w-full h-full flex items-center justify-center text-slate-400"><Sprout size={32} /></div>
                                            )}
                                        </div>
                                        <div className="flex flex-col justify-center flex-1">
                                            <div className="flex justify-between items-start mb-1">
                                                <h3 className="font-bold text-slate-800 text-lg leading-tight">{item.crop}</h3>
                                                <span className="font-black text-slate-900 text-lg">₹{item.price * item.quantity}</span>
                                            </div>
                                            <div className="flex items-center gap-3 mt-2">
                                                <span className="bg-slate-100 text-slate-600 text-xs font-bold px-2.5 py-1 rounded-lg">Qty: {item.quantity}</span>
                                                <span className="text-slate-400 text-sm font-medium">₹{item.price} per unit</span>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Right Column: Summary and People */}
                    <div className="space-y-8">

                        {/* Order Summary */}
                        <div className="bg-white rounded-3xl p-8 shadow-lg shadow-slate-200/50 border border-slate-100">
                            <h2 className="text-xl font-black mb-6 flex items-center gap-2">
                                <Wallet className="text-slate-400" /> Payment Summary
                            </h2>
                            <div className="space-y-4 mb-6">
                                <div className="flex justify-between text-slate-600 font-medium">
                                    <span>Subtotal ({order.items.length} items)</span>
                                    <span className="font-bold text-slate-900">₹{order.totalAmount}</span>
                                </div>
                                <div className="flex justify-between text-slate-600 font-medium">
                                    <span>Delivery & Handling</span>
                                    <span className="text-emerald-600 font-bold">Free</span>
                                </div>
                                <div className="flex justify-between text-slate-600 font-medium">
                                    <span>Tax</span>
                                    <span className="font-bold text-slate-900">₹0</span>
                                </div>
                            </div>
                            <div className="pt-6 border-t border-slate-100 flex justify-between items-center">
                                <span className="text-lg font-black text-slate-800">Total</span>
                                <span className="text-3xl font-black text-emerald-600">₹{order.totalAmount}</span>
                            </div>
                        </div>

                        {/* People Involved */}
                        <div className="bg-white rounded-3xl p-8 shadow-lg shadow-slate-200/50 border border-slate-100 space-y-8">

                            {/* Farmer */}
                            <div>
                                <h3 className="text-xs font-black text-slate-400 uppercase tracking-wider mb-4">Farmer Details</h3>
                                <div className="flex items-center gap-4 p-4 rounded-2xl bg-white border border-slate-200 shadow-sm hover:border-emerald-300 transition-colors">
                                    <div className="w-12 h-12 bg-emerald-50 rounded-full flex items-center justify-center text-emerald-600 shrink-0">
                                        <Sprout size={24} />
                                    </div>
                                    <div>
                                        <p className="font-bold text-slate-800 text-lg capitalize">{order.farmerName}</p>
                                        <p className="text-xs font-medium text-slate-500">{order.farmerEmail}</p>
                                    </div>
                                </div>
                            </div>

                            {/* Buyer */}
                            <div>
                                <h3 className="text-xs font-black text-slate-400 uppercase tracking-wider mb-4">Buyer Details</h3>
                                <div className="flex items-center gap-4 p-4 rounded-2xl bg-white border border-slate-200 shadow-sm hover:border-emerald-300 transition-colors">
                                    <div className="w-12 h-12 bg-slate-50 rounded-full flex items-center justify-center text-slate-600 shrink-0">
                                        <User size={24} />
                                    </div>
                                    <div>
                                        <p className="font-bold text-slate-800 text-lg capitalize">{order.buyerName}</p>
                                        <p className="text-xs font-medium text-slate-500">{order.buyerEmail}</p>
                                    </div>
                                </div>
                            </div>

                            {/* Delivery Address Details */}
                            {order.deliveryDetails && (
                                <div>
                                    <h3 className="text-xs font-black text-slate-400 uppercase tracking-wider mb-4">Delivery Information</h3>
                                    <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-sm hover:border-emerald-300 transition-colors flex items-start gap-4">
                                        <div className="w-12 h-12 bg-emerald-50 rounded-full flex items-center justify-center text-emerald-600 shrink-0">
                                            <MapPin size={24} />
                                        </div>
                                        <div className="space-y-1">
                                            <p className="font-bold text-slate-800 text-lg capitalize">{order.deliveryDetails.name}</p>
                                            <p className="text-sm font-medium text-slate-600 flex items-center gap-2">
                                                <span className="bg-slate-100 text-slate-700 px-2 py-0.5 rounded-md text-xs font-bold border border-slate-200">Phone</span>
                                                {order.deliveryDetails.phone}
                                            </p>
                                            <p className="text-sm text-slate-500 mt-2 leading-relaxed">
                                                {order.deliveryDetails.address}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            )}

                        </div>

                    </div>
                </div>
            </div>
        </div>
    );
};

export default OrderDetails;
