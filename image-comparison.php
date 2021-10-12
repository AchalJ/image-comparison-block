<?php
/**
 * Plugin Name:     Image Comparison Block
 * Plugin URI:      https://wordpress.org/plugins/image-comparison-block/
 * Description:     A block to let your visitors compare between two images. After, before, horizontal, and vertical comparison.
 * Version:         1.0.1
 * Author:          Achal Jain
 * License:         GPL-2.0-or-later
 * License URI:     https://www.gnu.org/licenses/gpl-2.0.html
 * Text Domain:     ib-image-comparison
 */

/**
 * Registers all block assets so that they can be enqueued through the block editor
 * in the corresponding context.
 *
 * @see https://developer.wordpress.org/block-editor/tutorials/block-tutorial/applying-styles-with-stylesheets/
 */
function ideabox_image_comparison_block_init() {
	$dir = dirname( __FILE__ );

	$script_asset_path = "$dir/build/index.asset.php";
	if ( ! file_exists( $script_asset_path ) ) {
		throw new Error(
			'You need to run `npm start` or `npm run build` for the "ideabox/image-comparison" block first.'
		);
	}
	$index_js     = 'build/index.js';
	$script_asset = require( $script_asset_path );
	wp_register_script(
		'ideabox-image-comparison-block-editor',
		plugins_url( $index_js, __FILE__ ),
		$script_asset['dependencies'],
		$script_asset['version']
	);
	wp_set_script_translations( 'ideabox-image-comparison-block-editor', 'ib-image-comparison' );

	$editor_css = 'build/index.css';
	wp_register_style(
		'ideabox-image-comparison-block-editor',
		plugins_url( $editor_css, __FILE__ ),
		array(),
		filemtime( "$dir/$editor_css" )
	);

	wp_register_style(
        'jquery-twentytwenty',
        plugins_url( 'assets/css/twentytwenty.css', __FILE__ ),
        array(),
		filemtime( "$dir/assets/css/twentytwenty.css" ),
        'all'
    );

	$style_css = 'build/style-index.css';
	wp_register_style(
		'ideabox-image-comparison-block',
		plugins_url( $style_css, __FILE__ ),
		array( 'jquery-twentytwenty' ),
		filemtime( "$dir/$style_css" )
	);

	wp_register_script(
        'jquery-event-move',
        plugins_url( 'assets/js/jquery.event.move.js', __FILE__ ),
        array( 'jquery'),
        $script_asset['version'],
        true
    );

	wp_register_script(
        'jquery-twentytwenty',
        plugins_url( 'assets/js/jquery.twentytwenty.js', __FILE__ ),
        array( 'jquery' ),
        $script_asset['version'],
        true
    );

    wp_register_script(
        'ideabox-image-comparison-block',
        plugins_url( 'assets/js/image-comparison.js', __FILE__ ),
        array( 'imagesloaded', 'jquery-event-move', 'jquery-twentytwenty' ),
		$script_asset['version'],
        true
    );

	register_block_type( 'ideabox/image-comparison', array(
		'editor_script' => 'ideabox-image-comparison-block-editor',
		'editor_style'  => 'ideabox-image-comparison-block-editor',
		'style'         => 'ideabox-image-comparison-block',
		'script'		=> 'ideabox-image-comparison-block'
	) );
}
add_action( 'init', 'ideabox_image_comparison_block_init' );
