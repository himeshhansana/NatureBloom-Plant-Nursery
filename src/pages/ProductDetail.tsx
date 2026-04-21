import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  StarIcon,
  MinusIcon,
  PlusIcon,
  ShoppingCartIcon,
  HeartIcon,
  ChevronRightIcon,
  DropletsIcon,
  SunIcon,
  ThermometerIcon,
  WindIcon,
  SproutIcon,
  ShieldCheckIcon,
  TruckIcon } from
'lucide-react';
import { plants } from '../data/mockData';
import { useCart } from '../contexts/CartContext';
import { PlantCard } from '../components/PlantCard';
export function ProductDetail() {
  const { id } = useParams<{
    id: string;
  }>();
  const { addToCart } = useCart();
  const plant = plants.find((p) => p.id === id) || plants[0]; // Fallback for demo
  const [activeImage, setActiveImage] = useState(plant.image);
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState<
    'description' | 'care' | 'reviews'>(
    'care');
  const [isFavorite, setIsFavorite] = useState(false);
  // Reset state when plant changes
  useEffect(() => {
    setActiveImage(plant.image);
    setQuantity(1);
    window.scrollTo(0, 0);
  }, [plant]);
  const handleAddToCart = () => {
    addToCart(plant, quantity);
  };
  const relatedPlants = plants.
  filter((p) => p.category === plant.category && p.id !== plant.id).
  slice(0, 4);
  const isOutOfStock = plant.stock === 0;
  const isLowStock = plant.stock > 0 && plant.stock <= 5;
  return (
    <div className="min-h-screen bg-cream pt-24 pb-20">
      {/* Breadcrumbs */}
      <div className="container mx-auto px-4 mb-8">
        <div className="flex items-center gap-2 text-sm text-gray-500">
          <Link to="/" className="hover:text-nature-600 transition-colors">
            Home
          </Link>
          <ChevronRightIcon size={14} />
          <Link to="/shop" className="hover:text-nature-600 transition-colors">
            Shop
          </Link>
          <ChevronRightIcon size={14} />
          <Link
            to={`/shop?category=${plant.category}`}
            className="hover:text-nature-600 transition-colors">
            
            {plant.category}
          </Link>
          <ChevronRightIcon size={14} />
          <span className="text-gray-900 font-medium">{plant.name}</span>
        </div>
      </div>

      <div className="container mx-auto px-4">
        <div className="bg-white rounded-3xl shadow-glass-lg border border-gray-100 overflow-hidden mb-16">
          <div className="flex flex-col lg:flex-row">
            {/* Image Gallery */}
            <div className="lg:w-1/2 p-6 lg:p-10 bg-nature-50/30">
              <div className="aspect-square rounded-2xl overflow-hidden mb-4 bg-white shadow-sm border border-gray-100 relative">
                <AnimatePresence mode="wait">
                  <motion.img
                    key={activeImage}
                    initial={{
                      opacity: 0
                    }}
                    animate={{
                      opacity: 1
                    }}
                    exit={{
                      opacity: 0
                    }}
                    transition={{
                      duration: 0.3
                    }}
                    src={activeImage}
                    alt={plant.name}
                    className="w-full h-full object-cover" />
                  
                </AnimatePresence>

                {/* Badges */}
                <div className="absolute top-4 left-4 flex flex-col gap-2">
                  {plant.bestseller &&
                  <span className="bg-earth-200 text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-sm">
                      Bestseller
                    </span>
                  }
                  {plant.originalPrice &&
                  <span className="bg-red-500 text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-sm">
                      Sale
                    </span>
                  }
                </div>
              </div>

              {/* Thumbnails */}
              <div className="flex gap-4 overflow-x-auto pb-2 custom-scrollbar">
                {[plant.image, ...(plant.images || [])].map((img, idx) =>
                <button
                  key={idx}
                  onClick={() => setActiveImage(img)}
                  className={`w-20 h-20 rounded-xl overflow-hidden shrink-0 border-2 transition-all ${activeImage === img ? 'border-nature-500 shadow-md scale-105' : 'border-transparent opacity-70 hover:opacity-100'}`}>
                  
                    <img
                    src={img}
                    alt={`${plant.name} view ${idx + 1}`}
                    className="w-full h-full object-cover" />
                  
                  </button>
                )}
              </div>
            </div>

            {/* Product Info */}
            <div className="lg:w-1/2 p-6 lg:p-12 flex flex-col">
              <div className="mb-2 flex items-center justify-between">
                <p className="text-sm font-medium text-nature-600 uppercase tracking-wider">
                  {plant.category}
                </p>
                <div className="flex items-center gap-1">
                  <StarIcon
                    size={16}
                    className="fill-earth-200 text-earth-200" />
                  
                  <span className="font-medium text-gray-900">
                    {plant.rating}
                  </span>
                  <span className="text-gray-500 text-sm">
                    ({plant.reviewCount} reviews)
                  </span>
                </div>
              </div>

              <h1 className="font-display text-4xl lg:text-5xl font-bold text-gray-900 mb-2">
                {plant.name}
              </h1>
              <p className="text-lg text-gray-500 italic mb-6">
                {plant.scientificName}
              </p>

              <div className="flex items-end gap-4 mb-8">
                <span className="font-display text-3xl font-bold text-nature-900">
                  Rs. {plant.price.toLocaleString()}
                </span>
                {plant.originalPrice &&
                <span className="text-xl text-gray-400 line-through mb-1">
                    Rs. {plant.originalPrice.toLocaleString()}
                  </span>
                }
              </div>

              <p className="text-gray-600 leading-relaxed mb-8">
                {plant.description}
              </p>

              {/* Stock Status */}
              <div className="mb-8">
                {isOutOfStock ?
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-red-50 text-red-600 rounded-lg font-medium">
                    <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></span>
                    Out of Stock
                  </div> :
                isLowStock ?
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-earth-50 text-earth-600 rounded-lg font-medium">
                    <span className="w-2 h-2 rounded-full bg-earth-500 animate-pulse"></span>
                    Only {plant.stock} left in stock - order soon
                  </div> :

                <div className="inline-flex items-center gap-2 px-4 py-2 bg-nature-50 text-nature-700 rounded-lg font-medium">
                    <span className="w-2 h-2 rounded-full bg-nature-500"></span>
                    In Stock ({plant.stock} available)
                  </div>
                }
              </div>

              {/* Actions */}
              <div className="flex flex-col sm:flex-row gap-4 mb-10 mt-auto">
                <div className="flex items-center justify-between bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 sm:w-32">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    disabled={isOutOfStock}
                    className="text-gray-500 hover:text-nature-600 disabled:opacity-50">
                    
                    <MinusIcon size={20} />
                  </button>
                  <span className="font-medium text-lg">{quantity}</span>
                  <button
                    onClick={() =>
                    setQuantity(Math.min(plant.stock, quantity + 1))
                    }
                    disabled={isOutOfStock || quantity >= plant.stock}
                    className="text-gray-500 hover:text-nature-600 disabled:opacity-50">
                    
                    <PlusIcon size={20} />
                  </button>
                </div>

                <button
                  onClick={handleAddToCart}
                  disabled={isOutOfStock}
                  className={`flex-1 flex items-center justify-center gap-2 py-3.5 rounded-xl font-medium transition-all shadow-soft hover:shadow-soft-lg ${isOutOfStock ? 'bg-gray-200 text-gray-500 cursor-not-allowed' : 'bg-nature-600 text-white hover:bg-nature-700'}`}>
                  
                  <ShoppingCartIcon size={20} />
                  {isOutOfStock ? 'Out of Stock' : 'Add to Cart'}
                </button>

                <button
                  onClick={() => setIsFavorite(!isFavorite)}
                  className={`p-3.5 rounded-xl border transition-colors flex items-center justify-center ${isFavorite ? 'bg-red-50 border-red-100 text-red-500' : 'bg-white border-gray-200 text-gray-400 hover:border-gray-300 hover:text-gray-600'}`}>
                  
                  <HeartIcon
                    size={24}
                    className={isFavorite ? 'fill-current' : ''} />
                  
                </button>
              </div>

              {/* Guarantees */}
              <div className="grid grid-cols-2 gap-4 pt-8 border-t border-gray-100">
                <div className="flex items-center gap-3 text-sm text-gray-600">
                  <ShieldCheckIcon size={20} className="text-nature-500" />
                  <span>Healthy Plant Guarantee</span>
                </div>
                <div className="flex items-center gap-3 text-sm text-gray-600">
                  <TruckIcon size={20} className="text-nature-500" />
                  <span>Safe Island-wide Delivery</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs Section */}
        <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden mb-24">
          <div className="flex border-b border-gray-100 overflow-x-auto hide-scrollbar">
            {['care', 'description', 'reviews'].map((tab) =>
            <button
              key={tab}
              onClick={() => setActiveTab(tab as any)}
              className={`flex-1 py-5 px-6 font-medium text-lg capitalize whitespace-nowrap transition-colors relative ${activeTab === tab ? 'text-nature-700' : 'text-gray-500 hover:text-gray-700'}`}>
              
                {tab === 'care' ? 'Care Guide' : tab}
                {activeTab === tab &&
              <motion.div
                layoutId="activeTab"
                className="absolute bottom-0 left-0 right-0 h-0.5 bg-nature-600" />

              }
              </button>
            )}
          </div>

          <div className="p-8 lg:p-12">
            <AnimatePresence mode="wait">
              {activeTab === 'care' &&
              <motion.div
                key="care"
                initial={{
                  opacity: 0,
                  y: 10
                }}
                animate={{
                  opacity: 1,
                  y: 0
                }}
                exit={{
                  opacity: 0,
                  y: -10
                }}
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                
                  <div className="bg-blue-50/50 p-6 rounded-2xl border border-blue-100/50">
                    <div className="w-12 h-12 bg-blue-100 text-blue-500 rounded-xl flex items-center justify-center mb-4">
                      <DropletsIcon size={24} />
                    </div>
                    <h3 className="font-semibold text-gray-900 mb-2">
                      Watering
                    </h3>
                    <p className="text-gray-600 text-sm leading-relaxed">
                      <span className="font-medium text-blue-700">
                        {plant.care.water} requirements.
                      </span>{' '}
                      Water when the top 2 inches of soil feel dry. Ensure
                      proper drainage to prevent root rot.
                    </p>
                  </div>

                  <div className="bg-yellow-50/50 p-6 rounded-2xl border border-yellow-100/50">
                    <div className="w-12 h-12 bg-yellow-100 text-yellow-600 rounded-xl flex items-center justify-center mb-4">
                      <SunIcon size={24} />
                    </div>
                    <h3 className="font-semibold text-gray-900 mb-2">
                      Sunlight
                    </h3>
                    <p className="text-gray-600 text-sm leading-relaxed">
                      <span className="font-medium text-yellow-700">
                        {plant.care.sunlight}.
                      </span>{' '}
                      Position near a window but protect from harsh afternoon
                      sun which can scorch leaves.
                    </p>
                  </div>

                  <div className="bg-green-50/50 p-6 rounded-2xl border border-green-100/50">
                    <div className="w-12 h-12 bg-green-100 text-green-600 rounded-xl flex items-center justify-center mb-4">
                      <SproutIcon size={24} />
                    </div>
                    <h3 className="font-semibold text-gray-900 mb-2">
                      Fertilizer
                    </h3>
                    <p className="text-gray-600 text-sm leading-relaxed">
                      {plant.care.fertilizer}. Use a balanced liquid fertilizer
                      diluted to half strength.
                    </p>
                  </div>

                  <div className="bg-orange-50/50 p-6 rounded-2xl border border-orange-100/50">
                    <div className="w-12 h-12 bg-orange-100 text-orange-500 rounded-xl flex items-center justify-center mb-4">
                      <ThermometerIcon size={24} />
                    </div>
                    <h3 className="font-semibold text-gray-900 mb-2">
                      Temperature
                    </h3>
                    <p className="text-gray-600 text-sm leading-relaxed">
                      Ideal range: {plant.care.temperature}. Protect from cold
                      drafts and sudden temperature drops.
                    </p>
                  </div>

                  <div className="bg-teal-50/50 p-6 rounded-2xl border border-teal-100/50">
                    <div className="w-12 h-12 bg-teal-100 text-teal-600 rounded-xl flex items-center justify-center mb-4">
                      <WindIcon size={24} />
                    </div>
                    <h3 className="font-semibold text-gray-900 mb-2">
                      Humidity
                    </h3>
                    <p className="text-gray-600 text-sm leading-relaxed">
                      <span className="font-medium text-teal-700">
                        {plant.care.humidity} humidity.
                      </span>{' '}
                      Mist occasionally or use a pebble tray if your home is
                      particularly dry.
                    </p>
                  </div>

                  <div className="bg-purple-50/50 p-6 rounded-2xl border border-purple-100/50">
                    <div className="w-12 h-12 bg-purple-100 text-purple-600 rounded-xl flex items-center justify-center mb-4">
                      <ShieldCheckIcon size={24} />
                    </div>
                    <h3 className="font-semibold text-gray-900 mb-2">
                      Difficulty
                    </h3>
                    <p className="text-gray-600 text-sm leading-relaxed">
                      <span className="font-medium text-purple-700">
                        {plant.care.difficulty} level.
                      </span>{' '}
                      {plant.care.difficulty === 'Beginner' ?
                    'Perfect for those new to plant care. Very forgiving.' :
                    plant.care.difficulty === 'Intermediate' ?
                    'Requires some attention and a consistent routine.' :
                    'Best for experienced plant parents. Requires specific conditions.'}
                    </p>
                  </div>
                </motion.div>
              }

              {activeTab === 'description' &&
              <motion.div
                key="description"
                initial={{
                  opacity: 0,
                  y: 10
                }}
                animate={{
                  opacity: 1,
                  y: 0
                }}
                exit={{
                  opacity: 0,
                  y: -10
                }}
                className="prose prose-lg max-w-none text-gray-600">
                
                  <p>{plant.description}</p>
                  <p>
                    Native to tropical regions, the {plant.name} (
                    {plant.scientificName}) has become a beloved addition to
                    homes worldwide. Its unique characteristics make it not just
                    a plant, but a living piece of decor that brings vitality to
                    any space.
                  </p>
                  <p>
                    When you order from NatureBloom, your plant is hand-selected
                    from our nursery in Sri Lanka. We ensure it's healthy,
                    pest-free, and ready to thrive in its new home. It comes
                    potted in our custom {plant.care.soilType.toLowerCase()}
                    designed specifically for this species.
                  </p>
                </motion.div>
              }

              {activeTab === 'reviews' &&
              <motion.div
                key="reviews"
                initial={{
                  opacity: 0,
                  y: 10
                }}
                animate={{
                  opacity: 1,
                  y: 0
                }}
                exit={{
                  opacity: 0,
                  y: -10
                }}
                className="text-center py-12">
                
                  <div className="flex justify-center mb-4">
                    {[1, 2, 3, 4, 5].map((star) =>
                  <StarIcon
                    key={star}
                    size={32}
                    className={
                    star <= Math.round(plant.rating) ?
                    'fill-earth-200 text-earth-200' :
                    'text-gray-200'
                    } />

                  )}
                  </div>
                  <h3 className="font-display text-2xl font-bold text-gray-900 mb-2">
                    {plant.rating} out of 5
                  </h3>
                  <p className="text-gray-500 mb-8">
                    Based on {plant.reviewCount} reviews
                  </p>
                  <button className="px-6 py-2.5 border border-nature-600 text-nature-700 rounded-xl font-medium hover:bg-nature-50 transition-colors">
                    Write a Review
                  </button>
                </motion.div>
              }
            </AnimatePresence>
          </div>
        </div>

        {/* Related Products */}
        {relatedPlants.length > 0 &&
        <section>
            <div className="flex justify-between items-end mb-8">
              <h2 className="font-display text-3xl font-bold text-nature-900">
                You May Also Like
              </h2>
              <Link
              to={`/shop?category=${plant.category}`}
              className="text-nature-600 font-medium hover:text-nature-700 transition-colors flex items-center gap-1">
              
                View More <ChevronRightIcon size={16} />
              </Link>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedPlants.map((p, idx) =>
            <PlantCard key={p.id} plant={p} index={idx} />
            )}
            </div>
          </section>
        }
      </div>
    </div>);

}