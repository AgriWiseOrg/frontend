import React, { useEffect, useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { useCart } from './CartContext';
import { CheckCircle2, XCircle, Loader2 } from 'lucide-react';

const Payments = ({ user }) => {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const { fetchCart, cartItems, userEmail } = useCart();

    const [status, setStatus] = useState('processing');
    const [errorMessage, setErrorMessage] = useState('');

    const isSuccess = searchParams.get('success') === 'true';

    useEffect(() => {
        // Run order processing logic once when returning successfully
        if (isSuccess && status === 'processing') {
            processOrder();
        } else if (!isSuccess) {
            setStatus('cancelled');
        }
    }, [isSuccess]);

    const processOrder = async () => {
        try {
            // 1. Ensure we have the latest cart items (in case of stale state)
            await fetchCart();
            const email = userEmail || localStorage.getItem('userEmail');

            if (!email) {
                throw new Error("User session expired during payment.");
            }

            // Check current state cart items. If empty, maybe already processed
            // We'll proceed with creating orders.
            if (!cartItems || cartItems.length === 0) {
                setStatus('success'); // Assume already handled if cart empty on success page
                return;
            }

            // 2. Create Orders for each farmer
            const orderRes = await fetch('http://localhost:5001/api/orders', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ buyerEmail: email, items: cartItems })
            });

            if (!orderRes.ok) {
                throw new Error("Failed to generate order documents.");
            }

            // 3. Clear Cart
            const clearRes = await fetch(`http://localhost:5001/api/cart/clear/${email}`, {
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

    if (status === 'processing') {
        return (
            <div className="min-h-screen bg-[#F8FAFC] flex flex-col items-center justify-center p-4">
                <Loader2 className="w-16 h-16 text-emerald-600 animate-spin mb-6" />
                <h1 className="text-2xl font-black text-slate-800 tracking-tight">Processing your order...</h1>
                <p className="text-slate-500 mt-2 font-medium">Please do not close this window.</p>
            </div>
        );
    }

    if (status === 'success') {
        return (
            <div className="min-h-screen bg-[#F8FAFC] flex items-center justify-center p-4">
                <div className="bg-white p-8 md:p-12 rounded-3xl shadow-xl border border-slate-100 max-w-md w-full text-center">
                    <div className="w-24 h-24 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-8 animate-bounce">
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

    // Cancelled or Error state
    return (
        <div className="min-h-screen bg-[#F8FAFC] flex items-center justify-center p-4">
            <div className="bg-white p-8 md:p-12 rounded-3xl shadow-xl border border-slate-100 max-w-md w-full text-center">
                <div className="w-24 h-24 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-8">
                    <XCircle size={48} className="text-red-500" />
                </div>
                <h1 className="text-3xl font-black text-slate-900 tracking-tight mb-4">
                    {status === 'error' ? 'Order Failed' : 'Payment Cancelled'}
                </h1>
                <p className="text-slate-500 font-medium mb-10 leading-relaxed">
                    {status === 'error'
                        ? `There was an issue processing your order: ${errorMessage}`
                        : 'Your payment was cancelled. No charges were made and your cart is safe.'}
                </p>
                <button
                    onClick={() => navigate('/cart')}
                    className="w-full bg-slate-900 hover:bg-slate-800 text-white py-4 rounded-xl font-bold shadow-lg transition-all active:scale-95"
                >
                    Return to Cart
                </button>
            </div>
        </div>
    );
};

export default Payments;
