import React, { useState, useRef } from 'react';
import emailjs from '@emailjs/browser';
import './Contact.css';

const Contact = () => {
  const form = useRef();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);

    const serviceId = 'service_88bwav2';
    const templateId = 'template_q41weoc';
    const publicKey = 'gudsTjFzKS_uQQGPp';

    
    emailjs.sendForm(serviceId, templateId, form.current, publicKey)
      .then((result) => {
        console.log('Email sent:', result.text);
        setSubmitStatus('success');
        form.current.reset();
        setTimeout(() => setSubmitStatus(null), 5000);
      })
      .catch((error) => {
        console.error('Email error:', error);
        setSubmitStatus('error');
        setTimeout(() => setSubmitStatus(null), 5000);
      })
      .finally(() => {
        setIsSubmitting(false);
      });
  };

  return (
    <div className="contact fade-in">
      <div className="container">
        <h2 className="section-title">Contact Us</h2>

        <div className="contact-layout">
          <div className="contact-form-wrapper">
            <form className="contact-form" ref={form} onSubmit={handleSubmit}>
              <div className="form-group">
                <label>Your Name *</label>
                <input
                  type="text"
                  name="name"              
                  placeholder="Enter your name"
                  required
                />
              </div>
              <div className="form-group">
                <label>Email Address *</label>
                <input
                  type="email"
                  name="email"             
                  placeholder="Enter your email"
                  required
                />
              </div>
              <div className="form-group">
                <label>Subject</label>
                <input
                  type="text"
                  name="subject"
                  placeholder="What's this about?"
                />
              </div>
              <div className="form-group">
                <label>Message *</label>
                <textarea
                  name="message"
                  placeholder="Tell us how we can help you..."
                  rows="5"
                  required
                />
              </div>
              
              {/* Hidden field for time */}
              <input 
                type="hidden" 
                name="time" 
                value={new Date().toLocaleString('en-IN', {
                  dateStyle: 'medium',
                  timeStyle: 'short'
                })} 
              />

              {submitStatus === 'success' && (
                <div className="submit-success">
                  ✅ Thank you! We'll get back to you soon.
                </div>
              )}
              {submitStatus === 'error' && (
                <div className="submit-error">
                  ❌ Something went wrong. Please try again.
                </div>
              )}

              <button type="submit" className="btn-primary submit-btn" disabled={isSubmitting}>
                {isSubmitting ? 'Sending...' : 'Send Message'}
              </button>
            </form>
          </div>

          <div className="contact-info">
            <div className="info-card">
              <h3>📬 Get in Touch</h3>
              <div className="contact-detail">
                <span className="detail-icon">📧</span>
                <div>
                  <h4>Email</h4>
                  <p>houseofmadhu04@gmail.com</p>
                </div>
              </div>
              <div className="contact-detail">
                <span className="detail-icon">📱</span>
                <div>
                  <h4>Instagram</h4>
                  <p>https://www.instagram.com/house._.of._.madhu/</p>
                </div>
              </div>
              <div className="contact-detail">
                <span className="detail-icon">📍</span>
                <div>
                  <h4>Location</h4>
                  <p>Roorkee, India</p>
                </div>
              </div>
            </div>

            <div className="info-card">
              <h3>🕐 Working Hours</h3>
              <ul className="hours-list">
                <li><span>Monday - Friday</span> <span>9:00 AM - 6:00 PM</span></li>
                <li><span>Saturday</span> <span>10:00 AM - 4:00 PM</span></li>
                <li><span>Sunday</span> <span>Prefered Deal Hours</span></li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;