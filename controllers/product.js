const { v4: uuidv4 } = require('uuid');
const Logger = require('../config/logger');
const Database = require('../db');
const AppError = require('../utils/AppError.js');

const mapToProductWithUser = (product) => {
    return {
        id: product.id,
        title: product.title,
        price: product.price,
        creator: {
            id: product.user_id,
            username: product.username,
            email: product.email,
            type: product.type,
        },
    };
};
const productsController = {
    getProducts: async (req, res, next) => {
        try {
            const result = await Database.query(
                `SELECT p.id, p.title, u.id AS "user_id", u.username, u.email, u.type from products p JOIN users u ON p.creator_id = u.id`
            );
            const products = result.rows;
            const prods = products.map(mapToProductWithUser);
            Logger.info(`Products length ${products.length}`);
            res.status(200).json({ data: prods });
        } catch (error) {
            next(error);
        }
    },
    createProduct: async (req, res, next) => {
        try {
            const { userId } = req.user;
            const { title, price } = req.body;
            const uuid = uuidv4();

            const values = [uuid, title, price, userId];

            const result = await Database.query(
                'INSERT INTO products (id, title, price, creator_id) VALUES ($1, $2, $3, $4) RETURNING *;',
                values
            );
            const products = result.rows[0];
            res.status(201).json({ data: products });
        } catch (error) {
            next(error);
        }
    },
    getOneProduct: async (req, res, next) => {
        try {
            const { id } = req.params;
            const result = await Database.query(
                'SELECT p.id, p.title, p.price, u.id AS "user_id" u.username, u.email, u.type from products p JOIN user u ON p.createor_id = u.id WHERE id = $1',
                [id]
            );
            const products = result.rows;
            res.status(200).json({ data: products });
        } catch (error) {
            next(error);
        }
    },
    updateProduct: async (req, res, next) => {
        try {
            const uuid = uuidv4();
            const { title } = req.body;
            const updateProduct = await Database.query(
                'UPDATE products SET title = $1 WHERE id = $2',
                [title, uuid]
            );
            const result = updateProduct.rows;
            res.status(200).json({ data: result });
        } catch (error) {
            next(error);
        }
    },
    deleteProduct: async (req, res, next) => {
        try {
            const { id } = req.params;
            const deleteProduct = await Database.query(
                'DELETE FROM products WHERE id = $1',
                [id]
            );
            const result = deleteProduct.rows;
            res.status(200).json({ result });
        } catch (error) {
            next(error);
        }
    },
};
module.exports = productsController;
