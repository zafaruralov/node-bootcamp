const { v4: uuidv4 } = require('uuid')
const Logger = require('../config/logger')
const Database = require('../db/inde')
const AppError = require('../utils/AppError')

const productsController = {
    getProduct: async (req, res, next) => {
        try {
            const result = await Database.query('SELECT * FROM products')
            const products = result.rows
            res.status(200).json({ data: products })
        } catch (error) {
            next(error)
        } //finally {
        //     await Database.end();
        // } pool ishlatganim uchun ishlamas
    },
    createProduct: async (req, res, next) => {
        try {
            const uuid = uuidv4()
            const { title, price } = req.body
            const values = [uuid, title, price]
            const result = await Database.query(
                'INSERT INTO products ($1,$2,$3) RETURNING * ',
                values
            )
            const products = result.rows
            res.status(200).json({ data: products })
        } catch (error) {
            next(error)
        }
        //  finally {
        //     await Database.end();
        // }
    },
    getOneProduct: async (req, res, next) => {
        try {
            // const uuid = uuidv4()
            const { id } = req.params
            Logger.info('Connect to Database')
            const result = await Database.query(
                'SELECT * FROM products WHERE id = $1',
                [id]
            )
            const products = result.rows[0]
            if (!products) {
                Error()
                const error = new AppError(400, `Not Found with this id: ${id}`)
                return next(error)
            }
        } catch (error) {
            next(error)
        }
        //  finally {
        //     await Database.end();
        // }
    },
    deleteProduct: async (req, res, next) => {
        try {
            const { id } = req.body
            const result = await Database.query(
                'DELETE FROM products WHERE id = $1',
                [id]
            )
            res.status(200).json({ data: `update product ${id}` })
        } catch (error) {
            next(error)
        } // finally {
        //     await Database.end();
        // }
    },
    updateProduct: async (req, res, next) => {
        try {
            const { id } = req.params
            const { title, price } = req.body
            const values = [title, price, id]
            const result = await Database.query(
                'INSERT SET title = $1 price = $2 WHERE id = $1',
                [values]
            )
            res.status(200).json({ data: `delete product ${id}` })
        } catch (error) {
            next(error)
        }
        //  finally {
        //     await Database.end();
        // }
    },
}
module.exports = productsController
