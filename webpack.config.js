const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const path = require("path");
const NODE_ENV = process.env.NODE_ENV;
const IS_DEV = process.env.NODE_ENV === "development";
module.exports = {
    mode: NODE_ENV ? NODE_ENV : "development",
    entry: path.resolve(__dirname, "src/index.tsx"),
    output: {
        path: path.resolve(__dirname, "dist"),
        filename: "index.js",
        publicPath: "/",
    },
    module: {
        rules: [{
                test: /\.(tsx|ts)$/,
                use: ["ts-loader"],
                exclude: [/node_modules/]
            },
            {
                test: /\.less$/,
                use: [!IS_DEV ? MiniCssExtractPlugin.loader : 'style-loader',
                    {
                        loader: "css-loader",
                        options: {
                            modules: {
                                mode: "local",
                                localIdentName: "[name]__[local]___[hash:base64:5]"
                            }
                        }
                    },
                    'less-loader'
                ],
            },

        ],
    },
    resolve: {
        extensions: [".js", ".jsx", ".tsx", ".ts", ".json", "less"],
    },
    plugins: [new HtmlWebpackPlugin({ template: path.resolve(__dirname, "src/index.html") })],
    devServer: {
        port: 3000,
        hot: IS_DEV,
    }
};