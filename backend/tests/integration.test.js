import test from 'node:test';
import assert from 'node:assert/strict';

const BACKEND_URL = 'http://localhost:5000/api';
const FRONTEND_URL = 'http://localhost:3000';

test('Frontend is serving index.html', async () => {
  const res = await fetch(FRONTEND_URL);
  assert.equal(res.status, 200);
  const html = await res.text();
  assert.ok(html.includes('<div id="root"></div>'));
  assert.ok(html.includes('MarketVibe'));
});

test('Metadata endpoint returns category counts and price range', async () => {
  const res = await fetch(`${BACKEND_URL}/products/meta`);
  assert.equal(res.status, 200);
  const json = await res.json();
  assert.equal(json.success, true);
  assert.ok(json.data.categories.length >= 3);
  assert.ok(json.data.priceRange.min >= 0);
  assert.ok(json.data.priceRange.max > json.data.priceRange.min);
});

test('Graceful Null Handling: empty criteria returns full inventory', async () => {
  const res = await fetch(`${BACKEND_URL}/products`);
  assert.equal(res.status, 200);
  const json = await res.json();
  assert.equal(json.success, true);
  assert.equal(json.data.matchedCount, json.data.total);
  assert.ok(json.data.products.length > 20);
});

test('Category Checklist Filtering (Single & Multiple)', async () => {
  // Single category
  const res1 = await fetch(`${BACKEND_URL}/products?categories=Electronics`);
  const json1 = await res1.json();
  assert.ok(json1.data.products.every(p => p.category.toLowerCase() === 'electronics'));

  // Multiple categories union
  const res2 = await fetch(`${BACKEND_URL}/products?categories=Electronics,Apparel`);
  const json2 = await res2.json();
  assert.ok(json2.data.products.every(p => ['electronics', 'apparel'].includes(p.category.toLowerCase())));
  assert.ok(json2.data.products.length > json1.data.products.length);
});

test('Dual-point Price Boundary Slider', async () => {
  const min = 50;
  const max = 200;
  const res = await fetch(`${BACKEND_URL}/products?minPrice=${min}&maxPrice=${max}`);
  const json = await res.json();
  assert.ok(json.data.products.length > 0);
  assert.ok(json.data.products.every(p => p.price >= min && p.price <= max));
});

test('Minimum Star Rating Radio Selection (1-5 stars)', async () => {
  const res = await fetch(`${BACKEND_URL}/products?minRating=4`);
  const json = await res.json();
  assert.ok(json.data.products.length > 0);
  assert.ok(json.data.products.every(p => p.rating >= 4.0));
});

test('Combinatorial Intersect Filtering Array: simultaneously satisfies all criteria', async () => {
  const res = await fetch(`${BACKEND_URL}/products?categories=Footwear&minPrice=100&maxPrice=250&minRating=4.6`);
  const json = await res.json();
  assert.ok(json.data.products.length > 0);
  json.data.products.forEach(p => {
    assert.equal(p.category.toLowerCase(), 'footwear');
    assert.ok(p.price >= 100 && p.price <= 250);
    assert.ok(p.rating >= 4.6);
  });
});

test('Zero items match scenario renders empty array for "Reset filters" screen', async () => {
  const res = await fetch(`${BACKEND_URL}/products?categories=Electronics&minPrice=1100&minRating=5.0`);
  const json = await res.json();
  assert.equal(json.data.matchedCount, 0);
  assert.equal(json.data.products.length, 0);
});

test('The Vibe Check - Sort By Dropdown Menu Pipeline', async () => {
  // Price: Low to High
  const resAsc = await fetch(`${BACKEND_URL}/products?sortBy=price_asc`);
  const jsonAsc = await resAsc.json();
  const prices = jsonAsc.data.products.map(p => p.price);
  for (let i = 0; i < prices.length - 1; i++) {
    assert.ok(prices[i] <= prices[i + 1], `Expected ${prices[i]} <= ${prices[i+1]}`);
  }

  // Top Rated First
  const resRating = await fetch(`${BACKEND_URL}/products?sortBy=rating_desc`);
  const jsonRating = await resRating.json();
  const ratings = jsonRating.data.products.map(p => p.rating);
  for (let i = 0; i < ratings.length - 1; i++) {
    assert.ok(ratings[i] >= ratings[i + 1], `Expected ${ratings[i]} >= ${ratings[i+1]}`);
  }
});
