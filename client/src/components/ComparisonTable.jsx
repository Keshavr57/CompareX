import React from "react";
import { 
  X, Award, Zap, HardDrive, Battery, Smartphone, Monitor, Cpu, 
  Plus, Download, ShoppingCart, Star, TrendingUp, Eye, ArrowRight, Package 
} from "lucide-react";

export default function ComparisonTable({ products, removeFromCompare }) {
  if (products.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 flex items-center justify-center p-6">
        <div className="text-center max-w-2xl">
          <div className="relative mb-12">
            <div className="w-40 h-40 bg-gradient-to-br from-blue-100 to-indigo-200 rounded-3xl flex items-center justify-center mx-auto backdrop-blur-sm border-2 border-white shadow-2xl">
              <div className="relative">
                <Monitor className="w-20 h-20 text-indigo-600" />
                <div className="absolute -top-3 -right-3 w-8 h-8 bg-gradient-to-br from-orange-400 to-red-500 rounded-full flex items-center justify-center animate-bounce">
                  <Plus className="w-4 h-4 text-white" />
                </div>
              </div>
            </div>
            <div className="absolute -bottom-4 left-1/2 transform -translate-x-1/2">
              <div className="bg-white px-4 py-2 rounded-full shadow-lg border border-gray-200">
                <span className="text-sm font-semibold text-gray-600">Start Comparing</span>
              </div>
            </div>
          </div>

          <h2 className="text-5xl font-bold bg-gradient-to-r from-indigo-600 via-blue-600 to-purple-600 bg-clip-text text-transparent mb-6">
            No Products Selected
          </h2>
          <p className="text-gray-600 text-xl mb-8 leading-relaxed max-w-lg mx-auto">
            Add products to compare their specifications side by side and make informed purchasing decisions
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <button className="bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-700 hover:to-blue-700 text-white px-8 py-4 rounded-2xl font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl flex items-center gap-3">
              <Eye className="w-5 h-5" />
              Browse Products
            </button>
            <div className="text-gray-400 text-sm">or</div>
            <div className="bg-white px-6 py-3 rounded-xl border-2 border-dashed border-gray-300 text-gray-500 font-medium flex items-center gap-2">
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
    if (key.includes('ram') || key.includes('memory')) return <Zap className="w-5 h-5 text-blue-500" />;
    if (key.includes('storage') || key.includes('disk')) return <HardDrive className="w-5 h-5 text-purple-500" />;
    if (key.includes('battery')) return <Battery className="w-5 h-5 text-amber-500" />;
    if (key.includes('display') || key.includes('screen')) return <Monitor className="w-5 h-5 text-pink-500" />;
    if (key.includes('cpu') || key.includes('processor')) return <Cpu className="w-5 h-5 text-orange-500" />;
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
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-indigo-600 via-blue-600 to-purple-700 text-white">
        <div className="max-w-7xl mx-auto px-6 py-16">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Advanced Product Comparison
            </h1>
            <p className="text-xl text-indigo-100 max-w-3xl mx-auto leading-relaxed mb-6">
              Compare specifications and find your perfect match with our intelligent comparison system
            </p>
            <div className="flex justify-center items-center gap-3">
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                ))}
              </div>
              <span className="text-indigo-200">Trusted by thousands of users</span>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-12">
        {/* Product Cards Header */}
        <div className="grid gap-8 mb-12" style={{gridTemplateColumns: `250px repeat(${products.length}, 1fr)`}}>
          <div className="flex items-end pb-6">
            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">Products</h3>
              <p className="text-gray-600">Compare {products.length} items</p>
            </div>
          </div>
          {products.map((product, index) => (
            <div key={product.id} className="group relative">
              <div className="bg-white rounded-3xl shadow-lg border-2 border-gray-200 p-8 text-center relative overflow-hidden transition-all duration-500 hover:scale-105 hover:border-indigo-400 hover:shadow-2xl">
                {/* Background Pattern */}
                <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 to-indigo-50/50 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                
                {/* Remove Button */}
                <button
                  onClick={() => removeFromCompare(product.id)}
                  className="absolute top-4 right-4 p-3 bg-red-50 hover:bg-red-100 text-red-600 rounded-full transition-all duration-300 transform hover:scale-110 shadow-lg z-10"
                  title="Remove from comparison"
                >
                  <X className="w-4 h-4" />
                </button>

                {/* Product Image */}
                <div className="mb-6 relative">
                  <div className="w-32 h-32 mx-auto rounded-2xl overflow-hidden border-2 border-gray-200 group-hover:border-indigo-400 transition-colors duration-300 shadow-xl">
                    <img 
                      src={product.image_url} 
                      alt={product.name} 
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                  </div>
                  {/* Floating Rating */}
                  <div className="absolute -bottom-3 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-amber-400 to-orange-500 text-white px-3 py-1 rounded-full text-sm font-bold shadow-lg">
                    <div className="flex items-center gap-1">
                      <Star className="w-3 h-3 fill-white" />
                      4.{8 + index}
                    </div>
                  </div>
                </div>

                {/* Product Info */}
                <h3 className="text-2xl font-bold text-gray-900 mb-3 group-hover:text-indigo-600 transition-colors duration-300">
                  {product.name}
                </h3>
                <div className="mb-6">
                  <span className="text-3xl font-bold bg-gradient-to-r from-indigo-600 to-blue-600 bg-clip-text text-transparent">
                    ₹{product.price.toLocaleString("en-IN")}
                  </span>
                  <span className="text-gray-400 line-through ml-2 text-lg">
                    ₹{Math.floor(product.price * 1.2).toLocaleString("en-IN")}
                  </span>
                </div>

                {/* Best Value Badge */}
                {index === 0 && (
                  <div className="inline-flex items-center bg-gradient-to-r from-emerald-500 to-green-600 text-white px-4 py-2 rounded-full text-sm font-bold shadow-lg mb-4">
                    <Award className="w-4 h-4 mr-2" />
                    Best Value
                  </div>
                )}

                {/* Action Button */}
                <button className="w-full bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-700 hover:to-blue-700 text-white py-3 px-4 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 opacity-0 group-hover:opacity-100 shadow-lg">
                  <div className="flex items-center justify-center gap-2">
                    <ShoppingCart className="w-4 h-4" />
                    Add to Cart
                  </div>
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Enhanced Comparison Table */}
        <div className="bg-white rounded-3xl shadow-2xl border-2 border-gray-200 overflow-hidden">
          <div className="bg-gradient-to-r from-indigo-50 to-blue-50 px-8 py-6 border-b border-gray-200">
            <h3 className="text-2xl font-bold text-gray-900 flex items-center gap-3">
              <div className="p-3 bg-indigo-100 rounded-xl">
                <TrendingUp className="w-6 h-6 text-indigo-600" />
              </div>
              Detailed Specifications Comparison
            </h3>
          </div>

          <div className="overflow-x-auto">
            <div className="min-w-full">
              {/* Specifications Rows */}
              {specsKeys.map((specKey, index) => {
                const bestValues = getBestValue(specKey);
                return (
                  <div 
                    key={specKey} 
                    className={`grid gap-8 p-6 border-b border-gray-100 hover:bg-gradient-to-r hover:from-indigo-50 hover:to-blue-50 transition-all duration-300 ${
                      index % 2 === 0 ? 'bg-white' : 'bg-gray-50'
                    }`}
                    style={{gridTemplateColumns: `250px repeat(${products.length}, 1fr)`}}
                  >
                    {/* Enhanced Spec Label */}
                    <div className="flex items-center space-x-4">
                      <div className="p-3 bg-gradient-to-br from-gray-100 to-gray-200 rounded-xl shadow-sm">
                        {getSpecIcon(specKey)}
                      </div>
                      <span className="font-bold text-gray-900 text-xl">
                        {specKey.charAt(0).toUpperCase() + specKey.slice(1)}
                      </span>
                    </div>

                    {/* Enhanced Spec Values */}
                    {products.map((product, productIndex) => (
                      <div 
                        key={product.id} 
                        className={`text-center py-4 px-6 rounded-2xl transition-all duration-300 transform hover:scale-105 ${
                          bestValues[productIndex] 
                            ? 'bg-gradient-to-br from-emerald-50 to-green-100 border-2 border-emerald-300 shadow-lg shadow-emerald-500/20' 
                            : 'bg-gradient-to-br from-gray-50 to-gray-100 border border-gray-200'
                        }`}
                      >
                        <span className={`font-bold text-xl ${
                          bestValues[productIndex] ? 'text-emerald-700' : 'text-gray-700'
                        }`}>
                          {product.specs[specKey]}
                        </span>
                        {bestValues[productIndex] && (
                          <div className="mt-2">
                            <div className="inline-flex items-center bg-gradient-to-r from-emerald-500 to-green-600 text-white px-3 py-1 rounded-full text-xs font-bold">
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

              {/* Enhanced Price Row */}
              <div className="grid gap-8 p-6 bg-gradient-to-r from-indigo-50 via-blue-50 to-purple-50" style={{gridTemplateColumns: `250px repeat(${products.length}, 1fr)`}}>
                <div className="flex items-center space-x-4">
                  <div className="p-3 bg-gradient-to-br from-indigo-100 to-blue-200 rounded-xl shadow-sm">
                    <div className="w-5 h-5 bg-indigo-600 rounded-full"></div>
                  </div>
                  <span className="font-bold text-gray-900 text-xl">Price</span>
                </div>

                {products.map((product) => (
                  <div key={product.id} className="text-center py-4 px-6 bg-white rounded-2xl border-2 border-gray-200 transition-all duration-300 hover:scale-105 hover:border-indigo-300 shadow-lg">
                    <span className="text-3xl font-bold bg-gradient-to-r from-indigo-600 to-blue-600 bg-clip-text text-transparent">
                      ₹{product.price.toLocaleString("en-IN")}
                    </span>
                    <div className="text-emerald-600 text-sm mt-1 font-semibold">
                      Save ₹{Math.floor(product.price * 0.2).toLocaleString("en-IN")}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Enhanced Action Buttons */}
        <div className="flex flex-col lg:flex-row gap-6 justify-center items-center mt-12">
          <button className="bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-700 hover:to-blue-700 text-white px-10 py-4 rounded-2xl font-bold transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl flex items-center justify-center min-w-[200px]">
            <Plus className="w-5 h-5 mr-2" />
            Compare More Products
          </button>
          <button className="border-2 border-gray-300 hover:border-indigo-400 bg-white hover:bg-indigo-50 text-gray-700 hover:text-indigo-700 px-10 py-4 rounded-2xl font-bold transition-all duration-300 transform hover:scale-105 flex items-center justify-center min-w-[200px] shadow-lg">
            <Download className="w-5 h-5 mr-2" />
            Export Comparison
          </button>
          <button className="bg-gradient-to-r from-emerald-600 to-green-600 hover:from-emerald-700 hover:to-green-700 text-white px-10 py-4 rounded-2xl font-bold transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl flex items-center justify-center min-w-[200px]">
            <ShoppingCart className="w-5 h-5 mr-2" />
            Make Decision
          </button>
        </div>

        {/* Enhanced Tips */}
        <div className="mt-12 text-center">
          <div className="bg-gradient-to-r from-indigo-50 to-blue-50 border-2 border-indigo-200 rounded-2xl p-6 max-w-2xl mx-auto shadow-lg">
            <p className="text-gray-700 text-lg leading-relaxed">
              <span className="text-emerald-600 font-bold text-xl">💡 Pro Tip:</span> Products with green highlights show the best values for each specification. Use the comparison to make data-driven decisions!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
