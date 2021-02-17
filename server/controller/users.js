const Users = require('../model/users')

module.exports = {

    getUser: async function (req, res, next) {
        try {
            const user = await Users.selectUser()
            res.status(200)
            res.json(user)
        } catch (e) {
            res.status(400).send(e.message)
        }
        next()
    }
}