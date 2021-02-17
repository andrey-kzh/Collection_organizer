const router = require('express').Router()
const users = require('../controller/users')

router.get('/users', (req, res, next) => {
    users.getUser(req, res, next)
})

module.exports = router