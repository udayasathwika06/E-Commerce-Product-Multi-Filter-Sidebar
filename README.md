# MarketVibe — E-Commerce Product Multi-Filter Sidebar

An enterprise-grade, high-traffic marketplace browsing interface built with **React**, **Tailwind CSS**, and a high-performance **Node.js/Express REST API**.

The system features real-time combinatorial multi-filtering across categories, dual-point price boundaries, and star rating thresholds, with instant visual feedback and server-side business logic execution.

---

## 🚀 Key Features

### 1. Interactive Sticky Sidebar Layout
- **Sticky Viewport Positioning**: Anchors filter controls seamlessly on desktop viewports (`sticky top-20`) for uninterrupted browsing.
- **Category Checklist Group**: Multi-select checklist with dynamic inventory counts and quick select/clear helpers.
- **Dual-point Price Range Slider Track**: Interactive dual slider handles allowing continuous visual adjustments of lower and upper price bounds, synchronized with numeric inputs and quick preset chips.
- **Minimum Star Rating Radio Group**: 1-to-5 star radio button group with visual gold star ratings and instant selection toggling.
- **Active Filter Counter & Quick Reset**: Highlights total engaged filters and provides one-click filter reset.

### 2. Dynamic Product Inventory Grid
- Product cards containing:
  - High-resolution image thumbnail with hover zoom effect and skeleton loading
  - Formatted price tag (`$XX.XX`)
  - Star rating display (visual stars, numeric score, and total review count)
  - Item name and category badge
  - Quick action "Add to Cart" button with instant animated feedback

### 3. Instant State Feedback
- **Zero Submit Buttons**: Every checkbox toggle, slider adjustment, or radio click instantly queries the backend pipeline.
- **Zero-Match Screen**: When filters are tuned so tightly that zero items match, the catalog grid gracefully transforms into:
  > **"No items match your criteria. Reset filters"**
  with a one-click button restoring the full catalog.

### 4. The Vibe Check: Sort By Dropdown Menu
- Positioned at the top right of the inventory grid.
- Choices:
  - **Price: Low to High**
  - **Price: High to Low**
  - **Top Rated First**
  - **Featured / Default**
- **Two-Stage Server Pipeline**: Filters the original dataset first using combinatorial intersection, then rearranges presentation order instantly based on sorting criteria.

### 5. Backend Logic & State Management
- **Combinatorial Intersect Filtering Array**:
  ```javascript
  // Product is returned if and only if it safely satisfies ALL active conditions simultaneously:
  // 1) Category selection
  // 2) Dual price boundary (min <= price <= max)
  // 3) Minimum star rating (rating >= minRating)
  ```
- **Graceful Null Handling**: When all filters are unselected or reset, the pipeline safely bypasses data reduction filters to display the base inventory set seamlessly.
- **Strict Server-Side Computation**: All calculations, validations, and combinatorial search loops are performed on the server. The frontend remains purely focused on presentation and user interactions.

---

## 🛠️ Architecture & Tech Stack

```
E-Commerce Product Multi-Filter Sidebar/
├── backend/
│   ├── src/
│   │   ├── data/products.js           # Master inventory (40+ varied items)
│   │   ├── services/filterService.js  # Combinatorial intersect & sorting pipeline
│   │   ├── controllers/productController.js
│   │   ├── routes/productRoutes.js
│   │   └── server.js                  # Express API server (Port 5000)
│   ├── tests/
│   │   └── filterService.test.js      # Unit tests for filtering & edge cases
│   └── package.json
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Header.jsx             # Top bar & search
│   │   │   ├── Sidebar.jsx            # Sticky filter controls
│   │   │   ├── CategoryFilter.jsx     # Category checklist group
│   │   │   ├── DualPriceSlider.jsx    # Dual-point range slider track
│   │   │   ├── StarRatingFilter.jsx   # 1-5 star radio buttons
│   │   │   ├── ProductCard.jsx        # Image, price, rating, title
│   │   │   ├── ProductGrid.jsx        # Dynamic card grid
│   │   │   ├── SortDropdown.jsx       # The Vibe Check sort dropdown
│   │   │   ├── ActiveFilterPills.jsx  # Dismissible active filter tags
│   │   │   └── EmptyState.jsx         # "No items match your criteria" screen
│   │   ├── services/api.js            # Server communication layer
│   │   ├── App.jsx                    # Root state & responsive layout
│   │   └── index.css                  # Tailwind styles & slider design
│   ├── vite.config.js                 # Dev server with API proxying
│   └── package.json
└── package.json                       # Workspace orchestrator
```

---

## 🚦 Quick Start Guide

### Prerequisites
- Node.js (v18+)
- npm (v9+)

### Installation
```bash
# Clone the repository
git clone <your-repo-url>
cd "E-Commerce Product Multi-Filter Sidebar"

# Install backend dependencies
cd backend && npm install

# Install frontend dependencies
cd ../frontend && npm install
```

### Running Backend API & Tests
```bash
# Run unit tests
cd backend
npm test

# Start the Express backend server (Port 5000)
npm run dev
```

### Running Frontend
```bash
cd frontend
npm run dev
# The application will be running at http://localhost:3000
```

---

## 🧪 Testing Coverage
The backend test suite verifies:
- ✅ **Graceful Null Handling**: Returning full base inventory on empty/null filters
- ✅ **Category Checklist**: Single and multi-category union filtering
- ✅ **Price Boundary**: Dual-point bounds enforcement
- ✅ **Minimum Star Rating**: Threshold verification (`rating >= minRating`)
- ✅ **Combinatorial Intersect**: Simultaneous intersection of all 3 criteria
- ✅ **Zero Items Match**: Tightly tuned criteria yielding empty set
- ✅ **Sorting Pipeline**: Preserves filtering while sorting by price or top rating
- ✅ **Dynamic Metadata**: Correct bounds and category distribution

---

## 📡 API Specification

### `GET /api/products`
Query parameters:
- `categories`: comma-separated string (e.g. `Electronics,Footwear`)
- `minPrice`: number
- `maxPrice`: number
- `minRating`: number (1 - 5)
- `sortBy`: `price_asc` | `price_desc` | `rating_desc` | `featured`
- `search`: string (keyword search)

### `GET /api/products/meta`
Returns dynamic inventory price bounds (`min`, `max`) and categories with item counts.
