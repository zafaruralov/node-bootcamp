const productsController = require('../controller/project')

const router = require('express').Router()

router
    .route('/')
    .get(productsController.getProduct)
    .post(productsController.createProduct)

router
    .route('/:id')
    .get(productsController.getOneProduct)
    .put(productsController.updateProduct)
    .delete(productsController.deleteProduct)

module.exports = router
