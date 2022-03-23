const productsController = require('../controllers/product.js');
const auth = require('../middlewares/auth');

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
    .get(productsController.getOneProduct)
    .put(
        auth.checkUserType(['admin', 'courier']),
        productsController.updateProduct
    )
    .delete(
        auth.checkUserType(['admin', 'courier']),
        productsController.deleteProduct
    );

module.exports = productsRouter;
