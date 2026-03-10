import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from './CartContext';
import { CheckCircle2, XCircle, Loader2, CreditCard, Smartphone, ShieldCheck, ChevronRight, ArrowLeft, MapPin, User, Phone } from 'lucide-react';

const Payments = ({ user }) => {
    const navigate = useNavigate();
    const { fetchCart, cartItems, userEmail, totalPrice } = useCart();

    const [status, setStatus] = useState('method_selection'); // method_selection, processing, success, error
    const [errorMessage, setErrorMessage] = useState('');
    const [paymentMethod, setPaymentMethod] = useState('card'); // card, upi

    // Delivery Details Form State
    const [deliveryDetails, setDeliveryDetails] = useState({ name: '', phone: '', address: '' });

    // Mock Form States
    const [cardDetails, setCardDetails] = useState({ number: '', name: '', expiry: '', cvv: '' });
    const [upiId, setUpiId] = useState('');

    useEffect(() => {
        const fetchProfile = async () => {
            if (user?.id) {
                try {
<<<<<<< HEAD
                    const response = await fetch(`http://localhost:5001/api/users/${user.id}`);
=======
                    const response = await fetch(`${import.meta.env.VITE_API_URL || `${import.meta.env.VITE_API_URL || "http://localhost:5001"}`}/api/users/${user.id}`);
>>>>>>> 7fb4c2832ffd32eec75393fc3ae47513363f0d60
                    if (response.ok) {
                        const data = await response.json();
                        if (data.profile) {
                            setDeliveryDetails(prev => ({
                                name: data.profile.name || prev.name,
                                phone: data.profile.phone || prev.phone,
                                address: data.profile.address || prev.address
                            }));
                        }
                    }
                } catch (error) {
                    console.error("Failed to fetch profile for pre-filling delivery details", error);
                }
            }
        };
        fetchProfile();
    }, [user]);

    const processOrder = async (shouldSucceed = true) => {
        setStatus('processing');

        // Simulate network delay
        await new Promise(resolve => setTimeout(resolve, 2000));

        if (!shouldSucceed) {
            setStatus('error');
            setErrorMessage('Payment was declined by the simulated bank.');
            return;
        }

        try {
            // 1. Ensure we have the latest cart items
            await fetchCart();
            const email = userEmail || localStorage.getItem('userEmail');

            if (!email) {
                throw new Error("User session expired during payment.");
            }

            if (!cartItems || cartItems.length === 0) {
                setStatus('success'); // Assume already handled if cart empty
                return;
            }

            // 2. Create Orders for each farmer, passing in the delivery details explicitly
            const orderRes = await fetch(`${import.meta.env.VITE_API_URL || "http://localhost:5001"}/api/orders`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    buyerEmail: email,
                    items: cartItems,
                    deliveryDetails
                })
            });

            if (!orderRes.ok) {
                const errData = await orderRes.json();
                throw new Error(errData.message || "Failed to generate order documents.");
            }

            // 3. Clear Cart
            const clearRes = await fetch(`${import.meta.env.VITE_API_URL || `${import.meta.env.VITE_API_URL || "http://localhost:5001"}`}/api/cart/clear/${email}`, {
                method: 'DELETE'
            });

            if (!clearRes.ok) {
                console.error("Cart wasn't cleared but order succeeded.");
            }

            // Refresh cart state to empty globally
            fetchCart();
            setStatus('success');

        } catch (err) {
            console.error(err);
            setStatus('error');
            setErrorMessage(err.message);
        }
    };

    const handleSimulatePayment = (e) => {
        e.preventDefault();

        // Validation - Delivery details
        if (!deliveryDetails.name || !deliveryDetails.phone || !deliveryDetails.address) {
            alert("Please fill in all Delivery Details.");
            return;
        }

        // Validation - Payment Details
        if (paymentMethod === 'card') {
            if (!cardDetails.number || !cardDetails.name || !cardDetails.expiry || !cardDetails.cvv) {
                alert("Please fill in all card details for simulation.");
                return;
            }
        } else {
            if (!upiId) {
                alert("Please enter a UPI ID for simulation.");
                return;
            }
        }

        processOrder(true);
    };

    if (status === 'processing') {
        return (
            <div className="min-h-screen bg-[#F8FAFC] flex flex-col items-center justify-center p-4">
                <Loader2 className="w-16 h-16 text-emerald-600 animate-spin mb-6" />
                <h1 className="text-2xl font-black text-slate-800 tracking-tight">Processing Payment...</h1>
                <p className="text-slate-500 mt-2 font-medium">Securing your transaction, please do not close this window.</p>
            </div>
        );
    }

    if (status === 'success') {
        return (
            <div className="min-h-screen bg-[#F8FAFC] flex items-center justify-center p-4">
                <div className="bg-white p-8 md:p-12 rounded-[2rem] shadow-2xl shadow-emerald-900/5 border border-slate-100 max-w-md w-full text-center">
                    <div className="w-24 h-24 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-8 animate-[bounce_1s_ease-in-out_infinite]">
                        <CheckCircle2 size={48} className="text-emerald-600" />
                    </div>
                    <h1 className="text-3xl font-black text-slate-900 tracking-tight mb-4">Payment Successful!</h1>
                    <p className="text-slate-500 font-medium mb-10 leading-relaxed">
                        Your order has been placed and sent to the farmers. They will begin processing your harvest shortly.
                    </p>
                    <div className="space-y-4">
                        <button
                            onClick={() => navigate('/my-orders')}
                            className="w-full bg-emerald-600 hover:bg-emerald-700 text-white py-4 rounded-xl font-bold shadow-lg shadow-emerald-200 transition-all active:scale-95"
                        >
                            Track Order Status
                        </button>
                        <button
                            onClick={() => navigate('/marketplace')}
                            className="w-full bg-slate-100 hover:bg-slate-200 text-slate-700 py-4 rounded-xl font-bold transition-all active:scale-95"
                        >
                            Continue Shopping
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    if (status === 'error') {
        return (
            <div className="min-h-screen bg-[#F8FAFC] flex items-center justify-center p-4">
                <div className="bg-white p-8 md:p-12 rounded-[2rem] shadow-2xl shadow-red-900/5 border border-slate-100 max-w-md w-full text-center">
                    <div className="w-24 h-24 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-8">
                        <XCircle size={48} className="text-red-500" />
                    </div>
                    <h1 className="text-3xl font-black text-slate-900 tracking-tight mb-4">Payment Failed</h1>
                    <p className="text-slate-500 font-medium mb-10 leading-relaxed">
                        There was an issue processing your order: {errorMessage}
                    </p>
                    <div className="space-y-4">
                        <button
                            onClick={() => setStatus('method_selection')}
                            className="w-full bg-emerald-600 hover:bg-emerald-700 text-white py-4 rounded-xl font-bold shadow-lg shadow-emerald-200 transition-all active:scale-95"
                        >
                            Try Again
                        </button>
                        <button
                            onClick={() => navigate('/cart')}
                            className="w-full bg-slate-100 hover:bg-slate-200 text-slate-700 py-4 rounded-xl font-bold transition-all active:scale-95"
                        >
                            Return to Cart
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    // method_selection state
    return (
        <div className="min-h-screen bg-slate-50 py-8 px-4 sm:px-6 lg:px-8 font-sans">
            <div className="max-w-4xl mx-auto flex flex-col md:flex-row gap-8">

                {/* Left Column: Form Sections */}
                <div className="flex-1 space-y-6">
                    {/* Header with Back Button */}
                    <div className="flex items-center gap-4 mb-2">
                        <button
                            onClick={() => navigate('/cart')}
                            className="p-2 bg-white rounded-full shadow-sm border border-slate-200 hover:bg-slate-100 transition-colors text-slate-600"
                            aria-label="Back to Cart"
                        >
                            <ArrowLeft size={20} />
                        </button>
                        <div>
                            <h2 className="text-3xl font-black text-slate-900 tracking-tight">Checkout</h2>
                            <p className="text-slate-500 text-sm font-medium mt-1">Complete your order below.</p>
                        </div>
                    </div>

                    <form onSubmit={handleSimulatePayment} className="space-y-6">
                        {/* 1. Delivery Details Section */}
                        <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-5">
                            <h3 className="font-black text-xl flex items-center gap-2 text-slate-800">
                                <MapPin size={22} className="text-emerald-600" /> Delivery Details
                            </h3>

                            <div className="space-y-4 pt-2">
                                <div className="space-y-2">
                                    <label className="text-sm font-bold text-slate-700 block">Full Name</label>
                                    <div className="relative">
                                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                                            <User size={18} />
                                        </div>
                                        <input
                                            type="text"
                                            placeholder="Enter your name"
                                            value={deliveryDetails.name}
                                            onChange={(e) => setDeliveryDetails({ ...deliveryDetails, name: e.target.value })}
                                            className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-10 pr-4 py-3 focus:outline-none focus:ring-2 focus:ring-emerald-500 font-medium transition-shadow"
                                            required
                                        />
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <label className="text-sm font-bold text-slate-700 block">Phone Number</label>
                                    <div className="relative">
                                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                                            <Phone size={18} />
                                        </div>
                                        <input
                                            type="tel"
                                            placeholder="10-digit mobile number"
                                            value={deliveryDetails.phone}
                                            onChange={(e) => setDeliveryDetails({ ...deliveryDetails, phone: e.target.value })}
                                            className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-10 pr-4 py-3 focus:outline-none focus:ring-2 focus:ring-emerald-500 font-medium transition-shadow"
                                            required
                                        />
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <label className="text-sm font-bold text-slate-700 block">Complete Address</label>
                                    <textarea
                                        placeholder="House No, Building, Street, Area, City, Pincode"
                                        value={deliveryDetails.address}
                                        onChange={(e) => setDeliveryDetails({ ...deliveryDetails, address: e.target.value })}
                                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-emerald-500 font-medium min-h-[100px] transition-shadow resize-y"
                                        required
                                    />
                                </div>
                            </div>
                        </div>

                        {/* 2. Payment Method Section */}
                        <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-6">
                            <h3 className="font-black text-xl flex items-center gap-2 text-slate-800">
                                <CreditCard size={22} className="text-emerald-600" /> Payment
                            </h3>

                            {/* Tab Selection */}
                            <div className="flex gap-4 p-1 bg-slate-100 rounded-2xl">
                                <button
                                    type="button"
                                    onClick={() => setPaymentMethod('card')}
                                    className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-xl font-bold transition-all ${paymentMethod === 'card' ? 'bg-white text-emerald-800 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
                                >
                                    <CreditCard size={20} /> Card
                                </button>
                                <button
                                    type="button"
                                    onClick={() => setPaymentMethod('upi')}
                                    className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-xl font-bold transition-all ${paymentMethod === 'upi' ? 'bg-white text-emerald-800 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
                                >
                                    <Smartphone size={20} /> UPI
                                </button>
                            </div>

                            {/* Payment Method Forms */}
                            {paymentMethod === 'card' ? (
                                <div className="space-y-4 animate-in fade-in slide-in-from-bottom-2 duration-300">
                                    <div className="space-y-2">
                                        <label className="text-sm font-bold text-slate-700 block">Card Number</label>
                                        <input
                                            type="text"
                                            placeholder="0000 0000 0000 0000"
                                            value={cardDetails.number}
                                            onChange={(e) => setCardDetails({ ...cardDetails, number: e.target.value })}
                                            className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-emerald-500 font-medium"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-sm font-bold text-slate-700 block">Cardholder Name</label>
                                        <input
                                            type="text"
                                            placeholder="John Doe"
                                            value={cardDetails.name}
                                            onChange={(e) => setCardDetails({ ...cardDetails, name: e.target.value })}
                                            className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-emerald-500 font-medium"
                                        />
                                    </div>
                                    <div className="flex gap-4">
                                        <div className="flex-1 space-y-2">
                                            <label className="text-sm font-bold text-slate-700 block">Expiry Date</label>
                                            <input
                                                type="text"
                                                placeholder="MM/YY"
                                                value={cardDetails.expiry}
                                                onChange={(e) => setCardDetails({ ...cardDetails, expiry: e.target.value })}
                                                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-emerald-500 font-medium"
                                            />
                                        </div>
                                        <div className="flex-1 space-y-2">
                                            <label className="text-sm font-bold text-slate-700 block">CVV</label>
                                            <input
                                                type="text"
                                                placeholder="123"
                                                value={cardDetails.cvv}
                                                onChange={(e) => setCardDetails({ ...cardDetails, cvv: e.target.value })}
                                                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-emerald-500 font-medium"
                                            />
                                        </div>
                                    </div>
                                </div>
                            ) : (
                                <div className="space-y-4 animate-in fade-in slide-in-from-bottom-2 duration-300">
                                    <div className="space-y-2">
                                        <label className="text-sm font-bold text-slate-700 block">UPI ID</label>
                                        <input
                                            type="text"
                                            placeholder="username@bank"
                                            value={upiId}
                                            onChange={(e) => setUpiId(e.target.value)}
                                            className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-emerald-500 font-medium"
                                        />
                                        <p className="text-xs text-slate-500 font-medium mt-1">Enter your Virtual Payment Address (VPA)</p>
                                    </div>
                                    <div className="bg-emerald-50 p-4 rounded-xl border border-emerald-100 flex items-start gap-3">
                                        <Smartphone className="text-emerald-600 mt-0.5" size={20} />
                                        <div className="text-sm text-emerald-800 font-medium">
                                            A payment request will be sent to your UPI app. Please approve it to complete the transaction.
                                        </div>
                                    </div>
                                </div>
                            )}

                            {/* Action Buttons */}
                            <div className="pt-4 border-t border-slate-100 flex flex-col sm:flex-row gap-4">
                                <button
                                    type="submit"
                                    className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white py-4 rounded-xl font-black shadow-lg shadow-emerald-200 transition-all active:scale-95 flex items-center justify-center gap-2"
                                >
                                    Proceed to Pay <ChevronRight size={20} />
                                </button>
                                <button
                                    type="button"
                                    onClick={() => processOrder(false)}
                                    className="sm:w-auto w-full bg-slate-100 hover:bg-slate-200 text-slate-700 py-4 px-6 rounded-xl font-bold transition-all active:scale-95 border border-slate-200"
                                >
                                    Simulate Failure
                                </button>
                            </div>
                        </div>
                    </form>
                </div>

                {/* Right Column: Order Summary */}
                <div className="md:w-[350px]">
                    <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm sticky top-6">
                        <h3 className="font-black text-xl mb-6">Order Summary</h3>

                        <div className="flex justify-between items-center border-b border-slate-100 pb-6 mb-6">
                            <span className="font-bold text-slate-600 text-sm">Total to Pay</span>
                            <span className="text-3xl font-black text-emerald-800">₹{totalPrice || 0}</span>
                        </div>

                        <div className="space-y-3">
                            <div className="bg-slate-50 p-4 rounded-xl flex items-center gap-3">
                                <ShieldCheck size={24} className="text-emerald-600 shrink-0" />
                                <div>
                                    <p className="text-sm font-bold text-slate-800">Secure Payment Simulation</p>
                                    <p className="text-xs text-slate-500 mt-0.5">This is a mock gateway. No real charges are processed.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default Payments;
