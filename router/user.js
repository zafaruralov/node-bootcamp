const userController = require('../controller/user')

const usersRouter = require('express').Router()

usersRouter.route('/register').post(userController.register)
usersRouter.route('/login').post(userController.login)

module.exports = usersRouter
