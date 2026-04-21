import React, { Children } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  ArrowRightIcon,
  TruckIcon,
  BookOpenIcon,
  ShieldCheckIcon,
  RefreshCwIcon,
  LeafIcon } from
'lucide-react';
import { PlantCard } from '../components/PlantCard';
import { plants, categories, blogPosts } from '../data/mockData';
export function Home() {
  const featuredPlants = plants.filter((p) => p.featured).slice(0, 4);
  const bestsellers = plants.filter((p) => p.bestseller).slice(0, 4);
  const containerVariants = {
    hidden: {
      opacity: 0
    },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };
  const itemVariants = {
    hidden: {
      opacity: 0,
      y: 20
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5
      }
    }
  };
  return (
    <div className="min-h-screen bg-cream pb-20">
      {/* Hero Section */}
      <section className="relative h-[90vh] min-h-[600px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1466692476868-aef1dfb1e735?w=1920&q=80"
            alt="Lush green plants"
            className="w-full h-full object-cover" />
          
          <div className="absolute inset-0 bg-gradient-to-r from-nature-900/80 to-nature-900/40 mix-blend-multiply" />
        </div>

        <div className="container mx-auto px-4 relative z-10 text-center md:text-left">
          <motion.div
            initial={{
              opacity: 0,
              y: 30
            }}
            animate={{
              opacity: 1,
              y: 0
            }}
            transition={{
              duration: 0.8,
              ease: 'easeOut'
            }}
            className="max-w-2xl">
            
            <span className="inline-block py-1 px-3 rounded-full bg-nature-500/20 border border-nature-400/30 text-nature-100 text-sm font-medium mb-6 backdrop-blur-md">
              Premium Sri Lankan Plant Nursery
            </span>
            <h1 className="font-display text-5xl md:text-7xl font-bold text-white leading-tight mb-6">
              Bring Nature <br className="hidden md:block" />
              <span className="text-nature-300">Into Your Home</span>
            </h1>
            <p className="text-lg md:text-xl text-nature-50 mb-10 max-w-xl leading-relaxed">
              Discover our curated collection of indoor and outdoor plants,
              grown with love in Sri Lanka. Expert care guides included.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
              <Link
                to="/shop"
                className="px-8 py-4 bg-nature-500 text-white rounded-xl font-medium hover:bg-nature-400 transition-colors shadow-glow flex items-center justify-center gap-2">
                
                Shop Collection <ArrowRightIcon size={18} />
              </Link>
              <Link
                to="/plant-care"
                className="px-8 py-4 glass text-white rounded-xl font-medium hover:bg-white/20 transition-colors flex items-center justify-center gap-2">
                
                Care Guides
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-12 bg-white relative z-20 -mt-8 mx-4 md:mx-12 rounded-3xl shadow-glass-lg">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
            {
              icon: TruckIcon,
              title: 'Island-wide Delivery',
              desc: 'Safe & fast shipping across Sri Lanka'
            },
            {
              icon: BookOpenIcon,
              title: 'Expert Care Guides',
              desc: 'Detailed instructions for every plant'
            },
            {
              icon: ShieldCheckIcon,
              title: 'Healthy Guarantee',
              desc: 'Premium quality plants, hand-picked'
            },
            {
              icon: RefreshCwIcon,
              title: '7-Day Returns',
              desc: 'Hassle-free return policy'
            }].
            map((feature, idx) =>
            <div
              key={idx}
              className="flex items-start gap-4 p-4 rounded-2xl hover:bg-nature-50 transition-colors">
              
                <div className="bg-nature-100 p-3 rounded-xl text-nature-600 shrink-0">
                  <feature.icon size={24} />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">
                    {feature.title}
                  </h3>
                  <p className="text-sm text-gray-500 leading-relaxed">
                    {feature.desc}
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-24">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-end mb-12">
            <div>
              <h2 className="font-display text-3xl md:text-4xl font-bold text-nature-900 mb-4">
                Shop by Category
              </h2>
              <p className="text-gray-600">
                Find the perfect plant for your space
              </p>
            </div>
            <Link
              to="/shop"
              className="hidden md:flex items-center gap-2 text-nature-600 font-medium hover:text-nature-700 transition-colors">
              
              View All <ArrowRightIcon size={16} />
            </Link>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 md:gap-6">
            {categories.map((category, idx) =>
            <Link
              key={idx}
              to={`/shop?category=${category.name}`}
              className="group relative rounded-2xl overflow-hidden aspect-square shadow-sm hover:shadow-glass transition-all duration-300">
              
                <img
                src={category.image}
                alt={category.name}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
              
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent flex flex-col justify-end p-4">
                  <span className="text-2xl mb-1">{category.icon}</span>
                  <h3 className="font-medium text-white">{category.name}</h3>
                  <p className="text-xs text-white/80">
                    {category.count} plants
                  </p>
                </div>
              </Link>
            )}
          </div>
        </div>
      </section>

      {/* Featured Plants */}
      <section className="py-24 bg-nature-50/50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="font-display text-3xl md:text-4xl font-bold text-nature-900 mb-4">
              Featured Collection
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Hand-picked selections that are currently thriving in our nursery.
            </p>
          </div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{
              once: true,
              margin: '-100px'
            }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
            
            {featuredPlants.map((plant, idx) =>
            <PlantCard key={plant.id} plant={plant} index={idx} />
            )}
          </motion.div>
        </div>
      </section>

      {/* Bestsellers */}
      <section className="py-24">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-end mb-12">
            <div>
              <h2 className="font-display text-3xl md:text-4xl font-bold text-nature-900 mb-4">
                Customer Favorites
              </h2>
              <p className="text-gray-600">Our most loved plants this month</p>
            </div>
          </div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{
              once: true,
              margin: '-100px'
            }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
            
            {bestsellers.map((plant, idx) =>
            <PlantCard key={plant.id} plant={plant} index={idx} />
            )}
          </motion.div>
        </div>
      </section>

      {/* Care Guide Preview */}
      <section className="py-24 bg-nature-900 text-white overflow-hidden">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row items-center gap-16">
            <div className="lg:w-1/2 relative">
              <div className="absolute -inset-4 bg-nature-800 rounded-full blur-3xl opacity-50"></div>
              <img
                src="https://images.unsplash.com/photo-1614594975525-e45190c55d0b?w=800&q=80"
                alt="Plant Care"
                className="relative z-10 rounded-3xl shadow-2xl rotate-3 hover:rotate-0 transition-transform duration-500" />
              
              {/* Floating Badge */}
              <div
                className="absolute -bottom-6 -left-6 z-20 glass-dark p-4 rounded-2xl flex items-center gap-4 animate-bounce"
                style={{
                  animationDuration: '3s'
                }}>
                
                <div className="bg-nature-500 p-2 rounded-full">
                  <LeafIcon size={24} className="text-white" />
                </div>
                <div>
                  <p className="text-sm text-nature-200">Expert Advice</p>
                  <p className="font-bold">100+ Guides</p>
                </div>
              </div>
            </div>

            <div className="lg:w-1/2">
              <h2 className="font-display text-4xl md:text-5xl font-bold mb-6 leading-tight">
                Not sure how to <br />
                <span className="text-nature-400">care for your plant?</span>
              </h2>
              <p className="text-nature-200 text-lg mb-8 leading-relaxed">
                Every plant from NatureBloom comes with a detailed,
                easy-to-follow care guide. We'll teach you exactly when to
                water, how much sunlight is needed, and when to fertilize.
              </p>

              <ul className="space-y-4 mb-10">
                {[
                'Watering schedules tailored to Sri Lankan climate',
                'Sunlight positioning tips',
                'Soil and fertilizer recommendations',
                'Troubleshooting common issues'].
                map((item, idx) =>
                <li
                  key={idx}
                  className="flex items-center gap-3 text-nature-100">
                  
                    <div className="w-6 h-6 rounded-full bg-nature-800 flex items-center justify-center text-nature-400 shrink-0">
                      <ShieldCheckIcon size={14} />
                    </div>
                    {item}
                  </li>
                )}
              </ul>

              <Link
                to="/plant-care"
                className="inline-flex items-center gap-2 px-8 py-4 bg-white text-nature-900 rounded-xl font-medium hover:bg-nature-50 transition-colors">
                
                Explore Care Guides <ArrowRightIcon size={18} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Blog Preview */}
      <section className="py-24">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="font-display text-3xl md:text-4xl font-bold text-nature-900 mb-4">
              From The Journal
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Tips, tricks, and inspiration for your plant journey.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {blogPosts.map((post) =>
            <Link
              key={post.id}
              to={`/blog/${post.id}`}
              className="group block">
              
                <div className="rounded-2xl overflow-hidden mb-6 aspect-[4/3] relative">
                  <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                
                  <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-medium text-nature-800">
                    {post.category}
                  </div>
                </div>
                <div className="flex items-center gap-4 text-sm text-gray-500 mb-3">
                  <span>
                    {post.createdAt.toLocaleDateString('en-US', {
                    month: 'short',
                    day: 'numeric',
                    year: 'numeric'
                  })}
                  </span>
                  <span className="w-1 h-1 rounded-full bg-gray-300"></span>
                  <span>{post.readTime} min read</span>
                </div>
                <h3 className="font-display text-xl font-bold text-gray-900 mb-3 group-hover:text-nature-600 transition-colors line-clamp-2">
                  {post.title}
                </h3>
                <p className="text-gray-600 line-clamp-2">{post.excerpt}</p>
              </Link>
            )}
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="py-24 bg-sage relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-nature-200 rounded-full mix-blend-multiply filter blur-3xl opacity-50 translate-x-1/2 -translate-y-1/2"></div>
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-earth-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 -translate-x-1/2 translate-y-1/2"></div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl mx-auto text-center bg-white/60 backdrop-blur-xl p-10 md:p-16 rounded-3xl shadow-glass border border-white/40">
            <h2 className="font-display text-3xl md:text-4xl font-bold text-nature-900 mb-4">
              Join Our Green Community
            </h2>
            <p className="text-gray-600 mb-8 text-lg">
              Subscribe to get special offers, free giveaways, and
              once-in-a-lifetime deals.
            </p>
            <form className="flex flex-col sm:flex-row gap-3 max-w-lg mx-auto">
              <input
                type="email"
                placeholder="Enter your email address"
                className="flex-1 px-6 py-4 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-nature-500 bg-white/80"
                required />
              
              <button
                type="submit"
                className="px-8 py-4 bg-nature-800 text-white rounded-xl font-medium hover:bg-nature-900 transition-colors whitespace-nowrap">
                
                Subscribe
              </button>
            </form>
            <p className="text-xs text-gray-500 mt-4">
              We care about your data in our privacy policy.
            </p>
          </div>
        </div>
      </section>
    </div>);

}