console.log(`NODE_ENV : ${process.env.NODE_ENV}`);
const APP_ROOT = process.cwd();
const ENV_IS_DEV = process.env.NODE_ENV === 'development';

const path = require('path');
const webpack = require('webpack');
const webpackMerge = require('webpack-merge');
const { port } = require('./user.config.js') || {};
const { entry, getHTMLConfig } = require('./temp.config.js') || {};

const localPort = ((addPath) => {
	if (ENV_IS_DEV) {
		return port || 8088;
	} else {
		return 9098;
	}
})();

const localIp = (() => {
	let ips = [];
	let os = require('os');
	let ntwk = os.networkInterfaces();
	for (let k in ntwk) {
		for (let i = 0; i < ntwk[k].length; i++) {
			let _add = ntwk[k][i].address;
			if (_add && _add.split('.').length == 4 && !ntwk[k][i].internal && ntwk[k][i].family == 'IPv4') {
				ips.push(ntwk[k][i].address);
			}
		}
	}
	return ips[0] || 'localhost';
})();
const postcssLoader = {
	loader: 'postcss-loader',
	options: {
		config: {
			path: path.resolve(APP_ROOT, 'config/postcss.config.js')
		}
	}
};
const webpackConfig = {
	resolve: {// 重定向路径
		mainFiles: ['index.web', 'index'],
		modules: [path.resolve(APP_ROOT, 'src'), 'node_modules'],
		extensions: ['.web.tsx', '.web.ts', '.web.jsx', '.web.js', '.ts', '.tsx', '.js', '.jsx', '.json', '.css', '.less', '.scss'],
		alias: {
		}
	},
	entry: Object.assign({}, entry),
	output: {
		path: path.resolve(APP_ROOT, 'dist'),
		filename: '[name].[hash:8].js',
		libraryTarget: 'umd',
		/**
		 * html引用路径,github展示用
		 */
		publicPath: ENV_IS_DEV ? '/' : '/wya-rc/dist/'
	},
	module: {
		rules: [
			{
				test: /\.jsx?$/,
				exclude: [
					/**
					 * 在node_modules的文件不被babel理会
					 */
					path.resolve(APP_ROOT, 'node_modules'),
				],
				use: [
					{
						loader: 'babel-loader',
						options: {
							cacheDirectory: true // 启用编译缓存
						}
					}
				]
			}, 
			{
				test: /\.(css|scss)$/,
				use: ['style-loader', 'css-loader', postcssLoader, 'sass-loader'],
				include: [
					path.resolve(APP_ROOT, "node_modules"),
					path.resolve(APP_ROOT, "src/")
				]
			},
			{
				test: /\.less$/,
				use: [
					'style-loader', 
					'css-loader', 
					postcssLoader, 
					{
						loader: "less-loader",
						options: { 
							javascriptEnabled: true 
						}
					}
				],
				
			},
			{
				test: /\.(png|jpg|gif|eot|ttf|woff|woff2|svg)$/,
				loader: 'url-loader',
				options: {
					limit: 10000
				}
			},
			{
				test: /\.html$/i,
				use: 'html-loader'
			}
		]
	},
	optimization: {
		// 默认关闭压缩
		minimize: ENV_IS_DEV ? false : JSON.parse(process.env.UGLIFY_JS),
		// 原：NamedModulesPlugin()
		namedModules: true,
		// 原：NoEmitOnErrorsPlugin() - 异常继续执行
		noEmitOnErrors: true,
		// 原：ModuleConcatenationPlugin() - 模块串联 - dev模式下回影响antd（比如：Pagination, 和语言有关）
		concatenateModules: !ENV_IS_DEV,
	},
	plugins: [
		...getHTMLConfig()
	]
};

const defaultConfig = {
	// cheap-module-eval-source-map 原始源码（仅限行）
	// cheap-eval-source-map 转换过的代码（仅限行）// 重构建比较好
	devtool: ENV_IS_DEV ? 'cheap-module-eval-source-map' : undefined, 
	resolve: {
		extensions: ['.js']
	},
	devServer: {
		host: localIp,
		// contentBase: "/",
		port: localPort,
		inline: true,
		// compress: true, // gzip
		stats: 'errors-only',
		historyApiFallback: true,
		watchOptions: {
			aggregateTimeout: 100,
			poll: 500,
			ignored: /node_modules/
		},
		// proxy: {
		// 	"/api": {
		// 		target: "http://test.com",
		// 		pathRewrite: {"^/api" : ""}
		// 	}
		// },
		// hot: true,// HMR 注意需要配合 HotModuleReplacementPlugin 与 module.hot 同--hot
		// hotOnly: true, // 报错原因
		// lazy: true
	},
	node: {
		global: true,
		crypto: 'empty',
		__dirname: true,
		__filename: true,
		Buffer: true,
		clearImmediate: false,
		setImmediate: false
	},
	// 启用编译缓存
	cache: true,
};

module.exports = {
	APP_ROOT,
	localIp,
	localPort,
	commonConfig: webpackMerge(
		webpackConfig,
		defaultConfig
	)
};
