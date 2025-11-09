import React, { useState, useEffect, useContext } from "react";
import ProductCard from "../components/ProductCard";
import { CompareContext } from "../context/CompareContext";
import ProductDetailsModal from "../components/ProductDetailsModal";
import AIRecommendation from "../components/AIRecommendation";
import PriceDropAlert from "../components/PriceDropAlert";
import { useNavigate } from "react-router-dom";
import { fetchProductsFromAPI } from "../services/productService";
import { Search, Filter, Grid, List, X, Sparkles, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

export default function Products() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [sortBy, setSortBy] = useState("name");
  const [priceRange, setPriceRange] = useState([0, 200000]);
  const [viewMode, setViewMode] = useState("grid");
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { addToCompare, compareList } = useContext(CompareContext);
  const navigate = useNavigate();

  useEffect(() => {
    const loadProducts = async () => {
      setLoading(true);
      try {
        console.log('🔄 Fetching fresh products from API...');
        const autoProducts = await fetchProductsFromAPI();
        console.log('✅ Loaded', autoProducts.length, 'products from API');
        setProducts(autoProducts);
      } catch (err) {
        console.error("❌ Error fetching products:", err);
        setProducts([]);
      } finally {
        setLoading(false);
      }
    };

    loadProducts();
  }, []);

  const filteredProducts = products
    .filter((p) => {
      const matchesCategory = category === "All" || p.category === category;
      const matchesSearch =
        search.trim() === "" ||
        p.name.toLowerCase().includes(search.toLowerCase()) ||
        (p.brand && p.brand.toLowerCase().includes(search.toLowerCase()));
      const price = typeof p.price === 'string' ? parseFloat(p.price.replace(/[^0-9.-]+/g, "")) : p.price;
      const matchesPrice = price >= priceRange[0] && price <= priceRange[1];
      return matchesCategory && matchesSearch && matchesPrice;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case "price-low":
          return parseFloat(a.price.replace(/[^0-9.-]+/g, "")) - parseFloat(b.price.replace(/[^0-9.-]+/g, ""));
        case "price-high":
          return parseFloat(b.price.replace(/[^0-9.-]+/g, "")) - parseFloat(a.price.replace(/[^0-9.-]+/g, ""));
        case "rating":
          return (b.rating || 0) - (a.rating || 0);
        default:
          return a.name.localeCompare(b.name);
      }
    });

  const handleViewDetails = (product) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
  };

  const handleToggleFavorite = () => {
    const wishlist = JSON.parse(localStorage.getItem("wishlist") || "[]");
    const exists = wishlist.some(p => p.id === selectedProduct.id);
    
    if (exists) {
      const updated = wishlist.filter(p => p.id !== selectedProduct.id);
      localStorage.setItem("wishlist", JSON.stringify(updated));
    } else {
      wishlist.push(selectedProduct);
      localStorage.setItem("wishlist", JSON.stringify(wishlist));
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-cyan-500/30 border-t-cyan-500 rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-xl text-gray-400 font-medium">Loading products...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black pt-16">
      {/* Hero Section */}
      <div className="relative py-16 px-6 overflow-hidden">
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

        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div
            className="absolute top-0 left-1/4 w-[500px] h-[500px] rounded-full opacity-10 blur-[120px]"
            style={{
              background: 'radial-gradient(circle, rgba(6, 182, 212, 0.3), transparent 70%)',
            }}
          />
        </div>

        <div className="relative max-w-7xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 bg-white/5 mb-6">
              <Sparkles className="w-4 h-4 text-cyan-400" />
              <span className="text-xs font-semibold text-cyan-400 tracking-wider uppercase">
                All Products
              </span>
            </div>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 text-white">
              Compare Tech Products
            </h1>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              Find the perfect device by comparing specs, prices, and reviews
            </p>
          </motion.div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 pb-16">
        {/* Filters Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="rounded-2xl border border-white/10 bg-white/5 p-6 mb-8"
        >
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-white flex items-center gap-3">
              <Filter className="w-5 h-5 text-cyan-400" />
              Filters
            </h2>
            <div className="flex gap-2">
              <button
                onClick={() => setViewMode("grid")}
                className={`p-2 rounded-lg transition-all ${
                  viewMode === "grid" 
                    ? "bg-cyan-500 text-white" 
                    : "bg-white/5 text-gray-400 hover:bg-white/10"
                }`}
              >
                <Grid className="w-5 h-5" />
              </button>
              <button
                onClick={() => setViewMode("list")}
                className={`p-2 rounded-lg transition-all ${
                  viewMode === "list" 
                    ? "bg-cyan-500 text-white" 
                    : "bg-white/5 text-gray-400 hover:bg-white/10"
                }`}
              >
                <List className="w-5 h-5" />
              </button>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Search Input */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-500" />
              <input
                type="text"
                placeholder="Search products..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-10 pr-4 py-3 rounded-lg border border-white/10 bg-white/5 text-white placeholder-gray-500 focus:border-cyan-500/30 focus:outline-none transition-all"
              />
            </div>

            {/* Category Filter */}
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="px-4 py-3 rounded-lg border border-white/10 bg-white/5 text-white focus:border-cyan-500/30 focus:outline-none transition-all cursor-pointer"
            >
              <option value="All">All Categories</option>
              <option value="Mobile">📱 Mobile</option>
              <option value="Laptop">💻 Laptop</option>
              <option value="Tablet">📟 Tablet</option>
              <option value="Smartwatch">⌚ Smartwatch</option>
            </select>

            {/* Sort Filter */}
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-4 py-3 rounded-lg border border-white/10 bg-white/5 text-white focus:border-cyan-500/30 focus:outline-none transition-all cursor-pointer"
            >
              <option value="name">Sort by Name</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="rating">Highest Rated</option>
            </select>

            {/* Price Range */}
            <select
              onChange={(e) => {
                const value = e.target.value;
                if (value === "all") setPriceRange([0, 200000]);
                else if (value === "0-20000") setPriceRange([0, 20000]);
                else if (value === "20000-50000") setPriceRange([20000, 50000]);
                else if (value === "50000-100000") setPriceRange([50000, 100000]);
                else if (value === "100000+") setPriceRange([100000, 200000]);
              }}
              className="px-4 py-3 rounded-lg border border-white/10 bg-white/5 text-white focus:border-cyan-500/30 focus:outline-none transition-all cursor-pointer"
            >
              <option value="all">All Prices</option>
              <option value="0-20000">₹0 - ₹20,000</option>
              <option value="20000-50000">₹20,000 - ₹50,000</option>
              <option value="50000-100000">₹50,000 - ₹1,00,000</option>
              <option value="100000+">₹1,00,000+</option>
            </select>
          </div>

          {/* Results Count */}
          <div className="mt-6 flex items-center justify-between">
            <p className="text-gray-400">
              <span className="font-semibold text-cyan-400">{filteredProducts.length}</span> 
              {filteredProducts.length === 1 ? ' product' : ' products'} found
            </p>
            {(search || category !== "All" || priceRange[0] !== 0 || priceRange[1] !== 200000) && (
              <button
                onClick={() => {
                  setSearch("");
                  setCategory("All");
                  setPriceRange([0, 200000]);
                }}
                className="text-sm text-cyan-400 hover:text-cyan-300 font-medium flex items-center gap-1"
              >
                <X className="w-4 h-4" />
                Clear filters
              </button>
            )}
          </div>
        </motion.div>

        {/* Product Grid */}
        {filteredProducts.length > 0 ? (
          <div className={viewMode === "grid" 
            ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6" 
            : "flex flex-col gap-4"}>
            {filteredProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onViewDetails={handleViewDetails}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-16 rounded-2xl border border-white/10 bg-white/5">
            <h3 className="text-xl font-semibold text-white mb-2">No products found</h3>
            <p className="text-gray-400 mb-4">Try adjusting your search or filter criteria</p>
            <button
              onClick={() => {
                setSearch("");
                setCategory("All");
                setPriceRange([0, 200000]);
              }}
              className="bg-gradient-to-r from-cyan-500 to-purple-500 text-white px-6 py-3 rounded-lg hover:opacity-90 transition-opacity"
            >
              Reset Filters
            </button>
          </div>
        )}
      </div>

      {/* Compare Banner */}
      {compareList.length >= 2 && (
        <div className="fixed bottom-6 right-6 z-50">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="rounded-2xl border border-cyan-500/30 bg-gradient-to-r from-cyan-500 to-purple-500 text-white p-4 shadow-2xl min-w-[280px]"
          >
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="font-bold text-lg">{compareList.length} Selected</p>
                <p className="text-white/80 text-sm">Ready to compare</p>
              </div>
              <button
                onClick={() => navigate("/compare")}
                className="bg-white text-cyan-600 px-6 py-2 rounded-lg font-semibold hover:bg-gray-100 transition-all flex items-center gap-2"
              >
                Compare
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </motion.div>
        </div>
      )}

      {/* Product Details Modal */}
      <ProductDetailsModal
        product={selectedProduct}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onAddToCompare={() => selectedProduct && addToCompare(selectedProduct)}
        onToggleFavorite={handleToggleFavorite}
        isFavorite={selectedProduct && JSON.parse(localStorage.getItem("wishlist") || "[]").some(p => p.id === selectedProduct.id)}
      />

      {/* AI Recommendation */}
      <AIRecommendation products={products} />
      
      {/* Price Drop Alert */}
      <PriceDropAlert />
    </div>
  );
}