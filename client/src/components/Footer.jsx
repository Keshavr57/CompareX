import { FaLinkedin, FaGithub } from "react-icons/fa";
import { Heart, Cpu, ExternalLink } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useUser } from "@clerk/clerk-react";

export default function Footer() {
  const navigate = useNavigate();
  const { isSignedIn } = useUser();

  const handleNavigation = (path, protectedRoute = false) => {
    if (protectedRoute && !isSignedIn) {
      navigate("/sign-in");
    } else {
      navigate(path);
    }
  };

  return (
    <footer className="relative bg-black text-white border-t border-white/10 overflow-hidden">
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
          className="absolute bottom-0 left-1/4 w-[500px] h-[500px] rounded-full opacity-10 blur-[120px]"
          style={{
            background: 'radial-gradient(circle, rgba(6, 182, 212, 0.3), transparent 70%)',
          }}
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 py-12">
        {/* Main Footer Content */}
        <div className="grid md:grid-cols-3 gap-12 mb-8">
          {/* Brand Section */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-purple-500 blur-lg opacity-50"></div>
                <div className="relative w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-500 to-purple-500 flex items-center justify-center">
                  <Cpu className="w-6 h-6 text-white" />
                </div>
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
                CompareX
              </span>
            </div>
            <p className="text-gray-400 text-sm mb-4">
              Compare tech products smarter and faster.
            </p>
            <div className="flex items-center gap-2 text-xs text-gray-500">
              <span>Made with</span>
              <Heart className="w-3 h-3 text-cyan-400 fill-cyan-400" />
              <span>for tech enthusiasts</span>
            </div>
          </div>

          {/* Links Section */}
          <div>
            <h4 className="text-white font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-3">
              <li>
                <span
                  onClick={() => handleNavigation("/")}
                  className="text-gray-400 hover:text-cyan-400 cursor-pointer transition-colors text-sm"
                >
                  Home
                </span>
              </li>
              <li>
                <span
                  onClick={() => handleNavigation("/products", true)}
                  className="text-gray-400 hover:text-cyan-400 cursor-pointer transition-colors text-sm"
                >
                  Products
                </span>
              </li>
              <li>
                <span
                  onClick={() => handleNavigation("/compare", true)}
                  className="text-gray-400 hover:text-cyan-400 cursor-pointer transition-colors text-sm"
                >
                  Compare
                </span>
              </li>
              <li>
                <span
                  onClick={() => handleNavigation("/")}
                  className="text-gray-400 hover:text-cyan-400 cursor-pointer transition-colors text-sm"
                >
                  About
                </span>
              </li>
            </ul>
          </div>

          {/* Social Section */}
          <div>
            <h4 className="text-white font-semibold mb-4">Connect With Us</h4>
            <p className="text-gray-400 text-sm mb-4">
              Follow us for updates and comparisons.
            </p>
            <div className="flex gap-3">
              <a
                href="#"
                className="p-3 rounded-lg border border-white/10 bg-white/5 hover:bg-white/10 hover:border-cyan-500/30 transition-all"
              >
                <FaLinkedin className="w-5 h-5 text-gray-400 hover:text-cyan-400 transition-colors" />
              </a>
              <a
                href="#"
                className="p-3 rounded-lg border border-white/10 bg-white/5 hover:bg-white/10 hover:border-cyan-500/30 transition-all"
              >
                <FaGithub className="w-5 h-5 text-gray-400 hover:text-cyan-400 transition-colors" />
              </a>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-white/10 mb-6"></div>

        {/* Bottom Section */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-gray-500 text-sm">
            © 2025 CompareX. All rights reserved.
          </p>
          <div className="flex items-center gap-6 text-sm">
            <span className="text-gray-500 hover:text-cyan-400 cursor-pointer transition-colors">
              Privacy Policy
            </span>
            <span className="text-gray-500 hover:text-cyan-400 cursor-pointer transition-colors">
              Terms of Service
            </span>
            <span className="text-gray-500 hover:text-cyan-400 cursor-pointer transition-colors">
              Contact
            </span>
          </div>
        </div>

        {/* Status Indicator */}
        <div className="flex justify-center mt-6">
          <div className="flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 bg-white/5">
            <div className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse"></div>
            <span className="text-cyan-400 text-xs font-medium">All systems operational</span>
          </div>
        </div>
      </div>
    </footer>
  );
}