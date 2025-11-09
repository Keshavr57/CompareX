import React, { useState, useEffect } from "react";
import { Sparkles, TrendingUp, Brain, Star, ArrowRight, Smartphone, Laptop, Tablet, Watch, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";

export default function AIRecommendation({ products }) {
  const [showRecommendation, setShowRecommendation] = useState(false);
  const [step, setStep] = useState('welcome');
  const [preferences, setPreferences] = useState({
    category: '',
    budget: '',
    priority: ''
  });
  const [recommendations, setRecommendations] = useState([]);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowRecommendation(true);
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  const getSmartRecommendations = () => {
    setIsAnalyzing(true);
    
    setTimeout(() => {
      let filtered = products;

      if (preferences.category) {
        filtered = filtered.filter(p => p.category === preferences.category);
      }

      if (preferences.budget) {
        const budgetRanges = {
          'under-30k': [0, 30000],
          '30k-60k': [30000, 60000],
          '60k-100k': [60000, 100000],
          'above-100k': [100000, Infinity]
        };
        const [min, max] = budgetRanges[preferences.budget] || [0, Infinity];
        filtered = filtered.filter(p => p.price >= min && p.price <= max);
      }

      if (preferences.priority === 'performance') {
        filtered.sort((a, b) => {
          const aScore = (a.ram?.match(/\d+/)?.[0] || 0) + (a.storage?.match(/\d+/)?.[0] || 0);
          const bScore = (b.ram?.match(/\d+/)?.[0] || 0) + (b.storage?.match(/\d+/)?.[0] || 0);
          return bScore - aScore;
        });
      } else if (preferences.priority === 'price') {
        filtered.sort((a, b) => a.price - b.price);
      } else if (preferences.priority === 'rating') {
        filtered.sort((a, b) => (b.rating || 0) - (a.rating || 0));
      }

      setRecommendations(filtered.slice(0, 3));
      setStep('results');
      setIsAnalyzing(false);
    }, 1500);
  };

  return (
    <AnimatePresence>
      {showRecommendation && (
        <motion.div
          initial={{ opacity: 0, y: 100, scale: 0.8 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 100, scale: 0.8 }}
          className="fixed bottom-6 left-6 z-50 max-w-md"
        >
          <div className="rounded-2xl border border-cyan-500/30 bg-black/95 backdrop-blur-xl p-6 shadow-2xl">
            <div className="relative">
              {/* Header */}
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                    className="p-3 rounded-xl bg-gradient-to-br from-cyan-500 to-purple-500"
                  >
                    <Brain className="w-6 h-6 text-white" />
                  </motion.div>
                  <div>
                    <h3 className="text-xl font-bold text-cyan-400">
                      AI Assistant
                    </h3>
                    <p className="text-xs text-gray-500">Smart Recommendations</p>
                  </div>
                </div>
                <button
                  onClick={() => setShowRecommendation(false)}
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Step 1: Welcome */}
              {step === 'welcome' && (
                <div className="text-center py-6">
                  <motion.div animate={{ scale: [1, 1.1, 1] }} transition={{ duration: 1.5, repeat: Infinity }}>
                    <Sparkles className="w-16 h-16 mx-auto mb-4 text-cyan-400" />
                  </motion.div>
                  <p className="text-white mb-2 font-semibold text-lg">Hi! I'm your AI Assistant 👋</p>
                  <p className="text-gray-400 mb-6 text-sm">Let me help you find the perfect product!</p>
                  <button
                    onClick={() => setStep('category')}
                    className="bg-gradient-to-r from-cyan-500 to-purple-500 hover:opacity-90 text-white px-8 py-3 rounded-lg font-semibold transition-all flex items-center gap-2 mx-auto"
                  >
                    <Sparkles className="w-5 h-5" />
                    Get Started
                  </button>
                </div>
              )}

              {/* Step 2: Category */}
              {step === 'category' && (
                <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-4">
                  <p className="font-bold text-white mb-4">What are you looking for?</p>
                  <div className="grid grid-cols-2 gap-3">
                    {[
                      { name: 'Mobile', icon: Smartphone, color: 'from-cyan-500 to-blue-500' },
                      { name: 'Laptop', icon: Laptop, color: 'from-purple-500 to-pink-500' },
                      { name: 'Tablet', icon: Tablet, color: 'from-pink-500 to-red-500' },
                      { name: 'Smartwatch', icon: Watch, color: 'from-green-500 to-emerald-500' }
                    ].map(cat => (
                      <button
                        key={cat.name}
                        onClick={() => {
                          setPreferences({...preferences, category: cat.name});
                          setStep('budget');
                        }}
                        className={`p-4 rounded-lg bg-gradient-to-br ${cat.color} text-white font-semibold hover:scale-105 transition-transform flex flex-col items-center gap-2`}
                      >
                        <cat.icon className="w-8 h-8" />
                        {cat.name}
                      </button>
                    ))}
                  </div>
                </motion.div>
              )}

              {/* Step 3: Budget */}
              {step === 'budget' && (
                <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-4">
                  <p className="font-bold text-white mb-4">What's your budget?</p>
                  <div className="space-y-2">
                    {[
                      { label: 'Under ₹30,000', value: 'under-30k' },
                      { label: '₹30,000 - ₹60,000', value: '30k-60k' },
                      { label: '₹60,000 - ₹1,00,000', value: '60k-100k' },
                      { label: 'Above ₹1,00,000', value: 'above-100k' }
                    ].map(budget => (
                      <button
                        key={budget.value}
                        onClick={() => {
                          setPreferences({...preferences, budget: budget.value});
                          setStep('priority');
                        }}
                        className="w-full p-4 rounded-lg bg-white/5 border border-white/10 hover:border-cyan-500/30 hover:bg-white/10 font-medium text-white transition-all"
                      >
                        {budget.label}
                      </button>
                    ))}
                  </div>
                </motion.div>
              )}

              {/* Step 4: Priority */}
              {step === 'priority' && (
                <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-4">
                  <p className="font-bold text-white mb-4">What matters most?</p>
                  <div className="space-y-2">
                    {[
                      { label: '🚀 Best Performance', value: 'performance' },
                      { label: '💰 Best Price', value: 'price' },
                      { label: '⭐ Highest Rated', value: 'rating' }
                    ].map(priority => (
                      <button
                        key={priority.value}
                        onClick={() => {
                          setPreferences({...preferences, priority: priority.value});
                          getSmartRecommendations();
                        }}
                        className="w-full p-4 rounded-lg bg-white/5 border border-white/10 hover:border-cyan-500/30 hover:bg-white/10 font-medium text-white transition-all text-left"
                      >
                        {priority.label}
                      </button>
                    ))}
                  </div>
                </motion.div>
              )}

              {/* Step 5: Results */}
              {step === 'results' && (
                <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="space-y-4">
                  {isAnalyzing ? (
                    <div className="text-center py-8">
                      <motion.div animate={{ rotate: 360 }} transition={{ duration: 1, repeat: Infinity, ease: "linear" }}>
                        <Brain className="w-12 h-12 mx-auto text-cyan-400" />
                      </motion.div>
                      <p className="mt-4 font-semibold text-white">Finding perfect matches...</p>
                    </div>
                  ) : recommendations.length > 0 ? (
                    <>
                      <div className="flex items-center gap-2 mb-3">
                        <TrendingUp className="w-5 h-5 text-cyan-400" />
                        <p className="text-sm font-semibold text-white">Top {recommendations.length} Recommendations</p>
                      </div>
                      <div className="space-y-3 max-h-96 overflow-y-auto">
                        {recommendations.map((product) => (
                          <button
                            key={product.id}
                            onClick={() => {
                              navigate('/products');
                              setShowRecommendation(false);
                            }}
                            className="w-full rounded-lg p-3 border border-white/10 bg-white/5 hover:border-cyan-500/30 hover:bg-white/10 transition-all cursor-pointer"
                          >
                            <div className="flex gap-3">
                              <img src={product.image_url} alt={product.name} className="w-16 h-16 object-cover rounded-lg" />
                              <div className="flex-1 text-left">
                                <h4 className="font-semibold text-white text-sm line-clamp-1">{product.name}</h4>
                                <div className="flex items-center gap-2 my-1">
                                  <Star className="w-3 h-3 text-cyan-400 fill-cyan-400" />
                                  <span className="text-xs font-semibold text-cyan-400">{product.rating}</span>
                                </div>
                                <p className="text-sm font-bold text-cyan-400">
                                  ₹{product.price?.toLocaleString('en-IN')}
                                </p>
                              </div>
                              <ArrowRight className="w-5 h-5 text-cyan-400 self-center" />
                            </div>
                          </button>
                        ))}
                      </div>
                      <div className="flex gap-2">
                        <button 
                          onClick={() => {
                            navigate('/products');
                            setShowRecommendation(false);
                          }} 
                          className="flex-1 bg-gradient-to-r from-cyan-500 to-purple-500 text-white py-3 px-4 rounded-lg font-semibold hover:opacity-90 transition-all flex items-center justify-center gap-2"
                        >
                          <ArrowRight className="w-4 h-4" />
                          Browse All
                        </button>
                        <button onClick={() => { setStep('welcome'); setPreferences({ category: '', budget: '', priority: '' }); }} className="px-4 py-3 bg-white/5 hover:bg-white/10 rounded-lg font-semibold text-white">🔄</button>
                      </div>
                    </>
                  ) : (
                    <div className="text-center py-8">
                      <p className="text-gray-400 mb-4">No products found</p>
                      <button onClick={() => setStep('welcome')} className="bg-cyan-500 text-white px-6 py-2 rounded-lg font-semibold">Try Again</button>
                    </div>
                  )}
                </motion.div>
              )}
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}