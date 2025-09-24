import React, { createContext, useContext, useState, useEffect } from "react";

export const CompareContext = createContext();

export const CompareProvider = ({ children }) => {
  const [compareList, setCompareList] = useState(() => {
    // Load from localStorage initially
    const saved = localStorage.getItem("compareList");
    return saved ? JSON.parse(saved) : [];
  });

  // Save to localStorage whenever compareList changes
  useEffect(() => {
    localStorage.setItem("compareList", JSON.stringify(compareList));
  }, [compareList]);

  const addToCompare = (product) => {
    setCompareList((prev) => {
      // Already exists → ignore
      if (prev.find((p) => p.id === product.id)) return prev;

      // If there are items already, enforce same category
      if (prev.length > 0 && prev[0].category !== product.category) {
        alert(
          `You can only compare products in the "${prev[0].category}" category.`
        );
        return prev;
      }

      return [...prev, product];
    });
  };

  const removeFromCompare = (id) =>
    setCompareList((prev) => prev.filter((p) => p.id !== id));

  const clearCompare = () => setCompareList([]);

  return (
    <CompareContext.Provider
      value={{ compareList, addToCompare, removeFromCompare, clearCompare }}
    >
      {children}
    </CompareContext.Provider>
  );
};

export const useCompare = () => useContext(CompareContext);
