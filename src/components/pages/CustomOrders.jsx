import React, { useState } from 'react';
import './CustomOrders.css';

const CustomOrders = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    productType: '',
    details: '',
    colors: [],
    file: null
  });

  const [selectedColors, setSelectedColors] = useState([]);

  const colors = [
    'white', 'red', 'yellow', 'green', 'blue',
    'purple', 'orange', 'pink', 'brown', 'black', 'gray'
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleColorToggle = (color) => {
    setSelectedColors(prev => 
      prev.includes(color) 
        ? prev.filter(c => c !== color) 
        : [...prev, color]
    );
  };

  const handleFileChange = (e) => {
    setFormData(prev => ({ ...prev, file: e.target.files[0] }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const finalData = {
      ...formData,
      colors: selectedColors
    };
    console.log('Custom Order Submitted:', finalData);
    alert('Thank you! Your custom order request has been submitted. We\'ll get back to you soon!');
    setFormData({ name: '', email: '', productType: '', details: '', colors: [], file: null });
    setSelectedColors([]);
  };

  return (
    <div className="custom-orders fade-in">
      <div className="container">
        <h2 className="section-title">Custom Orders</h2>
        <p className="custom-subtitle">
          Have something special in mind? We'd love to create it for you.
          Fill the form below and let's bring your ideas to life!
        </p>

        <div className="custom-layout">
          <div className="custom-form-wrapper">
            <form className="custom-form" onSubmit={handleSubmit}>
              <div className="form-row">
                <div className="form-group">
                  <label>Your Name *</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Enter your name"
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Email Address *</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Enter your email"
                    required
                  />
                </div>
              </div>

              <div className="form-group">
                <label>Product Type *</label>
                <select
                  name="productType"
                  value={formData.productType}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select a category</option>
                  <option>Bags</option>
                  <option>Home Decor</option>
                  <option>Toys & Dolls</option>
                  <option>Wearables</option>
                  <option>Accessories</option>
                  <option>Gift Sets</option>
                  <option>Other</option>
                </select>
              </div>

              <div className="form-group">
                <label>Customization Details *</label>
                <textarea
                  name="details"
                  value={formData.details}
                  onChange={handleChange}
                  placeholder="Describe your idea, color, size, design, etc."
                  rows="4"
                  required
                />
              </div>

              <div className="form-group">
                <label>Preferred Colors</label>
                <div className="color-picker">
                  {colors.map((color) => (
                    <span
                      key={color}
                      className={`color-swatch ${color} ${selectedColors.includes(color) ? 'selected' : ''}`}
                      title={color}
                      onClick={() => handleColorToggle(color)}
                    ></span>
                  ))}
                </div>
                {selectedColors.length > 0 && (
                  <div className="selected-colors">
                    Selected: {selectedColors.join(', ')}
                  </div>
                )}
              </div>

              <div className="form-group">
                <label>Upload Reference (Optional)</label>
                <div className="file-upload">
                  <input type="file" accept="image/*" id="fileInput" onChange={handleFileChange} />
                  <label htmlFor="fileInput" className="file-label">
                    Choose File
                  </label>
                  <span className="file-name">
                    {formData.file ? formData.file.name : 'No file chosen'}
                  </span>
                </div>
              </div>

              <button type="submit" className="btn-primary submit-btn">
                Submit Request
              </button>
            </form>
          </div>

          <aside className="custom-info">
            <div className="info-card">
              <h3>🧶 How It Works</h3>
              <ol>
                <li>Tell us your idea</li>
                <li>We'll send a quote</li>
                <li>We create your piece</li>
                <li>Shipped with love ❤️</li>
              </ol>
            </div>
            <div className="info-card">
              <h3>✨ What We Offer</h3>
              <ul>
                <li>Fully customizable designs</li>
                <li>Premium quality yarns</li>
                <li>Eco-friendly materials</li>
                <li>Fast & reliable shipping</li>
              </ul>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
};

export default CustomOrders;