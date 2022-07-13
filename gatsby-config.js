/**
 * Configure your Gatsby site with this file.
 *
 * See: https://www.gatsbyjs.org/docs/gatsby-config/
 *
 * @type {import("gatsby").GatsbyConfig}
 */
module.exports = {
	pathPrefix: `/demo`, // useful for publishing demos
	plugins: [
		`gatsby-plugin-react-helmet`,
		`gatsby-plugin-sass`,
		{
			resolve: "gatsby-plugin-react-svg",
			options: {
				rule: {
					include: /\.inline\.svg$/,
				},
			},
		},
	],
};
