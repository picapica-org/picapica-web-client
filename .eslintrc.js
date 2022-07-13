module.exports = {
	globals: {
		__PATH_PREFIX__: true,
	},
	parser: `@typescript-eslint/parser`,
	extends: [
		"plugin:@typescript-eslint/recommended",
		"react-app",
		"plugin:prettier/recommended",
		"prettier",
		"plugin:import/errors",
		"plugin:import/warnings",
	],
	plugins: ["@typescript-eslint", "prettier", "import"],
	parserOptions: {
		ecmaVersion: 2018, // Allows for the parsing of modern ECMAScript features
		sourceType: "module", // Allows for the use of imports
	},
	env: {
		browser: true,
		node: true,
	},
	rules: {
		"@typescript-eslint/explicit-function-return-type": [
			"error",
			{
				allowExpressions: true,
			},
		],
		"@typescript-eslint/no-non-null-assertion": "off",
		"@typescript-eslint/no-explicit-any": "off",
		"no-restricted-globals": "off",

		"sort-imports": ["warn", { ignoreDeclarationSort: true, ignoreCase: true }],
		"import/order": [
			"error",
			{
				groups: [["builtin", "external"], "internal", "parent", "sibling", "index", "object", "type"],
				alphabetize: { order: "asc", caseInsensitive: true },
			},
		],
	},
	settings: {
		"import/resolver": {
			typescript: {},
		},
	},
	ignorePatterns: ["*.css", "*.scss", "gulpfile.js", "publish/**", "src/lib/generated/**"],
};
