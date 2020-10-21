import { __ } from '@wordpress/i18n';

const save = ( props ) => {
	const { attributes } = props;

	const {
		beforeLabel,
		afterLabel,
		beforeImage,
		afterImage,
		visibleRatio,
		orientation,
		moveSlider,
		showOverlay,
		labelHPosition,
		labelVPosition,
		labelColor,
		labelBgColor,
		labelBorderWidth,
		labelFontSize,
		overlayColor,
		overlayHoverColor
	} = attributes;

	const getClasses = () => {
		let classes = 'ib-image-comparison';

		if ( 'horizontal' === orientation ) {
			classes += ' label-pos--' + labelHPosition;
		} else {
			classes += ' label-pos--' + labelVPosition;
		}

		classes += ' twentytwenty-container';

		return classes;
	}

	return (
		<div>
			<div
				className={ getClasses() }
				data-offset={ visibleRatio ? visibleRatio : '0.5' }
				data-orientation={ orientation ? orientation : 'horizontal' }
				data-before={ beforeLabel ? beforeLabel : __( 'Before', 'ib-image-comparison' ) }
				data-after={ afterLabel ? afterLabel : __( 'After', 'ib-image-comparison' ) }
				data-no-overlay={ ! showOverlay ? true : false }
				data-on-hover={ 'on_hover' === moveSlider ? true : false }
				data-on-swipe={ 'on_swipe' === moveSlider ? true : false }
				data-on-click={ 'on_click' === moveSlider ? true : false }
				style={ {
					'--ibic-label-size': labelFontSize ? labelFontSize + 'px' : undefined,
					'--ibic-label-color': labelColor,
					'--ibic-label-bg-color': labelBgColor,
					'--ibic-label-border': labelBorderWidth ? labelBorderWidth + 'px' : undefined,
					'--ibic-overlay-color': overlayColor,
					'--ibic-overlay-hover-color': overlayHoverColor,
				} }
			>
				{ beforeImage && beforeImage.id && (
					<img src={ beforeImage.url } alt={ beforeImage.alt } className="ib-image-comparison-img" />
				) }
				{ afterImage && afterImage.id && (
					<img src={ afterImage.url } alt={ afterImage.alt } className="ib-image-comparison-img" />
				) }
			</div>
		</div>
	);
};
export default save;
