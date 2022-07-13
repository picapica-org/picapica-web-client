/** @type {import("gatsby").GatsbyNode["onCreateWebpackConfig"]} */
exports.onCreateWebpackConfig = ({ stage, actions, getConfig, plugins }) => {
	// source: https://github.com/gatsbyjs/gatsby/discussions/30169#discussioncomment-621285
	if (stage === "build-javascript" || stage === "develop") {
		const config = getConfig();

		const miniCss = config.plugins.find(plugin => plugin.constructor.name === "MiniCssExtractPlugin");

		if (miniCss) {
			miniCss.options.ignoreOrder = true;
		}

		actions.replaceWebpackConfig(config);

		actions.setWebpackConfig({
			plugins: [plugins.provide({ process: "process/browser" })],
		});
	}
};
