process.env.NODE_ENV = 'production';
// 初始化配置文件
const fs = require('fs-extra');
fs.outputFileSync('./config/user.config.js', `let obj = {};module.exports = obj;`);

const path = require('path');
const webpack = require('webpack');
const webpackMerge = require('webpack-merge');

const { APP_ROOT, commonConfig, localIp, localPort } = require('./webpack.config.common');



let webpackConfig = {
	plugins: [
		/**
		 * 生产环境
		 */
		new webpack.DefinePlugin({
			'process.env.NODE_ENV': JSON.stringify('production'),
			__DEV__: JSON.stringify(JSON.parse(process.env.DEBUG || 'false'))
		}),
		/**
		 * webpack3.x 模块串联
		 */
		new webpack.optimize.ModuleConcatenationPlugin()
	],
};

module.exports = webpackMerge(
	commonConfig,
	webpackConfig
);