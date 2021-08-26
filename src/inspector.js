import { InspectorControls, FontSizePicker } from '@wordpress/block-editor';

import {
	BaseControl,
	PanelBody,
	TextControl,
	RangeControl,
	SelectControl,
	ToggleControl,
} from '@wordpress/components';
import { __ } from '@wordpress/i18n';

import { ColorPickerControl } from './components';

const Inspector = ( props ) => {
	const { attributes, setAttributes } = props;

	const {
		beforeLabel,
		afterLabel,
		visibleRatio,
		orientation,
		moveSlider,
		labelHPosition,
		labelVPosition,
		labelColor,
		labelBgColor,
		labelBorderWidth,
		labelFontSize,
		showOverlay,
		overlayColor,
		overlayHoverColor,
	} = attributes;

	const getMoveHandleHelp = () => {
		if ( 'on_swipe' === moveSlider ) {
			return __( 'Allow a user to swipe anywhere on the image to control handle movement.', 'ib-image-comparison' );
		}
		if ( 'on_click' === moveSlider ) {
			return __( 'Allow a user to click (or tap) anywhere on the image to move the handle to that location.', 'ib-image-comparison' );
		}
		if ( 'on_hover' === moveSlider ) {
			return __( 'Move handle on mouse hover.', 'ib-image-comparison' );
		}
	}

	return (
		<InspectorControls>
			<PanelBody title={ __( 'Image Comparison Settings', 'ib-image-comparison' ) }>
				<RangeControl
					label={ __( 'Visibility Ratio', 'ib-image-comparison' ) }
					value={ visibleRatio }
					onChange={ ( visibleRatio ) =>
						setAttributes( { visibleRatio } )
					}
					min={ 0 }
					max={ 1 }
					step={ 0.1 }
				/>
				<SelectControl
					label={ __( 'Orientation', 'ib-image-comparison' ) }
					options={ [
						{ value: 'horizontal', label: __( 'Horizontal', 'ib-image-comparison' ) },
						{ value: 'vertical', label: __( 'Vertical', 'ib-image-comparison' ) },
					] }
					onChange={ ( orientation ) => {
						setAttributes( { orientation } );
					} }
					value={ orientation }
				/>
				<SelectControl
					label={ __( 'Move Handle', 'ib-image-comparison' ) }
					options={ [
						{ value: 'on_swipe', label: 'On Swipe' },
						{ value: 'on_click', label: 'On Click' },
						{ value: 'on_hover', label: 'On Hover' },
					] }
					onChange={ ( moveSlider ) => {
						setAttributes( { moveSlider } );
					} }
					value={ moveSlider }
					help={ getMoveHandleHelp() }
				/>
			</PanelBody>
			<PanelBody title={ __( 'Overlay', 'ib-image-comparison' ) } initialOpen={ false }>
				<ToggleControl
					label={ __( 'Show Overlay', 'ib-image-comparison' ) }
					checked={ showOverlay }
					onChange={ ( showOverlay ) =>
						setAttributes( { showOverlay } )
					}
				/>
				{ showOverlay && 
					<>
						<ColorPickerControl
							label={ __( 'Overlay Color', 'ib-image-comparison' ) }
							value={ overlayColor }
							onChange={ ( overlayColor ) =>
								setAttributes( { overlayColor } )
							}
							disablePalette
						/>
						<ColorPickerControl
							label={ __( 'Overlay Hover Color', 'ib-image-comparison' ) }
							value={ overlayHoverColor }
							onChange={ ( overlayHoverColor ) =>
								setAttributes( { overlayHoverColor } )
							}
							disablePalette
						/>
					</>
				}
			</PanelBody>
			{ showOverlay && 
				<PanelBody title={ __( 'Labels', 'ib-image-comparison' ) } initialOpen={ false }>
					<TextControl
						label={ __( 'Before Label', 'ib-image-comparison' ) }
						onChange={ ( beforeLabel ) =>
							setAttributes( { beforeLabel } )
						}
						value={ beforeLabel }
					/>
					
					<TextControl
						label={ __( 'After Label', 'ib-image-comparison' ) }
						onChange={ ( afterLabel ) =>
							setAttributes( { afterLabel } )
						}
						value={ afterLabel }
					/>

					{ 'horizontal' === orientation && (
					<SelectControl
						label={ __( 'Position', 'ib-image-comparison' ) }
						options={ [
							{ label: __('Top', 'ib-image-comparison'), value: 'top' },
							{ label: __('Middle', 'ib-image-comparison'), value: 'middle' },
							{ label: __('Bottom', 'ib-image-comparison'), value: 'bottom' },
						] }
						onChange={ ( labelHPosition ) => {
							setAttributes( { labelHPosition } );
						} }
						value={ labelHPosition }
					/>
					) }

					{ 'vertical' === orientation && (
					<SelectControl
						label={ __( 'Position', 'ib-image-comparison' ) }
						options={ [
							{ label: __('Left', 'ib-image-comparison'), value: 'left' },
							{ label: __('Center', 'ib-image-comparison'), value: 'center' },
							{ label: __('Right', 'ib-image-comparison'), value: 'right' },
						] }
						onChange={ ( labelVPosition ) => {
							setAttributes( { labelVPosition } );
						} }
						value={ labelVPosition }
					/>
					) }

					<hr />

					<ColorPickerControl
						label={ __( 'Text Color', 'ib-image-comparison' ) }
						value={ labelColor }
						onChange={ ( labelColor ) =>
							setAttributes( { labelColor } )
						}
						disableAlpha
						disablePalette
					/>

					<ColorPickerControl
						label={ __( 'Background Color', 'ib-image-comparison' ) }
						value={ labelBgColor }
						onChange={ ( labelBgColor ) =>
							setAttributes( { labelBgColor } )
						}
						disablePalette
					/>

					<hr />

					<RangeControl
						label={ __( 'Border', 'ib-image-comparison' ) }
						value={ labelBorderWidth }
						onChange={ ( labelBorderWidth ) =>
							setAttributes( { labelBorderWidth } )
						}
						min={ 0 }
						step={ 1 }
						max={ 10 }
					/>

					<hr />

					<BaseControl
						label={ __( 'Typography', 'ib-image-comparison' ) }
					>
						<FontSizePicker
							value={ labelFontSize }
							onChange={ ( labelFontSize ) =>
								setAttributes( { labelFontSize } )
							}
						/>
					</BaseControl>
				</PanelBody>
			}
		</InspectorControls>
	);
};

export default Inspector;
