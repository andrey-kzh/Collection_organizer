const webpack = require('webpack');

module.exports = function (isDev) {
    return {
        plugins: [
            new webpack.DefinePlugin({ //доступ к переменной в любой части нашего кода.
                isDev: JSON.stringify(isDev)
            })
        ]

    };
};