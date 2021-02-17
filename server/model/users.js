const {db} = require('../libs/connection')

module.exports = {

    selectUser: function () {
        return db.one("SELECT * FROM users WHERE login = 'test' AND password = '123'")
            .then((data) => {
                return data
            })
            .catch((error) => {
                throw error
            })
    }
}