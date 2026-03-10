import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Upload, ScanSearch, CheckCircle, AlertTriangle, ShieldCheck, Cpu } from 'lucide-react';
import { useTranslation } from 'react-i18next';



const CropImageAnalyzer = () => {
    const { t } = useTranslation();
    const [dragActive, setDragActive] = useState(false);
    const [imagePreview, setImagePreview] = useState(null);
    const [analysisState, setAnalysisState] = useState('IDLE'); // IDLE, SCANNING, COMPLETE, ERROR
    const [result, setResult] = useState(null);
    const fileInputRef = useRef(null);

    const handleDrag = (e) => {
        e.preventDefault();
        e.stopPropagation();
        if (e.type === "dragenter" || e.type === "dragover") {
            setDragActive(true);
        } else if (e.type === "dragleave") {
            setDragActive(false);
        }
    };

    const handleDrop = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setDragActive(false);
        if (e.dataTransfer.files && e.dataTransfer.files[0]) {
            processFile(e.dataTransfer.files[0]);
        }
    };

    const handleChange = (e) => {
        e.preventDefault();
        if (e.target.files && e.target.files[0]) {
            processFile(e.target.files[0]);
        }
    };

    const processFile = async (file) => {
        // Simple validation
        if (!file.type.match('image.*')) {
            alert("Please upload an image file (JPG, PNG).");
            return;
        }

        // Ensure it's not massive
        if (file.size > 5 * 1024 * 1024) {
            alert("File is too large! Please upload under 5MB.");
            return;
        }

        const reader = new FileReader();
        reader.onloadend = () => {
            setImagePreview(reader.result);
        };
        reader.readAsDataURL(file);

        setAnalysisState('SCANNING');

        const formData = new FormData();
        formData.append('image', file);

        try {
            const apiUrl = import.meta.env.VITE_API_URL || "http://localhost:5001";
            const response = await fetch(`${apiUrl}/api/ml/analyze-crop`, {
                method: 'POST',
                body: formData,
            });

            if (!response.ok) {
                throw new Error("Failed to analyze image");
            }

            const data = await response.json();
            setResult({
                crop: data.crop,
                translationKey: data.translationKey || data.crop.toLowerCase(),
                gradeLetter: data.gradeLetter,
                grade: data.grade,
                price: data.price,
                confidence: data.confidence,
                moisture: data.moisture
            });
            setAnalysisState('COMPLETE');
        } catch (error) {
            console.error(error);
            alert("Error analyzing image. Please try again.");
            setAnalysisState('IDLE');
            setImagePreview(null);
        }
    };

    const resetAnalyzer = () => {
        setImagePreview(null);
        setResult(null);
        setAnalysisState('IDLE');
        if (fileInputRef.current) {
            fileInputRef.current.value = "";
        }
    };

    return (
        <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-xl border border-slate-200 dark:border-slate-700 overflow-hidden col-span-1 md:col-span-2 lg:col-span-1 h-full flex flex-col relative group">

            {/* Header */}
            <div className="p-5 border-b border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/50">
                <div className="flex items-center gap-3">
                    <div className="p-2.5 bg-indigo-500/10 dark:bg-indigo-500/20 rounded-xl">
                        <Cpu className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
                    </div>
                    <div>
                        <h2 className="text-lg font-bold text-slate-800 dark:text-white">
                            {t('aiCropAnalyzer', 'AI Quality Vision')}
                        </h2>
                        <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                            {t('aiCropAnalyzerDesc', 'Upload harvest image for instant price estimates.')}
                        </p>
                    </div>
                </div>
            </div>

            {/* Content Body */}
            <div className="p-5 flex-1 flex flex-col relative min-h-[300px]">

                <AnimatePresence mode="wait">

                    {/* STATE 1: IDLE UPLOAD */}
                    {analysisState === 'IDLE' && (
                        <motion.div
                            key="idle"
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.95 }}
                            className="flex-1 flex flex-col"
                        >
                            <label
                                htmlFor="crop-image-upload"
                                className={`flex-1 flex flex-col items-center justify-center p-6 border-2 border-dashed rounded-xl transition-all cursor-pointer
                                    ${dragActive
                                        ? 'border-indigo-500 bg-indigo-500/10'
                                        : 'border-slate-300 dark:border-slate-600 hover:border-indigo-400 hover:bg-slate-50 dark:hover:bg-slate-700/50 bg-slate-100/50 dark:bg-slate-800/50'
                                    }`}
                                onDragEnter={handleDrag}
                                onDragLeave={handleDrag}
                                onDragOver={handleDrag}
                                onDrop={handleDrop}
                            >
                                <div className="w-16 h-16 mb-4 rounded-full bg-indigo-100 dark:bg-indigo-900/50 flex items-center justify-center text-indigo-500 overflow-hidden shadow-inner">
                                    <Upload className="w-8 h-8" />
                                </div>
                                <span className="font-semibold text-slate-700 dark:text-slate-200 text-center">
                                    {t('dragDropImage', 'Drag & Drop your crop image here')}
                                </span>
                                <span className="text-sm text-slate-500 dark:text-slate-400 mt-2 text-center">
                                    {t('orClickBrowse', 'or click to browse from your device')}
                                </span>

                                <input
                                    ref={fileInputRef}
                                    type="file"
                                    id="crop-image-upload"
                                    accept="image/jpeg, image/png, image/webp"
                                    className="hidden"
                                    onChange={handleChange}
                                />
                            </label>
                        </motion.div>
                    )}

                    {/* STATE 2: SCANNING / PROCESSING */}
                    {analysisState === 'SCANNING' && (
                        <motion.div
                            key="scanning"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="absolute inset-0 z-10 bg-slate-900 rounded-b-2xl overflow-hidden flex flex-col items-center justify-center"
                        >
                            {/* Blurred Image Background */}
                            <div
                                className="absolute inset-0 opacity-40 blur-sm scale-105 bg-cover bg-center"
                                style={{ backgroundImage: `url(${imagePreview})` }}
                            />

                            {/* Scanning Overlay Grid */}
                            <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:20px_20px]" />

                            {/* Animated Scanner Laser */}
                            <motion.div
                                animate={{ y: ['-100%', '300%'] }}
                                transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                                className="absolute top-0 left-0 right-0 h-1 bg-indigo-500 shadow-[0_0_20px_5px_rgba(99,102,241,0.5)] z-20"
                            />

                            <div className="relative z-30 flex flex-col items-center">
                                <ScanSearch className="w-16 h-16 text-indigo-400 mb-6 animate-pulse" />
                                <h3 className="text-xl font-bold text-white tracking-widest uppercase mb-2">
                                    {t('analyzingImage', 'Analyzing AI Vision...')}
                                </h3>
                                <p className="text-indigo-200 text-sm animate-pulse">
                                    Extrapolating volumetric density and surface blemishes...
                                </p>

                                {/* Progress Bar */}
                                <div className="w-64 h-2 bg-slate-800 rounded-full mt-6 overflow-hidden">
                                    <motion.div
                                        initial={{ width: "0%" }}
                                        animate={{ width: "100%" }}
                                        transition={{ duration: 3.5, ease: "easeInOut" }}
                                        className="h-full bg-gradient-to-r from-indigo-500 to-cyan-400"
                                    />
                                </div>
                            </div>
                        </motion.div>
                    )}

                    {/* STATE 3: RESULTS */}
                    {analysisState === 'COMPLETE' && result && (
                        <motion.div
                            key="complete"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="flex-1 flex flex-col gap-4 overflow-y-auto pr-2 custom-scrollbar"
                        >
                            {/* Result Top Card */}
                            <div className="flex gap-4">
                                <div className="w-24 h-24 rounded-xl overflow-hidden shrink-0 border-2 border-slate-200 dark:border-slate-700 relative">
                                    <img src={imagePreview} alt="Analyzed Crop" className="w-full h-full object-cover" />
                                    <div className="absolute top-1 right-1 bg-slate-900/80 backdrop-blur text-white text-[10px] font-bold px-1.5 py-0.5 rounded flex items-center gap-1">
                                        <ShieldCheck className="w-3 h-3 text-emerald-400" /> AI
                                    </div>
                                </div>
                                <div className="flex-1 flex flex-col justify-center">
                                    <span className="text-xs font-bold tracking-wider text-slate-500 dark:text-slate-400 uppercase">
                                        Identified Subject
                                    </span>
                                    <h3 className="text-2xl font-black text-slate-800 dark:text-white leading-tight">
                                        {t(result.translationKey, result.crop)}
                                    </h3>
                                    <div className="flex items-center gap-2 mt-1.5">
                                        <span className="text-xs bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 px-2 py-0.5 rounded-md font-medium">
                                            {result.confidence}% Match
                                        </span>
                                        <span className="text-xs bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 px-2 py-0.5 rounded-md font-medium">
                                            {result.moisture}% Moisture
                                        </span>
                                    </div>
                                </div>
                            </div>

                            {/* Grade Box */}
                            <div className={`mt-2 p-4 rounded-xl border ${result.gradeLetter === 'A' ? 'border-emerald-200 dark:border-emerald-800 bg-emerald-50 dark:bg-emerald-900/10' : result.gradeLetter === 'B' ? 'border-blue-200 dark:border-blue-800 bg-blue-50 dark:bg-blue-900/10' : 'border-amber-200 dark:border-amber-800 bg-amber-50 dark:bg-amber-900/10'}`}>
                                <div className="flex justify-between items-start mb-2">
                                    <div>
                                        <span className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">Quality Grade</span>
                                        <div className={`text-lg font-black ${result.grade.color} flex items-center gap-1.5`}>
                                            Grade {result.gradeLetter}
                                            {result.gradeLetter === 'A' && <CheckCircle className="w-4 h-4" />}
                                        </div>
                                    </div>
                                    <div className={`w-10 h-10 rounded-full flex items-center justify-center font-black text-xl ${result.grade.color} ${result.grade.bg}`}>
                                        {result.gradeLetter}
                                    </div>
                                </div>
                                <p className="text-sm text-slate-600 dark:text-slate-300">
                                    {t(`grade${result.gradeLetter}Desc`, result.grade.desc)}
                                </p>
                            </div>

                            {/* Price Estimation */}
                            <div className="mt-1 bg-slate-50 dark:bg-slate-800/80 rounded-xl p-4 border border-slate-200 dark:border-slate-700 flex justify-between items-center">
                                <div>
                                    <span className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 block mb-1">
                                        Estimated Market Value
                                    </span>
                                    <div className="text-2xl font-black text-indigo-600 dark:text-indigo-400">
                                        ₹{result.price.toLocaleString('en-IN')}
                                        <span className="text-sm font-medium text-slate-500 dark:text-slate-400 ml-1">/ quintal</span>
                                    </div>
                                </div>
                                <div className="text-right">
                                    <AlertTriangle className="w-5 h-5 text-amber-500 inline-block mb-1" />
                                    <p className="text-[10px] text-slate-500 dark:text-slate-400 max-w-[100px] leading-tight">
                                        Calculated based on today's Mandi API data.
                                    </p>
                                </div>
                            </div>

                            {/* Actions */}
                            <div className="mt-auto pt-4 flex gap-3">
                                <button
                                    onClick={resetAnalyzer}
                                    className="px-4 py-2.5 rounded-lg border border-slate-300 dark:border-slate-600 text-sm font-semibold text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors"
                                >
                                    Scan Another
                                </button>
                                <button className="flex-1 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold rounded-lg text-sm transition-colors shadow-lg shadow-indigo-500/30">
                                    Sell at this Price
                                </button>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
};

export default CropImageAnalyzer;
