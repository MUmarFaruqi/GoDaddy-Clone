
import React from 'react';
import { Domain } from '../types';

interface DomainResultCardProps {
  domain: Domain;
  onAddToCart: (domain: Domain) => void;
  inCart: boolean;
}

const DomainResultCard: React.FC<DomainResultCardProps> = ({ domain, onAddToCart, inCart }) => {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 flex flex-col md:flex-row md:items-center justify-between gap-4 transition-all hover:shadow-md">
      <div className="flex-1">
        <div className="flex items-center gap-2 mb-1">
          <h3 className="text-xl font-bold text-gray-900">
            {domain.name}<span className="text-emerald-600">{domain.tld}</span>
          </h3>
          {domain.isPremium && (
            <span className="bg-amber-100 text-amber-700 text-[10px] font-bold uppercase px-2 py-0.5 rounded">Premium</span>
          )}
          {!domain.available && (
            <span className="bg-red-100 text-red-700 text-[10px] font-bold uppercase px-2 py-0.5 rounded">Taken</span>
          )}
        </div>
        {domain.reason && (
          <p className="text-sm text-gray-500 line-clamp-2 italic">"{domain.reason}"</p>
        )}
      </div>

      <div className="flex items-center gap-6">
        <div className="text-right">
          {domain.available ? (
            <>
              <div className="text-2xl font-bold text-gray-900">${domain.price.toFixed(2)}</div>
              <div className="text-xs text-gray-400">then ${domain.renewalPrice.toFixed(2)}/yr</div>
            </>
          ) : (
            <div className="text-gray-400 text-sm font-medium italic">Unavailable</div>
          )}
        </div>
        
        <button
          onClick={() => domain.available && !inCart && onAddToCart(domain)}
          disabled={!domain.available || inCart}
          className={`px-6 py-2.5 rounded-lg font-semibold text-sm transition-all flex items-center gap-2 ${
            inCart 
              ? 'bg-emerald-100 text-emerald-700 cursor-default' 
              : !domain.available
              ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
              : 'bg-emerald-600 text-white hover:bg-emerald-700 active:transform active:scale-95'
          }`}
        >
          {inCart ? (
            <>
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
              In Cart
            </>
          ) : (
            'Add to Cart'
          )}
        </button>
      </div>
    </div>
  );
};

export default DomainResultCard;
