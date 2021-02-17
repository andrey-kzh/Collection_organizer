const pgp = require('pg-promise')()
const base = require('../config').db

module.exports.db = pgp(`postgres://${base.user}:${base.password}@${base.host}:${base.port}/${base.name}`)