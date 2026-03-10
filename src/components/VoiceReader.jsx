import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, Square, Pause, Volume2 } from 'lucide-react';
import { useTranslation } from 'react-i18next'; // if needed, we'll use t()

const VoiceReader = () => {
    const [selectedText, setSelectedText] = useState('');
    const [isPlaying, setIsPlaying] = useState(false);
    const [isPaused, setIsPaused] = useState(false);
    const [voices, setVoices] = useState([]);
    const { t, i18n } = useTranslation();

    // Check for selected text when mouse clicks / selection changes
    useEffect(() => {
        const handleSelectionChange = () => {
            // Need a tiny delay because sometimes selection isn't fully formed on immediate click
            setTimeout(() => {
                const text = window.getSelection().toString().trim();
                // Only show if the text is meaningful (e.g. > 2 chars) and not currently locked into playing
                if (text.length > 2 && !isPlaying && !isPaused) {
                    setSelectedText(text);
                } else if (text.length === 0 && !isPlaying && !isPaused) {
                    setSelectedText('');
                }
            }, 50);
        };

        document.addEventListener('mouseup', handleSelectionChange);
        document.addEventListener('selectionchange', handleSelectionChange);

        return () => {
            document.removeEventListener('mouseup', handleSelectionChange);
            document.removeEventListener('selectionchange', handleSelectionChange);
        };
    }, [isPlaying, isPaused]);

    // Only cancel speech when the component actually unmounts completely
    useEffect(() => {
        return () => {
            if (window.speechSynthesis) {
                window.speechSynthesis.cancel();
            }
        };
    }, []);

    // Handle end of speech
    useEffect(() => {
        const handleSpeechEnd = () => {
            setIsPlaying(false);
            setIsPaused(false);
            // Re-check selection in case they still have text highlighted
            const text = window.getSelection().toString().trim();
            if (text.length > 2) {
                setSelectedText(text);
            } else {
                setSelectedText('');
            }
        };

        // Attach an interval just in case the end event doesn't fire nicely across all browsers
        const checkSpeechStatus = setInterval(() => {
            if (isPlaying && !window.speechSynthesis.speaking) {
                handleSpeechEnd();
            }
        }, 1000);

        return () => clearInterval(checkSpeechStatus);
    }, [isPlaying]);

    // Load available voices asynchronously (required by some browsers)
    useEffect(() => {
        const loadVoices = () => {
            const availableVoices = window.speechSynthesis.getVoices();
            if (availableVoices.length > 0) {
                setVoices(availableVoices);
            }
        };

        // Try immediately
        loadVoices();

        // Listen for when voices are actually populated (Chrome)
        if (typeof window.speechSynthesis !== 'undefined' && window.speechSynthesis.onvoiceschanged !== undefined) {
            window.speechSynthesis.onvoiceschanged = () => {
                loadVoices();
            };
        }
    }, []);

    const playAudio = () => {
        if (!selectedText) return;

        // If it was paused, just resume
        if (isPaused) {
            window.speechSynthesis.resume();
            setIsPaused(false);
            setIsPlaying(true);
            return;
        }

        // Cancel any ongoing speech first
        window.speechSynthesis.cancel();

        const utterance = new SpeechSynthesisUtterance(selectedText);

        // ** FORCE ENGLISH ONLY **

        // 1. Try to find a premium English voice first (like Google US English)
        let selectedVoice = voices.find(voice => voice.name.includes('Google US English'));

        // 2. If no Google voice, find ANY English voice
        if (!selectedVoice) {
            selectedVoice = voices.find(voice => voice.lang.toLowerCase().startsWith('en'));
        }

        // 3. Last resort fallback
        if (!selectedVoice && voices.length > 0) {
            selectedVoice = voices.find(voice => voice.default) || voices[0];
        }

        if (selectedVoice) {
            utterance.voice = selectedVoice;
            utterance.lang = selectedVoice.lang;
        } else {
            // Absolute fallback required by Windows/Mac standard API
            utterance.lang = 'en-US';
        }

        utterance.rate = 1.0;
        utterance.pitch = 1.0;
        utterance.volume = 1.0;

        utterance.onstart = () => {
            setIsPlaying(true);
            setIsPaused(false);
        };

        utterance.onend = () => {
            setIsPlaying(false);
            setIsPaused(false);
        };

        utterance.onerror = (e) => {
            console.error("Speech Synthesis Error:", e);
            window.speechSynthesis.cancel();
            setIsPlaying(false);
            setIsPaused(false);
        };

        // Add a tiny delay before speaking to ensure the engine is fully canceled and reset
        setTimeout(() => {
            window.speechSynthesis.speak(utterance);
        }, 50);
    };

    const pauseAudio = () => {
        if (window.speechSynthesis.speaking) {
            window.speechSynthesis.pause();
            setIsPaused(true);
            setIsPlaying(false);
        }
    };

    const stopAudio = () => {
        window.speechSynthesis.cancel();
        setIsPlaying(false);
        setIsPaused(false);
        setSelectedText(''); // Optionally clear the toolbar entirely until new selection
        window.getSelection().removeAllRanges(); // Deselect the text
    };

    // Show the floating button if we have text OR if we are currently playing/paused
    const isVisible = selectedText.length > 0 || isPlaying || isPaused;

    return (
        <AnimatePresence>
            {isVisible && (
                <motion.div
                    initial={{ y: -100, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: -100, opacity: 0 }}
                    transition={{ type: "spring", stiffness: 300, damping: 25 }}
                    className="fixed top-6 left-1/2 -translate-x-1/2 z-[9999] flex items-center justify-center pointer-events-none"
                >
                    <div className="bg-slate-900 border border-slate-700 rounded-full px-5 py-3 shadow-2xl flex items-center gap-4 pointer-events-auto">
                        <div className="flex items-center gap-2 pr-4 border-r border-slate-700">
                            <div className={`p-2 rounded-full ${isPlaying ? 'bg-emerald-500/20 text-emerald-400' : 'bg-slate-800 text-slate-300'}`}>
                                <Volume2 className="w-5 h-5 animate-pulse" />
                            </div>
                            <span className="text-sm font-bold text-white tracking-wide">
                                {isPlaying ? t('reading', 'Reading Aloud...') : isPaused ? t('paused', 'Paused') : t('readSelected', 'Read Selection')}
                            </span>
                        </div>

                        <div className="flex items-center gap-2">
                            {(!isPlaying || isPaused) && (
                                <button
                                    onClick={playAudio}
                                    className="p-2.5 bg-emerald-500 hover:bg-emerald-400 text-white rounded-full transition-all shadow-lg active:scale-95"
                                    title={t('play', 'Play')}
                                >
                                    <Play className="w-4 h-4 fill-current" />
                                </button>
                            )}

                            {isPlaying && (
                                <button
                                    onClick={pauseAudio}
                                    className="p-2.5 bg-amber-500 hover:bg-amber-400 text-white rounded-full transition-all shadow-lg active:scale-95"
                                    title={t('pause', 'Pause')}
                                >
                                    <Pause className="w-4 h-4 fill-current" />
                                </button>
                            )}

                            <button
                                onClick={stopAudio}
                                className="p-2.5 bg-slate-700 hover:bg-rose-500 text-white rounded-full transition-all shadow-lg active:scale-95"
                                title={t('stop', 'Stop / Close')}
                            >
                                <Square className="w-4 h-4 fill-current" />
                            </button>
                        </div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default VoiceReader;
