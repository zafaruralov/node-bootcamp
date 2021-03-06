<<<<<<< HEAD
const express = require('express');
const Logger = require('./config/logger');
const morganMiddleware = require('./config/morganMiddleware');
const middlewares = require('./middleware/index');
const auth = require('./middleware/auth');
const productsRouter = require('./routes/product');
const usersRouter = require('./routes/user.js');
const app = express();
require('dotenv').config();

app.use(express.json());
app.use(morganMiddleware);

app.get('/', (req, res) => {
    res.send('Hello world');
});

app.use('/products', productsRouter);

app.use('/users', usersRouter);

app.use((err, req, res, next) => {
    console.log(err);
    Logger.info(err.message);
    res.status(err.statusCode || 500).json({ message: err.message });
});

app.use('*', middlewares.notFound);

const APP = process.env.APP_PORT;
app.listen(APP, () => {
    console.log(`listening on port ${APP}`);
});
=======
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
>>>>>>> 95695079f31b2638641622279f4b3a9f2bb65f72
