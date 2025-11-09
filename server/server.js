
import pool from './db/db.js';
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// ==================== PRODUCT ROUTES ====================

// Get all products with optional filters
app.get('/api/products', async (req, res) => {
  try {
    const { category, search, minPrice, maxPrice, sort } = req.query;
    
    let query = 'SELECT * FROM products WHERE 1=1';
    const params = [];
    let paramCount = 1;

    // Filter by category
    if (category && category !== 'All') {
      query += ` AND category = $${paramCount}`;
      params.push(category);
      paramCount++;
    }

    // Search by name or brand
    if (search) {
      query += ` AND (name ILIKE $${paramCount} OR brand ILIKE $${paramCount})`;
      params.push(`%${search}%`);
      paramCount++;
    }

    // Filter by price range
    if (minPrice) {
      query += ` AND price >= $${paramCount}`;
      params.push(minPrice);
      paramCount++;
    }
    if (maxPrice) {
      query += ` AND price <= $${paramCount}`;
      params.push(maxPrice);
      paramCount++;
    }

    // Sorting
    if (sort === 'price-low') {
      query += ' ORDER BY price ASC';
    } else if (sort === 'price-high') {
      query += ' ORDER BY price DESC';
    } else if (sort === 'rating') {
      query += ' ORDER BY rating DESC';
    } else if (sort === 'name') {
      query += ' ORDER BY name ASC';
    } else {
      query += ' ORDER BY id ASC';
    }

    const result = await pool.query(query, params);
    res.json(result.rows);
  } catch (err) {
    console.error('Error fetching products:', err.message);
    res.status(500).json({ error: 'Database error', details: err.message });
  }
});

// Get product by ID
app.get('/api/products/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query('SELECT * FROM products WHERE id = $1', [id]);
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Product not found' });
    }
    res.json(result.rows[0]);
  } catch (err) {
    console.error('Error fetching product:', err.message);
    res.status(500).json({ error: 'Database error', details: err.message });
  }
});

// Create new product
app.post('/api/products', async (req, res) => {
  try {
    const {
      name, brand, price, originalPrice, category, image_url,
      rating, ram, storage, display, battery, processor,
      camera, gpu, trending, description, stock, discount
    } = req.body;

    const result = await pool.query(
      `INSERT INTO products (
        name, brand, price, original_price, category, image_url,
        rating, ram, storage, display, battery, processor,
        camera, gpu, trending, description, stock, discount
      ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18)
      RETURNING *`,
      [
        name, brand, price, originalPrice || price, category, image_url,
        rating || 4.0, ram, storage, display, battery, processor,
        camera, gpu, trending || false, description, stock || 50, discount || 0
      ]
    );

    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error('Error creating product:', err.message);
    res.status(500).json({ error: 'Failed to create product', details: err.message });
  }
});

// Update product
app.put('/api/products/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const {
      name, brand, price, originalPrice, category, image_url,
      rating, ram, storage, display, battery, processor,
      camera, gpu, trending, description, stock, discount
    } = req.body;

    const result = await pool.query(
      `UPDATE products SET
        name = $1, brand = $2, price = $3, original_price = $4,
        category = $5, image_url = $6, rating = $7, ram = $8,
        storage = $9, display = $10, battery = $11, processor = $12,
        camera = $13, gpu = $14, trending = $15, description = $16,
        stock = $17, discount = $18
      WHERE id = $19
      RETURNING *`,
      [
        name, brand, price, originalPrice, category, image_url,
        rating, ram, storage, display, battery, processor,
        camera, gpu, trending, description, stock, discount, id
      ]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Product not found' });
    }

    res.json(result.rows[0]);
  } catch (err) {
    console.error('Error updating product:', err.message);
    res.status(500).json({ error: 'Failed to update product', details: err.message });
  }
});

// Delete product
app.delete('/api/products/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query('DELETE FROM products WHERE id = $1 RETURNING *', [id]);
    
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Product not found' });
    }

    res.json({ message: 'Product deleted successfully', product: result.rows[0] });
  } catch (err) {
    console.error('Error deleting product:', err.message);
    res.status(500).json({ error: 'Failed to delete product', details: err.message });
  }
});

