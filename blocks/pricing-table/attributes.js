export const priceAttributes = {
    columns: {
        type: 'number',
        default: 3,
    },
    design: {
        type: 'string',
        default: 'basic',
    },
    textAlignment: {
        type: 'string',
    },
    blockAlignment: {
        type: 'string',
        default: 'full',
    },
    title1: {
        source: 'html',
        selector: '.egb-feature-grid > *:nth-child(1) .feature-title',
        default: __( 'Feature 1' ),
    },
    title2: {
        source: 'html',
        selector: '.egb-feature-grid > *:nth-child(2) .feature-title',
        default: __( 'Feature 2' ),
    },
    title3: {
        source: 'html',
        selector: '.egb-feature-grid > *:nth-child(3) .feature-title',
        default: __( 'Feature 3' ),
    },
    description1: {
        source: 'html',
        selector: '.egb-feature-grid > *:nth-child(1) .feature-desc',
        default: __( 'Some feature description for an awesome feature' ),
    },
    description2: {
        source: 'html',
        selector: '.egb-feature-grid > *:nth-child(2) .feature-desc',
        default: __( 'Some feature description for an awesome feature' ),
    },
    description3: {
        source: 'html',
        selector: '.egb-feature-grid > *:nth-child(3) .feature-desc',
        default: __( 'Some feature description for an awesome feature' ),
    },

    linkUrl1: {
        type: 'string',
        source: 'attribute',
        selector: '.egb-feature-grid > *:nth-child(1) .feature-link',
        attribute: 'href',
    },
    linkUrl2: {
        type: 'string',
        source: 'attribute',
        selector: '.egb-feature-grid > *:nth-child(2) .feature-link',
        attribute: 'href',
    },
    linkUrl3: {
        type: 'string',
        source: 'attribute',
        selector: '.egb-feature-grid > *:nth-child(3) .feature-link',
        attribute: 'href',
    },
    linkText1: {
        source: 'html',
        selector: '.egb-feature-grid > *:nth-child(1) .feature-link',
        default: __( 'View More' ),
    },
    linkText2: {
        source: 'html',
        selector: '.egb-feature-grid > *:nth-child(2) .feature-link',
        default: __( 'View More' ),
    },
    linkText3: {
        source: 'html',
        selector: '.egb-feature-grid > *:nth-child(3) .feature-link',
        default: __( 'View More' ),
    },

}