const Database = require('../db/index.js');
const { v4: uuidv4 } = require('uuid');
const ordersController = {
    getOrders: async (req, res, next) => {
        try {
            const result = await Database.query(
                `SELECT o.id, o.status, u.username, u.email,
            array_agg(row_to_json(p)) as products 
            FROM orders o JOIN order_products ops ON ops.order_id = o.id
            JOIN products p ON ops.product_id = p.id
            JOIN users u ON o.customer_id = u.id
            GROUP BY o.id, u.id;`
            );
            const orders = result.rows;
            res.status(200).json({ orders });
        } catch (error) {
            next(error);
        }
    },
    createOrder: async (req, res, next) => {
        try {
            const { product_ids, statusName, courier_id } = req.body;
            const { userId } = req.user;
            const orderId = uuidv4();
            await Database.query('BEGIN');

            const orderQueryText =
                'INSERT INTO orders (id, customer_id,assigned_to, status) VALUES ($1, $2,$3,$4);';
            const orderParameters = [orderId, userId, courier_id, statusName];
            await Database.query(orderQueryText, orderParameters);

            let orderProductsQueryText =
                'INSERT INTO order_products (order_id, product_id) VALUES ';
            for (const id of product_ids) {
                orderProductsQueryText += `('${orderId}', '${id}'),`;
            }

            orderProductsQueryText = orderProductsQueryText.slice(
                0,
                orderProductsQueryText.length - 1
            );

            await Database.query(orderProductsQueryText);

            await Database.query('COMMIT');

            res.status(200).json({ order: orderId });
        } catch (error) {
            await Database.query('ROLLBACK');
            next(error);
        }
    },
    // assignOrderToCourier: async (req, res, next) => {
    //     try {
    //         const { courier_id } = req.body;
    //         const { status } = req.body;

    //         const orderId = uuidv4();
    //         await Database.query('BEGIN');

    //         const assignOrder =
    //             'INSERT INTO orders (assigned_to, status) VALUES ($1, $2);';
    //         const assignOrderTo = [courier_id, status];
    //         await Database.query(assignOrder, assignOrderTo);
    //         await Database.query('COMMIT');

    //         res.status(200).json({ order: orderId });
    //     } catch (error) {
    //         await Database.query('ROLLBACK');
    //         next(error);
    //     }
    // 1. Assign courier to the order
    // 2. Change order status from 'new' to 'delivering'
    // },
    finishOrder: async (req, res, next) => {
        // 1. Change order status from 'delivering' to 'finished'
    },
};
module.exports = ordersController;
