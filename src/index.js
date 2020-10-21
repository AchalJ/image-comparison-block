import { registerBlockType } from '@wordpress/blocks';
import { __ } from '@wordpress/i18n';

import attributes from './attributes';
import edit from './edit';
import save from './save';

import './style.scss';
import metadata from '../block.json';

const { name, icon, category, keywords, supports } = metadata;

registerBlockType( name, {
	title: __( 'Image Comparison', 'ib-image-comparison' ),
	description: __(
		'A block to let your visitors compare between two images. After, before, horizontal, and vertical comparison.',
		'ib-image-comparison'
	),
	keywords,
	category,
	icon,
	supports,
	attributes,
	edit,
	save
} );
