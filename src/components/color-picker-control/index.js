const {
	BaseControl,
	Button,
	ColorPicker,
	Dropdown,
	Dashicon,
	Tooltip,
} = wp.components;

const { ColorPalette, ContrastChecker } = wp.blockEditor;

const { __ } = wp.i18n;

import './editor.scss';

const ColorPickerControl = ( props ) => {
	const color = props.value;

	const parseColor = ( color ) => {
		if ( 'object' === typeof color ) {
			const alpha = 'undefined' === color.a ? 1 : color.a;

			if ( 'undefined' !== typeof color.h ) {
				return `hsl(${ color.h }%, ${ color.s }%, ${ color.l }%, ${ alpha })`;
			}

			if ( 'undefined' !== typeof color.r ) {
				return `rgba(${ color.r }, ${ color.g }, ${ color.b }, ${ alpha })`;
			}
		}

		return color;
	};

	return (
		<BaseControl
			label={ props.label }
			help={ props.help }
			className="ib-block-control__color-picker"
		>
			<Dropdown
				className="ib-block-control__color-picker-dropdown"
				contentClassName="ib-block-control__color-picker-inner"
				renderToggle={ ( { isOpen, onToggle } ) => (
					<>
						{ color && (
							<Tooltip text={ __( 'Reset', 'ib-testimonial' ) }>
								<Button
									onClick={ () =>
										props.onChange( undefined )
									}
									aria-label={ __(
										'Reset',
										'ib-testimonial'
									) }
									className="ib-block-control__color-picker-reset"
								>
									<Dashicon icon="image-rotate" />
								</Button>
							</Tooltip>
						) }
						<Button
							aria-expanded={ isOpen }
							onClick={ onToggle }
							aria-label={ props.label }
							className="ib-block-control__color-picker-value"
						>
							<span style={ { backgroundColor: color } }></span>
						</Button>
					</>
				) }
				renderContent={ () => (
					<>
						{ ! props.disablePalette && (
							<ColorPalette
								value={ color }
								onChange={ ( value ) => props.onChange( value ) }
								disableCustomColors
								clearable={ false }
							/>
						) }
						{ props.contrastChecker && (
							<ContrastChecker
								backgroundColor={
									props.contrastChecker.backgroundColor
								}
								textColor={ props.contrastChecker.textColor }
							/>
						) }
						<ColorPicker
							color={ color }
							onChangeComplete={ ( value ) =>
								props.onChange(
									parseColor( value[ value.source ] )
								)
							}
							disableAlpha={ props.disableAlpha }
						/>
					</>
				) }
			/>
		</BaseControl>
	);
};

export default ColorPickerControl;
