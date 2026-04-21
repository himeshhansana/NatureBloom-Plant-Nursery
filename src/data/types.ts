export interface Plant {
  id: string;
  name: string;
  scientificName: string;
  price: number;
  originalPrice?: number;
  image: string;
  images: string[];
  category: PlantCategory;
  description: string;
  stock: number;
  rating: number;
  reviewCount: number;
  care: PlantCare;
  tags: string[];
  featured: boolean;
  bestseller: boolean;
  newArrival: boolean;
}

export interface PlantCare {
  water: 'Low' | 'Medium' | 'High';
  sunlight: 'Low Light' | 'Indirect' | 'Bright Indirect' | 'Direct Sun';
  difficulty: 'Beginner' | 'Intermediate' | 'Expert';
  humidity: 'Low' | 'Medium' | 'High';
  fertilizer: string;
  temperature: string;
  soilType: string;
}

export type PlantCategory =
'Indoor' |
'Outdoor' |
'Flowering' |
'Succulents' |
'Herbs' |
'Fruit Trees' |
'Ornamental' |
'Aquatic';

export interface CartItem {
  plant: Plant;
  quantity: number;
  addedAt: Date;
  reservationExpiry?: Date;
}

export interface Order {
  id: string;
  items: CartItem[];
  status: OrderStatus;
  total: number;
  shippingAddress: Address;
  createdAt: Date;
  updatedAt: Date;
  trackingId?: string;
  timeline: OrderTimelineEvent[];
}

export type OrderStatus =
'pending' |
'confirmed' |
'packed' |
'shipped' |
'delivered' |
'cancelled';

export interface OrderTimelineEvent {
  status: OrderStatus;
  date: Date;
  description: string;
}

export interface Address {
  fullName: string;
  phone: string;
  addressLine1: string;
  addressLine2?: string;
  city: string;
  district: string;
  postalCode: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  avatar?: string;
  addresses: Address[];
  joinedAt: Date;
}

export interface ReturnRequest {
  id: string;
  orderId: string;
  reason: string;
  status: 'pending' | 'approved' | 'rejected' | 'completed';
  createdAt: Date;
  images?: string[];
}

export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  image: string;
  author: string;
  category: string;
  createdAt: Date;
  readTime: number;
}

export interface AdminStats {
  totalOrders: number;
  totalRevenue: number;
  totalPlants: number;
  totalCustomers: number;
  pendingOrders: number;
  lowStockAlerts: number;
  pendingReturns: number;
  revenueChange: number;
  ordersChange: number;
}