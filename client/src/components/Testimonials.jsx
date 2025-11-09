import { motion } from "framer-motion";
import { Quote, Star, Users } from "lucide-react";

export default function Testimonials() {
  const testimonials = [
    {
      text: "I compared multiple laptops side by side before buying. The specs breakdown like RAM, storage, and processor speed saved me hours of research.",
      name: "Donald Jackman",
      image: "https://images.unsplash.com/photo-1633332755192-727a05c4013d?q=80&w=100",
    },
    {
      text: "Choosing between smartphones was confusing, but this site showed camera quality, battery, and display side by side. I picked the right one without overpaying.",
      name: "Richard Nelson",
      image: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=100",
    },
    {
      text: "Comparing smartwatches was easy — I could filter by fitness features, battery life, and price. Ended up finding the best match for my lifestyle.",
      name: "James Washington",
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=100&h=100&auto=format&fit=crop",
    },
  ];

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
          className="absolute top-1/2 left-1/3 w-[600px] h-[600px] rounded-full opacity-10 blur-[120px]"
          style={{
            background: 'radial-gradient(circle, rgba(6, 182, 212, 0.3), transparent 70%)',
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
            <Users className="w-4 h-4 text-cyan-400" />
            <span className="text-xs font-semibold text-cyan-400 tracking-wider uppercase">
              User Reviews
            </span>
          </div>
          
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 text-white">
            What Our Users Say
          </h2>
          <p className="text-gray-400 text-lg md:text-xl max-w-2xl mx-auto">
            Thousands of shoppers have already found their perfect device
          </p>
        </motion.div>

        {/* Testimonials Grid */}
        <div className="grid md:grid-cols-3 gap-6">
          {testimonials.map((testimonial, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ 
                duration: 0.5, 
                delay: idx * 0.1,
              }}
              viewport={{ once: true }}
              className="group"
            >
              <div className="relative p-6 rounded-2xl border border-white/10 bg-white/5 hover:bg-white/10 hover:border-cyan-500/30 transition-all duration-300 h-full flex flex-col">
                {/* Quote Icon */}
                <Quote className="w-8 h-8 text-cyan-400 mb-4" />

                {/* Stars */}
                <div className="flex gap-1 mb-4">
                  {Array(5).fill(0).map((_, i) => (
                    <Star
                      key={i}
                      className="w-4 h-4 text-cyan-400 fill-cyan-400"
                    />
                  ))}
                </div>

                {/* Text */}
                <p className="text-sm text-gray-400 leading-relaxed mb-6 flex-grow">
                  {testimonial.text}
                </p>

                {/* User */}
                <div className="flex items-center gap-3">
                  <img
                    className="h-12 w-12 rounded-full border border-white/10"
                    src={testimonial.image}
                    alt={testimonial.name}
                  />
                  <div>
                    <h3 className="text-white font-semibold">
                      {testimonial.name}
                    </h3>
                    <p className="text-xs text-gray-500">Verified User</p>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}