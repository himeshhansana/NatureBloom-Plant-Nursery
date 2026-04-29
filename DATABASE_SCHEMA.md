# 🌿 NatureBloom Plant Nursery - Complete Database Schema

**Last Updated**: April 28, 2026  
**Version**: 1.0  
**Status**: Production Ready

---

## 📊 Database Overview

```
CORE ENTITIES:
├── Users System
├── Plants & Inventory
├── Shopping System (Packages & Orders)
├── Rental System (Corporate Rental)
├── Content System (Blog)
└── Admin Management
```

---

## 📋 Database Tables & Relationships

### 1️⃣ USERS TABLE
**Table Name**: `users`

| Field | Type | Required | Unique | Description |
|-------|------|----------|--------|-------------|
| id | UUID | ✅ | ✅ | Primary key |
| name | VARCHAR(255) | ✅ | ❌ | Customer full name |
| email | VARCHAR(255) | ✅ | ✅ | Email address |
| phone | VARCHAR(20) | ✅ | ✅ | Contact number |
| avatar | TEXT | ❌ | ❌ | Profile picture URL |
| joinedAt | TIMESTAMP | ✅ | ❌ | Account creation date |
| createdAt | TIMESTAMP | ✅ | ❌ | Record creation |
| updatedAt | TIMESTAMP | ✅ | ❌ | Last update |

**Relationships**: 
- 1 User → Many Orders
- 1 User → Many Rental Requests
- 1 User → Many Addresses

---

### 2️⃣ ADDRESSES TABLE
**Table Name**: `addresses`

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| id | UUID | ✅ | Primary key |
| userId | UUID | ✅ | Foreign key → Users |
| fullName | VARCHAR(255) | ✅ | Recipient name |
| phone | VARCHAR(20) | ✅ | Contact number |
| addressLine1 | VARCHAR(255) | ✅ | Street address |
| addressLine2 | VARCHAR(255) | ❌ | Apartment/suite |
| city | VARCHAR(100) | ✅ | City name |
| district | VARCHAR(100) | ✅ | District (Colombo, Kandy, etc.) |
| postalCode | VARCHAR(10) | ✅ | Postal code |
| isDefault | BOOLEAN | ❌ | Default delivery address |
| createdAt | TIMESTAMP | ✅ | Record creation |

**Relationships**: 
- Many Addresses → 1 User

---

### 3️⃣ PLANTS TABLE
**Table Name**: `plants`

| Field | Type | Required | Unique | Description |
|-------|------|----------|--------|-------------|
| id | UUID | ✅ | ✅ | Primary key |
| name | VARCHAR(255) | ✅ | ❌ | Common name |
| scientificName | VARCHAR(255) | ✅ | ✅ | Scientific name |
| price | DECIMAL(10,2) | ✅ | ❌ | Current selling price (Rs.) |
| originalPrice | DECIMAL(10,2) | ❌ | ❌ | Original price before discount |
| image | TEXT | ✅ | ❌ | Primary image URL |
| images | JSON | ✅ | ❌ | Array of image URLs |
| category | ENUM | ✅ | ❌ | Indoor/Outdoor/Flowering/Succulents/Herbs/Fruit Trees/Ornamental/Aquatic |
| description | TEXT | ✅ | ❌ | Plant description |
| stock | INT | ✅ | ❌ | Total stock count |
| saleStock | INT | ✅ | ❌ | Available for sale |
| rentalStock | INT | ✅ | ❌ | Available for rental |
| rating | DECIMAL(3,1) | ✅ | ❌ | Average rating (0-5) |
| reviewCount | INT | ✅ | ❌ | Number of reviews |
| tags | JSON | ✅ | ❌ | Array of tags |
| featured | BOOLEAN | ✅ | ❌ | Featured on homepage |
| bestseller | BOOLEAN | ✅ | ❌ | Bestseller status |
| newArrival | BOOLEAN | ✅ | ❌ | New arrival status |
| createdAt | TIMESTAMP | ✅ | ❌ | Record creation |
| updatedAt | TIMESTAMP | ✅ | ❌ | Last update |

**Care Details** (Nested Object):
- water: Low/Medium/High
- sunlight: Low Light/Indirect/Bright Indirect/Direct Sun
- difficulty: Beginner/Intermediate/Expert
- humidity: Low/Medium/High
- fertilizer: VARCHAR(255)
- temperature: VARCHAR(100)
- soilType: VARCHAR(100)

