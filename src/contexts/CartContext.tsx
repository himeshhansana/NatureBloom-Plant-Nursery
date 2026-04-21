import React, { useEffect, useState, createContext, useContext, ReactNode } from 'react';
import { CartItem, Plant } from '../data/types';
import { toast } from 'sonner';
interface CartContextType {
  items: CartItem[];
  addToCart: (plant: Plant, quantity?: number) => void;
  removeFromCart: (plantId: string) => void;
  updateQuantity: (plantId: string, quantity: number) => void;
  clearCart: () => void;
  cartCount: number;
  subtotal: number;
  isCartOpen: boolean;
  setIsCartOpen: (isOpen: boolean) => void;
}
const CartContext = createContext<CartContextType | undefined>(undefined);
export function CartProvider({ children }: {children: ReactNode;}) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  // Load from local storage on mount
  useEffect(() => {
    const savedCart = localStorage.getItem('naturebloom_cart');
    if (savedCart) {
      try {
        const parsed = JSON.parse(savedCart);
        // Revive dates
        const revived = parsed.map((item: any) => ({
          ...item,
          addedAt: new Date(item.addedAt),
          reservationExpiry: item.reservationExpiry ?
          new Date(item.reservationExpiry) :
          undefined
        }));
        setItems(revived);
      } catch (e) {
        console.error('Failed to parse cart', e);
      }
    }
  }, []);
  // Save to local storage on change
  useEffect(() => {
    localStorage.setItem('naturebloom_cart', JSON.stringify(items));
  }, [items]);
  const addToCart = (plant: Plant, quantity = 1) => {
    setItems((prev) => {
      const existing = prev.find((item) => item.plant.id === plant.id);
      if (existing) {
        toast.success(`Updated ${plant.name} quantity in cart`);
        return prev.map((item) =>
        item.plant.id === plant.id ?
        {
          ...item,
          quantity: item.quantity + quantity
        } :
        item
        );
      }
      toast.success(`Added ${plant.name} to cart`);
      // Add reservation expiry (15 mins from now)
      const expiry = new Date();
      expiry.setMinutes(expiry.getMinutes() + 15);
      return [
      ...prev,
      {
        plant,
        quantity,
        addedAt: new Date(),
        reservationExpiry: expiry
      }];

    });
    setIsCartOpen(true);
  };
  const removeFromCart = (plantId: string) => {
    setItems((prev) => prev.filter((item) => item.plant.id !== plantId));
    toast.info('Item removed from cart');
  };
  const updateQuantity = (plantId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(plantId);
      return;
    }
    setItems((prev) =>
    prev.map((item) =>
    item.plant.id === plantId ?
    {
      ...item,
      quantity
    } :
    item
    )
    );
  };
  const clearCart = () => {
    setItems([]);
  };
  const cartCount = items.reduce((sum, item) => sum + item.quantity, 0);
  const subtotal = items.reduce(
    (sum, item) => sum + item.plant.price * item.quantity,
    0
  );
  return (
    <CartContext.Provider
      value={{
        items,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        cartCount,
        subtotal,
        isCartOpen,
        setIsCartOpen
      }}>
      
      {children}
    </CartContext.Provider>);

}
export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}