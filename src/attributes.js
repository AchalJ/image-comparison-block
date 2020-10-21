import { __ } from '@wordpress/i18n';

const attributes = {
	beforeImage: {
		type: 'object',
		default: {
			id: undefined,
			url: '',
			alt: '',
		},
	},
	afterImage: {
		type: 'object',
		default: {
			id: undefined,
			url: '',
			alt: '',
		},
	},
	beforeLabel: {
		type: 'string',
		default: __( 'Before', 'ib-image-comparison' ),
	},
	afterLabel: {
		type: 'string',
		default: __( 'After', 'ib-image-comparison' ),
	},
	visibleRatio: {
		type: 'number',
		default: 0.5,
	},
	orientation: {
		type: 'string',
		default: 'horizontal',
	},
	moveSlider: {
		type: 'string',
		default: 'on_swipe',
	},

	labelHPosition: {
		type: 'string',
		default: 'middle',
	},
	labelVPosition: {
		type: 'string',
		default: 'center',
	},
	labelColor: {
		type: 'string',
	},
	labelBgColor: {
		type: 'string',
	},
	labelBorderWidth: {
		type: 'number',
	},
	labelFontSize: {
		type: 'number',
	},

	showOverlay: {
		type: 'boolean',
		default: true,
	},
	overlayColor: {
		type: 'string',
		default: 'rgba(0, 0, 0, 0.2)',
	},
	overlayHoverColor: {
		type: 'string',
		default: 'rgba(0, 0, 0, 0.4)',
	},
};

export default attributes;