**Relationships**: 
- 1 Plant → Many Cart Items
- 1 Plant → Many Package Plants
- 1 Plant → Many Rental Plants
- 1 Plant → Many Reviews

---

### 4️⃣ PLANT_PACKAGES TABLE
**Table Name**: `plant_packages`

| Field | Type | Required | Unique | Description |
|-------|------|----------|--------|-------------|
| id | UUID | ✅ | ✅ | Primary key |
| name | VARCHAR(255) | ✅ | ❌ | Package name |
| description | TEXT | ✅ | ❌ | Package description |
| image | TEXT | ✅ | ❌ | Package image URL |
| basePrice | DECIMAL(10,2) | ✅ | ❌ | Original total price (Rs.) |
| discountedPrice | DECIMAL(10,2) | ✅ | ❌ | Discounted price (Rs.) |
| videoUrl | TEXT | ❌ | ❌ | YouTube embed URL |
| rating | DECIMAL(3,1) | ✅ | ❌ | Package rating (0-5) |
| reviewCount | INT | ✅ | ❌ | Number of reviews |
| stock | INT | ✅ | ❌ | Package inventory |
| featured | BOOLEAN | ✅ | ❌ | Featured package |
| createdAt | TIMESTAMP | ✅ | ❌ | Record creation |
| updatedAt | TIMESTAMP | ✅ | ❌ | Last update |

**Relationships**: 
- 1 Package → Many Package Plants
- 1 Package → Many Cart Items

---

### 5️⃣ PACKAGE_PLANTS TABLE (Many-to-Many)
**Table Name**: `package_plants`

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| id | UUID | ✅ | Primary key |
| packageId | UUID | ✅ | Foreign key → Plant Packages |
| plantId | UUID | ✅ | Foreign key → Plants |
| quantity | INT | ✅ | Number of plants in package |
| createdAt | TIMESTAMP | ✅ | Record creation |

**Relationships**: 
- Many Package Plants → 1 Package
- Many Package Plants → 1 Plant

---

### 6️⃣ CART_ITEMS TABLE
**Table Name**: `cart_items`

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| id | UUID | ✅ | Primary key |
| sessionId | UUID | ✅ | Shopping session ID |
| plantId | UUID | ❌ | Foreign key → Plants (if single item) |
| packageId | UUID | ❌ | Foreign key → Plant Packages (if package) |
| quantity | INT | ✅ | Quantity selected |
| addedAt | TIMESTAMP | ✅ | Added to cart date |
| reservationExpiry | TIMESTAMP | ❌ | Stock reservation expiry |

**Relationships**: 
- Many Cart Items → 1 Plant (optional)
- Many Cart Items → 1 Package (optional)

---

### 7️⃣ ORDERS TABLE
**Table Name**: `orders`

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| id | UUID | ✅ | Primary key (NB-YYYY-XXX format) |
| userId | UUID | ✅ | Foreign key → Users |
| status | ENUM | ✅ | pending/confirmed/packed/shipped/delivered/cancelled |
| total | DECIMAL(10,2) | ✅ | Total amount (Rs.) |
| trackingId | VARCHAR(100) | ❌ | Courier tracking ID |
| deliveryAddressId | UUID | ✅ | Foreign key → Addresses |
| createdAt | TIMESTAMP | ✅ | Order date |
| updatedAt | TIMESTAMP | ✅ | Last update |

**Relationships**: 
- 1 Order → 1 User
- 1 Order → Many Order Items
- 1 Order → 1 Address
- 1 Order → Many Order Timeline Events

---

### 8️⃣ ORDER_ITEMS TABLE (Order Details)
**Table Name**: `order_items`

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| id | UUID | ✅ | Primary key |
| orderId | UUID | ✅ | Foreign key → Orders |
| plantId | UUID | ❌ | Foreign key → Plants (if single) |
| packageId | UUID | ❌ | Foreign key → Packages (if package) |
| quantity | INT | ✅ | Quantity ordered |
| price | DECIMAL(10,2) | ✅ | Unit price at time of order |
| total | DECIMAL(10,2) | ✅ | Line total (quantity × price) |

---

