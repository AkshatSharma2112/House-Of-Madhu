import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext.jsx';
import { ProductProvider } from './context/ProductContext.jsx';
import './App.css';

// Layout Components
import Navbar from './components/layout/Navbar.jsx';
import Footer from './components/layout/Footer.jsx';

// Page Components
import Home from './components/pages/Home.jsx';
import Shop from './components/pages/Shop.jsx';
import CustomOrders from './components/pages/CustomOrders.jsx';
import AboutUs from './components/pages/AboutUs.jsx';
import Contact from './components/pages/Contact.jsx';
import Support from './components/pages/Support.jsx';   // 👈 NEW
import ProductDetail from './components/product/ProductDetail.jsx';

// Admin Components
import AdminPanel from './components/admin/AdminPanel.jsx';

// Chatbot
import Chatbot from './components/chatbot/Chatbot.jsx';

function App() {
  return (
    <AuthProvider>
      <ProductProvider>
        <div className="App">
          <Navbar />

          <main className="main-content">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/shop" element={<Shop />} />
              <Route path="/product/:id" element={<ProductDetail />} />
              <Route path="/custom-orders" element={<CustomOrders />} />
              <Route path="/about" element={<AboutUs />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/support" element={<Support />} />   {/* 👈 NEW */}
              <Route path="/admin" element={<AdminPanel />} />

              {/* Redirect any unknown routes to home */}
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </main>

          <Footer />

          {/* House of Madhu AI Chatbot */}
          <Chatbot />
        </div>
      </ProductProvider>
    </AuthProvider>
  );
}

export default App;