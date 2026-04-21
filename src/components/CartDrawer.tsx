import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  XIcon,
  Trash2Icon,
  PlusIcon,
  MinusIcon,
  ClockIcon,
  ShoppingBagIcon } from
'lucide-react';
import { useCart } from '../contexts/CartContext';
export function CartDrawer() {
  const {
    isCartOpen,
    setIsCartOpen,
    items,
    updateQuantity,
    removeFromCart,
    subtotal
  } = useCart();
  const [now, setNow] = useState(new Date());
  // Update timer every second
  useEffect(() => {
    if (!isCartOpen || items.length === 0) return;
    const interval = setInterval(() => {
      setNow(new Date());
    }, 1000);
    return () => clearInterval(interval);
  }, [isCartOpen, items.length]);
  // Prevent body scroll when cart is open
  useEffect(() => {
    if (isCartOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isCartOpen]);
  const formatTimeLeft = (expiryDate?: Date) => {
    if (!expiryDate) return null;
    const diff = expiryDate.getTime() - now.getTime();
    if (diff <= 0) return 'Expired';
    const minutes = Math.floor(diff / 60000);
    const seconds = Math.floor(diff % 60000 / 1000);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };
  return (
    <AnimatePresence>
      {isCartOpen &&
      <>
          {/* Backdrop */}
          <motion.div
          initial={{
            opacity: 0
          }}
          animate={{
            opacity: 1
          }}
          exit={{
            opacity: 0
          }}
          onClick={() => setIsCartOpen(false)}
          className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50" />
        

          {/* Drawer */}
          <motion.div
          initial={{
            x: '100%'
          }}
          animate={{
            x: 0
          }}
          exit={{
            x: '100%'
          }}
          transition={{
            type: 'spring',
            damping: 25,
            stiffness: 200
          }}
          className="fixed top-0 right-0 h-full w-full sm:w-[400px] bg-white shadow-2xl z-50 flex flex-col">
          
            {/* Header */}
            <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between bg-nature-50/50">
              <h2 className="font-display font-semibold text-xl text-nature-900 flex items-center gap-2">
                <ShoppingBagIcon size={20} className="text-nature-600" />
                Your Cart
                <span className="bg-nature-200 text-nature-800 text-xs py-0.5 px-2 rounded-full ml-2">
                  {items.length}
                </span>
              </h2>
              <button
              onClick={() => setIsCartOpen(false)}
              className="p-2 text-gray-400 hover:text-gray-600 hover:bg-white rounded-full transition-colors">
              
                <XIcon size={20} />
              </button>
            </div>

            {/* Cart Items */}
            <div className="flex-1 overflow-y-auto p-6">
              {items.length === 0 ?
            <div className="h-full flex flex-col items-center justify-center text-center space-y-4 text-gray-500">
                  <div className="w-24 h-24 bg-nature-50 rounded-full flex items-center justify-center text-nature-300 mb-4">
                    <ShoppingBagIcon size={40} />
                  </div>
                  <p className="font-medium text-lg text-gray-900">
                    Your cart is empty
                  </p>
                  <p className="text-sm max-w-[250px]">
                    Looks like you haven't added any plants to your cart yet.
                  </p>
                  <button
                onClick={() => setIsCartOpen(false)}
                className="mt-4 px-6 py-2.5 bg-nature-600 text-white rounded-xl font-medium hover:bg-nature-700 transition-colors">
                
                    Continue Shopping
                  </button>
                </div> :

            <div className="space-y-6">
                  {/* Reservation Banner */}
                  <div className="bg-earth-50 border border-earth-100 rounded-xl p-3 flex items-start gap-3">
                    <ClockIcon
                  size={18}
                  className="text-earth-300 mt-0.5 shrink-0" />
                
                    <div>
                      <p className="text-sm font-medium text-earth-400">
                        Items reserved for 15 minutes
                      </p>
                      <p className="text-xs text-earth-300 mt-0.5">
                        Checkout soon to secure your plants!
                      </p>
                    </div>
                  </div>

                  {/* Items List */}
                  <div className="space-y-4">
                    {items.map((item) =>
                <div
                  key={item.plant.id}
                  className="flex gap-4 bg-white border border-gray-100 p-3 rounded-2xl shadow-sm">
                  
                        <div className="w-20 h-24 rounded-xl overflow-hidden bg-nature-50 shrink-0">
                          <img
                      src={item.plant.image}
                      alt={item.plant.name}
                      className="w-full h-full object-cover" />
                    
                        </div>

                        <div className="flex-1 flex flex-col">
                          <div className="flex justify-between items-start">
                            <div>
                              <h3 className="font-medium text-gray-900 line-clamp-1">
                                {item.plant.name}
                              </h3>
                              <p className="text-xs text-gray-500">
                                {item.plant.category}
                              </p>
                            </div>
                            <button
                        onClick={() => removeFromCart(item.plant.id)}
                        className="text-gray-400 hover:text-red-500 transition-colors p-1">
                        
                              <Trash2Icon size={16} />
                            </button>
                          </div>

                          <div className="mt-auto flex items-center justify-between">
                            <span className="font-semibold text-nature-900">
                              Rs.{' '}
                              {(
                        item.plant.price * item.quantity).
                        toLocaleString()}
                            </span>

                            <div className="flex items-center gap-3 bg-gray-50 rounded-lg p-1 border border-gray-100">
                              <button
                          onClick={() =>
                          updateQuantity(
                            item.plant.id,
                            item.quantity - 1
                          )
                          }
                          className="w-6 h-6 flex items-center justify-center text-gray-500 hover:text-nature-600 hover:bg-white rounded-md transition-colors">
                          
                                <MinusIcon size={14} />
                              </button>
                              <span className="text-sm font-medium w-4 text-center">
                                {item.quantity}
                              </span>
                              <button
                          onClick={() =>
                          updateQuantity(
                            item.plant.id,
                            item.quantity + 1
                          )
                          }
                          disabled={item.quantity >= item.plant.stock}
                          className="w-6 h-6 flex items-center justify-center text-gray-500 hover:text-nature-600 hover:bg-white rounded-md transition-colors disabled:opacity-50">
                          
                                <PlusIcon size={14} />
                              </button>
                            </div>
                          </div>

                          {/* Timer for this specific item */}
                          {item.reservationExpiry &&
                    <div className="mt-2 text-[10px] font-medium text-earth-300 flex items-center gap-1">
                              <ClockIcon size={10} />
                              Expires in:{' '}
                              {formatTimeLeft(item.reservationExpiry)}
                            </div>
                    }
                        </div>
                      </div>
                )}
                  </div>
                </div>
            }
            </div>

            {/* Footer */}
            {items.length > 0 &&
          <div className="border-t border-gray-100 p-6 bg-white shadow-[0_-10px_40px_rgba(0,0,0,0.05)]">
                <div className="space-y-3 mb-6">
                  <div className="flex justify-between text-sm text-gray-500">
                    <span>Subtotal</span>
                    <span>Rs. {subtotal.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-sm text-gray-500">
                    <span>Shipping</span>
                    <span>Calculated at checkout</span>
                  </div>
                  <div className="h-px bg-gray-100 my-2"></div>
                  <div className="flex justify-between items-center">
                    <span className="font-medium text-gray-900">Total</span>
                    <span className="font-display font-bold text-xl text-nature-900">
                      Rs. {subtotal.toLocaleString()}
                    </span>
                  </div>
                </div>

                <Link
              to="/cart"
              onClick={() => setIsCartOpen(false)}
              className="w-full flex items-center justify-center py-3.5 bg-nature-600 text-white rounded-xl font-medium hover:bg-nature-700 transition-colors shadow-soft hover:shadow-soft-lg">
              
                  View Cart & Checkout
                </Link>
              </div>
          }
          </motion.div>
        </>
      }
    </AnimatePresence>);

}