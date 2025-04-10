/* eslint-disable no-undef */
module.exports = {
	root: true,
	parser: '@typescript-eslint/parser',
	plugins: ['@typescript-eslint', 'react', 'react-hooks', 'prettier'],
	extends: [
		'eslint:recommended',
		'plugin:react/recommended',
		'plugin:@typescript-eslint/recommended',
		'plugin:prettier/recommended',
		'prettier',
	],
	parserOptions: {
		ecmaFeatures: {
			jsx: true,
		},
		ecmaVersion: 2020,
		sourceType: 'module',
	},
	rules: {
		'prettier/prettier': 'error',
		'react/react-in-jsx-scope': 'off', // React is auto-imported in new projects
		'@typescript-eslint/no-unused-vars': ['warn', { argsIgnorePattern: '^_' }],
		'@typescript-eslint/no-var-requires': 'off',
		'@typescript-eslint/no-require-imports': 'off',
		'react/prop-types': 'off', // Disable prop-types as we use TypeScript
	},
	env: {
		node: true,
	},
	settings: {
		react: {
			version: 'detect',
		},
	},
};
