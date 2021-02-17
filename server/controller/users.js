const Users = require('../model/users')

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
            } else res.status(400).send('Incorrect request data')
        } catch (e) {
            res.status(400).send(e.message)
        }
        next()
    },

    login: {
        async function(req, res, next) {
        }
    },
    logout: {
        async function(req, res, next) {
        }
    },
}