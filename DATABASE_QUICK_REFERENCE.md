# 📊 NatureBloom Database - Quick Reference Tables

## 🎯 All Database Tables Summary

### 1. USERS (Customer Management)
```
USER ACCOUNT INFORMATION
┌─────────────────────────────────────────────┐
│ Field          │ Type      │ Purpose         │
├─────────────────────────────────────────────┤
│ id             │ UUID      │ Unique ID       │
│ name           │ Text      │ Full name       │
│ email          │ Email     │ Login email     │
│ phone          │ Phone     │ Contact        │
│ avatar         │ Image URL │ Profile pic    │
│ joinedAt       │ Date      │ Registration   │
└─────────────────────────────────────────────┘
Records: ~500-2000
```

---

### 2. PLANTS (Product Catalog)
```
PLANT INVENTORY & DETAILS
┌──────────────────────────────────────────────────┐
│ Field          │ Type      │ Purpose              │
├──────────────────────────────────────────────────┤
│ id             │ UUID      │ Unique ID            │
│ name           │ Text      │ Plant name           │
│ price          │ Currency  │ Selling price (Rs.)  │
│ saleStock      │ Number    │ Available to buy     │
│ rentalStock    │ Number    │ Available to rent    │
│ rating         │ 1-5 Stars │ Customer reviews     │
│ category       │ Enum      │ Type (Indoor, etc.)  │
│ careDetails    │ JSON      │ Water, sun, soil     │
│ featured       │ Boolean   │ Homepage display     │
└──────────────────────────────────────────────────┘
Records: ~50-100
Categories: Indoor, Outdoor, Flowering, Succulents, Herbs, Fruit Trees, Ornamental, Aquatic
```

---

### 3. PLANT_PACKAGES (Bundle Deals)
```
PROMOTIONAL BUNDLES
┌──────────────────────────────────────────────────┐
│ Field          │ Type      │ Purpose              │
├──────────────────────────────────────────────────┤
│ id             │ UUID      │ Unique ID            │
│ name           │ Text      │ Package name         │
│ basePrice      │ Currency  │ Original price       │
│ discountedPrice│ Currency  │ Sale price (Rs.)     │
│ videoUrl       │ URL       │ YouTube guide        │
│ stock          │ Number    │ Packages available   │
│ featured       │ Boolean   │ Homepage display     │
└──────────────────────────────────────────────────┘
Records: ~5-20
Example: "Indoor Jungle Bundle" (5-6 plants, 20% discount)
```

---

### 4. ORDERS (Sales Transactions)
```
CUSTOMER ORDERS
┌──────────────────────────────────────────────────┐
│ Field          │ Type      │ Purpose              │
├──────────────────────────────────────────────────┤
│ id             │ UUID      │ Order ID (NB-YYYY-X) │
│ userId         │ FK        │ Customer link        │
│ status         │ Enum      │ Current state        │
│ total          │ Currency  │ Amount (Rs.)         │
│ trackingId     │ Text      │ Delivery tracking    │
│ createdAt      │ Date      │ Order date           │
└──────────────────────────────────────────────────┘
Statuses: pending → confirmed → packed → shipped → delivered
Records: ~500-5000
```

---

### 5. ORDER_ITEMS (Order Details)
```
WHAT'S IN EACH ORDER
┌──────────────────────────────────────────────────┐
│ Field          │ Type      │ Purpose              │
├──────────────────────────────────────────────────┤
│ orderId        │ FK        │ Links to order       │
│ plantId/pkgId  │ FK        │ What they bought     │
│ quantity       │ Number    │ How many             │
│ price          │ Currency  │ Unit price at time   │
│ total          │ Currency  │ Line total (Rs.)     │
└──────────────────────────────────────────────────┘
```

---

### 6. RETURN_REQUESTS (After-Sales)
```
CUSTOMER RETURNS/REFUNDS
┌──────────────────────────────────────────────────┐
│ Field          │ Type      │ Purpose              │
├──────────────────────────────────────────────────┤
│ orderId        │ FK        │ Return which order   │
│ reason         │ Text      │ Why returning        │
│ status         │ Enum      │ pending/approved     │
│ images         │ URL[]     │ Proof photos         │
│ createdAt      │ Date      │ Request date         │
└──────────────────────────────────────────────────┘
Statuses: pending → approved → completed (or rejected)
```

---

