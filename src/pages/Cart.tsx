import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Trash2Icon,
  PlusIcon,
  MinusIcon,
  ArrowRightIcon,
  ShoppingBagIcon,
  ClockIcon,
  ShieldCheckIcon } from
'lucide-react';
import { useCart } from '../contexts/CartContext';
export function Cart() {
  const { items, updateQuantity, removeFromCart, subtotal } = useCart();
  const navigate = useNavigate();
  const [now, setNow] = useState(new Date());
  // Update timer every second
  useEffect(() => {
    if (items.length === 0) return;
    const interval = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(interval);
  }, [items.length]);
  const formatTimeLeft = (expiryDate?: Date) => {
    if (!expiryDate) return null;
    const diff = expiryDate.getTime() - now.getTime();
    if (diff <= 0) return 'Expired';
    const minutes = Math.floor(diff / 60000);
    const seconds = Math.floor(diff % 60000 / 1000);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };
  const deliveryFee = subtotal > 5000 ? 0 : 450;
  const total = subtotal + deliveryFee;
  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-cream pt-32 pb-20 flex items-center justify-center">
        <div className="text-center max-w-md px-4">
          <div className="w-32 h-32 bg-white rounded-full flex items-center justify-center mx-auto mb-8 shadow-soft">
            <ShoppingBagIcon size={48} className="text-nature-300" />
          </div>
          <h1 className="font-display text-4xl font-bold text-gray-900 mb-4">
            Your cart is empty
          </h1>
          <p className="text-gray-500 mb-8 text-lg">
            Looks like you haven't added any beautiful plants to your cart yet.
            Let's change that!
          </p>
          <Link
            to="/shop"
            className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-nature-600 text-white rounded-xl font-medium hover:bg-nature-700 transition-colors shadow-soft hover:shadow-soft-lg w-full sm:w-auto">
            
            Start Shopping <ArrowRightIcon size={20} />
          </Link>
        </div>
      </div>);

  }
  return (
    <div className="min-h-screen bg-cream pt-24 pb-20">
      <div className="container mx-auto px-4">
        <h1 className="font-display text-4xl font-bold text-gray-900 mb-8">
          Shopping Cart
        </h1>

        <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
          {/* Cart Items */}
          <div className="lg:w-2/3">
            <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
              {/* Header */}
              <div className="hidden sm:grid grid-cols-12 gap-4 p-6 border-b border-gray-100 text-sm font-medium text-gray-500 uppercase tracking-wider bg-gray-50/50">
                <div className="col-span-6">Product</div>
                <div className="col-span-3 text-center">Quantity</div>
                <div className="col-span-3 text-right">Total</div>
              </div>

              {/* Items */}
              <div className="divide-y divide-gray-100">
                {items.map((item) =>
                <motion.div
                  layout
                  initial={{
                    opacity: 0
                  }}
                  animate={{
                    opacity: 1
                  }}
                  exit={{
                    opacity: 0
                  }}
                  key={item.plant.id}
                  className="p-6 flex flex-col sm:grid sm:grid-cols-12 gap-6 items-center">
                  
                    {/* Product Info */}
                    <div className="col-span-6 flex items-center gap-4 w-full">
                      <Link
                      to={`/product/${item.plant.id}`}
                      className="w-24 h-24 rounded-2xl overflow-hidden bg-nature-50 shrink-0 border border-gray-100">
                      
                        <img
                        src={item.plant.image}
                        alt={item.plant.name}
                        className="w-full h-full object-cover hover:scale-110 transition-transform duration-500" />
                      
                      </Link>
                      <div className="flex-1">
                        <Link to={`/product/${item.plant.id}`}>
                          <h3 className="font-display font-semibold text-lg text-gray-900 hover:text-nature-600 transition-colors line-clamp-1">
                            {item.plant.name}
                          </h3>
                        </Link>
                        <p className="text-sm text-gray-500 mb-2">
                          {item.plant.category}
                        </p>
                        <div className="text-sm font-medium text-gray-900 sm:hidden">
                          Rs. {item.plant.price.toLocaleString()}
                        </div>

                        {/* Timer */}
                        {item.reservationExpiry &&
                      <div className="inline-flex items-center gap-1.5 px-2 py-1 bg-earth-50 text-earth-600 rounded-md text-xs font-medium mt-1">
                            <ClockIcon size={12} />
                            Reserved: {formatTimeLeft(item.reservationExpiry)}
                          </div>
                      }
                      </div>
                    </div>

                    {/* Quantity */}
                    <div className="col-span-3 flex items-center justify-between sm:justify-center w-full sm:w-auto">
                      <div className="flex items-center gap-3 bg-gray-50 rounded-xl p-1.5 border border-gray-200">
                        <button
                        onClick={() =>
                        updateQuantity(item.plant.id, item.quantity - 1)
                        }
                        className="w-8 h-8 flex items-center justify-center text-gray-500 hover:text-nature-600 hover:bg-white rounded-lg transition-colors shadow-sm">
                        
                          <MinusIcon size={16} />
                        </button>
                        <span className="font-medium w-6 text-center">
                          {item.quantity}
                        </span>
                        <button
                        onClick={() =>
                        updateQuantity(item.plant.id, item.quantity + 1)
                        }
                        disabled={item.quantity >= item.plant.stock}
                        className="w-8 h-8 flex items-center justify-center text-gray-500 hover:text-nature-600 hover:bg-white rounded-lg transition-colors shadow-sm disabled:opacity-50">
                        
                          <PlusIcon size={16} />
                        </button>
                      </div>
                    </div>

                    {/* Total & Remove */}
                    <div className="col-span-3 flex items-center justify-between sm:justify-end w-full sm:w-auto gap-4">
                      <span className="font-semibold text-lg text-nature-900 hidden sm:block">
                        Rs.{' '}
                        {(item.plant.price * item.quantity).toLocaleString()}
                      </span>
                      <button
                      onClick={() => removeFromCart(item.plant.id)}
                      className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-full transition-colors"
                      title="Remove item">
                      
                        <Trash2Icon size={20} />
                      </button>
                    </div>
                  </motion.div>
                )}
              </div>
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:w-1/3">
            <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-6 lg:p-8 sticky top-24">
              <h2 className="font-display text-2xl font-bold text-gray-900 mb-6">
                Order Summary
              </h2>

              <div className="space-y-4 mb-6">
                <div className="flex justify-between text-gray-600">
                  <span>Subtotal ({items.length} items)</span>
                  <span className="font-medium text-gray-900">
                    Rs. {subtotal.toLocaleString()}
                  </span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Delivery Fee</span>
                  <span className="font-medium text-gray-900">
                    {deliveryFee === 0 ?
                    <span className="text-nature-600">Free</span> :

                    `Rs. ${deliveryFee.toLocaleString()}`
                    }
                  </span>
                </div>
                {deliveryFee > 0 &&
                <div className="text-xs text-nature-600 bg-nature-50 p-2 rounded-lg">
                    Add Rs. {(5000 - subtotal).toLocaleString()} more to get
                    free delivery!
                  </div>
                }
              </div>

              <div className="h-px bg-gray-100 mb-6"></div>

              <div className="flex justify-between items-end mb-8">
                <span className="text-lg font-medium text-gray-900">Total</span>
                <span className="font-display text-3xl font-bold text-nature-900">
                  Rs. {total.toLocaleString()}
                </span>
              </div>

              <button
                onClick={() => navigate('/checkout')}
                className="w-full py-4 bg-nature-600 text-white rounded-xl font-medium hover:bg-nature-700 transition-colors shadow-soft hover:shadow-soft-lg flex items-center justify-center gap-2 text-lg mb-4">
                
                Proceed to Checkout <ArrowRightIcon size={20} />
              </button>

              <div className="flex items-center justify-center gap-2 text-sm text-gray-500">
                <ShieldCheckIcon size={16} className="text-nature-500" />
                Secure checkout guaranteed
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>);

}