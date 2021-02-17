const {db} = require('../libs/connection')
const crypto = require('crypto');
const config = require('../config');

module.exports = {

    addNewUser: function (name, login, passwordHash, salt) {
        return db.oneOrNone(
                `INSERT INTO users (name, login, password, salt) VALUES ($1, $2, $3, $4) RETURNING id`,
                [name, login, passwordHash, salt])
            .then((data) => {
                return data
            })
            .catch((error) => {
                throw error
            })
    },

    generateSalt: function () {
        return new Promise((resolve, reject) => {
            crypto.randomBytes(config.crypto.length, (err, buffer) => {
                if (err) return reject(err);
                resolve(buffer.toString('hex'));
            });
        });
    },

    generatePassword: function (salt, password) {
        return new Promise((resolve, reject) => {
            crypto.pbkdf2(
                password, salt,
                config.crypto.iterations,
                config.crypto.length,
                config.crypto.digest,
                (err, key) => {
                    if (err) return reject(err);
                    resolve(key.toString('hex'));
                }
            );
        });
    },

    _checkPassword: {},
}