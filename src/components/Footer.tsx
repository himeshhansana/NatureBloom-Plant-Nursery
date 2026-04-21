import React from 'react';
import { Link } from 'react-router-dom';
import {
  LeafIcon,
  MapPinIcon,
  PhoneIcon,
  MailIcon,
  InstagramIcon,
  FacebookIcon,
  TwitterIcon } from
'lucide-react';
export function Footer() {
  return (
    <footer className="bg-nature-900 text-nature-50 pt-16 pb-8">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          {/* Brand & About */}
          <div className="space-y-4">
            <Link to="/" className="flex items-center gap-2">
              <div className="bg-nature-50 text-nature-900 p-1.5 rounded-lg">
                <LeafIcon size={24} />
              </div>
              <span className="font-display font-bold text-2xl tracking-tight text-white">
                NatureBloom
              </span>
            </Link>
            <p className="text-nature-200 text-sm leading-relaxed mt-4">
              Bringing the beauty of Sri Lankan nature to your doorstep. Premium
              plants, expert care advice, and sustainable practices.
            </p>
            <div className="flex gap-4 pt-2">
              <a
                href="#"
                className="w-8 h-8 rounded-full bg-nature-800 flex items-center justify-center hover:bg-nature-600 transition-colors">
                
                <InstagramIcon size={16} />
              </a>
              <a
                href="#"
                className="w-8 h-8 rounded-full bg-nature-800 flex items-center justify-center hover:bg-nature-600 transition-colors">
                
                <FacebookIcon size={16} />
              </a>
              <a
                href="#"
                className="w-8 h-8 rounded-full bg-nature-800 flex items-center justify-center hover:bg-nature-600 transition-colors">
                
                <TwitterIcon size={16} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-display font-semibold text-lg mb-4 text-white">
              Quick Links
            </h3>
            <ul className="space-y-3">
              <li>
                <Link
                  to="/shop"
                  className="text-nature-200 hover:text-white transition-colors text-sm">
                  
                  Shop All Plants
                </Link>
              </li>
              <li>
                <Link
                  to="/plant-care"
                  className="text-nature-200 hover:text-white transition-colors text-sm">
                  
                  Plant Care Guides
                </Link>
              </li>
              <li>
                <Link
                  to="/blog"
                  className="text-nature-200 hover:text-white transition-colors text-sm">
                  
                  Our Blog
                </Link>
              </li>
              <li>
                <Link
                  to="/dashboard"
                  className="text-nature-200 hover:text-white transition-colors text-sm">
                  
                  My Account
                </Link>
              </li>
              <li>
                <Link
                  to="/admin"
                  className="text-nature-200 hover:text-white transition-colors text-sm opacity-50">
                  
                  Admin Panel
                </Link>
              </li>
            </ul>
          </div>

          {/* Customer Service */}
          <div>
            <h3 className="font-display font-semibold text-lg mb-4 text-white">
              Customer Service
            </h3>
            <ul className="space-y-3">
              <li>
                <Link
                  to="#"
                  className="text-nature-200 hover:text-white transition-colors text-sm">
                  
                  Track Order
                </Link>
              </li>
              <li>
                <Link
                  to="#"
                  className="text-nature-200 hover:text-white transition-colors text-sm">
                  
                  Shipping Policy
                </Link>
              </li>
              <li>
                <Link
                  to="#"
                  className="text-nature-200 hover:text-white transition-colors text-sm">
                  
                  Returns & Refunds
                </Link>
              </li>
              <li>
                <Link
                  to="#"
                  className="text-nature-200 hover:text-white transition-colors text-sm">
                  
                  FAQ
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact & Newsletter */}
          <div>
            <h3 className="font-display font-semibold text-lg mb-4 text-white">
              Contact Us
            </h3>
            <ul className="space-y-3 mb-6">
              <li className="flex items-start gap-3 text-sm text-nature-200">
                <MapPinIcon
                  size={18}
                  className="shrink-0 mt-0.5 text-nature-400" />
                
                <span>
                  123 Green Valley Road,
                  <br />
                  Colombo 05, Sri Lanka
                </span>
              </li>
              <li className="flex items-center gap-3 text-sm text-nature-200">
                <PhoneIcon size={18} className="shrink-0 text-nature-400" />
                <span>+94 77 123 4567</span>
              </li>
              <li className="flex items-center gap-3 text-sm text-nature-200">
                <MailIcon size={18} className="shrink-0 text-nature-400" />
                <span>hello@naturebloom.lk</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-nature-800 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-nature-400 text-sm">
            &copy; {new Date().getFullYear()} NatureBloom Garden. All rights
            reserved.
          </p>
          <div className="flex gap-4 text-sm text-nature-400">
            <Link to="#" className="hover:text-white transition-colors">
              Privacy Policy
            </Link>
            <Link to="#" className="hover:text-white transition-colors">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>);

}