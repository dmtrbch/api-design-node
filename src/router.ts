import { Router } from 'express';
import { body, oneOf, validationResult } from "express-validator";
import { handleInputErrors } from './modules/middleware';
import { createProduct, deleteProduct, getOneProduct, getProducts, updateProduct } from './handlers/product';
import { createUpdate, deleteUpdate, getOneUpdate, getUpdates, updateUpdate } from './handlers/update';

const router = Router();

/**
 * Product
 */
router.get('/product', getProducts);
router.get('/product/:id', getOneProduct); // id is dynamic router parameter
// body('name') is saying req.body which is an object should have a field on it called name
router.put('/product/:id',
    body('name').isString(),
    handleInputErrors,
    updateProduct
); 
router.post('/product',
    body('name').isString(),
    handleInputErrors,
    createProduct
);
router.delete('/product/:id', deleteProduct);

/**
 * Update
 */
router.get('/update', getUpdates);
router.get('/update/:id', getOneUpdate); // id is dynamic router parameter
router.put('/update/:id',
    body('title').optional().isString(),
    body('body').optional().isString(),
    body('status').isIn(['IN_PROGRESS', 'SHIPPED', 'DEPRECATED']).optional(),
    body('version').optional().isString(),
    updateUpdate
);
router.post('/update',
    body('title').exists().isString(),
    body('body').exists().isString(),
    body('productId').exists().isString(),
    createUpdate
);
router.delete('/update/:id', deleteUpdate);

/**
 * Update Point
 */
router.get('/updatepoint', () => {});
router.get('/updatepoint/:id', () => {}); // id is dynamic router parameter
router.put('/updatepoint/:id',
    body('name').optional().isString(),
    body('description').optional().isString(),
    () => {}
);
router.post('/updatepoint',
    body('name').exists().isString(),
    body('description').exists().isString(),
    body('updateId').exists().isString(), 
    () => {}
);
router.delete('/updatepoint/:id', () => {});

// we need one error handler here in order to catch the errors
// that will happen under /api
// router.use((err, req, res, next) => {
//     if (err.type === 'auth') {
//         res.status(401).json({ message: 'unauthorized' });
//     } else if (err.type === 'input') {
//         res.status(400).json({ message: 'invalid input' });
//     } else {
//         res.status(500).json({ message: 'ooops, thats on us' });
//     }
// })

// patch vs put => put completely replaces, patch patches
/**
 * gRPC better for internal APIs, tRPC even better??
 * REST better for external APIs
 */

export default router;

// Middleware that run right before the handlers run