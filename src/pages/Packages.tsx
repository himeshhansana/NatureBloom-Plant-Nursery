import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  SearchIcon,
  ShoppingCartIcon,
  StarIcon,
  PlayIcon,
  ChevronDownIcon,
  FilterIcon,
  TagIcon,
  TrendingUpIcon
} from 'lucide-react';
import { usePackages } from '../contexts/PackagesContext';
import { useCart } from '../contexts/CartContext';
import { PlantPackage } from '../data/types';

export function Packages() {
  const { packages, searchPackages, filterPackagesByFeatured, addPackageToCart } =
    usePackages();
  const { addToCart } = useCart();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedPackage, setSelectedPackage] = useState<PlantPackage | null>(null);
  const [showVideo, setShowVideo] = useState(false);
  const [sortBy, setSortBy] = useState<'price' | 'rating' | 'newest' | 'discount'>('newest');
  const [filterFeatured, setFilterFeatured] = useState(false);

  const filteredPackages =
    searchQuery.length > 0 ? searchPackages(searchQuery) : packages;

  const finalFilteredPackages = filterFeatured 
    ? filteredPackages.filter(pkg => pkg.featured)
    : filteredPackages;

  const sortedPackages = [...finalFilteredPackages].sort((a, b) => {
    switch (sortBy) {
      case 'price':
        return a.discountedPrice - b.discountedPrice;
      case 'rating':
        return b.rating - a.rating;
      case 'discount':
        return calculateSavings(b) - calculateSavings(a);
      case 'newest':
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      default:
        return 0;
    }
  });

  const handleAddToCart = (pkg: PlantPackage) => {
    const items = addPackageToCart(pkg.id);
    items.forEach((item) => {
      addToCart(item.plant, item.quantity);
    });
  };

  const calculateSavings = (pkg: PlantPackage) => {
    return Math.round(((pkg.basePrice - pkg.discountedPrice) / pkg.basePrice) * 100);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Plant Packages
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            Curated bundles to bring nature into your space at great prices
          </p>

          {/* Search and Filter Controls */}
          <div className="space-y-4">
            {/* Search Bar */}
            <div className="relative flex-1 max-w-lg mx-auto">
              <SearchIcon className="absolute left-3 top-3 text-gray-400" size={20} />
              <input
                type="text"
                placeholder="Search packages..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>

            {/* Sort and Filter Options */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center sm:justify-center flex-wrap">
              {/* Sort Dropdown */}
              <div className="relative inline-block min-w-[200px]">
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as any)}
                  className="w-full appearance-none px-4 py-2 pr-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 bg-white"
                >
                  <option value="newest">Newest First</option>
                  <option value="price">Price (Low to High)</option>
                  <option value="rating">Highest Rated</option>
                  <option value="discount">Best Discount</option>
                </select>
                <ChevronDownIcon
                  size={20}
                  className="absolute right-3 top-2 text-gray-400 pointer-events-none"
                />
              </div>

              {/* Featured Filter Button */}
              <button
                onClick={() => setFilterFeatured(!filterFeatured)}
                className={`px-4 py-2 rounded-lg font-semibold transition-all flex items-center gap-2 ${
                  filterFeatured
                    ? 'bg-yellow-500 text-white'
                    : 'bg-white border-2 border-gray-300 text-gray-700 hover:border-yellow-500'
                }`}
              >
                <StarIcon size={18} />
                {filterFeatured ? 'Featured' : 'Show Featured'}
              </button>
            </div>

            {/* Results Count */}
            <div className="text-sm text-gray-600 mt-4">
              Showing {sortedPackages.length} package{sortedPackages.length !== 1 ? 's' : ''}
            </div>
          </div>
        </motion.div>

        {/* Featured Packages */}
        {sortedPackages.length > 0 && (
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
              <TrendingUpIcon size={24} className="text-green-600" />
              Our Packages
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {sortedPackages.map((pkg, index) => (
                <motion.div
                  key={pkg.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all overflow-hidden group cursor-pointer h-full flex flex-col"
                  onClick={() => setSelectedPackage(pkg)}
                >
                  {/* Image Container */}
                  <div className="relative h-64 overflow-hidden bg-gray-200">
                    <img
                      src={pkg.image}
                      alt={pkg.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                    />

                    {/* Featured Badge */}
                    {pkg.featured && (
                      <div className="absolute top-4 left-4 bg-yellow-500 text-white px-3 py-1 rounded-full font-bold text-xs flex items-center gap-1">
                        <StarIcon size={14} />
                        Featured
                      </div>
                    )}

                    {/* Discount Badge */}
                    <div className="absolute top-4 right-4 bg-red-500 text-white px-3 py-1 rounded-full font-bold flex items-center gap-1">
                      <TagIcon size={14} />
                      -{calculateSavings(pkg)}%
                    </div>

                    {/* Video Badge */}
                    {pkg.videoUrl && (
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedPackage(pkg);
                          setShowVideo(true);
                        }}
                        className="absolute bottom-4 left-4 bg-green-500 hover:bg-green-600 text-white p-3 rounded-full transition-all shadow-lg"
                      >
                        <PlayIcon size={24} />
                      </button>
                    )}
                  </div>

                  {/* Content */}
                  <div className="p-6 flex flex-col flex-grow">
                    <h3 className="text-xl font-bold text-gray-900 mb-2">{pkg.name}</h3>
                    <p className="text-gray-600 text-sm mb-4 line-clamp-2 flex-grow">
                      {pkg.description}
                    </p>

                    {/* Plants Count */}
                    <div className="mb-4 text-sm text-gray-600 flex items-center gap-2">
                      <span className="font-semibold text-green-600">{pkg.plants.length}</span>
                      <span>plants included</span>
                    </div>

                    {/* Rating */}
                    <div className="flex items-center gap-2 mb-4">
                      <div className="flex items-center">
                        {[...Array(5)].map((_, i) => (
                          <StarIcon
                            key={i}
                            size={16}
                            className={
                              i < Math.floor(pkg.rating)
                                ? 'fill-yellow-400 text-yellow-400'
                                : 'text-gray-300'
                            }
                          />
                        ))}
                      </div>
                      <span className="text-sm text-gray-600">
                        ({pkg.reviewCount})
                      </span>
                    </div>

                    {/* Price */}
                    <div className="mb-4 pb-4 border-t border-gray-200">
                      <div className="flex items-baseline gap-2 mt-4">
                        <span className="text-3xl font-bold text-green-600">
                          Rs. {pkg.discountedPrice.toLocaleString()}
                        </span>
                        <span className="text-lg text-gray-400 line-through">
                          Rs. {pkg.basePrice.toLocaleString()}
                        </span>
                        <span className="text-sm font-semibold text-red-600 ml-auto">
                          Save Rs. {(pkg.basePrice - pkg.discountedPrice).toLocaleString()}
                        </span>
                      </div>
                    </div>

                    {/* Stock Status */}
                    <div className="mb-4">
                      <span
                        className={`text-sm font-semibold ${pkg.stock > 0 ? 'text-green-600' : 'text-red-600'}`}
                      >
                        {pkg.stock > 0
                          ? `${pkg.stock} in stock`
                          : 'Out of stock'}
                      </span>
                    </div>

                    {/* Add to Cart Button */}
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleAddToCart(pkg);
                      }}
                      disabled={pkg.stock === 0}
                      className="w-full bg-green-600 hover:bg-green-700 disabled:bg-gray-400 text-white font-bold py-3 px-4 rounded-lg transition-all flex items-center justify-center gap-2"
                    >
                      <ShoppingCartIcon size={20} />
                      Add to Cart
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        )}

        {sortedPackages.length === 0 && (
          <div className="text-center py-12">
            <p className="text-xl text-gray-600">No packages found. Try a different search.</p>
          </div>
        )}
      </div>

      {/* Modal for Video */}
      {showVideo && selectedPackage?.videoUrl && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
          onClick={() => setShowVideo(false)}
        >
          <motion.div
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            onClick={(e) => e.stopPropagation()}
            className="bg-white rounded-2xl overflow-hidden max-w-4xl w-full"
          >
            <div className="aspect-video">
              <iframe
                width="100%"
                height="100%"
                src={selectedPackage.videoUrl}
                title={selectedPackage.name}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
            <div className="p-6">
              <h3 className="text-2xl font-bold mb-2">{selectedPackage.name}</h3>
              <p className="text-gray-600">{selectedPackage.description}</p>
            </div>
          </motion.div>
        </motion.div>
      )}
    </div>
  );
}
