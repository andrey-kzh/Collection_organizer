const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = function () {

    return {
        plugins: [
            //Cоздает файл CSS для каждого файла JS, который содержит CSS
            new MiniCssExtractPlugin({
                filename: "[name].css" //имя получаем из splitChunks
            })
        ]

    };
};