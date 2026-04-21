import React from 'react';
import { motion } from 'framer-motion';
import {
  DropletsIcon,
  SunIcon,
  ThermometerIcon,
  ShieldCheckIcon,
  LeafIcon } from
'lucide-react';
export function PlantCare() {
  const careGuides = [
  {
    title: 'Indoor Tropicals',
    description: 'Monstera, Peace Lily, Pothos, Philodendron',
    icon: LeafIcon,
    color: 'bg-green-50 text-green-600',
    tips: [
    {
      icon: DropletsIcon,
      title: 'Watering',
      desc: 'Allow top 2 inches of soil to dry out between waterings. Water thoroughly until it drains.'
    },
    {
      icon: SunIcon,
      title: 'Sunlight',
      desc: 'Bright, indirect light. Direct sun will scorch their leaves.'
    },
    {
      icon: ThermometerIcon,
      title: 'Environment',
      desc: 'Keep between 18-27°C. They love high humidity (50-60%).'
    }]

  },
  {
    title: 'Succulents & Cacti',
    description: 'Aloe Vera, Jade Plant, Echeveria, Snake Plant',
    icon: SunIcon,
    color: 'bg-yellow-50 text-yellow-600',
    tips: [
    {
      icon: DropletsIcon,
      title: 'Watering',
      desc: 'Water only when soil is completely dry. Soak and dry method works best.'
    },
    {
      icon: SunIcon,
      title: 'Sunlight',
      desc: 'Bright, direct sunlight for at least 6 hours a day.'
    },
    {
      icon: ThermometerIcon,
      title: 'Environment',
      desc: 'Prefers warm temperatures and low humidity. Ensure excellent drainage.'
    }]

  },
  {
    title: 'Flowering Plants',
    description: 'Orchids, Bougainvillea, Anthurium',
    icon: ShieldCheckIcon,
    color: 'bg-pink-50 text-pink-600',
    tips: [
    {
      icon: DropletsIcon,
      title: 'Watering',
      desc: "Keep soil consistently moist but never soggy. Don't let them dry out completely."
    },
    {
      icon: SunIcon,
      title: 'Sunlight',
      desc: 'Bright indirect light for indoor bloomers, full sun for outdoor varieties.'
    },
    {
      icon: ThermometerIcon,
      title: 'Environment',
      desc: 'Regular fertilizing during blooming season is crucial for healthy flowers.'
    }]

  }];

  return (
    <div className="min-h-screen bg-cream pt-24 pb-20">
      <div className="bg-nature-900 text-white py-20 mb-16 relative overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <img
            src="https://images.unsplash.com/photo-1466692476868-aef1dfb1e735?w=1920&q=80"
            alt="Leaves"
            className="w-full h-full object-cover" />
          
        </div>
        <div className="container mx-auto px-4 relative z-10 text-center">
          <h1 className="font-display text-4xl md:text-6xl font-bold mb-6">
            Plant Care Guides
          </h1>
          <p className="text-nature-200 max-w-2xl mx-auto text-lg">
            Everything you need to know to keep your green friends thriving in
            the Sri Lankan climate.
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 max-w-6xl">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {careGuides.map((guide, idx) =>
          <motion.div
            key={idx}
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
            }}
            className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100 hover:shadow-glass transition-shadow">
            
              <div
              className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-6 ${guide.color}`}>
              
                <guide.icon size={32} />
              </div>
              <h2 className="font-display text-2xl font-bold text-gray-900 mb-2">
                {guide.title}
              </h2>
              <p className="text-sm text-gray-500 mb-8 h-10">
                {guide.description}
              </p>

              <div className="space-y-6">
                {guide.tips.map((tip, tipIdx) =>
              <div key={tipIdx} className="flex gap-4">
                    <div className="mt-1 text-nature-500 shrink-0">
                      <tip.icon size={20} />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-1">
                        {tip.title}
                      </h3>
                      <p className="text-sm text-gray-600 leading-relaxed">
                        {tip.desc}
                      </p>
                    </div>
                  </div>
              )}
              </div>
            </motion.div>
          )}
        </div>

        <div className="mt-20 bg-nature-50 rounded-3xl p-8 md:p-12 text-center max-w-4xl mx-auto border border-nature-100">
          <h2 className="font-display text-3xl font-bold text-nature-900 mb-4">
            Need specific advice?
          </h2>
          <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
            Every plant on our shop has a detailed, specific care guide on its
            product page. If you're still unsure, our plant experts are here to
            help!
          </p>
          <button className="px-8 py-3 bg-nature-600 text-white rounded-xl font-medium hover:bg-nature-700 transition-colors">
            Contact an Expert
          </button>
        </div>
      </div>
    </div>);

}