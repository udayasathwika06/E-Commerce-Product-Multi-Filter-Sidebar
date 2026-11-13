const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

/**
 * Fetches filtered and sorted products from the backend API.
 * All computations, validations, and filtering are executed on the server.
 *
 * @param {Object} filters
 * @param {string[]} filters.categories
 * @param {number|null} filters.minPrice
 * @param {number|null} filters.maxPrice
 * @param {number|null} filters.minRating
 * @param {string} filters.sortBy
 * @param {string} filters.search
 * @param {AbortSignal} [signal]
 */
export async function fetchFilteredProducts(filters = {}, signal) {
  const params = new URLSearchParams();

  if (filters.categories && filters.categories.length > 0) {
    params.set('categories', filters.categories.join(','));
  }

  if (filters.minPrice !== null && filters.minPrice !== undefined && filters.minPrice !== '') {
    params.set('minPrice', filters.minPrice);
  }

  if (filters.maxPrice !== null && filters.maxPrice !== undefined && filters.maxPrice !== '') {
    params.set('maxPrice', filters.maxPrice);
  }

  if (filters.minRating && Number(filters.minRating) > 0) {
    params.set('minRating', filters.minRating);
  }

  if (filters.sortBy) {
    params.set('sortBy', filters.sortBy);
  }

  if (filters.search && filters.search.trim()) {
    params.set('search', filters.search.trim());
  }

  const url = `${BASE_URL}/products?${params.toString()}`;

  const response = await fetch(url, { signal });
  if (!response.ok) {
    throw new Error(`API error: ${response.status} ${response.statusText}`);
  }

  const json = await response.json();
  return json.data;
}

/**
 * Fetches inventory metadata (price ranges, categories with counts)
 */
export async function fetchInventoryMetadata() {
  const response = await fetch(`${BASE_URL}/products/meta`);
  if (!response.ok) {
    throw new Error(`Failed to load catalog metadata: ${response.status}`);
  }
  const json = await response.json();
  return json.data;
}
