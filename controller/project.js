const { v4: uuidv4 } = require('uuid')
const Database = require('../db/index')
const AppError = require('../utils/AppError')

const productsController = {
    getProduct: async (req, res, next) => {
        try {
            const allTodo = await Database.query('SELECT * FROM todo')
            res.send(allTodo.rows)
        } catch (error) {
            next(error)
        } finally {
        }
    },
    createProduct: async (req, res, next) => {
        try {
            const uuid = uuidv4()
            const { price, title } = req.body
            const values = [uuid, price, title]

            const newTodo = await Database.query(
                'INSERT INTO todo (id,price, title) VALUES ($1, $2,$3) RETURNING *',
                values
                // 'INSERT INTO todo (id, description) VALUES ($1, $2) RETURNING *',
                // [uuid, description]
            )
            res.json(newTodo.rows[0])
        } catch (error) {
            next(error)
        }
    },
    getOneProduct: async (req, res, next) => {
        const uuid = uuidv4()
        try {
            const todo = await Database.query(
                'SELECT * FROM todo WHERE id = $1',
                [uuid]
            )
            res.json(todo.rows[0])
        } catch (error) {
            next(error)
        }
    },
    updateProduct: async (req, res, next) => {
        try {
            const uuid = uuidv4()
            const { description } = req.body
            const updateProduct = await Database.query(
                'UPDATE todo SET description = $1 WHERE id = $2',
                [description, uuid]
            )
            res.json('Todo was updated')
        } catch (error) {
            next(error)
        }
    },
    deleteProduct: async (req, res, next) => {
        try {
            const { id } = req.params
            const deleteProduct = await Database.query(
                'DELETE FROM todo WHERE id = $1',
                [id]
            )
            res.json('delete Product')
        } catch (error) {
            next(error)
        }
    },
}

module.exports = productsController
