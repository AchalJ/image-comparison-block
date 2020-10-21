(function($) {
	window[ 'ibImageComparison' ] = () => {
		if ( $( '.ib-image-comparison' ).length ) {
			$( '.ib-image-comparison' ).each( function () {
				if ( $(this).find( '.ib-image-comparison-img' ).length === 0 ) {
					return;
				}

				var $this = $( this );
				
				$this.imagesLoaded( function() {
					var config = {
						default_offset_pct: $this.attr('data-offset'),
						orientation: $this.attr('data-orientation'),
						before_label: $this.attr('data-before'),
						after_label: $this.attr('data-after'),
						no_overlay: JSON.parse( $this.attr('data-no-overlay') ),
						move_slider_on_hover: JSON.parse( $this.attr('data-on-hover') ),
						move_with_handle_only: JSON.parse( $this.attr('data-on-swipe') ),
						click_to_move: JSON.parse( $this.attr('data-on-click') ),
					};

					$this.twentytwenty( config );
				});
			} );
		}
	};

	if ( 'undefined' !== typeof wp && 'undefined' !== typeof wp.domReady ) {
		wp.domReady( ibImageComparison );
	} else {
		$(document).ready( ibImageComparison );
	}
})(jQuery);
