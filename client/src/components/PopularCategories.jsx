import React from "react";
import mobilesImg from "../assets/mobails.jpg"
import laptopImg from "../assets/laptop.jpg"
import tabletsImg from "../assets/tablet.jpg"
import smartwatchImg from "../assets/smartwatch.jpg"
export default function PopularCategories() {
  const categories = [
    { name: "Mobiles", image: mobilesImg },
    { name: "Laptops", image: laptopImg },
    { name: "Tablets", image: tabletsImg},
    { name: "Smartwatches", image: smartwatchImg },
  ];

  return (
    <section className="py-16 lg:py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-blue-900 to-slate-900 -mt-20">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12 lg:mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4 lg:mb-6">
            Popular Categories
          </h2>
          <p className="text-gray-300 text-lg sm:text-xl lg:text-2xl max-w-3xl mx-auto leading-relaxed">
            Explore our most compared product categories
          </p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {categories.map((cat, idx) => (
            <div
              key={idx}
              className="group bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-2xl overflow-hidden hover:border-blue-500/50 hover:shadow-xl hover:shadow-blue-500/10 transition-all duration-300 cursor-pointer hover:transform hover:scale-105"
            >
              <div className="relative overflow-hidden">
                <img
                  src={cat.image}
                  alt={cat.name}
                  className="w-full h-48 sm:h-52 object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 to-transparent group-hover:from-blue-900/60 transition-all duration-300"></div>
                <div className="absolute inset-0 bg-blue-600/0 group-hover:bg-blue-600/20 transition-all duration-300"></div>
              </div>
              <div className="p-6 lg:p-8 text-center">
                <h3 className="text-xl lg:text-2xl font-semibold text-white group-hover:text-blue-400 transition-colors duration-300">
                  {cat.name}
                </h3>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}