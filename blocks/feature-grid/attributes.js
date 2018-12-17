import {
    __
} from '../../utils/wp-import'



export const attributes = {
    columns: {
        type: 'number',
        default: 3,
    },
    iconSize: {
		type: 'number',
		default: 100,
    },
    title1: {
		source: 'html',
		selector: '.ugb-feature-grid > *:nth-child(1) h5',
		default: __( 'Feature 1' ),
    },
	title2: {
		source: 'html',
		selector: '.ugb-feature-grid > *:nth-child(2) h5',
		default: __( 'Feature 2' ),
	},
	title3: {
		source: 'html',
		selector: '.ugb-feature-grid > *:nth-child(3) h5',
		default: __( 'Feature 3' ),
	},
	description1: {
		source: 'html',
		selector: '.ugb-feature-grid > *:nth-child(1) .ugb-fg-description',
		default: __( 'Some feature description for an awesome feature' ),
	},
	description2: {
		source: 'html',
		selector: '.ugb-feature-grid > *:nth-child(2) .ugb-fg-description',
		default: __( 'Some feature description for an awesome feature' ),
	},
	description3: {
		source: 'html',
		selector: '.ugb-feature-grid > *:nth-child(3) .ugb-fg-description',
		default: __( 'Some feature description for an awesome feature' ),
	},    
}