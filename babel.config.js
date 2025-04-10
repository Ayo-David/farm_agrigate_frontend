module.exports = {
	presets: ['module:@react-native/babel-preset'],
	plugins: [
		[
			'module-resolver',
			{
				root: ['./'],
				alias: {
					'@app': './src',
					'@assets': './assets',
				},
			},
		],
		['@babel/plugin-proposal-decorators', { legacy: true }],
		['@babel/plugin-proposal-class-properties', { loose: true }],
		['module:react-native-dotenv'],
	],
};
