
import React from 'react';
import { OwnedDomain } from '../types';

interface DashboardProps {
  ownedDomains: OwnedDomain[];
}

const Dashboard: React.FC<DashboardProps> = ({ ownedDomains }) => {
  return (
    <div className="min-h-screen py-12 px-4">
      <div className="container mx-auto max-w-5xl">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Domain Portfolio</h1>
            <p className="text-gray-500">Manage and renew your registered domains.</p>
          </div>
          <button className="bg-emerald-600 text-white px-6 py-2.5 rounded-xl font-bold hover:bg-emerald-700 transition-colors shadow-lg shadow-emerald-200">
            Register New Domain
          </button>
        </div>

        {ownedDomains.length === 0 ? (
          <div className="bg-white rounded-2xl p-12 text-center border-2 border-dashed border-gray-200">
            <div className="w-20 h-20 bg-gray-50 text-gray-400 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
                </svg>
            </div>
            <h2 className="text-xl font-bold text-gray-900 mb-2">No domains found</h2>
            <p className="text-gray-500 mb-8 max-w-sm mx-auto">You haven't registered any domains yet. Start your online journey by searching for a name.</p>
            <a href="/#" className="text-emerald-600 font-bold hover:underline">Search for domains →</a>
          </div>
        ) : (
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
            <table className="w-full text-left">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-4 text-sm font-semibold text-gray-600 uppercase tracking-wider">Domain</th>
                  <th className="px-6 py-4 text-sm font-semibold text-gray-600 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-4 text-sm font-semibold text-gray-600 uppercase tracking-wider">Renewal Date</th>
                  <th className="px-6 py-4 text-sm font-semibold text-gray-600 uppercase tracking-wider">Price/yr</th>
                  <th className="px-6 py-4 text-sm font-semibold text-gray-600 uppercase tracking-wider text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {ownedDomains.map((domain) => (
                  <tr key={domain.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="font-bold text-gray-900">{domain.name}{domain.tld}</div>
                      <div className="text-xs text-gray-400">Registered on {new Date(domain.registeredAt).toLocaleDateString()}</div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-emerald-100 text-emerald-800">
                        {domain.status.charAt(0).toUpperCase() + domain.status.slice(1)}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">
                      {new Date(domain.expiresAt).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">
                      ${domain.renewalPrice.toFixed(2)}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <button className="text-sm font-bold text-emerald-600 hover:text-emerald-700">Manage</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
