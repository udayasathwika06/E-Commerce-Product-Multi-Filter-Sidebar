/**
 * Core Processing Service for E-Commerce Product Multi-Filter Pipeline
 *
 * Implements:
 * 1. Combinatorial Intersect Filtering Array
 * 2. Graceful Null Handling
 * 3. Two-Stage Pipeline (Filter original dataset first -> Arrange presentation order based on sort criteria)
 */

/**
 * Normalizes category inputs into an array of lowercase category strings.
 * @param {string[]|string|null|undefined} categories
 * @returns {string[]}
 */
export function normalizeCategories(categories) {
  if (!categories) return [];
  if (Array.isArray(categories)) {
    return categories
      .flatMap(c => (typeof c === 'string' ? c.split(',') : []))
      .map(c => c.trim().toLowerCase())
      .filter(Boolean);
  }
  if (typeof categories === 'string') {
    return categories
      .split(',')
      .map(c => c.trim().toLowerCase())
      .filter(Boolean);
  }
  return [];
}

/**
 * Checks whether all filter criteria are empty/null.
 * Used for Graceful Null Handling.
 * @param {Object} criteria
 * @returns {boolean}
 */
export function areFiltersEmpty(criteria = {}) {
  const categories = normalizeCategories(criteria.categories);
  const hasCategories = categories.length > 0;
  
  const minPrice = criteria.minPrice !== undefined && criteria.minPrice !== null && criteria.minPrice !== ''
    ? Number(criteria.minPrice)
    : null;
    
  const maxPrice = criteria.maxPrice !== undefined && criteria.maxPrice !== null && criteria.maxPrice !== ''
    ? Number(criteria.maxPrice)
    : null;
    
  const minRating = criteria.minRating !== undefined && criteria.minRating !== null && criteria.minRating !== ''
    ? Number(criteria.minRating)
    : null;

  const searchQuery = criteria.search?.trim();

  return (
    !hasCategories &&
    (minPrice === null || isNaN(minPrice)) &&
    (maxPrice === null || isNaN(maxPrice)) &&
    (minRating === null || isNaN(minRating) || minRating <= 0) &&
    !searchQuery
  );
}

/**
 * Combinatorial Intersect Filtering Function
 * Executes a comprehensive search loop over the master product inventory array.
 * A product is only returned if it safely satisfies ALL active criteria simultaneously:
 * 1) category selection
 * 2) price boundary (min <= price <= max)
 * 3) meets or exceeds star rating
 *
 * @param {Array} inventory - Master product item inventory array
 * @param {Object} criteria - Active filter combination criteria
 * @returns {Array} Filtered products
 */
export function combinatorialIntersectFilter(inventory, criteria = {}) {
  if (!Array.isArray(inventory)) {
    return [];
  }

  // Graceful Null Handling:
  // If all filters are left unselected or cleared, bypass data reduction filters
  if (areFiltersEmpty(criteria)) {
    return [...inventory];
  }

  const selectedCategories = normalizeCategories(criteria.categories);
  const minPrice = (criteria.minPrice !== undefined && criteria.minPrice !== null && criteria.minPrice !== '' && !isNaN(Number(criteria.minPrice)))
    ? Number(criteria.minPrice)
    : null;
  const maxPrice = (criteria.maxPrice !== undefined && criteria.maxPrice !== null && criteria.maxPrice !== '' && !isNaN(Number(criteria.maxPrice)))
    ? Number(criteria.maxPrice)
    : null;
  const minRating = (criteria.minRating !== undefined && criteria.minRating !== null && criteria.minRating !== '' && !isNaN(Number(criteria.minRating)))
    ? Number(criteria.minRating)
    : null;
  const search = criteria.search ? criteria.search.trim().toLowerCase() : null;

  // Intersect loop: item must pass all active conditions
  return inventory.filter(item => {
    // 1. Category intersection check
    if (selectedCategories.length > 0) {
      const itemCategory = (item.category || '').toLowerCase();
      if (!selectedCategories.includes(itemCategory)) {
        return false;
      }
    }

    // 2. Dual-point Price Boundary check
    if (minPrice !== null && item.price < minPrice) {
      return false;
    }
    if (maxPrice !== null && item.price > maxPrice) {
      return false;
    }

    // 3. Minimum Star Rating check (meets or exceeds)
    if (minRating !== null && minRating > 0 && item.rating < minRating) {
      return false;
    }

    // Optional keyword search check (title / description)
    if (search) {
      const matchName = (item.name || '').toLowerCase().includes(search);
      const matchDesc = (item.description || '').toLowerCase().includes(search);
      if (!matchName && !matchDesc) {
        return false;
      }
    }

    return true;
  });
}

/**
 * Sorts products according to selected criteria.
 * @param {Array} items
 * @param {string} sortBy
 * @returns {Array} Sorted products
 */
export function sortProducts(items, sortBy = 'featured') {
  const result = [...items];

  switch (sortBy) {
    case 'price_asc':
      // Price: Low to High
      return result.sort((a, b) => a.price - b.price);

    case 'price_desc':
      // Price: High to Low
      return result.sort((a, b) => b.price - a.price);

    case 'rating_desc':
      // Top Rated First
      return result.sort((a, b) => b.rating - a.rating || b.reviewCount - a.reviewCount);

    case 'name_asc':
      return result.sort((a, b) => a.name.localeCompare(b.name));

    case 'featured':
    default:
      // Keep original order
      return result;
  }
}

/**
 * Master Pipeline: Filters the original dataset first, then arranges visual presentation order
 * @param {Array} inventory - Master inventory
 * @param {Object} queryParams - Filter and sort options
 * @returns {Object} Result payload with items and metadata
 */
export function processProductPipeline(inventory, queryParams = {}) {
  // Step 1: Filter original dataset first
  const filtered = combinatorialIntersectFilter(inventory, queryParams);

  // Step 2: Arrange visual presentation order of remaining cards instantly based on sorting state
  const sorted = sortProducts(filtered, queryParams.sortBy);

  return {
    total: inventory.length,
    matchedCount: sorted.length,
    products: sorted,
    appliedFilters: {
      categories: normalizeCategories(queryParams.categories),
      minPrice: queryParams.minPrice ? Number(queryParams.minPrice) : null,
      maxPrice: queryParams.maxPrice ? Number(queryParams.maxPrice) : null,
      minRating: queryParams.minRating ? Number(queryParams.minRating) : null,
      sortBy: queryParams.sortBy || 'featured',
      search: queryParams.search || ''
    }
  };
}

/**
 * Computes dynamic inventory metadata (available categories, absolute min/max prices)
 * @param {Array} inventory
 * @returns {Object}
 */
export function getInventoryMetadata(inventory) {
  if (!inventory || inventory.length === 0) {
    return {
      categories: [],
      priceRange: { min: 0, max: 0 },
      totalProducts: 0
    };
  }

  const categoryCounts = {};
  let min = inventory[0].price;
  let max = inventory[0].price;

  inventory.forEach(item => {
    categoryCounts[item.category] = (categoryCounts[item.category] || 0) + 1;
    if (item.price < min) min = item.price;
    if (item.price > max) max = item.price;
  });

  const categories = Object.keys(categoryCounts).map(cat => ({
    name: cat,
    count: categoryCounts[cat]
  }));

  return {
    categories,
    priceRange: {
      min: Math.floor(min),
      max: Math.ceil(max)
    },
    totalProducts: inventory.length
  };
}

