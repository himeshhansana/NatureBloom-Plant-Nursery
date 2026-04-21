import {
  Plant,
  Order,
  BlogPost,
  AdminStats,
  User,
  ReturnRequest } from
'./types';

export const plants: Plant[] = [
{
  id: '1',
  name: 'Monstera Deliciosa',
  scientificName: 'Monstera deliciosa',
  price: 2500,
  originalPrice: 3200,
  image:
  'https://images.unsplash.com/photo-1614594975525-e45190c55d0b?w=600&h=600&fit=crop',
  images: [
  'https://images.unsplash.com/photo-1614594975525-e45190c55d0b?w=800&h=800&fit=crop',
  'https://images.unsplash.com/photo-1637967886160-fd78dc3ce3f5?w=800&h=800&fit=crop',
  'https://images.unsplash.com/photo-1632207691143-643e2a9a9361?w=800&h=800&fit=crop'],

  category: 'Indoor',
  description:
  'The iconic Swiss Cheese Plant with its dramatic split leaves. A statement piece for any room that thrives in bright, indirect light.',
  stock: 12,
  rating: 4.8,
  reviewCount: 124,
  care: {
    water: 'Medium',
    sunlight: 'Bright Indirect',
    difficulty: 'Beginner',
    humidity: 'Medium',
    fertilizer: 'Monthly during growing season',
    temperature: '18-30°C',
    soilType: 'Well-draining potting mix'
  },
  tags: ['popular', 'air-purifying', 'low-maintenance'],
  featured: true,
  bestseller: true,
  newArrival: false
},
{
  id: '2',
  name: 'Peace Lily',
  scientificName: 'Spathiphyllum wallisii',
  price: 1200,
  image:
  'https://images.unsplash.com/photo-1593691509543-c55fb32d8de5?w=600&h=600&fit=crop',
  images: [
  'https://images.unsplash.com/photo-1593691509543-c55fb32d8de5?w=800&h=800&fit=crop',
  'https://images.unsplash.com/photo-1616690710400-a16d146927c5?w=800&h=800&fit=crop'],

  category: 'Indoor',
  description:
  'Elegant white blooms and glossy dark leaves make this a perfect gift. Excellent air purifier that thrives in low light conditions.',
  stock: 25,
  rating: 4.6,
  reviewCount: 89,
  care: {
    water: 'Medium',
    sunlight: 'Low Light',
    difficulty: 'Beginner',
    humidity: 'Medium',
    fertilizer: 'Every 6 weeks',
    temperature: '18-27°C',
    soilType: 'Rich, loose potting soil'
  },
  tags: ['air-purifying', 'flowering', 'gift'],
  featured: true,
  bestseller: false,
  newArrival: false
},
{
  id: '3',
  name: 'Fiddle Leaf Fig',
  scientificName: 'Ficus lyrata',
  price: 4500,
  originalPrice: 5500,
  image:
  'https://images.unsplash.com/photo-1459411552884-841db9b3cc2a?w=600&h=600&fit=crop',
  images: [
  'https://images.unsplash.com/photo-1459411552884-841db9b3cc2a?w=800&h=800&fit=crop',
  'https://images.unsplash.com/photo-1545241047-6083a3684587?w=800&h=800&fit=crop'],

  category: 'Indoor',
  description:
  'A stunning statement plant with large, violin-shaped leaves. The ultimate Instagram-worthy houseplant for modern interiors.',
  stock: 5,
  rating: 4.4,
  reviewCount: 67,
  care: {
    water: 'Medium',
    sunlight: 'Bright Indirect',
    difficulty: 'Intermediate',
    humidity: 'Medium',
    fertilizer: 'Monthly in spring/summer',
    temperature: '16-24°C',
    soilType: 'Well-draining, slightly acidic'
  },
  tags: ['statement', 'trendy', 'instagram'],
  featured: true,
  bestseller: true,
  newArrival: false
},
{
  id: '4',
  name: 'Snake Plant',
  scientificName: 'Sansevieria trifasciata',
  price: 950,
  image:
  'https://images.unsplash.com/photo-1572688484438-313a56e6dc34?w=600&h=600&fit=crop',
  images: [
  'https://images.unsplash.com/photo-1572688484438-313a56e6dc34?w=800&h=800&fit=crop'],

  category: 'Indoor',
  description:
  'Nearly indestructible and perfect for beginners. Striking upright leaves purify air even at night.',
  stock: 40,
  rating: 4.9,
  reviewCount: 203,
  care: {
    water: 'Low',
    sunlight: 'Low Light',
    difficulty: 'Beginner',
    humidity: 'Low',
    fertilizer: 'Twice a year',
    temperature: '15-30°C',
    soilType: 'Sandy, well-draining'
  },
  tags: ['beginner', 'air-purifying', 'low-maintenance'],
  featured: false,
  bestseller: true,
  newArrival: false
},
{
  id: '5',
  name: 'Bougainvillea',
  scientificName: 'Bougainvillea spectabilis',
  price: 1800,
  image:
  'https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=600&h=600&fit=crop',
  images: [
  'https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=800&h=800&fit=crop'],

  category: 'Flowering',
  description:
  'Vibrant tropical blooms in stunning magenta. Perfect for Sri Lankan gardens, thriving in full sun and heat.',
  stock: 18,
  rating: 4.7,
  reviewCount: 56,
  care: {
    water: 'Low',
    sunlight: 'Direct Sun',
    difficulty: 'Beginner',
    humidity: 'Low',
    fertilizer: 'Monthly with bloom booster',
    temperature: '20-35°C',
    soilType: 'Well-draining, slightly acidic'
  },
  tags: ['tropical', 'colorful', 'outdoor'],
  featured: true,
  bestseller: false,
  newArrival: false
},
{
  id: '6',
  name: 'Jade Plant',
  scientificName: 'Crassula ovata',
  price: 750,
  image:
  'https://images.unsplash.com/photo-1509423350716-97f9360b4e09?w=600&h=600&fit=crop',
  images: [
  'https://images.unsplash.com/photo-1509423350716-97f9360b4e09?w=800&h=800&fit=crop'],

  category: 'Succulents',
  description:
  'A symbol of good luck and prosperity. Thick, glossy leaves on a tree-like form. Incredibly easy to care for.',
  stock: 30,
  rating: 4.5,
  reviewCount: 78,
  care: {
    water: 'Low',
    sunlight: 'Bright Indirect',
    difficulty: 'Beginner',
    humidity: 'Low',
    fertilizer: 'Every 3 months',
    temperature: '18-28°C',
    soilType: 'Cactus/succulent mix'
  },
  tags: ['lucky', 'succulent', 'gift'],
  featured: false,
  bestseller: false,
  newArrival: true
},
{
  id: '7',
  name: 'Orchid Phalaenopsis',
  scientificName: 'Phalaenopsis amabilis',
  price: 3200,
  image:
  'https://images.unsplash.com/photo-1566873535350-a3f5d4a804b7?w=600&h=600&fit=crop',
  images: [
  'https://images.unsplash.com/photo-1566873535350-a3f5d4a804b7?w=800&h=800&fit=crop'],

  category: 'Flowering',
  description:
  'Elegant moth orchid with cascading white blooms. A sophisticated gift that blooms for months with minimal care.',
  stock: 8,
  rating: 4.7,
  reviewCount: 92,
  care: {
    water: 'Low',
    sunlight: 'Indirect',
    difficulty: 'Intermediate',
    humidity: 'High',
    fertilizer: 'Bi-weekly with orchid food',
    temperature: '18-28°C',
    soilType: 'Orchid bark mix'
  },
  tags: ['elegant', 'gift', 'flowering'],
  featured: true,
  bestseller: false,
  newArrival: false
},
{
  id: '8',
  name: 'Curry Leaf Plant',
  scientificName: 'Murraya koenigii',
  price: 650,
  image:
  'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=600&h=600&fit=crop',
  images: [
  'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=800&h=800&fit=crop'],

  category: 'Herbs',
  description:
  'Essential for Sri Lankan cooking! Fresh curry leaves from your own garden. Aromatic and easy to grow in tropical climates.',
  stock: 50,
  rating: 4.9,
  reviewCount: 156,
  care: {
    water: 'Medium',
    sunlight: 'Direct Sun',
    difficulty: 'Beginner',
    humidity: 'Medium',
    fertilizer: 'Monthly with nitrogen-rich',
    temperature: '20-35°C',
    soilType: 'Rich, well-draining'
  },
  tags: ['culinary', 'local', 'essential'],
  featured: false,
  bestseller: true,
  newArrival: false
},
{
  id: '9',
  name: 'Aloe Vera',
  scientificName: 'Aloe barbadensis miller',
  price: 550,
  image:
  'https://images.unsplash.com/photo-1567331711402-509c12c41959?w=600&h=600&fit=crop',
  images: [
  'https://images.unsplash.com/photo-1567331711402-509c12c41959?w=800&h=800&fit=crop'],

  category: 'Succulents',
  description:
  "Nature's medicine cabinet. Soothing gel for burns and skin care, plus a beautiful architectural plant for your home.",
  stock: 35,
  rating: 4.8,
  reviewCount: 178,
  care: {
    water: 'Low',
    sunlight: 'Bright Indirect',
    difficulty: 'Beginner',
    humidity: 'Low',
    fertilizer: 'Every 3 months',
    temperature: '18-30°C',
    soilType: 'Sandy, well-draining'
  },
  tags: ['medicinal', 'easy', 'useful'],
  featured: false,
  bestseller: true,
  newArrival: false
},
{
  id: '10',
  name: 'Bird of Paradise',
  scientificName: 'Strelitzia reginae',
  price: 5500,
  originalPrice: 6500,
  image:
  'https://images.unsplash.com/photo-1603912699214-92627f304eb6?w=600&h=600&fit=crop',
  images: [
  'https://images.unsplash.com/photo-1603912699214-92627f304eb6?w=800&h=800&fit=crop'],

  category: 'Outdoor',
  description:
  'Dramatic tropical beauty with banana-like leaves and exotic orange flowers. A showstopper for any garden.',
  stock: 3,
  rating: 4.6,
  reviewCount: 34,
  care: {
    water: 'Medium',
    sunlight: 'Direct Sun',
    difficulty: 'Intermediate',
    humidity: 'Medium',
    fertilizer: 'Bi-weekly in growing season',
    temperature: '20-30°C',
    soilType: 'Rich, well-draining loam'
  },
  tags: ['tropical', 'statement', 'exotic'],
  featured: true,
  bestseller: false,
  newArrival: true
},
{
  id: '11',
  name: 'Pothos Golden',
  scientificName: 'Epipremnum aureum',
  price: 480,
  image:
  'https://images.unsplash.com/photo-1637967886160-fd78dc3ce3f5?w=600&h=600&fit=crop',
  images: [
  'https://images.unsplash.com/photo-1637967886160-fd78dc3ce3f5?w=800&h=800&fit=crop'],

  category: 'Indoor',
  description:
  'The ultimate beginner plant with cascading golden-green vines. Grows in almost any condition and purifies air beautifully.',
  stock: 60,
  rating: 4.9,
  reviewCount: 245,
  care: {
    water: 'Medium',
    sunlight: 'Low Light',
    difficulty: 'Beginner',
    humidity: 'Low',
    fertilizer: 'Monthly',
    temperature: '15-30°C',
    soilType: 'Standard potting mix'
  },
  tags: ['beginner', 'trailing', 'air-purifying'],
  featured: false,
  bestseller: true,
  newArrival: false
},
{
  id: '12',
  name: 'Mango Sapling',
  scientificName: 'Mangifera indica',
  price: 1500,
  image:
  'https://images.unsplash.com/photo-1553279768-865429fa0078?w=600&h=600&fit=crop',
  images: [
  'https://images.unsplash.com/photo-1553279768-865429fa0078?w=800&h=800&fit=crop'],

  category: 'Fruit Trees',
  description:
  'Grow your own mangoes! Premium grafted sapling that fruits within 2-3 years. Perfect for Sri Lankan home gardens.',
  stock: 15,
  rating: 4.7,
  reviewCount: 43,
  care: {
    water: 'Medium',
    sunlight: 'Direct Sun',
    difficulty: 'Beginner',
    humidity: 'Medium',
    fertilizer: 'Quarterly with organic compost',
    temperature: '24-35°C',
    soilType: 'Deep, well-draining loam'
  },
  tags: ['fruit', 'local', 'garden'],
  featured: false,
  bestseller: false,
  newArrival: true
}];


