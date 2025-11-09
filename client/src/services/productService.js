// API Base URL
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5001/api';

// Fetch products from backend API
export const fetchProductsFromAPI = async (filters = {}) => {
  try {
    console.log('🌐 Fetching products from backend API...');
    
    // Build query parameters
    const params = new URLSearchParams();
    if (filters.category) params.append('category', filters.category);
    if (filters.search) params.append('search', filters.search);
    if (filters.minPrice) params.append('minPrice', filters.minPrice);
    if (filters.maxPrice) params.append('maxPrice', filters.maxPrice);
    if (filters.sort) params.append('sort', filters.sort);
    
    const response = await fetch(`${API_URL}/products?${params}`);
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const products = await response.json();
    console.log('✅ Loaded', products.length, 'products from backend');
    
    // If no products from backend, use mock data as fallback
    if (products.length === 0) {
      console.warn('⚠️ No products in database, using mock data');
      const mockProducts = createMockTechProducts();
      return mockProducts;
    } else {
      // Backend products are already in correct format, just return them
      console.log('✨ Loaded', products.length, 'products from backend');
      return products;
    }
    
  } catch (error) {
    console.error('❌ Error fetching products from backend:', error);
    console.warn('⚠️ Falling back to mock data');
    // Return mock products on error
    const mockProducts = createMockTechProducts();
    return mockProducts;
  }
};

// Create mock tech products as fallback - 100+ products
const createMockTechProducts = () => {
  const products = [];
  
  // SMARTPHONES - 40 products
  const mobileModels = [
    'iPhone 15 Pro Max', 'iPhone 15 Pro', 'iPhone 15', 'iPhone 14 Pro', 'iPhone 14',
    'Samsung Galaxy S24 Ultra', 'Samsung Galaxy S24+', 'Samsung Galaxy S24', 'Samsung Galaxy S23 Ultra', 'Samsung Galaxy Z Fold 5',
    'Samsung Galaxy Z Flip 5', 'Google Pixel 8 Pro', 'Google Pixel 8', 'Google Pixel 7a', 'OnePlus 12',
    'OnePlus 11', 'OnePlus Open', 'Xiaomi 14 Pro', 'Xiaomi 13T Pro', 'Xiaomi Redmi Note 13 Pro',
    'Vivo X100 Pro', 'Vivo V30 Pro', 'Oppo Find X7', 'Oppo Reno 11 Pro', 'Realme GT 5 Pro',
    'Nothing Phone 2', 'Motorola Edge 50 Pro', 'Sony Xperia 1 V', 'Asus ROG Phone 8', 'Honor Magic 6 Pro',
    'Nokia XR21', 'Infinix Note 40 Pro', 'Tecno Phantom X2', 'Poco X6 Pro', 'iQOO 12',
    'Huawei Mate 60 Pro', 'ZTE Axon 50 Ultra', 'Lenovo Legion Y90', 'BlackBerry KEY3', 'Fairphone 5'
  ];
  
  mobileModels.forEach((model, i) => {
    const brand = model.split(' ')[0];
    products.push({
      id: i + 1,
      title: model,
      brand: brand,
      price: 300 + Math.floor(Math.random() * 1500),
      category: 'smartphones',
      thumbnail: `https://picsum.photos/400/400?random=${i + 1}`,
      rating: (3.5 + Math.random() * 1.5).toFixed(1),
      description: `Premium smartphone with latest features`,
      stock: 20 + Math.floor(Math.random() * 80)
    });
  });
  
  // LAPTOPS - 35 products
  const laptopModels = [
    'MacBook Pro 16" M3', 'MacBook Pro 14" M3', 'MacBook Air 15" M2', 'MacBook Air 13" M2',
    'Dell XPS 15', 'Dell XPS 13', 'Dell Inspiron 16', 'HP Spectre x360', 'HP Envy 14',
    'HP Pavilion 15', 'Lenovo ThinkPad X1 Carbon', 'Lenovo Legion 5 Pro', 'Lenovo IdeaPad Slim 5',
    'Asus ROG Zephyrus G14', 'Asus ZenBook 14', 'Asus VivoBook Pro 15', 'Acer Swift 3',
    'Acer Predator Helios 300', 'MSI Stealth 15', 'MSI Creator Z16', 'Razer Blade 15',
    'Microsoft Surface Laptop 5', 'LG Gram 17', 'Samsung Galaxy Book 3 Pro', 'Huawei MateBook X Pro',
    'Alienware m15 R7', 'Framework Laptop 13', 'System76 Lemur Pro', 'Gigabyte Aero 16',
    'Asus TUF Gaming A15', 'HP Omen 16', 'Lenovo Yoga 9i', 'Dell G15 Gaming', 'Acer Nitro 5', 'MSI GF63'
  ];
  
  laptopModels.forEach((model, i) => {
    const brand = model.split(' ')[0];
    products.push({
      id: i + 100,
      title: model,
      brand: brand,
      price: 600 + Math.floor(Math.random() * 2500),
      category: 'laptops',
      thumbnail: `https://picsum.photos/400/400?random=${i + 100}`,
      rating: (3.8 + Math.random() * 1.2).toFixed(1),
      description: `High-performance laptop for work and gaming`,
      stock: 15 + Math.floor(Math.random() * 60)
    });
  });
  
  // TABLETS - 20 products
  const tabletModels = [
    'iPad Pro 12.9" M2', 'iPad Pro 11" M2', 'iPad Air 5', 'iPad 10th Gen', 'iPad Mini 6',
    'Samsung Galaxy Tab S9 Ultra', 'Samsung Galaxy Tab S9+', 'Samsung Galaxy Tab S9', 'Samsung Galaxy Tab A9+',
    'Microsoft Surface Pro 9', 'Microsoft Surface Go 3', 'Lenovo Tab P12 Pro', 'Lenovo Tab M10 Plus',
    'Xiaomi Pad 6 Pro', 'OnePlus Pad', 'Huawei MatePad Pro', 'Amazon Fire Max 11',
    'Google Pixel Tablet', 'Nokia T21', 'Realme Pad 2'
  ];
  
  tabletModels.forEach((model, i) => {
    const brand = model.split(' ')[0];
    products.push({
      id: i + 200,
      title: model,
      brand: brand,
      price: 200 + Math.floor(Math.random() * 1200),
      category: 'tablets',
      thumbnail: `https://picsum.photos/400/400?random=${i + 200}`,
      rating: (3.7 + Math.random() * 1.3).toFixed(1),
      description: `Versatile tablet for entertainment and productivity`,
      stock: 25 + Math.floor(Math.random() * 70)
    });
  });
  
  // SMARTWATCHES - 25 products
  const watchModels = [
    'Apple Watch Series 9', 'Apple Watch Ultra 2', 'Apple Watch SE', 'Samsung Galaxy Watch 6 Classic',
    'Samsung Galaxy Watch 6', 'Samsung Galaxy Watch 5 Pro', 'Google Pixel Watch 2', 'Garmin Fenix 7',
    'Garmin Venu 3', 'Fitbit Sense 2', 'Fitbit Versa 4', 'Amazfit GTR 4', 'Amazfit T-Rex Ultra',
    'Huawei Watch GT 4', 'OnePlus Watch 2', 'Xiaomi Watch S3', 'Fossil Gen 6', 'TicWatch Pro 5',
    'Withings ScanWatch 2', 'Polar Vantage V3', 'Suunto 9 Peak Pro', 'Coros Pace 3', 'Noise ColorFit Pro 5',
    'Fire-Boltt Phoenix Ultra', 'boAt Wave Call 2'
  ];
  
  watchModels.forEach((model, i) => {
    const brand = model.split(' ')[0];
    products.push({
      id: i + 300,
      title: model,
      brand: brand,
      price: 100 + Math.floor(Math.random() * 700),
      category: 'smartwatch',
      thumbnail: `https://picsum.photos/400/400?random=${i + 300}`,
      rating: (3.6 + Math.random() * 1.4).toFixed(1),
      description: `Smart wearable with health and fitness tracking`,
      stock: 30 + Math.floor(Math.random() * 90)
    });
  });
  
  return products;
};

