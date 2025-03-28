import React from 'react';
import { useNavigate } from 'react-router-dom';

const AVPDashboard = ({ user, onLogout }) => {
  const navigate = useNavigate();
  
  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8 flex justify-between items-center">
          <div className="flex items-center">
            <div className="font-bold text-2xl">AGI</div>
            <div className="ml-2 text-sm font-bold">GREENPAC</div>
          </div>
          <div className="flex items-center">
            <span className="mr-4">Welcome, {user.name}</span>
            <button
              onClick={onLogout}
              className="bg-red-500 hover:bg-red-600 text-white text-sm py-1 px-3 rounded"
            >
              Logout
            </button>
          </div>
        </div>
      </header>
      
      <main className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-2xl font-semibold text-gray-900">AVP Dashboard</h1>
          <p className="mt-2 text-gray-600">Quality Assurance & Systems Management</p>
        </div>
        
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          <div className="bg-white shadow overflow-hidden sm:rounded-lg">
            <div className="px-4 py-5 sm:p-6">
              <h3 className="text-lg font-medium text-gray-900">Reports Pending Approval</h3>
              <div className="mt-4">
                <ul className="divide-y divide-gray-200">
                  <li className="py-3 flex justify-between items-center">
                    <div>
                      <p className="text-sm font-medium text-gray-900">FAIR-2024-11-29-01</p>
                      <p className="text-sm text-gray-500">Pink matt - Line 02</p>
                    </div>
                    <button
                      onClick={() => navigate('/inspection-form')}
                      className="inline-flex items-center px-3 py-1 border border-transparent text-xs font-medium rounded-md text-indigo-700 bg-indigo-100 hover:bg-indigo-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                      Review
                    </button>
                  </li>
                  <li className="py-3 flex justify-between items-center">
                    <div>
                      <p className="text-sm font-medium text-gray-900">FAIR-2024-11-28-04</p>
                      <p className="text-sm text-gray-500">Blue matt - Line 01</p>
                    </div>
                    <button
                      className="inline-flex items-center px-3 py-1 border border-transparent text-xs font-medium rounded-md text-indigo-700 bg-indigo-100 hover:bg-indigo-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                      Review
                    </button>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          
          <div className="bg-white shadow overflow-hidden sm:rounded-lg">
            <div className="px-4 py-5 sm:p-6">
              <h3 className="text-lg font-medium text-gray-900">Quality Metrics</h3>
              <div className="mt-4">
                <dl className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                  <div className="bg-gray-50 overflow-hidden shadow rounded-lg p-4">
                    <dt className="text-sm font-medium text-gray-500 truncate">Reports Approved Today</dt>
                    <dd className="mt-1 text-3xl font-semibold text-gray-900">12</dd>
                  </div>
                  <div className="bg-gray-50 overflow-hidden shadow rounded-lg p-4">
                    <dt className="text-sm font-medium text-gray-500 truncate">Average Approval Time</dt>
                    <dd className="mt-1 text-3xl font-semibold text-gray-900">1.2h</dd>
                  </div>
                  <div className="bg-gray-50 overflow-hidden shadow rounded-lg p-4">
                    <dt className="text-sm font-medium text-gray-500 truncate">Quality Issues Reported</dt>
                    <dd className="mt-1 text-3xl font-semibold text-gray-900">2</dd>
                  </div>
                  <div className="bg-gray-50 overflow-hidden shadow rounded-lg p-4">
                    <dt className="text-sm font-medium text-gray-500 truncate">Compliance Rate</dt>
                    <dd className="mt-1 text-3xl font-semibold text-gray-900">98.3%</dd>
                  </div>
                </dl>
              </div>
            </div>
          </div>
        </div>
        
        <div className="mt-6 bg-white shadow sm:rounded-lg">
          <div className="px-4 py-5 sm:p-6">
            <h3 className="text-lg font-medium text-gray-900">Recent Activity</h3>
            <div className="mt-4 border-t border-gray-200 pt-4">
              <ul className="divide-y divide-gray-200">
                <li className="py-3">
                  <div className="flex space-x-3">
                    <div className="flex-1 space-y-1">
                      <div className="flex items-center justify-between">
                        <h3 className="text-sm font-medium">Document No. AGI-DEC-14-04 updated</h3>
                        <p className="text-sm text-gray-500">2h ago</p>
                      </div>
                      <p className="text-sm text-gray-500">Updated by John Operator</p>
                    </div>
                  </div>
                </li>
                <li className="py-3">
                  <div className="flex space-x-3">
                    <div className="flex-1 space-y-1">
                      <div className="flex items-center justify-between">
                        <h3 className="text-sm font-medium">New inspection report created</h3>
                        <p className="text-sm text-gray-500">4h ago</p>
                      </div>
                      <p className="text-sm text-gray-500">Created by Mark Supervisor</p>
                    </div>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default AVPDashboard;