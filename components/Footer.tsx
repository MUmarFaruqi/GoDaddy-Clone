
import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-900 text-gray-400 py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          <div>
            <h3 className="text-white font-bold mb-4">About GoDaddy Clone</h3>
            <p className="text-sm leading-relaxed">
              We empower creators to bring their ideas to life with the perfect domain and professional tools. This is a simulation project.
            </p>
          </div>
          <div>
            <h3 className="text-white font-bold mb-4">Support</h3>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="hover:text-white">Help Center</a></li>
              <li><a href="#" className="hover:text-white">Contact Us</a></li>
              <li><a href="#" className="hover:text-white">Reporting Abuse</a></li>
            </ul>
          </div>
          <div>
            <h3 className="text-white font-bold mb-4">Resources</h3>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="hover:text-white">Webmail</a></li>
              <li><a href="#" className="hover:text-white">WHOIS</a></li>
              <li><a href="#" className="hover:text-white">ICANN Confirmation</a></li>
            </ul>
          </div>
          <div>
            <h3 className="text-white font-bold mb-4">Partners</h3>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="hover:text-white">Affiliate Program</a></li>
              <li><a href="#" className="hover:text-white">Reseller Program</a></li>
            </ul>
          </div>
        </div>
        <div className="pt-8 border-t border-gray-800 text-center text-xs">
          <p>© 2024 GoDaddy Clone. All rights reserved. Built for demonstration.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
