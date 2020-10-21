import { __ } from '@wordpress/i18n';
import { Button, Toolbar } from '@wordpress/components';
import {
	BlockControls,
	MediaUpload,
	MediaUploadCheck,
} from '@wordpress/block-editor';

import Inspector from './inspector';
import ImageControl from './image-control';

import './editor.scss';

const edit = ( props ) => {
	const { attributes, setAttributes } = props;
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

	if ( beforeImage.id && afterImage.id ) {
		setTimeout(function() {
			ibImageComparison();
		}, 500);
	}

	return [
		<>
			<Inspector { ...{ attributes, setAttributes } } />
			<div className={ props.className }>
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
					{ ( beforeImage.id && afterImage.id ) ? (
						<>
						<BlockControls>
							{ beforeImage.id && (
								<Toolbar>
									<MediaUploadCheck>
										<MediaUpload
											onSelect={ ( image ) => {
												setAttributes( { beforeImage: {
													id: image.id,
													alt: image.alt,
													url: image.url,
												} });
											}}
											allowedTypes={ [ 'image' ] }
											value={ beforeImage.id }
											render={ ( { open } ) => (
												<Button
													className="components-toolbar__control"
													label={ __( 'Edit Before Image', 'ib-image-comparison' ) }
													icon="edit"
													onClick={ open }
												/>
											) }
										/>
									</MediaUploadCheck>
								</Toolbar>
							) }

							{ afterImage.id && (
								<Toolbar>
									<MediaUploadCheck>
										<MediaUpload
											onSelect={ ( image ) => {
												setAttributes( { afterImage: {
													id: image.id,
													alt: image.alt,
													url: image.url,
												} });
											}}
											allowedTypes={ [ 'image' ] }
											value={ afterImage.id }
											render={ ( { open } ) => (
												<Button
													className="components-toolbar__control"
													label={ __( 'Edit After Image', 'ib-image-comparison' ) }
													icon="edit"
													onClick={ open }
												/>
											) }
										/>
									</MediaUploadCheck>
								</Toolbar>
							) }
						</BlockControls>

						<img src={ beforeImage.url } alt={ beforeImage.alt } className="ib-image-comparison-img" />
						<img src={ afterImage.url } alt={ afterImage.alt } className="ib-image-comparison-img" /> 
						</>
					)
					: (
						<div className="ib-image-selector">
							{/* <ImageControl
								i18n={ {
									imageSize: __( 'Image Size', 'ib-image-comparison' ),
									uploadImage: __(
										'Choose or Upload Before image',
										'ib-image-comparison'
									),
								} }
								value={ beforeImage }
								onChange={ ( beforeImage ) => {
									setAttributes( { beforeImage } );
								} }
							/>
							<ImageControl
								i18n={ {
									imageSize: __( 'Image Size', 'ib-image-comparison' ),
									uploadImage: __(
										'Choose or Upload After image',
										'ib-image-comparison'
									),
								} }
								value={ afterImage }
								onChange={ ( afterImage ) => {
									setAttributes( { afterImage } );
								} }
							/> */}

							<ImageControl
								value={ beforeImage }
								onChange={ ( beforeImage ) => {
									setAttributes( { beforeImage } );
								} }
							/>
							<ImageControl
								value={ afterImage }
								onChange={ ( afterImage ) => {
									setAttributes( { afterImage } );
								} }
							/>
						</div> 
					) }
					
				</div>
			</div>
		</>,
	];
};

export default edit;