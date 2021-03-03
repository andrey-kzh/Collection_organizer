const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const autoprefixer = require('autoprefixer');

module.exports = function () { //читает css файлы по import ссылкам в js и возвращает css

    return {
        module: {
            rules: [

                {
                    test: /\.(css|s[ac]ss)$/i,
                    use: [
                        MiniCssExtractPlugin.loader, //создает css файлы
                        {loader: 'css-loader', options: {importLoaders: 1, url: false}},
                        {
                            loader: 'postcss-loader',
                            options: {
                                postcssOptions: {
                                    plugins: [
                                        autoprefixer({overrideBrowserslist: ['ie >= 8', 'last 4 version']})
                                    ]
                                },
                                sourceMap: true
                            }
                        },
                        {loader: 'sass-loader', options: {sourceMap: true}}
                    ]
                }
            ]
        }
    }
};
