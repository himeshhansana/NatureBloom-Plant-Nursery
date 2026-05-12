import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  ShoppingCartIcon,
  SearchIcon,
  UserIcon,
  MenuIcon,
  XIcon,
  LeafIcon } from
'lucide-react';
import { useCart } from '../contexts/CartContext';
import { motion, AnimatePresence } from 'framer-motion';
export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { cartCount, setIsCartOpen } = useCart();
  const location = useLocation();
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  // Close mobile menu on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);
  const navLinks = [
  {
    name: 'Home',
    path: '/'
  },
  {
    name: 'Shop',
    path: '/shop'
  },
  {
    name: 'Packages & Rentals',
    path: '/packages'
  },
  {
    name: 'Plant Care',
    path: '/plant-care'
  },
  {
    name: 'Blog',
    path: '/blog'
  }];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${isScrolled ? 'glass py-3' : 'bg-transparent py-5'}`}>
      
      <div className="container px-4 mx-auto md:px-6">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group">
            <div className="bg-nature-600 text-white p-1.5 rounded-lg group-hover:bg-nature-500 transition-colors">
              <LeafIcon size={24} />
            </div>
            <span className="text-2xl font-bold tracking-tight font-display text-nature-900">
              NatureBloom
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="items-center hidden gap-8 md:flex">
            {navLinks.map((link) =>
            <Link
              key={link.name}
              to={link.path}
              className={`text-sm font-medium transition-colors hover:text-nature-600 ${location.pathname === link.path ? 'text-nature-600' : 'text-gray-600'}`}>
              
                {link.name}
              </Link>
            )}
          </nav>

          {/* Icons */}
          <div className="flex items-center gap-4">
            <Link
              to="/shop"
              className="hidden p-2 text-gray-600 transition-colors hover:text-nature-600 sm:block">
              
              <SearchIcon size={20} />
            </Link>

            <Link
              to="/dashboard"
              className="hidden p-2 text-gray-600 transition-colors hover:text-nature-600 sm:block">
              
              <UserIcon size={20} />
            </Link>

            <button
              onClick={() => setIsCartOpen(true)}
              className="relative p-2 text-gray-600 transition-colors hover:text-nature-600">
              
              <ShoppingCartIcon size={20} />
              {cartCount > 0 &&
              <span className="absolute top-0 right-0 bg-nature-600 text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                  {cartCount}
                </span>
              }
            </button>

            {/* Mobile Menu Toggle */}
            <button
              className="p-2 text-gray-600 md:hidden"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
              
              {isMobileMenuOpen ? <XIcon size={24} /> : <MenuIcon size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen &&
        <motion.div
          initial={{
            opacity: 0,
            height: 0
          }}
          animate={{
            opacity: 1,
            height: 'auto'
          }}
          exit={{
            opacity: 0,
            height: 0
          }}
          className="mt-3 border-t md:hidden glass border-white/20">
          
            <div className="flex flex-col px-4 py-6 space-y-4">
              {navLinks.map((link) =>
            <Link
              key={link.name}
              to={link.path}
              className={`text-lg font-medium p-2 rounded-lg ${location.pathname === link.path ? 'bg-nature-50 text-nature-700' : 'text-gray-700 hover:bg-gray-50'}`}>
              
                  {link.name}
                </Link>
            )}
              <div className="h-px my-2 bg-gray-200"></div>
              <Link
              to="/dashboard"
              className="flex items-center gap-3 p-2 text-lg font-medium text-gray-700 rounded-lg hover:bg-gray-50">
              
                <UserIcon size={20} />
                My Account
              </Link>
              <Link
              to="/admin"
              className="flex items-center gap-3 p-2 text-lg font-medium text-gray-700 rounded-lg hover:bg-gray-50">
              
                Admin Panel
              </Link>
            </div>
          </motion.div>
        }
      </AnimatePresence>
    </header>);

}