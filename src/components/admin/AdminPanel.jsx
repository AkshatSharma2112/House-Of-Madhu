import React, { useState } from 'react';
import { useProducts } from '../../context/ProductContext.jsx';
import { useAuth } from '../../context/AuthContext.jsx';
import AdminLogin from './AdminLogin.jsx';
import ProductForm from './ProductForm.jsx';
import ImageUploader from './ImageUploader.jsx';
import './AdminPanel.css';

const AdminPanel = () => {
  const { products, deleteProduct, getProduct } = useProducts();
  const { isAdmin, adminLogout } = useAuth();
  const [editingProduct, setEditingProduct] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [showImageUploader, setShowImageUploader] = useState(false);
  const [selectedProductId, setSelectedProductId] = useState(null);

  // If not admin, show login
  if (!isAdmin) {
    return <AdminLogin onLogin={() => {}} />;
  }

  const handleEdit = (productId) => {
    const product = getProduct(productId);
    setEditingProduct(product);
    setShowForm(true);
  };

  const handleDelete = (productId) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      deleteProduct(productId);
    }
  };

  const handleAddNew = () => {
    setEditingProduct(null);
    setShowForm(true);
  };

  const handleFormClose = () => {
    setShowForm(false);
    setEditingProduct(null);
  };

  const handleManageImages = (productId) => {
    setSelectedProductId(productId);
    setShowImageUploader(true);
  };

  const handleImageUploaderClose = () => {
    setShowImageUploader(false);
    setSelectedProductId(null);
  };

  return (
    <div className="admin-panel fade-in">
      <div className="container">
        <div className="admin-header">
          <div className="admin-header-left">
            <h2 className="section-title">🛠️ Admin Panel</h2>
            <button className="btn-outline btn-small" onClick={adminLogout}>
              🚪 Logout
            </button>
          </div>
          <button className="btn-primary" onClick={handleAddNew}>
            + Add New Product
          </button>
        </div>

        <div className="admin-product-list">
          <div className="admin-table-header">
            <span>Product</span>
            <span>Category</span>
            <span>Price</span>
            <span>Stock</span>
            <span>Actions</span>
          </div>

          {products.length === 0 ? (
            <div className="admin-empty">
              <p>No products yet. Start by adding your first product!</p>
            </div>
          ) : (
            products.map((product) => (
              <div key={product.id} className="admin-table-row">
                <div className="admin-product-info">
                  <div className="admin-product-image">
                    {product.images && product.images[0] ? (
                      <img src={product.images[0]} alt={product.name} />
                    ) : (
                      <span>📸</span>
                    )}
                  </div>
                  <span className="admin-product-name">{product.name}</span>
                </div>
                <span className="admin-product-category">{product.category}</span>
                <span className="admin-product-price">₹{product.price}</span>
                <span className={`admin-product-stock ${product.inStock ? 'in-stock' : 'out-of-stock'}`}>
                  {product.inStock ? '✅ In Stock' : '❌ Out of Stock'}
                </span>
                <div className="admin-product-actions">
                  <button 
                    className="btn-success btn-small"
                    onClick={() => handleManageImages(product.id)}
                    title="Manage Images"
                  >
                    🖼️ Images
                  </button>
                  <button 
                    className="btn-primary btn-small"
                    onClick={() => handleEdit(product.id)}
                  >
                    ✏️ Edit
                  </button>
                  <button 
                    className="btn-danger btn-small"
                    onClick={() => handleDelete(product.id)}
                  >
                    🗑️ Delete
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        {showForm && (
          <div className="admin-modal-overlay" onClick={handleFormClose}>
            <div className="admin-modal" onClick={(e) => e.stopPropagation()}>
              <button className="modal-close-btn" onClick={handleFormClose}>✕</button>
              <ProductForm 
                product={editingProduct} 
                onClose={handleFormClose} 
              />
            </div>
          </div>
        )}

        {showImageUploader && selectedProductId && (
          <div className="admin-modal-overlay" onClick={handleImageUploaderClose}>
            <div className="admin-modal admin-modal-wide" onClick={(e) => e.stopPropagation()}>
              <button className="modal-close-btn" onClick={handleImageUploaderClose}>✕</button>
              <ImageUploader 
                productId={selectedProductId} 
                onClose={handleImageUploaderClose} 
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminPanel;