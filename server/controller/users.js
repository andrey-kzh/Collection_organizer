const Users = require('../model/users')
const err = require('../libs/exception').errorCreator

module.exports = {

    register: async function (req, res, next) {
        try {
            const {name, login, password} = req.body
            if (name && login && password) {
                const salt = await Users.generateSalt()
                const passwordHash = await Users.generatePassword(salt, password)
                const user = await Users.addNewUser(name, login, passwordHash, salt)
                res.status(200)
                res.json(user)
            } else throw {status: 400, message: 'Incorrect request data'}
        } catch (e) {
            next(err(e))
        }
        next()
    },

    login: async function (req, res, next) {
        try {
            const {login, password} = req.body
            if (login && password) {

            } else throw {status: 400, message: 'Incorrect request data'}
        } catch (e) {
            next(err(e))
        }
        next()
    },
    logout: {
        async function(req, res, next) {
        }
    },
}