const defaultConfig = require( '@wordpress/scripts/config/webpack.config' );
const blockmeta = require( './package.json' );
const jsonpFunction = 'wpJsonp_ib' + blockmeta.name.replace( /-/g, '' );

/**
 * Because the block and the package have their own webpack configuration,
 * they must provide a unique name for the global scope (which is used to lazy-load chunks),
 * otherwise it throws a JS error when loading blocks compiled with `npm run build`
 * @see https://github.com/WordPress/gutenberg/issues/23607
 * @see https://webpack.js.org/configuration/output/#outputjsonpfunction
 */
// ------------------------------------------------------
defaultConfig.output.jsonpFunction = jsonpFunction;
// ------------------------------------------------------

module.exports = defaultConfig;