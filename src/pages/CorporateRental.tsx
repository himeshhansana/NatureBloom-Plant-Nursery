import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  CalendarIcon,
  MapPinIcon,
  PhoneIcon,
  MailIcon,
  PlusIcon,
  CheckCircleIcon,
  AlertCircleIcon,
  ChevronDownIcon,
  LockIcon
} from 'lucide-react';
import { useRental } from '../contexts/RentalContext';
import { useAuth } from '../contexts/AuthContext';
import { plants } from '../data/mockData';
import { RentalRequest, RentalPlant } from '../data/types';
import { toast } from 'sonner';

export function CorporateRental() {
  const { requests, submitRentalRequest } = useRental();
  const { user, isAuthenticated } = useAuth();
  const [activeTab, setActiveTab] = useState<'submit' | 'requests'>('submit');
  const [selectedPlants, setSelectedPlants] = useState<RentalPlant[]>([]);
  const [formData, setFormData] = useState<{
    userName: string;
    userEmail: string;
    userPhone: string;
    companyName: string;
    rentalPeriod: 'weekly' | 'monthly';
    startDate: string;
    deliveryAddress: {
      addressLine1: string;
      addressLine2: string;
      city: string;
      district: string;
      postalCode: string;
    };
    notes: string;
  }>({
    userName: user?.name || '',
    userEmail: user?.email || '',
    userPhone: user?.phone || '',
    companyName: '',
    rentalPeriod: 'weekly',
    startDate: '',
    deliveryAddress: {
      addressLine1: '',
      addressLine2: '',
      city: '',
      district: '',
      postalCode: ''
    },
    notes: ''
  });

  // Update form data when user logs in
  useEffect(() => {
    if (user) {
      setFormData((prev) => ({
        ...prev,
        userName: user.name,
        userEmail: user.email,
        userPhone: user.phone
      }));
    }
  }, [user]);

  const rentalPrices: Record<string, { weekly: number; monthly: number }> = {
    '1': { weekly: 500, monthly: 1500 },
    '2': { weekly: 300, monthly: 900 },
    '3': { weekly: 800, monthly: 2000 },
    '4': { weekly: 250, monthly: 750 },
    '5': { weekly: 600, monthly: 1800 },
    '6': { weekly: 200, monthly: 600 },
    '7': { weekly: 800, monthly: 2400 },
    '8': { weekly: 150, monthly: 450 },
    '9': { weekly: 200, monthly: 600 },
    '10': { weekly: 1500, monthly: 4000 },
    '11': { weekly: 150, monthly: 450 },
    '12': { weekly: 1000, monthly: 2500 }
  };

  const addPlantToRental = (plantId: string) => {
    const existingPlant = selectedPlants.find((p) => p.plantId === plantId);
    if (existingPlant) {
      setSelectedPlants(
        selectedPlants.map((p) =>
          p.plantId === plantId ? { ...p, quantity: p.quantity + 1 } : p
        )
      );
    } else {
      const prices = rentalPrices[plantId] || { weekly: 100, monthly: 300 };
      setSelectedPlants([
        ...selectedPlants,
        {
          plantId,
          quantity: 1,
          rentalPrice: formData.rentalPeriod === 'weekly' ? prices.weekly : prices.monthly
        }
      ]);
    }
  };

  const removePlantFromRental = (plantId: string) => {
    setSelectedPlants(selectedPlants.filter((p) => p.plantId !== plantId));
  };

  const calculateTotalCost = () => {
    let total = 0;
    selectedPlants.forEach((plant) => {
      const prices = rentalPrices[plant.plantId] || { weekly: 100, monthly: 300 };
      const pricePerUnit =
        formData.rentalPeriod === 'weekly' ? prices.weekly : prices.monthly;
      total += pricePerUnit * plant.quantity;
    });
    return total;
  };

  const handleSubmitRental = (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.userName || !formData.userEmail || !formData.companyName) {
      toast.error('Please fill in all required fields');
      return;
    }

    if (selectedPlants.length === 0) {
      toast.error('Please select at least one plant');
      return;
    }

    const startDate = new Date(formData.startDate);
    const endDate = new Date(startDate);
    if (formData.rentalPeriod === 'weekly') {
      endDate.setDate(endDate.getDate() + 7);
    } else {
      endDate.setMonth(endDate.getMonth() + 1);
    }

    const newRequest: RentalRequest = {
      id: `RNT-${Date.now()}`,
      userId: user?.id || `user-${Date.now()}`,
      userName: formData.userName,
      userEmail: formData.userEmail,
      userPhone: formData.userPhone,
      companyName: formData.companyName,
      plants: selectedPlants,
      rentalPeriod: formData.rentalPeriod,
      startDate,
      endDate,
      totalCost: calculateTotalCost(),
      deliveryAddress: {
        fullName: formData.userName,
        phone: formData.userPhone,
        ...formData.deliveryAddress
      },
      status: 'pending',
      createdAt: new Date(),
      updatedAt: new Date(),
      notes: formData.notes
    };

    submitRentalRequest(newRequest);
    setSelectedPlants([]);
    setFormData({
      userName: '',
      userEmail: '',
      userPhone: '',
      companyName: '',
      rentalPeriod: 'weekly',
      startDate: '',
      deliveryAddress: {
        addressLine1: '',
        addressLine2: '',
        city: '',
        district: '',
        postalCode: ''
      },
      notes: ''
    });
    setActiveTab('requests');
  };

  const getStatusColor = (status: RentalRequest['status']) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'approved':
        return 'bg-green-100 text-green-800';
      case 'rejected':
        return 'bg-red-100 text-red-800';
      case 'in-rental':
        return 'bg-blue-100 text-blue-800';
      case 'returned':
        return 'bg-gray-100 text-gray-800';
      case 'damage-assessed':
        return 'bg-orange-100 text-orange-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-white py-6 sm:py-8 md:py-12 px-3 sm:px-4 md:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8 sm:mb-10 md:mb-12"
        >
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-2 sm:mb-3 md:mb-4">
            Corporate Plant Rental
          </h1>
          <p className="text-sm sm:text-base md:text-lg lg:text-xl text-gray-600">
            Rent beautiful plants for your office, hotel, or event
          </p>
        </motion.div>

        {/* Login Required Alert */}
        {!isAuthenticated ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="w-full mb-8 md:mb-12"
          >
            <div className="bg-blue-50 border-2 border-blue-200 rounded-xl sm:rounded-2xl p-4 sm:p-6 md:p-8 text-center">
              <LockIcon size={40} className="mx-auto text-blue-600 mb-3 sm:mb-4" />
              <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900 mb-2 sm:mb-3">
                Login Required
              </h2>
              <p className="text-sm sm:text-base text-gray-700 mb-4 sm:mb-6">
                Please log in to your account to submit a plant rental request. Your details will be automatically filled when you sign in.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
                <Link
                  to="/login"
                  className="px-6 sm:px-8 py-2.5 sm:py-3 bg-green-600 text-white rounded-lg font-semibold hover:bg-green-700 transition-all text-sm sm:text-base"
                >
                  Sign In
                </Link>
                <Link
                  to="/register"
                  className="px-6 sm:px-8 py-2.5 sm:py-3 bg-white text-green-600 border-2 border-green-600 rounded-lg font-semibold hover:bg-green-50 transition-all text-sm sm:text-base"
                >
                  Create Account
                </Link>
              </div>
            </div>
          </motion.div>
        ) : null}

        {/* Tabs - Only show if authenticated */}
        {isAuthenticated && (
          <div className="flex gap-2 sm:gap-3 md:gap-4 mb-6 sm:mb-8 flex-wrap justify-center sm:justify-start">
            {['submit', 'requests'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab as any)}
                className={`px-4 sm:px-6 py-2 sm:py-3 rounded-lg font-semibold transition-all text-xs sm:text-sm md:text-base ${
                  activeTab === tab
                    ? 'bg-green-600 text-white shadow-lg'
                    : 'bg-white text-gray-700 border-2 border-gray-200 hover:border-green-600'
                }`}
              >
                {tab === 'submit' && 'Request Rental'}
                {tab === 'requests' && 'My Rentals'}
              </button>
            ))}
          </div>
        )}

        {/* Content */}
        {isAuthenticated && activeTab === 'submit' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="w-full"
          >
            <div className="bg-white rounded-xl sm:rounded-2xl shadow-lg p-4 sm:p-6 md:p-8">
              <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900 mb-4 sm:mb-6">Submit Rental Request</h2>

              {/* Available Plants Section */}
              <div className="mb-6 sm:mb-8 pb-6 sm:pb-8 border-b border-gray-200">
                <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-3 sm:mb-4">
                  Browse & Select Plants for Rental
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
                  {plants.map((plant) => (
                    <div
                      key={plant.id}
                      className="bg-green-50 rounded-lg overflow-hidden border border-green-200 hover:border-green-500 transition-all flex flex-col"
                    >
                      <img
                        src={plant.image}
                        alt={plant.name}
                        className="w-full h-24 sm:h-28 md:h-32 object-cover"
                      />
                      <div className="p-3 sm:p-4 flex flex-col flex-grow">
                        <h4 className="font-semibold text-gray-900 mb-1 text-xs sm:text-sm line-clamp-2">{plant.name}</h4>
                        <p className="text-xs text-gray-600 mb-2 sm:mb-3 line-clamp-1">{plant.scientificName}</p>
                        <div className="flex flex-col gap-1 mb-2 sm:mb-3 text-xs">
                          <span className="bg-white px-2 py-1 rounded text-gray-700">
                            Weekly: Rs. {rentalPrices[plant.id]?.weekly || 100}
                          </span>
                          <span className="bg-white px-2 py-1 rounded text-gray-700">
                            Monthly: Rs. {rentalPrices[plant.id]?.monthly || 300}
                          </span>
                        </div>
                        <button
                          type="button"
                          onClick={() => addPlantToRental(plant.id)}
                          disabled={plant.rentalStock === 0}
                          className="mt-auto w-full bg-green-600 hover:bg-green-700 disabled:bg-gray-400 text-white text-xs sm:text-sm font-semibold py-2 rounded transition-all"
                        >
                          {plant.rentalStock === 0 ? 'Out of Stock' : 'Add to Request'}
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <form onSubmit={handleSubmitRental} className="space-y-4 sm:space-y-6">
                {/* Company Info */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                  <div>
                    <label className="block text-xs sm:text-sm font-semibold text-gray-700 mb-1.5 sm:mb-2">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      value={formData.userName}
                      onChange={(e) =>
                        setFormData({ ...formData, userName: e.target.value })
                      }
                      className="w-full px-3 sm:px-4 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                    />
                  </div>
                  <div>
                    <label className="block text-xs sm:text-sm font-semibold text-gray-700 mb-1.5 sm:mb-2">
                      Company Name *
                    </label>
                    <input
                      type="text"
                      value={formData.companyName}
                      onChange={(e) =>
                        setFormData({ ...formData, companyName: e.target.value })
                      }
                      className="w-full px-3 sm:px-4 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                  <div>
                    <label className="block text-xs sm:text-sm font-semibold text-gray-700 mb-1.5 sm:mb-2">
                      Email *
                    </label>
                    <input
                      type="email"
                      value={formData.userEmail}
                      onChange={(e) =>
                        setFormData({ ...formData, userEmail: e.target.value })
                      }
                      className="w-full px-3 sm:px-4 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                    />
                  </div>
                  <div>
                    <label className="block text-xs sm:text-sm font-semibold text-gray-700 mb-1.5 sm:mb-2">
                      Phone
                    </label>
                    <input
                      type="tel"
                      value={formData.userPhone}
                      onChange={(e) =>
                        setFormData({ ...formData, userPhone: e.target.value })
                      }
                      className="w-full px-3 sm:px-4 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                    />
                  </div>
                </div>

                {/* Rental Details */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                  <div>
                    <label className="block text-xs sm:text-sm font-semibold text-gray-700 mb-1.5 sm:mb-2">
                      Rental Period *
                    </label>
                    <select
                      value={formData.rentalPeriod}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          rentalPeriod: e.target.value as 'weekly' | 'monthly'
                        })
                      }
                      className="w-full px-3 sm:px-4 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                    >
                      <option value="weekly">Weekly</option>
                      <option value="monthly">Monthly</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs sm:text-sm font-semibold text-gray-700 mb-1.5 sm:mb-2">
                      Start Date *
                    </label>
                    <input
                      type="date"
                      value={formData.startDate}
                      onChange={(e) =>
                        setFormData({ ...formData, startDate: e.target.value })
                      }
                      className="w-full px-3 sm:px-4 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                    />
                  </div>
                </div>

                {/* Delivery Address */}
                <div>
                  <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-3 sm:mb-4">
                    Delivery Address
                  </h3>
                  <div className="space-y-3 sm:space-y-4">
                    <input
                      type="text"
                      placeholder="Address Line 1 *"
                      value={formData.deliveryAddress.addressLine1}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          deliveryAddress: {
                            ...formData.deliveryAddress,
                            addressLine1: e.target.value
                          }
                        })
                      }
                      className="w-full px-3 sm:px-4 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                    />
                    <input
                      type="text"
                      placeholder="Address Line 2"
                      value={formData.deliveryAddress.addressLine2}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          deliveryAddress: {
                            ...formData.deliveryAddress,
                            addressLine2: e.target.value
                          }
                        })
                      }
                      className="w-full px-3 sm:px-4 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                    />
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
                      <input
                        type="text"
                        placeholder="City *"
                        value={formData.deliveryAddress.city}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            deliveryAddress: {
                              ...formData.deliveryAddress,
                              city: e.target.value
                            }
                          })
                        }
                        className="w-full px-3 sm:px-4 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                      />
                      <input
                        type="text"
                        placeholder="District *"
                        value={formData.deliveryAddress.district}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            deliveryAddress: {
                              ...formData.deliveryAddress,
                              district: e.target.value
                            }
                          })
                        }
                        className="w-full px-3 sm:px-4 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                      />
                      <input
                        type="text"
                        placeholder="Postal Code"
                        value={formData.deliveryAddress.postalCode}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            deliveryAddress: {
                              ...formData.deliveryAddress,
                              postalCode: e.target.value
                            }
                          })
                        }
                        className="w-full px-3 sm:px-4 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                      />
                    </div>
                  </div>
                </div>

                {/* Notes */}
                <div>
                  <label className="block text-xs sm:text-sm font-semibold text-gray-700 mb-1.5 sm:mb-2">
                    Additional Notes
                  </label>
                  <textarea
                    value={formData.notes}
                    onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                    rows={3}
                    className="w-full px-3 sm:px-4 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                    placeholder="Any special requirements or notes..."
                  />
                </div>

                {/* Selected Plants */}
                {selectedPlants.length > 0 && (
                  <div className="bg-green-50 rounded-lg p-3 sm:p-4">
                    <h3 className="font-semibold text-gray-900 mb-3 text-sm sm:text-base">Selected Plants</h3>
                    <div className="space-y-2">
                      {selectedPlants.map((plant) => {
                        const plantData = plants.find((p) => p.id === plant.plantId);
                        return (
                          <div
                            key={plant.plantId}
                            className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 bg-white p-2.5 sm:p-3 rounded-lg"
                          >
                            <span className="text-xs sm:text-sm text-gray-700">
                              {plantData?.name} x {plant.quantity}
                            </span>
                            <div className="flex items-center gap-2 w-full sm:w-auto justify-between sm:justify-end">
                              <span className="font-semibold text-xs sm:text-sm text-green-600">
                                Rs. {plant.rentalPrice * plant.quantity}
                              </span>
                              <button
                                type="button"
                                onClick={() => removePlantFromRental(plant.plantId)}
                                className="text-red-600 hover:text-red-700 text-lg sm:text-base"
                              >
                                ✕
                              </button>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                    <div className="mt-3 sm:mt-4 pt-3 sm:pt-4 border-t border-green-200">
                      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
                        <span className="font-bold text-xs sm:text-sm text-gray-900">Total Cost:</span>
                        <span className="text-lg sm:text-2xl font-bold text-green-600">
                          Rs. {calculateTotalCost().toLocaleString()}
                        </span>
                      </div>
                    </div>
                  </div>
                )}

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={selectedPlants.length === 0}
                  className="w-full bg-green-600 hover:bg-green-700 disabled:bg-gray-400 text-white font-bold py-2.5 sm:py-3 px-3 sm:px-4 rounded-lg transition-all flex items-center justify-center gap-2 text-sm sm:text-base"
                >
                  <CheckCircleIcon size={18} className="hidden sm:inline" />
                  <CheckCircleIcon size={16} className="inline sm:hidden" />
                  Submit Rental Request
                </button>
              </form>
            </div>
          </motion.div>
        )}

        {isAuthenticated && activeTab === 'requests' && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-3 sm:space-y-4">
            {requests.filter((req) => req.userId === user?.id).length === 0 ? (
              <div className="text-center py-8 sm:py-12 bg-white rounded-xl sm:rounded-2xl">
                <AlertCircleIcon
                  size={36}
                  className="mx-auto text-gray-400 mb-2 sm:mb-4 sm:w-12 sm:h-12"
                />
                <p className="text-sm sm:text-lg text-gray-600">No rental requests yet</p>
              </div>
            ) : (
              requests.filter((req) => req.userId === user?.id).map((request) => (
                <div
                  key={request.id}
                  className="bg-white rounded-xl sm:rounded-2xl shadow-lg p-4 sm:p-6 hover:shadow-xl transition-all"
                >
                  <div className="flex flex-col sm:flex-row justify-between items-start gap-2 sm:gap-4 mb-3 sm:mb-4">
                    <div className="flex-1">
                      <h3 className="text-base sm:text-xl font-bold text-gray-900">{request.companyName}</h3>
                      <p className="text-xs sm:text-sm text-gray-600">ID: {request.id}</p>
                    </div>
                    <span
                      className={`px-2.5 sm:px-3 py-1 rounded-full text-xs sm:text-sm font-semibold whitespace-nowrap ${getStatusColor(request.status)}`}
                    >
                      {request.status.charAt(0).toUpperCase() +
                        request.status.slice(1)}
                    </span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-4 mb-3 sm:mb-4">
                    <div className="flex items-start sm:items-center gap-2 text-xs sm:text-base text-gray-700">
                      <CalendarIcon size={16} className="flex-shrink-0 mt-0.5 sm:mt-0" />
                      <span className="line-clamp-2">
                        {request.startDate.toLocaleDateString()} -{' '}
                        {request.endDate.toLocaleDateString()}
                      </span>
                    </div>
                    <div className="flex items-start sm:items-center gap-2 text-xs sm:text-base text-gray-700">
                      <MapPinIcon size={16} className="flex-shrink-0 mt-0.5 sm:mt-0" />
                      <span>{request.deliveryAddress.city}</span>
                    </div>
                    <div className="flex items-start sm:items-center gap-2 text-xs sm:text-base text-gray-700">
                      <PhoneIcon size={16} className="flex-shrink-0 mt-0.5 sm:mt-0" />
                      <span className="break-all">{request.userPhone}</span>
                    </div>
                    <div className="flex items-start sm:items-center gap-2 text-xs sm:text-base text-gray-700">
                      <MailIcon size={16} className="flex-shrink-0 mt-0.5 sm:mt-0" />
                      <span className="truncate">{request.userEmail}</span>
                    </div>
                  </div>

                  {request.assignedDeliveryPerson && (
                    <div className="mb-3 sm:mb-4 p-2 sm:p-3 bg-blue-50 rounded-lg">
                      <p className="text-xs sm:text-sm font-semibold text-blue-900">
                        Delivery Person: {request.assignedDeliveryPerson}
                      </p>
                    </div>
                  )}

                  <div className="mb-3 sm:mb-4">
                    <h4 className="font-semibold text-gray-900 mb-2 text-xs sm:text-sm">Plants</h4>
                    <div className="space-y-1">
                      {request.plants.map((plant) => {
                        const plantData = plants.find((p) => p.id === plant.plantId);
                        return (
                          <div
                            key={plant.plantId}
                            className="text-xs sm:text-sm text-gray-700 flex flex-col sm:flex-row justify-between"
                          >
                            <span>
                              {plantData?.name} x {plant.quantity}
                            </span>
                            <span className="text-green-600 font-semibold">Rs. {plant.rentalPrice * plant.quantity}</span>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  <div className="pt-3 sm:pt-4 border-t border-gray-200 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
                    <span className="font-semibold text-xs sm:text-sm text-gray-900">Total:</span>
                    <span className="text-lg sm:text-2xl font-bold text-green-600">
                      Rs. {request.totalCost.toLocaleString()}
                    </span>
                  </div>
                </div>
              ))
            )}
          </motion.div>
        )}
      </div>
    </div>
  );
}
