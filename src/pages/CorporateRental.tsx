import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  CalendarIcon,
  MapPinIcon,
  PhoneIcon,
  MailIcon,
  PlusIcon,
  CheckCircleIcon,
  AlertCircleIcon,
  ChevronDownIcon
} from 'lucide-react';
import { useRental } from '../contexts/RentalContext';
import { plants } from '../data/mockData';
import { RentalRequest, RentalPlant } from '../data/types';
import { toast } from 'sonner';

export function CorporateRental() {
  const { requests, submitRentalRequest } = useRental();
  const [activeTab, setActiveTab] = useState<'browse' | 'submit' | 'requests'>('browse');
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
      userId: `user-${Date.now()}`,
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
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Corporate Plant Rental
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            Rent beautiful plants for your office, hotel, or event
          </p>
        </motion.div>

        {/* Tabs */}
        <div className="flex gap-4 mb-8 flex-wrap">
          {['browse', 'submit', 'requests'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab as any)}
              className={`px-6 py-3 rounded-lg font-semibold transition-all ${
                activeTab === tab
                  ? 'bg-green-600 text-white shadow-lg'
                  : 'bg-white text-gray-700 border-2 border-gray-200 hover:border-green-600'
              }`}
            >
              {tab === 'browse' && 'Browse Plants'}
              {tab === 'submit' && 'Request Rental'}
              {tab === 'requests' && 'My Rentals'}
            </button>
          ))}
        </div>

        {/* Content */}
        {activeTab === 'browse' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {plants.map((plant) => (
              <div
                key={plant.id}
                className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all"
              >
                <img
                  src={plant.image}
                  alt={plant.name}
                  className="w-full h-48 object-cover"
                />
                <div className="p-6">
                  <h3 className="text-lg font-bold text-gray-900 mb-2">{plant.name}</h3>
                  <p className="text-sm text-gray-600 mb-4">{plant.scientificName}</p>

                  <div className="mb-4 pb-4 border-b border-gray-200">
                    <p className="text-sm font-semibold text-gray-700 mb-2">
                      Rental Price
                    </p>
                    <div className="flex gap-4">
                      <div>
                        <span className="text-sm text-gray-600">Weekly</span>
                        <p className="text-xl font-bold text-green-600">
                          Rs. {rentalPrices[plant.id]?.weekly || 100}
                        </p>
                      </div>
                      <div>
                        <span className="text-sm text-gray-600">Monthly</span>
                        <p className="text-xl font-bold text-green-600">
                          Rs. {rentalPrices[plant.id]?.monthly || 300}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="mb-4">
                    <span className="text-sm font-semibold text-green-600">
                      {plant.rentalStock} available for rental
                    </span>
                  </div>

                  <button
                    onClick={() => addPlantToRental(plant.id)}
                    disabled={plant.rentalStock === 0}
                    className="w-full bg-green-600 hover:bg-green-700 disabled:bg-gray-400 text-white font-bold py-2 px-4 rounded-lg transition-all"
                  >
                    Add to Request
                  </button>
                </div>
              </div>
            ))}
          </motion.div>
        )}

        {activeTab === 'submit' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="max-w-2xl mx-auto"
          >
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Submit Rental Request</h2>

              <form onSubmit={handleSubmitRental} className="space-y-6">
                {/* Company Info */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      value={formData.userName}
                      onChange={(e) =>
                        setFormData({ ...formData, userName: e.target.value })
                      }
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Company Name *
                    </label>
                    <input
                      type="text"
                      value={formData.companyName}
                      onChange={(e) =>
                        setFormData({ ...formData, companyName: e.target.value })
                      }
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Email *
                    </label>
                    <input
                      type="email"
                      value={formData.userEmail}
                      onChange={(e) =>
                        setFormData({ ...formData, userEmail: e.target.value })
                      }
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Phone
                    </label>
                    <input
                      type="tel"
                      value={formData.userPhone}
                      onChange={(e) =>
                        setFormData({ ...formData, userPhone: e.target.value })
                      }
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                    />
                  </div>
                </div>

                {/* Rental Details */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
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
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                    >
                      <option value="weekly">Weekly</option>
                      <option value="monthly">Monthly</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Start Date *
                    </label>
                    <input
                      type="date"
                      value={formData.startDate}
                      onChange={(e) =>
                        setFormData({ ...formData, startDate: e.target.value })
                      }
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                    />
                  </div>
                </div>

                {/* Delivery Address */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">
                    Delivery Address
                  </h3>
                  <div className="space-y-4">
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
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
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
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                    />
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
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
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
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
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
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
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                      />
                    </div>
                  </div>
                </div>

                {/* Notes */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Additional Notes
                  </label>
                  <textarea
                    value={formData.notes}
                    onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                    rows={4}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                    placeholder="Any special requirements or notes..."
                  />
                </div>

                {/* Selected Plants */}
                {selectedPlants.length > 0 && (
                  <div className="bg-green-50 rounded-lg p-4">
                    <h3 className="font-semibold text-gray-900 mb-3">Selected Plants</h3>
                    <div className="space-y-2">
                      {selectedPlants.map((plant) => {
                        const plantData = plants.find((p) => p.id === plant.plantId);
                        return (
                          <div
                            key={plant.plantId}
                            className="flex justify-between items-center bg-white p-3 rounded-lg"
                          >
                            <span className="text-gray-700">
                              {plantData?.name} x {plant.quantity}
                            </span>
                            <div className="flex items-center gap-2">
                              <span className="font-semibold text-green-600">
                                Rs. {plant.rentalPrice * plant.quantity}
                              </span>
                              <button
                                type="button"
                                onClick={() => removePlantFromRental(plant.plantId)}
                                className="text-red-600 hover:text-red-700"
                              >
                                ✕
                              </button>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                    <div className="mt-4 pt-4 border-t border-green-200">
                      <div className="flex justify-between items-center">
                        <span className="font-bold text-gray-900">Total Cost:</span>
                        <span className="text-2xl font-bold text-green-600">
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
                  className="w-full bg-green-600 hover:bg-green-700 disabled:bg-gray-400 text-white font-bold py-3 px-4 rounded-lg transition-all flex items-center justify-center gap-2"
                >
                  <CheckCircleIcon size={20} />
                  Submit Rental Request
                </button>
              </form>
            </div>
          </motion.div>
        )}

        {activeTab === 'requests' && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
            {requests.length === 0 ? (
              <div className="text-center py-12 bg-white rounded-2xl">
                <AlertCircleIcon
                  size={48}
                  className="mx-auto text-gray-400 mb-4"
                />
                <p className="text-lg text-gray-600">No rental requests yet</p>
              </div>
            ) : (
              requests.map((request) => (
                <div
                  key={request.id}
                  className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-all"
                >
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="text-xl font-bold text-gray-900">{request.companyName}</h3>
                      <p className="text-sm text-gray-600">ID: {request.id}</p>
                    </div>
                    <span
                      className={`px-3 py-1 rounded-full text-sm font-semibold ${getStatusColor(request.status)}`}
                    >
                      {request.status.charAt(0).toUpperCase() +
                        request.status.slice(1)}
                    </span>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <div className="flex items-center gap-2 text-gray-700">
                      <CalendarIcon size={18} />
                      <span>
                        {request.startDate.toLocaleDateString()} -{' '}
                        {request.endDate.toLocaleDateString()}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-700">
                      <MapPinIcon size={18} />
                      <span>{request.deliveryAddress.city}</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-700">
                      <PhoneIcon size={18} />
                      <span>{request.userPhone}</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-700">
                      <MailIcon size={18} />
                      <span>{request.userEmail}</span>
                    </div>
                  </div>

                  {request.assignedDeliveryPerson && (
                    <div className="mb-4 p-3 bg-blue-50 rounded-lg">
                      <p className="text-sm font-semibold text-blue-900">
                        Delivery Person: {request.assignedDeliveryPerson}
                      </p>
                    </div>
                  )}

                  <div className="mb-4">
                    <h4 className="font-semibold text-gray-900 mb-2">Plants</h4>
                    <div className="space-y-1">
                      {request.plants.map((plant) => {
                        const plantData = plants.find((p) => p.id === plant.plantId);
                        return (
                          <div
                            key={plant.plantId}
                            className="text-sm text-gray-700 flex justify-between"
                          >
                            <span>
                              {plantData?.name} x {plant.quantity}
                            </span>
                            <span>Rs. {plant.rentalPrice * plant.quantity}</span>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  <div className="pt-4 border-t border-gray-200 flex justify-between items-center">
                    <span className="font-semibold text-gray-900">Total:</span>
                    <span className="text-2xl font-bold text-green-600">
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
