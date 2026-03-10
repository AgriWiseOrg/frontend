import React, { useState, useEffect, useRef } from 'react';
import { io } from 'socket.io-client';
import { useNavigate } from 'react-router-dom';
import {
    Gavel, Clock, Trophy, User, ArrowUpCircle, X,
    History, TrendingUp, Sparkles, CreditCard
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const socket = io(import.meta.env.VITE_API_URL || 'http://localhost:5001');

const Bidding = ({ product, user, onClose }) => {
    const navigate = useNavigate();
    const [currentProduct, setCurrentProduct] = useState(product);
    const [bidAmount, setBidAmount] = useState(product.currentBid + 10);
    const [timeLeft, setTimeLeft] = useState('');
    const [isEnded, setIsEnded] = useState(false);
    const scrollRef = useRef(null);

    const isWinner = isEnded && currentProduct.highestBidder === (user.id || user._id);

    useEffect(() => {
        socket.on('bidUpdated', (updatedProduct) => {
            if (updatedProduct._id === product._id) {
                setCurrentProduct(updatedProduct);
                setBidAmount(updatedProduct.currentBid + 10);
                // Scroll to top of history
                if (scrollRef.current) scrollRef.current.scrollTop = 0;
            }
        });

        const timer = setInterval(() => {
            const now = new Date();
            const end = new Date(currentProduct.biddingEndTime);
            const diff = end - now;

            if (diff <= 0) {
                setTimeLeft('Auction Ended');
                setIsEnded(true);
                clearInterval(timer);
            } else {
                const hours = Math.floor(diff / (1000 * 60 * 60));
                const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
                const seconds = Math.floor((diff % (1000 * 60)) / 1000);
                setTimeLeft(`${hours > 0 ? hours + 'h ' : ''}${minutes}m ${seconds}s`);
            }
        }, 1000);

        return () => {
            socket.off('bidUpdated');
            clearInterval(timer);
        };
    }, [currentProduct.biddingEndTime, product._id]);

    const handlePlaceBid = async () => {
        if (isEnded) return;
        if (bidAmount <= currentProduct.currentBid) {
            alert('Your bid must be higher than the current bid!');
            return;
        }

        try {
            const response = await fetch(`${import.meta.env.VITE_API_URL || 'http://localhost:5001'}/api/bidding/bid/${product._id}`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    bidderId: user.id || user._id,
                    bidderName: user.profile?.name || (user.email ? user.email.split('@')[0] : 'Farmer'),
                    amount: bidAmount
                })
            });

            if (!response.ok) {
                const error = await response.json();
                alert(error.message);
            }
        } catch (error) {
            console.error('Bid Error:', error);
        }
    };

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-emerald-950/40 backdrop-blur-md">
            <motion.div
                initial={{ opacity: 0, y: 20, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                className="bg-white/90 backdrop-blur-xl w-full max-w-4xl h-[85vh] rounded-[3rem] overflow-hidden shadow-[0_32px_64px_-16px_rgba(6,78,59,0.3)] border border-white/50 flex flex-col md:flex-row"
            >
                {/* --- Left Panel: Main Action --- */}
                <div className="flex-1 p-8 md:p-12 flex flex-col relative overflow-hidden group">
                    {/* Background Glow */}
                    <div className="absolute -top-24 -left-24 w-96 h-96 bg-emerald-200/30 rounded-full blur-3xl group-hover:bg-emerald-300/40 transition-colors duration-1000" />

                    <div className="relative z-10 flex flex-col h-full">
                        <div className="flex justify-between items-start mb-8">
                            <div>
                                <div className="flex items-center gap-2 mb-3">
                                    <div className="px-3 py-1 bg-emerald-100 rounded-full flex items-center gap-2 border border-emerald-200">
                                        <div className="w-1.5 h-1.5 bg-emerald-600 rounded-full animate-pulse" />
                                        <span className="text-[10px] font-black text-emerald-800 uppercase tracking-widest">Live Auction</span>
                                    </div>
                                    {isEnded && <span className="text-[10px] font-black bg-red-100 text-red-600 px-3 py-1 rounded-full uppercase tracking-widest border border-red-200">Completed</span>}
                                </div>
                                <h2 className="text-4xl md:text-5xl font-black text-emerald-950 tracking-tighter leading-none mb-2 capitalize">
                                    {currentProduct.crop}
                                </h2>
                                <p className="text-emerald-800/60 font-bold uppercase text-[10px] tracking-widest ml-1 flex items-center gap-2">
                                    <TrendingUp size={12} /> Market Value: ₹{currentProduct.price} / {currentProduct.unit || 'qtl'}
                                </p>
                            </div>
                            <button onClick={onClose} className="p-3 bg-white/50 hover:bg-white rounded-2xl transition-all shadow-sm border border-white md:hidden">
                                <X size={24} className="text-emerald-950" />
                            </button>
                        </div>

                        <div className="grid grid-cols-2 gap-6 mb-10">
                            <div className="bg-white/60 p-6 rounded-[2rem] border border-white shadow-sm transition-transform hover:scale-[1.02]">
                                <p className="text-[10px] font-black text-emerald-800/40 uppercase tracking-widest mb-2 flex items-center gap-2">
                                    <Clock size={12} /> Time Left
                                </p>
                                <p className={`text-3xl font-black tracking-tight ${isEnded ? 'text-red-600' : 'text-emerald-900'}`}>
                                    {timeLeft}
                                </p>
                            </div>
                            <div className="bg-emerald-900 p-6 rounded-[2rem] shadow-xl text-white transition-transform hover:scale-[1.02]">
                                <p className="text-[10px] font-black text-emerald-100/40 uppercase tracking-widest mb-2 flex items-center gap-2">
                                    <Trophy size={12} className="text-yellow-400" /> Current Bid
                                </p>
                                <p className="text-3xl font-black tracking-tight">
                                    ₹{currentProduct.currentBid || currentProduct.price} <span className="text-xs font-normal opacity-50">/ {currentProduct.unit || 'qtl'}</span>
                                </p>
                            </div>
                        </div>

                        {!isEnded ? (
                            <div className="mt-auto space-y-6">
                                <div className="space-y-4">
                                    <div className="flex items-center gap-4 bg-white/80 p-3 rounded-[2.5rem] border-2 border-emerald-100 focus-within:border-emerald-600 transition-all shadow-inner">
                                        <div className="pl-6 font-black text-emerald-900/20 text-3xl">₹</div>
                                        <input
                                            type="number"
                                            value={bidAmount}
                                            onChange={(e) => setBidAmount(Number(e.target.value))}
                                            className="w-full bg-transparent py-4 text-4xl font-black text-emerald-950 outline-none placeholder:text-emerald-100"
                                        />
                                        <button
                                            onClick={handlePlaceBid}
                                            className="bg-emerald-600 hover:bg-emerald-700 text-white p-5 rounded-full shadow-lg shadow-emerald-600/30 active:scale-90 transition-all group/btn"
                                        >
                                            <ArrowUpCircle size={32} className="group-hover:translate-y-[-2px] transition-transform" />
                                        </button>
                                    </div>
                                    <div className="flex gap-3 px-2">
                                        {[10, 50, 100].map(val => (
                                            <button
                                                key={val}
                                                onClick={() => setBidAmount(currentProduct.currentBid + val)}
                                                className="flex-1 py-3 bg-emerald-50 hover:bg-emerald-100 border border-emerald-100 rounded-2xl font-black text-xs text-emerald-700 transition-all uppercase tracking-widest"
                                            >
                                                +₹{val}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                                <p className="text-center text-[10px] font-black text-emerald-800/30 uppercase tracking-[0.2em]">
                                    Secure real-time transaction verified by AgriWise
                                </p>
                            </div>
                        ) : (
                            <div className="mt-auto">
                                {isWinner ? (
                                    <motion.div
                                        initial={{ scale: 0.9, opacity: 0 }}
                                        animate={{ scale: 1, opacity: 1 }}
                                        className="bg-emerald-900 p-10 rounded-[2.5rem] border-4 border-yellow-400 text-white text-center shadow-2xl relative overflow-hidden"
                                    >
                                        <div className="absolute inset-0 bg-gradient-to-br from-yellow-400/20 to-transparent" />
                                        <div className="relative z-10">
                                            <div className="flex justify-center mb-4"><Sparkles className="text-yellow-400" size={48} /></div>
                                            <h3 className="text-4xl font-black mb-2 tracking-tighter uppercase italic">You Won!</h3>
                                            <p className="text-emerald-100/70 font-bold mb-8">This premium harvest is yours for ₹{currentProduct.currentBid}.</p>
                                            <button
                                                onClick={() => navigate('/payment', { state: { amount: currentProduct.currentBid, product: currentProduct } })}
                                                className="w-full bg-yellow-400 hover:bg-yellow-500 text-emerald-950 py-5 rounded-2xl font-black text-sm shadow-xl flex items-center justify-center gap-3 transition-all active:scale-95 uppercase tracking-widest"
                                            >
                                                <CreditCard size={20} /> Proceed to Secure Payment
                                            </button>
                                        </div>
                                    </motion.div>
                                ) : (
                                    <div className="bg-slate-50 p-10 rounded-[2.5rem] border-2 border-slate-200 text-center">
                                        <h3 className="text-3xl font-black text-slate-400 mb-2 grayscale">Auction Closed</h3>
                                        <p className="text-slate-400 font-bold">Winning Bid: ₹{currentProduct.currentBid} by {currentProduct.highestBidderName || 'N/A'}</p>
                                        <button onClick={onClose} className="mt-6 px-10 py-4 bg-slate-200 rounded-2xl font-black text-xs uppercase tracking-widest text-slate-500 hover:bg-slate-300 transition-colors">Close Window</button>
                                    </div>
                                )}
                            </div>
                        )}
                    </div>
                </div>

                {/* --- Right Panel: Leaderboard --- */}
                <div className="w-full md:w-[350px] bg-emerald-50/50 backdrop-blur-md border-l border-white p-8 flex flex-col h-full relative">
                    <button onClick={onClose} className="hidden md:block absolute top-8 right-8 p-3 hover:bg-white rounded-2xl transition-all shadow-sm">
                        <X size={20} className="text-emerald-950" />
                    </button>

                    <div className="flex items-center gap-3 mb-8">
                        <div className="p-2 bg-emerald-200/50 rounded-xl text-emerald-900"><History size={20} /></div>
                        <h3 className="font-black text-emerald-900 uppercase tracking-widest text-sm">Bid Leaderboard</h3>
                    </div>

                    <div
                        ref={scrollRef}
                        className="flex-1 overflow-y-auto pr-2 space-y-4 custom-scrollbar"
                    >
                        <AnimatePresence initial={false}>
                            {currentProduct.bids && currentProduct.bids.length > 0 ? (
                                [...currentProduct.bids].reverse().map((bid, index) => (
                                    <motion.div
                                        key={bid._id || index}
                                        initial={{ opacity: 0, x: 20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        className={`p-4 rounded-2xl border flex items-center gap-4 transition-all ${index === 0 ? 'bg-emerald-900 text-white border-emerald-900 shadow-lg scale-105' : 'bg-white/60 border-emerald-100 text-emerald-900 shadow-sm'}`}
                                    >
                                        <div className={`w-10 h-10 rounded-xl flex items-center justify-center font-black text-sm shadow-inner ${index === 0 ? 'bg-white/20 text-white' : 'bg-emerald-100 text-emerald-700'}`}>
                                            {(bid.bidderName || 'A')[0].toUpperCase()}
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <p className={`text-[10px] font-black uppercase tracking-widest truncate ${index === 0 ? 'text-emerald-300' : 'text-emerald-800/40'}`}>
                                                {index === 0 ? 'Highest Bidder' : 'Bidder'}
                                            </p>
                                            <p className="font-black tracking-tight truncate">{bid.bidderName || 'Anonymous'}</p>
                                        </div>
                                        <div className="text-right">
                                            <p className={`font-black text-lg tracking-tighter ${index === 0 ? 'text-yellow-400' : 'text-emerald-900'}`}>₹{bid.amount}</p>
                                            <p className={`text-[9px] font-bold opacity-40`}>{new Date(bid.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })}</p>
                                        </div>
                                    </motion.div>
                                ))
                            ) : (
                                <div className="h-full flex flex-col items-center justify-center text-center opacity-30 mt-20">
                                    <Gavel size={48} className="mb-4" />
                                    <p className="font-black text-xs uppercase tracking-widest">No bids yet</p>
                                </div>
                            )}
                        </AnimatePresence>
                    </div>

                    <div className="mt-8 pt-6 border-t border-emerald-100 flex items-center justify-between">
                        <div>
                            <p className="text-[10px] font-black uppercase text-emerald-800/40 tracking-widest mb-1">Total Bids</p>
                            <p className="font-black text-emerald-900">{(currentProduct.bids || []).length}</p>
                        </div>
                        <div className="text-right">
                            <p className="text-[10px] font-black uppercase text-emerald-800/40 tracking-widest mb-1">Starting At</p>
                            <p className="font-black text-emerald-900">₹{currentProduct.price}</p>
                        </div>
                    </div>
                </div>
            </motion.div>

            <style>{`
                .custom-scrollbar::-webkit-scrollbar {
                    width: 4px;
                }
                .custom-scrollbar::-webkit-scrollbar-track {
                    background: transparent;
                }
                .custom-scrollbar::-webkit-scrollbar-thumb {
                    background: rgba(6, 78, 59, 0.1);
                    border-radius: 10px;
                }
                .custom-scrollbar::-webkit-scrollbar-thumb:hover {
                    background: rgba(6, 78, 59, 0.2);
                }
            `}</style>
        </div>
    );
};

export default Bidding;
