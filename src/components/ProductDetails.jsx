import { useTranslation } from 'react-i18next';
import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  ArrowLeft, MapPin, Star, Phone, ShieldCheck,
  Leaf, CheckCircle2, Truck, ChevronRight, Share2, Heart, Award, Send, User
} from "lucide-react";
import { useCart } from "./CartContext";
import Bidding from "./Bidding";
import { Gavel } from 'lucide-react';

const ProductDetails = ({ user }) => {
  const { t } = useTranslation();

  const navigate = useNavigate();
  const { state: product } = useLocation();
  const { addToCart } = useCart();

  // Review State
  const [reviews, setReviews] = useState([
    { id: 1, name: "Anil Kumar", rating: 5, date: "Feb 01, 2026", comment: "Excellent quality rice. The grains are long and fragrant." },
    { id: 2, name: "Sita Sharma", rating: 4, date: "Jan 28, 2026", comment: "Good harvest, but delivery took 3 days instead of 2." }
  ]);
  const [newComment, setNewComment] = useState("");
  const [newRating, setNewRating] = useState(5);
  const [isBiddingModalOpen, setIsBiddingModalOpen] = useState(false);
  const [localProduct, setLocalProduct] = useState(product);
  const [bidDuration, setBidDuration] = useState(30); // Default 30 min

  const isFarmerOwner = user && user.role === 'farmer' && (user.id === localProduct.farmerId || user._id === localProduct.farmerId);

  const startBidding = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL || 'http://localhost:5001'}/api/bidding/start/${localProduct._id}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ durationMinutes: bidDuration })
      });
      if (response.ok) {
        const updated = await response.json();
        setLocalProduct(updated);
        setIsBiddingModalOpen(true);
      }
    } catch (error) {
      console.error('Start Bidding Error:', error);
    }
  };

  if (!product) return null;

  const handleAddToCart = async () => {
    const standardizedProduct = {
      ...product,
      id: String(product._id || product.id),
      productId: String(product._id || product.id)
    };

    try {
      await addToCart(standardizedProduct);
      navigate("/cart");
    } catch (error) {
      console.error("Cart sync failed:", error);
    }
  };

  const handleAddReview = (e) => {
    e.preventDefault();
    if (!newComment.trim()) return;
    const review = {
      id: Date.now(),
      name: "Guest User",
      rating: newRating,
      date: new Date().toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' }),
      comment: newComment
    };
    setReviews([review, ...reviews]);
    setNewComment("");
  };

  return (
    <div className="bg-white min-h-screen pb-20 font-sans text-slate-900">
      {/* --- Top Nav --- */}
      <nav className="bg-emerald-800 text-white sticky top-0 z-50 px-4 py-3 flex items-center justify-between shadow-md">
        <div className="flex items-center gap-4">
          <button onClick={() => navigate(-1)} className="p-1 hover:bg-emerald-700 rounded-full transition-colors">
            <ArrowLeft size={24} />
          </button>
          <div className="flex items-center gap-2">
            <Leaf className="text-emerald-400" size={20} />
            <span className="font-black tracking-tighter text-lg uppercase">{t("AGRIWISE")}</span>
          </div>
        </div>
        <div className="flex gap-4">
          <Share2 size={20} className="cursor-pointer hover:text-emerald-300" />
          <Heart size={20} className="cursor-pointer hover:text-red-400" />
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 lg:px-8 pt-6">
        {/* --- Upper Section: Product Info and Image --- */}
        <div className="flex flex-col lg:flex-row gap-10">

          {/* --- Left: Image Gallery (Defined aspect ratio to prevent "too long" image) --- */}
          <div className="lg:w-1/2 lg:sticky lg:top-24 h-fit">
            <div className="relative group rounded-3xl overflow-hidden bg-slate-100 border border-slate-200 aspect-square max-h-[500px]">
              <img
                src={product.imageUrl}
                alt={product.crop}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute top-4 left-4 bg-emerald-600 text-white px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest shadow-lg">
                {t("Verified Harvest")}
              </div>
            </div>

            {/* Feature Trust Badges */}
            <div className="grid grid-cols-4 gap-2 mt-4">
              {[
                { icon: <Truck size={18} />, label: "Fast" },
                { icon: <ShieldCheck size={18} />, label: "Secure" },
                { icon: <Leaf size={18} />, label: "Organic" },
                { icon: <CheckCircle2 size={18} />, label: "Tested" }
              ].map((item, idx) => (
                <div key={idx} className="flex flex-col items-center p-2 rounded-2xl bg-slate-50 text-center border border-slate-100">
                  <div className="text-emerald-600 mb-1">{item.icon}</div>
                  <span className="text-[8px] font-bold text-slate-500 uppercase">{item.label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* --- Center: Product Info --- */}
          <div className="lg:w-[45%] flex flex-col gap-6">
            <div>
              <p className="text-emerald-600 font-bold text-sm">Brand: {product.farmer}'s Organic</p>
              <h1 className="text-3xl lg:text-4xl font-black text-slate-800 mt-1 capitalize leading-tight">
                {localProduct.crop} - Fresh Harvest from {localProduct.location}
              </h1>

              {localProduct.isBiddingActive && (
                <div className="mt-4 flex items-center gap-2 bg-red-100 text-red-600 px-4 py-2 rounded-full w-fit animate-pulse border border-red-200">
                  <Gavel size={18} />
                  <span className="font-black text-xs uppercase tracking-widest">LIVE BIDDING ACTIVE</span>
                </div>
              )}

              <div className="flex items-center gap-3 mt-3">
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={16} className={`${i < Math.floor(product.rating || 4) ? 'text-yellow-400 fill-yellow-400' : 'text-slate-200'}`} />
                  ))}
                </div>
                <span className="text-emerald-600 text-sm font-bold">
                  {product.rating || 4.5} (112 ratings)
                </span>
              </div>
            </div>

            <hr className="border-slate-100" />

            <div className="flex flex-col gap-1">
              <div className="flex items-baseline gap-2">
                <span className="text-red-600 text-2xl font-light">-15%</span>
                <span className="text-3xl font-bold">₹{product.price}</span>
              </div>
              <p className="text-slate-500 text-sm italic">{t("M.R.P.:")} <span className="line-through">₹{Math.floor(product.price * 1.15)}</span></p>
              <p className="text-emerald-700 font-bold text-sm mt-2 flex items-center gap-2">
                <Award size={16} /> Best Price in {product.location}
              </p>
            </div>

            <div className="space-y-4 mt-2">
              <h3 className="font-black text-lg border-b-2 border-emerald-500 w-fit pb-1">{t("Product Specifications")}</h3>
              <table className="w-full text-sm text-slate-600">
                <tbody>
                  <tr className="border-b border-slate-50"><td className="py-2 font-bold w-1/3">{t("Farmer")}</td><td>{product.farmer}</td></tr>
                  <tr className="border-b border-slate-50"><td className="py-2 font-bold">{t("Origin")}</td><td>{product.location}, India</td></tr>
                  <tr className="border-b border-slate-50"><td className="py-2 font-bold">{t("Stock")}</td><td>{product.quantity} Quintals</td></tr>
                  <tr className="border-b border-slate-50"><td className="py-2 font-bold">{t("Grade")}</td><td>{t("Grade A (Export Quality)")}</td></tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* --- Right: Sticky Purchase Sidebar --- */}
          <div className="hidden lg:block lg:w-[25%]">
            <div className="border border-slate-200 p-6 rounded-3xl sticky top-24 shadow-sm bg-white">
              <p className="text-2xl font-bold">₹{product.price}</p>
              <p className="text-emerald-600 text-sm font-bold mt-2 flex items-center gap-1 underline cursor-pointer">
                {t("FREE Delivery")} <ChevronRight size={14} />
              </p>

              <div className="my-6 space-y-3">
                <p className="text-emerald-700 text-xl font-bold">{t("In Stock")}</p>
                <div className="bg-slate-100 p-2 rounded-lg flex items-center justify-between text-sm font-bold">
                  <span>{t("Quantity:")}</span>
                  <select className="bg-transparent outline-none">
                    {[...Array(5)].map((_, i) => <option key={i + 1}>{i + 1} Quintal</option>)}
                  </select>
                </div>
              </div>

              <div className="flex flex-col gap-3">
                <button onClick={handleAddToCart} className="w-full bg-yellow-400 hover:bg-yellow-500 text-slate-900 py-3 rounded-full font-bold text-sm shadow-sm transition-all active:scale-95">
                  {t("Add to Cart")}
                </button>
                <button className="w-full bg-orange-500 hover:bg-orange-600 text-white py-3 rounded-full font-bold text-sm shadow-sm transition-all active:scale-95">
                  {t("Buy Now")}
                </button>
              </div>

              {/* Bidding Section */}
              <div className="mt-8 pt-8 border-t border-slate-100 space-y-4">
                <div className="flex items-center gap-2 text-slate-800">
                  <Gavel size={20} className="text-emerald-600" />
                  <h4 className="font-black tracking-tight">Market Auction</h4>
                </div>

                {localProduct.isBiddingActive ? (
                  <button
                    onClick={() => setIsBiddingModalOpen(true)}
                    className="w-full bg-emerald-600 hover:bg-emerald-700 text-white py-4 rounded-2xl font-black text-sm shadow-lg shadow-emerald-600/20 flex items-center justify-center gap-3 transition-all active:scale-95"
                  >
                    <Gavel size={20} /> JOIN LIVE BIDDING
                  </button>
                ) : isFarmerOwner ? (
                  <div className="space-y-3">
                    <div className="bg-slate-50 p-3 rounded-xl border border-slate-100 flex items-center justify-between">
                      <span className="text-xs font-bold text-slate-500 uppercase tracking-widest">Duration:</span>
                      <select
                        value={bidDuration}
                        onChange={(e) => setBidDuration(Number(e.target.value))}
                        className="bg-transparent text-sm font-black text-emerald-700 outline-none"
                      >
                        <option value={5}>5 Minutes</option>
                        <option value={15}>15 Minutes</option>
                        <option value={30}>30 Minutes</option>
                        <option value={60}>1 Hour</option>
                        <option value={360}>6 Hours</option>
                        <option value={1440}>24 Hours</option>
                      </select>
                    </div>
                    <button
                      onClick={startBidding}
                      className="w-full bg-white border-2 border-emerald-600 text-emerald-700 hover:bg-emerald-50 py-4 rounded-2xl font-black text-sm flex items-center justify-center gap-3 transition-all active:scale-95"
                    >
                      <Gavel size={20} /> START BIDDING SESSION
                    </button>
                  </div>
                ) : (
                  <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100 italic text-slate-400 text-sm font-medium text-center">
                    No active bidding for this product.
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {isBiddingModalOpen && (
          <Bidding
            product={localProduct}
            user={user}
            onClose={() => setIsBiddingModalOpen(false)}
          />
        )}

        {/* --- Bottom Section: Reviews (Comes at the bottom when scrolling) --- */}
        <div className="mt-16 border-t border-slate-100 pt-10 pb-10">
          <div className="flex flex-col lg:flex-row gap-10">
            {/* Review Form */}
            <div className="lg:w-1/3">
              <form onSubmit={handleAddReview} className="bg-emerald-50 p-6 rounded-3xl border border-emerald-100 shadow-sm">
                <h4 className="font-black text-emerald-800 text-lg mb-4 uppercase tracking-tighter">{t("Share your feedback")}</h4>
                <div className="flex gap-2 mb-4">
                  {[1, 2, 3, 4, 5].map(num => (
                    <Star
                      key={num}
                      size={24}
                      onClick={() => setNewRating(num)}
                      className={`cursor-pointer transition-all ${num <= newRating ? 'text-yellow-400 fill-yellow-400 scale-110' : 'text-slate-300'}`}
                    />
                  ))}
                </div>
                <textarea
                  placeholder={t("How was the harvest quality?")}
                  className="w-full bg-white border border-slate-200 rounded-2xl p-4 text-sm focus:ring-2 focus:ring-emerald-500 outline-none h-24 mb-4"
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                />
                <button type="submit" className="w-full bg-emerald-700 text-white py-3 rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-emerald-800 transition-all">
                  {t("Post Review")} <Send size={16} />
                </button>
              </form>
            </div>

            {/* Review List */}
            <div className="lg:w-2/3 space-y-6">
              <h3 className="text-2xl font-black text-slate-800 flex items-center gap-2">
                {t("Customer Feedbacks")} <span className="text-emerald-600 text-sm">({reviews.length})</span>
              </h3>
              {reviews.map(review => (
                <div key={review.id} className="border-b border-slate-50 pb-6 flex gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-slate-100 flex items-center justify-center text-slate-400 shrink-0">
                    <User size={24} />
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between items-center mb-1">
                      <h5 className="font-bold text-slate-800">{review.name}</h5>
                      <span className="text-[10px] text-slate-400 font-bold uppercase">{review.date}</span>
                    </div>
                    <div className="flex mb-2">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} size={12} className={`${i < review.rating ? 'text-yellow-400 fill-yellow-400' : 'text-slate-100'}`} />
                      ))}
                    </div>
                    <p className="text-sm text-slate-600 leading-relaxed italic">"{review.comment}"</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* --- Mobile Fixed Bottom Bar --- */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-slate-200 p-4 flex gap-3 z-50 shadow-[0_-4px_20px_rgba(0,0,0,0.05)]">
        <button onClick={handleAddToCart} className="flex-1 bg-yellow-400 py-3 rounded-xl font-black text-sm">{t("Add to Cart")}</button>
        <button className="flex-1 bg-orange-500 text-white py-3 rounded-xl font-black text-sm">{t("Buy Now")}</button>
        <button className="p-3 border border-slate-200 rounded-xl text-emerald-700">
          <Phone size={20} />
        </button>
      </div>
    </div>
  );
};

export default ProductDetails;