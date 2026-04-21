import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRightIcon, CalendarIcon, ClockIcon, UserIcon } from 'lucide-react';
import { blogPosts } from '../data/mockData';
export function Blog() {
  const featuredPost = blogPosts[0];
  const regularPosts = blogPosts.slice(1);
  return (
    <div className="min-h-screen bg-cream pt-24 pb-20">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="text-center mb-16">
          <h1 className="font-display text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            The Green Journal
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto text-lg">
            Tips, stories, and inspiration for plant lovers in Sri Lanka.
          </p>
        </div>

        {/* Featured Post */}
        {featuredPost &&
        <motion.div
          initial={{
            opacity: 0,
            y: 20
          }}
          animate={{
            opacity: 1,
            y: 0
          }}
          className="mb-16">
          
            <Link
            to={`/blog/${featuredPost.id}`}
            className="group block bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-glass-lg transition-all duration-300 border border-gray-100">
            
              <div className="flex flex-col md:flex-row">
                <div className="md:w-1/2 relative overflow-hidden aspect-[4/3] md:aspect-auto md:h-[400px]">
                  <img
                  src={featuredPost.image}
                  alt={featuredPost.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                
                  <div className="absolute top-6 left-6 bg-white/90 backdrop-blur-sm px-4 py-1.5 rounded-full text-sm font-medium text-nature-800">
                    Featured • {featuredPost.category}
                  </div>
                </div>
                <div className="md:w-1/2 p-8 md:p-12 flex flex-col justify-center">
                  <div className="flex items-center gap-4 text-sm text-gray-500 mb-4">
                    <span className="flex items-center gap-1.5">
                      <CalendarIcon size={14} />{' '}
                      {featuredPost.createdAt.toLocaleDateString()}
                    </span>
                    <span className="w-1 h-1 rounded-full bg-gray-300"></span>
                    <span className="flex items-center gap-1.5">
                      <ClockIcon size={14} /> {featuredPost.readTime} min read
                    </span>
                  </div>
                  <h2 className="font-display text-3xl font-bold text-gray-900 mb-4 group-hover:text-nature-600 transition-colors">
                    {featuredPost.title}
                  </h2>
                  <p className="text-gray-600 text-lg mb-8 line-clamp-3">
                    {featuredPost.excerpt}
                  </p>
                  <div className="flex items-center justify-between mt-auto">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-nature-100 flex items-center justify-center text-nature-600">
                        <UserIcon size={20} />
                      </div>
                      <span className="font-medium text-gray-900">
                        {featuredPost.author}
                      </span>
                    </div>
                    <span className="flex items-center gap-2 text-nature-600 font-medium group-hover:translate-x-2 transition-transform">
                      Read Article <ArrowRightIcon size={18} />
                    </span>
                  </div>
                </div>
              </div>
            </Link>
          </motion.div>
        }

        {/* Regular Posts Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {regularPosts.map((post, idx) =>
          <motion.div
            key={post.id}
            initial={{
              opacity: 0,
              y: 20
            }}
            animate={{
              opacity: 1,
              y: 0
            }}
            transition={{
              delay: idx * 0.1
            }}>
            
              <Link
              to={`/blog/${post.id}`}
              className="group block bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-glass transition-all duration-300 border border-gray-100 h-full flex flex-col">
              
                <div className="relative overflow-hidden aspect-[4/3]">
                  <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                
                  <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-medium text-nature-800">
                    {post.category}
                  </div>
                </div>
                <div className="p-6 flex flex-col flex-grow">
                  <div className="flex items-center gap-4 text-xs text-gray-500 mb-3">
                    <span>{post.createdAt.toLocaleDateString()}</span>
                    <span className="w-1 h-1 rounded-full bg-gray-300"></span>
                    <span>{post.readTime} min read</span>
                  </div>
                  <h3 className="font-display text-xl font-bold text-gray-900 mb-3 group-hover:text-nature-600 transition-colors line-clamp-2">
                    {post.title}
                  </h3>
                  <p className="text-gray-600 text-sm mb-6 line-clamp-2 flex-grow">
                    {post.excerpt}
                  </p>
                  <div className="flex items-center justify-between mt-auto pt-4 border-t border-gray-100">
                    <span className="text-sm font-medium text-gray-900">
                      {post.author}
                    </span>
                    <span className="text-nature-600">
                      <ArrowRightIcon
                      size={18}
                      className="group-hover:translate-x-1 transition-transform" />
                    
                    </span>
                  </div>
                </div>
              </Link>
            </motion.div>
          )}
        </div>
      </div>
    </div>);

}