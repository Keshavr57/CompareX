import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { TrendingDown, Bell, X, Zap } from "lucide-react";

export default function PriceDropAlert() {
  const [alerts, setAlerts] = useState([]);

  useEffect(() => {
    const timer = setTimeout(() => {
      const mockAlert = {
        id: Date.now(),
        productName: "iPhone 15 Pro",
        oldPrice: 129900,
        newPrice: 119900,
        discount: 8,
        image: "https://m.media-amazon.com/images/I/71657TiFeHL._SX679_.jpg"
      };
      setAlerts([mockAlert]);

      setTimeout(() => {
        setAlerts([]);
      }, 10000);
    }, 5000);

    return () => clearTimeout(timer);
  }, []);

  const removeAlert = (id) => {
    setAlerts(alerts.filter(a => a.id !== id));
  };

  return (
    <AnimatePresence>
      {alerts.map((alert) => (
        <motion.div
          key={alert.id}
          initial={{ opacity: 0, x: 300, scale: 0.8 }}
          animate={{ opacity: 1, x: 0, scale: 1 }}
          exit={{ opacity: 0, x: 300, scale: 0.8 }}
          className="fixed top-24 right-6 z-50 max-w-sm"
        >
          <motion.div
            animate={{
              boxShadow: [
                "0 0 20px rgba(6, 182, 212, 0.5)",
                "0 0 40px rgba(6, 182, 212, 0.8)",
                "0 0 20px rgba(6, 182, 212, 0.5)",
              ],
            }}
            transition={{ duration: 2, repeat: Infinity }}
            className="rounded-2xl border border-cyan-500/30 bg-black/95 backdrop-blur-xl p-5 shadow-2xl"
          >
            <div className="relative">
              {/* Header */}
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <motion.div
                    animate={{ rotate: [0, -10, 10, -10, 0] }}
                    transition={{ duration: 0.5, repeat: Infinity, repeatDelay: 2 }}
                    className="p-2 rounded-lg bg-gradient-to-br from-cyan-500 to-purple-500"
                  >
                    <Bell className="w-5 h-5 text-white" />
                  </motion.div>
                  <div>
                    <h3 className="font-bold text-white flex items-center gap-2">
                      <TrendingDown className="w-5 h-5 text-cyan-400" />
                      Price Drop Alert!
                    </h3>
                    <p className="text-xs text-gray-500">Limited time offer</p>
                  </div>
                </div>
                <button
                  onClick={() => removeAlert(alert.id)}
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Product Info */}
              <div className="flex gap-4 mb-4">
                <img
                  src={alert.image}
                  alt={alert.productName}
                  className="w-20 h-20 object-cover rounded-lg border border-white/10"
                />
                <div className="flex-1">
                  <h4 className="font-semibold text-white mb-2 line-clamp-2">
                    {alert.productName}
                  </h4>
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-gray-500 line-through">
                      ₹{alert.oldPrice.toLocaleString('en-IN')}
                    </span>
                    <motion.span
                      animate={{ scale: [1, 1.1, 1] }}
                      transition={{ duration: 1, repeat: Infinity }}
                      className="text-2xl font-bold text-cyan-400"
                    >
                      ₹{alert.newPrice.toLocaleString('en-IN')}
                    </motion.span>
                  </div>
                </div>
              </div>

              {/* Discount Badge */}
              <motion.div
                animate={{ scale: [1, 1.05, 1] }}
                transition={{ duration: 1, repeat: Infinity }}
                className="bg-gradient-to-r from-cyan-500 to-purple-500 text-white px-4 py-2 rounded-lg text-center font-semibold mb-4 flex items-center justify-center gap-2"
              >
                <Zap className="w-5 h-5 fill-current" />
                Save {alert.discount}% - ₹{(alert.oldPrice - alert.newPrice).toLocaleString('en-IN')} OFF!
              </motion.div>

              {/* Action Button */}
              <button className="w-full bg-gradient-to-r from-cyan-500 to-purple-500 hover:opacity-90 text-white py-3 px-4 rounded-lg font-semibold transition-all">
                Grab This Deal Now! 🔥
              </button>
            </div>
          </motion.div>
        </motion.div>
      ))}
    </AnimatePresence>
  );
}