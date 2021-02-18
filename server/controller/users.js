const Users = require('../model/users')
const Sessions = require('../model/sessions')
const err = require('../libs/exception').errorCreator

module.exports = {

    register: async function (req, res, next) {
        try {
            const {name, login, password} = req.body
            if (name && login && password) {
                const salt = await Users.generateSalt()
                const passwordHash = await Users.generatePassword(salt, password)
                const user = await Users.addNewUser(name, login, passwordHash, salt)
                res.status(200).json(user)
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
                const user = await Users.selectUser(login)
                if (user) {
                    const isLogin = await Users.checkPassword(user.salt, password, user.password)
                    if (isLogin) {
                        let session
                        const existingSession = await Sessions.selectSessionByUserId(user.id)
                        if (existingSession) {
                            session = await Sessions.updateLastVisit(existingSession.id)
                        } else {
                            const token = await Sessions.createToken(user.id)
                            session = await Sessions.addNewSession(user.id, token)
                        }
                        res.status(200).json({token: session.token})
                    } else throw {status: 401, message: 'User not found'}
                } else throw {status: 401, message: 'User not found'}
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