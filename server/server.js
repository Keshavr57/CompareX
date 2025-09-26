
import pool from './db/db.js';
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();
const app = express();

app.use(cors());

app.use(express.json());

// Get all products
app.get('/products', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM products');
    res.json(result.rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: 'Database error' });
  }
});

// Get product by id
app.get('/products/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query('SELECT * FROM products WHERE id=$1', [id]);
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Product not found' });
    }
    res.json(result.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: 'Database error' });
  }
});

app.get('/compare', async (req, res) => {
    const ids = req.query.ids; // ids as comma-separated string
    if (!ids) return res.status(400).json({ error: 'No product IDs provided' });
  
    const idArray = ids.split(',').map(id => Number(id));
  
    try {
      const result = await pool.query(
        `SELECT * FROM products WHERE id = ANY($1::int[])`,
        [idArray]
      );
      res.json(result.rows);
    } catch (err) {
      console.error(err.message);
      res.status(500).json({ error: 'Database error' });
    }
  });

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
