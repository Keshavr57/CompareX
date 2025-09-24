// App.jsx
import React from "react";
import { Routes, Route } from "react-router-dom"; // just Routes & Route
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Products from "./pages/Products";
import { CompareProvider } from "./context/CompareContext";
import Compare from "./pages/Compare";

function App() {
  return (
    <CompareProvider>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<Products />} />
        <Route path="/compare" element={<Compare />} />
      </Routes>
    </CompareProvider>
  );
}

export default App;