// Random spec generators with custom arrays
const getRandomRAM = (options = ['4GB', '6GB', '8GB', '12GB', '16GB', '32GB']) => {
  return options[Math.floor(Math.random() * options.length)];
};

const getRandomStorage = (options = ['64GB', '128GB', '256GB', '512GB', '1TB', '2TB']) => {
  return options[Math.floor(Math.random() * options.length)];
};

const getRandomDisplay = (options) => {
  return options[Math.floor(Math.random() * options.length)];
};

const getRandomBattery = (options) => {
  return options[Math.floor(Math.random() * options.length)];
};

const getRandomProcessor = (options) => {
  return options[Math.floor(Math.random() * options.length)];
};

const getRandomCamera = (options) => {
  return options[Math.floor(Math.random() * options.length)];
};

const getRandomGPU = () => {
  const gpus = [
    'NVIDIA RTX 4060',
    'NVIDIA RTX 4070',
    'NVIDIA RTX 4080',
    'AMD Radeon RX 7600',
    'AMD Radeon RX 7700',
    'Intel Iris Xe',
    'NVIDIA GTX 1650',
    'Integrated Graphics'
  ];
  return gpus[Math.floor(Math.random() * gpus.length)];
};

// Fetch specific category products
export const fetchProductsByCategory = async (category) => {
  const allProducts = await fetchProductsFromAPI();
  if (category  === 'All') return allProducts;
  return allProducts.filter(p => p.category === category);
};