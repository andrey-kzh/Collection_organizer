module.exports = {
    errorCreator: function ({status = null, message = null, code = null}) {

        if (!status) status = 500
        if (!message) message = 'Something broke'

        return {
            status: status,
            code: code,
            message: message
        }
    }
}