export const categories = [
{
  name: 'Indoor',
  icon: '🏠',
  count: 45,
  image:
  'https://images.unsplash.com/photo-1545241047-6083a3684587?w=400&h=300&fit=crop'
},
{
  name: 'Outdoor',
  icon: '🌳',
  count: 32,
  image:
  'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=400&h=300&fit=crop'
},
{
  name: 'Flowering',
  icon: '🌸',
  count: 28,
  image:
  'https://images.unsplash.com/photo-1490750967868-88aa4f44baee?w=400&h=300&fit=crop'
},
{
  name: 'Succulents',
  icon: '🌵',
  count: 24,
  image:
  'https://images.unsplash.com/photo-1459411552884-841db9b3cc2a?w=400&h=300&fit=crop'
},
{
  name: 'Herbs',
  icon: '🌿',
  count: 18,
  image:
  'https://images.unsplash.com/photo-1466692476868-aef1dfb1e735?w=400&h=300&fit=crop'
},
{
  name: 'Fruit Trees',
  icon: '🍋',
  count: 15,
  image:
  'https://images.unsplash.com/photo-1553279768-865429fa0078?w=400&h=300&fit=crop'
}];


export const blogPosts: BlogPost[] = [
{
  id: '1',
  title: 'Monsoon Plant Care: Protecting Your Garden in Sri Lanka',
  excerpt:
  'Essential tips to keep your plants thriving during the heavy monsoon season.',
  content: '',
  image:
  'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=800&h=400&fit=crop',
  author: 'Kasun Perera',
  category: 'Plant Care',
  createdAt: new Date('2025-03-15'),
  readTime: 5
},
{
  id: '2',
  title: '10 Best Indoor Plants for Sri Lankan Homes',
  excerpt:
  'Transform your living space with these beautiful, low-maintenance indoor plants.',
  content: '',
  image:
  'https://images.unsplash.com/photo-1545241047-6083a3684587?w=800&h=400&fit=crop',
  author: 'Nimali Fernando',
  category: 'Guides',
  createdAt: new Date('2025-03-10'),
  readTime: 8
},
{
  id: '3',
  title: 'Starting a Kitchen Herb Garden',
  excerpt:
  'Grow fresh curry leaves, lemongrass, and more right in your kitchen.',
  content: '',
  image:
  'https://images.unsplash.com/photo-1466692476868-aef1dfb1e735?w=800&h=400&fit=crop',
  author: 'Amara Silva',
  category: 'DIY',
  createdAt: new Date('2025-03-05'),
  readTime: 6
}];


