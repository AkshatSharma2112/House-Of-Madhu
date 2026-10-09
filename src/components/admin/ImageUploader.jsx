import React, { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { useProducts } from '../../context/ProductContext.jsx';
import { uploadProductImage, deleteProductImage } from '../../services/imageService.js';
import LazyImage from '../common/LazyImage.jsx';
import './ImageUploader.css';

const ImageUploader = ({ productId, onClose }) => {
  const { getProduct, updateProduct } = useProducts();
  const product = getProduct(productId);
  const [images, setImages] = useState(product?.images || []);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState(null);

  // ===== Upload images to Cloudinary =====
  const onDrop = useCallback(async (acceptedFiles) => {
    setError(null);
    setUploading(true);

    try {
      const uploadedUrls = [];

      for (const file of acceptedFiles) {
        const url = await uploadProductImage(file);
        uploadedUrls.push(url);
      }

      const updatedImages = [...images, ...uploadedUrls];
      setImages(updatedImages);
      await updateProduct(productId, { images: updatedImages });
    } catch (err) {
      console.error('Upload failed:', err);
      setError('Failed to upload images. Please try again.');
    } finally {
      setUploading(false);
    }
  }, [images, productId, updateProduct]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.jpeg', '.jpg', '.png', '.gif', '.webp']
    },
    maxSize: 5242880,
    multiple: true
  });

  // ===== Remove image =====
  const handleRemoveImage = async (index) => {
    const imageToRemove = images[index];
    const newImages = images.filter((_, i) => i !== index);
    setImages(newImages);
    await deleteProductImage(imageToRemove);
    await updateProduct(productId, { images: newImages });
  };

  // ===== Set main image =====
  const handleSetMainImage = async (index) => {
    const newImages = [images[index], ...images.filter((_, i) => i !== index)];
    setImages(newImages);
    await updateProduct(productId, { images: newImages });
  };

  // ===== Reorder images =====
  const handleReorder = async (fromIndex, toIndex) => {
    const newImages = [...images];
    const [moved] = newImages.splice(fromIndex, 1);
    newImages.splice(toIndex, 0, moved);
    setImages(newImages);
    await updateProduct(productId, { images: newImages });
  };

  return (
    <div className="image-uploader">
      <h3>Manage Images</h3>
      <p className="uploader-subtitle">
        Manage images for: <strong>{product?.name}</strong>
      </p>

      <div
        {...getRootProps()}
        className={`drop-zone ${isDragActive ? 'active' : ''} ${uploading ? 'uploading' : ''}`}
      >
        <input {...getInputProps()} />
        <div className="drop-zone-content">
          <span className="drop-icon">📸</span>
          <h4>{uploading ? 'Uploading...' : 'Drop your images here'}</h4>
          <p>{uploading ? 'Please wait' : 'or click to browse'}</p>
          <span className="drop-hint">(PNG, JPG, WEBP up to 5MB)</span>
        </div>
      </div>

      {error && <div className="upload-error">{error}</div>}

      {images.length > 0 && (
        <div className="image-grid">
          <h4 className="image-grid-title">
            Images ({images.length})
            <span className="image-grid-hint">Click 🏠 to set as main</span>
          </h4>
          <div className="image-grid-container">
            {images.map((image, index) => (
              <div key={index} className="image-item">
                <div className="image-item-wrapper">
                  <LazyImage src={image} alt={`Product image ${index + 1}`} />
                  {index === 0 && (
                    <div className="main-badge">Main</div>
                  )}
                </div>
                <div className="image-item-actions">
                  {index !== 0 && (
                    <button
                      className="action-btn set-main"
                      onClick={() => handleSetMainImage(index)}
                      title="Set as main image"
                    >
                      🏠
                    </button>
                  )}
                  {index > 0 && (
                    <button
                      className="action-btn move-up"
                      onClick={() => handleReorder(index, index - 1)}
                      title="Move up"
                    >
                      ↑
                    </button>
                  )}
                  {index < images.length - 1 && (
                    <button
                      className="action-btn move-down"
                      onClick={() => handleReorder(index, index + 1)}
                      title="Move down"
                    >
                      ↓
                    </button>
                  )}
                  <button
                    className="action-btn delete"
                    onClick={() => handleRemoveImage(index)}
                    title="Delete image"
                  >
                    🗑️
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="uploader-actions">
        <button className="btn-outline" onClick={onClose}>
          Close
        </button>
        <span className="image-count">{images.length} images</span>
      </div>
    </div>
  );
};

export default ImageUploader;