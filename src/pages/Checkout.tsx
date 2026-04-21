import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  ShieldCheckIcon,
  TruckIcon,
  CreditCardIcon,
  ChevronLeftIcon,
  CheckCircleIcon } from
'lucide-react';
import { useCart } from '../contexts/CartContext';
import { toast } from 'sonner';
export function Checkout() {
  const { items, subtotal, clearCart } = useCart();
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    district: 'Colombo',
    postalCode: '',
    paymentMethod: 'cod'
  });
  const deliveryFee = subtotal > 5000 ? 0 : 450;
  const total = subtotal + deliveryFee;
  const districts = [
  'Colombo',
  'Gampaha',
  'Kalutara',
  'Kandy',
  'Matale',
  'Nuwara Eliya',
  'Galle',
  'Matara',
  'Hambantota',
  'Jaffna',
  'Kilinochchi',
  'Mannar',
  'Vavuniya',
  'Mullaitivu',
  'Batticaloa',
  'Ampara',
  'Trincomalee',
  'Kurunegala',
  'Puttalam',
  'Anuradhapura',
  'Polonnaruwa',
  'Badulla',
  'Moneragala',
  'Ratnapura',
  'Kegalle'];

  const handleInputChange = (
  e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) =>
  {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
      clearCart();
      toast.success('Order placed successfully!');
    }, 2000);
  };
  if (items.length === 0 && !isSuccess) {
    navigate('/cart');
    return null;
  }
  if (isSuccess) {
    return (
      <div className="min-h-screen bg-cream pt-32 pb-20 flex items-center justify-center">
        <motion.div
          initial={{
            opacity: 0,
            scale: 0.9
          }}
          animate={{
            opacity: 1,
            scale: 1
          }}
          className="bg-white p-10 rounded-3xl shadow-glass-lg max-w-lg w-full text-center border border-gray-100">
          
          <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6 text-green-500">
            <CheckCircleIcon size={48} />
          </div>
          <h1 className="font-display text-4xl font-bold text-gray-900 mb-4">
            Order Confirmed!
          </h1>
          <p className="text-gray-600 mb-8 text-lg">
            Thank you for your purchase. Your order{' '}
            <span className="font-semibold text-gray-900">
              #NB-{Math.floor(Math.random() * 10000)}
            </span>{' '}
            has been received and is being processed.
          </p>
          <p className="text-sm text-gray-500 mb-8 bg-gray-50 p-4 rounded-xl">
            We've sent a confirmation email to {formData.email} with your order
            details and tracking information.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/dashboard/orders"
              className="px-6 py-3 bg-nature-600 text-white rounded-xl font-medium hover:bg-nature-700 transition-colors">
              
              Track Order
            </Link>
            <Link
              to="/shop"
              className="px-6 py-3 border border-gray-200 text-gray-700 rounded-xl font-medium hover:bg-gray-50 transition-colors">
              
              Continue Shopping
            </Link>
          </div>
        </motion.div>
      </div>);

  }
  return (
    <div className="min-h-screen bg-cream pt-24 pb-20">
      <div className="container mx-auto px-4 max-w-6xl">
        <Link
          to="/cart"
          className="inline-flex items-center gap-2 text-gray-500 hover:text-nature-600 transition-colors mb-8 font-medium">
          
          <ChevronLeftIcon size={20} /> Back to Cart
        </Link>

        <h1 className="font-display text-4xl font-bold text-gray-900 mb-8">
          Checkout
        </h1>

        <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
          {/* Checkout Form */}
          <div className="lg:w-2/3">
            <form onSubmit={handleSubmit} className="space-y-8">
              {/* Contact Info */}
              <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-6 lg:p-8">
                <h2 className="font-display text-2xl font-semibold text-gray-900 mb-6 flex items-center gap-3">
                  <span className="w-8 h-8 rounded-full bg-nature-100 text-nature-600 flex items-center justify-center text-sm font-bold">
                    1
                  </span>
                  Contact Information
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      First Name
                    </label>
                    <input
                      type="text"
                      name="firstName"
                      required
                      value={formData.firstName}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-nature-500 focus:bg-white transition-colors" />
                    
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Last Name
                    </label>
                    <input
                      type="text"
                      name="lastName"
                      required
                      value={formData.lastName}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-nature-500 focus:bg-white transition-colors" />
                    
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Email Address
                    </label>
                    <input
                      type="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-nature-500 focus:bg-white transition-colors" />
                    
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      required
                      placeholder="+94 7X XXX XXXX"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-nature-500 focus:bg-white transition-colors" />
                    
                  </div>
                </div>
              </div>

              {/* Shipping Address */}
              <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-6 lg:p-8">
                <h2 className="font-display text-2xl font-semibold text-gray-900 mb-6 flex items-center gap-3">
                  <span className="w-8 h-8 rounded-full bg-nature-100 text-nature-600 flex items-center justify-center text-sm font-bold">
                    2
                  </span>
                  Shipping Address
                </h2>
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Street Address
                    </label>
                    <input
                      type="text"
                      name="address"
                      required
                      value={formData.address}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-nature-500 focus:bg-white transition-colors" />
                    
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        City
                      </label>
                      <input
                        type="text"
                        name="city"
                        required
                        value={formData.city}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-nature-500 focus:bg-white transition-colors" />
                      
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        District
                      </label>
                      <select
                        name="district"
                        required
                        value={formData.district}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-nature-500 focus:bg-white transition-colors appearance-none">
                        
                        {districts.map((d) =>
                        <option key={d} value={d}>
                            {d}
                          </option>
                        )}
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Postal Code
                      </label>
                      <input
                        type="text"
                        name="postalCode"
                        required
                        value={formData.postalCode}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-nature-500 focus:bg-white transition-colors" />
                      
                    </div>
                  </div>
                </div>
              </div>

              {/* Payment Method */}
              <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-6 lg:p-8">
                <h2 className="font-display text-2xl font-semibold text-gray-900 mb-6 flex items-center gap-3">
                  <span className="w-8 h-8 rounded-full bg-nature-100 text-nature-600 flex items-center justify-center text-sm font-bold">
                    3
                  </span>
                  Payment Method
                </h2>
                <div className="space-y-4">
                  <label
                    className={`flex items-center p-4 border rounded-2xl cursor-pointer transition-all ${formData.paymentMethod === 'cod' ? 'border-nature-500 bg-nature-50/50' : 'border-gray-200 hover:border-gray-300'}`}>
                    
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="cod"
                      checked={formData.paymentMethod === 'cod'}
                      onChange={handleInputChange}
                      className="w-5 h-5 text-nature-600 focus:ring-nature-500 border-gray-300" />
                    
                    <div className="ml-4 flex-1">
                      <span className="block font-medium text-gray-900">
                        Cash on Delivery
                      </span>
                      <span className="block text-sm text-gray-500">
                        Pay when you receive your order
                      </span>
                    </div>
                    <TruckIcon size={24} className="text-gray-400" />
                  </label>

                  <label
                    className={`flex items-center p-4 border rounded-2xl cursor-pointer transition-all ${formData.paymentMethod === 'bank' ? 'border-nature-500 bg-nature-50/50' : 'border-gray-200 hover:border-gray-300'}`}>
                    
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="bank"
                      checked={formData.paymentMethod === 'bank'}
                      onChange={handleInputChange}
                      className="w-5 h-5 text-nature-600 focus:ring-nature-500 border-gray-300" />
                    
                    <div className="ml-4 flex-1">
                      <span className="block font-medium text-gray-900">
                        Bank Transfer
                      </span>
                      <span className="block text-sm text-gray-500">
                        Direct transfer to our account
                      </span>
                    </div>
                    <CreditCardIcon size={24} className="text-gray-400" />
                  </label>
                </div>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-4 bg-nature-900 text-white rounded-xl font-medium hover:bg-black transition-colors shadow-lg flex items-center justify-center gap-2 text-lg disabled:opacity-70">
                
                {isSubmitting ?
                <span className="flex items-center gap-2">
                    <svg
                    className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24">
                    
                      <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4">
                    </circle>
                      <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z">
                    </path>
                    </svg>
                    Processing Order...
                  </span> :

                <>Place Order - Rs. {total.toLocaleString()}</>
                }
              </button>
            </form>
          </div>

          {/* Order Summary Sidebar */}
          <div className="lg:w-1/3">
            <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-6 lg:p-8 sticky top-24">
              <h2 className="font-display text-2xl font-bold text-gray-900 mb-6">
                Order Summary
              </h2>

              <div className="space-y-4 mb-6 max-h-[40vh] overflow-y-auto custom-scrollbar pr-2">
                {items.map((item) =>
                <div key={item.plant.id} className="flex gap-4 items-center">
                    <div className="w-16 h-16 rounded-xl overflow-hidden bg-nature-50 shrink-0 border border-gray-100 relative">
                      <img
                      src={item.plant.image}
                      alt={item.plant.name}
                      className="w-full h-full object-cover" />
                    
                      <span className="absolute -top-2 -right-2 bg-gray-900 text-white text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center">
                        {item.quantity}
                      </span>
                    </div>
                    <div className="flex-1">
                      <h4 className="font-medium text-gray-900 text-sm line-clamp-1">
                        {item.plant.name}
                      </h4>
                      <p className="text-xs text-gray-500">
                        {item.plant.category}
                      </p>
                    </div>
                    <div className="font-medium text-sm text-gray-900">
                      Rs. {(item.plant.price * item.quantity).toLocaleString()}
                    </div>
                  </div>
                )}
              </div>

              <div className="h-px bg-gray-100 mb-6"></div>

              <div className="space-y-4 mb-6">
                <div className="flex justify-between text-sm text-gray-600">
                  <span>Subtotal</span>
                  <span className="font-medium text-gray-900">
                    Rs. {subtotal.toLocaleString()}
                  </span>
                </div>
                <div className="flex justify-between text-sm text-gray-600">
                  <span>Delivery Fee</span>
                  <span className="font-medium text-gray-900">
                    {deliveryFee === 0 ?
                    'Free' :
                    `Rs. ${deliveryFee.toLocaleString()}`}
                  </span>
                </div>
              </div>

              <div className="h-px bg-gray-100 mb-6"></div>

              <div className="flex justify-between items-end mb-6">
                <span className="text-lg font-medium text-gray-900">Total</span>
                <span className="font-display text-3xl font-bold text-nature-900">
                  Rs. {total.toLocaleString()}
                </span>
              </div>

              <div className="bg-nature-50 rounded-xl p-4 flex items-start gap-3">
                <ShieldCheckIcon
                  size={20}
                  className="text-nature-600 shrink-0 mt-0.5" />
                
                <p className="text-xs text-nature-800 leading-relaxed">
                  Your personal data will be used to process your order, support
                  your experience throughout this website, and for other
                  purposes described in our privacy policy.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>);

}