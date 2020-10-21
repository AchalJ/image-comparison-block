import { MediaUpload, MediaUploadCheck } from '@wordpress/block-editor';
import { Button } from '@wordpress/components';
import { __ } from '@wordpress/i18n';
import { image } from '@wordpress/icons';

const ImageControl = ( props ) => {
	const { id, url, alt } = props.value;
	const instructions = <p>{ __( 'To upload or edit the image, you need permission to upload media.', 'ib-image-comparison' ) }</p>;

	return (
		<MediaUploadCheck fallback={ instructions }>
			<MediaUpload
				buttonProps={ {
					className: 'change-image'
				} }
				onSelect={ ( img ) => {
					props.onChange( {
						id: img.id,
						alt: img.alt,
						url: img.url
					} );
				} }
				allowedTypes={ [ 'image' ] }
				value={ id }
				render={ ( { open } ) => (
					<>
						<Button
							className={
								id ? 'editor-post-featured-image__preview' : 'editor-post-featured-image__toggle'
							}
							onClick={ open }
						>
							{ ! id ? (
								image
							) : (
								<img
									className="ib-image"
									src={ url }
									alt={ alt }
								/>
							) }
						</Button>
					</>
				) }
			/>
		</MediaUploadCheck>
	);
};

export default ImageControl;