### 7. RENTAL_REQUESTS (Corporate Rental Service)
```
CORPORATE/EVENT PLANT RENTAL
┌──────────────────────────────────────────────────┐
│ Field          │ Type      │ Purpose              │
├──────────────────────────────────────────────────┤
│ id             │ UUID      │ Unique ID            │
│ companyName    │ Text      │ Organization         │
│ rentalPeriod   │ Enum      │ weekly / monthly     │
│ startDate      │ Date      │ Rental begins        │
│ endDate        │ Date      │ Rental ends          │
│ totalCost      │ Currency  │ Total rental (Rs.)   │
│ status         │ Enum      │ Current state        │
│ assignedDelivery│ Text     │ Staff member         │
└──────────────────────────────────────────────────┘
Statuses: pending → approved → in-rental → returned
Records: ~100-500
```

---

### 8. RENTAL_PLANTS (Plants Being Rented)
```
WHICH PLANTS IN EACH RENTAL
┌──────────────────────────────────────────────────┐
│ Field          │ Type      │ Purpose              │
├──────────────────────────────────────────────────┤
│ rentalRequestId│ FK        │ Which rental         │
│ plantId        │ FK        │ What plant           │
│ quantity       │ Number    │ How many             │
│ rentalPrice    │ Currency  │ Weekly/monthly cost  │
└──────────────────────────────────────────────────┘
```

---

### 9. RENTAL_DAMAGE_ASSESSMENTS (Damage Charges)
```
PLANT CONDITION INSPECTION ON RETURN
┌──────────────────────────────────────────────────┐
│ Field          │ Type      │ Purpose              │
├──────────────────────────────────────────────────┤
│ rentalRequestId│ FK        │ Which rental         │
│ totalDamageFee │ Currency  │ Total charges (Rs.)  │
│ status         │ Enum      │ pending / completed  │
│ createdAt      │ Date      │ Assessment date      │
└──────────────────────────────────────────────────┘
```

---

### 10. DAMAGE_REPORTS (Individual Plant Damage)
```
DAMAGE DETAILS PER PLANT
┌──────────────────────────────────────────────────┐
│ Field          │ Type      │ Purpose              │
├──────────────────────────────────────────────────┤
│ plantId        │ FK        │ Which plant          │
│ quantity       │ Number    │ How many damaged     │
│ condition      │ Enum      │ excellent/good/fair/ │
│                │           │ damaged/lost         │
│ description    │ Text      │ What happened        │
│ fee            │ Currency  │ Repair charge (Rs.)  │
└──────────────────────────────────────────────────┘
```

---

### 11. BLOG_POSTS (Marketing Content)
```
EDUCATIONAL BLOG ARTICLES
┌──────────────────────────────────────────────────┐
│ Field          │ Type      │ Purpose              │
├──────────────────────────────────────────────────┤
│ id             │ UUID      │ Unique ID            │
│ title          │ Text      │ Article title        │
│ excerpt        │ Text      │ Short preview        │
│ content        │ Long Text │ Full article         │
│ author         │ Text      │ Writer name          │
│ category       │ Text      │ Topic/section        │
│ videoUrl       │ URL       │ YouTube guide        │
│ readTime       │ Number    │ Minutes to read      │
│ views          │ Number    │ View count           │
│ published      │ Boolean   │ Live status          │
└──────────────────────────────────────────────────┘
Records: ~20-50
Includes 3 featured posts with videos
```

---

### 12. REVIEWS (Customer Feedback)
```
PRODUCT RATINGS & COMMENTS
┌──────────────────────────────────────────────────┐
│ Field          │ Type      │ Purpose              │
├──────────────────────────────────────────────────┤
│ plantId        │ FK        │ Which plant          │
│ userId         │ FK        │ Who reviewed         │
│ rating         │ 1-5 Stars │ Star rating          │
│ title          │ Text      │ Review headline      │
│ comment        │ Text      │ Full review          │
│ helpful        │ Number    │ Helpful votes        │
│ createdAt      │ Date      │ Review date          │
└──────────────────────────────────────────────────┘
Records: ~1000-5000
```

---

### 13. ADDRESSES (Delivery Locations)
```
SHIPPING ADDRESSES (Reusable)
┌──────────────────────────────────────────────────┐
│ Field          │ Type      │ Purpose              │
├──────────────────────────────────────────────────┤
│ userId         │ FK        │ Belongs to user      │
│ fullName       │ Text      │ Recipient name       │
│ addressLine1   │ Text      │ Street address       │
│ addressLine2   │ Text      │ Apt/Suite (optional) │
│ city           │ Text      │ City name            │
│ district       │ Text      │ District (Colombo,  │
│                │           │ Kandy, etc.)         │
│ postalCode     │ Text      │ ZIP code             │
│ isDefault      │ Boolean   │ Primary address      │
└──────────────────────────────────────────────────┘
Used for: Orders, Rentals, Returns
```

