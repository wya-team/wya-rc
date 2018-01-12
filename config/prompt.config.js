/**
 * 强化项目的读写能力
 */
const prompt = require('prompt');
const fs = require('fs-extra');
// 开始写入
prompt.start();
const ENV_IS_DEV = process.env.MODE_ENV !== `build`;
prompt.get([ENV_IS_DEV ? 'port' : 'libName'],  (err, result) =>  {
	let contents = '';
	// 对用户输入的信息处理
	// to do ....
	let strObj = JSON.stringify(result || {});

	// 输出
	contents = `let obj = ${strObj};module.exports = obj;`;
	fs.outputFileSync('./config/user.config.js', contents);
});