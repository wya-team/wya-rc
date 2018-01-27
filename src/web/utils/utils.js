const now = +(new Date());
let index = 0;

export const getUid = () => {
	return `rc-${now}-${++index}`;
};

const endsWith = (str, suffix) => {
	return str.indexOf(suffix, str.length - suffix.length) !== -1;
};

export const attrAccept = (file, acceptedFiles) => {
	if (file && acceptedFiles) {
		const acceptedFilesArray = Array.isArray(acceptedFiles)
			? acceptedFiles
			: acceptedFiles.split(',');
		const fileName = file.name || '';
		const mimeType = file.type || '';
		const baseMimeType = mimeType.replace(/\/.*$/, '');

		return acceptedFilesArray.some(type => {
			const validType = type.trim();
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

