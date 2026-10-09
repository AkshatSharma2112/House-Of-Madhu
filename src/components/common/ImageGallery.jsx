import React, { useState } from 'react';
import LazyImage from './LazyImage.jsx';
import './ImageGallery.css';

const ImageGallery = ({ images, alt = 'Product image', className = '' }) => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);

  if (!images || images.length === 0) {
    return (
      <div className="gallery-empty">
        <span>📸</span>
        <p>No images available</p>
      </div>
    );
  }

  const handleThumbnailClick = (index) => {
    setSelectedIndex(index);
  };

  const handleMainImageClick = () => {
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  const handlePrevImage = (e) => {
    e.stopPropagation();
    setSelectedIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const handleNextImage = (e) => {
    e.stopPropagation();
    setSelectedIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  return (
    <div className={`image-gallery ${className}`}>
      {/* Main Image */}
      <div className="gallery-main" onClick={handleMainImageClick}>
        <LazyImage
          src={images[selectedIndex]}
          alt={`${alt} - ${selectedIndex + 1}`}
          className="gallery-main-image"
        />
        {images.length > 1 && (
          <>
            <button className="gallery-nav prev" onClick={handlePrevImage}>
              ‹
            </button>
            <button className="gallery-nav next" onClick={handleNextImage}>
              ›
            </button>
            <div className="gallery-counter">
              {selectedIndex + 1} / {images.length}
            </div>
          </>
        )}
        <div className="gallery-zoom-hint">Click to zoom</div>
      </div>

      {/* Thumbnails */}
      {images.length > 1 && (
        <div className="gallery-thumbnails">
          {images.map((image, index) => (
            <div
              key={index}
              className={`thumbnail ${selectedIndex === index ? 'active' : ''}`}
              onClick={() => handleThumbnailClick(index)}
            >
              <LazyImage
                src={image}
                alt={`${alt} thumbnail ${index + 1}`}
                className="thumbnail-image"
              />
            </div>
          ))}
        </div>
      )}

      {/* Lightbox Modal */}
      {isModalOpen && (
        <div className="gallery-modal" onClick={handleModalClose}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={handleModalClose}>✕</button>
            <div className="modal-image-container">
              <LazyImage
                src={images[selectedIndex]}
                alt={`${alt} - ${selectedIndex + 1}`}
                className="modal-image"
              />
              {images.length > 1 && (
                <>
                  <button className="modal-nav prev" onClick={handlePrevImage}>
                    ‹
                  </button>
                  <button className="modal-nav next" onClick={handleNextImage}>
                    ›
                  </button>
                </>
              )}
            </div>
            {images.length > 1 && (
              <div className="modal-thumbnails">
                {images.map((image, index) => (
                  <div
                    key={index}
                    className={`modal-thumb ${selectedIndex === index ? 'active' : ''}`}
                    onClick={() => setSelectedIndex(index)}
                  >
                    <LazyImage
                      src={image}
                      alt={`Thumbnail ${index + 1}`}
                      className="modal-thumb-image"
                    />
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default ImageGallery;