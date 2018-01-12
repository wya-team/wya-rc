module.exports = {
	plugins: [
		require('postcss-smart-import')({
			/* ...options */
		}),
		require('postcss-flexbugs-fixes')({

		}),
		require('precss')({
			/* ...options */ 
		}),
		require('autoprefixer')({
			/* ...options */
		})
	]
};