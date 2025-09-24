import React, { useState } from "react";
import { Search, Zap, Shield, Users } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useUser } from "@clerk/clerk-react"; // clerk login check

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

  return (
    <div className="relative bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 min-h-screen flex items-center overflow-hidden">
      <div className="relative z-10 max-w-7xl mx-auto px-6 py-20">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          
          {/* Left Content */}
          <div className="text-center lg:text-left">
            <h1 className="text-5xl lg:text-6xl xl:text-7xl font-bold text-white mb-6 leading-tight">
              Find Your
              <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent"> Perfect </span>
              Tech Match
            </h1>

            <p className="text-xl lg:text-2xl text-gray-300 mb-10">
              Compare thousands of products instantly. Get expert insights, reviews, and make confident buying decisions.
            </p>
            
            {/* Search Bar */}
            <div className="mb-10">
              <div className="relative max-w-2xl mx-auto lg:mx-0">
                <div className="flex bg-white rounded-2xl shadow-2xl p-2">
                  <input 
                    type="text" 
                    placeholder="Search iPhone 15, MacBook Pro..."
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    className="flex-1 px-6 py-4 text-gray-700 bg-transparent outline-none text-lg"
                  />
                  <button
                    onClick={handleSearch}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-xl font-semibold flex items-center space-x-2"
                  >
                    <Search className="w-5 h-5" />
                    <span>Search</span>
                  </button>
                </div>
              </div>
            </div>
            
            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-6 justify-center lg:justify-start">
              <button
                onClick={handleStartCompare}
                className="bg-gradient-to-r from-blue-600 to-cyan-600 text-white px-10 py-4 rounded-xl font-bold text-lg shadow-xl"
              >
                Start Comparing
              </button>
            </div>
          </div>

          {/* Right Content - Product Showcase */}
          {/* (keeping your design the same here) */}
        </div>
      </div>
    </div>
  );
}
