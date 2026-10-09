import React, { useState, useRef } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useProducts } from '../../context/ProductContext.jsx';
import emailjs from '@emailjs/browser';
import ImageGallery from '../common/ImageGallery.jsx';
import './ProductDetail.css';

// Helper: Determine if a color is light (so we can use dark text)
const isLightColor = (colorName) => {
  const lightColors = ['white', 'cream', 'beige', 'taupe', 'yellow', 'lightblue', 'lightgray', 'ivory', 'sand'];
  return lightColors.includes(colorName.toLowerCase());
};

const ProductDetail = () => {
  const { id } = useParams();
  const { getProduct } = useProducts();
  const product = getProduct(id);

  const form = useRef();
  const [showOrderForm, setShowOrderForm] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null); // 'success' | 'error' | null

  // ===== EmailJS Credentials =====
  // ⚠️ Replace these with your actual EmailJS credentials
  const SERVICE_ID = 'service_88bwav2';        // ← Your EmailJS Service ID
  const TEMPLATE_ID = 'template_6klq8qd'; // ← Your EmailJS Template ID for orders
  const PUBLIC_KEY = 'gudsTjFzKS_uQQGPp';         // ← Your EmailJS Public Key

  // ===== Open order form =====
  const handlePlaceOrder = () => {
    setShowOrderForm(true);
    setSubmitStatus(null);
  };

  // ===== Submit order via EmailJS =====
  const handleSubmitOrder = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);

    // Add product info to form data
    const formData = new FormData(form.current);
    formData.append('product_name', product.name);
    formData.append('product_price', `₹${product.price}`);
    formData.append('product_category', product.category);

    emailjs.sendForm(SERVICE_ID, TEMPLATE_ID, form.current, PUBLIC_KEY)
      .then((result) => {
        console.log('Order sent:', result.text);
        setSubmitStatus('success');
        form.current.reset();
        setTimeout(() => {
          setShowOrderForm(false);
          setSubmitStatus(null);
        }, 5000);
      })
      .catch((error) => {
        console.error('Order error:', error);
        setSubmitStatus('error');
      })
      .finally(() => {
        setIsSubmitting(false);
      });
  };

  // ===== Close order form =====
  const handleCloseForm = () => {
    setShowOrderForm(false);
    setSubmitStatus(null);
  };

  if (!product) {
    return (
      <div className="container">
        <div className="product-not-found">
          <h2>Product Not Found</h2>
          <p>Sorry, the product you're looking for doesn't exist.</p>
          <Link to="/shop" className="btn-primary">Back to Shop</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="product-detail fade-in">
      <div className="container">
        <div className="product-detail-layout">
          {/* Image Gallery */}
          <div className="product-detail-images">
            <ImageGallery 
              images={product.images || ['/images/placeholder.jpg']} 
              alt={product.name}
            />
          </div>

          {/* Product Info */}
          <div className="product-detail-info">
            <div className="product-breadcrumb">
              <Link to="/shop">Shop</Link> / {product.category} / {product.name}
            </div>

            <h1 className="product-detail-name">{product.name}</h1>

            <div className="product-detail-rating">
              <span className="stars">⭐ {product.rating || 0}</span>
              <span className="reviews">({product.reviews || 0} reviews)</span>
            </div>

            <div className="product-detail-price">₹{product.price}</div>

            <div className="product-detail-description">
              <h3>Description</h3>
              <p>{product.description}</p>
            </div>

            <div className="product-detail-meta">
              {product.colors && product.colors.length > 0 && (
                <div className="meta-item">
                  <h4>Colors</h4>
                  <div className="color-swatches-detail">
                    {product.colors.map((color, index) => (
                      <span 
                      key={index} 
                      className={`color-swatch-detail ${isLightColor(color) ? 'light-bg' : 'dark-bg'}`}
                      style={{ background: color.toLowerCase() }}
                      title={color}
                    >
                      {color}
                    </span>
                  ))}
                </div>
                </div>
              )}

              {product.sizes && product.sizes.length > 0 && (
                <div className="meta-item">
                  <h4>Sizes</h4>
                  <div className="size-options-detail">
                    {product.sizes.map((size, index) => (
                      <span key={index} className="size-option">{size}</span>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <div className="product-detail-stock">
              <span className={`stock-status ${product.inStock ? 'in-stock' : 'out-of-stock'}`}>
                {product.inStock ? '✅ In Stock' : '❌ Out of Stock'}
              </span>
            </div>

            {/* ===== ACTION BUTTONS ===== */}
            <div className="product-detail-actions">
              <button 
                className="btn-primary btn-large"
                onClick={handlePlaceOrder}
                disabled={!product.inStock}
              >
                📧 Place Order
              </button>

              <Link to="/custom-orders" className="btn-outline btn-large">
                ✏️ Custom Order
              </Link>
            </div>

            <div className="product-detail-features">
              <div className="feature-item">
                <span>🧵</span>
                <span>Handmade with love</span>
              </div>
              <div className="feature-item">
                <span>🌿</span>
                <span>Sustainable & Ethical</span>
              </div>
              <div className="feature-item">
                <span>🎨</span>
                <span>Made to Order</span>
              </div>
            </div>
          </div>
        </div>

        {/* ===== ORDER FORM MODAL ===== */}
        {showOrderForm && (
          <div className="order-modal-overlay" onClick={handleCloseForm}>
            <div className="order-modal" onClick={(e) => e.stopPropagation()}>
              <button className="order-modal-close" onClick={handleCloseForm}>
                ✕
              </button>

              <h2 className="order-modal-title">📦 Place Your Order</h2>
              <p className="order-modal-subtitle">
                Fill in your details and we'll contact you shortly.
              </p>

              {/* Product Summary */}
              <div className="order-product-summary">
                <img 
                  src={product.images?.[0] || '/images/placeholder.jpg'} 
                  alt={product.name}
                  className="order-product-img"
                />
                <div>
                  <h4>{product.name}</h4>
                  <p className="order-product-price">₹{product.price}</p>
                </div>
              </div>

              <form ref={form} onSubmit={handleSubmitOrder} className="order-form">
                {/* Hidden fields for product info */}
                <input type="hidden" name="product_name" value={product.name} />
                <input type="hidden" name="product_price" value={`₹${product.price}`} />
                <input type="hidden" name="product_category" value={product.category} />

                <div className="form-group">
                  <label>Your Name *</label>
                  <input
                    type="text"
                    name="name"
                    placeholder="Enter your full name"
                    required
                  />
                </div>

                <div className="form-group">
                  <label>Email *</label>
                  <input
                    type="email"
                    name="email"
                    placeholder="your@email.com"
                    required
                  />
                </div>

                <div className="form-group">
                  <label>Phone Number *</label>
                  <input
                    type="tel"
                    name="phone"
                    placeholder="+91 98765 43210"
                    required
                  />
                </div>

                <div className="form-group">
                  <label>Quantity *</label>
                  <input
                    type="number"
                    name="quantity"
                    min="1"
                    defaultValue="1"
                    required
                  />
                </div>

                <div className="form-group">
                  <label>Preferred Color (Optional)</label>
                  <select name="color">
                    <option value="">Select a color</option>
                    {product.colors?.map((color) => (
                      <option key={color} value={color}>{color}</option>
                    ))}
                  </select>
                </div>

                <div className="form-group">
                  <label>Preferred Size (Optional)</label>
                  <select name="size">
                    <option value="">Select a size</option>
                    {product.sizes?.map((size) => (
                      <option key={size} value={size}>{size}</option>
                    ))}
                  </select>
                </div>

                <div className="form-group">
                  <label>Shipping Address *</label>
                  <textarea
                    name="address"
                    placeholder="Enter your full address with pincode"
                    rows="3"
                    required
                  />
                </div>

                <div className="form-group">
                  <label>Special Instructions (Optional)</label>
                  <textarea
                    name="notes"
                    placeholder="Any special requests?"
                    rows="2"
                  />
                </div>

                {/* Status messages */}
                {submitStatus === 'success' && (
                  <div className="order-success">
                    ✅ Order placed! We'll contact you within 24 hours.
                  </div>
                )}
                {submitStatus === 'error' && (
                  <div className="order-error">
                    ❌ Something went wrong. Please try again.
                  </div>
                )}

                <button 
                  type="submit" 
                  className="btn-primary submit-order-btn"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? 'Sending Order...' : '📧 Submit Order'}
                </button>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductDetail;