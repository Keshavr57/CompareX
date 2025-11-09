import React, { useEffect } from "react";
import {
  Star,
  Zap,
  HardDrive,
  Battery,
  Award,
  TrendingUp,
  Sparkles,
  ArrowRight,
} from "lucide-react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useUser } from "@clerk/clerk-react";

const PENDING_KEY = "comparex_pending_preselect";

export default function SampleComparison() {
  const navigate = useNavigate();
  const { isSignedIn } = useUser();

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

  const handleCompare = (productId) => {
    if (isSignedIn) {
      navigate(`/products?preselect=${encodeURIComponent(productId)}`);
    } else {
      localStorage.setItem(PENDING_KEY, productId);
      navigate("/sign-in");
    }
  };

  return (
    <div className="py-20 px-6 bg-black relative overflow-hidden">
      {/* Subtle Background */}
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

      {/* Ambient Glow */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div
          className="absolute top-1/3 right-1/4 w-[600px] h-[600px] rounded-full opacity-10 blur-[120px]"
          style={{
            background: 'radial-gradient(circle, rgba(168, 85, 247, 0.3), transparent 70%)',
          }}
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 bg-white/5 mb-6">
            <Sparkles className="w-4 h-4 text-cyan-400" />
            <span className="text-xs font-semibold text-cyan-400 tracking-wider uppercase">
              Top Picks
            </span>
          </div>
          
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
            <span className="text-white">Compare </span>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-400">
              Top Products
            </span>
          </h2>
          <p className="text-gray-400 text-lg md:text-xl max-w-2xl mx-auto mb-4">
            Find the perfect device that matches your needs and budget
          </p>
          <div className="flex justify-center items-center gap-2">
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className="w-4 h-4 text-cyan-400 fill-cyan-400"
                />
              ))}
            </div>
            <span className="text-gray-500 text-sm">
              Trusted by 50,000+ users
            </span>
          </div>
        </motion.div>

        {/* Product Cards */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          {products.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ 
                duration: 0.5, 
                delay: index * 0.1,
              }}
              viewport={{ once: true }}
              className="group relative"
            >
              {product.popular && (
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 z-10">
                  <div className="bg-gradient-to-r from-cyan-500 to-purple-500 text-white px-4 py-1.5 rounded-full text-xs font-semibold flex items-center gap-1">
                    <Award className="w-3 h-3" />
                    Most Popular
                  </div>
                </div>
              )}

              <div className="relative rounded-2xl border border-white/10 bg-white/5 hover:bg-white/10 hover:border-cyan-500/30 transition-all duration-300 p-6">
                {/* Product Image */}
                <div className="mb-6 relative">
                  <div className="w-32 h-32 mx-auto rounded-xl overflow-hidden border border-white/10">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="absolute -bottom-3 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-cyan-500 to-purple-500 text-white px-3 py-1 rounded-full text-xs font-semibold">
                    #{index + 1} Choice
                  </div>
                </div>

                {/* Product Info */}
                <h3 className="text-xl font-semibold text-white mb-3 text-center">
                  {product.name}
                </h3>

                {/* Rating */}
                <div className="flex items-center justify-center mb-6">
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-3 h-3 ${
                          i < Math.floor(product.rating)
                            ? "text-cyan-400 fill-cyan-400"
                            : "text-gray-600"
                        }`}
                      />
                    ))}
                  </div>
                  <span className="ml-2 text-xs text-gray-500">
                    {product.rating} ({product.reviews})
                  </span>
                </div>

                {/* Specs */}
                <div className="space-y-2 mb-6">
                  {Object.entries(product.specs).map(([key, value]) => (
                    <div
                      key={key}
                      className="flex items-center justify-between p-3 bg-white/5 rounded-lg border border-white/5"
                    >
                      <div className="flex items-center gap-2">
                        <div className="text-cyan-400">
                          {getSpecIcon(key)}
                        </div>
                        <span className="text-sm text-gray-400">{key}</span>
                      </div>
                      <span className="text-sm font-medium text-white">
                        {value}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Price */}
                <div className="text-center mb-6">
                  <div className="bg-gradient-to-r from-cyan-500 to-purple-500 p-4 rounded-xl">
                    <span className="text-2xl font-bold text-white">
                      ₹{product.price}
                    </span>
                    <div className="text-white/80 text-xs mt-1">
                      Best Price
                    </div>
                  </div>
                </div>

                {/* Compare Button */}
                <button
                  onClick={() => handleCompare(product.id)}
                  className="w-full bg-white/10 hover:bg-white/20 border border-white/10 hover:border-cyan-500/30 text-white py-3 px-6 rounded-lg font-medium transition-all duration-300 flex items-center justify-center gap-2"
                >
                  <TrendingUp className="w-4 h-4" />
                  Compare Now
                </button>
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <button
            onClick={() => navigate("/products")}
            className="bg-gradient-to-r from-cyan-500 to-purple-500 hover:opacity-90 text-white px-8 py-4 rounded-lg font-medium transition-opacity inline-flex items-center gap-2"
          >
            View All Products
            <ArrowRight className="w-5 h-5" />
          </button>
          <p className="text-gray-500 text-sm mt-4">
            Discover more products and make smarter choices
          </p>
        </motion.div>
      </div>
    </div>
  );
}