import { Link } from "react-router-dom";
import { useUser, SignInButton, UserButton } from "@clerk/clerk-react";
import { GitCompare, Home, Package, Zap } from "lucide-react";

export default function Navbar() {
  const { isSignedIn } = useUser(); // get signed-in status

  return (
    <nav className="bg-gradient-to-r from-slate-900 via-blue-900 to-indigo-900 backdrop-blur-sm border-b border-slate-700/50 p-4 flex justify-between items-center sticky top-0 z-50 shadow-2xl">
      {/* Logo */}
      <Link 
        to="/" 
        className="group flex items-center gap-3 text-2xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent hover:from-pink-400 hover:via-purple-400 hover:to-blue-400 transition-all duration-300"
      >
        <div className="p-2 bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl group-hover:from-purple-600 group-hover:to-pink-600 transition-all duration-300 shadow-lg">
          <Zap className="w-6 h-6 text-white" />
        </div>
        CompareX
      </Link>

      {/* Navigation Links & Auth */}
      <div className="flex items-center gap-8">
        {/* Navigation Links */}
        <div className="hidden md:flex items-center gap-6">
          <Link 
            to="/" 
            className="group flex items-center gap-2 text-gray-300 hover:text-white font-medium transition-all duration-300 px-3 py-2 rounded-lg hover:bg-white/10"
          >
            <Home className="w-4 h-4 group-hover:scale-110 transition-transform duration-300" />
            Home
          </Link>
          
          <Link 
            to="/products" 
            className="group flex items-center gap-2 text-gray-300 hover:text-white font-medium transition-all duration-300 px-3 py-2 rounded-lg hover:bg-white/10"
          >
            <Package className="w-4 h-4 group-hover:scale-110 transition-transform duration-300" />
            Products
          </Link>
          
          <Link 
            to="/compare" 
            className="group flex items-center gap-2 text-gray-300 hover:text-white font-medium transition-all duration-300 px-3 py-2 rounded-lg hover:bg-white/10"
          >
            <GitCompare className="w-4 h-4 group-hover:scale-110 transition-transform duration-300" />
            Compare
          </Link>
        </div>

        {/* Mobile Menu Links */}
        <div className="flex md:hidden items-center gap-4">
          <Link 
            to="/" 
            className="p-2 text-gray-300 hover:text-white hover:bg-white/10 rounded-lg transition-all duration-300"
          >
            <Home className="w-5 h-5" />
          </Link>
          
          <Link 
            to="/products" 
            className="p-2 text-gray-300 hover:text-white hover:bg-white/10 rounded-lg transition-all duration-300"
          >
            <Package className="w-5 h-5" />
          </Link>
          
          <Link 
            to="/compare" 
            className="p-2 text-gray-300 hover:text-white hover:bg-white/10 rounded-lg transition-all duration-300"
          >
            <GitCompare className="w-5 h-5" />
          </Link>
        </div>

        {/* Authentication */}
        <div className="flex items-center">
          {isSignedIn ? (
            <div className="p-1 bg-gradient-to-br from-blue-600/20 to-purple-600/20 rounded-full border border-slate-600/50">
              <UserButton 
                appearance={{
                  elements: {
                    avatarBox: "w-10 h-10 rounded-full border-2 border-blue-400/50 hover:border-blue-400 transition-colors duration-300"
                  }
                }}
              />
            </div>
          ) : (
            <SignInButton>
              <button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-6 py-2.5 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl border border-blue-500/20">
                Login
              </button>
            </SignInButton>
          )}
        </div>
      </div>
    </nav>
  );
}