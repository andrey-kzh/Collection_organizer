const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = function () {

    return {
        plugins: [
            new CopyWebpackPlugin( //копирует папку
                {
                    patterns: [
                        {from: 'src/img', to: 'img'},
                        {from: 'src/fonts', to: 'fonts'},
                    ],
                }
            )
        ]
    };
};
