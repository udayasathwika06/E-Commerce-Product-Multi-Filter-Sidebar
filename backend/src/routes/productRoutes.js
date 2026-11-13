import { Router } from 'express';
import { getFilteredProducts, getMetadata } from '../controllers/productController.js';

const router = Router();

router.get('/products', getFilteredProducts);
router.get('/products/meta', getMetadata);

export default router;

