import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Heart, Trash2, GitCompare, ArrowRight, Star, Package, Sparkles } from "lucide-react";
import { useCompare } from "../context/CompareContext";
import { motion } from "framer-motion";

export default function Wishlist() {
  const [wishlist, setWishlist] = useState([]);
  const { addToCompare } = useCompare();
  const navigate = useNavigate();

  useEffect(() => {
    const saved = localStorage.getItem("wishlist");
    setWishlist(saved ? JSON.parse(saved) : []);
  }, []);

  const removeFromWishlist = (id) => {
    const updated = wishlist.filter((p) => p.id !== id);
    setWishlist(updated);
    localStorage.setItem("wishlist", JSON.stringify(updated));
  };

  const clearWishlist = () => {
    setWishlist([]);
    localStorage.setItem("wishlist", JSON.stringify([]));
  };

  if (wishlist.length === 0) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center p-6 pt-24">
        <div className="relative max-w-2xl text-center">
          <div className="absolute inset-0 opacity-[0.02]"
            style={{
              backgroundImage: `
                linear-gradient(rgba(255, 255, 255, 0.05) 1px, transparent 1px),
                linear-gradient(90deg, rgba(255, 255, 255, 0.05) 1px, transparent 1px)
              `,
              backgroundSize: '100px 100px',
            }}
          ></div>

          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", duration: 0.8 }}
            className="relative mb-12"
          >
            <div className="w-32 h-32 mx-auto rounded-2xl border border-white/10 bg-white/5 flex items-center justify-center">
              <Heart className="w-16 h-16 text-cyan-400" />
              <div className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-gradient-to-r from-cyan-500 to-purple-500 flex items-center justify-center">
                <Package className="w-4 h-4 text-white" />
              </div>
            </div>
          </motion.div>

          <h2 className="text-5xl font-bold text-white mb-6">
            Your Wishlist is Empty
          </h2>
          <p className="text-gray-400 text-xl mb-10 max-w-lg mx-auto">
            Start adding products you love to keep track of your favorites
          </p>

          <button 
            onClick={() => navigate("/products")}
            className="bg-gradient-to-r from-cyan-500 to-purple-500 hover:opacity-90 text-white px-10 py-5 rounded-lg font-semibold text-lg transition-all inline-flex items-center gap-3"
          >
            Explore Products
            <ArrowRight className="w-6 h-6" />
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black pt-16">
      {/* Hero Section */}
      <div className="relative py-16 px-6 overflow-hidden">
        <div className="absolute inset-0">
          <div 
            className="absolute inset-0 opacity-[0.02]"
            style={{
              backgroundImage: `
                linear-gradient(rgba(255, 255, 255, 0.05) 1px, transparent 1px),
                linear-gradient(90deg, rgba(255, 255, 255, 0.05) 1px, transparent 1px)
              `,
              backgroundSize: '100px 100px',
            }}
          ></div>
        </div>

        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div
            className="absolute top-0 left-1/4 w-[500px] h-[500px] rounded-full opacity-10 blur-[120px]"
            style={{
              background: 'radial-gradient(circle, rgba(6, 182, 212, 0.3), transparent 70%)',
            }}
          />
        </div>
        
        <div className="relative max-w-7xl mx-auto">
          <div className="flex flex-col lg:flex-row justify-between items-center gap-8">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 bg-white/5 mb-6">
                <Heart className="w-4 h-4 text-cyan-400" />
                <span className="text-xs font-semibold text-cyan-400 tracking-wider uppercase">
                  Your Favorites
                </span>
              </div>
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
                My Wishlist
              </h1>
              <p className="text-xl text-gray-400">
                {wishlist.length} {wishlist.length === 1 ? 'product' : 'products'} saved
              </p>
            </motion.div>
            
            <motion.button
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="px-8 py-4 rounded-lg border border-white/10 bg-white/5 hover:bg-white/10 text-white font-semibold transition-all flex items-center gap-3"
              onClick={clearWishlist}
            >
              <Trash2 className="w-6 h-6" />
              Clear All
            </motion.button>
          </div>
        </div>
      </div>

      {/* Wishlist Grid */}
      <div className="max-w-7xl mx-auto px-6 pb-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {wishlist.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.05 }}
              className="group rounded-2xl border border-white/10 bg-white/5 hover:bg-white/10 hover:border-cyan-500/30 transition-all overflow-hidden flex flex-col h-full"
            >
              {/* Image */}
              <div className="relative overflow-hidden bg-black/20 aspect-square">
                <img 
                  src={product.image_url} 
                  alt={product.name} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                />
                
                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                
                {/* Remove Button */}
                <button
                  onClick={() => removeFromWishlist(product.id)}
                  className="absolute top-4 right-4 bg-white/20 backdrop-blur-sm hover:bg-red-500 text-white p-3 rounded-lg transition-all z-10"
                  title="Remove"
                >
                  <Trash2 className="w-5 h-5" />
                </button>

                {/* Favorite Badge */}
                <div className="absolute top-4 left-4 bg-gradient-to-r from-cyan-500 to-purple-500 text-white rounded-lg px-4 py-2 text-sm font-semibold flex items-center gap-2">
                  <Heart className="w-4 h-4 fill-current" />
                  Favorite
                </div>
              </div>

              {/* Content */}
              <div className="p-5 flex-1 flex flex-col">
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-white mb-2 line-clamp-2">
                    {product.name}
                  </h3>
                  
                  <p className="text-sm text-gray-500 mb-4">
                    {product.brand}
                  </p>

                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <p className="text-2xl font-bold text-white">
                        ₹{product.price?.toLocaleString('en-IN') || product.price}
                      </p>
                    </div>
                    
                    {product.rating && (
                      <div className="flex items-center gap-1 bg-white/10 px-3 py-1.5 rounded-lg border border-white/10">
                        <Star className="w-4 h-4 text-cyan-400 fill-cyan-400" />
                        <span className="text-sm font-semibold text-white">
                          {product.rating}
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Quick Specs */}
                  {(product.ram || product.storage) && (
                    <div className="flex gap-2 mb-4 flex-wrap">
                      {product.ram && (
                        <span className="text-xs bg-cyan-500/10 text-cyan-400 px-3 py-1 rounded-lg font-medium border border-cyan-500/20">
                          {product.ram}
                        </span>
                      )}
                      {product.storage && (
                        <span className="text-xs bg-purple-500/10 text-purple-400 px-3 py-1 rounded-lg font-medium border border-purple-500/20">
                          {product.storage}
                        </span>
                      )}
                    </div>
                  )}
                </div>

                {/* Actions */}
                <button
                  onClick={() => {
                    addToCompare(product);
                    navigate('/compare');
                  }}
                  className="w-full bg-gradient-to-r from-cyan-500 to-purple-500 hover:opacity-90 text-white py-3 px-4 rounded-lg font-medium transition-all flex items-center justify-center gap-2"
                >
                  <GitCompare className="w-5 h-5" />
                  Compare Now
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}