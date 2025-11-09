import { Link, useLocation } from "react-router-dom";
import { useUser, SignInButton, UserButton } from "@clerk/clerk-react";
import { GitCompare, Home, Package, Heart, Cpu } from "lucide-react";
import { motion } from "framer-motion";

export default function Navbar() {
  const { isSignedIn } = useUser();
  const location = useLocation();

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 border-b border-white/10">
      {/* Background */}
      <div className="absolute inset-0 bg-black/80 backdrop-blur-xl"></div>
      
      <div className="relative max-w-7xl mx-auto px-6">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-purple-500 blur-lg opacity-50"></div>
              <div className="relative w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-500 to-purple-500 flex items-center justify-center">
                <Cpu className="w-6 h-6 text-white" />
              </div>
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
              CompareX
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-2">
            <NavLink to="/" icon={Home} label="Home" isActive={location.pathname === "/"} />
            <NavLink to="/products" icon={Package} label="Products" isActive={location.pathname === "/products"} />
            <NavLink to="/wishlist" icon={Heart} label="Wishlist" isActive={location.pathname === "/wishlist"} />
            <NavLink to="/compare" icon={GitCompare} label="Compare" isActive={location.pathname === "/compare"} />
          </div>

          {/* Mobile Navigation */}
          <div className="flex md:hidden items-center gap-2">
            <MobileNavLink to="/" icon={Home} isActive={location.pathname === "/"} />
            <MobileNavLink to="/products" icon={Package} isActive={location.pathname === "/products"} />
            <MobileNavLink to="/wishlist" icon={Heart} isActive={location.pathname === "/wishlist"} />
            <MobileNavLink to="/compare" icon={GitCompare} isActive={location.pathname === "/compare"} />
          </div>

          {/* Auth Button */}
          <div className="flex items-center">
            {isSignedIn ? (
              <div className="p-1 rounded-full border border-white/10 bg-white/5">
                <UserButton 
                  appearance={{
                    elements: {
                      avatarBox: "w-9 h-9 rounded-full"
                    }
                  }}
                />
              </div>
            ) : (
              <SignInButton>
                <button className="px-6 py-2 rounded-lg bg-gradient-to-r from-cyan-500 to-purple-500 text-white text-sm font-medium hover:opacity-90 transition-opacity">
                  Sign In
                </button>
              </SignInButton>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}

// Desktop Nav Link
function NavLink({ to, icon: Icon, label, isActive }) {
  return (
    <Link to={to}>
      <div className={`relative px-4 py-2 rounded-lg transition-all ${
        isActive 
          ? 'text-white bg-white/10' 
          : 'text-gray-400 hover:text-white hover:bg-white/5'
      }`}>
        <div className="flex items-center gap-2">
          <Icon className="w-4 h-4" />
          <span className="text-sm font-medium">{label}</span>
        </div>
        {isActive && (
          <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-cyan-500 to-purple-500"></div>
        )}
      </div>
    </Link>
  );
}

// Mobile Nav Link
function MobileNavLink({ to, icon: Icon, isActive }) {
  return (
    <Link to={to}>
      <div className={`p-2.5 rounded-lg transition-all ${
        isActive 
          ? 'text-cyan-400 bg-white/10' 
          : 'text-gray-400 hover:text-white hover:bg-white/5'
      }`}>
        <Icon className="w-5 h-5" />
      </div>
    </Link>
  );
}