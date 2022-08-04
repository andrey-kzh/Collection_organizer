const local = require('./local')

module.exports = {
    db: {
        host: 'localhost',
        port: '5432',
        name: local.db.name,
        user: local.db.user,
        password: local.db.password,
    },
    crypto: {
        iterations: 12000,
        length: 128,
        digest: 'sha512',
    },
    jwtSecretKey: local.jwtSecretKey,
    sessionExpirationDays: 30, // days
    catalogPerPage: 20,
};