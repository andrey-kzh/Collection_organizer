const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");

module.exports = function () {
    return {
        optimization: {
            minimize: true,
            minimizer: [
              new CssMinimizerPlugin({
                test: /\.css$/i,
              }),
            ],
          },
    };
};