### 9️⃣ ORDER_TIMELINE TABLE
**Table Name**: `order_timeline`

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| id | UUID | ✅ | Primary key |
| orderId | UUID | ✅ | Foreign key → Orders |
| status | ENUM | ✅ | Order status at this point |
| description | VARCHAR(255) | ✅ | Status description |
| timestamp | TIMESTAMP | ✅ | Event timestamp |

---

### 🔟 RETURN_REQUESTS TABLE
**Table Name**: `return_requests`

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| id | UUID | ✅ | Primary key |
| orderId | UUID | ✅ | Foreign key → Orders |
| reason | TEXT | ✅ | Return reason |
| status | ENUM | ✅ | pending/approved/rejected/completed |
| images | JSON | ❌ | Array of damage/issue image URLs |
| createdAt | TIMESTAMP | ✅ | Request date |
| updatedAt | TIMESTAMP | ✅ | Last update |

**Relationships**: 
- 1 Return Request → 1 Order

---

### 1️⃣1️⃣ RENTAL_REQUESTS TABLE
**Table Name**: `rental_requests`

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| id | UUID | ✅ | Primary key |
| userId | UUID | ✅ | Foreign key → Users |
| userName | VARCHAR(255) | ✅ | Customer name |
| userEmail | VARCHAR(255) | ✅ | Customer email |
| userPhone | VARCHAR(20) | ✅ | Customer phone |
| companyName | VARCHAR(255) | ✅ | Company/Organization name |
| rentalPeriod | ENUM | ✅ | weekly/monthly |
| startDate | DATE | ✅ | Rental start date |
| endDate | DATE | ✅ | Rental end date |
| totalCost | DECIMAL(10,2) | ✅ | Total rental cost (Rs.) |
| deliveryAddressId | UUID | ✅ | Foreign key → Addresses |
| status | ENUM | ✅ | pending/approved/rejected/in-rental/returned/damage-assessed |
| assignedDeliveryPerson | VARCHAR(255) | ❌ | Delivery personnel name |
| notes | TEXT | ❌ | Special requests/notes |
| createdAt | TIMESTAMP | ✅ | Request creation date |
| updatedAt | TIMESTAMP | ✅ | Last update |

**Relationships**: 
- 1 Rental Request → 1 User
- 1 Rental Request → Many Rental Plants
- 1 Rental Request → 1 Damage Assessment (optional)

---

### 1️⃣2️⃣ RENTAL_PLANTS TABLE
**Table Name**: `rental_plants`

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| id | UUID | ✅ | Primary key |
| rentalRequestId | UUID | ✅ | Foreign key → Rental Requests |
| plantId | UUID | ✅ | Foreign key → Plants |
| quantity | INT | ✅ | Number of plants |
| rentalPrice | DECIMAL(10,2) | ✅ | Price per plant for rental period |

**Relationships**: 
- Many Rental Plants → 1 Rental Request
- Many Rental Plants → 1 Plant

---

### 1️⃣3️⃣ RENTAL_DAMAGE_ASSESSMENTS TABLE
**Table Name**: `rental_damage_assessments`

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| id | UUID | ✅ | Primary key |
| rentalRequestId | UUID | ✅ | Foreign key → Rental Requests |
| totalDamageFee | DECIMAL(10,2) | ✅ | Total damage charges (Rs.) |
| status | ENUM | ✅ | pending/completed |
| createdAt | TIMESTAMP | ✅ | Assessment date |
| updatedAt | TIMESTAMP | ✅ | Last update |

**Relationships**: 
- 1 Damage Assessment → 1 Rental Request
- 1 Damage Assessment → Many Damage Reports

---

### 1️⃣4️⃣ DAMAGE_REPORTS TABLE
**Table Name**: `damage_reports`

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| id | UUID | ✅ | Primary key |
| assessmentId | UUID | ✅ | Foreign key → Damage Assessments |
| plantId | UUID | ✅ | Foreign key → Plants |
| quantity | INT | ✅ | Number of damaged plants |
| condition | ENUM | ✅ | excellent/good/fair/damaged/lost |
| description | TEXT | ✅ | Damage description |
| fee | DECIMAL(10,2) | ✅ | Damage charge (Rs.) |

---

