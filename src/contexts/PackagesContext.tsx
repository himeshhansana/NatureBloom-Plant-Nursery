import React, { createContext, useContext, ReactNode, useState } from 'react';
import { PlantPackage, CartItem } from '../data/types';
import { plantPackages } from '../data/mockData';
import { toast } from 'sonner';

interface PackagesContextType {
  packages: PlantPackage[];
  getPackageById: (id: string) => PlantPackage | undefined;
  searchPackages: (query: string) => PlantPackage[];
  addPackageToCart: (packageId: string, quantity?: number) => CartItem[];
  filterPackagesByFeatured: () => PlantPackage[];
}

const PackagesContext = createContext<PackagesContextType | undefined>(undefined);

export function PackagesProvider({ children }: { children: ReactNode }) {
  const [packages] = useState<PlantPackage[]>(plantPackages);

  const getPackageById = (id: string): PlantPackage | undefined => {
    return packages.find((pkg) => pkg.id === id);
  };

  const searchPackages = (query: string): PlantPackage[] => {
    const lowerQuery = query.toLowerCase();
    return packages.filter(
      (pkg) =>
        pkg.name.toLowerCase().includes(lowerQuery) ||
        pkg.description.toLowerCase().includes(lowerQuery)
    );
  };

  const addPackageToCart = (packageId: string, quantity = 1): CartItem[] => {
    const pkg = getPackageById(packageId);
    if (!pkg) {
      toast.error('Package not found');
      return [];
    }

    const cartItems: CartItem[] = pkg.plants.map((plantPkg) => ({
      plant: {
        id: plantPkg.plantId,
        name: `${pkg.name} - Plant`,
        scientificName: '',
        price: Math.floor(pkg.discountedPrice / pkg.plants.length),
        image: pkg.image,
        images: [pkg.image],
        category: 'Indoor',
        description: pkg.description,
        stock: pkg.stock,
        saleStock: pkg.stock,
        rentalStock: 0,
        rating: pkg.rating,
        reviewCount: pkg.reviewCount,
        care: {
          water: 'Medium',
          sunlight: 'Indirect',
          difficulty: 'Beginner',
          humidity: 'Medium',
          fertilizer: 'Monthly',
          temperature: '18-28°C',
          soilType: 'Well-draining potting mix'
        },
        tags: ['package'],
        featured: false,
        bestseller: false,
        newArrival: false
      },
      quantity: plantPkg.quantity * quantity,
      addedAt: new Date()
    }));

    toast.success(`Added ${pkg.name} (${quantity}) to cart`);
    return cartItems;
  };

  const filterPackagesByFeatured = (): PlantPackage[] => {
    return packages.filter((pkg) => pkg.featured);
  };

  return (
    <PackagesContext.Provider
      value={{
        packages,
        getPackageById,
        searchPackages,
        addPackageToCart,
        filterPackagesByFeatured
      }}
    >
      {children}
    </PackagesContext.Provider>
  );
}

export function usePackages() {
  const context = useContext(PackagesContext);
  if (!context) {
    throw new Error('usePackages must be used within PackagesProvider');
  }
  return context;
}
