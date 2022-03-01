const productController = require('../controller/product');
const auth = require('../middleware/auth');

const productsRouter = require('express').Router();

productsRouter
    .route('/')
    .get(productController.getProducts)
    .post(
        auth.checkUserType(['admin', 'courier']),
        productController.createProduct
    );
productsRouter
    .route('/:id')
    .get(productController.getOneProduct)
    .put(
        auth.checkUserType(['admin', 'courier']),
        productController.updateProduct
    )
    .delete(
        auth.checkUserType(['admin', 'courier']),
        productController.deleteProduct
    );

module.exports = productsRouter;
