// src/App.jsx
import React from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Products from "./pages/Products";
import Compare from "./pages/Compare";
import BestPrice from "./pages/BestPrice";
import { CompareProvider } from "./context/CompareContext";
import ProtectedRoute from "./routes/ProtectedRoute"; // ✅ Import
import Wishlist from "./pages/Wishlist";

function App() {
  return (
    <CompareProvider>
      <Navbar />
      <Routes>
        {/* Public Route */}
        <Route path="/" element={<Home />} />

        {/* Protected Routes */}
        <Route
          path="/products"
          element={
            <ProtectedRoute>
              <Products />
            </ProtectedRoute>
          }
        />
  
        <Route
          path="/compare"
          element={
            <ProtectedRoute>
              <Compare />
            </ProtectedRoute>
          }
        />

        <Route
          path="/wishlist"
          element={
            <ProtectedRoute>
              <Wishlist />
            </ProtectedRoute>
          }
        />

        <Route
          path="/best-price/:id"
          element={
            <ProtectedRoute>
              <BestPrice />
            </ProtectedRoute>
          }
        />
      </Routes>
    </CompareProvider>
  );
}

export default App;
