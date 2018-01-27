'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
var now = +new Date();
var index = 0;

var getUid = exports.getUid = function getUid() {
	return 'rc-' + now + '-' + ++index;
};

var endsWith = function endsWith(str, suffix) {
	return str.indexOf(suffix, str.length - suffix.length) !== -1;
};

var attrAccept = exports.attrAccept = function attrAccept(file, acceptedFiles) {
	if (file && acceptedFiles) {
		var acceptedFilesArray = Array.isArray(acceptedFiles) ? acceptedFiles : acceptedFiles.split(',');
		var fileName = file.name || '';
		var mimeType = file.type || '';
		var baseMimeType = mimeType.replace(/\/.*$/, '');

		return acceptedFilesArray.some(function (type) {
			var validType = type.trim();
			if (validType.charAt(0) === '.') {
				return endsWith(fileName.toLowerCase(), validType.toLowerCase());
			} else if (/\/\*$/.test(validType)) {
				// This is something like a image/* mime type
				return baseMimeType === validType.replace(/\/.*$/, '');
			}
			return mimeType === validType;
		});
	}
	return true;
};