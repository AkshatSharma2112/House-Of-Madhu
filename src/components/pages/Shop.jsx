import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useProducts } from '../../context/ProductContext.jsx';
import LazyImage from '../common/LazyImage.jsx';
import './Shop.css';

const Shop = () => {
  const { products, getProductsByCategory } = useProducts();
  const location = useLocation();
  const [activeFilter, setActiveFilter] = useState('All');

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const category = params.get('category');
    if (category) {
      setActiveFilter(category);
    }
  }, [location]);

  const filters = ['All', 'Bags', 'Home Decor', 'Toys', 'Wearables', 'Accessories', 'Gift Sets'];
  const filteredProducts = getProductsByCategory(activeFilter);

  const colors = [
    'white', 'red', 'yellow', 'green', 'blue',
    'purple', 'orange', 'pink', 'brown', 'black', 'gray'
  ];

  const sizes = ['Small', 'Medium', 'Large'];

  return (
    <div className="shop fade-in">
      <div className="container">
        <div className="shop-layout">
          {/* SIDEBAR */}
          <aside className="shop-sidebar">
            <div className="sidebar-section">
              <h3>All Products</h3>
              <ul className="product-list">
                {products.slice(0, 6).map((p) => (
                  <li key={p.id}>
                    <span className="product-thumb">
                      <LazyImage src={p.images?.[0] || '/images/placeholder.jpg'} alt={p.name} />
                    </span>
                    {p.name}
                    <span className="product-price-small">₹{p.price}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="sidebar-section">
              <h3>Price Range</h3>
              <div className="price-range">
                <span>From ₹50</span>
                <input type="range" min="0" max="5000" defaultValue="5000" />
                <span>To ₹5000</span>
              </div>
            </div>

            <div className="sidebar-section">
              <h3>Color Options</h3>
              <div className="color-options">
                {colors.map((color) => (
                  <span
                    key={color}
                    className={`color-swatch ${color}`}
                    title={color}
                  ></span>
                ))}
              </div>
            </div>

            <div className="sidebar-section">
              <h3>Sizes</h3>
              <div className="size-options">
                {sizes.map((size) => (
                  <button key={size} className="size-btn">{size}</button>
                ))}
              </div>
            </div>
          </aside>

          {/* PRODUCT GRID */}
          <div className="shop-main">
            <div className="shop-header">
              <h2>{activeFilter === 'All' ? 'All Products' : activeFilter}</h2>
              <div className="breadcrumb">Home &gt; Shop</div>
            </div>

            <div className="filter-tabs">
              {filters.map((filter) => (
                <button
                  key={filter}
                  className={`filter-tab ${activeFilter === filter ? 'active' : ''}`}
                  onClick={() => setActiveFilter(filter)}
                >
                  {filter}
                </button>
              ))}
            </div>

            {filteredProducts.length === 0 ? (
              <div className="no-products">
                <p>No products found in this category.</p>
              </div>
            ) : (
              <div className="product-grid-shop">
                {filteredProducts.map((product) => (
                  <Link to={`/product/${product.id}`} key={product.id} className="product-card-shop">
                    <div className="product-image-shop">
                      <LazyImage 
                        src={product.images?.[0] || '/images/placeholder.jpg'} 
                        alt={product.name}
                      />
                    </div>
                    <h4>{product.name}</h4>
                    <span className="product-price">₹{product.price}</span>
                    <button className="btn-primary btn-add">View Product</button>
                  </Link>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Shop;