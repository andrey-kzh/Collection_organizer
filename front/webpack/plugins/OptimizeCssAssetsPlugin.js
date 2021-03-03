const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');

module.exports = function () {

    return {
        plugins: [
            new OptimizeCssAssetsPlugin({ //сжатие css только для prod
                assetNameRegExp: /\.css$/,
                cssProcessor: require('cssnano'),
                cssProcessorPluginOptions: {
                    preset: ['default', { discardComments: { removeAll: true } }]
                }})
        ]

    };
};