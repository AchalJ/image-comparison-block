import { __ } from '@wordpress/i18n';
import { ToolbarButton, Toolbar } from '@wordpress/components';
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
						<BlockControls group="other">
							{ beforeImage.id && (
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
											<ToolbarButton
												className="components-toolbar__control"
												label={ __( 'Edit first image', 'ib-image-comparison' ) }
												icon={ <svg fill="none" height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg"><path clip-rule="evenodd" d="m10.5 2.25c0-.41421.3358-.75.75-.75s.75.33579.75.75v.75.75.09375.65625 15 .625.125.75.75c0 .4142-.3358.75-.75.75s-.75-.3358-.75-.75v-.75h-5.5c-1.10457 0-2-.8954-2-2v-14c0-1.10457.89543-2 2-2h5.5zm.0008 13.5156c0 .1381-.1119.25-.25.25h-4.38595c-.15943.0001-.3158-.0539-.45197-.1559-.13618-.1021-.2469-.2484-.32003-.4228s-.10586-.3702-.09458-.566c.01127-.1958.06611-.384.1585-.544l.81719-1.4146 1.08885-1.8806c.08026-.1391.18643-.2526.30962-.331.12319-.0783.25982-.1192.39846-.1192.13865 0 .27528.0409.39847.1192.12314.0783.24473.1556.30962.331l.37258 1.3378.34375 1.0741.89669-.7377c.1631-.1342.4088-.0181.4088.1931zm8.4992 3.7344h-5.25c-.1381 0-.25.1119-.25.25v1c0 .1381.1119.25.25.25h5.25c1.1046 0 2-.8954 2-2v-14c0-1.10457-.8954-2-2-2h-5.25c-.1381 0-.25.11193-.25.25v1c0 .13807.1119.25.25.25h5.25c.2761 0 .5.22386.5.5v14c0 .2761-.2239.5-.5.5z" fill="currentColor" fill-rule="evenodd"/></svg> }
												onClick={ open }
											/>
										) }
									/>
								</MediaUploadCheck>
							) }

							{ afterImage.id && (
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
											<ToolbarButton
												className="components-toolbar__control"
												label={ __( 'Edit second image', 'ib-image-comparison' ) }
												icon={ <svg fill="none" height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg"><path clip-rule="evenodd" d="m12.75 1.5c.4142 0 .75.33579.75.75v.75h5.5c1.1046 0 2 .89543 2 2v14c0 1.1046-.8954 2-2 2h-5.5v.75c0 .4142-.3358.75-.75.75s-.75-.3358-.75-.75v-.75-.75-.125-.625-15-.65625-.09375-.75-.75c0-.41421.3358-.75.75-.75zm-2.5 18h-5.25c-.27614 0-.5-.2239-.5-.5v-14c0-.27614.22386-.5.5-.5h5.25c.1381 0 .25-.11193.25-.25v-1c0-.13807-.1119-.25-.25-.25h-5.25c-1.10457 0-2 .89543-2 2v14c0 1.1046.89543 2 2 2h5.25c.1381 0 .25-.1119.25-.25v-1c0-.1381-.1119-.25-.25-.25zm3.25-10.47499v7.15749c0 .138.1119.25.25.25h3.5924c.1322 0 .2618-.0485.3747-.1405.1128-.0919.2046-.2236.2652-.3806.0606-.1571.0877-.3334.0784-.5097s-.0548-.3458-.1314-.4898l-1.4912-2.7993-1.7127-3.20901c-.0667-.12485-.1548-.22659-.2569-.29678s-.2152-.10681-.3299-.10681c-.1148 0-.2279.03662-.33.10681s-.1901.17193-.2569.29678l-.0398.07412c-.0078.01454-.0119.03079-.0119.0473z" fill="currentColor" fill-rule="evenodd"/></svg> }
												onClick={ open }
											/>
										) }
									/>
								</MediaUploadCheck>
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