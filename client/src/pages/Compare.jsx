import React from "react";
import { useCompare } from "../context/CompareContext";
import { useNavigate } from "react-router-dom";
import { 
  X, Trash2, Monitor, Smartphone, Zap, HardDrive, Battery, 
  Award, TrendingUp, Package, ArrowRight 
} from "lucide-react";

const Compare = () => {
  const { compareList, removeFromCompare, clearCompare } = useCompare();
  const navigate = useNavigate();

  if (compareList.length === 0)
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 flex items-center justify-center p-6">
        <div className="text-center max-w-2xl">
          <div className="relative mb-12">
            <div className="w-40 h-40 bg-gradient-to-br from-blue-100 to-indigo-200 rounded-3xl flex items-center justify-center mx-auto backdrop-blur-sm border-2 border-white shadow-2xl">
              <div className="relative">
                <Monitor className="w-20 h-20 text-indigo-600" />
                <div className="absolute -top-3 -right-3 w-8 h-8 bg-gradient-to-br from-orange-400 to-red-500 rounded-full flex items-center justify-center animate-bounce">
                  <Package className="w-4 h-4 text-white" />
                </div>
              </div>
            </div>
            <div className="absolute -bottom-4 left-1/2 transform -translate-x-1/2">
              <div className="bg-white px-4 py-2 rounded-full shadow-lg border border-gray-200">
                <span className="text-sm font-semibold text-gray-600">Ready to Compare?</span>
              </div>
            </div>
          </div>

          <h2 className="text-5xl font-bold bg-gradient-to-r from-indigo-600 via-blue-600 to-purple-600 bg-clip-text text-transparent mb-6">
            No Products Selected
          </h2>
          <p className="text-gray-600 text-xl mb-8 leading-relaxed max-w-lg mx-auto">
            Start adding products to see detailed side-by-side comparisons and make informed decisions
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <button 
              onClick={() => navigate("/products")}
              className="bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-700 hover:to-blue-700 text-white px-8 py-4 rounded-2xl font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl flex items-center gap-3"
            >
              <ArrowRight className="w-5 h-5" />
              Browse Products
            </button>

          
           
          </div>
        </div>
      </div>
    );

  // Attributes
  const attributes = [
    "name", "price", "ram", "storage", "display", "battery", 
    "processor", "gpu", "camera", "connectivity", "health_features", 
    "noise_cancellation", "driver_size"
  ];

  const getAttributeIcon = (attr) => {
    switch(attr) {
      case 'name': return <Smartphone className="w-4 h-4 text-indigo-500" />;
      case 'price': return <div className="w-4 h-4 bg-gradient-to-br from-emerald-500 to-green-600 rounded-full"></div>;
      case 'ram': return <Zap className="w-4 h-4 text-blue-500" />;
      case 'storage': return <HardDrive className="w-4 h-4 text-purple-500" />;
      case 'display': return <Monitor className="w-4 h-4 text-pink-500" />;
      case 'battery': return <Battery className="w-4 h-4 text-amber-500" />;
      default: return <div className="w-4 h-4 bg-gray-400 rounded-full"></div>;
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
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Hero */}
      <div className="bg-gradient-to-br from-indigo-600 via-blue-600 to-purple-700 text-white">
        <div className="max-w-7xl mx-auto px-6 py-16">
          <div className="flex flex-col lg:flex-row justify-between items-center gap-8">
            <div>
              <h1 className="text-4xl md:text-5xl font-bold mb-4">
                Product Comparison
              </h1>
              <p className="text-xl text-indigo-100 max-w-2xl">
                Comparing {compareList.length} product{compareList.length > 1 ? 's' : ''} • Find your perfect match
              </p>
            </div>
            <button
              className="bg-white/20 hover:bg-white/30 backdrop-blur-sm border border-white/30 text-white px-8 py-4 rounded-2xl font-bold transition-all duration-300 transform hover:scale-105 shadow-lg"
              onClick={clearCompare}
            >
              <div className="flex items-center gap-2">
                <Trash2 className="w-5 h-5" />
                Clear All
              </div>
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-12">
        {/* Product Cards */}
        <div className="grid gap-6 mb-12" style={{gridTemplateColumns: `200px repeat(${compareList.length}, 1fr)`}}>
          <div className="flex items-end pb-4">
            <h3 className="text-lg font-bold text-gray-700">Products</h3>
          </div>
          {compareList.map((product, index) => (
            <div key={product.id} className="group relative">
              <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6 text-center relative overflow-hidden transition-all duration-300 hover:shadow-xl hover:scale-105">
                <button
                  onClick={() => removeFromCompare(product.id)}
                  className="absolute top-4 right-4 p-2 bg-red-50 hover:bg-red-100 text-red-600 rounded-full transition-all duration-300 transform hover:scale-110 shadow-md z-10"
                  title="Remove from comparison"
                >
                  <X className="w-4 h-4" />
                </button>
                {index === 0 && (
                  <div className="absolute top-4 left-4 bg-gradient-to-r from-emerald-500 to-green-600 text-white px-3 py-1 rounded-full text-xs font-bold shadow-lg">
                    <div className="flex items-center gap-1">
                      <Award className="w-3 h-3" />
                      Best Pick
                    </div>
                  </div>
                )}
                <div className="mb-6 relative">
                  <div className="w-24 h-24 mx-auto rounded-xl overflow-hidden border-2 border-gray-200 group-hover:border-indigo-400 transition-colors duration-300 shadow-md">
                    <img 
                      src={product.image_url || '/api/placeholder/80/80'} 
                      alt={product.name} 
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                  </div>
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-indigo-600 transition-colors duration-300">
                  {product.name}
                </h3>
                <div className="text-2xl font-bold text-indigo-600 mb-4">
                  ₹{product.price.toLocaleString("en-IN")}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Comparison Table */}
        <div className="bg-white rounded-2xl shadow-xl border border-gray-200 overflow-hidden">
          <div className="bg-gradient-to-r from-indigo-50 to-blue-50 px-6 py-4 border-b border-gray-200">
            <h3 className="text-xl font-bold text-gray-900 flex items-center gap-3">
              <div className="p-2 bg-indigo-100 rounded-lg">
                <TrendingUp className="w-5 h-5 text-indigo-600" />
              </div>
              Detailed Specifications
            </h3>
          </div>

          <div className="overflow-x-auto">
            <table className="table-auto border-collapse w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="border-b border-gray-200 p-6 text-left">
                    <span className="text-gray-900 font-bold text-lg">Features</span>
                  </th>
                  {compareList.map((product) => (
                    <th key={product.id} className="border-b border-gray-200 p-6 text-center min-w-[200px]">
                      <div className="flex flex-col items-center gap-3">
                        <div className="w-16 h-16 rounded-xl overflow-hidden border-2 border-gray-200">
                          <img 
                            src={product.image_url || '/api/placeholder/64/64'} 
                            alt={product.name} 
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="text-center">
                          <div className="font-bold text-gray-900 text-sm mb-1">
                            {product.name}
                          </div>
                          <div className="text-indigo-600 font-bold text-lg">
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
                    <tr key={attr} className={`${index % 2 === 0 ? 'bg-white' : 'bg-gray-50'} hover:bg-indigo-50 transition-colors duration-200`}>
                      <td className="border-b border-gray-100 p-6">
                        <div className="flex items-center gap-3">
                          <div className="p-2 bg-gradient-to-br from-gray-100 to-gray-200 rounded-lg">
                            {getAttributeIcon(attr)}
                          </div>
                          <span className="font-bold text-gray-900 text-lg capitalize">{attr}</span>
                        </div>
                      </td>
                      {compareList.map((product, productIndex) => (
                        <td key={product.id} className="border-b border-gray-100 p-6 text-center">
                          <div className={`rounded-xl py-3 px-4 transition-all duration-300 ${
                            bestIndex === productIndex && attr === 'price'
                              ? 'bg-gradient-to-br from-emerald-50 to-green-50 border-2 border-emerald-200 shadow-md' 
                              : 'bg-gray-50 hover:bg-gray-100 border border-gray-200'
                          }`}>
                            <span className={`font-semibold text-lg ${
                              bestIndex === productIndex && attr === 'price' ? 'text-emerald-700' : 'text-gray-700'
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
