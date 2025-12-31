
import React, { useState } from 'react';
import { checkDomainAvailability, getDomainSuggestions } from '../services/geminiService';
import { Domain, CartItem } from '../types';
import DomainResultCard from '../components/DomainResultCard';

interface HomeProps {
  onAddToCart: (domain: Domain) => void;
  cart: CartItem[];
}

const Home: React.FC<HomeProps> = ({ onAddToCart, cart }) => {
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState<Domain[]>([]);
  const [searched, setSearched] = useState(false);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;

    setLoading(true);
    setSearched(true);
    
    try {
      const [mainResult, suggestions] = await Promise.all([
        checkDomainAvailability(query),
        getDomainSuggestions(query)
      ]);
      
      setResults([mainResult, ...suggestions]);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="gradient-bg text-white py-20 px-4">
        <div className="container mx-auto max-w-4xl text-center">
          <h1 className="text-4xl md:text-6xl font-extrabold mb-6 leading-tight">
            It all starts with a domain.
          </h1>
          <p className="text-xl md:text-2xl text-emerald-50 mb-10 font-medium">
            Search for your brand's new home on the web.
          </p>

          <form onSubmit={handleSearch} className="relative max-w-3xl mx-auto group">
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Find your perfect domain name..."
              className="w-full pl-6 pr-40 py-5 rounded-2xl text-gray-900 text-lg md:text-xl shadow-2xl focus:outline-none focus:ring-4 focus:ring-emerald-400/50 transition-all border-0"
            />
            <button
              type="submit"
              disabled={loading}
              className="absolute right-2 top-2 bottom-2 bg-emerald-600 px-8 rounded-xl font-bold hover:bg-emerald-700 transition-colors flex items-center gap-2 disabled:bg-gray-400"
            >
              {loading ? (
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
              ) : (
                <>
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                  Search
                </>
              )}
            </button>
          </form>

          <div className="mt-8 flex flex-wrap justify-center gap-6 text-emerald-100 font-medium text-sm">
            <div className="flex items-center gap-2">
              <span className="bg-emerald-500 px-2 py-0.5 rounded font-bold text-white">.com</span> $11.99
            </div>
            <div className="flex items-center gap-2">
              <span className="bg-emerald-500 px-2 py-0.5 rounded font-bold text-white">.net</span> $14.99
            </div>
            <div className="flex items-center gap-2">
              <span className="bg-emerald-500 px-2 py-0.5 rounded font-bold text-white">.ai</span> $69.99
            </div>
            <div className="flex items-center gap-2">
              <span className="bg-emerald-500 px-2 py-0.5 rounded font-bold text-white">.io</span> $49.99
            </div>
          </div>
        </div>
      </section>

      {/* Results Section */}
      <section className="py-12 px-4 container mx-auto max-w-4xl">
        {loading ? (
          <div className="space-y-4">
            {[1, 2, 3, 4].map(i => (
              <div key={i} className="h-24 bg-gray-200 animate-pulse rounded-xl"></div>
            ))}
          </div>
        ) : searched ? (
          <div className="space-y-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-2xl font-bold text-gray-900">Search Results</h2>
              <p className="text-sm text-gray-500">Prices for 1st year of registration</p>
            </div>
            {results.map((domain, index) => (
              <DomainResultCard
                key={`${domain.name}${domain.tld}-${index}`}
                domain={domain}
                onAddToCart={onAddToCart}
                inCart={cart.some(item => item.name === domain.name && item.tld === domain.tld)}
              />
            ))}
          </div>
        ) : (
          <div className="py-12">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 text-center">
                <div className="w-12 h-12 bg-emerald-100 text-emerald-600 rounded-xl flex items-center justify-center mx-auto mb-6">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <h3 className="text-lg font-bold mb-2">AI-Powered Suggestions</h3>
                <p className="text-gray-500 text-sm">Our Gemini integration finds the most brandable names for your business.</p>
              </div>
              <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 text-center">
                <div className="w-12 h-12 bg-emerald-100 text-emerald-600 rounded-xl flex items-center justify-center mx-auto mb-6">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                </div>
                <h3 className="text-lg font-bold mb-2">Secure & Reliable</h3>
                <p className="text-gray-500 text-sm">Enterprise-grade security and 24/7 monitoring for all your assets.</p>
              </div>
              <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 text-center">
                <div className="w-12 h-12 bg-emerald-100 text-emerald-600 rounded-xl flex items-center justify-center mx-auto mb-6">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                  </svg>
                </div>
                <h3 className="text-lg font-bold mb-2">Transparent Pricing</h3>
                <p className="text-gray-500 text-sm">No hidden fees. We show you exactly what you'll pay today and for renewals.</p>
              </div>
            </div>
          </div>
        )}
      </section>
    </div>
  );
};

export default Home;
