
import React from 'react';
import { CartItem } from '../types';

interface CartProps {
  cart: CartItem[];
  onRemove: (index: number) => void;
  onCheckout: () => void;
}

const Cart: React.FC<CartProps> = ({ cart, onRemove, onCheckout }) => {
  const subtotal = cart.reduce((acc, item) => acc + item.price, 0);
  const tax = subtotal * 0.08;
  const total = subtotal + tax;

  return (
    <div className="min-h-screen py-12 px-4">
      <div className="container mx-auto max-w-5xl">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Shopping Cart</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-4">
            {cart.length === 0 ? (
              <div className="bg-white p-12 rounded-2xl shadow-sm text-center border border-gray-200">
                <p className="text-gray-500 mb-6">Your cart is empty.</p>
                <a href="/#" className="bg-emerald-600 text-white px-8 py-3 rounded-xl font-bold inline-block shadow-lg shadow-emerald-200">
                  Search Domains
                </a>
              </div>
            ) : (
              cart.map((item, index) => (
                <div key={`${item.name}-${index}`} className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center justify-between">
                  <div>
                    <h3 className="text-xl font-bold text-gray-900">{item.name}{item.tld}</h3>
                    <p className="text-sm text-gray-500">1 Year Registration</p>
                  </div>
                  <div className="flex items-center gap-6">
                    <div className="text-right">
                      <div className="text-xl font-bold text-gray-900">${item.price.toFixed(2)}</div>
                    </div>
                    <button 
                      onClick={() => onRemove(index)}
                      className="text-gray-400 hover:text-red-500 transition-colors"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>

          <div className="lg:col-span-1">
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 sticky top-24">
              <h2 className="text-xl font-bold mb-6 text-gray-900">Order Summary</h2>
              <div className="space-y-4 mb-8">
                <div className="flex justify-between text-gray-600">
                  <span>Subtotal</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Taxes & Fees</span>
                  <span>${tax.toFixed(2)}</span>
                </div>
                <div className="pt-4 border-t border-gray-100 flex justify-between font-bold text-xl text-gray-900">
                  <span>Total</span>
                  <span>${total.toFixed(2)}</span>
                </div>
              </div>
              <button
                onClick={onCheckout}
                disabled={cart.length === 0}
                className="w-full bg-emerald-600 text-white py-4 rounded-xl font-bold text-lg hover:bg-emerald-700 transition-all shadow-xl shadow-emerald-200 disabled:bg-gray-300 disabled:shadow-none active:transform active:scale-95"
              >
                Complete Purchase
              </button>
              <div className="mt-6 text-center">
                <p className="text-xs text-gray-400 flex items-center justify-center gap-1">
                  <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                  </svg>
                  Secure SSL Encryption
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
