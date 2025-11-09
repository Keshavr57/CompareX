import React from "react";
import { 
  X, Award, Zap, HardDrive, Battery, Smartphone, Monitor, Cpu, 
  Plus, Download, Star, TrendingUp, Eye, Package 
} from "lucide-react";
import { motion } from "framer-motion";

export default function ComparisonTable({ products, removeFromCompare }) {
  if (products.length === 0) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center p-6 pt-24">
        <div className="relative max-w-2xl text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            className="mb-12"
          >
            <div className="w-32 h-32 mx-auto rounded-2xl border border-white/10 bg-white/5 flex items-center justify-center relative">
              <Monitor className="w-16 h-16 text-cyan-400" />
              <div className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-gradient-to-r from-cyan-500 to-purple-500 flex items-center justify-center">
                <Plus className="w-4 h-4 text-white" />
              </div>
            </div>
          </motion.div>

          <h2 className="text-5xl font-bold text-white mb-6">
            No Products Selected
          </h2>
          <p className="text-gray-400 text-xl mb-8 max-w-lg mx-auto">
            Add products to compare specifications side by side
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <button className="bg-gradient-to-r from-cyan-500 to-purple-500 hover:opacity-90 text-white px-8 py-4 rounded-lg font-semibold transition-all flex items-center gap-3">
              <Eye className="w-5 h-5" />
              Browse Products
            </button>
            <div className="px-6 py-3 rounded-lg border border-white/10 bg-white/5 text-gray-400 font-medium flex items-center gap-2">
              <Package className="w-4 h-4" />
              Select from catalog
            </div>
          </div>
        </div>
      </div>
    );
  }

  const specsKeys = Object.keys(products[0].specs);

  const getSpecIcon = (specKey) => {
    const key = specKey.toLowerCase();
    if (key.includes('ram') || key.includes('memory')) return <Zap className="w-5 h-5 text-cyan-400" />;
    if (key.includes('storage') || key.includes('disk')) return <HardDrive className="w-5 h-5 text-purple-400" />;
    if (key.includes('battery')) return <Battery className="w-5 h-5 text-cyan-400" />;
    if (key.includes('display') || key.includes('screen')) return <Monitor className="w-5 h-5 text-cyan-400" />;
    if (key.includes('cpu') || key.includes('processor')) return <Cpu className="w-5 h-5 text-cyan-400" />;
    return <Smartphone className="w-5 h-5 text-gray-500" />;
  };

  const getBestValue = (specKey) => {
    const values = products.map(p => {
      const val = p.specs[specKey];
      if (typeof val === 'string' && val.includes('GB')) {
        return parseInt(val.replace(/[^0-9]/g, ''));
      }
      if (typeof val === 'string' && val.includes('mAh')) {
        return parseInt(val.replace(/[^0-9]/g, ''));
      }
      return 0;
    });
    const maxValue = Math.max(...values);
    return values.map(val => val === maxValue && val > 0);
  };

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

        <div className="relative max-w-7xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Advanced Product Comparison
          </h1>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto mb-6">
            Compare specifications and find your perfect match
          </p>
          <div className="flex justify-center items-center gap-3">
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-5 h-5 fill-cyan-400 text-cyan-400" />
              ))}
            </div>
            <span className="text-gray-500">Trusted by thousands</span>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 pb-16">
        {/* Product Cards Header */}
        <div className="grid gap-8 mb-12" style={{gridTemplateColumns: `250px repeat(${products.length}, 1fr)`}}>
          <div className="flex items-end pb-6">
            <div>
              <h3 className="text-2xl font-bold text-white mb-2">Products</h3>
              <p className="text-gray-400">Compare {products.length} items</p>
            </div>
          </div>
          {products.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="group relative"
            >
              <div className="rounded-2xl border border-white/10 bg-white/5 p-8 text-center relative overflow-hidden hover:bg-white/10 transition-all">
                <button
                  onClick={() => removeFromCompare(product.id)}
                  className="absolute top-4 right-4 p-3 rounded-lg bg-white/10 hover:bg-red-500 text-white transition-all"
                  title="Remove"
                >
                  <X className="w-4 h-4" />
                </button>

                <div className="mb-6">
                  <div className="w-32 h-32 mx-auto rounded-2xl overflow-hidden border border-white/10">
                    <img 
                      src={product.image_url} 
                      alt={product.name} 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="mt-4 inline-flex items-center bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 px-3 py-1 rounded-lg text-sm font-semibold">
                    <Star className="w-3 h-3 mr-1 fill-current" />
                    4.{8 + index}
                  </div>
                </div>

                <h3 className="text-2xl font-bold text-white mb-3">
                  {product.name}
                </h3>
                <div className="mb-6">
                  <span className="text-3xl font-bold text-cyan-400">
                    ₹{product.price.toLocaleString("en-IN")}
                  </span>
                  <span className="text-gray-500 line-through ml-2 text-lg">
                    ₹{Math.floor(product.price * 1.2).toLocaleString("en-IN")}
                  </span>
                </div>

                {index === 0 && (
                  <div className="inline-flex items-center bg-gradient-to-r from-cyan-500 to-purple-500 text-white px-4 py-2 rounded-lg text-sm font-semibold mb-4">
                    <Award className="w-4 h-4 mr-2" />
                    Best Value
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Comparison Table */}
        <div className="rounded-2xl border border-white/10 bg-white/5 overflow-hidden">
          <div className="px-8 py-6 border-b border-white/10">
            <h3 className="text-2xl font-bold text-white flex items-center gap-3">
              <div className="p-3 rounded-xl bg-cyan-500/10">
                <TrendingUp className="w-6 h-6 text-cyan-400" />
              </div>
              Detailed Specifications
            </h3>
          </div>

          <div className="overflow-x-auto">
            <div className="min-w-full">
              {specsKeys.map((specKey, index) => {
                const bestValues = getBestValue(specKey);
                return (
                  <div 
                    key={specKey} 
                    className={`grid gap-8 p-6 border-b border-white/10 hover:bg-white/5 transition-all ${
                      index % 2 === 0 ? 'bg-transparent' : 'bg-white/[0.02]'
                    }`}
                    style={{gridTemplateColumns: `250px repeat(${products.length}, 1fr)`}}
                  >
                    <div className="flex items-center space-x-4">
                      <div className="p-3 rounded-xl bg-white/5">
                        {getSpecIcon(specKey)}
                      </div>
                      <span className="font-bold text-white text-xl">
                        {specKey.charAt(0).toUpperCase() + specKey.slice(1)}
                      </span>
                    </div>

                    {products.map((product, productIndex) => (
                      <div 
                        key={product.id} 
                        className={`text-center py-4 px-6 rounded-xl transition-all ${
                          bestValues[productIndex] 
                            ? 'bg-cyan-500/10 border border-cyan-500/30' 
                            : 'bg-white/5'
                        }`}
                      >
                        <span className={`font-bold text-xl ${
                          bestValues[productIndex] ? 'text-cyan-400' : 'text-gray-300'
                        }`}>
                          {product.specs[specKey]}
                        </span>
                        {bestValues[productIndex] && (
                          <div className="mt-2">
                            <div className="inline-flex items-center bg-gradient-to-r from-cyan-500 to-purple-500 text-white px-3 py-1 rounded-lg text-xs font-semibold">
                              <TrendingUp className="w-3 h-3 mr-1" />
                              Winner
                            </div>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                );
              })}

              {/* Price Row */}
              <div className="grid gap-8 p-6 bg-white/5" style={{gridTemplateColumns: `250px repeat(${products.length}, 1fr)`}}>
                <div className="flex items-center space-x-4">
                  <div className="p-3 rounded-xl bg-cyan-500/10">
                    <div className="w-5 h-5 bg-cyan-500 rounded-full"></div>
                  </div>
                  <span className="font-bold text-white text-xl">Price</span>
                </div>

                {products.map((product) => (
                  <div key={product.id} className="text-center py-4 px-6 rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 transition-all">
                    <span className="text-3xl font-bold text-cyan-400">
                      ₹{product.price.toLocaleString("en-IN")}
                    </span>
                    <div className="text-cyan-400 text-sm mt-1 font-semibold">
                      Save ₹{Math.floor(product.price * 0.2).toLocaleString("en-IN")}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col lg:flex-row gap-6 justify-center items-center mt-12">
          <button className="bg-gradient-to-r from-cyan-500 to-purple-500 hover:opacity-90 text-white px-10 py-4 rounded-lg font-semibold transition-all flex items-center min-w-[200px]">
            <Plus className="w-5 h-5 mr-2" />
            Add More
          </button>
          <button className="border border-white/10 bg-white/5 hover:bg-white/10 text-white px-10 py-4 rounded-lg font-semibold transition-all flex items-center min-w-[200px]">
            <Download className="w-5 h-5 mr-2" />
            Export
          </button>
        </div>

        {/* Tip */}
        <div className="mt-12 text-center">
          <div className="rounded-2xl border border-cyan-500/30 bg-cyan-500/5 p-6 max-w-2xl mx-auto">
            <p className="text-gray-300 text-lg">
              <span className="text-cyan-400 font-bold text-xl">💡 Pro Tip:</span> Green highlights show the best values for each specification!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}