export const sampleOrders: Order[] = [
{
  id: 'NB-2025-001',
  items: [],
  status: 'shipped',
  total: 5700,
  shippingAddress: {
    fullName: 'Kasun Perera',
    phone: '+94 77 123 4567',
    addressLine1: '42 Temple Road',
    city: 'Kandy',
    district: 'Kandy',
    postalCode: '20000'
  },
  createdAt: new Date('2025-03-15'),
  updatedAt: new Date('2025-03-18'),
  trackingId: 'SL-TRACK-78234',
  timeline: [
  {
    status: 'pending',
    date: new Date('2025-03-15T10:00:00'),
    description: 'Order placed successfully'
  },
  {
    status: 'confirmed',
    date: new Date('2025-03-15T14:30:00'),
    description: 'Order confirmed by NatureBloom'
  },
  {
    status: 'packed',
    date: new Date('2025-03-16T09:00:00'),
    description: 'Plants carefully packed with care'
  },
  {
    status: 'shipped',
    date: new Date('2025-03-17T11:00:00'),
    description: 'Handed to delivery partner'
  }]

},
{
  id: 'NB-2025-002',
  items: [],
  status: 'delivered',
  total: 3400,
  shippingAddress: {
    fullName: 'Kasun Perera',
    phone: '+94 77 123 4567',
    addressLine1: '42 Temple Road',
    city: 'Kandy',
    district: 'Kandy',
    postalCode: '20000'
  },
  createdAt: new Date('2025-03-01'),
  updatedAt: new Date('2025-03-05'),
  timeline: [
  {
    status: 'pending',
    date: new Date('2025-03-01T10:00:00'),
    description: 'Order placed'
  },
  {
    status: 'confirmed',
    date: new Date('2025-03-01T12:00:00'),
    description: 'Order confirmed'
  },
  {
    status: 'packed',
    date: new Date('2025-03-02T09:00:00'),
    description: 'Packed with care'
  },
  {
    status: 'shipped',
    date: new Date('2025-03-03T10:00:00'),
    description: 'Out for delivery'
  },
  {
    status: 'delivered',
    date: new Date('2025-03-05T14:00:00'),
    description: 'Delivered successfully'
  }]

}];


export const sampleReturns: ReturnRequest[] = [
{
  id: 'RET-001',
  orderId: 'NB-2025-002',
  reason: 'Plant arrived with damaged leaves',
  status: 'pending',
  createdAt: new Date('2025-03-06')
}];


export const adminStats: AdminStats = {
  totalOrders: 1247,
  totalRevenue: 2850000,
  totalPlants: 156,
  totalCustomers: 834,
  pendingOrders: 23,
  lowStockAlerts: 5,
  pendingReturns: 3,
  revenueChange: 12.5,
  ordersChange: 8.3
};

export const sampleUser: User = {
  id: 'user-1',
  name: 'Kasun Perera',
  email: 'kasun@example.com',
  phone: '+94 77 123 4567',
  avatar:
  'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face',
  addresses: [
  {
    fullName: 'Kasun Perera',
    phone: '+94 77 123 4567',
    addressLine1: '42 Temple Road',
    city: 'Kandy',
    district: 'Kandy',
    postalCode: '20000'
  }],

  joinedAt: new Date('2024-06-15')
};