const productsController = require('../controller/product');
const auth = require('../middleware/auth');

const productsRouter = require('express').Router();

productsRouter
    .route('/')
    .get(productsController.getProducts)
    .post(
        auth.checkUserType(['admin', 'courier']),
        productsController.createProduct
    );
productsRouter
    .route('/:id')
    .get(productsController.getOneProducts)
    .put(
        auth.checkUserType(['admin', 'courier']),
        productsController.updateProduct
    )
    .delete(
        auth.checkUserType(['admin', 'courier']),
        productsController.deleteProduct
    );

module.exports = productsRouter;
