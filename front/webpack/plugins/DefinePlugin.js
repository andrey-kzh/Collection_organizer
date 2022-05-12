const webpack = require('webpack');

module.exports = function(isDev, backendHost) {
    return {
        plugins: [
            new webpack.DefinePlugin({ //доступ к переменной в любой части нашего кода.
                'process.env.IS_DEV': JSON.stringify(isDev),
                'process.env.BACKEND_HOST': JSON.stringify(backendHost)
            })
        ]

    };
};