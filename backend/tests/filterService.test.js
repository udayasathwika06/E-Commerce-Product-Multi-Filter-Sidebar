import test from 'node:test';
import assert from 'node:assert/strict';
import {
  combinatorialIntersectFilter,
  sortProducts,
  processProductPipeline,
  areFiltersEmpty,
  getInventoryMetadata
} from '../src/services/filterService.js';

const mockInventory = [
  { id: '1', name: 'Budget Headphones', category: 'Electronics', price: 25.00, rating: 3.5, reviewCount: 10 },
  { id: '2', name: 'Pro Wireless Headphones', category: 'Electronics', price: 299.99, rating: 4.8, reviewCount: 500 },
  { id: '3', name: 'Cotton T-Shirt', category: 'Apparel', price: 30.00, rating: 4.2, reviewCount: 120 },
  { id: '4', name: 'Winter Parka', category: 'Apparel', price: 250.00, rating: 4.7, reviewCount: 85 },
  { id: '5', name: 'Running Sneakers', category: 'Footwear', price: 120.00, rating: 4.5, reviewCount: 300 },
  { id: '6', name: 'Leather Boots', category: 'Footwear', price: 180.00, rating: 4.9, reviewCount: 410 },
  { id: '7', name: 'Cheap Plastic Sandals', category: 'Footwear', price: 10.00, rating: 2.1, reviewCount: 15 }
];

test('Graceful Null Handling: returns full inventory when all filters are empty/null', () => {
  const result1 = combinatorialIntersectFilter(mockInventory, {});
  assert.equal(result1.length, mockInventory.length);

  const result2 = combinatorialIntersectFilter(mockInventory, {
    categories: [],
    minPrice: '',
    maxPrice: null,
    minRating: 0
  });
  assert.equal(result2.length, mockInventory.length);

  assert.equal(areFiltersEmpty({}), true);
  assert.equal(areFiltersEmpty({ categories: [] }), true);
});

test('Category Filtering: filters by single and multiple categories', () => {
  const single = combinatorialIntersectFilter(mockInventory, { categories: ['Electronics'] });
  assert.equal(single.length, 2);
  assert.ok(single.every(i => i.category === 'Electronics'));

  const multiple = combinatorialIntersectFilter(mockInventory, { categories: ['Electronics', 'Footwear'] });
  assert.equal(multiple.length, 5); // 2 elec + 3 foot
});

test('Price Boundary: respects dual-point min and max bounds', () => {
  const priceFiltered = combinatorialIntersectFilter(mockInventory, {
    minPrice: 20,
    maxPrice: 150
  });
  // Budget Headphones (25), Cotton T-Shirt (30), Running Sneakers (120)
  assert.equal(priceFiltered.length, 3);
  assert.ok(priceFiltered.every(i => i.price >= 20 && i.price <= 150));
});

test('Minimum Star Rating: filters items meeting or exceeding rating', () => {
  const ratingFiltered = combinatorialIntersectFilter(mockInventory, {
    minRating: 4.5
  });
  // Pro Headphones (4.8), Winter Parka (4.7), Sneakers (4.5), Boots (4.9)
  assert.equal(ratingFiltered.length, 4);
  assert.ok(ratingFiltered.every(i => i.rating >= 4.5));
});

test('Combinatorial Intersect: all three criteria combined simultaneously', () => {
  // Category: Footwear
  // Price: 50 to 200
  // Min Rating: 4.6
  // Matches only: Leather Boots ($180, 4.9 rating)
  const result = combinatorialIntersectFilter(mockInventory, {
    categories: ['Footwear'],
    minPrice: 50,
    maxPrice: 200,
    minRating: 4.6
  });

  assert.equal(result.length, 1);
  assert.equal(result[0].id, '6');
  assert.equal(result[0].name, 'Leather Boots');
});

test('Zero items match scenario when filters are tuned too tightly', () => {
  const result = combinatorialIntersectFilter(mockInventory, {
    categories: ['Electronics'],
    minPrice: 500, // No electronics > 500 in mock
    minRating: 5.0
  });

  assert.equal(result.length, 0);
});

test('The Vibe Check - Sorting Pipeline: filters first, then arranges visual order', () => {
  const pipelineAsc = processProductPipeline(mockInventory, {
    categories: ['Footwear'],
    sortBy: 'price_asc'
  });
  assert.equal(pipelineAsc.matchedCount, 3);
  assert.equal(pipelineAsc.products[0].price, 10.00); // Cheap Plastic Sandals
  assert.equal(pipelineAsc.products[1].price, 120.00); // Running Sneakers
  assert.equal(pipelineAsc.products[2].price, 180.00); // Leather Boots

  const pipelineTopRated = processProductPipeline(mockInventory, {
    categories: ['Footwear'],
    sortBy: 'rating_desc'
  });
  assert.equal(pipelineTopRated.products[0].rating, 4.9); // Leather Boots
  assert.equal(pipelineTopRated.products[1].rating, 4.5); // Running Sneakers
  assert.equal(pipelineTopRated.products[2].rating, 2.1); // Cheap Plastic Sandals
});

test('Inventory Metadata computation', () => {
  const meta = getInventoryMetadata(mockInventory);
  assert.equal(meta.totalProducts, 7);
  assert.equal(meta.priceRange.min, 10);
  assert.equal(meta.priceRange.max, 300);
  assert.equal(meta.categories.length, 3);
});
