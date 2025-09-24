// src/components/SampleComparison.jsx
import React, { useEffect } from "react";
import {
  Star,
  Zap,
  HardDrive,
  Battery,
  DollarSign,
  Award,
  TrendingUp,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useUser } from "@clerk/clerk-react";

const PENDING_KEY = "comparex_pending_preselect";

export default function SampleComparison() {
  const navigate = useNavigate();
  const { isSignedIn } = useUser();

  // ✅ If user just signed in and we had a pending preselect, redirect now
  useEffect(() => {
    const pending = localStorage.getItem(PENDING_KEY);
    if (isSignedIn && pending) {
      localStorage.removeItem(PENDING_KEY);
      navigate(`/products?preselect=${encodeURIComponent(pending)}`);
    }
  }, [isSignedIn, navigate]);

  const products = [
    {
      id: 1,
      name: "iPhone 15",
      price: "46999",
      image: "https://m.media-amazon.com/images/I/71657TiFeHL._SX679_.jpg",
      specs: { RAM: "-", Storage: "256GB", Battery: "3200mAh" },
      rating: 4.8,
      reviews: 1234,
      category: "Mobile",
    },
    {
      id: 2,
      name: "Samsung Galaxy S24",
      price: "48999",
      image: "https://m.media-amazon.com/images/I/617rH1xpQTL._SX679_.jpg",
      specs: { RAM: "12GB", Storage: "512GB", Battery: "4000mAh" },
      rating: 4.7,
      reviews: 987,
      popular: true,
      category: "Mobile",
    },
    {
      id: 3,
      name: "Google Pixel 9a",
      price: "45999",
      image: "https://m.media-amazon.com/images/I/41-eyvGzycL.jpg",
      specs: { RAM: "8GB", Storage: "128GB", Battery: "3500mAh" },
      rating: 4.6,
      reviews: 756,
      category: "Mobile",
    },
  ];

  const getSpecIcon = (specType) => {
    switch (specType) {
      case "RAM":
        return <Zap className="w-4 h-4" />;
      case "Storage":
        return <HardDrive className="w-4 h-4" />;
      case "Battery":
        return <Battery className="w-4 h-4" />;
      default:
        return null;
    }
  };

  // ✅ Handle "Compare Now"
  const handleCompare = (productId) => {
    if (isSignedIn) {
      // If logged in → go to product page with preselect
      navigate(`/products?preselect=${encodeURIComponent(productId)}`);
    } else {
      // If not logged in → save in localStorage & redirect to sign-in
      localStorage.setItem(PENDING_KEY, productId);
      navigate("/sign-in");
    }
  };

  return (
    <div className="py-20 px-6 bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent mb-6">
            Compare Top Products
          </h2>
          <p className="text-gray-600 text-xl max-w-3xl mx-auto leading-relaxed">
            Find the perfect device that matches your needs and budget with our
            detailed comparison tools
          </p>
          <div className="flex justify-center items-center gap-2 mt-4">
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className="w-5 h-5 text-yellow-400 fill-yellow-400"
                />
              ))}
            </div>
            <span className="text-gray-500 ml-2">
              Trusted by 50,000+ users
            </span>
          </div>
        </div>

        {/* Product Cards */}
        <div className="grid md:grid-cols-3 gap-8 mb-20">
          {products.map((product, index) => (
            <div
              key={product.id}
              className="group relative bg-white rounded-2xl border border-gray-200 hover:border-blue-300 hover:shadow-2xl transition-all duration-500 overflow-hidden transform hover:-translate-y-2"
            >
              {product.popular && (
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 z-10">
                  <div className="bg-gradient-to-r from-orange-500 to-red-500 text-white px-4 py-2 rounded-full text-sm font-bold shadow-lg flex items-center gap-1">
                    <Award className="w-4 h-4" />
                    Most Popular
                  </div>
                </div>
              )}

              {/* Card Content */}
              <div className="p-8 text-center relative">
                {/* Product Image */}
                <div className="mb-6 relative">
                  <div className="w-32 h-32 mx-auto rounded-2xl overflow-hidden border-4 border-gray-100 group-hover:border-blue-200 transition-all duration-300 shadow-lg">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                  </div>
                  {/* Floating Badge */}
                  <div className="absolute -bottom-3 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-green-500 to-emerald-500 text-white px-3 py-1 rounded-full text-xs font-bold shadow-lg">
                    #{index + 1} Choice
                  </div>
                </div>

                {/* Product Info */}
                <h3 className="text-2xl font-bold text-gray-900 mb-4 group-hover:text-blue-600 transition-colors duration-300">
                  {product.name}
                </h3>

                {/* Rating */}
                <div className="flex items-center justify-center mb-6">
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-4 h-4 ${
                          i < Math.floor(product.rating)
                            ? "text-yellow-400 fill-yellow-400"
                            : "text-gray-300"
                        }`}
                      />
                    ))}
                  </div>
                  <span className="ml-3 text-sm text-gray-600 font-medium">
                    {product.rating} ({product.reviews} reviews)
                  </span>
                </div>

                {/* Specs */}
                <div className="space-y-3 mb-8">
                  {Object.entries(product.specs).map(([key, value]) => (
                    <div
                      key={key}
                      className="flex items-center justify-between p-3 bg-gradient-to-r from-gray-50 to-blue-50 rounded-xl border border-gray-100 group-hover:border-blue-200 transition-all duration-300"
                    >
                      <div className="flex items-center space-x-3">
                        <div className="p-2 bg-white rounded-lg shadow-sm">
                          {getSpecIcon(key)}
                        </div>
                        <span className="text-sm font-semibold text-gray-700">
                          {key}
                        </span>
                      </div>
                      <span className="text-sm font-bold text-gray-900 bg-white px-3 py-1 rounded-lg shadow-sm">
                        {value}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Price */}
                <div className="text-center mb-8">
                  <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-4 rounded-xl shadow-lg">
                    <span className="text-3xl font-bold">₹{product.price}</span>
                    <div className="text-blue-100 text-sm mt-1">
                      Best Price Guaranteed
                    </div>
                  </div>
                </div>

                {/* Compare Button */}
                <button
                  onClick={() => handleCompare(product.id)}
                  className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white py-4 px-6 rounded-xl font-bold transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl flex items-center justify-center gap-2"
                >
                  <TrendingUp className="w-5 h-5" />
                  Compare Now
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Quick Comparison Table */}
        {/* (unchanged from your version) */}
        {/* CTA */}
        <div className="text-center mt-12">
          <button
            onClick={() => navigate("/products")}
            className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-10 py-4 rounded-xl font-bold text-lg transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
          >
            View All Products
          </button>
          <p className="text-gray-500 mt-4">
            Discover more products and make smarter choices
          </p>
        </div>
      </div>
    </div>
  );
}
