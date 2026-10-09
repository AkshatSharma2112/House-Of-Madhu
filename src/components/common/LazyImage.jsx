import React, { useState, useEffect, useRef } from 'react';
import './LazyImage.css';

const LazyImage = ({ 
  src, 
  alt, 
  className = '', 
  placeholder = null,
  fallback = null,
  ...props 
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isInView, setIsInView] = useState(false);
  const [error, setError] = useState(false);
  const imgRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            setIsInView(true);
            observer.unobserve(entry.target);
          }
        });
      },
      { rootMargin: '100px', threshold: 0.1 }
    );

    if (imgRef.current) observer.observe(imgRef.current);

    return () => {
      if (imgRef.current) observer.unobserve(imgRef.current);
    };
  }, []);

  const handleLoad = () => setIsLoaded(true);
  const handleError = () => setError(true);

  const defaultPlaceholder = (
    <div className="lazy-placeholder">
      <div className="lazy-shimmer"></div>
    </div>
  );

  const fallbackContent = fallback || (
    <div className="lazy-fallback">
      <span>🖼️</span>
      <span className="fallback-text">{alt || 'Image not found'}</span>
    </div>
  );

  return (
    <div ref={imgRef} className={`lazy-image-container ${className}`} {...props}>
      {!isLoaded && !error && (placeholder || defaultPlaceholder)}
      
      {isInView && !error && (
        <img
          src={src}
          alt={alt}
          className={`lazy-image ${isLoaded ? 'loaded' : ''}`}
          onLoad={handleLoad}
          onError={handleError}
          style={{
            opacity: isLoaded ? 1 : 0,
            transition: 'opacity 0.4s ease',
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            display: 'block',
          }}
        />
      )}
      
      {error && fallbackContent}
    </div>
  );
};

export default LazyImage;