### 1️⃣5️⃣ BLOG_POSTS TABLE
**Table Name**: `blog_posts`

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| id | UUID | ✅ | Primary key |
| title | VARCHAR(255) | ✅ | Blog title |
| excerpt | TEXT | ✅ | Short summary |
| content | LONGTEXT | ✅ | Full article content |
| image | TEXT | ✅ | Featured image URL |
| author | VARCHAR(255) | ✅ | Author name |
| category | VARCHAR(100) | ✅ | Blog category |
| videoUrl | TEXT | ❌ | YouTube embed URL |
| readTime | INT | ✅ | Estimated read time (minutes) |
| views | INT | ✅ | View count |
| published | BOOLEAN | ✅ | Published status |
| createdAt | TIMESTAMP | ✅ | Creation date |
| updatedAt | TIMESTAMP | ✅ | Last update |

---

### 1️⃣6️⃣ REVIEWS TABLE
**Table Name**: `reviews`

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| id | UUID | ✅ | Primary key |
| plantId | UUID | ✅ | Foreign key → Plants |
| userId | UUID | ✅ | Foreign key → Users |
| rating | INT | ✅ | Rating (1-5) |
| title | VARCHAR(255) | ✅ | Review title |
| comment | TEXT | ✅ | Review comment |
| helpful | INT | ✅ | Helpful count |
| createdAt | TIMESTAMP | ✅ | Review date |

---

## 📐 Database Schema Diagram

```
┌─────────────────────────────────────────────────────────────────────┐
│                         USERS SYSTEM                                 │
├─────────────────────────────────────────────────────────────────────┤
│  users                    addresses                                   │
│  ├─ id (PK)              ├─ id (PK)                                  │
│  ├─ name                 ├─ userId (FK)                              │
│  ├─ email                ├─ fullName, phone, address details         │
│  ├─ phone                └─ city, district, postalCode               │
│  └─ joinedAt             (1:N relationship)                          │
└─────────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────────┐
│                      PRODUCTS SYSTEM                                  │
├─────────────────────────────────────────────────────────────────────┤
│  plants                           plant_packages                      │
│  ├─ id (PK)                       ├─ id (PK)                         │
│  ├─ name, scientificName          ├─ name, description               │
│  ├─ price, originalPrice          ├─ basePrice, discountedPrice      │
│  ├─ saleStock, rentalStock        ├─ videoUrl                        │
│  ├─ category, rating              └─ featured                        │
│  └─ careDetails (nested)                 │                           │
│                                          │                           │
│         package_plants (M:N)             │                           │
│         ├─ packageId (FK) ──────────────┘                            │
│         └─ plantId (FK) ────────┐                                    │
│                                 │                                    │
└─────────────────────────────────┼────────────────────────────────────┘
                                  │
┌─────────────────────────────────┼────────────────────────────────────┐
│                    SHOPPING SYSTEM                                    │
├─────────────────────────────────┼────────────────────────────────────┤
│                                 │                                    │
│  cart_items                      │                                    │
│  ├─ plantId or packageId (FK) ──┘                                    │
│  ├─ quantity                                                         │
│  └─ addedAt                                                          │
│                                                                      │
│  orders                          order_items                         │
│  ├─ id (PK)                      ├─ orderId (FK)                     │
│  ├─ userId (FK) ──────┐          ├─ plantId/packageId (FK)           │
│  ├─ status            │          ├─ quantity, price                 │
│  ├─ total             │          └─ total                           │
│  └─ createdAt         │                                              │
│                       │          order_timeline                      │
│        ┌──────────────┘          ├─ orderId (FK)                     │
│        │                         ├─ status                          │
│    addresses                      ├─ description                     │
│    ├─ id (PK)                     └─ timestamp                       │
│    ├─ fullName                                                       │
│    └─ address details             return_requests                    │
│                                   ├─ orderId (FK)                    │
│                                   ├─ reason                          │
│                                   ├─ status                          │
│                                   └─ images                          │
└─────────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────────┐
│                    RENTAL SYSTEM                                      │
├─────────────────────────────────────────────────────────────────────┤
│  rental_requests                rental_plants                        │
│  ├─ id (PK)                     ├─ rentalRequestId (FK)              │
│  ├─ userId (FK)                 ├─ plantId (FK)                      │
│  ├─ companyName                 ├─ quantity                          │
│  ├─ rentalPeriod                └─ rentalPrice                       │
│  ├─ startDate, endDate                                               │
│  ├─ totalCost                   rental_damage_assessments            │
│  └─ status                      ├─ rentalRequestId (FK)              │
│         │                       ├─ totalDamageFee                   │
│         └──────────┐            └─ status                            │
│                    │                  │                             │
│                    │        damage_reports                           │
│                    │        ├─ assessmentId (FK)                     │
│                    │        ├─ plantId (FK)                          │
│                    │        ├─ condition                             │
│                    │        ├─ description                           │
│                    │        └─ fee                                   │
│                    │                                                 │
│        addresses                                                     │
│        ├─ id (PK)                                                    │
│        ├─ fullName                                                   │
│        └─ address details ◄────────────────────────────┘             │
│                                                                      │
└─────────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────────┐
│                    CONTENT SYSTEM                                     │
├─────────────────────────────────────────────────────────────────────┤
│  blog_posts                      reviews                             │
│  ├─ id (PK)                      ├─ id (PK)                          │
│  ├─ title, excerpt               ├─ plantId (FK)                     │
│  ├─ content                      ├─ userId (FK)                      │
│  ├─ author, category             ├─ rating (1-5)                     │
│  ├─ videoUrl                     ├─ title, comment                   │
│  └─ views, published             └─ createdAt                        │
└─────────────────────────────────────────────────────────────────────┘
```

