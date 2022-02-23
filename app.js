const express = require('express')
const Logger = require('./config/logger')
const morganMiddleware = require('./config/morganMiddleware')
const middlewares = require('./middleware')
const productsRouter = require('./router/product')
const usersRouter = require('./router/user')
const app = express()

app.use(express.json({ extended: true }))
app.use(morganMiddleware)

app.get('/', (req, res) => {
    res.send('Hello World')
})

app.use('/products', productsRouter)
app.use('/users', usersRouter)

app.use((err, req, res, next) => {
    console.log(err)
    Logger.error(err.message)
    res.status(err.statusCode || 500).json({ message: err.message })
})

app.use('*', middlewares.notFound)

const PORT = process.env.APP_PORT || 5000
app.listen(PORT, () => console.log(`Listening on port ${PORT}`))
