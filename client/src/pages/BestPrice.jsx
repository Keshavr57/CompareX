import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ExternalLink, TrendingDown, ShoppingCart, Check, X, Star, ArrowLeft, Loader } from 'lucide-react';
import { motion } from 'framer-motion';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5001/api';

export default function BestPrice() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [priceData, setPriceData] = useState(null);
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPriceComparison();
  }, [id]);

  const fetchPriceComparison = async () => {
    try {
      setLoading(true);
      console.log(`\n🔍 Starting price comparison fetch for product ID: ${id}`);
      
      // Step 1: Get product from sessionStorage first (immediate)
      const storedProduct = sessionStorage.getItem('selectedProduct');
      let productData = null;
      
      if (storedProduct) {
        try {
          productData = JSON.parse(storedProduct);
          console.log('✅ Retrieved product from sessionStorage:', productData.name || productData.title);
          // Set product immediately for faster UI
          setProduct(productData);
        } catch (parseError) {
          console.error('❌ Failed to parse stored product:', parseError);
        }
      }
      
      // Step 2: Fetch price comparison from backend
      try {
        console.log(`🌐 Fetching price comparison from: ${API_URL}/products/${id}/price-comparison`);
        
        const response = await fetch(`${API_URL}/products/${id}/price-comparison`);
        
        if (!response.ok) {
          throw new Error(`HTTP ${response.status}: ${response.statusText}`);
        }
        
        const data = await response.json();
        console.log('✅ Price comparison received:', data);
        
        // Update product if backend has more complete data
        if (data.product_name) {
          const backendProduct = {
            id: data.product_id,
            name: data.product_name,
            brand: data.product_brand,
            price: data.base_price || data.prices[0]?.price,
            image_url: data.product_image,
            rating: data.prices[0]?.rating || 4.5,
            description: productData?.description || `Premium ${data.product_brand} product with latest features`
          };
          setProduct(backendProduct);
          console.log('✅ Updated product from backend data');
        }
        
        // Set price data
        setPriceData(data);
        console.log(`📊 Loaded ${data.prices?.length || 0} price comparisons`);
        
      } catch (apiError) {
        console.error('❌ Backend API error:', apiError.message);
        
        // If backend fails, try to fetch product directly
        if (!productData) {
          try {
            const productResponse = await fetch(`${API_URL}/products/${id}`);
            if (productResponse.ok) {
              productData = await productResponse.json();
              setProduct(productData);
              console.log('✅ Fetched product directly from backend');
            }
          } catch (productError) {
            console.error('❌ Failed to fetch product:', productError);
          }
        }
        
        // Generate fallback mock data if we have product info
        if (productData) {
          console.log('⚠️ Generating fallback price data');
          
          const mockPrices = [
            {
              platform: 'Amazon India',
              price: Math.round(productData.price * 0.98),
              url: `https://www.amazon.in/s?k=${encodeURIComponent(productData.name || productData.title)}`,
              in_stock: true,
              delivery: 'Free Delivery',
              rating: 4.5
            },
            {
              platform: 'Flipkart',
              price: productData.price,
              url: `https://www.flipkart.com/search?q=${encodeURIComponent(productData.name || productData.title)}`,
              in_stock: true,
              delivery: 'Free Delivery',
              rating: 4.4
            },
            {
              platform: 'Croma',
              price: Math.round(productData.price * 1.05),
              url: `https://www.croma.com/search?q=${encodeURIComponent(productData.name || productData.title)}`,
              in_stock: true,
              delivery: '₹50 Delivery',
              rating: 4.2
            },
            {
              platform: 'Reliance Digital',
              price: Math.round(productData.price * 1.03),
              url: `https://www.reliancedigital.in/search?q=${encodeURIComponent(productData.name || productData.title)}`,
              in_stock: true,
              delivery: 'Free Delivery',
              rating: 4.3
            }
          ].sort((a, b) => a.price - b.price);
          
          setPriceData({
            success: true,
            product_id: id,
            product_name: productData.name || productData.title,
            prices: mockPrices,
            best_price: mockPrices[0],
            savings: mockPrices[mockPrices.length - 1].price - mockPrices[0].price
          });
        } else {
          console.error('❌ No product data available at all');
        }
      }
    } catch (err) {
      console.error('❌ Fatal error in fetchPriceComparison:', err);
    } finally {
      setLoading(false);
      console.log('✅ Price comparison fetch complete\n');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 flex items-center justify-center">
        <div className="text-center">
          <Loader className="w-16 h-16 text-purple-600 animate-spin mx-auto mb-4" />
          <p className="text-xl font-bold text-gray-700">Finding best prices...</p>
        </div>
      </div>
    );
  }

  if (!priceData || !product) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-xl font-bold text-gray-700 mb-4">Product not found</p>
          <button onClick={() => navigate('/products')} className="bg-purple-600 text-white px-6 py-3 rounded-xl font-bold">
            Back to Products
          </button>
        </div>
      </div>
    );
  }

  const { prices, best_price, savings } = priceData;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 py-8 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Back Button */}
        <button
          onClick={() => navigate('/products')}
          className="mb-6 flex items-center gap-2 text-gray-700 hover:text-purple-600 font-semibold transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
          Back to Products
        </button>

        {/* Product Header */}
        <div className="bg-white rounded-3xl shadow-xl p-8 mb-8">
          <div className="flex flex-col md:flex-row gap-8 items-center">
            <img
              src={product.image_url}
              alt={product.name}
              className="w-64 h-64 object-cover rounded-2xl shadow-lg"
            />
            <div className="flex-1">
              <h1 className="text-4xl font-bold text-gray-900 mb-2">{product.name}</h1>
              <p className="text-xl text-gray-600 mb-4">{product.brand}</p>
              <div className="flex items-center gap-2 mb-4">
                <Star className="w-6 h-6 text-amber-500 fill-amber-500" />
                <span className="text-2xl font-bold text-amber-700">{product.rating}</span>
              </div>
              <p className="text-gray-700">{product.description}</p>
            </div>
          </div>
        </div>

        {/* Price Comparison Header */}
        <div className="bg-gradient-to-r from-green-600 to-emerald-600 rounded-3xl shadow-xl p-8 mb-8 text-white">
          <div className="flex items-center gap-4 mb-4">
            <div className="p-4 bg-white/20 rounded-2xl">
              <TrendingDown className="w-12 h-12" />
            </div>
            <div className="flex-1">
              <h2 className="text-3xl font-bold">Price Comparison Tool</h2>
              <p className="text-lg text-white/90">Estimated prices across major platforms</p>
              <p className="text-sm text-yellow-300 font-semibold mt-1">
                ⚠️ Click "Buy Now" to see actual current prices
              </p>
            </div>
          </div>

          {savings > 0 && (
            <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-6 mt-6">
              <p className="text-2xl font-bold">
                � Estimated savings up to ₹{savings.toLocaleString('en-IN')} between platforms
              </p>
              <p className="text-sm text-yellow-200 mt-2">
                * Actual prices may vary - verify on platform websites
              </p>
            </div>
          )}
        </div>

        {/* Price Cards */}
        <div className="grid gap-6">
          {prices.map((platform, index) => {
            const isBestPrice = index === 0;
            
            return (
              <motion.div
                key={platform.platform}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className={`relative rounded-3xl p-8 shadow-xl transition-all hover:scale-102 ${
                  isBestPrice
                    ? 'bg-gradient-to-r from-green-500 to-emerald-500 border-4 border-green-600'
                    : 'bg-white border-2 border-gray-200 hover:border-green-300'
                }`}
              >
                {isBestPrice && (
                  <div className="absolute -top-4 -right-4 bg-yellow-400 text-yellow-900 px-6 py-3 rounded-full text-lg font-bold shadow-lg flex items-center gap-2 animate-bounce">
                    <Star className="w-6 h-6 fill-yellow-900" />
                    BEST DEAL!
                  </div>
                )}

                <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                  {/* Platform Info */}
                  <div className="flex-1">
                    <div className="flex items-center gap-4 mb-4">
                      <h3 className={`text-3xl font-bold ${
                        isBestPrice ? 'text-white' : 'text-gray-900'
                      }`}>
                        {platform.platform}
                      </h3>
                      {platform.in_stock ? (
                        <span className={`flex items-center gap-2 text-sm font-bold px-4 py-2 rounded-full ${
                          isBestPrice ? 'bg-white/30 text-white' : 'bg-green-100 text-green-700'
                        }`}>
                          <Check className="w-5 h-5" />
                          In Stock
                        </span>
                      ) : (
                        <span className="flex items-center gap-2 text-sm font-bold px-4 py-2 rounded-full bg-red-100 text-red-700">
                          <X className="w-5 h-5" />
                          Out of Stock
                        </span>
                      )}
                    </div>

                    <div className="flex items-baseline gap-4 mb-3">
                      <p className={`text-5xl font-bold ${
                        isBestPrice ? 'text-white' : 'text-gray-900'
                      }`}>
                        ₹{platform.price.toLocaleString('en-IN')}
                      </p>
                      {!isBestPrice && (
                        <span className="text-xl text-red-600 font-bold">
                          +₹{(platform.price - best_price.price).toLocaleString('en-IN')}
                        </span>
                      )}
                    </div>

                    <div className="flex items-center gap-6">
                      <span className={`text-lg ${
                        isBestPrice ? 'text-white/90' : 'text-gray-600'
                      }`}>
                        🚚 {platform.delivery}
                      </span>
                      {platform.rating && (
                        <div className={`flex items-center gap-2 ${
                          isBestPrice ? 'text-white' : 'text-gray-700'
                        }`}>
                          <Star className={`w-5 h-5 ${
                            isBestPrice ? 'fill-white' : 'fill-amber-400 text-amber-400'
                          }`} />
                          <span className="text-lg font-bold">{platform.rating}</span>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Buy Button */}
                  <a
                    href={platform.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`px-10 py-5 rounded-2xl font-bold text-xl transition-all hover:scale-110 flex items-center gap-3 shadow-lg ${
                      isBestPrice
                        ? 'bg-white text-green-600 hover:bg-gray-50'
                        : 'bg-gradient-to-r from-green-600 to-emerald-600 text-white hover:from-green-700 hover:to-emerald-700'
                    }`}
                  >
                    <ShoppingCart className="w-6 h-6" />
                    Buy Now
                    <ExternalLink className="w-5 h-5" />
                  </a>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Important Disclaimer */}
        <div className="mt-8 bg-yellow-50 border-4 border-yellow-400 rounded-3xl p-8">
          <div className="flex items-start gap-4">
            <div className="text-5xl">⚠️</div>
            <div>
              <h3 className="text-2xl font-bold text-yellow-900 mb-3">📊 Price Estimates - Please Verify</h3>
              <div className="space-y-2 text-yellow-900">
                <p className="text-lg font-semibold">
                  🔴 The prices shown above are <span className="underline">ESTIMATES</span> based on typical market variations.
                </p>
                <p className="text-lg">
                  ✅ <strong>Always click "Buy Now"</strong> to see the actual current price on each platform.
                </p>
                <p className="text-lg">
                  💰 Actual prices may vary due to sales, offers, location, and real-time availability.
                </p>
                <p className="text-lg font-bold text-red-700 mt-4">
                  ⚠️ This is a price comparison tool - NOT a live price tracker. Verify prices before purchase!
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Info Box */}
        <div className="mt-6 bg-blue-50 border-4 border-blue-200 rounded-3xl p-8">
          <h3 className="text-2xl font-bold text-blue-900 mb-4">💡 How to Use This Tool</h3>
          <ul className="space-y-3 text-blue-900">
            <li className="flex items-start gap-3">
              <span className="text-2xl">1️⃣</span>
              <span className="text-lg">Compare estimated price ranges across platforms</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-2xl">2️⃣</span>
              <span className="text-lg">Click "Buy Now" on platforms with lower estimates</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-2xl">3️⃣</span>
              <span className="text-lg">Check actual prices and offers on the platform's website</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-2xl">4️⃣</span>
              <span className="text-lg">Make your purchase from the platform with the best deal</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}