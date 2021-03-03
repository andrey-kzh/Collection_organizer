module.exports = function () {
    return {
        module: {
            rules: [
                {
                    //Babel
                    test: /\.(js|ts|tsx)?$/,
                    exclude: /node_modules/,
                    use: {
                        loader: "babel-loader",
                        options: {
                            presets: ["@babel/preset-env", "@babel/preset-typescript", "@babel/preset-react"],
                            plugins: ["@babel/plugin-syntax-dynamic-import"] //плагин динамического импорта
                        }
                    }
                }
            ]
        }
    };
};