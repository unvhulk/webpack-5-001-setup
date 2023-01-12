// We use require here because config file is run by node but other places where we use
// import, it is provided by webpack. Similarly with the export (Webpack) and module.exports
//(Node JS)

const HtmlWebpackPlugin = require("html-webpack-plugin");
const path = require("path");

module.exports = {
	entry: path.resolve(__dirname, "src", "index.js"),

	output: {
		path: path.resolve(__dirname, "dist"),
		publicPath: "",
		filename: "[name].[contenthash].bundle.js",
		clean: true,
	},

	module: {
		rules: [
			{
				test: /\.js$/,
				exclude: /(node_modules)/,
				use: {
					loader: "babel-loader",
					options: {
						presets: ["@babel/preset-env"],
					},
				},
			},
			{
				test: /\.css$/i,
				use: ["style-loader", "css-loader"],
			},
			{
				test: /\.(svg|png|jpg|gif)$/i,
				use: [
					{
						loader: "url-loader",
						options: {
							limit: 8192,
						},
					},
				],
			},
		],
	},

	plugins: [
		new HtmlWebpackPlugin({
			title: "Web Tooling App",
			template: path.resolve(__dirname, "src", "index.html"),
		}),
	],

	optimization: {
		splitChunks: {
			cacheGroups: {
				node_vendors: {
					name: "vendor",
					test: /[\\/]node_modules[\\/]/,
					chunks: "all",
					priority: 1,
				},
			},
		},
	},

	devtool: "inline-source-map",
	devServer: {
		contentBase: "./dist",
	},

	mode: "production",
};
