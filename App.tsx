
import React, { useState, useEffect } from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import Cart from './pages/Cart';
import { Domain, CartItem, OwnedDomain } from './types';

const App: React.FC = () => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [ownedDomains, setOwnedDomains] = useState<OwnedDomain[]>(() => {
    const saved = localStorage.getItem('owned_domains');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem('owned_domains', JSON.stringify(ownedDomains));
  }, [ownedDomains]);

  const handleAddToCart = (domain: Domain) => {
    setCart(prev => [...prev, domain]);
  };

  const handleRemoveFromCart = (index: number) => {
    setCart(prev => prev.filter((_, i) => i !== index));
  };

  const handleCheckout = () => {
    const newDomains: OwnedDomain[] = cart.map(item => ({
      ...item,
      id: Math.random().toString(36).substr(2, 9),
      registeredAt: new Date().toISOString(),
      expiresAt: new Date(new Date().setFullYear(new Date().getFullYear() + 1)).toISOString(),
      status: 'active',
      autoRenew: true,
    }));

    setOwnedDomains(prev => [...prev, ...newDomains]);
    setCart([]);
    // Simulate navigation to dashboard
    window.location.hash = '/dashboard';
  };

  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        <Header cartCount={cart.length} />
        
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home onAddToCart={handleAddToCart} cart={cart} />} />
            <Route path="/dashboard" element={<Dashboard ownedDomains={ownedDomains} />} />
            <Route path="/cart" element={
              <Cart 
                cart={cart} 
                onRemove={handleRemoveFromCart} 
                onCheckout={handleCheckout} 
              />
            } />
          </Routes>
        </main>

        <Footer />
      </div>
    </Router>
  );
};

export default App;
