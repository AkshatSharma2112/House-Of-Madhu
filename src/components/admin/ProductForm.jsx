import React, { useState, useEffect } from 'react';
import { useProducts } from '../../context/ProductContext.jsx';
import './ProductForm.css';

const ProductForm = ({ product, onClose }) => {
  const { addProduct, updateProduct } = useProducts();
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    category: 'Bags',
    description: '',
    colors: [],
    sizes: [],
    inStock: true,
    featured: false,
    images: []
  });

  const [newColor, setNewColor] = useState('');
  const [newSize, setNewSize] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const categories = ['Bags', 'Home Decor', 'Toys', 'Wearables', 'Accessories', 'Gift Sets'];
  const availableColors = [
  'Beige', 'Cream', 'Taupe', 'White', 'Black', 'Gray',
  'Navy', 'Burgundy', 'Pink', 'Yellow', 'Green', 'Brown',
  'Peach', 'Lavender', 'Olive', 'Terracotta', 'Maroon', 'Teal', 'Mustard', 'Red'
];
  const availableSizes = ['Small', 'Medium', 'Large', 'One Size', 'Extra Large'];

  useEffect(() => {
    if (product) {
      setFormData({
        name: product.name || '',
        price: product.price || '',
        category: product.category || 'Bags',
        description: product.description || '',
        colors: product.colors || [],
        sizes: product.sizes || [],
        inStock: product.inStock !== undefined ? product.inStock : true,
        featured: product.featured || false,
        images: product.images || []
      });
    }
  }, [product]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleAddColor = () => {
    if (newColor && !formData.colors.includes(newColor)) {
      setFormData(prev => ({
        ...prev,
        colors: [...prev.colors, newColor]
      }));
      setNewColor('');
    }
  };

  const handleRemoveColor = (color) => {
    setFormData(prev => ({
      ...prev,
      colors: prev.colors.filter(c => c !== color)
    }));
  };

  const handleAddSize = () => {
    if (newSize && !formData.sizes.includes(newSize)) {
      setFormData(prev => ({
        ...prev,
        sizes: [...prev.sizes, newSize]
      }));
      setNewSize('');
    }
  };

  const handleRemoveSize = (size) => {
    setFormData(prev => ({
      ...prev,
      sizes: prev.sizes.filter(s => s !== size)
    }));
  };

  // ===== Updated: async handleSubmit with await =====
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const productData = {
        ...formData,
        price: parseFloat(formData.price),
      };

      if (product) {
        await updateProduct(product.id, productData);
      } else {
        await addProduct(productData);
      }

      onClose();
    } catch (err) {
      console.error('Save failed:', err);
      alert('Failed to save product. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="product-form">
      <h3>{product ? 'Edit Product' : 'Add New Product'}</h3>

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Product Name *</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            placeholder="Enter product name"
          />
        </div>

        <div className="form-row">
          <div className="form-group">
            <label>Price (₹) *</label>
            <input
              type="number"
              name="price"
              value={formData.price}
              onChange={handleChange}
              required
              min="0"
              step="0.01"
              placeholder="0.00"
            />
          </div>

          <div className="form-group">
            <label>Category *</label>
            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              required
            >
              {categories.map(cat => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>
        </div>

        <div className="form-group">
          <label>Description *</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
            rows="4"
            placeholder="Describe your product..."
          />
        </div>

        <div className="form-group">
  <label>Colors</label>
  <div className="tag-input">
    <select
      value={newColor}
      onChange={(e) => setNewColor(e.target.value)}
    >
      <option value="">Select a color</option>
      {availableColors.filter(c => !formData.colors.includes(c)).map(color => (
        <option key={color} value={color}>{color}</option>
      ))}
    </select>
    <button type="button" className="btn-add-tag" onClick={handleAddColor}>
      Add
    </button>
  </div>

  {/* ✅ NEW: Custom color input */}
  <div className="custom-color-input">
    <input
      type="text"
      placeholder="Or type a custom color (e.g., Peach, Olive...)"
      value={newColor}
      onChange={(e) => setNewColor(e.target.value)}
      onKeyDown={(e) => {
        if (e.key === 'Enter') {
          e.preventDefault();
          handleAddColor();
        }
      }}
    />
    <button type="button" className="btn-add-tag" onClick={handleAddColor}>
      Add Custom
    </button>
  </div>

  <div className="tag-list">
    {formData.colors.map(color => (
      <span key={color} className="tag">
        <span className="color-dot" style={{ background: color.toLowerCase() }}></span>
        {color}
        <button type="button" className="tag-remove" onClick={() => handleRemoveColor(color)}>
          ✕
        </button>
      </span>
    ))}
  </div>
</div>

        <div className="form-group">
          <label>Sizes</label>
          <div className="tag-input">
            <select
              value={newSize}
              onChange={(e) => setNewSize(e.target.value)}
            >
              <option value="">Select a size</option>
              {availableSizes.filter(s => !formData.sizes.includes(s)).map(size => (
                <option key={size} value={size}>{size}</option>
              ))}
            </select>
            <button type="button" className="btn-add-tag" onClick={handleAddSize}>
              Add
            </button>
          </div>
          <div className="tag-list">
            {formData.sizes.map(size => (
              <span key={size} className="tag">
                {size}
                <button type="button" className="tag-remove" onClick={() => handleRemoveSize(size)}>
                  ✕
                </button>
              </span>
            ))}
          </div>
        </div>

        <div className="form-checkboxes">
          <label className="checkbox-label">
            <input
              type="checkbox"
              name="inStock"
              checked={formData.inStock}
              onChange={handleChange}
            />
            In Stock
          </label>
          <label className="checkbox-label">
            <input
              type="checkbox"
              name="featured"
              checked={formData.featured}
              onChange={handleChange}
            />
            Featured Product
          </label>
        </div>

        <div className="form-actions">
          <button type="button" className="btn-outline" onClick={onClose}>
            Cancel
          </button>
          <button type="submit" className="btn-primary" disabled={isSubmitting}>
            {isSubmitting ? 'Saving...' : product ? 'Update Product' : 'Add Product'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default ProductForm;