---

## 🔢 Data Statistics

| Table | Est. Records | Growth Rate | Purpose |
|-------|-------------|------------|---------|
| users | 500-2000 | 10-20/month | Customer accounts |
| plants | 50-100 | 5-10/month | Product catalog |
| plant_packages | 5-20 | 2-3/month | Bundle offerings |
| orders | 500-5000 | 50-100/month | Sales transactions |
| rental_requests | 100-500 | 10-20/month | Corporate rentals |
| blog_posts | 20-50 | 2-3/month | Marketing content |
| reviews | 1000-5000 | 50-100/month | Customer feedback |

---

## 🔐 Database Security

- ✅ All IDs are UUIDs (cryptographically secure)
- ✅ Email & Phone indexed for fast lookups
- ✅ Sensitive data encrypted at rest
- ✅ All timestamps auto-managed (UTC)
- ✅ Foreign key constraints enforced
- ✅ Audit trail via createdAt/updatedAt

---

## 📊 Key Relationships Overview

| From | To | Type | Cardinality |
|------|----|----|-------------|
| users | addresses | 1:N | One user → Many addresses |
| users | orders | 1:N | One user → Many orders |
| users | rental_requests | 1:N | One user → Many rentals |
| users | reviews | 1:N | One user → Many reviews |
| plants | cart_items | 1:N | One plant → Many cart items |
| plants | order_items | 1:N | One plant → Many order items |
| plants | reviews | 1:N | One plant → Many reviews |
| plants | rental_plants | 1:N | One plant → Many rentals |
| plant_packages | package_plants | 1:N | One package → Many plants |
| orders | order_items | 1:N | One order → Many items |
| orders | order_timeline | 1:N | One order → Many events |
| orders | return_requests | 1:N | One order → Many returns |
| rental_requests | rental_plants | 1:N | One rental → Many plants |
| rental_requests | rental_damage_assessments | 1:1 | One rental → One assessment |
| rental_damage_assessments | damage_reports | 1:N | One assessment → Many reports |
| blog_posts | (no FK) | Standalone | Independent content |

---

## 🚀 Implementation Notes

**Database Recommendations**:
- ✅ Use PostgreSQL 13+ for JSONB support (for images, tags)
- ✅ Enable UUID extension: `CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`
- ✅ Create indexes on: email, phone, userId, orderId, rentalRequestId
- ✅ Set up automated backup (daily)
- ✅ Enable WAL (Write-Ahead Logging) for crash recovery

**Scalability Considerations**:
- Order table can be partitioned by year if > 1M records
- Blog posts can use CDN for image/video storage
- Plant images in separate blob storage (AWS S3/Azure Blob)
- Implement caching layer (Redis) for frequently accessed plants

---

**Created**: April 28, 2026  
**For**: NatureBloom Plant Nursery  
**Contact**: client@naturebloom.lk
