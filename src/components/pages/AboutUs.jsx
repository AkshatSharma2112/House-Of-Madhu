import React from 'react';
import './AboutUs.css';
import WorkshopImage from '../../assets/house-of-madhu-crochet-workshop.png';

const AboutUs = () => {
  const values = [
    { icon: '❤️', title: 'Handmade with Love', desc: 'Every piece is crafted with patience and care' },
    { icon: '🌿', title: 'Sustainable & Ethical', desc: 'Eco-friendly materials and practices' },
    { icon: '🎨', title: 'Made to Order', desc: 'Custom creations just for you' },
  ];

  return (
    <div className="about-us fade-in">
      <div className="container">
        <h2 className="section-title">About Us</h2>

        <div className="about-layout">
          <div className="about-image">
            {/* ✅ Testing with simple img tag */}
            <img 
              src={WorkshopImage}
              alt="Our Studio" 
              className="about-img"
              onError={(e) => console.error('Image failed to load:', e.target.src)}
              onLoad={() => console.log('Image loaded successfully:', WorkshopImage)}
            />
          </div>
          <div className="about-content">
            <h3>About House of Madhu</h3>
            <p>
              At House of Madhu, every piece is handcrafted with love, patience and attention to detail.
              What started as a passion for crochet has now become a little brand that brings warmth,
              beauty and joy to your everyday life.
            </p>
            <p>
              We believe in slow fashion — creating pieces that are made to last, to be treasured,
              and to tell a story. Each stitch is a labor of love, and every item carries a piece
              of our heart.
            </p>
            <div className="about-values">
              {values.map((value, index) => (
                <div key={index} className="about-value">
                  <span className="value-icon">{value.icon}</span>
                  <div>
                    <h4>{value.title}</h4>
                    <p>{value.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;