---

## 📈 Database Relationships Map

```
                         ┌────────────┐
                         │   USERS    │
                         └─────┬──────┘
                    ┌──────────┼──────────┐
                    │          │          │
                    ▼          ▼          ▼
            ┌──────────────┐ ┌──────────────┐ ┌───────────────┐
            │   ADDRESSES  │ │   ORDERS     │ │ RENTAL_REQESTS│
            └──────────────┘ └──────┬───────┘ └───────┬───────┘
                                   │                 │
                              ┌────┴────┐       ┌────┴────────┐
                              ▼         ▼       ▼             ▼
                       ┌────────────────────┐ ┌──────────────────────┐
                       │  ORDER_ITEMS       │ │  RENTAL_PLANTS       │
                       └──────────┬─────────┘ └────────┬─────────────┘
                                  │                    │
                    ┌─────────────┴────────────────────┤
                    │                                  │
                    ▼                                  ▼
            ┌──────────────────┐ ◄─── FK ─────┐──────────────────┐
            │   PLANTS         │              │ PLANT_PACKAGES    │
            └──────────────────┘              └──────────────────┘
                    ▲                             ▲
                    │                             │
                    └─────────────┬───────────────┘
                                  │
                       ┌──────────┴────────────┐
                       ▼                       ▼
            ┌─────────────────────┐ ┌─────────────────────┐
            │    REVIEWS          │ │   PACKAGE_PLANTS    │
            └─────────────────────┘ └─────────────────────┘

RENTAL PIPELINE:
            RENTAL_REQUESTS
                    │
                    ├─────► RENTAL_PLANTS (What plants)
                    │
                    ├─────► RENTAL_DAMAGE_ASSESSMENTS
                    │              │
                    │              └─► DAMAGE_REPORTS (Cost per plant)
                    │
                    └─────► ADDRESSES (Delivery location)

SALES PIPELINE:
            ORDERS
                    │
                    ├─────► ORDER_ITEMS (What was bought)
                    │
                    ├─────► ORDER_TIMELINE (Tracking events)
                    │
                    ├─────► RETURN_REQUESTS (Optional)
                    │
                    └─────► ADDRESSES (Delivery location)

CONTENT:
            BLOG_POSTS (Independent)
            └─────► Has videoUrl
```

---

## 💾 Database Size Estimate (Year 1)

| Table | Records | Size |
|-------|---------|------|
| users | 1,500 | ~1 MB |
| plants | 75 | ~2 MB |
| plant_packages | 12 | ~100 KB |
| orders | 2,500 | ~5 MB |
| order_items | 7,500 | ~3 MB |
| return_requests | 300 | ~1 MB |
| rental_requests | 250 | ~3 MB |
| rental_plants | 1,000 | ~1 MB |
| damage_assessments | 50 | ~500 KB |
| blog_posts | 30 | ~5 MB |
| reviews | 3,000 | ~4 MB |
| **TOTAL** | **~16,000** | **~26 MB** |

*Year 1 estimate - highly scalable*

---

## 🔑 Field Types Used

| Type | Used For | Examples |
|------|----------|----------|
| **UUID** | All IDs | user.id, order.id, plant.id |
| **VARCHAR/TEXT** | Names, descriptions | user.name, plant.description |
| **DECIMAL(10,2)** | Money | price, total (Rs.) |
| **INT** | Counts | stock, quantity, rating |
| **ENUM** | Fixed choices | status, category, condition |
| **DATE/TIMESTAMP** | Time info | createdAt, deliveryDate |
| **BOOLEAN** | Yes/No | published, featured |
| **JSON** | Complex data | images[], tags[], careDetails |
| **TEXT/LONGTEXT** | Large content | content, description |
| **URL** | Web links | image, videoUrl |

---

## ✅ Implementation Checklist

- [ ] Database created (PostgreSQL recommended)
- [ ] All tables created with proper constraints
- [ ] Foreign keys configured
- [ ] Indexes created on frequently queried fields
- [ ] Backup strategy configured
- [ ] SSL encryption enabled
- [ ] User roles/permissions set up
- [ ] Testing completed
- [ ] Documentation generated
- [ ] Ready for production deployment

---

**For Questions or Modifications**:
Contact: dev-team@naturebloom.lk  
Last Updated: April 28, 2026  
Version: 1.0 Production Ready
