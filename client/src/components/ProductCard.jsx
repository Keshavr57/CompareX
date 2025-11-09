import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCompare } from "../context/CompareContext";
import { Heart, Eye, Store, TrendingUp, Star, Plus, X } from "lucide-react";

export default function ProductCard({ product, isHighlighted = false, onViewDetails }) {
  const navigate = useNavigate();
  const { addToCompare, removeFromCompare, compareList } = useCompare();
  const isSelected = compareList.some((p) => p.id === product.id);
  const [isFavorite, setIsFavorite] = useState(() => {
    const wishlist = JSON.parse(localStorage.getItem("wishlist") || "[]");
    return wishlist.some((p) => p.id === product.id);
  });

  const toggleFavorite = (e) => {
    e.stopPropagation();
    const wishlist = JSON.parse(localStorage.getItem("wishlist") || "[]");
    if (isFavorite) {
      const updated = wishlist.filter((p) => p.id !== product.id);
      localStorage.setItem("wishlist", JSON.stringify(updated));
      setIsFavorite(false);
    } else {
      wishlist.push(product);
      localStorage.setItem("wishlist", JSON.stringify(wishlist));
      setIsFavorite(true);
    }
  };

  return (
    <div className={`group rounded-2xl border ${isHighlighted ? 'border-cyan-500/50' : 'border-white/10'} bg-white/5 hover:bg-white/10 hover:border-cyan-500/30 transition-all duration-300 overflow-hidden flex flex-col h-full`}>
      
      {/* Image Container */}
      <div className="relative overflow-hidden bg-black/20 aspect-square">
        <img 
          src={product.image_url} 
          alt={product.name} 
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
        />
        
        {/* Overlay Actions */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2">
            <button
              onClick={(e) => {
                e.stopPropagation();
                onViewDetails?.(product);
              }}
              className="bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white p-2 rounded-lg transition-all"
              title="View Details"
            >
              <Eye className="w-4 h-4" />
            </button>
            <button
              onClick={toggleFavorite}
              className={`${isFavorite ? 'bg-cyan-500 text-white' : 'bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white'} p-2 rounded-lg transition-all`}
              title={isFavorite ? "Remove from Wishlist" : "Add to Wishlist"}
            >
              <Heart className={`w-4 h-4 ${isFavorite ? 'fill-current' : ''}`} />
            </button>
          </div>
        </div>
        
        {/* Badges */}
        <div className="absolute top-3 left-3 right-3 flex justify-between items-start">
          {isSelected && (
            <div className="bg-cyan-500 text-white rounded-lg px-3 py-1 text-xs font-semibold">
              Selected
            </div>
          )}
          {product.trending && (
            <div className="bg-gradient-to-r from-cyan-500 to-purple-500 text-white rounded-lg px-3 py-1 text-xs font-semibold flex items-center gap-1 ml-auto">
              <TrendingUp className="w-3 h-3" />
              Trending
            </div>
          )}
        </div>
      </div>

      {/* Content Container */}
      <div className="p-5 flex-1 flex flex-col">
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-white mb-1 line-clamp-2">
            {product.name}
          </h3>
          
          <p className="text-sm text-gray-500 mb-3">
            {product.brand}
          </p>

          <div className="flex items-center justify-between mb-4">
            <div>
              <p className="text-2xl font-bold text-white">
                ₹{product.price?.toLocaleString('en-IN') || product.price}
              </p>
              {product.originalPrice && (
                <p className="text-xs text-gray-500 line-through">₹{product.originalPrice?.toLocaleString('en-IN')}</p>
              )}
            </div>
            
            {product.rating && (
              <div className="flex items-center gap-1 bg-white/10 px-3 py-1.5 rounded-lg border border-white/10">
                <Star className="w-4 h-4 text-cyan-400 fill-cyan-400" />
                <span className="text-sm font-semibold text-white">
                  {product.rating}
                </span>
              </div>
            )}
          </div>

          {/* Quick Specs */}
          {(product.ram || product.storage) && (
            <div className="flex gap-2 mb-4 flex-wrap">
              {product.ram && (
                <span className="text-xs bg-cyan-500/10 text-cyan-400 px-3 py-1 rounded-lg font-medium border border-cyan-500/20">
                  {product.ram}
                </span>
              )}
              {product.storage && (
                <span className="text-xs bg-purple-500/10 text-purple-400 px-3 py-1 rounded-lg font-medium border border-purple-500/20">
                  {product.storage}
                </span>
              )}
            </div>
          )}
        </div>

        {/* Action Buttons */}
        <div className="space-y-2">
          {/* Find Best Price Button */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              sessionStorage.setItem('selectedProduct', JSON.stringify(product));
              navigate(`/best-price/${product.id}`);
            }}
            className="w-full py-3 px-4 rounded-lg font-medium text-sm transition-all flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 text-white border border-white/10 hover:border-cyan-500/30"
          >
            <Store className="w-4 h-4" />
            Where to Buy
          </button>

          {/* Add to Compare Button */}
          <button
            onClick={() => (isSelected ? removeFromCompare(product.id) : addToCompare(product))}
            className={`w-full py-3 px-4 rounded-lg font-medium text-sm transition-all flex items-center justify-center gap-2 ${
              isSelected 
                ? "bg-white/10 hover:bg-white/20 text-white border border-white/10" 
                : "bg-gradient-to-r from-cyan-500 to-purple-500 text-white hover:opacity-90"
            }`}
          >
            {isSelected ? (
              <>
                <X className="w-4 h-4" />
                Remove
              </>
            ) : (
              <>
                <Plus className="w-4 h-4" />
                Add to Compare
              </>
            )}
          </button>
        </div>

        {/* Highlighted Message */}
        {isHighlighted && (
          <div className="mt-3 p-3 bg-cyan-500/10 rounded-lg border border-cyan-500/20">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse"></div>
              <span className="text-xs text-cyan-400 font-medium">
                Preselected — choose other products to compare
              </span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}