import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  LeafIcon,
  MailIcon,
  LockIcon,
  UserIcon,
  PhoneIcon,
  ArrowRightIcon } from
'lucide-react';
import { useAuth } from '../contexts/AuthContext';

export function Register() {
  const navigate = useNavigate();
  const { register } = useAuth();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      await register(name, email, phone, password);
      navigate('/dashboard');
    } catch (error) {
      console.error('Registration error:', error);
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <div className="min-h-screen flex items-center justify-center bg-cream py-24 px-4 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0 pointer-events-none">
        <div className="absolute top-20 right-20 w-96 h-96 bg-nature-200 rounded-full mix-blend-multiply filter blur-3xl opacity-50"></div>
        <div className="absolute bottom-20 left-20 w-96 h-96 bg-earth-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30"></div>
      </div>

      <motion.div
        initial={{
          opacity: 0,
          y: 20
        }}
        animate={{
          opacity: 1,
          y: 0
        }}
        className="bg-white/80 backdrop-blur-xl p-8 md:p-12 rounded-3xl shadow-glass-xl border border-white/40 w-full max-w-md relative z-10">
        
        <div className="text-center mb-8">
          <Link
            to="/"
            className="inline-flex items-center justify-center w-12 h-12 bg-nature-600 text-white rounded-xl mb-4">
            
            <LeafIcon size={24} />
          </Link>
          <h1 className="font-display text-3xl font-bold text-gray-900 mb-2">
            Create Account
          </h1>
          <p className="text-gray-500">Join the NatureBloom community</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">
              Full Name
            </label>
            <div className="relative">
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full pl-11 pr-4 py-3 bg-white/50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-nature-500 focus:bg-white transition-colors"
                placeholder="Kasun Perera" />
              
              <UserIcon
                size={18}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
              
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">
              Email Address
            </label>
            <div className="relative">
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-11 pr-4 py-3 bg-white/50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-nature-500 focus:bg-white transition-colors"
                placeholder="you@example.com" />
              
              <MailIcon
                size={18}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
              
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">
              Phone Number
            </label>
            <div className="relative">
              <input
                type="tel"
                required
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full pl-11 pr-4 py-3 bg-white/50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-nature-500 focus:bg-white transition-colors"
                placeholder="+94 7X XXX XXXX" />
              
              <PhoneIcon
                size={18}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
              
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">
              Password
            </label>
            <div className="relative">
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-11 pr-4 py-3 bg-white/50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-nature-500 focus:bg-white transition-colors"
                placeholder="••••••••" />
              
              <LockIcon
                size={18}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
              
            </div>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-3.5 bg-nature-600 text-white rounded-xl font-medium hover:bg-nature-700 transition-colors shadow-soft hover:shadow-soft-lg flex items-center justify-center gap-2 mt-4">
            
            {isLoading ?
            'Creating account...' :

            <>
                Create Account <ArrowRightIcon size={18} />
              </>
            }
          </button>
        </form>

        <div className="mt-6 text-center text-sm text-gray-500">
          Already have an account?{' '}
          <Link
            to="/login"
            className="font-medium text-nature-600 hover:text-nature-700">
            
            Sign in
          </Link>
        </div>
      </motion.div>
    </div>);

}