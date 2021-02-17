const express = require('express')
const router = require('./routes/routes')

const app = express()
app.use(express.json({ extended: true }))
app.use('/', router)

module.exports = app;