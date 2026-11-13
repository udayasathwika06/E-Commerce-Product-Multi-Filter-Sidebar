import { products } from '../data/products.js';
import { processProductPipeline, getInventoryMetadata } from '../services/filterService.js';

/**
 * Controller to fetch filtered and sorted products
 * GET /api/products
 * Query Params:
 *  - categories: comma-separated or array
 *  - minPrice: number
 *  - maxPrice: number
 *  - minRating: number (1-5)
 *  - sortBy: 'price_asc' | 'price_desc' | 'rating_desc' | 'featured'
 *  - search: string
 */
export function getFilteredProducts(req, res) {
  try {
    const { categories, minPrice, maxPrice, minRating, sortBy, search } = req.query;

    const result = processProductPipeline(products, {
      categories,
      minPrice,
      maxPrice,
      minRating,
      sortBy,
      search
    });

    res.status(200).json({
      success: true,
      data: result
    });
  } catch (error) {
    console.error('Error filtering products:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error while filtering products',
      error: error.message
    });
  }
}

/**
 * Controller to fetch catalog metadata (categories list, min/max price bounds, total count)
 * GET /api/products/meta
 */
export function getMetadata(req, res) {
  try {
    const metadata = getInventoryMetadata(products);
    res.status(200).json({
      success: true,
      data: metadata
    });
  } catch (error) {
    console.error('Error fetching metadata:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error while fetching metadata',
      error: error.message
    });
  }
}

