const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = function () {

    return {
        plugins: [
            //очистка папки указанной в output: { path: ... }
            new CleanWebpackPlugin()
        ]

    };
};