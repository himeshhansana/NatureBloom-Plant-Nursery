import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  UserIcon,
  PackageIcon,
  RefreshCcwIcon,
  SettingsIcon,
  LogOutIcon,
  ChevronRightIcon,
  MapPinIcon,
  CheckCircleIcon,
  ClockIcon,
  TruckIcon,
  AlertCircleIcon } from
'lucide-react';
import { sampleUser, sampleOrders, sampleReturns } from '../data/mockData';
import { OrderStatus } from '../data/types';
export function Dashboard() {
  const [activeTab, setActiveTab] = useState<
    'overview' | 'orders' | 'returns' | 'settings'>(
    'overview');
  const [selectedOrderId, setSelectedOrderId] = useState<string | null>(null);
  const getStatusColor = (status: OrderStatus) => {
    switch (status) {
      case 'delivered':
        return 'bg-green-100 text-green-700';
      case 'shipped':
        return 'bg-blue-100 text-blue-700';
      case 'packed':
        return 'bg-purple-100 text-purple-700';
      case 'confirmed':
        return 'bg-yellow-100 text-yellow-700';
      case 'cancelled':
        return 'bg-red-100 text-red-700';
      default:
        return 'bg-gray-100 text-gray-700';
      // pending
    }
  };
  const getStatusIcon = (status: OrderStatus) => {
    switch (status) {
      case 'delivered':
        return <CheckCircleIcon size={16} />;
      case 'shipped':
        return <TruckIcon size={16} />;
      case 'packed':
        return <PackageIcon size={16} />;
      case 'cancelled':
        return <AlertCircleIcon size={16} />;
      default:
        return <ClockIcon size={16} />;
    }
  };
  const renderOrderTracking = (orderId: string) => {
    const order = sampleOrders.find((o) => o.id === orderId);
    if (!order) return null;
    return (
      <motion.div
        initial={{
          opacity: 0,
          y: 10
        }}
        animate={{
          opacity: 1,
          y: 0
        }}
        className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm mt-6">
        
        <div className="flex justify-between items-center mb-8">
          <div>
            <h3 className="font-display text-xl font-bold text-gray-900">
              Track Order {order.id}
            </h3>
            <p className="text-sm text-gray-500">
              Placed on {order.createdAt.toLocaleDateString()}
            </p>
          </div>
          <button
            onClick={() => setSelectedOrderId(null)}
            className="text-sm font-medium text-nature-600 hover:text-nature-700">
            
            Close Tracking
          </button>
        </div>

        <div className="relative">
          {/* Timeline Line */}
          <div className="absolute left-[15px] top-4 bottom-4 w-0.5 bg-gray-100"></div>

          <div className="space-y-8">
            {order.timeline.map((event, idx) => {
              const isLast = idx === order.timeline.length - 1;
              const isCompleted = true; // In a real app, check against current status
              return (
                <div key={idx} className="relative flex gap-6">
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 z-10 ${isCompleted ? 'bg-nature-500 text-white' : 'bg-gray-100 text-gray-400'}`}>
                    
                    {getStatusIcon(event.status)}
                  </div>
                  <div className="pt-1">
                    <h4
                      className={`font-medium ${isCompleted ? 'text-gray-900' : 'text-gray-500'}`}>
                      
                      {event.status.charAt(0).toUpperCase() +
                      event.status.slice(1)}
                    </h4>
                    <p className="text-sm text-gray-500 mt-1">
                      {event.description}
                    </p>
                    <p className="text-xs text-gray-400 mt-1">
                      {event.date.toLocaleDateString()} at{' '}
                      {event.date.toLocaleTimeString([], {
                        hour: '2-digit',
                        minute: '2-digit'
                      })}
                    </p>
                  </div>
                </div>);

            })}
          </div>
        </div>

        {order.trackingId &&
        <div className="mt-8 p-4 bg-gray-50 rounded-xl flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Courier Tracking ID</p>
              <p className="font-medium text-gray-900">{order.trackingId}</p>
            </div>
            <button className="px-4 py-2 bg-white border border-gray-200 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50">
              Track on Courier Website
            </button>
          </div>
        }
      </motion.div>);

  };
  return (
    <div className="min-h-screen bg-cream pt-24 pb-20">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Sidebar */}
          <div className="md:w-64 shrink-0">
            <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-6 sticky top-24">
              <div className="flex items-center gap-4 mb-8">
                <img
                  src={sampleUser.avatar}
                  alt={sampleUser.name}
                  className="w-12 h-12 rounded-full object-cover border-2 border-nature-100" />
                
                <div>
                  <h2 className="font-semibold text-gray-900">
                    {sampleUser.name}
                  </h2>
                  <p className="text-xs text-gray-500">
                    Member since {sampleUser.joinedAt.getFullYear()}
                  </p>
                </div>
              </div>

              <nav className="space-y-2">
                {[
                {
                  id: 'overview',
                  label: 'Overview',
                  icon: UserIcon
                },
                {
                  id: 'orders',
                  label: 'My Orders',
                  icon: PackageIcon
                },
                {
                  id: 'returns',
                  label: 'Returns',
                  icon: RefreshCcwIcon
                },
                {
                  id: 'settings',
                  label: 'Settings',
                  icon: SettingsIcon
                }].
                map((item) =>
                <button
                  key={item.id}
                  onClick={() => {
                    setActiveTab(item.id as any);
                    setSelectedOrderId(null);
                  }}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-colors ${activeTab === item.id ? 'bg-nature-50 text-nature-700' : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'}`}>
                  
                    <item.icon size={18} />
                    {item.label}
                  </button>
                )}
              </nav>

              <div className="h-px bg-gray-100 my-6"></div>

              <button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-red-600 hover:bg-red-50 transition-colors">
                <LogOutIcon size={18} />
                Sign Out
              </button>
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1">
            <AnimatePresence mode="wait">
              {/* OVERVIEW TAB */}
              {activeTab === 'overview' &&
              <motion.div
                key="overview"
                initial={{
                  opacity: 0,
                  y: 10
                }}
                animate={{
                  opacity: 1,
                  y: 0
                }}
                exit={{
                  opacity: 0,
                  y: -10
                }}
                className="space-y-6">
                
                  <h1 className="font-display text-3xl font-bold text-gray-900 mb-6">
                    Welcome back, {sampleUser.name.split(' ')[0]}!
                  </h1>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
                      <div className="w-10 h-10 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center mb-4">
                        <PackageIcon size={20} />
                      </div>
                      <p className="text-sm text-gray-500 mb-1">Total Orders</p>
                      <p className="font-display text-2xl font-bold text-gray-900">
                        {sampleOrders.length}
                      </p>
                    </div>
                    <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
                      <div className="w-10 h-10 bg-green-50 text-green-600 rounded-full flex items-center justify-center mb-4">
                        <TruckIcon size={20} />
                      </div>
                      <p className="text-sm text-gray-500 mb-1">
                        Active Orders
                      </p>
                      <p className="font-display text-2xl font-bold text-gray-900">
                        {
                      sampleOrders.filter(
                        (o) =>
                        o.status !== 'delivered' &&
                        o.status !== 'cancelled'
                      ).length
                      }
                      </p>
                    </div>
                    <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
                      <div className="w-10 h-10 bg-purple-50 text-purple-600 rounded-full flex items-center justify-center mb-4">
                        <RefreshCcwIcon size={20} />
                      </div>
                      <p className="text-sm text-gray-500 mb-1">Returns</p>
                      <p className="font-display text-2xl font-bold text-gray-900">
                        {sampleReturns.length}
                      </p>
                    </div>
                  </div>

                  <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-6 lg:p-8 mt-8">
                    <div className="flex justify-between items-center mb-6">
                      <h2 className="font-display text-xl font-bold text-gray-900">
                        Recent Orders
                      </h2>
                      <button
                      onClick={() => setActiveTab('orders')}
                      className="text-sm font-medium text-nature-600 hover:text-nature-700">
                      
                        View All
                      </button>
                    </div>

                    <div className="space-y-4">
                      {sampleOrders.slice(0, 2).map((order) =>
                    <div
                      key={order.id}
                      className="flex flex-col sm:flex-row sm:items-center justify-between p-4 border border-gray-100 rounded-xl hover:border-nature-200 transition-colors gap-4">
                      
                          <div>
                            <p className="font-medium text-gray-900 mb-1">
                              {order.id}
                            </p>
                            <p className="text-sm text-gray-500">
                              {order.createdAt.toLocaleDateString()} • Rs.{' '}
                              {order.total.toLocaleString()}
                            </p>
                          </div>
                          <div className="flex items-center gap-4">
                            <span
                          className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(order.status)}`}>
                          
                              {getStatusIcon(order.status)}
                              {order.status.charAt(0).toUpperCase() +
                          order.status.slice(1)}
                            </span>
                            <button
                          onClick={() => {
                            setActiveTab('orders');
                            setSelectedOrderId(order.id);
                          }}
                          className="p-2 text-gray-400 hover:text-nature-600 bg-gray-50 hover:bg-nature-50 rounded-lg transition-colors">
                          
                              <ChevronRightIcon size={20} />
                            </button>
                          </div>
                        </div>
                    )}
                    </div>
                  </div>
                </motion.div>
              }

              {/* ORDERS TAB */}
              {activeTab === 'orders' &&
              <motion.div
                key="orders"
                initial={{
                  opacity: 0,
                  y: 10
                }}
                animate={{
                  opacity: 1,
                  y: 0
                }}
                exit={{
                  opacity: 0,
                  y: -10
                }}>
                
                  <h1 className="font-display text-3xl font-bold text-gray-900 mb-6">
                    Order History
                  </h1>

                  {selectedOrderId ?
                renderOrderTracking(selectedOrderId) :

                <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
                      <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                          <thead>
                            <tr className="bg-gray-50 border-b border-gray-100">
                              <th className="p-4 text-sm font-medium text-gray-500">
                                Order ID
                              </th>
                              <th className="p-4 text-sm font-medium text-gray-500">
                                Date
                              </th>
                              <th className="p-4 text-sm font-medium text-gray-500">
                                Status
                              </th>
                              <th className="p-4 text-sm font-medium text-gray-500">
                                Total
                              </th>
                              <th className="p-4 text-sm font-medium text-gray-500 text-right">
                                Action
                              </th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-gray-100">
                            {sampleOrders.map((order) =>
                        <tr
                          key={order.id}
                          className="hover:bg-gray-50/50 transition-colors">
                          
                                <td className="p-4 font-medium text-gray-900">
                                  {order.id}
                                </td>
                                <td className="p-4 text-sm text-gray-500">
                                  {order.createdAt.toLocaleDateString()}
                                </td>
                                <td className="p-4">
                                  <span
                              className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium ${getStatusColor(order.status)}`}>
                              
                                    {order.status.charAt(0).toUpperCase() +
                              order.status.slice(1)}
                                  </span>
                                </td>
                                <td className="p-4 text-sm font-medium text-gray-900">
                                  Rs. {order.total.toLocaleString()}
                                </td>
                                <td className="p-4 text-right">
                                  <button
                              onClick={() => setSelectedOrderId(order.id)}
                              className="text-sm font-medium text-nature-600 hover:text-nature-700">
                              
                                    Track
                                  </button>
                                </td>
                              </tr>
                        )}
                          </tbody>
                        </table>
                      </div>
                    </div>
                }
                </motion.div>
              }

              {/* RETURNS TAB */}
              {activeTab === 'returns' &&
              <motion.div
                key="returns"
                initial={{
                  opacity: 0,
                  y: 10
                }}
                animate={{
                  opacity: 1,
                  y: 0
                }}
                exit={{
                  opacity: 0,
                  y: -10
                }}>
                
                  <div className="flex justify-between items-center mb-6">
                    <h1 className="font-display text-3xl font-bold text-gray-900">
                      Returns & Refunds
                    </h1>
                    <button className="px-4 py-2 bg-nature-600 text-white rounded-lg text-sm font-medium hover:bg-nature-700 transition-colors">
                      Request Return
                    </button>
                  </div>

                  <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
                    {sampleReturns.length > 0 ?
                  <div className="divide-y divide-gray-100">
                        {sampleReturns.map((req) =>
                    <div key={req.id} className="p-6">
                            <div className="flex justify-between items-start mb-4">
                              <div>
                                <h3 className="font-medium text-gray-900">
                                  Return for Order {req.orderId}
                                </h3>
                                <p className="text-sm text-gray-500 mt-1">
                                  Requested on{' '}
                                  {req.createdAt.toLocaleDateString()}
                                </p>
                              </div>
                              <span
                          className={`px-3 py-1 rounded-full text-xs font-medium ${req.status === 'approved' ? 'bg-green-100 text-green-700' : req.status === 'rejected' ? 'bg-red-100 text-red-700' : 'bg-yellow-100 text-yellow-700'}`}>
                          
                                {req.status.charAt(0).toUpperCase() +
                          req.status.slice(1)}
                              </span>
                            </div>
                            <div className="bg-gray-50 p-4 rounded-xl text-sm text-gray-600">
                              <span className="font-medium text-gray-900">
                                Reason:{' '}
                              </span>
                              {req.reason}
                            </div>
                          </div>
                    )}
                      </div> :

                  <div className="p-12 text-center text-gray-500">
                        <RefreshCcwIcon
                      size={48}
                      className="mx-auto mb-4 text-gray-300" />
                    
                        <p>You have no return requests.</p>
                      </div>
                  }
                  </div>
                </motion.div>
              }

              {/* SETTINGS TAB */}
              {activeTab === 'settings' &&
              <motion.div
                key="settings"
                initial={{
                  opacity: 0,
                  y: 10
                }}
                animate={{
                  opacity: 1,
                  y: 0
                }}
                exit={{
                  opacity: 0,
                  y: -10
                }}>
                
                  <h1 className="font-display text-3xl font-bold text-gray-900 mb-6">
                    Account Settings
                  </h1>

                  <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-6 lg:p-8 mb-8">
                    <h2 className="text-lg font-semibold text-gray-900 mb-6">
                      Personal Information
                    </h2>
                    <form className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Full Name
                          </label>
                          <input
                          type="text"
                          defaultValue={sampleUser.name}
                          className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-nature-500" />
                        
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Email Address
                          </label>
                          <input
                          type="email"
                          defaultValue={sampleUser.email}
                          className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-nature-500" />
                        
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Phone Number
                          </label>
                          <input
                          type="tel"
                          defaultValue={sampleUser.phone}
                          className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-nature-500" />
                        
                        </div>
                      </div>
                      <button
                      type="button"
                      className="px-6 py-2.5 bg-nature-600 text-white rounded-xl font-medium hover:bg-nature-700 transition-colors">
                      
                        Save Changes
                      </button>
                    </form>
                  </div>

                  <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-6 lg:p-8">
                    <div className="flex justify-between items-center mb-6">
                      <h2 className="text-lg font-semibold text-gray-900">
                        Saved Addresses
                      </h2>
                      <button className="text-sm font-medium text-nature-600 hover:text-nature-700">
                        Add New
                      </button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {sampleUser.addresses.map((addr, idx) =>
                    <div
                      key={idx}
                      className="border border-gray-200 rounded-xl p-4 relative">
                      
                          <div className="absolute top-4 right-4 flex gap-2">
                            <button className="text-gray-400 hover:text-nature-600 text-sm font-medium">
                              Edit
                            </button>
                          </div>
                          <div className="flex items-start gap-3">
                            <MapPinIcon
                          size={20}
                          className="text-nature-500 mt-0.5 shrink-0" />
                        
                            <div>
                              <p className="font-medium text-gray-900 mb-1">
                                {addr.fullName}
                              </p>
                              <p className="text-sm text-gray-600">
                                {addr.addressLine1}
                              </p>
                              {addr.addressLine2 &&
                          <p className="text-sm text-gray-600">
                                  {addr.addressLine2}
                                </p>
                          }
                              <p className="text-sm text-gray-600">
                                {addr.city}, {addr.district} {addr.postalCode}
                              </p>
                              <p className="text-sm text-gray-500 mt-2">
                                {addr.phone}
                              </p>
                            </div>
                          </div>
                        </div>
                    )}
                    </div>
                  </div>
                </motion.div>
              }
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>);

}