// Get products for comparison
app.get('/api/compare', async (req, res) => {
  const ids = req.query.ids;
  if (!ids) {
    return res.status(400).json({ error: 'No product IDs provided' });
  }

  const idArray = ids.split(',').map(id => Number(id));

  try {
    const result = await pool.query(
      'SELECT * FROM products WHERE id = ANY($1::int[])',
      [idArray]
    );
    res.json(result.rows);
  } catch (err) {
    console.error('Error fetching comparison products:', err.message);
    res.status(500).json({ error: 'Database error', details: err.message });
  }
});

// Get all categories
app.get('/api/categories', async (req, res) => {
  try {
    const result = await pool.query(
      'SELECT DISTINCT category FROM products ORDER BY category'
    );
    res.json(result.rows.map(row => row.category));
  } catch (err) {
    console.error('Error fetching categories:', err.message);
    res.status(500).json({ error: 'Database error', details: err.message });
  }
});

// Get trending products
app.get('/api/products/trending', async (req, res) => {
  try {
    const result = await pool.query(
      'SELECT * FROM products WHERE trending = true ORDER BY rating DESC LIMIT 10'
    );
    res.json(result.rows);
  } catch (err) {
    console.error('Error fetching trending products:', err.message);
    res.status(500).json({ error: 'Database error', details: err.message });
  }
});

