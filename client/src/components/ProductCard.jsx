import React from "react";
import { useCompare } from "../context/CompareContext";

export default function ProductCard({ product, isHighlighted = false }) {
  const { addToCompare, removeFromCompare, compareList } = useCompare();
  const isSelected = compareList.some((p) => p.id === product.id);

  return (
    <div className={`group bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100 flex flex-col h-full transform hover:-translate-y-1
      ${isHighlighted ? "ring-2 ring-indigo-400 shadow-lg" : ""}`}>
      
      {/* Image Container */}
      <div className="relative overflow-hidden bg-gray-50 aspect-square">
        <img 
          src={product.image_url} 
          alt={product.name} 
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" 
        />
        {isSelected && (
          <div className="absolute top-3 right-3 bg-indigo-600 text-white rounded-full p-2 shadow-lg">
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
          </div>
        )}
      </div>

      {/* Content Container */}
      <div className="p-5 flex-1 flex flex-col">
        <div className="flex-1">
          <h3 className="text-xl font-bold text-gray-900 mb-1 line-clamp-2 group-hover:text-indigo-600 transition-colors">
            {product.name}
          </h3>
          
          <p className="text-sm text-gray-500 mb-3 font-medium">
            {product.brand}
          </p>

          <div className="flex items-center justify-between mb-4">
            <p className="text-2xl font-bold text-indigo-600">
            ₹{product.price}
            </p>
            
            {product.rating && (
              <div className="flex items-center gap-1 bg-amber-50 px-2 py-1 rounded-full">
                <svg className="w-4 h-4 text-amber-500" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
                <span className="text-sm font-semibold text-amber-700">
                  {product.rating}
                </span>
              </div>
            )}
          </div>
        </div>

        {/* Action Button */}
        <button
          onClick={() => (isSelected ? removeFromCompare(product.id) : addToCompare(product))}
          className={`w-full py-3 px-4 rounded-xl font-semibold text-sm transition-all duration-200 flex items-center justify-center gap-2 ${
            isSelected 
              ? "bg-red-50 text-red-600 hover:bg-red-100 border border-red-200" 
              : "bg-indigo-600 text-white hover:bg-indigo-700 shadow-md hover:shadow-lg"
          }`}
        >
          {isSelected ? (
            <>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
              Remove from Compare
            </>
          ) : (
            <>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
              Add to Compare
            </>
          )}
        </button>

        {/* Highlighted Message */}
        {isHighlighted && (
          <div className="mt-3 p-3 bg-indigo-50 rounded-lg border border-indigo-200">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-indigo-500 rounded-full animate-pulse"></div>
              <span className="text-xs text-indigo-700 font-semibold">
                Preselected — choose other products to compare
              </span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}