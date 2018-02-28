const path = require('path');
const fs = require('fs-extra');
const glob = require('glob');

const APP_ROOT = process.cwd();

const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const { component } = require('./user.config.js') || {};

let entry = {
};
let openPage = {};
// 入口文件
const getEntryFileContent = (entryPath, fullpath) => {
	let relativePath = path.relative(path.join(entryPath, '../'), fullpath);

	let contents = '';
	contents += `\nimport React, { Component } from 'react';\n`;
	contents += `\nimport PropTypes from 'prop-types';\n`;
	contents += `\nimport { render } from 'react-dom';\n`;
	contents += `\nimport App from '${relativePath}';\n`;
	contents += `render(<App />, document.getElementById('pages'));\n`;
	return contents;
};
const getEntryFile = (dir) => {
	dir = dir || '.';
	const directory = path.join(APP_ROOT, 'src', dir);

	// 将返回一个包含“指定目录下所有文件名称”的数组对象
	fs.readdirSync(directory).forEach((file) => {
		// 文件地址
		const fullpath = path.join(directory, file);
		// 获取文件信息
		const stat = fs.statSync(fullpath);
		// 获取文件后缀名
		const extname = path.extname(fullpath);
		let paths = fullpath.split('/') || [];
		if (stat.isFile() 
			&& extname === '.js' 
			&& ( !component || fullpath.includes(component))
			&& paths.length >= 2 && paths[paths.length - 2] === 'examples'
		) {
			// 获取文件名字
			const name = path.join(dir, path.basename(file, extname));
			// 用户测试单独文件
			const entryFile = path.join('temp', dir.replace(/\/examples/, ''), file);
			fs.outputFileSync(path.join(entryFile), getEntryFileContent(entryFile, fullpath));
			// 文件路径
			entry[name.replace(/\/examples/, '')] = path.join(APP_ROOT, entryFile);
		} else if (stat.isDirectory() && file !== 'dist') {
			const subdir = path.join(dir, file);
			getEntryFile(subdir);
		}
	});
};
getEntryFile('web');
// const getCopyConfig = () => {
// 	const foundScripts = glob.sync('temp/web/*/', {});
// 	const ret = [];
// 	foundScripts.forEach(fullpath => {
// 		let filename = path.join(APP_ROOT, fullpath.replace(/temp\//, 'dist/'), 'index.html');
// 		if (!/(__tpl__|__test__)/.test(fullpath)) {
// 			ret.push({
// 				from: 'templates/index.tpl.html',
// 				to: filename
// 			});
// 		}
// 	});
// 	return ret;
// };
// new CopyWebpackPlugin(getCopyConfig(), { copyUnmodified: true }),
const getHTMLConfig = () => {
	const foundScripts = glob.sync(`temp/web/${component ? component : '*'}/*.js`, {});
	const ret = [];
	foundScripts.forEach(fullpath => {
		if (!/(__tpl__|__test__)/.test(fullpath)) {
			let chunk = fullpath.replace(/temp\//, '').replace(/^(.*)\.js$/, '$1');
			let filename = path.join(APP_ROOT, fullpath.replace(/temp\//, 'dist/').replace(/\.js/, '.html'));
			openPage[chunk] = path.join(fullpath.replace(/temp\//, '/').replace(/\.js/, '.html'));
			ret.push(
				new HtmlWebpackPlugin({
					template: path.resolve(APP_ROOT, 'templates/tpl.html'),
					chunks: [chunk],
					inject: 'body',
					filename: filename
				})
			);
		}
	});
	ret.push(
		new HtmlWebpackPlugin({
			inject: false,
			title: `${component ? component : 'All'} Demo`,
			openPage,
			template: path.resolve(APP_ROOT, 'templates/index.ejs'),
			// filename: path.join(APP_ROOT, 'dist/web/index.html')
		})
	);
	return ret;
};

module.exports = {
	entry,
	openPage,
	getHTMLConfig
};