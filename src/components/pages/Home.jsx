import React, { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { useProducts } from '../../context/ProductContext.jsx';
import LazyImage from '../common/LazyImage.jsx';
import './Home.css';

const Home = () => {
  const { getFeaturedProducts } = useProducts();
  const featuredProducts = getFeaturedProducts();
  
  // Video controls
  const videoRef = useRef(null);
  const [isMuted, setIsMuted] = useState(true);

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !videoRef.current.muted;
      setIsMuted(!isMuted);
    }
  };

  const categories = [
    { icon: '👜', name: 'Bags', link: '/shop?category=Bags' },
    { icon: '🏠', name: 'Home Decor', link: '/shop?category=Home Decor' },
    { icon: '🧸', name: 'Toys & Dolls', link: '/shop?category=Toys' },
    { icon: '🧣', name: 'Wearables', link: '/shop?category=Wearables' },
    { icon: '💍', name: 'Accessories', link: '/shop?category=Accessories' },
    { icon: '🎁', name: 'Gift Sets', link: '/shop?category=Gift Sets' },
  ];

  const features = [
    { icon: '🔒', title: 'Secure Payments', desc: '100% secure checkout' },
    { icon: '🌍', title: 'Worldwide Shipping', desc: 'Delivering happiness' },
    { icon: '🔄', title: 'Easy Returns', desc: 'Hassle-free returns' },
    { icon: '💬', title: 'Support', desc: "We're here to help" },
  ];

  return (
    <div className="home fade-in">
      {/* HERO SECTION */}
      <section className="hero">
        <div className="container hero-content">
          <div className="hero-text">
            <span className="hero-badge">✨ Handmade with Love</span>
            <h1>
              <span className="hero-brand">House of Madhu</span>
              <br />
              <span className="hero-sub">Crochet</span>
            </h1>
            <p className="hero-description">
              Beautiful, unique and cozy crochet products crafted just for you.
            </p>
            <div className="hero-buttons">
              <Link to="/shop" className="btn-primary">Shop Now</Link>
              <Link to="/custom-orders" className="btn-outline">Custom Order</Link>
            </div>
            <div className="hero-stats">
              <span>🧵 Handmade with care</span>
              <span>✨ Premium Quality Yarns</span>
              <span>🎨 Customizable Just for you</span>
            </div>
          </div>

          {/* ✅ VIDEO HERO with mute toggle */}
          <div className="hero-image">
            <video 
              ref={videoRef}
              className="hero-video"
              autoPlay 
              muted={isMuted}
              loop 
              playsInline
              poster="/images/hero-crochet.jpeg"
            >
              <source src="/videos/hero-crochet.mp4" type="video/mp4" />
              {/* Fallback for browsers that don't support video */}
              <img 
                src="/images/hero-crochet.jpeg" 
                alt="Handmade Crochet" 
                className="hero-img"
              />
            </video>
            
            {/* Mute toggle button */}
            <button 
              className="mute-toggle"
              onClick={toggleMute}
              aria-label={isMuted ? 'Unmute' : 'Mute'}
              title={isMuted ? 'Unmute' : 'Mute'}
            >
              {isMuted ? '🔇' : '🔊'}
            </button>
          </div>
        </div>
      </section>

      {/* FEATURED PRODUCTS */}
      <section className="container">
        <h2 className="section-title">Featured Treasures</h2>
        {featuredProducts.length === 0 ? (
          <div className="no-products">
            <p>No featured products yet. Add some in the admin panel!</p>
          </div>
        ) : (
          <div className="product-grid-home">
            {featuredProducts.map((product) => (
              <Link to={`/product/${product.id}`} key={product.id} className="product-card-home">
                <div className="product-image-home">
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
      </section>

      {/* CATEGORIES */}
      <section className="container">
        <h2 className="section-title">Shop by Category 🏠</h2>
        <div className="category-grid">
          {categories.map((cat, index) => (
            <Link to={cat.link} key={index} className="category-card">
              <span className="category-icon">{cat.icon}</span>
              <h4>{cat.name}</h4>
            </Link>
          ))}
        </div>
      </section>

      {/* FEATURES */}
      <section className="container">
        <div className="features-grid">
          {features.map((feature, index) => (
            <div key={index} className="feature-card">
              <span className="feature-icon">{feature.icon}</span>
              <h4>{feature.title}</h4>
              <p>{feature.desc}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Home;