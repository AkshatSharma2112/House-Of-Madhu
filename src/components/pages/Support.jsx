import React from 'react';
import './Support.css';

const Support = () => {
  return (
    <div className="support-page fade-in">
      <div className="container">
        
        {/* Page Header */}
        <div className="support-header">
          <h1 className="support-title">Support Center</h1>
          <p className="support-subtitle">
            Everything you need to know about shopping with House of Madhu
          </p>
        </div>

        {/* Quick Navigation */}
        <div className="support-nav">
          <a href="#shipping" className="support-nav-link">📦 Shipping Info</a>
          <a href="#returns" className="support-nav-link">🔄 Returns</a>
          <a href="#privacy" className="support-nav-link">🔒 Privacy Policy</a>
        </div>

        {/* ============ SHIPPING INFO ============ */}
        <section id="shipping" className="support-section">
          <div className="support-section-header">
            <span className="support-icon">📦</span>
            <h2>Shipping Information</h2>
          </div>

          <div className="support-content">
            <h3>Processing Time</h3>
            <p>
              All our products are handmade to order. Please allow <strong>3-5 business days</strong> 
              for your order to be crafted with love and care before it ships.
            </p>

            <h3>Shipping Rates & Delivery</h3>
            <table className="support-table">
              <thead>
                <tr>
                  <th>Shipping Type</th>
                  <th>Delivery Time</th>
                  <th>Cost</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Standard (India)</td>
                  <td>5-7 business days</td>
                  <td>₹80</td>
                </tr>
                <tr>
                  <td>Express (India)</td>
                  <td>2-3 business days</td>
                  <td>₹150</td>
                </tr>
                <tr>
                  <td>Free Shipping</td>
                  <td>5-7 business days</td>
                  <td>Free on orders above ₹1500</td>
                </tr>
                <tr>
                  <td>International</td>
                  <td>10-15 business days</td>
                  <td>Calculated at checkout</td>
                </tr>
              </tbody>
            </table>

            <h3>Order Tracking</h3>
            <p>
              Once your order is shipped, you'll receive a tracking number via email. 
              You can use this to track your package on the courier's website.
            </p>

            <h3>Packaging</h3>
            <p>
              Every order is packaged with care using eco-friendly, plastic-free materials. 
              Your crochet piece will arrive beautifully wrapped, ready to gift or treasure.
            </p>
          </div>
        </section>

        {/* ============ RETURNS ============ */}
        <section id="returns" className="support-section">
          <div className="support-section-header">
            <span className="support-icon">🔄</span>
            <h2>Returns & Exchanges</h2>
          </div>

          <div className="support-content">
            <h3>Our Return Policy</h3>
            <p>
              We want you to love your purchase! If you're not completely satisfied, 
              you can return most items within <strong>7 days</strong> of delivery.
            </p>

            <h3>Eligibility for Returns</h3>
            <ul className="support-list">
              <li>✅ Item must be unused and in original condition</li>
              <li>✅ Original packaging must be intact</li>
              <li>✅ Return request must be made within 7 days of delivery</li>
              <li>❌ Custom-made items cannot be returned (unless defective)</li>
              <li>❌ Sale items are final sale</li>
            </ul>

            <h3>How to Return</h3>
            <ol className="support-list numbered">
              <li>Email us at <strong>houseofmadhu04@gmail.com</strong> with your order number</li>
              <li>We'll send you a return authorization and instructions</li>
              <li>Ship the item back in its original packaging</li>
              <li>Once we receive and inspect the item, we'll process your refund</li>
            </ol>

            <h3>Refund Timeline</h3>
            <p>
              Refunds are processed within <strong>5-7 business days</strong> of receiving 
              the returned item. The amount will be credited to your original payment method.
            </p>

            <h3>Damaged or Defective Items</h3>
            <p>
              If your item arrives damaged or defective, please contact us within 
              <strong>48 hours</strong> of delivery with photos. We'll replace it or issue 
              a full refund — your choice.
            </p>

            <h3>Exchanges</h3>
            <p>
              Want a different color or size? We're happy to exchange! Just follow the 
              return process and mention the exchange in your email.
            </p>
          </div>
        </section>

        {/* ============ PRIVACY POLICY ============ */}
        <section id="privacy" className="support-section">
          <div className="support-section-header">
            <span className="support-icon">🔒</span>
            <h2>Privacy Policy</h2>
          </div>

          <div className="support-content">
            <p className="support-updated">
              <em>Last updated: October 2026</em>
            </p>

            <h3>Information We Collect</h3>
            <p>
              When you place an order or contact us, we collect:
            </p>
            <ul className="support-list">
              <li>Your name and email address</li>
              <li>Shipping address and phone number</li>
              <li>Order details and preferences</li>
              <li>Communication history</li>
            </ul>

            <h3>How We Use Your Information</h3>
            <p>We use your information to:</p>
            <ul className="support-list">
              <li>Process and ship your orders</li>
              <li>Send order confirmations and updates</li>
              <li>Respond to your inquiries</li>
              <li>Improve our products and services</li>
            </ul>

            <h3>Information Sharing</h3>
            <p>
              We <strong>never sell or rent</strong> your personal information. We only share 
              data with:
            </p>
            <ul className="support-list">
              <li>Shipping carriers (to deliver your order)</li>
              <li>Payment processors (to complete transactions)</li>
              <li>Email services (to send order updates)</li>
            </ul>

            <h3>Data Security</h3>
            <p>
              We take data security seriously. All payment transactions are encrypted, 
              and we follow industry best practices to protect your information.
            </p>

            <h3>Cookies</h3>
            <p>
              Our website uses minimal cookies to improve your browsing experience. 
              You can disable cookies in your browser settings at any time.
            </p>

            <h3>Your Rights</h3>
            <p>You have the right to:</p>
            <ul className="support-list">
              <li>Access your personal data</li>
              <li>Request correction of inaccurate data</li>
              <li>Request deletion of your data</li>
              <li>Opt out of marketing communications</li>
            </ul>

            <h3>Contact Us</h3>
            <p>
              For any privacy-related questions, email us at{' '}
              <strong>houseofmadhu04@gmail.com</strong>
            </p>
          </div>
        </section>

      </div>
    </div>
  );
};

export default Support;