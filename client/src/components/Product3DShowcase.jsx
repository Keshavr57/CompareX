import React, { useState } from "react";
import { motion } from "framer-motion";
import { Sparkles, Zap, Award, TrendingUp } from "lucide-react";

export default function Product3DShowcase({ products }) {
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const topProducts = products.slice(0, 3);

  return (
    <div className="py-20 px-6 bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0">
        <motion.div
          animate={{
            scale: [1, 1.5, 1],
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: 30,
            repeat: Infinity,
            ease: "linear"
          }}
          className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl"
        />
        <motion.div
          animate={{
            scale: [1, 1.3, 1],
            rotate: [360, 180, 0],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "linear"
          }}
          className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-pink-500/10 rounded-full blur-3xl"
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
            >
              <Sparkles className="w-8 h-8 text-yellow-400" />
            </motion.div>
            <h2 className="text-5xl font-bold text-white">
              Featured Products
            </h2>
            <motion.div
              animate={{ rotate: -360 }}
              transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
            >
              <Sparkles className="w-8 h-8 text-yellow-400" />
            </motion.div>
          </div>
          <p className="text-xl text-gray-300">Experience products in stunning 3D perspective</p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {topProducts.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2 }}
              onHoverStart={() => setHoveredIndex(index)}
              onHoverEnd={() => setHoveredIndex(null)}
              style={{
                transformStyle: "preserve-3d",
                perspective: "1000px",
              }}
              className="relative group"
            >
              <motion.div
                animate={hoveredIndex === index ? {
                  rotateY: 10,
                  rotateX: -10,
                  scale: 1.05,
                } : {
                  rotateY: 0,
                  rotateX: 0,
                  scale: 1,
                }}
                transition={{ duration: 0.3 }}
                className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl border border-white/20 rounded-3xl p-8 shadow-2xl relative overflow-hidden"
                style={{
                  transformStyle: "preserve-3d",
                }}
              >
                {/* Glow Effect */}
                <motion.div
                  animate={hoveredIndex === index ? {
                    opacity: 1,
                    scale: 1.2,
                  } : {
                    opacity: 0,
                    scale: 0.8,
                  }}
                  className="absolute inset-0 bg-gradient-to-br from-purple-500/30 to-pink-500/30 blur-3xl"
                />

                {/* Badge */}
                <div className="absolute top-4 right-4 z-10">
                  <motion.div
                    animate={{ rotate: [0, 10, -10, 0] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-4 py-2 rounded-full text-sm font-bold flex items-center gap-2 shadow-xl"
                  >
                    <Award className="w-4 h-4" />
                    #{index + 1}
                  </motion.div>
                </div>

                {/* Product Image */}
                <div className="relative mb-6" style={{ transform: "translateZ(50px)" }}>
                  <motion.div
                    animate={hoveredIndex === index ? {
                      scale: 1.1,
                      rotateZ: 5,
                    } : {
                      scale: 1,
                      rotateZ: 0,
                    }}
                    className="relative"
                  >
                    <img
                      src={product.image_url}
                      alt={product.name}
                      className="w-full h-64 object-cover rounded-2xl shadow-2xl"
                    />
                    {/* Shine Effect */}
                    <motion.div
                      animate={hoveredIndex === index ? {
                        x: ["-100%", "200%"],
                      } : {}}
                      transition={{ duration: 1 }}
                      className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
                      style={{ transform: "skewX(-20deg)" }}
                    />
                  </motion.div>
                </div>

                {/* Content */}
                <div className="relative z-10" style={{ transform: "translateZ(30px)" }}>
                  <h3 className="text-2xl font-bold text-white mb-2 line-clamp-2">
                    {product.name}
                  </h3>
                  <p className="text-gray-300 mb-4 font-medium">{product.brand}</p>

                  <div className="flex items-center justify-between mb-6">
                    <div>
                      <p className="text-4xl font-bold bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">
                        ₹{product.price?.toLocaleString('en-IN')}
                      </p>
                    </div>
                    {product.rating && (
                      <div className="flex items-center gap-2 bg-yellow-500/20 px-4 py-2 rounded-full border border-yellow-500/50">
                        <Zap className="w-5 h-5 text-yellow-400 fill-yellow-400" />
                        <span className="text-xl font-bold text-yellow-400">{product.rating}</span>
                      </div>
                    )}
                  </div>

                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white py-4 px-6 rounded-xl font-bold text-lg transition-all duration-300 shadow-2xl flex items-center justify-center gap-2"
                  >
                    <TrendingUp className="w-5 h-5" />
                    View Details
                  </motion.button>
                </div>

                {/* Floating Particles */}
                {hoveredIndex === index && (
                  <>
                    {[...Array(5)].map((_, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, y: 0 }}
                        animate={{
                          opacity: [0, 1, 0],
                          y: [-20, -100],
                          x: Math.random() * 100 - 50,
                        }}
                        transition={{
                          duration: 2,
                          repeat: Infinity,
                          delay: i * 0.2,
                        }}
                        className="absolute bottom-0 left-1/2 w-2 h-2 bg-purple-400 rounded-full"
                      />
                    ))}
                  </>
                )}
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}