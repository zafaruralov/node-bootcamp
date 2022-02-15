const express = require('express')
const app = express()
const morganMiddleware = require('./config/morganMiddleware')
const Logger = require('./config/logger')
const middleware = require('./middleware/middleware')
const productsRouter = require('./router/project')

app.use(express.json())
app.use(morganMiddleware)

app.get('/', (req, res) => {
    res.send('hello')
})
app.use('/product', productsRouter)

app.use((req, res, next) => {
    console.log(err)
    Logger.error(err.message)
    res.status(err.statusCode || 500).json({ message: err.message })
})

app.use('*', middleware.notFound)

const PORT = process.env.APP_PORT
app.listen(PORT, () => console.log(`lisining`))
