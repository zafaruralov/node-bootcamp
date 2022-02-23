const { v4: uuidv4 } = require('uuid')
const Database = require('../db/inde')
var bcrypt = require('bcrypt')
var jwt = require('jsonwebtoken')
const AppError = require('../utils/AppError')

const signJwtToken = (userId, email, username) => {
    const token = jwt.sign({ userId, email, username }, 'secretword', {
        expiresIn: '24',
    })
    return token
}

const userController = {
    register: async (req, res, next) => {
        try {
            const { email, username, password, type } = req.body
            const id = uuidv4()
            const hashedPassword = await bcrypt.hash(password, 10)
            const values = [id, email, username, hashedPassword, type]
            await Database.query(
                'INSERT INTO users (id, email, username, password, type) VALUES ($1, $2,$3,$4)',
                values
            )
            const token = signJwtToken(id, email, username)
            res.status(200).json({ token })
        } catch (error) {
            next(error)
        } //Utgan safar database da mommo chiqani uchun pool ishlatishimiz kere degandiz shuni qidirish topib shuni ishlatudim unga finally ishlatib bomasakan
        // finally {
        //     await Database.end();
        // }
    },
    login: async (req, res, next) => {
        try {
            const { email, password } = req.body
            const result = Database.query(
                'SELECT * FROM users WHERE email = $1',
                [email]
            )
            const user = result.rows[0]
            console.log(user)
            if (!user) {
                return next(
                    new AppError(
                        400,
                        `There is no user with this eail: ${email}`
                    )
                )
            }
            const passwordCorrect = await bcrypt.compare(
                password,
                user.password
            )
            if (!passwordCorrect) {
                return next(new AppError(400, 'Password is incorrect'))
            }

            const token = signJwtToken(user.id, eser.email, user.username)
            res.status(200).json({ token })
        } catch (error) {
            next(error)
        }
    },
}

module.exports = userController
