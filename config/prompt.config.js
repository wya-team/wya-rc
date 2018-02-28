/**
 * 强化项目的读写能力
 */
const prompt = require('prompt');
const fs = require('fs-extra');
// 开始写入
prompt.start();
prompt.get(['port', 'component'],  (err, result) =>  {
	let { port, component: str } = result;
	result.component = str ? str.replace(/([a-z\dA-Z])([A-Z])/g, '$1-$2').toLowerCase() : str;

	let contents = '';
	// 对用户输入的信息处理
	// to do ....
	let strObj = JSON.stringify(result || {});

	// 输出
	contents = `let obj = ${strObj};module.exports = obj;`;
	fs.outputFileSync('./config/user.config.js', `let obj = ${{}};module.exports = obj;`);
});