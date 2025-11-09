import React from "react";
import { X, Star, Heart, GitCompare, Zap, HardDrive, Battery, Monitor, Cpu, Camera } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function ProductDetailsModal({ product, isOpen, onClose, onAddToCompare, onToggleFavorite, isFavorite }) {
  if (!product) return null;

  const specs = [
    { label: "RAM", value: product.ram, icon: <Zap className="w-5 h-5" />, color: "from-blue-500 to-cyan-500" },
    { label: "Storage", value: product.storage, icon: <HardDrive className="w-5 h-5" />, color: "from-purple-500 to-pink-500" },
    { label: "Display", value: product.display, icon: <Monitor className="w-5 h-5" />, color: "from-green-500 to-emerald-500" },
    { label: "Battery", value: product.battery, icon: <Battery className="w-5 h-5" />, color: "from-amber-500 to-orange-500" },
    { label: "Processor", value: product.processor, icon: <Cpu className="w-5 h-5" />, color: "from-indigo-500 to-blue-500" },
    { label: "Camera", value: product.camera, icon: <Camera className="w-5 h-5" />, color: "from-red-500 to-pink-500" },
  ].filter(spec => spec.value);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/70 backdrop-blur-md z-50"
          />

          {/* Modal */}
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto">
            <motion.div
              initial={{ opacity: 0, scale: 0.8, y: 50 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.8, y: 50 }}
              transition={{ type: "spring", duration: 0.5 }}
              className="bg-white rounded-3xl shadow-2xl max-w-5xl w-full max-h-[90vh] overflow-y-auto relative"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <button
                onClick={onClose}
                className="absolute top-6 right-6 z-10 bg-red-500 hover:bg-red-600 text-white p-3 rounded-full shadow-xl transition-all duration-300 transform hover:scale-110 hover:rotate-90"
              >
                <X className="w-6 h-6" />
              </button>

              <div className="grid md:grid-cols-2 gap-10 p-10">
                {/* Left: Image */}
                <div className="space-y-6">
                  <motion.div
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2 }}
                    className="relative overflow-hidden bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 rounded-3xl aspect-square shadow-xl"
                  >
                    <img
                      src={product.image_url}
                      alt={product.name}
                      className="w-full h-full object-cover"
                    />
                    
                    {/* Favorite Button */}
                    <button
                      onClick={onToggleFavorite}
                      className={`absolute top-6 left-6 ${isFavorite ? 'bg-red-500 text-white' : 'bg-white/90 text-gray-900'} p-3 rounded-full shadow-xl transition-all duration-300 transform hover:scale-110`}
                    >
                      <Heart className={`w-6 h-6 ${isFavorite ? 'fill-current' : ''}`} />
                    </button>

                    {/* Trending Badge */}
                    {product.trending && (
                      <div className="absolute top-6 right-6 bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-full px-4 py-2 shadow-xl text-sm font-bold flex items-center gap-2">
                        🔥 Trending
                      </div>
                    )}
                  </motion.div>
                </div>

                {/* Right: Details */}
                <motion.div
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 }}
                  className="space-y-6"
                >
                  {/* Title & Brand */}
                  <div>
                    <h2 className="text-4xl font-bold text-gray-900 mb-3 leading-tight">
                      {product.name}
                    </h2>
                    <p className="text-xl text-gray-500 font-semibold">{product.brand}</p>
                  </div>

                  {/* Price & Rating */}
                  <div className="flex items-center justify-between bg-gradient-to-r from-indigo-50 to-purple-50 p-6 rounded-2xl border-2 border-indigo-200">
                    <div>
                      <p className="text-sm text-gray-600 mb-1 font-medium">Price</p>
                      <p className="text-5xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                        ₹{product.price?.toLocaleString('en-IN') || product.price}
                      </p>
                      {product.originalPrice && (
                        <p className="text-base text-gray-400 line-through mt-1">
                          ₹{product.originalPrice?.toLocaleString('en-IN')}
                        </p>
                      )}
                    </div>
                    {product.rating && (
                      <div className="flex flex-col items-center bg-white px-6 py-4 rounded-2xl shadow-lg border-2 border-amber-200">
                        <Star className="w-8 h-8 text-amber-500 fill-amber-500 mb-2" />
                        <span className="text-3xl font-bold text-amber-700">{product.rating}</span>
                        <span className="text-xs text-gray-500 font-medium">Rating</span>
                      </div>
                    )}
                  </div>

                  {/* Category */}
                  <div className="flex gap-3">
                    <span className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-5 py-2 rounded-full text-base font-bold shadow-lg">
                      {product.category}
                    </span>
                  </div>

                  {/* Specifications */}
                  {specs.length > 0 && (
                    <div>
                      <h3 className="text-2xl font-bold text-gray-900 mb-5 flex items-center gap-2">
                        <div className="w-2 h-8 bg-gradient-to-b from-indigo-600 to-purple-600 rounded-full"></div>
                        Key Specifications
                      </h3>
                      <div className="grid grid-cols-2 gap-4">
                        {specs.map((spec, index) => (
                          <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.4 + index * 0.1 }}
                            className="bg-white p-5 rounded-2xl border-2 border-gray-200 hover:border-indigo-300 transition-all duration-300 hover:shadow-lg"
                          >
                            <div className="flex items-center gap-3 mb-2">
                              <div className={`p-2 bg-gradient-to-br ${spec.color} rounded-lg text-white`}>
                                {spec.icon}
                              </div>
                              <span className="text-sm font-bold text-gray-600">{spec.label}</span>
                            </div>
                            <p className="text-lg font-bold text-gray-900">{spec.value}</p>
                          </motion.div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Action Button */}
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => {
                      onAddToCompare();
                      onClose();
                    }}
                    className="w-full bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 hover:from-indigo-700 hover:via-purple-700 hover:to-pink-700 text-white py-5 px-8 rounded-2xl font-bold text-xl transition-all duration-300 shadow-2xl hover:shadow-indigo-500/50 flex items-center justify-center gap-3"
                  >
                    <GitCompare className="w-6 h-6" />
                    Add to Compare
                  </motion.button>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}