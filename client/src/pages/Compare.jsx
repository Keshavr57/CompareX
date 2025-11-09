import React from "react";
import { useCompare } from "../context/CompareContext";
import { useNavigate } from "react-router-dom";
import { 
  X, Trash2, Monitor, Smartphone, Zap, HardDrive, Battery, 
  Award, Package, ArrowRight, Sparkles, TrendingUp
} from "lucide-react";
import { motion } from "framer-motion";

const Compare = () => {
  const { compareList, removeFromCompare, clearCompare } = useCompare();
  const navigate = useNavigate();

  if (compareList.length === 0)
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
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            className="relative mb-12"
          >
            <div className="w-32 h-32 mx-auto rounded-2xl border border-white/10 bg-white/5 flex items-center justify-center">
              <Monitor className="w-16 h-16 text-cyan-400" />
              <div className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-gradient-to-r from-cyan-500 to-purple-500 flex items-center justify-center">
                <Package className="w-4 h-4 text-white" />
              </div>
            </div>
          </motion.div>

          <h2 className="text-5xl font-bold text-white mb-6">
            No Products Selected
          </h2>
          <p className="text-gray-400 text-xl mb-8 max-w-lg mx-auto">
            Start adding products to see detailed side-by-side comparisons
          </p>

          <button 
            onClick={() => navigate("/products")}
            className="bg-gradient-to-r from-cyan-500 to-purple-500 hover:opacity-90 text-white px-8 py-4 rounded-lg font-semibold transition-all inline-flex items-center gap-2"
          >
            Browse Products
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    );

  const attributes = [
    "name", "price", "ram", "storage", "display", "battery", 
    "processor", "gpu", "camera", "connectivity", "health_features", 
    "noise_cancellation", "driver_size"
  ];

  const getAttributeIcon = (attr) => {
    switch(attr) {
      case 'name': return <Smartphone className="w-4 h-4 text-cyan-400" />;
      case 'price': return <div className="w-4 h-4 bg-cyan-500 rounded-full"></div>;
      case 'ram': return <Zap className="w-4 h-4 text-cyan-400" />;
      case 'storage': return <HardDrive className="w-4 h-4 text-purple-400" />;
      case 'display': return <Monitor className="w-4 h-4 text-cyan-400" />;
      case 'battery': return <Battery className="w-4 h-4 text-cyan-400" />;
      default: return <div className="w-4 h-4 bg-gray-500 rounded-full"></div>;
    }
  };

  const getBestValueIndex = (attr) => {
    if (attr === 'price') {
      const prices = compareList.map(p => parseFloat(p[attr] || 0));
      const minPrice = Math.min(...prices);
      return prices.findIndex(price => price === minPrice);
    }
    return -1;
  };

  return (
    <div className="min-h-screen bg-black pt-16">
      {/* Hero */}
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
            <div>
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 bg-white/5 mb-6">
                <Sparkles className="w-4 h-4 text-cyan-400" />
                <span className="text-xs font-semibold text-cyan-400 tracking-wider uppercase">
                  Comparison
                </span>
              </div>
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
                Product Comparison
              </h1>
              <p className="text-xl text-gray-400">
                Comparing {compareList.length} product{compareList.length > 1 ? 's' : ''}
              </p>
            </div>
            <button
              className="px-8 py-4 rounded-lg border border-white/10 bg-white/5 hover:bg-white/10 text-white font-semibold transition-all flex items-center gap-2"
              onClick={clearCompare}
            >
              <Trash2 className="w-5 h-5" />
              Clear All
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 pb-16">
        {/* Product Cards */}
        <div className="grid gap-6 mb-12" style={{gridTemplateColumns: `200px repeat(${compareList.length}, 1fr)`}}>
          <div className="flex items-end pb-4">
            <h3 className="text-lg font-bold text-white">Products</h3>
          </div>
          {compareList.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="group relative"
            >
              <div className="rounded-2xl border border-white/10 bg-white/5 p-6 text-center relative overflow-hidden hover:bg-white/10 transition-all">
                <button
                  onClick={() => removeFromCompare(product.id)}
                  className="absolute top-4 right-4 p-2 rounded-lg bg-white/10 hover:bg-red-500 text-white transition-all"
                  title="Remove"
                >
                  <X className="w-4 h-4" />
                </button>
                {index === 0 && (
                  <div className="absolute top-4 left-4 bg-gradient-to-r from-cyan-500 to-purple-500 text-white px-3 py-1 rounded-lg text-xs font-semibold flex items-center gap-1">
                    <Award className="w-3 h-3" />
                    Best Pick
                  </div>
                )}
                <div className="mb-6">
                  <div className="w-24 h-24 mx-auto rounded-xl overflow-hidden border border-white/10">
                    <img 
                      src={product.image_url || '/api/placeholder/80/80'} 
                      alt={product.name} 
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">
                  {product.name}
                </h3>
                <div className="text-2xl font-bold text-cyan-400">
                  ₹{product.price.toLocaleString("en-IN")}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Comparison Table */}
        <div className="rounded-2xl border border-white/10 bg-white/5 overflow-hidden">
          <div className="px-6 py-4 border-b border-white/10">
            <h3 className="text-xl font-bold text-white flex items-center gap-3">
              <div className="p-2 rounded-lg bg-cyan-500/10">
                <TrendingUp className="w-5 h-5 text-cyan-400" />
              </div>
              Detailed Specifications
            </h3>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-white/10">
                  <th className="p-6 text-left">
                    <span className="text-white font-bold text-lg">Features</span>
                  </th>
                  {compareList.map((product) => (
                    <th key={product.id} className="p-6 text-center min-w-[200px]">
                      <div className="flex flex-col items-center gap-3">
                        <div className="w-16 h-16 rounded-xl overflow-hidden border border-white/10">
                          <img 
                            src={product.image_url || '/api/placeholder/64/64'} 
                            alt={product.name} 
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="text-center">
                          <div className="font-semibold text-white text-sm mb-1">
                            {product.name}
                          </div>
                          <div className="text-cyan-400 font-bold">
                            ₹{product.price.toLocaleString("en-IN")}
                          </div>
                        </div>
                      </div>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {attributes.map((attr, index) => {
                  const bestIndex = getBestValueIndex(attr);
                  return (
                    <tr key={attr} className="border-b border-white/10 hover:bg-white/5 transition-colors">
                      <td className="p-6">
                        <div className="flex items-center gap-3">
                          <div className="p-2 rounded-lg bg-white/5">
                            {getAttributeIcon(attr)}
                          </div>
                          <span className="font-semibold text-white capitalize">{attr}</span>
                        </div>
                      </td>
                      {compareList.map((product, productIndex) => (
                        <td key={product.id} className="p-6 text-center">
                          <div className={`rounded-lg py-3 px-4 transition-all ${
                            bestIndex === productIndex && attr === 'price'
                              ? 'bg-cyan-500/10 border border-cyan-500/30' 
                              : 'bg-white/5'
                          }`}>
                            <span className={`font-semibold ${
                              bestIndex === productIndex && attr === 'price' ? 'text-cyan-400' : 'text-gray-300'
                            }`}>
                              {product[attr] !== undefined && product[attr] !== null ? 
                                (attr === 'price' 
                                  ? `₹${product[attr].toLocaleString("en-IN")}` 
                                  : product[attr].toString()
                                ) 
                                : "—"}
                            </span>
                          </div>
                        </td>
                      ))}
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Compare;