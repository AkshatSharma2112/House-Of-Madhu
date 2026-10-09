import React, { createContext, useState, useContext, useEffect } from 'react';
import {
  getAllProducts,
  addProductToFirestore,
  updateProductInFirestore,
  deleteProductFromFirestore,
} from '../services/productService.js';

const ProductContext = createContext();

export const useProducts = () => {
  const ctx = useContext(ProductContext);
  if (!ctx) throw new Error('useProducts must be used within ProductProvider');
  return ctx;
};

export const ProductProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const load = async () => {
      try {
        setLoading(true);
        const data = await getAllProducts();
        setProducts(data);
        setError(null);
      } catch (err) {
        console.error('Load products failed:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  const addProduct = async (product) => {
    const created = await addProductToFirestore(product);
    setProducts((prev) => [created, ...prev]);
    return created;
  };

  const updateProduct = async (id, data) => {
    await updateProductInFirestore(id, data);
    setProducts((prev) =>
      prev.map((p) => (p.id === id ? { ...p, ...data } : p))
    );
  };

  const deleteProduct = async (id) => {
    await deleteProductFromFirestore(id);
    setProducts((prev) => prev.filter((p) => p.id !== id));
  };

  const getProduct = (id) => products.find((p) => p.id === id);
  const getProductsByCategory = (cat) =>
    cat === 'All' ? products : products.filter((p) => p.category === cat);
  const getFeaturedProducts = () => products.filter((p) => p.featured);
  const getProductCount = () => products.length;

  return (
    <ProductContext.Provider
      value={{
        products,
        loading,
        error,
        addProduct,
        updateProduct,
        deleteProduct,
        getProduct,
        getProductsByCategory,
        getFeaturedProducts,
        getProductCount,
        setProducts,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};