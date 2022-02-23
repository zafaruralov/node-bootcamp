const productsController = require('../controller/product')

const productsRouter = require('express').Router()

productsRouter
    .route('/')
    .get(productsController.getProduct)
    .post(productsController.createProduct)

productsRouter
    .route('/')
    .get(productsController.getOneProduct)
    .put(productsController.updateProduct)
    .delete(productsController.deleteProduct)

module.exports = productsRouter
