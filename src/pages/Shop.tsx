import React, { useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import {
  SearchIcon,
  SlidersHorizontalIcon,
  ChevronDownIcon,
  XIcon } from
'lucide-react';
import { PlantCard } from '../components/PlantCard';
import { plants, categories } from '../data/mockData';
import { PlantCategory } from '../data/types';
export function Shop() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<
    PlantCategory | 'All'>(
    'All');
  const [priceRange, setPriceRange] = useState(10000);
  const [sortBy, setSortBy] = useState('featured');
  const [isMobileFiltersOpen, setIsMobileFiltersOpen] = useState(false);
  // Filter and sort logic
  const filteredPlants = useMemo(() => {
    let result = plants;
    // Search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(
        (p) =>
        p.name.toLowerCase().includes(query) ||
        p.scientificName.toLowerCase().includes(query) ||
        p.tags.some((t) => t.toLowerCase().includes(query))
      );
    }
    // Category filter
    if (selectedCategory !== 'All') {
      result = result.filter((p) => p.category === selectedCategory);
    }
    // Price filter
    result = result.filter((p) => p.price <= priceRange);
    // Sorting
    switch (sortBy) {
      case 'price-low':
        result.sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        result.sort((a, b) => b.price - a.price);
        break;
      case 'rating':
        result.sort((a, b) => b.rating - a.rating);
        break;
      case 'newest':
        result.sort((a, b) => (b.newArrival ? 1 : 0) - (a.newArrival ? 1 : 0));
        break;
      case 'featured':
      default:
        result.sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0));
        break;
    }
    return result;
  }, [searchQuery, selectedCategory, priceRange, sortBy]);
  const clearFilters = () => {
    setSearchQuery('');
    setSelectedCategory('All');
    setPriceRange(10000);
    setSortBy('featured');
  };
  const activeFiltersCount =
  (selectedCategory !== 'All' ? 1 : 0) + (priceRange < 10000 ? 1 : 0);
  return (
    <div className="min-h-screen bg-cream pt-24 pb-20">
      {/* Page Header */}
      <div className="bg-nature-900 text-white py-16 mb-8">
        <div className="container mx-auto px-4 text-center">
          <h1 className="font-display text-4xl md:text-5xl font-bold mb-4">
            Shop All Plants
          </h1>
          <p className="text-nature-200 max-w-2xl mx-auto">
            Browse our complete collection of premium plants. From easy-care
            beginners to rare exotics, find your perfect green companion.
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Mobile Filter Toggle */}
          <div className="lg:hidden flex items-center justify-between mb-4">
            <button
              onClick={() => setIsMobileFiltersOpen(true)}
              className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-lg font-medium text-gray-700">
              
              <SlidersHorizontalIcon size={18} />
              Filters {activeFiltersCount > 0 && `(${activeFiltersCount})`}
            </button>

            <div className="relative">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="appearance-none bg-white border border-gray-200 rounded-lg px-4 py-2 pr-10 font-medium text-gray-700 focus:outline-none focus:ring-2 focus:ring-nature-500">
                
                <option value="featured">Featured</option>
                <option value="newest">Newest Arrivals</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="rating">Highest Rated</option>
              </select>
              <ChevronDownIcon
                size={16}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none" />
              
            </div>
          </div>

          {/* Sidebar Filters (Desktop & Mobile Drawer) */}
          <div
            className={`
            fixed inset-0 z-50 bg-black/50 lg:bg-transparent lg:static lg:block lg:w-1/4 xl:w-1/5
            ${isMobileFiltersOpen ? 'block' : 'hidden'}
          `}>
            
            <div className="absolute inset-y-0 left-0 w-4/5 max-w-sm bg-white lg:bg-transparent h-full overflow-y-auto lg:relative lg:w-full lg:h-auto p-6 lg:p-0 shadow-2xl lg:shadow-none">
              <div className="flex items-center justify-between lg:hidden mb-6">
                <h2 className="font-display text-xl font-bold text-gray-900">
                  Filters
                </h2>
                <button
                  onClick={() => setIsMobileFiltersOpen(false)}
                  className="p-2 text-gray-500">
                  
                  <XIcon size={24} />
                </button>
              </div>

              <div className="space-y-8">
                {/* Search */}
                <div>
                  <h3 className="font-semibold text-gray-900 mb-3">Search</h3>
                  <div className="relative">
                    <input
                      type="text"
                      placeholder="Search plants..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full pl-10 pr-4 py-2.5 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-nature-500" />
                    
                    <SearchIcon
                      size={18}
                      className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                    
                  </div>
                </div>

                {/* Categories */}
                <div>
                  <h3 className="font-semibold text-gray-900 mb-3">
                    Categories
                  </h3>
                  <div className="space-y-2">
                    <label className="flex items-center gap-3 cursor-pointer group">
                      <input
                        type="radio"
                        name="category"
                        checked={selectedCategory === 'All'}
                        onChange={() => setSelectedCategory('All')}
                        className="w-4 h-4 text-nature-600 focus:ring-nature-500 border-gray-300" />
                      
                      <span
                        className={`text-sm group-hover:text-nature-600 transition-colors ${selectedCategory === 'All' ? 'font-medium text-nature-900' : 'text-gray-600'}`}>
                        
                        All Plants
                      </span>
                    </label>
                    {categories.map((cat) =>
                    <label
                      key={cat.name}
                      className="flex items-center gap-3 cursor-pointer group">
                      
                        <input
                        type="radio"
                        name="category"
                        checked={selectedCategory === cat.name}
                        onChange={() =>
                        setSelectedCategory(cat.name as PlantCategory)
                        }
                        className="w-4 h-4 text-nature-600 focus:ring-nature-500 border-gray-300" />
                      
                        <span
                        className={`text-sm group-hover:text-nature-600 transition-colors ${selectedCategory === cat.name ? 'font-medium text-nature-900' : 'text-gray-600'}`}>
                        
                          {cat.name}{' '}
                          <span className="text-gray-400 text-xs ml-1">
                            ({cat.count})
                          </span>
                        </span>
                      </label>
                    )}
                  </div>
                </div>

                {/* Price Range */}
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="font-semibold text-gray-900">Max Price</h3>
                    <span className="text-sm font-medium text-nature-600">
                      Rs. {priceRange.toLocaleString()}
                    </span>
                  </div>
                  <input
                    type="range"
                    min="500"
                    max="10000"
                    step="500"
                    value={priceRange}
                    onChange={(e) => setPriceRange(Number(e.target.value))}
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-nature-600" />
                  
                  <div className="flex justify-between text-xs text-gray-400 mt-2">
                    <span>Rs. 500</span>
                    <span>Rs. 10,000+</span>
                  </div>
                </div>

                {/* Clear Filters */}
                {(searchQuery ||
                selectedCategory !== 'All' ||
                priceRange < 10000) &&
                <button
                  onClick={clearFilters}
                  className="w-full py-2 text-sm font-medium text-red-500 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors">
                  
                    Clear All Filters
                  </button>
                }
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1">
            {/* Desktop Toolbar */}
            <div className="hidden lg:flex items-center justify-between mb-8 bg-white p-4 rounded-2xl shadow-sm border border-gray-100">
              <p className="text-gray-600">
                Showing{' '}
                <span className="font-semibold text-gray-900">
                  {filteredPlants.length}
                </span>{' '}
                results
              </p>

              <div className="flex items-center gap-3">
                <span className="text-sm text-gray-500">Sort by:</span>
                <div className="relative">
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="appearance-none bg-gray-50 border border-gray-200 rounded-lg pl-4 pr-10 py-2 text-sm font-medium text-gray-700 focus:outline-none focus:ring-2 focus:ring-nature-500 cursor-pointer hover:bg-gray-100 transition-colors">
                    
                    <option value="featured">Featured</option>
                    <option value="newest">Newest Arrivals</option>
                    <option value="price-low">Price: Low to High</option>
                    <option value="price-high">Price: High to Low</option>
                    <option value="rating">Highest Rated</option>
                  </select>
                  <ChevronDownIcon
                    size={16}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none" />
                  
                </div>
              </div>
            </div>

            {/* Active Filters Tags */}
            {activeFiltersCount > 0 &&
            <div className="flex flex-wrap gap-2 mb-6">
                {selectedCategory !== 'All' &&
              <span className="inline-flex items-center gap-1 px-3 py-1 bg-nature-50 text-nature-700 rounded-full text-sm font-medium border border-nature-100">
                    {selectedCategory}
                    <button
                  onClick={() => setSelectedCategory('All')}
                  className="hover:text-nature-900">
                  
                      <XIcon size={14} />
                    </button>
                  </span>
              }
                {priceRange < 10000 &&
              <span className="inline-flex items-center gap-1 px-3 py-1 bg-nature-50 text-nature-700 rounded-full text-sm font-medium border border-nature-100">
                    Under Rs. {priceRange.toLocaleString()}
                    <button
                  onClick={() => setPriceRange(10000)}
                  className="hover:text-nature-900">
                  
                      <XIcon size={14} />
                    </button>
                  </span>
              }
              </div>
            }

            {/* Product Grid */}
            {filteredPlants.length > 0 ?
            <motion.div
              layout
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              
                {filteredPlants.map((plant, idx) =>
              <PlantCard key={plant.id} plant={plant} index={idx} />
              )}
              </motion.div> :

            <div className="text-center py-20 bg-white rounded-3xl border border-gray-100 shadow-sm">
                <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-4 text-gray-400">
                  <SearchIcon size={32} />
                </div>
                <h3 className="font-display text-2xl font-bold text-gray-900 mb-2">
                  No plants found
                </h3>
                <p className="text-gray-500 mb-6 max-w-md mx-auto">
                  We couldn't find any plants matching your current filters. Try
                  adjusting your search or clearing filters.
                </p>
                <button
                onClick={clearFilters}
                className="px-6 py-2.5 bg-nature-600 text-white rounded-xl font-medium hover:bg-nature-700 transition-colors">
                
                  Clear All Filters
                </button>
              </div>
            }
          </div>
        </div>
      </div>
    </div>);

}