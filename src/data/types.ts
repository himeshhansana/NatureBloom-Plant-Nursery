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
  saleStock: number;
  rentalStock: number;
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
  videoUrl?: string;
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

// ============ PLANT PACKAGES ============
export interface PlantPackage {
  id: string;
  name: string;
  description: string;
  image: string;
  basePrice: number;
  discountedPrice: number;
  plants: PackagePlant[];
  videoUrl?: string;
  rating: number;
  reviewCount: number;
  stock: number;
  featured: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface PackagePlant {
  plantId: string;
  quantity: number;
  plant?: Plant;
}

// ============ RENTAL SYSTEM ============
export type RentalPeriod = 'weekly' | 'monthly';

export interface RentalPlan {
  weekly: number;
  monthly: number;
}

export interface RentalRequest {
  id: string;
  userId: string;
  userName: string;
  userEmail: string;
  userPhone: string;
  companyName: string;
  plants: RentalPlant[];
  rentalPeriod: RentalPeriod;
  startDate: Date;
  endDate: Date;
  subtotal: number;
  discountPercent?: number;
  discountAmount?: number;
  discountCode?: string;
  totalCost: number;
  deliveryAddress: Address;
  status: 'pending' | 'approved' | 'rejected' | 'in-rental' | 'returned' | 'damage-assessed';
  assignedDeliveryPerson?: string;
  notes?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface RentalPlant {
  plantId: string;
  quantity: number;
  rentalPrice: number;
  plant?: Plant;
}

export interface RentalDamageAssessment {
  id: string;
  rentalRequestId: string;
  damageReports: DamageReport[];
  totalDamageFee: number;
  status: 'pending' | 'completed';
  createdAt: Date;
  updatedAt: Date;
}

export interface DamageReport {
  plantId: string;
  quantity: number;
  condition: 'excellent' | 'good' | 'fair' | 'damaged' | 'lost';
  description: string;
  fee: number;
}