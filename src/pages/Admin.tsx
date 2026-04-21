import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  LayoutDashboardIcon,
  PackageIcon,
  ShoppingBagIcon,
  RefreshCcwIcon,
  UsersIcon,
  TrendingUpIcon,
  TrendingDownIcon,
  SearchIcon,
  PlusIcon,
  MoreVerticalIcon,
  EditIcon,
  Trash2Icon,
  AlertTriangleIcon } from
'lucide-react';
import {
  adminStats,
  plants,
  sampleOrders,
  sampleReturns } from
'../data/mockData';
export function Admin() {
  const [activeTab, setActiveTab] = useState<
    'dashboard' | 'plants' | 'orders' | 'returns'>(
    'dashboard');
  const renderDashboard = () =>
  <motion.div
    initial={{
      opacity: 0,
      y: 10
    }}
    animate={{
      opacity: 1,
      y: 0
    }}
    className="space-y-6">
    
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
          <div className="flex justify-between items-start mb-4">
            <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center">
              <ShoppingBagIcon size={24} />
            </div>
            <span
            className={`flex items-center gap-1 text-sm font-medium ${adminStats.ordersChange > 0 ? 'text-green-600' : 'text-red-600'}`}>
            
              {adminStats.ordersChange > 0 ?
            <TrendingUpIcon size={16} /> :

            <TrendingDownIcon size={16} />
            }
              {Math.abs(adminStats.ordersChange)}%
            </span>
          </div>
          <p className="text-sm text-gray-500 mb-1">Total Orders</p>
          <p className="font-display text-3xl font-bold text-gray-900">
            {adminStats.totalOrders.toLocaleString()}
          </p>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
          <div className="flex justify-between items-start mb-4">
            <div className="w-12 h-12 bg-green-50 text-green-600 rounded-xl flex items-center justify-center">
              <span className="font-bold text-xl">Rs</span>
            </div>
            <span
            className={`flex items-center gap-1 text-sm font-medium ${adminStats.revenueChange > 0 ? 'text-green-600' : 'text-red-600'}`}>
            
              {adminStats.revenueChange > 0 ?
            <TrendingUpIcon size={16} /> :

            <TrendingDownIcon size={16} />
            }
              {Math.abs(adminStats.revenueChange)}%
            </span>
          </div>
          <p className="text-sm text-gray-500 mb-1">Total Revenue</p>
          <p className="font-display text-3xl font-bold text-gray-900">
            Rs. {(adminStats.totalRevenue / 1000).toFixed(1)}k
          </p>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
          <div className="flex justify-between items-start mb-4">
            <div className="w-12 h-12 bg-nature-50 text-nature-600 rounded-xl flex items-center justify-center">
              <PackageIcon size={24} />
            </div>
          </div>
          <p className="text-sm text-gray-500 mb-1">Total Plants</p>
          <p className="font-display text-3xl font-bold text-gray-900">
            {adminStats.totalPlants}
          </p>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
          <div className="flex justify-between items-start mb-4">
            <div className="w-12 h-12 bg-purple-50 text-purple-600 rounded-xl flex items-center justify-center">
              <UsersIcon size={24} />
            </div>
          </div>
          <p className="text-sm text-gray-500 mb-1">Total Customers</p>
          <p className="font-display text-3xl font-bold text-gray-900">
            {adminStats.totalCustomers}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Alerts */}
        <div className="lg:col-span-1 space-y-6">
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
            <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <AlertTriangleIcon size={20} className="text-yellow-500" />
              Action Required
            </h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-3 bg-red-50 rounded-xl border border-red-100">
                <span className="text-sm font-medium text-red-800">
                  Low Stock Alerts
                </span>
                <span className="bg-red-200 text-red-800 text-xs font-bold px-2 py-1 rounded-full">
                  {adminStats.lowStockAlerts}
                </span>
              </div>
              <div className="flex items-center justify-between p-3 bg-yellow-50 rounded-xl border border-yellow-100">
                <span className="text-sm font-medium text-yellow-800">
                  Pending Orders
                </span>
                <span className="bg-yellow-200 text-yellow-800 text-xs font-bold px-2 py-1 rounded-full">
                  {adminStats.pendingOrders}
                </span>
              </div>
              <div className="flex items-center justify-between p-3 bg-blue-50 rounded-xl border border-blue-100">
                <span className="text-sm font-medium text-blue-800">
                  Pending Returns
                </span>
                <span className="bg-blue-200 text-blue-800 text-xs font-bold px-2 py-1 rounded-full">
                  {adminStats.pendingReturns}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Recent Orders */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
            <div className="p-6 border-b border-gray-100 flex justify-between items-center">
              <h3 className="font-semibold text-gray-900">Recent Orders</h3>
              <button
              onClick={() => setActiveTab('orders')}
              className="text-sm font-medium text-nature-600 hover:text-nature-700">
              
                View All
              </button>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead className="bg-gray-50 text-sm text-gray-500">
                  <tr>
                    <th className="p-4 font-medium">Order ID</th>
                    <th className="p-4 font-medium">Customer</th>
                    <th className="p-4 font-medium">Status</th>
                    <th className="p-4 font-medium">Total</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {sampleOrders.slice(0, 5).map((order) =>
                <tr key={order.id} className="hover:bg-gray-50/50">
                      <td className="p-4 font-medium text-gray-900">
                        {order.id}
                      </td>
                      <td className="p-4 text-sm text-gray-600">
                        {order.shippingAddress.fullName}
                      </td>
                      <td className="p-4">
                        <span
                      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${order.status === 'delivered' ? 'bg-green-100 text-green-800' : order.status === 'pending' ? 'bg-yellow-100 text-yellow-800' : 'bg-blue-100 text-blue-800'}`}>
                      
                          {order.status}
                        </span>
                      </td>
                      <td className="p-4 text-sm font-medium text-gray-900">
                        Rs. {order.total.toLocaleString()}
                      </td>
                    </tr>
                )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </motion.div>;

  const renderPlants = () =>
  <motion.div
    initial={{
      opacity: 0,
      y: 10
    }}
    animate={{
      opacity: 1,
      y: 0
    }}
    className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
    
      <div className="p-6 border-b border-gray-100 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="relative w-full sm:w-64">
          <input
          type="text"
          placeholder="Search plants..."
          className="w-full pl-10 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-nature-500 text-sm" />
        
          <SearchIcon
          size={16}
          className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
        
        </div>
        <button className="flex items-center gap-2 px-4 py-2 bg-nature-600 text-white rounded-lg text-sm font-medium hover:bg-nature-700 transition-colors whitespace-nowrap">
          <PlusIcon size={16} /> Add New Plant
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead className="bg-gray-50 text-sm text-gray-500">
            <tr>
              <th className="p-4 font-medium">Plant</th>
              <th className="p-4 font-medium">Category</th>
              <th className="p-4 font-medium">Price</th>
              <th className="p-4 font-medium">Stock</th>
              <th className="p-4 font-medium text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {plants.map((plant) =>
          <tr key={plant.id} className="hover:bg-gray-50/50">
                <td className="p-4 flex items-center gap-3">
                  <img
                src={plant.image}
                alt={plant.name}
                className="w-10 h-10 rounded-lg object-cover bg-gray-100" />
              
                  <div>
                    <p className="font-medium text-gray-900">{plant.name}</p>
                    <p className="text-xs text-gray-500">
                      {plant.scientificName}
                    </p>
                  </div>
                </td>
                <td className="p-4 text-sm text-gray-600">{plant.category}</td>
                <td className="p-4 text-sm font-medium text-gray-900">
                  Rs. {plant.price.toLocaleString()}
                </td>
                <td className="p-4">
                  <span
                className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${plant.stock === 0 ? 'bg-red-100 text-red-800' : plant.stock <= 5 ? 'bg-yellow-100 text-yellow-800' : 'bg-green-100 text-green-800'}`}>
                
                    {plant.stock} in stock
                  </span>
                </td>
                <td className="p-4 text-right">
                  <div className="flex items-center justify-end gap-2">
                    <button className="p-1.5 text-gray-400 hover:text-nature-600 rounded transition-colors">
                      <EditIcon size={16} />
                    </button>
                    <button className="p-1.5 text-gray-400 hover:text-red-600 rounded transition-colors">
                      <Trash2Icon size={16} />
                    </button>
                  </div>
                </td>
              </tr>
          )}
          </tbody>
        </table>
      </div>
    </motion.div>;

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col md:flex-row">
      {/* Sidebar */}
      <div className="w-full md:w-64 bg-white border-r border-gray-200 shrink-0 md:min-h-screen">
        <div className="p-6">
          <h1 className="font-display font-bold text-2xl text-nature-900">
            NatureBloom
          </h1>
          <p className="text-xs text-gray-500 font-medium uppercase tracking-wider mt-1">
            Admin Panel
          </p>
        </div>

        <nav className="px-4 space-y-1">
          {[
          {
            id: 'dashboard',
            label: 'Dashboard',
            icon: LayoutDashboardIcon
          },
          {
            id: 'plants',
            label: 'Manage Plants',
            icon: PackageIcon
          },
          {
            id: 'orders',
            label: 'Orders',
            icon: ShoppingBagIcon
          },
          {
            id: 'returns',
            label: 'Returns',
            icon: RefreshCcwIcon
          }].
          map((item) =>
          <button
            key={item.id}
            onClick={() => setActiveTab(item.id as any)}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-colors ${activeTab === item.id ? 'bg-nature-50 text-nature-700' : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'}`}>
            
              <item.icon size={18} />
              {item.label}
            </button>
          )}
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-6 lg:p-8 overflow-y-auto">
        <div className="flex justify-between items-center mb-8">
          <h2 className="font-display text-2xl font-bold text-gray-900 capitalize">
            {activeTab === 'dashboard' ? 'Overview' : activeTab}
          </h2>
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-full bg-nature-100 flex items-center justify-center text-nature-700 font-bold">
              A
            </div>
          </div>
        </div>

        <AnimatePresence mode="wait">
          {activeTab === 'dashboard' && renderDashboard()}
          {activeTab === 'plants' && renderPlants()}
          {/* Add simplified placeholders for orders and returns to save space */}
          {(activeTab === 'orders' || activeTab === 'returns') &&
          <motion.div
            initial={{
              opacity: 0
            }}
            animate={{
              opacity: 1
            }}
            className="bg-white p-12 rounded-2xl border border-gray-100 text-center">
            
              <p className="text-gray-500">
                Full {activeTab} management interface would go here.
              </p>
            </motion.div>
          }
        </AnimatePresence>
      </div>
    </div>);

}