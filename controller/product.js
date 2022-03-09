const { v4: uuidv4 } = require('uuid');
const Logger = require('../config/logger');
const Database = require('../db/index');
const AppError = require('../utils/AppError');

const mapToProductWithUser = (product) => {
    return {
        id: product.id,
        title: product.title,
        price: product.price,
        createor: {
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
                `SELECT p.id, p.title, p.price, u.id AS "user_id" u.username, u.email, u.type from products p JOIN user u ON p.creator_id = u.id`
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
            const product = result.rows[0];
            res.status(201).json({ data: product });
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
            const products = result.rows[0];
            if (!products) {
                Error();
                const err = new AppError(400, 'not found');
                return next(err);
            }
            const prods = products.map(mapToProductWithUser);
            res.status(200).json({ data: prods });
        } catch (error) {
            next(error);
        }
    },
    deleteProduct: async (req, res, next) => {
        try {
            const { id } = req.body;
            const result = await Database.query(
                'DELETE FROM products WHERE id = $1',
                [id]
            );
            const products = result.rows[0];
            res.status(200).json({ data: products });
            // res.status(200).json({ data: `update product ${id}` });
        } catch (error) {
            next(error);
        }
    },
    updateProduct: async (req, res, next) => {
        try {
            const { id } = req.params;
            const { title, price } = req.body;
            const values = [title, price, id];
            const result = await Database.query(
                'INSERT SET title = $1 price = $2 WHERE id = $1',
                [values]
            );
            const products = result.rows[0];
            res.status(200).json({ data: products });
        } catch (error) {
            next(error);
        }
    },
};
module.exports = productsController;
