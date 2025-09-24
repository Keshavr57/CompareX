import { FaLinkedin, FaGithub } from "react-icons/fa";
import { Zap, Heart, ExternalLink } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useUser } from "@clerk/clerk-react";

export default function Footer() {
  const navigate = useNavigate();
  const { isSignedIn } = useUser(); // Clerk hook

  const handleNavigation = (path, protectedRoute = false) => {
    if (protectedRoute && !isSignedIn) {
      // If user not logged in, send to login page
      navigate("/sign-in");
    } else {
      navigate(path);
    }
  };

  return (
    <footer className="relative bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 text-white mt-10 overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_120%,rgba(59,130,246,0.1),transparent_70%)]"></div>

      <div className="relative z-10 p-6">
        <div className="max-w-6xl mx-auto">
          {/* Main Footer Content */}
          <div className="grid md:grid-cols-3 gap-6 mb-6">
            {/* Brand Section */}
            <div className="space-y-2">
              <div className="flex items-center gap-2 mb-2">
                <div className="p-1.5 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg shadow-lg">
                  <Zap className="w-4 h-4 text-white" />
                </div>
                <h3 className="text-xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                  CompareX
                </h3>
              </div>
              <p className="text-gray-300 text-sm leading-relaxed">
                Compare tech products smarter and faster.
              </p>
              <div className="flex items-center gap-2 text-xs text-gray-400">
                <span>Made with</span>
                <Heart className="w-3 h-3 text-red-400 fill-red-400" />
                <span>for tech enthusiasts</span>
              </div>
            </div>

            {/* Links Section */}
            <div className="space-y-2">
              <h4 className="text-lg font-bold text-white mb-3">Quick Links</h4>
              <ul className="space-y-2">
                <li className="group">
                  <span
                    onClick={() => handleNavigation("/")}
                    className="flex items-center gap-2 text-gray-300 hover:text-white cursor-pointer transition-all duration-300 text-sm hover:translate-x-1"
                  >
                    <ExternalLink className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    Home
                  </span>
                </li>
                <li className="group">
                  <span
                    onClick={() => handleNavigation("/products", true)}
                    className="flex items-center gap-2 text-gray-300 hover:text-white cursor-pointer transition-all duration-300 text-sm hover:translate-x-1"
                  >
                    <ExternalLink className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    Products
                  </span>
                </li>
                <li className="group">
                  <span
                    onClick={() => handleNavigation("/compare", true)}
                    className="flex items-center gap-2 text-gray-300 hover:text-white cursor-pointer transition-all duration-300 text-sm hover:translate-x-1"
                  >
                    <ExternalLink className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    Compare
                  </span>
                </li>
                <li className="group">
                  <span
                    onClick={() => handleNavigation("/")}
                    className="flex items-center gap-2 text-gray-300 hover:text-white cursor-pointer transition-all duration-300 text-sm hover:translate-x-1"
                  >
                    <ExternalLink className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    About
                  </span>
                </li>
              </ul>
            </div>

            {/* Social Section */}
            <div className="space-y-2">
              <h4 className="text-lg font-bold text-white mb-3">Connect With Us</h4>
              <p className="text-gray-300 mb-3 text-sm">
                Follow us for updates and comparisons.
              </p>
              <div className="flex gap-3">
                <div className="group">
                  <div className="p-2 bg-gradient-to-br from-slate-800 to-slate-900 rounded-lg border border-slate-700 hover:border-blue-500 transition-all duration-300 transform hover:scale-110 hover:shadow-md hover:shadow-blue-500/20 cursor-pointer">
                    <FaLinkedin className="w-4 h-4 text-gray-400 group-hover:text-blue-500 transition-colors duration-300" />
                  </div>
                </div>
                <div className="group">
                  <div className="p-2 bg-gradient-to-br from-slate-800 to-slate-900 rounded-lg border border-slate-700 hover:border-gray-400 transition-all duration-300 transform hover:scale-110 hover:shadow-md hover:shadow-gray-500/20 cursor-pointer">
                    <FaGithub className="w-4 h-4 text-gray-400 group-hover:text-white transition-colors duration-300" />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Divider */}
          <div className="border-t border-gradient-to-r from-transparent via-slate-700 to-transparent mb-4"></div>

          {/* Bottom Section */}
          <div className="flex flex-col md:flex-row justify-between items-center gap-3">
            <p className="text-gray-400 text-center md:text-left text-sm">
              © 2025 CompareX. All rights reserved.
            </p>
            <div className="flex items-center gap-4 text-xs">
              <span className="text-gray-400 hover:text-white cursor-pointer transition-colors duration-300">
                Privacy Policy
              </span>
              <span className="text-gray-400 hover:text-white cursor-pointer transition-colors duration-300">
                Terms of Service
              </span>
              <span className="text-gray-400 hover:text-white cursor-pointer transition-colors duration-300">
                Contact
              </span>
            </div>
          </div>

          {/* Status Indicator */}
          <div className="flex justify-center mt-4">
            <div className="flex items-center gap-2 px-3 py-1 bg-gradient-to-r from-green-600/20 to-emerald-600/20 border border-green-500/30 rounded-full">
              <div className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse"></div>
              <span className="text-green-400 text-xs font-medium">All systems operational</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
