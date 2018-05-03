process.env.NODE_ENV = 'production';
// 初始化配置文件
const fs = require('fs-extra');
fs.outputFileSync('./config/user.config.js', `let obj = {};module.exports = obj;`);

const path = require('path');
const webpack = require('webpack');
const webpackMerge = require('webpack-merge');

const { APP_ROOT, commonConfig, localIp, localPort } = require('./webpack.config.common');



let webpackConfig = {
	// webpack 4 新增
	mode: 'production',
	plugins: [
		/**
		 * 生产环境
		 * webpack 4 默认支持: 'process.env.NODE_ENV': JSON.stringify('production')
		 */
		new webpack.DefinePlugin({
			__DEV__: JSON.stringify(JSON.parse(process.env.DEBUG || 'false'))
		})
	],
};

module.exports = webpackMerge(
	commonConfig,
	webpackConfig
);