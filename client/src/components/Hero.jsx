import React, { useState } from "react";
import {
  Search,
  Zap,
  Award,
  Star,
  Sparkles,
  Brain,
  Activity,
  ArrowRight,
  Users,
  TrendingUp,
  Shield,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useUser } from "@clerk/clerk-react";
import { motion } from "framer-motion";

export default function Hero() {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();
  const { isSignedIn } = useUser();

  const handleSearch = () => {
    if (!isSignedIn) {
      alert("Please login to search and compare products.");
      return;
    }
    if (query.trim() !== "") {
      navigate(`/products?search=${encodeURIComponent(query)}`);
    }
  };

  const handleStartCompare = () => {
    if (!isSignedIn) {
      alert("Please login to start comparing.");
      return;
    }
    navigate("/products");
  };

  const particles = Array.from({ length: 30 }).map((_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 6 + 2,
    duration: Math.random() * 15 + 10,
    delay: Math.random() * 5,
  }));

  return (
    <div className="relative min-h-screen flex items-center overflow-hidden bg-black">
      {/* Subtle Background */}
      <div className="absolute inset-0 bg-black">
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

      {/* Minimal Ambient Glow */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div
          className="absolute top-0 left-1/4 w-[500px] h-[500px] rounded-full opacity-20 blur-[120px]"
          style={{
            background: 'radial-gradient(circle, rgba(6, 182, 212, 0.3), transparent 70%)',
          }}
        />
        <div
          className="absolute bottom-0 right-1/4 w-[600px] h-[600px] rounded-full opacity-15 blur-[120px]"
          style={{
            background: 'radial-gradient(circle, rgba(168, 85, 247, 0.25), transparent 70%)',
          }}
        />
      </div>

      {/* Very Subtle Floating Particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {particles.map((particle) => (
          <motion.div
            key={particle.id}
            className="absolute rounded-full bg-cyan-400/10"
            style={{
              left: `${particle.x}%`,
              top: `${particle.y}%`,
              width: particle.size,
              height: particle.size,
            }}
            animate={{
              y: [0, -100, 0],
              opacity: [0, 0.3, 0],
            }}
            transition={{
              duration: particle.duration,
              repeat: Infinity,
              delay: particle.delay,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 py-20 w-full">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left Content */}
          <div className="text-center lg:text-left space-y-8">
            {/* Clean Badge */}
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 bg-white/5"
            >
              <div className="w-1.5 h-1.5 rounded-full bg-cyan-400"></div>
              <Brain className="w-3.5 h-3.5 text-cyan-400" />
              <span className="text-xs font-semibold text-cyan-400 tracking-wider uppercase">
                AI-Powered Engine
              </span>
              <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
            </motion.div>

            {/* Heading */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <h1 className="text-5xl lg:text-7xl font-bold leading-tight tracking-tight">
                <div className="text-white mb-2">
                  Find Your
                </div>
                <div className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-400 mb-2">
                  Perfect
                </div>
                <div className="text-white">
                  Tech Match
                </div>
              </h1>
            </motion.div>

            {/* Subtitle */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-xl text-gray-400 leading-relaxed max-w-xl"
            >
              Compare thousands of products instantly with{" "}
              <span className="text-cyan-400 font-medium">
                AI-powered insights
              </span>
              . Make confident buying decisions.
            </motion.p>

            {/* Clean Search Bar */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="max-w-2xl mx-auto lg:mx-0"
            >
              <div className="flex items-center gap-2 p-1.5 rounded-xl border border-white/10 bg-white/5 backdrop-blur-sm">
                <div className="flex-1 flex items-center gap-3 px-5">
                  <Search className="w-5 h-5 text-gray-500" />
                  <input
                    type="text"
                    placeholder="Search iPhone 15, MacBook Pro..."
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    onKeyPress={(e) => e.key === "Enter" && handleSearch()}
                    className="flex-1 py-4 text-white placeholder-gray-600 bg-transparent outline-none"
                  />
                </div>
                <button
                  onClick={handleSearch}
                  className="px-6 py-3.5 rounded-lg bg-gradient-to-r from-cyan-500 to-purple-500 text-white font-medium hover:opacity-90 transition-opacity"
                >
                  <span className="flex items-center gap-2">
                    Search
                    <ArrowRight className="w-4 h-4" />
                  </span>
                </button>
              </div>
            </motion.div>

            {/* Simple Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
            >
              <button
                onClick={handleStartCompare}
                className="px-8 py-4 rounded-lg bg-gradient-to-r from-cyan-500 to-purple-500 text-white font-medium hover:opacity-90 transition-opacity"
              >
                <span className="flex items-center justify-center gap-2">
                  <Zap className="w-5 h-5" />
                  Start Comparing
                </span>
              </button>

              <button
                onClick={() =>
                  document
                    .getElementById("features")
                    ?.scrollIntoView({ behavior: "smooth" })
                }
                className="px-8 py-4 rounded-lg border border-white/10 bg-white/5 text-gray-300 font-medium hover:bg-white/10 transition-colors"
              >
                <span className="flex items-center justify-center gap-2">
                  <Activity className="w-5 h-5" />
                  Learn More
                </span>
              </button>
            </motion.div>

            {/* Clean Stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="grid grid-cols-3 gap-4 max-w-2xl mx-auto lg:mx-0 pt-4"
            >
              <div className="p-5 text-center rounded-xl border border-white/10 bg-white/5">
                <Award className="w-6 h-6 text-cyan-400 mx-auto mb-2" />
                <div className="text-2xl font-bold text-white mb-1">10K+</div>
                <div className="text-xs text-gray-500 uppercase tracking-wider font-medium">
                  Products
                </div>
              </div>

              <div className="p-5 text-center rounded-xl border border-white/10 bg-white/5">
                <Users className="w-6 h-6 text-purple-400 mx-auto mb-2" />
                <div className="text-2xl font-bold text-white mb-1">50K+</div>
                <div className="text-xs text-gray-500 uppercase tracking-wider font-medium">
                  Users
                </div>
              </div>

              <div className="p-5 text-center rounded-xl border border-white/10 bg-white/5">
                <Star className="w-6 h-6 text-cyan-400 mx-auto mb-2" />
                <div className="text-2xl font-bold text-white mb-1">4.9</div>
                <div className="text-xs text-gray-500 uppercase tracking-wider font-medium">
                  Rating
                </div>
              </div>
            </motion.div>
          </div>

          {/* Right Content - Minimal 3D Cards */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="hidden lg:block relative"
          >
            <div className="relative w-full h-[600px]">
              {/* Main Card */}
              <div className="absolute top-0 right-0 w-80 rounded-2xl border border-white/10 bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl p-6">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-cyan-500 to-purple-500 flex items-center justify-center text-2xl">
                    📱
                  </div>
                  <div>
                    <div className="text-white font-semibold">iPhone 15 Pro</div>
                    <div className="text-gray-500 text-sm">Smartphone</div>
                  </div>
                </div>
                
                <div className="space-y-3 mb-6">
                  {[
                    { label: 'Display', value: '6.7" OLED' },
                    { label: 'Chip', value: 'A17 Pro' },
                    { label: 'Camera', value: '48MP' },
                  ].map((spec, i) => (
                    <div key={i} className="flex justify-between items-center p-3 rounded-lg bg-white/5 border border-white/5">
                      <span className="text-gray-400 text-sm">{spec.label}</span>
                      <span className="text-white font-medium text-sm">{spec.value}</span>
                    </div>
                  ))}
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-400">Match Score</span>
                    <span className="text-cyan-400 font-semibold">85%</span>
                  </div>
                  <div className="h-1.5 bg-white/10 rounded-full overflow-hidden">
                    <div className="h-full w-[85%] bg-gradient-to-r from-cyan-500 to-purple-500 rounded-full"></div>
                  </div>
                </div>
              </div>

              {/* Secondary Card */}
              <div className="absolute top-40 left-0 w-72 rounded-2xl border border-white/10 bg-gradient-to-br from-white/5 to-transparent backdrop-blur-xl p-6">
                <div className="flex items-center gap-3 mb-5">
                  <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-xl">
                    💻
                  </div>
                  <div>
                    <div className="text-white font-semibold text-sm">MacBook Pro</div>
                    <div className="text-gray-500 text-xs">Laptop</div>
                  </div>
                </div>
                
                <div className="space-y-2">
                  {[
                    { label: 'Chip', value: 'M3 Max' },
                    { label: 'RAM', value: '32GB' },
                  ].map((spec, i) => (
                    <div key={i} className="flex justify-between items-center p-2.5 rounded-lg bg-white/5">
                      <span className="text-gray-500 text-xs">{spec.label}</span>
                      <span className="text-white font-medium text-xs">{spec.value}</span>
                    </div>
                  ))}
                </div>

                <div className="mt-4 pt-3 border-t border-white/10">
                  <div className="flex justify-between">
                    <span className="text-gray-500 text-xs">Match</span>
                    <span className="text-purple-400 font-semibold text-sm">78%</span>
                  </div>
                </div>
              </div>

              {/* Feature Badges */}
              <div className="absolute bottom-20 right-16 px-4 py-2 rounded-lg border border-cyan-500/20 bg-cyan-500/10 backdrop-blur-sm">
                <div className="flex items-center gap-2">
                  <TrendingUp className="w-4 h-4 text-cyan-400" />
                  <span className="text-xs font-medium text-cyan-400">Top Rated</span>
                </div>
              </div>

              <div className="absolute bottom-32 left-20 px-4 py-2 rounded-lg border border-purple-500/20 bg-purple-500/10 backdrop-blur-sm">
                <div className="flex items-center gap-2">
                  <Shield className="w-4 h-4 text-purple-400" />
                  <span className="text-xs font-medium text-purple-400">Verified</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}