/*
* Pricing Table Block Dependencies
*/

import icons from '../../utils/icons';
import classnames from 'classnames';
// import EditPricing from './edit';
// import SavePricing from './save';


import './style.scss';
import './editor.scss';

/*
 * Pricing Table Block Libraries
 */

import {
    __,
    registerBlockType,
    PanelColorSettings,
    SelectControl,
    Dashicon,
    IconButton,
    RangeControl,
    InspectorControls,
    RichText,
    BlockControls,
    ToggleControl,
    PanelBody,
    URLInput,
    omit,
    Fragment,
    BlockAlignmentToolbar,
    AlignmentToolbar
} from '../../utils/wp-import'


export const range = ( start, end ) => {
    return Array.from( { length: ( end - start ) }, ( v, k ) => k + start );
}



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

export const editPricing = ( props ) => {

    // console.log('Edit Block', props)

    const {
        isSelected,
        editable,
        setState,
        className,
        setAttributes
    } = props;

    const { attributes } = props;

    const {
        columns,
        design,
        textAlignment,
        blockAlignment,
    } = attributes;

    const mainClasses = classnames( [
        className,
        'egb-feature-grid',
        `columns-${columns}`,
    ], {
        [ `egb-design-${design}` ]: design && design !== 'basic',
    } );



    return(
        <Fragment>

            <BlockControls>
                <BlockAlignmentToolbar
                    value={ blockAlignment }
                    onChange={ blockAlignment => setAttributes( { blockAlignment } ) }
                />
                <AlignmentToolbar
                    value={ textAlignment }
                    onChange={ textAlignment => setAttributes( { textAlignment } ) }
                />
            </BlockControls>

            <InspectorControls>
                <PanelBody title={ __( 'General Settings' ) }>
                    <RangeControl
                        label={ __( 'Columns' ) }
                        value={ columns }
                        onChange={ columns => setAttributes( { columns } ) }
                        min={ 1 }
                        max={ 3 }
                    />

                    {/*<RangeControl*/}
                        {/*label={ __( 'Image Size(Percentage %)' ) }*/}
                        {/*value={ imageSize }*/}
                        {/*onChange={ imageSize => setAttributes( { imageSize } ) }*/}
                        {/*min={ 0 }*/}
                        {/*max={ 100 }*/}
                    {/*/>*/}
                </PanelBody>
            </InspectorControls>

            <div className={ mainClasses }>
                { [1, 2, 3].map( i => {

                    const title = attributes[ `title${i}` ];
                    const description = attributes[ `description${i}` ];
                    const linkUrl = attributes[ `linkUrl${i}` ];
                    const linkText = attributes[ `linkText${i}` ];

                    return(
                        <div key={ i }>
                            <div className={ `egb-feature-grid-item` }>


                                <RichText
                                    tagName='h5'
                                    className={"feature-title"}
                                    value={ title }
                                    onChange={ title => setAttributes( { [ `title${i}` ]: title } ) }
                                    placeholder={ priceAttributes[ `title${i}` ].default }

                                    keepPlaceholderOnFocus
                                />

                                <RichText
                                    tagName='p'
                                    value={ description }
                                    className={"feature-desc"}
                                    onChange={ description => setAttributes( { [ `description${i}` ]: description } ) }
                                    placeholder={ priceAttributes[ `description${i}` ].default }
                                    keepPlaceholderOnFocus
                                />

                                <p>
                                    <a href='#'>
                                        <RichText
                                            tagName='span'
                                            className={"feature-link"}
                                            value={ linkText }
                                            onChange={ linkText => setAttributes( { [ `linkText${i}` ]: linkText } ) }
                                            placeholder={ priceAttributes[ `linkText${i}` ].default }
                                            formattingControls={ [ 'bold', 'italic', 'strikethrough' ] }
                                            keepPlaceholderOnFocus
                                        />
                                    </a>
                                </p>
                            </div>

                            {
                                isSelected && (
                                    <form
                                        onSubmit={ ( event ) => event.preventDefault() }
                                        className={ `blocks-button__inline-link pricing-box`}>

                                        <URLInput
                                            value={ linkUrl }
                                            onChange={ url => setAttributes( { [ `linkUrl${i}` ]: url } ) }
                                        />
                                        <IconButton
                                            icon={ 'editor-break' }
                                            label={ __( 'Apply' ) }
                                            type={ 'submit' }
                                        />
                                    </form>
                                )
                            }

                        </div>
                    )

                })
                }
            </div>

        </Fragment>
    )

}



/*
* Save
 */

export const save = ( props ) => {
    const { attributes, className } = props;
    const {
        columns,
        design,
        blockAlignment,
        textAlignment,
    } = attributes;

    const mainClasses = classnames( [
        className,
        'egb-feature-grid',
        `columns-${columns}`,
    ], {
        [ `egb-design-${design}` ]: design && design !== 'basic',
    } );

    return(
        <div className={ `${mainClasses} align${blockAlignment}`}>

            { range( 1, columns + 1 ).map( i => {

                const title = attributes[ `title${i}` ];
                const description = attributes[ `description${i}` ];
                const linkUrl = attributes[ `linkUrl${i}` ];
                const linkText = attributes[ `linkText${i}` ];
                return(
                    <div className={ `egb-feature-grid-item` } key={ i }>


                        { ! RichText.isEmpty( title ) && (
                            <RichText.Content
                                tagName='h5'
                                className={"feature-title"}
                                value={ title }
                            />
                        ) }

                        { ! RichText.isEmpty( description ) && (
                            <RichText.Content
                                tagName='p'
                                className={"feature-desc"}
                                value={ description }
                            />
                        ) }

                        { ! RichText.isEmpty( linkText ) && (
                            <p>
                                <RichText.Content
                                    tagName='a'
                                    href={ linkUrl }
                                    value={ linkText }
                                    className={"feature-link"}
                                />
                            </p>
                        ) }

                    </div>
                )

            } ) }
        </div>
    );
}





/*
* Register Pricing Table Block Slider
*/

export default registerBlockType(
    'easy-blocks/pricing-table',
    {
        title : __('Pricing Table', 'ugb'),
        description: __('Easy Gutenberg Pricing Table Block', 'ugb'),
        category: 'gutenberg-blocks',
        icon:{
            src: icons.pricing
        },
        keywords: [
            __('EGB', 'ugb'),
            __('Pricing Table', 'ugb'),
            __('EBG Pricing Table', 'ugb')
        ],

        attributes: priceAttributes,

        edit: editPricing,

        save: save

    }
)