// ==================== PRICE COMPARISON ENDPOINT ====================
// Get price comparison for a product across multiple e-commerce platforms
app.get('/api/products/:id/price-comparison', async (req, res) => {
  const { id } = req.params;
  
  console.log(`\n🔍 [PRICE COMPARISON] Request for product ID: ${id}`);
  
  try {
    // Fetch product from database
    const productResult = await pool.query(
      'SELECT * FROM products WHERE id = $1',
      [id]
    );
    
    if (productResult.rows.length === 0) {
      console.error(`❌ Product ${id} not found`);
      return res.status(404).json({ 
        error: 'Product not found',
        message: `No product with ID: ${id}`
      });
    }
    
    const product = productResult.rows[0];
    const basePrice = parseFloat(product.price);
    
    console.log(`✅ Product: ${product.name} (${product.brand})`);
    console.log(`💰 Base Price: ₹${basePrice}`);
    
    // Check for cached prices in database
    const cachedResult = await pool.query(
      'SELECT * FROM product_prices WHERE product_id = $1 ORDER BY price ASC',
      [id]
    );
    
    if (cachedResult.rows.length > 0) {
      console.log(`✅ Using ${cachedResult.rows.length} cached prices`);
      const prices = cachedResult.rows;
      return res.json({
        success: true,
        product_id: parseInt(id),
        product_name: product.name,
        product_brand: product.brand,
        product_image: product.image_url,
        base_price: basePrice,
        prices: prices,
        best_price: prices[0],
        savings: prices[prices.length - 1].price - prices[0].price,
        timestamp: new Date().toISOString()
      });
    }
    
    // Generate realistic price variations
    console.log(`📊 Generating price comparison...`);
    
    /**
     * Helper function to generate realistic prices
     * Adds random variation and makes prices look natural (ending in 99, 90, 00, etc.)
     */
    const generatePrice = (base, minPercent, maxPercent) => {
      // Random variation between min and max
      const variation = minPercent + Math.random() * (maxPercent - minPercent);
      let price = Math.round(base * (1 + variation / 100));
      
      // Make price look realistic
      const lastTwo = price % 100;
      if (lastTwo >= 1 && lastTwo <= 10) {
        price = price - lastTwo; // Round to X00
      } else if (lastTwo >= 91 && lastTwo <= 98) {
        price = price + (100 - lastTwo) - 1; // Round to X99
      } else if (lastTwo >= 85 && lastTwo <= 90) {
        price = price + (90 - lastTwo); // Round to X90
      }
      return price;
    };
    
    // Platform configurations with REALISTIC price ranges
    const platforms = [
      {
        name: 'Amazon India',
        // Amazon: Usually 3-7% cheaper (good deals)
        priceMin: -7,
        priceMax: -3,
        delivery: 'Free Delivery',
        rating: 4.5,
        stockChance: 0.95,
        url: `https://www.amazon.in/s?k=${encodeURIComponent(product.name)}`
      },
      {
        name: 'Flipkart',
        // Flipkart: Often BEST deals, 5-12% cheaper
        priceMin: -12,
        priceMax: -5,
        delivery: 'Free Delivery',
        rating: 4.4,
        stockChance: 0.92,
        url: `https://www.flipkart.com/search?q=${encodeURIComponent(product.name)}`
      },
      {
        name: 'Croma',
        // Croma: Retail markup, 2-8% MORE expensive
        priceMin: 2,
        priceMax: 8,
        delivery: '₹50 Delivery',
        rating: 4.2,
        stockChance: 0.85,
        url: `https://www.croma.com/search?q=${encodeURIComponent(product.name)}`
      },
      {
        name: 'Reliance Digital',
        // Reliance: Competitive, 2% cheaper to 3% more
        priceMin: -2,
        priceMax: 3,
        delivery: 'Free Delivery',
        rating: 4.3,
        stockChance: 0.88,
        url: `https://www.reliancedigital.in/search?q=${encodeURIComponent(product.name)}`
      },
      {
        name: 'Vijay Sales',
        // Vijay Sales: Good deals, 4-8% cheaper
        priceMin: -8,
        priceMax: -4,
        delivery: '₹40 Delivery',
        rating: 4.1,
        stockChance: 0.80,
        url: `https://www.vijaysales.com/search/${encodeURIComponent(product.name)}`
      },
      {
        name: 'Tata CLiQ',
        // Tata CLiQ: Competitive, 3-6% cheaper
        priceMin: -6,
        priceMax: -3,
        delivery: 'Free Delivery',
        rating: 4.3,
        stockChance: 0.87,
        url: `https://www.tatacliq.com/search/?searchText=${encodeURIComponent(product.name)}`
      }
    ];
    
    // Generate prices for each platform
    const priceComparisons = platforms.map(platform => {
      const price = generatePrice(basePrice, platform.priceMin, platform.priceMax);
      const inStock = Math.random() < platform.stockChance;
      
      return {
        platform: platform.name,
        price: price,
        url: platform.url,
        in_stock: inStock,
        delivery: platform.delivery,
        rating: platform.rating
      };
    });
    
    // Sort by price (lowest first)
    priceComparisons.sort((a, b) => a.price - b.price);
    
    const bestPrice = priceComparisons[0];
    const highestPrice = priceComparisons[priceComparisons.length - 1];
    const savings = highestPrice.price - bestPrice.price;
    
    // Log results
    console.log(`\n📊 Price Comparison Results:`);
    priceComparisons.forEach((p, i) => {
      const badge = i === 0 ? '🏆' : '  ';
      const diff = p.price - basePrice;
      const diffStr = diff > 0 ? `+₹${diff}` : `₹${diff}`;
      console.log(`${badge} ${p.platform}: ₹${p.price} (${diffStr}) ${p.in_stock ? '✅' : '❌'}`);
    });
    console.log(`\n🏆 BEST: ${bestPrice.platform} at ₹${bestPrice.price}`);
    console.log(`💵 SAVE: ₹${savings} vs highest\n`);
    
    return res.status(200).json({
      success: true,
      product_id: parseInt(id),
      product_name: product.name,
      product_brand: product.brand,
      product_image: product.image_url,
      base_price: basePrice,
      prices: priceComparisons,
      best_price: bestPrice,
      savings: savings,
      timestamp: new Date().toISOString()
    });
    
  } catch (err) {
    console.error('\n❌ [ERROR]:', err.message);
    return res.status(500).json({ 
      success: false,
      error: 'Failed to fetch price comparison',
      message: err.message
    });
  }
});

// Health check endpoint
app.get('/api/health', async (req, res) => {
  try {
    await pool.query('SELECT 1');
    res.json({ status: 'ok', message: 'Server and database are running' });
  } catch (err) {
    res.status(500).json({ status: 'error', message: 'Database connection failed' });
  }
});

// Root endpoint
app.get('/', (req, res) => {
  res.json({
    message: 'CompareX API Server',
    version: '1.0.0',
    endpoints: {
      products: '/api/products',
      categories: '/api/categories',
      compare: '/api/compare',
      health: '/api/health'
    }
  });
});

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`📊 API available at http://localhost:${PORT}/api`);
});
