const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = function () {

    return {
        plugins: [
            //обработка html
            new HtmlWebpackPlugin({
                template: './src/index.html',
                filename: 'index.html'
            })
        ]

    };
};