import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { StarIcon, ShoppingCartIcon, LeafIcon } from 'lucide-react';
import { Plant } from '../data/types';
import { useCart } from '../contexts/CartContext';
interface PlantCardProps {
  plant: Plant;
  index?: number;
}
export function PlantCard({ plant, index = 0 }: PlantCardProps) {
  const { addToCart } = useCart();
  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(plant);
  };
  const isOutOfStock = plant.stock === 0;
  const isLowStock = plant.stock > 0 && plant.stock <= 5;
  return (
    <motion.div
      initial={{
        opacity: 0,
        y: 20
      }}
      animate={{
        opacity: 1,
        y: 0
      }}
      transition={{
        duration: 0.4,
        delay: index * 0.05
      }}
      whileHover={{
        y: -5
      }}
      className="group bg-white rounded-2xl overflow-hidden shadow-soft hover:shadow-glass-lg transition-all duration-300 border border-nature-50 flex flex-col h-full relative">
      
      {/* Badges */}
      <div className="absolute top-3 left-3 z-10 flex flex-col gap-2">
        {plant.bestseller &&
        <span className="bg-earth-200 text-white text-xs font-bold px-2.5 py-1 rounded-full shadow-sm">
            Bestseller
          </span>
        }
        {plant.newArrival &&
        <span className="bg-nature-500 text-white text-xs font-bold px-2.5 py-1 rounded-full shadow-sm">
            New
          </span>
        }
        {plant.originalPrice &&
        <span className="bg-red-500 text-white text-xs font-bold px-2.5 py-1 rounded-full shadow-sm">
            Sale
          </span>
        }
      </div>

      {/* Image Container */}
      <Link
        to={`/product/${plant.id}`}
        className="relative aspect-[4/5] overflow-hidden bg-nature-50 block">
        
        <img
          src={plant.image}
          alt={plant.name}
          className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out" />
        

        {/* Quick Add Overlay */}
        <div className="absolute inset-x-0 bottom-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out bg-gradient-to-t from-black/60 to-transparent flex justify-center">
          <button
            onClick={handleAddToCart}
            disabled={isOutOfStock}
            className={`w-full py-2.5 rounded-xl flex items-center justify-center gap-2 font-medium text-sm transition-colors backdrop-blur-md ${isOutOfStock ? 'bg-gray-200/80 text-gray-500 cursor-not-allowed' : 'bg-white/90 text-nature-900 hover:bg-white'}`}>
            
            <ShoppingCartIcon size={16} />
            {isOutOfStock ? 'Out of Stock' : 'Quick Add'}
          </button>
        </div>
      </Link>

      {/* Content */}
      <div className="p-5 flex flex-col flex-grow">
        <div className="flex justify-between items-start mb-1">
          <p className="text-xs font-medium text-nature-500 uppercase tracking-wider">
            {plant.category}
          </p>
          <div className="flex items-center gap-1">
            <StarIcon size={12} className="fill-earth-200 text-earth-200" />
            <span className="text-xs font-medium text-gray-600">
              {plant.rating}
            </span>
          </div>
        </div>

        <Link to={`/product/${plant.id}`} className="block mt-1 mb-2">
          <h3 className="font-display font-semibold text-lg text-gray-900 line-clamp-1 group-hover:text-nature-600 transition-colors">
            {plant.name}
          </h3>
          <p className="text-xs text-gray-500 italic line-clamp-1">
            {plant.scientificName}
          </p>
        </Link>

        {/* Care Icons */}
        <div className="flex items-center gap-3 mt-auto mb-4 text-gray-400">
          <div
            className="flex items-center gap-1"
            title={`Water: ${plant.care.water}`}>
            
            <LeafIcon
              size={14}
              className={plant.care.water === 'High' ? 'text-blue-400' : ''} />
            
          </div>
        </div>

        <div className="flex items-center justify-between mt-auto pt-4 border-t border-gray-100">
          <div className="flex flex-col">
            <div className="flex items-center gap-2">
              <span className="font-semibold text-nature-900">
                Rs. {plant.price.toLocaleString()}
              </span>
              {plant.originalPrice &&
              <span className="text-xs text-gray-400 line-through">
                  Rs. {plant.originalPrice.toLocaleString()}
                </span>
              }
            </div>
          </div>

          {/* Stock Indicator */}
          {isOutOfStock ?
          <span className="text-xs font-medium text-red-500 bg-red-50 px-2 py-1 rounded-md">
              Out of Stock
            </span> :
          isLowStock ?
          <span className="text-xs font-medium text-earth-300 bg-earth-50 px-2 py-1 rounded-md">
              Only {plant.stock} left
            </span> :

          <span className="text-xs font-medium text-nature-600 bg-nature-50 px-2 py-1 rounded-md">
              In Stock
            </span>
          }
        </div>
      </div>
    </motion.div>);

}