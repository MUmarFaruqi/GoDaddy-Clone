
import React from 'react';
import { Link } from 'react-router-dom';

interface HeaderProps {
    cartCount: number;
}

const Header: React.FC<HeaderProps> = ({ cartCount }) => {
  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <div className="flex items-center space-x-8">
          <Link to="/" className="flex items-center space-x-2">
            <div className="bg-emerald-600 p-1.5 rounded">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
                </svg>
            </div>
            <span className="text-xl font-bold tracking-tight text-gray-900">GoDaddy<span className="text-emerald-600">Clone</span></span>
          </Link>
          <nav className="hidden md:flex items-center space-x-6 text-sm font-medium text-gray-600">
            <Link to="/" className="hover:text-emerald-600 transition-colors">Domains</Link>
            <Link to="/dashboard" className="hover:text-emerald-600 transition-colors">My Domains</Link>
            <a href="#" className="hover:text-emerald-600 transition-colors">Websites</a>
            <a href="#" className="hover:text-emerald-600 transition-colors">Email</a>
          </nav>
        </div>

        <div className="flex items-center space-x-4">
          <Link to="/cart" className="relative p-2 text-gray-600 hover:text-emerald-600 transition-colors">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
            {cartCount > 0 && (
              <span className="absolute top-0 right-0 bg-emerald-500 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full border-2 border-white">
                {cartCount}
              </span>
            )}
          </Link>
          <div className="hidden sm:flex items-center space-x-2">
            <button className="text-sm font-medium text-gray-600 px-4 py-2 hover:bg-gray-50 rounded-lg">Sign In</button>
            <button className="text-sm font-medium bg-emerald-600 text-white px-4 py-2 rounded-lg hover:bg-emerald-700 transition-colors shadow-sm">Get Started</button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
