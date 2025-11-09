import { Search, GitCompare, Star, Heart, TrendingDown, History, Download, Sparkles, Zap, Shield } from "lucide-react";
import { motion } from "framer-motion";

const features = [
  { 
    icon: Search, 
    title: "Smart Search", 
    desc: "AI-powered instant product discovery across millions of items.", 
    color: "cyan"
  },
  { 
    icon: GitCompare, 
    title: "Deep Comparison", 
    desc: "Analyze every specification detail side by side.", 
    color: "purple"
  },
  { 
    icon: Star, 
    title: "Verified Reviews", 
    desc: "Authentic user ratings and detailed feedback.", 
    color: "amber"
  },
  { 
    icon: Sparkles, 
    title: "AI Recommendations", 
    desc: "Personalized suggestions based on your preferences.", 
    color: "emerald"
  },
  { 
    icon: Heart, 
    title: "Smart Wishlist", 
    desc: "Track favorites with price drop notifications.", 
    color: "pink"
  },
  { 
    icon: TrendingDown, 
    title: "Price Tracking", 
    desc: "Real-time monitoring across multiple platforms.", 
    color: "cyan"
  },
  { 
    icon: History, 
    title: "Comparison History", 
    desc: "Access unlimited history with cloud sync.", 
    color: "purple"
  },
  { 
    icon: Download, 
    title: "Export Reports", 
    desc: "Generate reports in PDF, Excel, or JSON format.", 
    color: "emerald"
  },
];

export default function KeyFeatures() {
  return (
    <div id="features" className="relative py-24 px-6 overflow-hidden bg-black">
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

      {/* Minimal Ambient Glow */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div
          className="absolute top-1/4 left-1/4 w-[500px] h-[500px] rounded-full opacity-10 blur-[120px]"
          style={{
            background: 'radial-gradient(circle, rgba(6, 182, 212, 0.3), transparent 70%)',
          }}
        />
        <div
          className="absolute bottom-1/4 right-1/4 w-[600px] h-[600px] rounded-full opacity-10 blur-[120px]"
          style={{
            background: 'radial-gradient(circle, rgba(168, 85, 247, 0.25), transparent 70%)',
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
            <Zap className="w-4 h-4 text-cyan-400" />
            <span className="text-xs font-semibold text-cyan-400 tracking-wider uppercase">
              Key Features
            </span>
          </div>
          
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
            <span className="text-white">Why Choose </span>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-400">CompareX</span>
            <span className="text-white">?</span>
          </h2>
          <p className="text-gray-400 text-lg md:text-xl max-w-2xl mx-auto">
            Experience the future of product comparison with{" "}
            <span className="text-cyan-400 font-medium">AI-powered technology</span>
          </p>
        </motion.div>
        
        {/* Features Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, idx) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ 
                  duration: 0.5, 
                  delay: idx * 0.05,
                }}
                viewport={{ once: true }}
                className="group relative"
              >
                {/* Card */}
                <div className="relative p-6 rounded-2xl border border-white/10 bg-white/5 hover:bg-white/10 hover:border-cyan-500/30 transition-all duration-300 h-full">
                  {/* Icon */}
                  <div className="mb-5">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-cyan-500 to-purple-500 flex items-center justify-center">
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                  </div>
                  
                  {/* Content */}
                  <div>
                    <h3 className="font-semibold text-lg mb-2 text-white">
                      {feature.title}
                    </h3>
                    <p className="text-gray-400 text-sm leading-relaxed">
                      {feature.desc}
                    </p>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Bottom Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <div className="inline-flex items-center gap-3 px-6 py-3 rounded-full border border-white/10 bg-white/5">
            <Shield className="w-5 h-5 text-cyan-400" />
            <span className="text-white font-medium">Trusted by 50,000+ Users Worldwide</span>
          </div>
        </motion.div>
      </div>
    </div>
  );
}